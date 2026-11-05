import { GameAudio } from './audio/audio';
import { CLOUD_ENV } from './config/cloud';
import { EVENT_KINDS, RemoteInputBuf, SnapshotMirror, encodeSnapshot } from './net/mirror';
import type { GameEventKind } from './net/mirror';
import { cloudAvailable, CloudRoomClient } from './net/cloud';
import { DEFAULT_SERVER_URL, RoomClient } from './net/room';
import type { NetClient, RoomEvent, StartCfg } from './net/room';
import { DEBUG, envInfo, mark, recordError, setDebug, trace } from './platform/diag';
import { nextLowerDpr } from './platform/resolution';
import type { Platform } from './platform/types';
import { SceneView } from './render/scene';
import type { Skill } from './sim/ai';
import type { TeamId } from './sim/types';
import { World } from './sim/world';
import { DebugPanel } from './ui/debug';
import { Gamepad } from './ui/gamepad';
import { Hud } from './ui/hud';
import { UiLayer } from './ui/layer';
import { Screens } from './ui/screens';

const STEP = 1 / 60;
/** 房主快照广播频率（15Hz，客机做两帧插值） */
const SNAP_HZ = 15;

type AppState = 'start' | 'playing' | 'paused' | 'result';
type Mode = 'local' | 'host' | 'guest';

/** 游戏外壳：固定步长驱动模拟，3D 只占上半屏，底部交给手柄。
 *  local：单人 2v2（保持原行为）；host/guest：好友组队（房主权威同步）。 */
export class App {
  private readonly platform: Platform;
  private readonly padH: number;
  private readonly scene: SceneView;
  private readonly ui: UiLayer;
  private readonly hud: Hud;
  private readonly screens: Screens;
  private readonly pad: Gamepad;
  private readonly audio: GameAudio;

  private world: World;
  private skill: Skill = 'normal';
  private state: AppState = 'start';
  private mode: Mode = 'local';

  private acc = 0;
  private last = 0;
  private rafId = 0;
  private disposed = false;

  // ---------------------------------------------------------------- 帧调度 / 自愈
  /** 已完成的有效帧数：真机上用它判断"循环到底有没有在跑" */
  private frameNo = 0;
  private lastFrameWall = 0;
  private lastGoodRender = 0;
  private fpsAcc = 0;
  private fpsFrames = 0;
  private fps = 0;
  /** 当前主画布 DPR（自适应降档会就地改小，不改贴图） */
  private renderDpr: number;
  private lowFpsStreak = 0;
  private dprCooldownUntil = 0;
  private framePending = false;
  private seq = 0;
  /** rAF 连续超时后永久切到 setTimeout 驱动（小游戏里最稳的兜底） */
  private rafBroken = false;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private watchdogId: ReturnType<typeof setInterval> | null = null;
  private lastGlCheck = 0;
  private glLostAt = 0;
  private glLost = false;
  private degradeTried = false;
  private fatal = false;
  private modalShown = false;

  // ---------------------------------------------------------------- 进场 / 调试
  private pendingStart: { skill: Skill; step: number } | null = null;
  private startTapAt = 0;
  private playStartedAt = 0;
  private framesAtPlayStart = 0;
  private debugPanel: DebugPanel | null = null;
  private debugOn = DEBUG;
  private lastErrText = '';
  private errStreak = 0;
  private dbgTaps = 0;
  private dbgTapAt = 0;

  // ---------------------------------------------------------------- 联机
  private net: NetClient | null = null;
  private nick = '玩家';
  private readonly remoteBuf = new RemoteInputBuf();
  private mirror: SnapshotMirror | null = null;
  private pendingEvents: Array<[GameEventKind, unknown]> = [];
  private snapTimer = 0;
  private snapSeq = 0;
  private downTries = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(platform: Platform) {
    this.platform = platform;
    // 底部手柄带：1/6 屏高 + home indicator 安全区，右侧四键放大后
    // 必须整条落在安全区内，因此把安全区高度并入手柄带（3D 视口相应少这几像素）
    this.padH =
      Math.max(146, Math.round(platform.height / 6) + 5) + Math.min(platform.safeBottom, 34);
    this.renderDpr = platform.dpr;
    mark('boot');

    this.scene = new SceneView(
      platform.canvas,
      platform.width,
      platform.height,
      this.padH,
      platform.dpr,
      (reason) => this.onGlEvent(reason),
    );
    mark('scene-ctor', `dpr=${platform.dpr} canvas=${platform.width}x${platform.height}`);
    this.ui = new UiLayer(platform.width, platform.height);
    this.hud = new Hud(
      this.ui,
      platform.width,
      platform.height,
      this.padH,
      platform.safeTop,
    );
    this.pad = new Gamepad(this.ui, platform, platform.width, platform.height, this.padH);
    this.screens = new Screens(this.ui, platform.width, platform.height, {
      onStart: (skill) => this.start(skill),
      onAgain: () => this.again(),
      onHome: () => this.home(),
      onResume: () => this.resume(),
      onInvite: () => this.inviteCreate(),
      onShare: () => this.shareInvite(),
      onHostStart: () => this.hostStartFillAi(),
      onRoomExit: () => this.home(),
      onReconnect: () => this.reconnectNet(),
      onFatalRetry: () => this.retryAfterFatal(),
    }, this.padH);
    this.audio = new GameAudio(() => platform.createAudioContext());

    this.world = this.createWorld(this.skill);
    mark('world-ready');
    this.hud.setVisible(false);
    this.pad.setVisible(false);
    this.pad.setEnabled(false);
    this.screens.showStart(this.skill);
    mark('screens-ready');
    if (this.debugOn) this.enableDebug(true);

    this.bindTouches();
    this.installErrorHooks();

    const q = platform.getLaunchQuery();
    if (q.nick) this.nick = q.nick;
    platform.getNickName((n) => {
      if (n) this.nick = n;
    });
    if (q.room) {
      // 好友点分享卡片冷启动：自动进房
      this.joinOnline(q.room);
    }

    this.last = platform.now();
    this.lastFrameWall = this.last;
    this.startDriver();
    this.armWatchdog();

    try {
      envInfo(this.scene.glInfo());
    } catch (e) {
      recordError('gl-info', e);
    }
    mark('schedule', `driver=${this.rafBroken ? 'timer' : 'raf'}`);

    if (typeof globalThis !== 'undefined') {
      (globalThis as unknown as { __paiqiu?: App }).__paiqiu = this;
      (globalThis as unknown as { __paiqiuLoseCtx?: () => void }).__paiqiuLoseCtx = () =>
        this.scene.debugLoseContext();
      (globalThis as unknown as { __paiqiuDebug?: (v: boolean) => void }).__paiqiuDebug = (v) =>
        this.enableDebug(v);
    }
  }

  dispose(): void {
    this.disposed = true;
    this.releaseNet();
    this.platform.cancelRaf(this.rafId);
    if (this.timerId !== null) clearTimeout(this.timerId);
    if (this.watchdogId !== null) clearInterval(this.watchdogId);
  }

  // ---------------------------------------------------------------- 流程

  /**
   * 点「开始比赛」：只做"必须在手势内完成"的事（解锁音频），
   * 建世界 / 建角色 / 开局拆到后续帧（每帧一步），避免真机上一次性长任务。
   * 任何一步失败都会落到 showFatal 面板，不会静默停住。
   */
  private start(skill: Skill): void {
    if (this.pendingStart) return;
    mark('tap-start', skill);
    this.skill = skill;
    this.mode = 'local';
    this.state = 'start';
    this.fatal = false;
    try {
      // iOS 必须在用户手势上下文内创建/恢复 WebAudio
      this.audio.unlock();
      this.audio.startBgm();
      mark('audio-ok');
    } catch (e) {
      recordError('audio', e);
    }
    this.pendingStart = { skill, step: 1 };
    this.startTapAt = this.platform.now();
  }

  /** 每帧推进一步进场；分帧执行，单帧工作量可控 */
  private pumpStart(): void {
    const p = this.pendingStart;
    if (!p) return;
    try {
      if (p.step === 1) {
        this.world = this.createWorld(p.skill);
        mark('start:world');
        p.step = 2;
        return;
      }
      if (p.step === 2) {
        this.world.startMatch();
        mark('start:match');
        p.step = 3;
        return;
      }
      this.pendingStart = null;
      this.state = 'playing';
      this.screens.hide();
      this.screens.setResultMode('local');
      this.hud.setVisible(true);
      this.pad.setVisible(true);
      this.pad.setEnabled(true);
      this.acc = 0;
      this.last = this.platform.now();
      this.playStartedAt = this.last;
      this.framesAtPlayStart = this.frameNo;
      this.degradeTried = false;
      mark('start:play', `frames=${this.frameNo}`);
    } catch (e) {
      this.pendingStart = null;
      this.onFatal('开始比赛失败', e);
    }
  }

  private again(): void {
    if (this.mode === 'host') this.net?.sendStart(this.skill);
    else if (this.mode === 'guest') this.net?.sendAgain();
    else this.start(this.skill);
  }

  private pause(): void {
    if (this.state !== 'playing' || this.mode !== 'local') return;
    this.state = 'paused';
    this.pad.setEnabled(false);
    this.pad.setVisible(false);
    this.screens.showPause();
  }

  private resume(): void {
    if (this.state !== 'paused' || this.mode !== 'local') return;
    this.state = 'playing';
    this.screens.hide();
    this.pad.setVisible(true);
    this.pad.setEnabled(true);
    this.acc = 0;
    this.last = this.platform.now();
  }

  private home(): void {
    this.releaseNet();
    this.pendingStart = null;
    this.fatal = false;
    this.modalShown = false;
    this.errStreak = 0;
    this.mode = 'local';
    try {
      this.world = this.createWorld(this.skill);
      this.state = 'start';
      this.screens.showStart(this.skill);
    } catch (e) {
      this.onFatal('返回首页失败', e);
      return;
    }
    this.hud.setVisible(false);
    this.pad.setEnabled(false);
    this.pad.setVisible(false);
  }

  // ---------------------------------------------------------------- 联机流程

  private ensureNet(): boolean {
    if (this.net) return true;
    const q = this.platform.getLaunchQuery();
    if (CLOUD_ENV && cloudAvailable()) {
      // 生产：云开发（云函数 + 数据库直写/watch）
      try {
        this.net = new CloudRoomClient((e) => this.onNetEvent(e), CLOUD_ENV);
        return true;
      } catch {
        this.screens.toast('云联机初始化失败，请检查环境配置');
        return false;
      }
    }
    if (typeof WebSocket !== 'undefined') {
      // 开发/自动化测试：本地 WS（wx-test 页面即此路径）
      this.net = new RoomClient((e) => this.onNetEvent(e), q.server || DEFAULT_SERVER_URL);
      return true;
    }
    // 真机未配置云环境：给可读提示，回落单人模式，不崩不白屏
    this.screens.toast('云环境未配置 · 联机暂不可用');
    return false;
  }

  private inviteCreate(): void {
    if (!this.ensureNet()) return;
    this.mode = 'host';
    this.net?.createRoom(this.nick);
  }

  private joinOnline(roomId: string): void {
    if (!this.ensureNet()) return;
    this.mode = 'guest';
    this.net?.joinRoom(roomId, this.nick);
  }

  private shareInvite(): void {
    const rid = this.net?.roomId;
    if (!rid) return;
    this.platform.shareAppMessage('弹弹排球｜来和我组队打排球！2v2 走起', `room=${rid}`);
    this.screens.toast('已发起分享（浏览器环境已复制邀请链接）');
  }

  private hostStartFillAi(): void {
    this.net?.sendStart(this.skill);
  }

  private reconnectNet(): void {
    const rid = this.net?.roomId;
    if (!rid) {
      this.home();
      return;
    }
    this.downTries = 0;
    this.net?.joinRoom(rid, this.nick, true);
  }

  private releaseNet(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.net) {
      this.net.leave();
      this.net = null;
    }
    this.mirror = null;
    this.downTries = 0;
  }

  private beginOnlineMatch(cfg: StartCfg): void {
    try {
      this.beginOnlineMatchInner(cfg);
      mark('online:play');
    } catch (e) {
      this.onFatal('联机开局失败', e);
    }
  }

  private beginOnlineMatchInner(cfg: StartCfg): void {
    this.mode = this.net && this.net.pid === 1 ? 'guest' : 'host';
    this.audio.unlock();
    this.audio.startBgm();

    const world = new World({
      teamSize: 2,
      skill: cfg.skill,
      humanCount: cfg.fillAi ? 1 : 2,
      humanTeam: 0,
      names: [cfg.names[0], cfg.names[1]],
      localPlayerId: this.net ? this.net.pid : 0,
      seed: cfg.seed,
    });
    if (this.mode === 'host') {
      // 房主：pid 0 吃本地手柄，pid 1 吃好友上行输入
      world.inputProvider = (pid) =>
        pid === 0 ? this.pad.read(this.world) : this.remoteBuf.take(this.platform.now());
    }
    this.world = world;
    this.scene.build(world);

    if (this.mode === 'guest') {
      // 客机先复位再接线：初始 announce 不重复（权威快照会带来）
      world.startMatch();
      this.wire(world);
      this.mirror = new SnapshotMirror(world);
    } else {
      // 房主：先挂事件收集器再挂本地表现——matchEnd 触发时
      // wire 里的最终快照才能带上终局事件
      const bus = world.events as unknown as {
        on: (k: string, fn: (p: unknown) => void) => void;
      };
      for (const k of EVENT_KINDS) {
        bus.on(k, (p) => this.pendingEvents.push([k, p]));
      }
      this.wire(world);
      world.startMatch();
      this.mirror = null;
    }

    this.pendingEvents = [];
    this.snapTimer = 0;
    this.snapSeq = 0;
    this.screens.setResultMode(this.mode);
    this.state = 'playing';
    this.screens.hide();
    this.hud.setVisible(true);
    this.pad.setVisible(true);
    this.pad.setEnabled(true);
    this.acc = 0;
    this.last = this.platform.now();
    this.playStartedAt = this.last;
    this.framesAtPlayStart = this.frameNo;
    this.degradeTried = false;
    this.pendingStart = null;
  }

  private sendSnapshot(): void {
    if (this.mode !== 'host' || !this.net) return;
    this.net.sendSnap(encodeSnapshot(this.world, this.snapSeq++, this.pendingEvents));
    this.pendingEvents = [];
  }

  private onNetEvent(e: RoomEvent): void {
    switch (e.t) {
      case 'room':
        this.downTries = 0;
        this.screens.showRoom(e.pid, e.roomId, e.players);
        break;
      case 'players':
        this.screens.updateRoom(e.players);
        if (this.mode === 'host' && this.state === 'start' && e.players.length >= 2) {
          // 满员自动开局（世界自带 3 秒开场倒计时）
          this.net?.sendStart(this.skill);
        }
        break;
      case 'start':
        this.downTries = 0;
        this.beginOnlineMatch(e.cfg);
        break;
      case 'snap':
        this.mirror?.apply(e.d, this.platform.now());
        break;
      case 'input':
        this.remoteBuf.push(e.d, this.platform.now());
        break;
      case 'peerBack':
        if (this.mode === 'host' && this.state === 'playing') {
          this.world.setHumanControl(1, true);
          this.screens.toast('好友已回归');
        }
        break;
      case 'againReq':
        if (this.mode === 'host' && this.state === 'result') this.net?.sendStart(this.skill);
        break;
      case 'peerLeft':
        this.onPeerLeft(e.reason);
        break;
      case 'error':
        this.onNetError(e.code, e.msg);
        break;
      case 'down':
        this.onTransportDown();
        break;
    }
  }

  private onPeerLeft(reason: string): void {
    const intentional = reason === 'exit';
    if (this.state === 'playing') {
      if (this.mode === 'host') {
        // 好友中途掉线：AI 接管其号位，房主继续对局
        this.world.setHumanControl(1, false);
        this.hud.announce(intentional ? '好友已离开' : '好友断线', 'AI 队友接管', 1400);
      } else {
        // 房主是权威端：房主断了这局无法继续
        this.screens.showNetDown('房主已断开\n本局无法继续', false);
      }
      return;
    }
    if (this.state === 'result') {
      this.screens.toast(intentional ? '对方已返回大厅' : '对方已断开');
      return;
    }
    // 等待房：房间随对方离开自动解散
    if (this.mode !== 'local') {
      this.releaseNet();
      this.mode = 'local';
      this.world = this.createWorld(this.skill);
      this.state = 'start';
      this.screens.showStart(this.skill);
      this.screens.toast(intentional ? '对方已离开，房间解散' : '对方断线，房间解散');
    }
  }

  private onNetError(code: string, msg: string): void {
    this.screens.toast(msg || '操作失败');
    if (this.state === 'playing') return; // 对局中错误不打断比赛
    if (this.screens.state === 'room' || this.screens.state === 'netdown') {
      this.releaseNet();
      this.mode = 'local';
      this.world = this.createWorld(this.skill);
      this.state = 'start';
      this.screens.showStart(this.skill);
    }
    void code;
  }

  private onTransportDown(): void {
    if (this.state === 'playing') {
      if (this.mode === 'host') {
        // 房主本地继续，好友位切 AI，等待客机自行重连
        this.world.setHumanControl(1, false);
        this.hud.announce('网络断开', 'AI 队友接管', 1400);
        return;
      }
      if (this.downTries < 3) {
        this.downTries++;
        const rid = this.net?.roomId;
        if (rid) {
          // 先调度重连再播提示：任何提示异常都不能阻塞重连
          this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.net?.joinRoom(rid, this.nick, true);
          }, 800 * this.downTries);
        }
        try {
          this.hud.announce('正在重连', `第 ${this.downTries} 次`, 800);
        } catch {
          // 提示失败不阻塞重连
        }
        return;
      }
      this.downTries = 0;
      this.screens.showNetDown('重连失败\n请检查网络后重试', true);
      return;
    }
    // 非对局中（等待房 / 冷启动进房失败）
    if (this.mode !== 'local') this.screens.showNetDown('网络连接断开', true);
  }

  // ---------------------------------------------------------------- 装配

  private createWorld(skill: Skill): World {
    const world = new World({
      teamSize: 2,
      skill,
      humanCount: 1,
      humanName: '你',
    });
    world.inputProvider = () => this.pad.read(world);
    this.scene.build(world);
    this.wire(world);
    return world;
  }

  private wire(world: World): void {
    world.events.on('hit', (e) => {
      this.scene.onHit(e);
      this.audio.hit(e.power, e.kind === 'attack');
    });
    world.events.on('block', (e) => {
      this.scene.onBlock(e);
      this.audio.block();
    });
    world.events.on('land', (e) => {
      this.scene.onLand(e);
      this.audio.land();
    });
    world.events.on('score', (e) => {
      this.audio.score();
      for (const p of world.players) {
        if (p.team === e.winner) this.scene.celebratePlayer(p.id);
      }
    });
    world.events.on('announce', (e) => {
      let sub = e.sub;
      if (this.mode === 'guest' && e.text === '我方发球' && world.serverId !== world.localPlayerId) {
        sub = '队友发球 · 做好接球准备';
      }
      this.hud.announce(e.text, sub, e.ms);
    });
    world.events.on('tick', () => this.audio.tick());
    world.events.on('serve', () => this.audio.serve());
    world.events.on('net', () => this.audio.net());
    world.events.on('jump', () => this.audio.jump());
    world.events.on('dive', () => this.audio.dive());
    world.events.on('swing', () => this.audio.swing());
    world.events.on('setEnd', () => this.audio.fanfare());
    world.events.on('matchEnd', (e: { winner: TeamId; mvp: string }) => {
      this.state = 'result';
      this.pad.setEnabled(false);
      this.pad.setVisible(false);
      this.hud.setVisible(false);
      this.screens.showResult(world, e.winner, e.mvp);
      this.audio.fanfare();
      this.net?.settle?.({
        winner: e.winner,
        setsWon: [world.setsWon[0], world.setsWon[1]],
        mvp: e.mvp,
      });
      if (this.mode === 'host') this.sendSnapshot(); // 立刻把 matchEnd 推给客机
    });
  }

  private guard(name: string, fn: () => void): void {
    try {
      fn();
    } catch (e) {
      recordError(name, e);
      this.enableDebug(true);
      this.updateDebugPanel();
    }
  }

  /** 真机没有开发者工具时的应急开关：首页底部版本行连点 5 下 */
  private tapDebug(pt: { x: number; y: number }): void {
    if (this.platform.height - pt.y > 48) return;
    if (this.state !== 'start') return;
    const now = this.platform.now();
    if (now - this.dbgTapAt > 2000) this.dbgTaps = 0;
    this.dbgTapAt = now;
    this.dbgTaps++;
    if (this.dbgTaps >= 5) {
      this.dbgTaps = 0;
      this.enableDebug(!this.debugOn);
      this.screens.toast(this.debugOn ? '调试面板已开启' : '调试面板已关闭');
      mark('debug-toggle', this.debugOn ? 'on' : 'off');
    }
  }

  private bindTouches(): void {
    this.platform.onTouchStart((changed) => {
      this.guard('touch-start', () => {
        if (this.screens.visible) {
          this.screens.touchStart(changed);
          return;
        }
        const first = changed[0];
        if (
          this.state === 'playing' &&
          this.mode === 'local' &&
          first &&
          this.hud.hitPause(first.x, first.y)
        ) {
          this.pause();
          return;
        }
        this.pad.onStart(changed);
      });
    });
    this.platform.onTouchMove((active) => {
      this.guard('touch-move', () => {
        if (!this.screens.visible) this.pad.onMove(active);
      });
    });
    this.platform.onTouchEnd((changed, active) => {
      this.guard('touch-end', () => {
        const first = changed[0];
        if (first) this.tapDebug(first);
        if (this.screens.visible) {
          this.screens.touchEnd(changed);
          return;
        }
        this.pad.onEnd(changed, active);
      });
    });
    this.platform.onTouchCancel(() => this.guard('touch-cancel', () => this.pad.onCancel()));
  }

  // ---------------------------------------------------------------- 主循环 / 调度

  /**
   * 帧调度：优先 rAF；只要 rAF 出现一次"超时没回调"，watchdog 就永久切到
   * setTimeout 驱动（微信小游戏在部分机型/基础库上 canvas.requestAnimationFrame
   * 会不回调，这是首页定格的最可能原因）。
   */
  private startDriver(): void {
    this.framePending = false;
    this.schedule();
  }

  private schedule(): void {
    if (this.disposed || this.framePending) return;
    this.framePending = true;
    const seq = ++this.seq;
    const run = (): void => {
      // watchdog 接管后，旧 rAF 回调直接作废（seq 已变）
      if (this.disposed || seq !== this.seq) return;
      this.framePending = false;
      this.frame();
      this.schedule();
    };

    if (this.rafBroken) {
      this.timerId = setTimeout(run, 16);
      return;
    }
    try {
      // 小游戏里全局 requestAnimationFrame 与 canvas.requestAnimationFrame 行为不同，
      // 两者都试：全局优先（官方示例即用全局），失败再退回平台封装。
      const globalRaf = (
        globalThis as unknown as {
          requestAnimationFrame?: (this: unknown, cb: () => void) => number;
        }
      ).requestAnimationFrame;
      if (typeof globalRaf === 'function') {
        this.rafId = globalRaf.call(globalThis as object, run);
      } else {
        this.rafId = this.platform.raf(() => {
          run();
        });
      }
    } catch (e) {
      recordError('raf', e);
      trace('raf-fail', String(e));
      this.rafBroken = true;
      this.framePending = false;
      this.schedule();
    }
  }

  /** 独立于 rAF 的 watchdog：rAF 不回调时接管、检测渲染停滞、轮询 GL 上下文 */
  private armWatchdog(): void {
    this.watchdogId = setInterval(() => {
      if (this.disposed) return;
      const now = this.platform.now();

      // 1) 帧调度停滞：直接接管并永久改用 setTimeout
      const gap = now - this.lastFrameWall;
      if (gap > 320) {
        trace('watchdog:no-frame', `gap=${Math.round(gap)}ms rafBroken=${this.rafBroken}`);
        this.rafBroken = true;
        this.seq++;
        this.framePending = false;
        this.frame();
        this.schedule();
      }

      // 2) 渲染停滞自愈：1.2s 没有成功渲染 → 安全渲染重试一次
      if (this.frameNo > 0 && now - this.lastGoodRender > 1200) {
        if (!this.degradeTried) {
          this.degradeTried = true;
          trace('watchdog:degrade', `stall=${Math.round(now - this.lastGoodRender)}ms`);
          try {
            this.scene.applySafeFallback();
            this.hud.announce('已切换安全渲染', '画面恢复后请继续比赛', 1500);
          } catch (e) {
            recordError('degrade', e);
          }
        } else if (now - this.lastGoodRender > 3000 && !this.fatal) {
          this.onFatal('画面停止更新', '渲染无响应，安全渲染也没能恢复');
        }
      }

      // 3) WebGL 上下文（事件在真机上收不到，只能轮询 isContextLost）
      this.checkGl(now);

      // 4) 调试面板内容 + 进场兜底提示
      this.updateDebugPanel();
      if (this.pendingStart && now - this.startTapAt > 4000) {
        // 理论上不会走到这里（分帧进场最多 3 帧）；防御性兜底
        this.onFatal('进场超时', '点击开始后 4 秒仍未进入对局');
      }
    }, 250);
  }

  private checkGl(now: number): void {
    if (now - this.lastGlCheck < 800) return;
    this.lastGlCheck = now;
    const lost = this.scene.isContextLost();
    if (lost && !this.glLost) {
      this.glLost = true;
      this.glLostAt = now;
      trace('gl-lost');
      this.screens.toast('渲染上下文丢失 · 正在恢复');
    } else if (!lost && this.glLost) {
      this.glLost = false;
      trace('gl-restored');
      this.screens.toast('渲染已恢复');
      this.degradeTried = false;
    }
    if (this.glLost && now - this.glLostAt > 3000 && !this.fatal) {
      this.onFatal('显卡上下文丢失', '画面渲染已中断，可点重试或重启小游戏');
    }
  }

  /** WebGL 事件通道（真机上通常收不到，收到就用） */
  private onGlEvent(reason: string): void {
    if (reason === 'webglcontextrestored') {
      this.glLost = false;
      this.degradeTried = false;
      trace('gl-restored(event)');
      return;
    }
    this.glLost = true;
    this.glLostAt = this.platform.now();
    trace('gl-lost(event)');
  }

  /** 一帧的全部工作；任何异常都在这里被兜住并上屏，不会让画面无声停住 */
  private frame(): void {
    if (this.disposed) return;
    const now = this.platform.now();
    let dt = (now - this.last) / 1000;
    if (!Number.isFinite(dt) || dt < 0) dt = 0;
    dt = Math.min(0.1, dt);
    this.last = now;

    this.fpsAcc += dt;
    this.fpsFrames++;
    if (this.fpsAcc >= 1) {
      this.fps = Math.round(this.fpsFrames / this.fpsAcc);
      this.fpsAcc = 0;
      this.fpsFrames = 0;
      this.maybeDegradeDpr();
    }

    try {
      this.pumpStart();

      if (this.state === 'playing') {
        if (this.mode === 'guest') {
          // 客机：不跑仿真；快照回灌 + 插值 + 输入上行
          this.mirror?.update(now);
          this.net?.sendInput(this.pad.read(this.world));
          this.scene.sync(this.world, this.mirror?.alpha ?? 1, dt);
          this.audio.update(dt);
        } else {
          const slow = this.world.slowmoTimer > 0;
          if (slow) this.world.slowmoTimer = Math.max(0, this.world.slowmoTimer - dt);
          this.acc += dt * (slow ? 0.42 : 1);

          let guard = 0;
          while (this.acc >= STEP && guard++ < 6) {
            this.world.step(STEP);
            this.acc -= STEP;
          }
          this.scene.sync(this.world, this.acc / STEP, dt);
          this.audio.update(dt);

          if (this.mode === 'host') {
            this.snapTimer += dt;
            if (this.snapTimer >= 1 / (this.net?.snapHz ?? SNAP_HZ)) {
              this.sendSnapshot();
              this.snapTimer = 0;
            }
          }
        }
      } else {
        this.acc = 0;
        this.scene.sync(this.world, 1, dt);
      }

      this.hud.update(this.world);
      this.hud.tick(dt);
      this.screens.update(dt);
      this.scene.render();
      this.ui.render(this.scene.renderer);
      this.lastGoodRender = now;
      if (this.errStreak > 0) {
        this.errStreak = 0;
        this.lastErrText = '';
      }
    } catch (e) {
      this.onFrameError(e);
    }

    this.frameNo++;
    this.lastFrameWall = now;
    if (this.frameNo === 1) mark('first-frame', `dt=${Math.round(dt * 1000)}ms`);
    this.debugPanel?.update(dt);
  }

  private onFrameError(e: unknown): void {
    this.errStreak++;
    const err = recordError('frame', e);
    const msg = `${err.stage}: ${err.message}`;
    if (msg !== this.lastErrText) {
      this.lastErrText = msg;
      mark('frame-error', msg);
    }
    this.enableDebug(true);
    this.updateDebugPanel();
    // 连续三帧都报错：渲染通道可能已废，用系统弹窗保证玩家看见
    if (this.errStreak === 3 && !this.modalShown) {
      this.modalShown = true;
      this.platform.showModal('游戏画面出错', err.message.slice(0, 200));
    }
  }

  // ---------------------------------------------------------------- 错误面板 / 调试

  private enableDebug(v: boolean): void {
    try {
      if (v && !this.debugPanel) {
        this.debugPanel = new DebugPanel(this.ui, this.platform.height);
      }
      this.debugOn = v;
      setDebug(v);
      this.debugPanel?.setVisible(v || !!this.lastErrText);
      if (v) trace('debug-on');
    } catch (e) {
      recordError('debug-panel', e);
    }
  }

  /**
   * 低端机降档：连续 3 秒 <45fps 且已进入对局 4 秒后，主画布 DPR 降一档（3→2.5→2）。
   * 只降不升，且有 8 秒冷却，避免在帧率边缘来回抖动；
   * 2D UI 贴图仍保持启动期的清晰度，不受影响。
   */
  private maybeDegradeDpr(): void {
    if (this.state !== 'playing') {
      this.lowFpsStreak = 0;
      return;
    }
    if (this.platform.now() - this.playStartedAt < 4000) return;
    if (this.platform.now() < this.dprCooldownUntil) return;
    if (this.fps < 45) this.lowFpsStreak++;
    else this.lowFpsStreak = 0;
    if (this.lowFpsStreak < 3) return;

    const next = nextLowerDpr(this.renderDpr);
    this.lowFpsStreak = 0;
    if (!next) return;
    try {
      if (this.scene.setPixelRatio(next)) {
        this.renderDpr = next;
        this.dprCooldownUntil = this.platform.now() + 8000;
        trace('dpr:degrade', `fps=${this.fps} dpr=${next}`);
        mark('dpr:degrade');
      }
    } catch (e) {
      recordError('dpr', e);
    }
  }

  private updateDebugPanel(): void {
    if (!this.debugPanel) return;
    if (!this.debugOn && !this.lastErrText) return;
    let gl: Record<string, string | number | boolean> = {};
    try {
      gl = this.scene.glInfo();
    } catch {
      // 上下文丢失时 getParameter 会失败
    }
    const lastMs = Math.round(this.platform.now() - this.playStartedAt);
    this.debugPanel.setLines([
      `st=${this.screens.state} play=${this.state} ${this.fps}fps f=${this.frameNo}`,
      `mode=${this.mode} ph=${this.world.phase} enter=${this.playStartedAt ? lastMs + 'ms' : '-'}`,
      `dpr=${gl.dpr ?? '?'} buf=${gl.buffer ?? '?'} gl=${gl.gl ?? '?'} maxTex=${gl.maxTex ?? '?'}`,
      `driver=${this.rafBroken ? 'timer' : 'raf'} lost=${gl.lost ?? false} err=${this.errStreak}`,
      this.lastErrText ? `!${this.lastErrText}` : '!none',
    ]);
    this.debugPanel.setVisible(true);
  }

  private onFatal(title: string, e?: unknown): void {
    if (this.fatal) return;
    this.fatal = true;
    this.pendingStart = null;
    this.state = 'start';
    this.pad.setEnabled(false);
    this.pad.setVisible(false);
    const err = recordError(title, e ?? new Error(title));
    mark('fatal', title);
    this.lastErrText = `${title}: ${err.message}`;
    this.enableDebug(true);
    this.updateDebugPanel();
    try {
      this.screens.showFatal(title, `${err.message}\n可点「重试」重新进场，或返回首页。`);
    } catch {
      // 渲染层可能已经坏了，靠下面的系统弹窗
    }
    if ((this.glLost || this.errStreak > 0) && !this.modalShown) {
      this.modalShown = true;
      this.platform.showModal('小游戏遇到问题', `${title}\n${err.message}`.slice(0, 220));
    }
  }

  /** 错误面板「重试」：重建世界再走一次分帧进场；GL 真丢了就优先重建渲染器 */
  private retryAfterFatal(): void {
    trace('retry');
    this.fatal = false;
    this.modalShown = false;
    this.errStreak = 0;
    this.lastErrText = '';
    this.degradeTried = false;
    this.glLost = false;
    if (this.scene.isContextLost()) {
      const ok = this.scene.rebuildRenderer();
      mark('renderer-rebuild', ok ? 'ok' : 'fail');
      if (!ok) {
        this.fatal = true;
        this.platform.showModal('渲染无法恢复', '请杀掉小游戏后重新打开。');
        return;
      }
    }
    try {
      this.world = this.createWorld(this.skill);
      this.screens.showStart(this.skill);
      this.start(this.skill);
    } catch (e) {
      this.onFatal('重试失败', e);
    }
  }

  private installErrorHooks(): void {
    const g = globalThis as unknown as {
      wx?: { onError?: (cb: (res: { message?: string; stack?: string }) => void) => void };
      addEventListener?: (t: string, cb: (e: unknown) => void) => void;
    };
    try {
      g.wx?.onError?.((res) => {
        recordError('wx.onError', res.message || res);
      });
    } catch {
      // 基础库不支持忽略
    }
    try {
      g.addEventListener?.('error', (e) => {
        const ev = e as { message?: string; error?: unknown };
        recordError('window.error', ev.error ?? ev.message ?? 'unknown');
        this.enableDebug(true);
        this.updateDebugPanel();
      });
    } catch {
      // 忽略
    }
  }
}
