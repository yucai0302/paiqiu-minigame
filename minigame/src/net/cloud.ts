/**
 * 云开发联机客户端（生产实现）：
 * - 低频控制流（建房/进房/开局/结算/退出）走云函数 wx.cloud.callFunction；
 * - 对局内状态同步走数据库直写 + 实时推送（watch）：
 *     房主以 CLOUD_SNAPSHOT_HZ 直写 rooms_live 文档，客机 watch 收推送；
 *     好友把聚合输入写 rooms_inputs 文档，房主 watch 收输入。
 *   不用 callFunction 传快照/输入：单次延迟 ~100-300ms 且按调用次数计费，
 *   8~10Hz 会同时拖垮延迟与成本；数据库直写 + 安全规则是云开发的常规做法。
 * - 断线感知：双方静默超时（好友输入停 6s → 房主 AI 接管；快照停 8s → 客机重连），
 *   主动退出走 markDisconnect 云函数。
 *
 * 本地跑不了真实云环境，本文件保证类型与协议正确；共享纯逻辑（座位状态机/
 * 快照单调合并）在各云函数目录的 logic.js，由 tools/test-cloud-logic.mjs 覆盖。
 */

import type { ControlInput } from '../sim/types';
import type { Skill } from '../sim/ai';
import {
  CLOUD_INPUT_DEAD_MS,
  CLOUD_INPUT_FLUSH_MS,
  CLOUD_SNAPSHOT_HZ,
  CLOUD_SNAP_DEAD_MS,
} from '../config/cloud';
import type { Snap } from './mirror';
import type { NetClient, RoomEvent, StartCfg } from './room';

/* eslint-disable @typescript-eslint/no-explicit-any */
const wxAny = (): any => (globalThis as unknown as { wx?: any }).wx;

/** 云能力是否可用（wx.cloud 存在；CLOUD_ENV 是否配置由调用方判断） */
export function cloudAvailable(): boolean {
  const wx = wxAny();
  return !!(wx && wx.cloud);
}

let cloudInited = false;

/**
 * wx.cloud.init：小游戏要求在启动早期、带 env 调用一次。
 * 幂等：重复调用只初始化一次（CloudRoomClient 构造时也会兜底调用）。
 * traceUser: true —— 云函数内 getWXContext() 能拿到用户身份，权限/日志排查依赖它。
 */
export function initCloud(env: string): boolean {
  const wx = wxAny();
  if (!wx || !wx.cloud || !env) return false;
  if (!cloudInited) {
    wx.cloud.init({ env, traceUser: true });
    cloudInited = true;
  }
  return true;
}

export class CloudRoomClient implements NetClient {
  roomId: string | null = null;
  pid: 0 | 1 = 0;
  readonly snapHz = CLOUD_SNAPSHOT_HZ;

  private watchers: Array<{ close(): void }> = [];
  private inputAgg: ControlInput | null = null;
  private inputTimer: ReturnType<typeof setInterval> | null = null;
  private staleTimer: ReturnType<typeof setInterval> | null = null;
  private lastInputAt = 0;
  private lastSnapAt = 0;
  private peerGone = false;
  private matchApplied = false;
  private snapQ: number | null = null;

  constructor(
    private readonly onEvent: (e: RoomEvent) => void,
    env: string,
  ) {
    if (!initCloud(env)) throw new Error('cloud-unavailable');
  }

  createRoom(name: string): void {
    this.callFn('createRoom', { name })
      .then((res) => {
        const r = res as { roomId: string; pid: 0 | 1 };
        this.roomId = String(r.roomId);
        this.pid = r.pid;
        this.matchApplied = false;
        this.emitRoom([{ pid: 0, name }]);
        this.watchRoomDoc();
        this.startTimers();
      })
      .catch((e: unknown) => this.fail(e));
  }

  joinRoom(roomId: string, name: string, resume = false): void {
    this.roomId = roomId;
    this.matchApplied = false;
    // 断线重连场景：旧 watch 可能已死或重复，先全部关掉再重建
    this.closeWatchers();
    this.callFn('joinRoom', { roomId, name, resume })
      .then((res) => {
        const r = res as { pid: 0 | 1; players: Array<{ pid: number; name: string }> };
        this.pid = r.pid;
        this.emitRoom(r.players ?? []);
        this.watchRoomDoc();
        if (this.pid === 1) this.watchLiveDoc();
        else this.watchInputDoc();
        this.startTimers();
      })
      .catch((e: unknown) => this.fail(e));
  }

  sendStart(skill: Skill): void {
    // 云函数写入 matchCfg，双方 room watch 收到后各自开局（与 WS 的服务器广播同构）
    this.callFn('startMatch', {
      roomId: this.roomId,
      skill,
      seed: Date.now() % 2147483647,
    }).catch((e: unknown) => this.fail(e));
  }

  sendSnap(d: Snap): void {
    // 房主直写 live 文档（安全规则：仅房主可写）
    this.updateDoc('rooms_live', { q: d.q, s: JSON.stringify(d), updatedAt: Date.now() });
  }

  sendInput(inp: ControlInput): void {
    // 聚合：边沿立即刷库，保持量按节流窗口刷（好友每帧调用，这里压到 ~10Hz）
    const flushNow =
      this.inputAgg === null || inp.hit || inp.jump || inp.block || inp.spike || inp.setup;
    if (this.inputAgg === null) {
      this.inputAgg = { ...inp };
    } else {
      const a = this.inputAgg;
      a.hit = a.hit || inp.hit;
      a.jump = a.jump || inp.jump;
      a.block = a.block || inp.block;
      a.spike = a.spike || inp.spike;
      a.setup = a.setup || inp.setup;
      a.sprint = inp.sprint;
      a.hitHeld = inp.hitHeld;
      a.blockHeld = inp.blockHeld;
      a.moveX = inp.moveX;
      a.moveZ = inp.moveZ;
    }
    if (flushNow) this.flushInput();
  }

  sendAgain(): void {
    // 复用输入通道带 again 标记，房主 watch 解析成再战请求
    this.updateDoc('rooms_inputs', { d: '', at: Date.now(), again: true });
  }

  settle(result: { winner: number; setsWon: [number, number]; mvp: string }): void {
    this.callFn('settleMatch', { roomId: this.roomId, ...result }).catch(() => undefined);
  }

  leave(): void {
    this.callFn('markDisconnect', { roomId: this.roomId })
      .catch(() => undefined)
      .then(() => this.cleanup());
  }

  // ---------------------------------------------------------------- 内部

  private callFn(name: string, data: Record<string, unknown>): Promise<unknown> {
    // 同步异常（如运行时 wx.cloud 能力残缺）也转成 rejected promise，
    // 统一走 .catch -> fail() -> 可读提示，不冒成 pageerror
    try {
      const wx = wxAny();
      return Promise.resolve(
        wx.cloud
          .callFunction({ name, data: { ...data, pid: this.pid } })
          .then((r: { result?: unknown }) => r.result),
      );
    } catch (e) {
      return Promise.reject(e);
    }
  }

  private updateDoc(col: string, fields: Record<string, unknown>): void {
    try {
      const wx = wxAny();
      wx.cloud
        .database()
        .collection(col)
        .doc(String(this.roomId))
        .update({ data: { ...fields, updatedAt: Date.now() } });
    } catch {
      // 静默：静默计时器会把断线兜出来
    }
  }

  private flushInput(): void {
    const agg = this.inputAgg;
    this.inputAgg = null;
    if (!agg || this.roomId === null) return;
    try {
      const wx = wxAny();
      wx.cloud
        .database()
        .collection('rooms_inputs')
        .doc(`${this.roomId}-${this.pid}`)
        .update({ data: { d: JSON.stringify(agg), at: Date.now() } });
    } catch {
      // ignore
    }
  }

  private watch(
    col: string,
    docId: string,
    cb: (doc: Record<string, unknown>) => void,
  ): void {
    try {
      const wx = wxAny();
      const w = wx.cloud
        .database()
        .collection(col)
        .doc(docId)
        .watch({
          onChange: (snap: { docs?: Array<Record<string, unknown>> }) => {
            const doc = snap?.docs?.[0];
            if (doc) cb(doc);
          },
          onError: () => {
            this.onEvent({ t: 'down' });
          },
        });
      this.watchers.push(w);
    } catch {
      // watch 建立失败：走 down 让上层重连
      this.onEvent({ t: 'down' });
    }
  }

  private watchRoomDoc(): void {
    this.watch('rooms', String(this.roomId), (doc) => this.onRoomDoc(doc));
  }

  private watchLiveDoc(): void {
    this.watch('rooms_live', String(this.roomId), (doc) => {
      const s = String(doc.s ?? '');
      if (!s) return;
      this.lastSnapAt = Date.now();
      try {
        const snap = JSON.parse(s) as Snap;
        // 快照 q 单调去重（watch 偶发重推/乱序时只应用更新的）
        const q = (snap as { q?: number }).q ?? -1;
        if (q > (this.snapQ ?? -1)) {
          this.snapQ = q;
          this.onEvent({ t: 'snap', d: snap });
        }
      } catch {
        // 半包解析失败丢弃，等下一份
      }
    });
  }

  private watchInputDoc(): void {
    this.watch('rooms_inputs', `${this.roomId}-1`, (doc) => {
      const at = Number(doc.at ?? 0);
      if (at) this.lastInputAt = at;
      if (this.peerGone) {
        this.peerGone = false;
        this.onEvent({ t: 'peerBack' });
      }
      if (doc.again) {
        this.onEvent({ t: 'againReq' });
        return;
      }
      const d = String(doc.d ?? '');
      if (!d) return;
      try {
        this.onEvent({ t: 'input', d: JSON.parse(d) as ControlInput });
      } catch {
        // ignore
      }
    });
  }

  private onRoomDoc(doc: Record<string, unknown>): void {
    const members = (doc.members as Array<string | undefined>) ?? [];
    const names = (doc.names as Array<string | undefined>) ?? [];
    const players: Array<{ pid: number; name: string }> = [];
    for (let i = 0; i < members.length; i++) {
      if (members[i]) players.push({ pid: i, name: names[i] || '玩家' });
    }
    this.onEvent({ t: 'players', players });

    const state = String(doc.state ?? '');
    const cfg = doc.matchCfg as
      | { skill: Skill; seed: number; names: [string, string]; fillAi: boolean }
      | undefined;

    if (state === 'playing' && cfg && !this.matchApplied) {
      this.matchApplied = true;
      this.lastSnapAt = Date.now();
      this.lastInputAt = Date.now();
      this.snapQ = null;
      this.onEvent({ t: 'start', cfg: cfg as StartCfg });
    } else if (state === 'result') {
      this.matchApplied = false;
    }

    // 好友席位被标记断开/退出：房主侧触发 AI 接管
    if (this.pid === 0 && state === 'playing' && doc.guestAlive === false && !this.peerGone) {
      this.peerGone = true;
      this.onEvent({ t: 'peerLeft', reason: 'exit' });
    }
    // 房主退出/关房：客机侧明确提示
    if (this.pid === 1 && state === 'closed') {
      this.onEvent({ t: 'peerLeft', reason: 'exit' });
    }
  }

  private emitRoom(players: Array<{ pid: number; name: string }>): void {
    this.onEvent({ t: 'room', roomId: String(this.roomId), pid: this.pid, players });
  }

  private startTimers(): void {
    if (this.inputTimer === null) {
      this.inputTimer = setInterval(() => this.flushInput(), CLOUD_INPUT_FLUSH_MS);
    }
    if (this.staleTimer === null) {
      this.lastSnapAt = Date.now();
      this.lastInputAt = Date.now();
      this.staleTimer = setInterval(() => {
        const now = Date.now();
        // 客机：快照静默 → 视为传输断开，走重连
        if (this.pid === 1 && now - this.lastSnapAt > CLOUD_SNAP_DEAD_MS) {
          this.lastSnapAt = now;
          this.onEvent({ t: 'down' });
        }
        // 房主：好友输入静默 → AI 接管（对局不中断）
        if (this.pid === 0 && !this.peerGone && now - this.lastInputAt > CLOUD_INPUT_DEAD_MS) {
          this.peerGone = true;
          this.onEvent({ t: 'peerLeft', reason: 'disconnect' });
        }
      }, 2000);
    }
  }

  private fail(e: unknown): void {
    const msg = e instanceof Error ? e.message : '云服务暂不可用，请稍后再试';
    this.onEvent({ t: 'error', code: 'cloud', msg });
    this.onEvent({ t: 'down' });
  }

  private cleanup(): void {
    this.closeWatchers();
    if (this.inputTimer !== null) clearInterval(this.inputTimer);
    if (this.staleTimer !== null) clearInterval(this.staleTimer);
    this.inputTimer = null;
    this.staleTimer = null;
    this.roomId = null;
  }

  private closeWatchers(): void {
    for (const w of this.watchers) {
      try {
        w.close();
      } catch {
        // ignore
      }
    }
    this.watchers = [];
  }
}
