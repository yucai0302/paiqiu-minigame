/**
 * 无头批量模拟：固定步长跑 N 局人机对战，统计玩家胜率 / 得分率 / 回合触球 / 扣杀链路。
 * 用法（在 minigame 目录）：
 *   npx esbuild tools/bench.ts --bundle --format=esm --platform=node --outfile=.tmp/bench.mjs
 *   node .tmp/bench.mjs --out=.tmp/baseline.json
 */
import { clamp, createRng, dist2D } from '../src/core/math';
import type { Rng } from '../src/core/math';
import type { ControlInput, Player } from '../src/sim/types';
import { emptyInput } from '../src/sim/types';
import { World } from '../src/sim/world';
import type { Skill } from '../src/sim/ai';
import { AI_PROFILES } from '../src/sim/ai';
import { slotPosition } from '../src/sim/formation';
import { COURT, PLAYER } from '../src/sim/config';

const STEP = 1 / 60;
const MAX_SIM = 900; // 单局最多模拟 900s，防止异常死循环
const TRACE = process.argv.includes('--trace');
const TRACE_SKILL = 'normal';
const TRACE_LIMIT = 3; // 只打印前几回合，避免刷屏
let traceRally = 0;

/** 脚本化“中等水平真人”：跑位按阵型 + 球到就击球 + 第三拍起跳扣杀 */
class HumanBot {
  private timer = 0;
  private target: { x: number; z: number } | null = null;
  private readonly servePower: number;
  constructor(private readonly rng: Rng) {
    this.servePower = rng(0.55, 0.9);
  }

  read(w: World, p: Player, dt: number): ControlInput {
    const inp = emptyInput();
    if (w.phase === 'serve') {
      if (p.id === w.serverId) {
        inp.hitHeld = p.charge < this.servePower;
      } else {
        const s = slotPosition(p.team, w.teamSize, p.slot);
        this.move(p, inp, s.x, s.z);
      }
      return inp;
    }
    if (w.phase !== 'rally') return inp;

    const ball = w.ball;
    const landing = w.predictLanding();
    this.timer -= dt;
    if (this.timer <= 0 || !this.target) {
      this.timer = 0.3;
      this.update(w, p, landing);
    }
    if (this.target) this.move(p, inp, this.target.x, this.target.z);

    const touches = w.touches[p.team];
    const plan = w.attackPlan[p.team];
    const attacker = plan.attackerId === null || plan.attackerId === p.id;
    const hd = dist2D(ball.pos.x, ball.pos.z, p.pos.x, p.pos.z);
    const canHit = w.ballInReach(p);

    // 只处理“自己该碰的球”：第二拍归指定的二传，避免真人误抢队友的传球
    let want = true;
    if (touches === 1) {
      want = plan.setterId === p.id || ball.pos.y < 1.05;
    } else if (touches >= 2) {
      want = attacker || (ball.pos.y < 1.2 && hd < 1.0);
    }

    // 第三拍：起跳 + 挥臂。真人不是“等球贴手才按”，而是提前按（游戏也留了 0.35s 输入缓冲），
    // 这里按提前量判断，模拟真人预判；拟人机器人再叠加 150~300ms 按键延迟后正好落在球上。
    if (touches >= 2 && attacker && p.grounded && hd < 2.2) {
      const tt = w.ballTimeToHeight(PLAYER.spikeMinY + 0.6);
      if (tt !== null && tt <= 0.55 && tt > 0.02) inp.jump = true;
    }
    const ttChest = w.ballTimeToHeight(PLAYER.spikeMinY + 0.3);
    const anticipate = ttChest !== null && ttChest <= 0.3 && hd < 2.2;
    inp.hit = (canHit && want) || w.attackWindow(p) || (want && anticipate);

    // 拦网：看到对面攻手起跳 → 同步起跳封堵（比“猜球什么时候下落”更接近真人时机）
    const oppAttacker = w.players.find(
      (q) =>
        q.team === 1 - p.team &&
        !q.grounded &&
        q.pos.y > 0.05 &&
        Math.abs(q.pos.z) < 2.8 &&
        q.pos.y < 1.2,
    );
    if (
      oppAttacker &&
      ball.live &&
      ball.lastHitTeam === 1 - p.team &&
      w.touches[1 - p.team] >= 2 &&
      Math.abs(ball.pos.z) < 3.0 &&
      Math.abs(oppAttacker.pos.x - p.pos.x) < 1.45 &&
      Math.abs(p.pos.z) < 1.8 &&
      p.grounded
    ) {
      inp.block = true;
    }
    return inp;
  }

  private update(w: World, p: Player, landing: { x: number; z: number; t: number } | null): void {
    const sign = p.team === 0 ? 1 : -1;
    const slot = slotPosition(p.team, w.teamSize, p.slot);
    const touches = w.touches[p.team];
    const plan = w.attackPlan[p.team];
    const incoming = landing !== null && Math.sign(landing.z) === sign;

    // 深位优先守后场：不在网前附近就不去拦网，避免 2v2 把后场放空
    // （前场拦网交给近网位的队友，真人只有在刚扣完还留在网前时才会顺手拦一下）

    if (touches === 1 && plan.attackerId === p.id && plan.setterId !== p.id) {
      const zone = w.attackZone(p.team);
      this.target = { x: zone.x, z: zone.z };
      return;
    }
    if (incoming && landing!.t < 2.0 && (touches < 2 || plan.attackerId === p.id)) {
      this.target = {
        x: clamp(landing!.x + this.rng(-0.25, 0.25), -COURT.halfWidth, COURT.halfWidth),
        z: clamp(landing!.z + this.rng(-0.2, 0.2), sign > 0 ? 0.6 : -8.2, sign > 0 ? 8.2 : -0.6),
      };
      return;
    }
    this.target = { x: slot.x, z: slot.z };
  }

  private move(p: Player, inp: ControlInput, x: number, z: number): void {
    const dx = x - p.pos.x;
    const dz = z - p.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.24) return;
    inp.moveX = dx / d;
    inp.moveZ = dz / d;
    if (d > 2.6 && p.sprintCd <= 0 && p.grounded) inp.sprint = true;
  }
}

/**
 * 拟人机器人：在“中等真人”之上加真人手感误差。
 * - 摇杆持续小幅抖动（每 90~190ms 重新采样），静止时也在微动；
 * - 冲刺间歇性随机触发；
 * - 跳跃/击球按键统一延迟 150~300ms（真人反应 + 触屏延迟）；
 * - 每 6~14 秒乱按一次（提前挥空/乱跳）。
 * 用于暴露“理想机器人”看不出来的问题：真人几乎永远处于 moving 状态。
 */
class HumanLikeBot {
  private inner: HumanBot;
  private t = 0;
  private jitterTimer = 0;
  private jx = 0;
  private jz = 0;
  private queueJump = -1;
  private queueHit = -1;
  private queueBlock = -1;
  private hitHold = 0;
  private noiseCd = 0;
  private noise = 0;

  constructor(private readonly rng: Rng) {
    this.inner = new HumanBot(rng);
  }

  read(w: World, p: Player, dt: number): ControlInput {
    this.t += dt;
    const base = this.inner.read(w, p, dt);
    // 发球阶段需要 hold 蓄力，不能被下面的按键延迟覆盖（否则 9s 后系统自动发球）
    if (w.phase === 'serve') return base;

    this.jitterTimer -= dt;
    if (this.jitterTimer <= 0) {
      this.jitterTimer = this.rng(0.09, 0.19);
      const a = this.rng(-0.45, 0.45);
      const m = this.rng(0, 0.3);
      this.jx = Math.cos(a) * m;
      this.jz = Math.sin(a) * m;
      // 间歇冲刺
      if (this.rng(0, 1) < 0.22) base.sprint = true;
    }
    if (base.moveX !== 0 || base.moveZ !== 0) {
      base.moveX = clamp(base.moveX + this.jx, -1, 1);
      base.moveZ = clamp(base.moveZ + this.jz, -1, 1);
      const l = Math.hypot(base.moveX, base.moveZ);
      if (l > 1) {
        base.moveX /= l;
        base.moveZ /= l;
      }
    } else if (Math.abs(this.jx) + Math.abs(this.jz) > 0.08) {
      // 真人手放在摇杆上，静止也有微动
      base.moveX = this.jx;
      base.moveZ = this.jz;
    }

    if (base.jump && this.queueJump < 0) this.queueJump = this.t + this.rng(0.15, 0.3);
    if (this.queueJump >= 0 && this.t >= this.queueJump) {
      base.jump = true;
      this.queueJump = -1;
    } else {
      base.jump = false;
    }

    if (base.hit && this.queueHit < 0) this.queueHit = this.t + this.rng(0.15, 0.28);
    if (this.queueHit >= 0 && this.t >= this.queueHit) {
      this.hitHold = 0.14;
      this.queueHit = -1;
    }
    this.hitHold = Math.max(0, this.hitHold - dt);
    base.hit = this.hitHold > 0;
    base.hitHeld = this.hitHold > 0;

    // 拦网键同样有触屏延迟
    if (base.block && this.queueBlock < 0) this.queueBlock = this.t + this.rng(0.12, 0.26);
    if (this.queueBlock >= 0 && this.t >= this.queueBlock) {
      base.block = true;
      this.queueBlock = -1;
    } else {
      base.block = false;
    }

    this.noiseCd -= dt;
    if (this.noiseCd <= 0) {
      this.noiseCd = this.rng(6, 14);
      this.noise = 0.25;
    }
    this.noise = Math.max(0, this.noise - dt);
    if (this.noise > 0) {
      base.hit = true;
      base.hitHeld = true;
    }
    // 自动接球口径：接对方扣杀时不按键（只跑位），验证自动触球
    if (DIG_AUTO && w.ball.live && w.ball.lastKind === 'attack' && w.ball.lastHitTeam === 1 - p.team && w.touches[p.team] < 3) {
      base.hit = false;
      base.hitHeld = false;
    }
    return base;
  }
}

/** 玩家是否有真实的扣球机会：第三拍、主攻是玩家、球进入可扣高度带且水平够近 */
function humanSpikeChance(w: World): boolean {
  const h = w.players[0];
  if (!h || !h.isHuman) return false;
  if (w.phase !== 'rally' || w.touches[0] < 2) return false;
  const plan = w.attackPlan[0];
  if (plan.attackerId !== null && plan.attackerId !== 0) return false;
  const b = w.ball;
  if (!b.live || b.dead || h.grounded) return false;
  if (b.pos.z <= -0.4) return false;
  const dxz = Math.hypot(b.pos.x - h.pos.x, b.pos.z - h.pos.z);
  return dxz <= PLAYER.spikeReachXZ && b.pos.y >= PLAYER.spikeMinY && b.pos.y <= PLAYER.spikeMaxY;
}

interface SkillStats {
  skill: Skill;
  matches: number;
  wins: number;
  pointsFor: number;
  pointsAgainst: number;
  rallies: number;
  rallyHits: number;
  rallySeconds: number;
  attacks: number;
  attackKills: number;
  attacks0: number;
  attacks1: number;
  kills0: number;
  kills1: number;
  digs: number;
  digs0: number;
  digs1: number;
  humanAttacks: number;
  humanAttackKills: number;
  humanDirectPoints: number;
  allySetHuman: number;
  humanSetAlly: number;
  aiTripleTouch: number;
  blocks: number;
  aiJumps: number;
  pointsTotal: number;
  // 拦网取证
  blocks0: number;
  blocks1: number;
  humanBlockJumps: number;
  aiBlockJumps: number;
  /** 对手扣球过网高度分布：<2.05 / 2.05~2.5 / 2.5~3.0 / >3.0 */
  crossH: [number, number, number, number];
  /** 我方扣球过网高度分布（同分档） */
  crossH0: [number, number, number, number];
  /** 扣球撞网次数（球没被拦、也没过网） */
  atkNet0: number;
  atkNet1: number;
  /** 被拦在网高以下（拦网面伸到网下的误判） */
  blockLow0: number;
  blockLow1: number;
  blockPoints: number;
  blockOppPoints: number;
  // 发球轮次（按球员 id 计数）
  serveBy: [number, number, number, number];
  // 前后排分工
  rallySampleSec: number;
  bothFrontSec: number;
  playerFrontSec: number;
  allyFrontWithPlayerSec: number;
  gapSum: number;
  gapSamples: number;
  minGapSum: number;
  oppAtks: number;
  oppAtkDug: number;
  oppAtkNoBack: number;
  /** 对面扣球落点 z 分档（0~2 / 2~4 / 4~6 / 6~8m） */
  oppAtkLand: [number, number, number, number];
  /** 各落点分档中被接起的次数 */
  oppAtkDugLand: [number, number, number, number];
  /** 扣球瞬间 AI 队友 |z| 分档（≤3 / 3~4.5 / 4.5~6 / >6m） */
  allyZoneAtAtk: [number, number, number, number];
  /** 各队友站位分档中被接起的次数 */
  allyZoneDug: [number, number, number, number];
  /** 整场回合内 AI 队友 / 玩家 |z| 停留时长分档（≤1.5 / 1.5~3 / 3~4.5 / 4.5~6 / >6m） */
  allyZoneSec: [number, number, number, number, number];
  playerZoneSec: [number, number, number, number, number];
  humanDigs: number;
  /** 其中玩家“未按键、自动起球”的次数 */
  humanAutoDigs: number;
  allySetN: number;
  allySetZ0: number;
  allySetZ05: number;
  allySetZ15: number;
  /** 只统计“上前二传”（二传瞬间 |z|≤3.2）的轨迹，用于验证传完回撤 */
  allySetFrontN: number;
  allySetFrontZ0: number;
  allySetFrontZ05: number;
  allySetFrontZ15: number;
  // 救球出球去向（pass/set = 传队友，send = 过网）
  digToMate: number;
  digOver: number;
  digLost: number;
  autoDigs: number;
  autoDigToMate: number;
  autoDigOver: number;
  autoDigLost: number;
  autoOutTouches: number;
  // 拟人机器人口径的指标
  chances: number;
  allyDigs: number;
  allyDigFails: number;
  allyMoveOnAttack: number;
  allyMoveSamples: number;
  // 丢分原因拆解
  lossOut: number;
  lossOwnFloor: number;
  lossOppAttack: number;
  lossOppOther: number;
  lossHumanLast: number;
  lossAllyLast: number;
}

const HUMAN_LIKE = process.argv.includes('--bot=human');
/** 救球口径：auto = 拟人机器人接扣杀时“不按键”，交给自动接球；manual = 保持按键 */
const DIG_AUTO = process.argv.includes('--dig=auto');
/** 关闭自动接扣杀，用来单独验证前后排分工 */
const NO_AUTO = process.argv.includes('--auto=off');
/** 关闭前后排分工（复现改动前行为，做前后对比） */
const NO_FRONT_BACK = process.argv.includes('--frontback=off');


function runMatch(skill: Skill, seed: number): SkillStats {
  const rng = createRng(seed);
  const world = new World({ teamSize: 2, skill, humanCount: 1, humanName: '玩家', seed, autoDig: !NO_AUTO, frontBack: !NO_FRONT_BACK });
  const bot = HUMAN_LIKE ? new HumanLikeBot(rng) : new HumanBot(rng);
  world.inputProvider = (id) => (id === 0 ? bot.read(world, world.players[0], STEP) : emptyInput());

  const st: SkillStats = {
    skill,
    matches: 1,
    wins: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    rallies: 0,
    rallyHits: 0,
    rallySeconds: 0,
    attacks: 0,
    attackKills: 0,
    attacks0: 0,
    attacks1: 0,
    kills0: 0,
    kills1: 0,
    digs: 0,
    digs0: 0,
    digs1: 0,
    humanAttacks: 0,
    humanAttackKills: 0,
    humanDirectPoints: 0,
    allySetHuman: 0,
    humanSetAlly: 0,
    aiTripleTouch: 0,
    blocks: 0,
    aiJumps: 0,
    pointsTotal: 0,
    blocks0: 0,
    blocks1: 0,
    humanBlockJumps: 0,
    aiBlockJumps: 0,
    crossH: [0, 0, 0, 0],
    crossH0: [0, 0, 0, 0],
    atkNet0: 0,
    atkNet1: 0,
    blockLow0: 0,
    blockLow1: 0,
    blockPoints: 0,
    blockOppPoints: 0,
    serveBy: [0, 0, 0, 0],
    rallySampleSec: 0,
    bothFrontSec: 0,
    playerFrontSec: 0,
    allyFrontWithPlayerSec: 0,
    gapSum: 0,
    gapSamples: 0,
    minGapSum: 0,
    oppAtks: 0,
    oppAtkDug: 0,
    oppAtkNoBack: 0,
    oppAtkLand: [0, 0, 0, 0],
    oppAtkDugLand: [0, 0, 0, 0],
    allyZoneAtAtk: [0, 0, 0, 0],
    allyZoneDug: [0, 0, 0, 0],
    allyZoneSec: [0, 0, 0, 0, 0],
    playerZoneSec: [0, 0, 0, 0, 0],
    humanDigs: 0,
    humanAutoDigs: 0,
    allySetN: 0,
    allySetZ0: 0,
    allySetZ05: 0,
    allySetZ15: 0,
    allySetFrontN: 0,
    allySetFrontZ0: 0,
    allySetFrontZ05: 0,
    allySetFrontZ15: 0,
    digToMate: 0,
    digOver: 0,
    digLost: 0,
    autoDigs: 0,
    autoDigToMate: 0,
    autoDigOver: 0,
    autoDigLost: 0,
    autoOutTouches: 0,
    chances: 0,
    allyDigs: 0,
    allyDigFails: 0,
    allyMoveOnAttack: 0,
    allyMoveSamples: 0,
    lossOut: 0,
    lossOwnFloor: 0,
    lossOppAttack: 0,
    lossOppOther: 0,
    lossHumanLast: 0,
    lossAllyLast: 0,
  };

  let rallyStart = 0;
  let rallyHits: Array<{ playerId: number; team: 0 | 1; kind: string; auto?: boolean }> = [];
  let pendingAtk: { bothFront: boolean; dug: boolean; landBucket: number; zoneBucket: number } | null = null;
  let pendingSet: { z0: number; t05: number; t15: number; done05: boolean; done15: boolean; front: boolean } | null = null;
  let minGap = Infinity;

  let chanceThisRally = false;
  let allyChase: { until: number; x: number; z: number } | null = null;

  let pendingBlockTeam: 0 | 1 | null = null;
  world.events.on('serve', (e) => {
    if (e.playerId >= 0 && e.playerId < 4) st.serveBy[e.playerId]++;
    pendingBlockTeam = null;
    rallyStart = world.time;
    rallyHits = [];
    chanceThisRally = false;
    allyChase = null;
    pendingAtk = null;
    pendingSet = null;
    traceRally++;
    if (TRACE && skill === TRACE_SKILL && traceRally <= TRACE_LIMIT) {
      process.stdout.write(`\n--- rally ${traceRally} | ${world.time.toFixed(1)}s ---\n`);
    }
  });
  world.events.on('hit', (e) => {
    const prev = rallyHits[rallyHits.length - 1];
    const isDig = !!prev && prev.kind === 'attack' && prev.team !== e.team;
    if (isDig && e.team === 0) {
      // 救球出球去向：pass/set = 传队友，send = 过网
      if (e.kind === 'send') st.digOver++;
      else st.digToMate++;
      if (e.auto) {
        st.autoDigs++;
        if (e.kind === 'send') st.autoDigOver++;
        else st.autoDigToMate++;
      }
      if (pendingAtk && !pendingAtk.dug) {
        pendingAtk.dug = true;
        st.oppAtkDug++;
        if (pendingAtk.landBucket >= 0) st.oppAtkDugLand[pendingAtk.landBucket]++;
        if (pendingAtk.zoneBucket >= 0) st.allyZoneDug[pendingAtk.zoneBucket]++;
      }
    }
    if (prev && prev.kind === 'attack' && prev.team !== e.team) {
      st.digs++;
      if (e.team === 0) {
        st.digs0++;
        if (world.players[e.playerId].isHuman) {
          st.humanDigs++;
          if (e.auto) st.humanAutoDigs++;
        }
      } else st.digs1++;
      // 对面扣球后是不是“队友”接起来的（区分真人自己救）
      if (e.team === 0 && !world.players[e.playerId].isHuman) st.allyDigs++;
    }
    if (e.kind === 'set' && e.team === 0 && e.playerId !== 0) {
      // AI 队友二传：记录二传瞬间与之后 0.5s / 1.5s 的 z（是否回撤）
      const ally = world.players[e.playerId];
      const absZ = Math.abs(ally.pos.z);
      const front = absZ <= 3.2;
      st.allySetN++;
      if (front) {
        st.allySetFrontN++;
        st.allySetFrontZ0 += absZ;
      }
      pendingSet = {
        z0: absZ,
        t05: world.time + 0.5,
        t15: world.time + 1.5,
        done05: false,
        done15: false,
        front,
      };
      st.allySetZ0 += absZ;
    }
    if (e.kind === 'attack' && e.team === 1) {
      // 记录对面扣球瞬间队友的位置，1.2s 后统计它有没有真的去救
      const ally = world.players.find((q) => q.team === 0 && !q.isHuman);
      allyChase = ally ? { until: world.time + 1.2, x: ally.pos.x, z: ally.pos.z } : null;
      st.oppAtks++;
      const human = world.players.find((q) => q.team === 0 && q.isHuman);
      const land = world.predictLanding();
      const landBucket = land ? clamp(Math.floor(Math.abs(land.z) / 2), 0, 3) : -1;
      const allyAbsZ = ally ? Math.abs(ally.pos.z) : 99;
      const zoneBucket = ally ? (allyAbsZ <= 3 ? 0 : allyAbsZ <= 4.5 ? 1 : allyAbsZ <= 6 ? 2 : 3) : -1;
      if (landBucket >= 0) st.oppAtkLand[landBucket]++;
      if (zoneBucket >= 0) st.allyZoneAtAtk[zoneBucket]++;
      pendingAtk = {
        bothFront:
          !!human && !!ally && Math.abs(human.pos.z) <= 3.0 && Math.abs(ally.pos.z) <= 3.0,
        dug: false,
        landBucket,
        zoneBucket,
      };
    }
    rallyHits.push({ playerId: e.playerId, team: e.team, kind: e.kind, auto: e.auto });
    if (e.kind === 'attack') {
      st.attacks++;
      if (e.team === 0) st.attacks0++;
      else st.attacks1++;
      if (e.team === 0 && e.playerId === 0) st.humanAttacks++;
    }
    if (TRACE && skill === TRACE_SKILL && traceRally <= TRACE_LIMIT) {
      const p = world.players[e.playerId];
      const ball = world.ball;
      process.stdout.write(
        `  hit #${rallyHits.length} p${e.playerId}(${e.kind}) t=${world.touches[e.team]} ` +
          `ball=(${ball.pos.x.toFixed(2)},${ball.pos.y.toFixed(2)},${ball.pos.z.toFixed(2)}) ` +
          `pos=(${p.pos.x.toFixed(2)},${p.pos.y.toFixed(2)},${p.pos.z.toFixed(2)}) g=${p.grounded ? 1 : 0}\n`,
      );
    }
  });
  world.events.on('block', (e) => {
    st.blocks++;
    if (e.y < 2.0) {
      const p = world.players[e.playerId];
      if (p && p.team === 0) st.blockLow0++;
      else if (p) st.blockLow1++;
    }
    const p = world.players[e.playerId];
    if (p) {
      pendingBlockTeam = p.team;
      if (p.team === 0) st.blocks0++;
      else st.blocks1++;
    }
  });
  world.events.on('net', () => {
    const b = world.ball;
    if (b.lastKind === 'attack') {
      if (b.lastHitTeam === 0) st.atkNet0++;
      else if (b.lastHitTeam === 1) st.atkNet1++;
    }
  });
  world.events.on('jump', (e) => {
    const p = world.players[e.playerId];
    if (!p) return;
    if (!e.block) return; // 只统计拦网起跳（扣球起跳不算）
    if (p.isHuman) st.humanBlockJumps++;
    else st.aiBlockJumps++;
    if (!p.isHuman) st.aiJumps++;
  });
  world.events.on('land', (e) => {
    if (pendingBlockTeam !== null) {
      if (e.winner === pendingBlockTeam) st.blockPoints++;
      else st.blockOppPoints++;
      pendingBlockTeam = null;
    }
    if (TRACE && skill === TRACE_SKILL && traceRally <= TRACE_LIMIT) {
      process.stdout.write(
        `  LAND winner=${e.winner} hits=${rallyHits.length} t=${(world.time - rallyStart).toFixed(2)}s\n`,
      );
    }
    st.rallies++;
    st.rallyHits += rallyHits.length;
    st.rallySeconds += world.time - rallyStart;
    if (e.winner === 0) st.pointsFor++;
    else st.pointsAgainst++;

    // 后场空当：对面扣球得分、落地界内、且扣球瞬间我方两人都在前排
    if (pendingAtk && !pendingAtk.dug && e.winner === 1 && e.inBounds && pendingAtk.bothFront) {
      st.oppAtkNoBack++;
    }
    // 救球出球去向第三类：对面扣球后我方一次都没碰到，球直接落在己方界内
    const lastHitX = rallyHits[rallyHits.length - 1];
    if (pendingAtk && !pendingAtk.dug && e.winner === 1 && e.inBounds) {
      st.digLost++;
    }
    // 界外球被自动碰（必须为 0）
    if (!e.inBounds && lastHitX && lastHitX.team === 0 && lastHitX.auto) st.autoOutTouches++;

    const last = rallyHits[rallyHits.length - 1];
    if (last && last.kind === 'attack' && last.team === e.winner) {
      st.attackKills++;
      if (last.team === 0) st.kills0++;
      else st.kills1++;
      if (last.playerId === 0) st.humanAttackKills++;
    }

    // 配合链路：队友二传(set) → 玩家扣杀(attack)；玩家二传(set) → 队友扣杀(attack)
    let allySetHuman = false;
    let humanSetAlly = false;
    for (let i = 1; i < rallyHits.length; i++) {
      const prev = rallyHits[i - 1];
      const cur = rallyHits[i];
      if (prev.team !== cur.team) continue;
      if (cur.team !== 0) continue;
      if (prev.playerId !== 0 && cur.playerId === 0 && prev.kind === 'set' && cur.kind === 'attack') {
        allySetHuman = true;
      }
      if (prev.playerId === 0 && cur.playerId !== 0 && prev.kind === 'set' && cur.kind === 'attack') {
        humanSetAlly = true;
      }
    }
    if (allySetHuman) st.allySetHuman++;
    if (humanSetAlly) st.humanSetAlly++;

    // 同一个 AI 球员“连着”触球 3 次（中间没有真人触球）才是问题
    const counts = new Map<number, number>();
    let run = 0;
    let runId = -1;
    for (const h of rallyHits) {
      if (h.team !== 0 || world.players[h.playerId]?.isHuman) {
        run = 0;
        runId = -1;
        continue;
      }
      if (h.playerId === runId) run++;
      else {
        runId = h.playerId;
        run = 1;
      }
      if (run >= 3) {
        counts.set(h.playerId, (counts.get(h.playerId) ?? 0) + 1);
        run = 0;
      }
    }
    if (counts.size > 0) st.aiTripleTouch++;

    // 对面扣球后本方无人触球 → 这次防守失败
    if (e.winner === 1) {
      let lastAtk = -1;
      for (let i = rallyHits.length - 1; i >= 0; i--) {
        if (rallyHits[i].kind === 'attack' && rallyHits[i].team === 1) {
          lastAtk = i;
          break;
        }
      }
      if (lastAtk >= 0) {
        let dug = false;
        for (let i = lastAtk + 1; i < rallyHits.length; i++) if (rallyHits[i].team === 0) dug = true;
        if (!dug) st.allyDigFails++;
      }

      // 丢分原因拆解
      const b = world.ball;
      const lastHitTeam = b.lastHitTeam;
      if (!e.inBounds) st.lossOut++;
      else if (lastHitTeam === 1) {
        if (b.lastKind === 'attack') st.lossOppAttack++;
        else st.lossOppOther++;
      } else st.lossOwnFloor++;
      const lastPlayer = rallyHits[rallyHits.length - 1]?.playerId;
      if (lastHitTeam === 0 && lastPlayer !== undefined) {
        if (lastPlayer === 0) st.lossHumanLast++;
        else st.lossAllyLast++;
      }
    }

    if (HUMAN_LIKE && chanceThisRally) st.chances++;
    st.pointsTotal++;
  });

  world.startMatch();
  traceRally = 0;
  let simTime = 0;
  let lastZ = world.ball.pos.z;
  let lastY = world.ball.pos.y;
  while (world.phase !== 'matchend' && simTime < MAX_SIM) {
    world.step(STEP);
    simTime += STEP;
    // 对手扣球的过网高度分布（球过网那一帧插值；被拦网的球不会走这里）
    const b = world.ball;
    const z0 = lastZ;
    const z1 = b.pos.z;
    if (b.live && ((z0 > 0 && z1 <= 0) || (z0 < 0 && z1 >= 0))) {
      const k = z0 / (z0 - z1);
      const cy = lastY + (b.pos.y - lastY) * k;
      if (b.lastKind === 'attack' && b.lastHitTeam === 1) {
        const i = cy < 2.05 ? 0 : cy < 2.5 ? 1 : cy < 3.0 ? 2 : 3;
        st.crossH[i]++;
      } else if (b.lastKind === 'attack' && b.lastHitTeam === 0) {
        const i = cy < 2.05 ? 0 : cy < 2.5 ? 1 : cy < 3.0 ? 2 : 3;
        st.crossH0[i]++;
      }
    }
    lastZ = z1;
    lastY = b.pos.y;
    if (humanSpikeChance(world)) chanceThisRally = true;
    // 前后排分工：两人都离网 ≤3m 的时长、两人间距、队内最小间距
    if (world.phase === 'rally') {
      const h = world.players[0];
      const ally = world.players[1];
      st.rallySampleSec += STEP;
      if (Math.abs(h.pos.z) <= 3.0 && Math.abs(ally.pos.z) <= 3.0) st.bothFrontSec += STEP;
      if (Math.abs(h.pos.z) <= 3.0) {
        st.playerFrontSec += STEP;
        if (Math.abs(ally.pos.z) <= 3.0) st.allyFrontWithPlayerSec += STEP;
      }
      const bucket5 = (z: number): number => {
        const a = Math.abs(z);
        return a <= 1.5 ? 0 : a <= 3 ? 1 : a <= 4.5 ? 2 : a <= 6 ? 3 : 4;
      };
      st.playerZoneSec[bucket5(h.pos.z)] += STEP;
      st.allyZoneSec[bucket5(ally.pos.z)] += STEP;
      const gap = Math.hypot(h.pos.x - ally.pos.x, h.pos.z - ally.pos.z);
      st.gapSum += gap;
      st.gapSamples++;
      if (gap < minGap) minGap = gap;
    }
    if (pendingSet) {
      const ally = world.players[1];
      if (!pendingSet.done05 && world.time >= pendingSet.t05) {
        pendingSet.done05 = true;
        st.allySetZ05 += Math.abs(ally.pos.z);
        if (pendingSet.front) st.allySetFrontZ05 += Math.abs(ally.pos.z);
      }
      if (!pendingSet.done15 && world.time >= pendingSet.t15) {
        pendingSet.done15 = true;
        st.allySetZ15 += Math.abs(ally.pos.z);
        if (pendingSet.front) st.allySetFrontZ15 += Math.abs(ally.pos.z);
        pendingSet = null;
      }
    }
    if (allyChase && world.time >= allyChase.until) {
      const ally = world.players.find((q) => q.team === 0 && !q.isHuman);
      if (ally) {
        st.allyMoveOnAttack += Math.hypot(ally.pos.x - allyChase.x, ally.pos.z - allyChase.z);
        st.allyMoveSamples++;
      }
      allyChase = null;
    }
  }
  if (world.matchWinner === 0) st.wins = 1;
  if (Number.isFinite(minGap)) st.minGapSum += minGap;
  st.humanDirectPoints = world.players[0].stats.points;
  return st;
}

function runSkill(skill: Skill, matches: number): SkillStats {
  const agg: SkillStats = {
    skill,
    matches: 0,
    wins: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    rallies: 0,
    rallyHits: 0,
    rallySeconds: 0,
    attacks: 0,
    attackKills: 0,
    attacks0: 0,
    attacks1: 0,
    kills0: 0,
    kills1: 0,
    digs: 0,
    digs0: 0,
    digs1: 0,
    humanAttacks: 0,
    humanAttackKills: 0,
    humanDirectPoints: 0,
    allySetHuman: 0,
    humanSetAlly: 0,
    aiTripleTouch: 0,
    blocks: 0,
    aiJumps: 0,
    pointsTotal: 0,
    blocks0: 0,
    blocks1: 0,
    humanBlockJumps: 0,
    aiBlockJumps: 0,
    crossH: [0, 0, 0, 0],
    crossH0: [0, 0, 0, 0],
    atkNet0: 0,
    atkNet1: 0,
    blockLow0: 0,
    blockLow1: 0,
    blockPoints: 0,
    blockOppPoints: 0,
    serveBy: [0, 0, 0, 0],
    rallySampleSec: 0,
    bothFrontSec: 0,
    playerFrontSec: 0,
    allyFrontWithPlayerSec: 0,
    gapSum: 0,
    gapSamples: 0,
    minGapSum: 0,
    oppAtks: 0,
    oppAtkDug: 0,
    oppAtkNoBack: 0,
    oppAtkLand: [0, 0, 0, 0],
    oppAtkDugLand: [0, 0, 0, 0],
    allyZoneAtAtk: [0, 0, 0, 0],
    allyZoneDug: [0, 0, 0, 0],
    allyZoneSec: [0, 0, 0, 0, 0],
    playerZoneSec: [0, 0, 0, 0, 0],
    humanDigs: 0,
    humanAutoDigs: 0,
    allySetN: 0,
    allySetZ0: 0,
    allySetZ05: 0,
    allySetZ15: 0,
    allySetFrontN: 0,
    allySetFrontZ0: 0,
    allySetFrontZ05: 0,
    allySetFrontZ15: 0,
    digToMate: 0,
    digOver: 0,
    digLost: 0,
    autoDigs: 0,
    autoDigToMate: 0,
    autoDigOver: 0,
    autoDigLost: 0,
    autoOutTouches: 0,
    chances: 0,
    allyDigs: 0,
    allyDigFails: 0,
    allyMoveOnAttack: 0,
    allyMoveSamples: 0,
    lossOut: 0,
    lossOwnFloor: 0,
    lossOppAttack: 0,
    lossOppOther: 0,
    lossHumanLast: 0,
    lossAllyLast: 0,
  };
  const base = { easy: 1000, normal: 4000, hard: 8000 }[skill];
  for (let i = 0; i < matches; i++) {
    const r = runMatch(skill, base + i * 7919);
    for (const k of Object.keys(agg) as Array<keyof SkillStats>) {
      if (k === 'skill') continue;
      if (Array.isArray(agg[k])) {
        const a = agg[k] as number[];
        const b = r[k] as number[];
        for (let j = 0; j < a.length; j++) a[j] += b[j];
        continue;
      }
      (agg[k] as number) += r[k] as number;
    }
  }
  return agg;
}

const argOut = process.argv.find((a) => a.startsWith('--out='));
const outPath = argOut ? argOut.slice('--out='.length) : '.tmp/after.json';
const matchesArg = process.argv.find((a) => a.startsWith('--matches='));
const matches = matchesArg ? Number(matchesArg.slice('--matches='.length)) : 24;
const skillsArg = process.argv.find((a) => a.startsWith('--skills='));
const skills = (skillsArg ? skillsArg.slice('--skills='.length).split(',') : ['easy', 'normal', 'hard']) as Skill[];

const tuneArg = process.argv.find((a) => a.startsWith('--tune='));
if (tuneArg) {
  const spec = tuneArg.slice('--tune='.length);
  for (const part of spec.split(';')) {
    if (!part) continue;
    const [path, v] = part.split('=');
    const [skill, role, key] = path.split('.');
    const prof = (AI_PROFILES as Record<string, Record<string, Record<string, number>>>)[skill]?.[role];
    if (prof && key) prof[key] = Number(v);
  }
  process.stdout.write(`tuned: ${spec}\n`);
}

const all = skills.map((s) => runSkill(s, matches));
const pct = (a: number, b: number): string => (b > 0 ? `${((a / b) * 100).toFixed(1)}%` : '-');
const rows = all.map((r) => ({
  skill: r.skill,
  matches: r.matches,
  winRate: pct(r.wins, r.matches),
  pointRate: pct(r.pointsFor, r.pointsFor + r.pointsAgainst),
  avgFor: (r.pointsFor / r.matches).toFixed(2),
  avgAgainst: (r.pointsAgainst / r.matches).toFixed(2),
  rallyHits: (r.rallyHits / Math.max(1, r.rallies)).toFixed(2),
  rallySec: (r.rallySeconds / Math.max(1, r.rallies)).toFixed(2),
  attacksPerRally: (r.attacks / Math.max(1, r.rallies)).toFixed(2),
  atk0PerRally: (r.attacks0 / Math.max(1, r.rallies)).toFixed(2),
  atk1PerRally: (r.attacks1 / Math.max(1, r.rallies)).toFixed(2),
  kill0Rate: pct(r.kills0, r.attacks0),
  kill1Rate: pct(r.kills1, r.attacks1),
  dig0Rate: pct(r.digs0, r.attacks1),
  dig1Rate: pct(r.digs1, r.attacks0),
  attackSuccess: pct(r.attackKills, r.attacks),
  humanAttacksPerRally: (r.humanAttacks / Math.max(1, r.rallies)).toFixed(2),
  humanAttackSuccess: pct(r.humanAttackKills, r.humanAttacks),
  humanDirectPointsPerMatch: (r.humanDirectPoints / r.matches).toFixed(2),
  allySetHumanPerMatch: (r.allySetHuman / r.matches).toFixed(2),
  humanSetAllyPerMatch: (r.humanSetAlly / r.matches).toFixed(2),
  aiTriplePerMatch: (r.aiTripleTouch / r.matches).toFixed(2),
  blocksPerMatch: (r.blocks / r.matches).toFixed(2),
  blocks0PerMatch: (r.blocks0 / r.matches).toFixed(2),
  blocks1PerMatch: (r.blocks1 / r.matches).toFixed(2),
  humanBlockJumps: (r.humanBlockJumps / r.matches).toFixed(2),
  aiBlockJumps: (r.aiBlockJumps / r.matches).toFixed(2),
  crossH: r.crossH.map((n, i) =>
    `${{ 0: '<2.05', 1: '2.05~2.5', 2: '2.5~3.0', 3: '>3.0' }[i]}:${(
      (n / Math.max(1, r.crossH.reduce((a, b) => a + b, 0))) * 100
    ).toFixed(0)}%`,
  ).join(' '),
  crossH0: r.crossH0.map((n, i) =>
    `${{ 0: '<2.05', 1: '2.05~2.5', 2: '2.5~3.0', 3: '>3.0' }[i]}:${(
      (n / Math.max(1, r.crossH0.reduce((a, b) => a + b, 0))) * 100
    ).toFixed(0)}%`,
  ).join(' '),
  atkNet: `${(r.atkNet0 / Math.max(1, r.matches)).toFixed(2)}:${(r.atkNet1 / Math.max(1, r.matches)).toFixed(2)}`,
  blockLow: `${(r.blockLow0 / Math.max(1, r.matches)).toFixed(2)}:${(r.blockLow1 / Math.max(1, r.matches)).toFixed(2)}`,
  blockPointRate: pct(r.blockPoints, r.blockPoints + r.blockOppPoints),
  serve0: `${r.serveBy[0]}:${r.serveBy[1]}`,
  serve1: `${r.serveBy[2]}:${r.serveBy[3]}`,
  aiJumpsPerMatch: (r.aiJumps / r.matches).toFixed(2),
  pointsPerMatch: (r.pointsTotal / r.matches).toFixed(1),
  chancesPerMatch: (r.chances / r.matches).toFixed(2),
  chanceConvert: pct(r.humanAttackKills, r.chances),
  allyDigsPerMatch: (r.allyDigs / r.matches).toFixed(2),
  allyDigRate: pct(r.allyDigs, r.attacks1),
  allyDigFailPerMatch: (r.allyDigFails / r.matches).toFixed(2),
  allyMoveOnAttack:
    r.allyMoveSamples > 0 ? (r.allyMoveOnAttack / r.allyMoveSamples).toFixed(2) : '-',
  bothFront: pct(r.bothFrontSec, r.rallySampleSec),
  allyFrontWhenPlayerFront: pct(r.allyFrontWithPlayerSec, r.playerFrontSec),
  gapAvg: (r.gapSum / Math.max(1, r.gapSamples)).toFixed(2),
  gapMinPerMatch: (r.minGapSum / r.matches).toFixed(2),
  oppAtkDugRate: pct(r.oppAtkDug, r.oppAtks),
  noBackPerMatch: (r.oppAtkNoBack / r.matches).toFixed(2),
  allyZones: r.allyZoneSec.map((s) => pct(s, r.rallySampleSec)).join(' / '),
  playerZones: r.playerZoneSec.map((s) => pct(s, r.rallySampleSec)).join(' / '),
  atkLandDist: r.oppAtkLand.map((n) => pct(n, r.oppAtks)).join(' / '),
  dugByLand: r.oppAtkDugLand.map((n, i) => pct(n, r.oppAtkLand[i])).join(' / '),
  dugByAllyZone: r.allyZoneDug.map((n, i) => pct(n, r.allyZoneAtAtk[i])).join(' / '),
  humanDigsPerMatch: (r.humanDigs / r.matches).toFixed(2),
  humanAutoDigPerMatch: (r.humanAutoDigs / r.matches).toFixed(2),
  allySetTrace: `${(r.allySetZ0 / Math.max(1, r.allySetN)).toFixed(2)}→${(r.allySetZ05 / Math.max(1, r.allySetN)).toFixed(2)}→${(r.allySetZ15 / Math.max(1, r.allySetN)).toFixed(2)}`,
  allySetFrontTrace: `${r.allySetFrontN}/${r.allySetN} | ${(r.allySetFrontZ0 / Math.max(1, r.allySetFrontN)).toFixed(2)}→${(r.allySetFrontZ05 / Math.max(1, r.allySetFrontN)).toFixed(2)}→${(r.allySetFrontZ15 / Math.max(1, r.allySetFrontN)).toFixed(2)}`,
  digDist: `mate ${pct(r.digToMate, r.oppAtks)} / over ${pct(r.digOver, r.oppAtks)} / miss ${pct(r.digLost, r.oppAtks)}`,
  autoDigPerMatch: (r.autoDigs / r.matches).toFixed(2),
  autoDigDist: r.autoDigs > 0
    ? `mate ${pct(r.autoDigToMate, r.autoDigs)} / over ${pct(r.autoDigOver, r.autoDigs)}`
    : '-',
  autoOutTouches: r.autoOutTouches,
}), { loss: '' });

// 丢分原因拆解（每场平均值）
for (let i = 0; i < rows.length; i++) {
  const r = all[i];
  rows[i].loss =
    `out ${(r.lossOut / r.matches).toFixed(1)} | ownFloor ${(r.lossOwnFloor / r.matches).toFixed(1)} | ` +
    `oppAtk ${(r.lossOppAttack / r.matches).toFixed(1)} | oppOther ${(r.lossOppOther / r.matches).toFixed(1)} | ` +
    `lastHuman ${(r.lossHumanLast / r.matches).toFixed(1)} | lastAlly ${(r.lossAllyLast / r.matches).toFixed(1)}`;
}

process.stdout.write(JSON.stringify(all, null, 2));
const fs = await import('node:fs/promises');
await fs.mkdir('.tmp', { recursive: true }).catch(() => undefined);
await fs.writeFile(outPath, JSON.stringify({ matches, at: new Date().toISOString(), data: all }, null, 2));
process.stdout.write(`\nsaved -> ${outPath}\n`);
console.table(rows);
