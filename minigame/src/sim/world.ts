import { Emitter } from '../core/emitter';
import { angleDamp, clamp, createRng, dist2D } from '../core/math';
import type { Rng } from '../core/math';
import type { Vec3 } from '../core/math';
import { BALL, COURT, MATCH, PLAYER } from './config';
import { Ball, lobVelocity, solveVelocity } from './ball';
import { aiProfile, AIBrain } from './ai';
import type { AiRole, Skill } from './ai';
import { slotPosition } from './formation';
import { emptyInput } from './types';
import type {
  BallEvent,
  ControlInput,
  GameEvents,
  HitKind,
  Phase,
  Player,
  TeamId,
} from './types';

export interface WorldOptions {
  teamSize: number;
  skill: Skill;
  humanTeam?: TeamId;
  humanName?: string;
  /** 同队真人数量（联机时 2） */
  humanCount?: number;
  /** 真人昵称，按玩家 id 顺序 */
  names?: string[];
  /** 本地控制的玩家 id，用于镜头与 HUD */
  localPlayerId?: number;
  /** 联机锁步种子；不传则每局随机 */
  seed?: number;
  /** 自动接扣杀开关（默认开；bench 用来做分组对比） */
  autoDig?: boolean;
  /** 前后排分工开关（默认开；bench 用来做分组对比） */
  frontBack?: boolean;
}

const HOME_AI_NAMES = ['阿洛', '小北', '豆豆', '球球'];
const AWAY_NAMES = ['米娅', '卡尔', '波波', '娜娜'];

/**
 * 权威模拟层：不依赖 Three.js / DOM，固定步长推进。
 * 后续联机时整个 World 可直接搬到服务端（输入来自网络而非本地控制器）。
 */
export class World {
  readonly events = new Emitter<GameEvents>();
  readonly players: Player[] = [];
  readonly ball = new Ball();
  readonly teamSize: number;
  readonly humanTeam: TeamId;
  readonly localPlayerId: number;
  private readonly humanCount: number;
  private readonly roster: string[];
  private readonly skill: Skill;

  phase: Phase = 'idle';
  phaseTimer = 0;
  scores: [number, number] = [0, 0];
  setsWon: [number, number] = [0, 0];
  setIndex = 0;
  clock: number = MATCH.setSeconds;
  timeUp = false;
  suddenDeath = false;
  touches: [number, number] = [0, 0];
  /** 每次进攻的分工：谁二传、谁扣球（一传时确定） */
  attackPlan: Array<{ setterId: number | null; attackerId: number | null }> = [
    { setterId: null, attackerId: null },
    { setterId: null, attackerId: null },
  ];
  servingTeam: TeamId = 0;
  serverId = 0;
  /** 每队发球轮转索引：每次该队开始发球时取当前索引，然后 +1（两人轮流） */
  serveIndex: [number, number] = [0, 0];
  /** 网前「二传」做出的一拍快攻：指定由谁直接扣（命中后清空） */
  quickAttack: [number | null, number | null] = [null, null];
  /** 拦网面水平半宽（手掌+前臂，0.78 旧值 / 0.92 现值） */
  blockHalfW = 0.92;
  /** 按下拦网时朝预测过网点的自动微对齐上限（米，0 = 关闭） */
  blockAlignMax = 0.45;
  /**
   * 贴网补跳：过网窗口内才按拦网键时，起跳更快（1.22 倍上升速度）。
   * 实测（.tmp/block-after.json vs block-after-nolate.json）：0.25s 提前量处 6/24 次
   * 因上升过快把拦网手抬过球、反而漏球（75% → 100%）；0.1~0.55s 区间无任何增益。
   * 结论：无收益且有副作用，默认关闭，字段保留用于 A/B。
   */
  blockFastRise = false;

  /** 自动接扣杀触发次数（统计用） */
  autoDigs = 0;
  /** 网前「二传」兜底计数：按原因分组（统计/调参用） */
  setFallbacks: Record<'noMate' | 'touchesExhausted' | 'noReach', number> = {
    noMate: 0,
    touchesExhausted: 0,
    noReach: 0,
  };
  /** 自动接扣杀是否启用（bench 分组对比用） */
  private readonly autoDigOn: boolean;
  /** 前后排分工是否启用（bench 分组对比用） */
  private readonly frontBackOn: boolean;
  matchWinner: TeamId | null = null;
  /** 每队最近一次扣球的时间 */
  lastAttackTime: [number, number] = [-10, -10];
  /** 慢动作剩余时间（真实时间，由外层递减） */
  slowmoTimer = 0;
  time = 0;
  serveElapsed = 0;

  private readonly brains = new Map<number, AIBrain>();
  private readonly rng: Rng;
  private lastHitterByTeam: [number | null, number | null] = [null, null];
  private lastHitAt = -10;
  private lastCount = -1;

  inputProvider: ((playerId: number) => ControlInput) | null = null;

  constructor(opts: WorldOptions) {
    this.teamSize = clamp(Math.round(opts.teamSize), 1, 4);
    this.humanTeam = opts.humanTeam ?? 0;
    this.humanCount = clamp(Math.round(opts.humanCount ?? 1), 1, this.teamSize);
    this.localPlayerId = clamp(Math.round(opts.localPlayerId ?? 0), 0, this.teamSize - 1);
    this.roster = opts.names ?? [];
    this.skill = opts.skill;
    this.rng = createRng(opts.seed ?? Date.now() % 2147483647);
    this.autoDigOn = opts.autoDig !== false;
    this.frontBackOn = opts.frontBack !== false;
    this.createPlayers(opts.skill, opts.humanName ?? '你');
    this.resetPlayers();
  }

  // ---------------------------------------------------------------- 生命周期

  /** 联机断线兜底：把某号位在 真人/AI 之间运行时切换（仅房主权威端使用） */
  setHumanControl(id: number, human: boolean): void {
    const p = this.players.find((q) => q.id === id);
    if (!p || p.isHuman === human) return;
    p.isHuman = human;
    const prof = aiProfile(this.skill, this.roleFor(p.team));
    p.speedScale = human ? 1 : prof.moveScale;
    p.attackScale = human ? 1 : prof.attackScale;
    if (human) {
      this.brains.delete(id);
      p.charge = 0;
      p.hitBuffer = 0;
    } else if (!this.brains.has(id)) {
      this.brains.set(id, new AIBrain(this.skill, this.rng, this.roleFor(p.team), this.frontBackOn));
    }
  }

  startMatch(): void {
    this.scores = [0, 0];
    this.setsWon = [0, 0];
    this.setIndex = 0;
    this.clock = MATCH.setSeconds;
    this.timeUp = false;
    this.suddenDeath = false;
    this.matchWinner = null;
    this.servingTeam = this.humanTeam;
    this.serveIndex = [0, 0];
    this.lastHitterByTeam = [null, null];
    this.lastAttackTime = [-10, -10];
    this.slowmoTimer = 0;
    for (const p of this.players) {
      p.stats.points = 0;
      p.stats.hits = 0;
    }
    this.resetPlayers();
    this.ball.reset();
    this.setPhase('kickoff');
    this.phaseTimer = MATCH.kickoffSeconds;
    this.lastCount = -1;
    this.events.emit('announce', {
      text: '准备',
      sub: `${MATCH.pointsToWinSet} 分制 · 三局两胜`,
      ms: 900,
    });
  }

  step(dt: number): void {
    this.time += dt;

    const inputs = new Map<number, ControlInput>();
    for (const p of this.players) {
      if (p.isHuman) {
        inputs.set(p.id, this.inputProvider ? this.inputProvider(p.id) : emptyInput());
      } else {
        const brain = this.brains.get(p.id);
        inputs.set(p.id, brain ? brain.think(this, p, dt) : emptyInput());
      }
    }

    for (const p of this.players) this.stepPlayer(p, inputs.get(p.id)!, dt);
    this.stepBall(dt);
    this.stepPhase(dt);
  }

  // ---------------------------------------------------------------- 查询接口

  predictLanding(): { x: number; z: number; t: number } | null {
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return null;
    let px = b.pos.x;
    let py = b.pos.y;
    let pz = b.pos.z;
    let vx = b.vel.x;
    let vy = b.vel.y;
    let vz = b.vel.z;
    const h = 1 / 30;
    for (let t = 0; t < 3.6; t += h) {
      vy -= BALL.gravity * h;
      px += vx * h;
      py += vy * h;
      pz += vz * h;
      if (py <= BALL.radius) return { x: px, z: pz, t };
    }
    return null;
  }

  /** 球飞到网上方的预计过网点（用于拦网站位与起跳时机） */
  predictNetCrossing(): { x: number; y: number; t: number } | null {
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return null;
    if (Math.abs(b.vel.z) < 0.3) return null;
    if (Math.sign(b.vel.z) === Math.sign(b.pos.z) && Math.abs(b.pos.z) > 0.05) return null;
    let px = b.pos.x;
    let py = b.pos.y;
    let pz = b.pos.z;
    let vx = b.vel.x;
    let vy = b.vel.y;
    let vz = b.vel.z;
    const h = 1 / 60;
    for (let t = h; t < 1.6; t += h) {
      const nx = px + vx * h;
      const ny = py + vy * h;
      const nz = pz + vz * h;
      if ((pz > 0 && nz <= 0) || (pz < 0 && nz >= 0)) {
        const k = pz / (pz - nz);
        return { x: px + (nx - px) * k, y: py + (ny - py) * k, t };
      }
      px = nx;
      py = ny;
      pz = nz;
      vy -= BALL.gravity * h;
      vx *= Math.max(0, 1 - BALL.drag * h);
      vz *= Math.max(0, 1 - BALL.drag * h);
    }
    return null;
  }

  ballTimeToHeight(y: number): number | null {
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return null;
    if (b.pos.y <= y && b.vel.y <= 0) return 0;
    let py = b.pos.y;
    let vy = b.vel.y;
    const h = 1 / 120;
    for (let t = h; t < 2.4; t += h) {
      vy -= BALL.gravity * h;
      py += vy * h;
      if (vy < 0 && py <= y) return t;
    }
    return null;
  }

  /**
   * 扣球判定（比常规触球宽松）：第三拍 + 空中 + 球在头顶合适高度 + 本人没有连击。
   * 之前要求“球必须高过胸口 1.5m 且 3D 距离 1.6m 内”，窗口只有 0.1 秒左右，
   * 真人几乎打不出扣球；这里把高度和水平距离拆开，窗口放宽到约 0.45 秒。
   */
  attackWindow(p: Player): boolean {
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return false;
    if (this.phase !== 'rally') return false;
    // 网前「二传」把球做给队友后，队友这一拍可以直接起跳快扣（否则还要再垫一拍，等于没做成）
    const quick = this.quickAttack[p.team] === p.id;
    if (!quick) {
      if (this.touches[p.team] < 2) return false;
      if (p.grounded) return false;
    }
    if (this.touches[p.team] >= 3) return false;
    if (this.lastHitterByTeam[p.team] === p.id) return false;
    const ownSide = p.team === 0 ? b.pos.z > -0.4 : b.pos.z < 0.4;
    if (!ownSide) return false;
    const dxz = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
    if (dxz > PLAYER.spikeReachXZ) return false;
    // 高度带相对地面、不随跳跃抬升（否则“跳得越高越打不到球”）
    return b.pos.y >= PLAYER.spikeMinY && b.pos.y <= PLAYER.spikeMaxY;
  }

  /** 进攻区：二传把球送到这里，扣球的人从这里起跳 */
  attackZone(team: TeamId): { x: number; z: number } {
    const plan = this.attackPlan[team];
    const attacker =
      plan.attackerId !== null ? this.players.find((p) => p.id === plan.attackerId) : undefined;
    const setter =
      plan.setterId !== null ? this.players.find((p) => p.id === plan.setterId) : undefined;
    const ref = attacker ?? setter;
    const sign = team === 0 ? 1 : -1;
    return {
      x: clamp((ref ? ref.pos.x : 0) * 0.8, -2.6, 2.6),
      z: sign * 1.75,
    };
  }

  /**
   * 二传落点：落在主攻的“冲刺路径”上，而不是固定坐标。
   * 理想落点 = 主攻竖线、离网 1.9m 的进攻点；若二传滞空时间内他跑不到，
   * 就把落点沿他的冲刺方向往前收（他一定能在球落地前赶到并起跳）。
   */
  setAim(
    p: Player,
    attacker: Player | undefined,
    aimX: number | undefined,
  ): { x: number; z: number; apex: number } {
    const sign = p.team === 0 ? 1 : -1;
    const zone = this.attackZone(p.team);
    if (!attacker) {
      return { x: clamp(aimX ?? zone.x, -3.2, 3.2), z: zone.z, apex: 4.9 };
    }
    const az = Math.abs(attacker.pos.z);
    // 主攻在深后场时把球吊得更高，多给他 0.2~0.3s 冲刺时间
    const apex = az > 3.6 ? 5.4 : 4.9;
    // 与 lobVelocity 一致的滞空时间解析解
    const fromY = this.ball.pos.y;
    const tUp = Math.sqrt((2 * Math.max(0.1, apex - fromY)) / BALL.gravity);
    const tDown = Math.sqrt((2 * Math.max(0.01, apex - BALL.radius)) / BALL.gravity);
    const flight = tUp + tDown;
    // 保守估计主攻跑动的平均水平速度（真人 6m/s，冲刺 11m/s；取 6.2 兜底）
    const reach = 6.2 * flight * 0.95;
    const nodeX = clamp(aimX ?? attacker.pos.x * 0.92, -3.2, 3.2);
    const nodeZ = 1.9;
    const dist = Math.hypot(nodeX - attacker.pos.x, nodeZ - az);
    const k = dist <= 1e-3 ? 1 : Math.min(1, reach / dist);
    return {
      x: clamp(attacker.pos.x + (nodeX - attacker.pos.x) * k, -3.2, 3.2),
      z: sign * (az + (nodeZ - az) * k),
      apex,
    };
  }

  /** 当前这一球该由谁接（用于头顶指示） */
  receiverOf(team: TeamId): number | null {
    const landing = this.predictLanding();
    if (!landing || !this.ball.live) return null;
    const sign = team === 0 ? 1 : -1;
    if (Math.sign(landing.z) !== sign) return null;
    let bestId: number | null = null;
    let bestD = Infinity;
    for (const p of this.players) {
      if (p.team !== team) continue;
      let d = dist2D(p.pos.x, p.pos.z, landing.x, landing.z);
      if (p.isHuman && !p.moving) d += 2.2;
      if (d < bestD) {
        bestD = d;
        bestId = p.id;
      }
    }
    return bestId;
  }

  ballInReach(p: Player): boolean {
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return false;
    if (this.touches[p.team] >= 3) return false;
    const ownSide = p.team === 0 ? b.pos.z > -0.4 : b.pos.z < 0.4;
    if (!ownSide) return false;
    const chestY = p.pos.y + PLAYER.chestHeight;
    const d = Math.hypot(b.pos.x - p.pos.x, b.pos.y - chestY, b.pos.z - p.pos.z);
    return d <= PLAYER.reach + BALL.radius;
  }

  mvpName(): string {
    const winner = this.matchWinner;
    const pool = winner === null ? this.players : this.players.filter((p) => p.team === winner);
    let best = pool[0];
    for (const p of pool) if (p.stats.points > best.stats.points) best = p;
    return best ? best.name : '';
  }

  // ---------------------------------------------------------------- 构建

  private roleFor(team: TeamId): AiRole {
    return team === this.humanTeam ? 'ally' : 'foe';
  }

  private createPlayers(skill: Skill, humanName: string): void {
    const n = this.teamSize;
    for (let i = 0; i < n; i++) {
      const human = i < this.humanCount && this.humanTeam === 0;
      this.players.push(
        this.makePlayer({
          id: i,
          team: 0,
          slot: i === 0 ? n - 1 : i - 1,
          human,
          name: this.roster[i] || (i === 0 ? humanName : HOME_AI_NAMES[(i - 1) % HOME_AI_NAMES.length]),
          skill,
        }),
      );
    }
    for (let j = 0; j < n; j++) {
      this.players.push(
        this.makePlayer({
          id: n + j,
          team: 1,
          slot: j,
          human: false,
          name: AWAY_NAMES[j % AWAY_NAMES.length],
          skill,
        }),
      );
    }
  }

  private makePlayer(o: {
    id: number;
    team: TeamId;
    slot: number;
    human: boolean;
    name: string;
    skill: Skill;
  }): Player {
    const role = this.roleFor(o.team);
    const prof = aiProfile(o.skill, role);
    if (!o.human) this.brains.set(o.id, new AIBrain(o.skill, this.rng, role, this.frontBackOn));
    return {
      id: o.id,
      name: o.name,
      team: o.team,
      isHuman: o.human,
      slot: o.slot,
      speedScale: o.human ? 1 : prof.moveScale,
      attackScale: o.human ? 1 : prof.attackScale,
      pos: { x: 0, y: 0, z: 0 },
      prev: { x: 0, y: 0, z: 0 },
      vel: { x: 0, y: 0, z: 0 },
      facing: o.team === 0 ? Math.PI : 0,
      grounded: true,
      moving: false,
      blocking: false,
      sprintTimer: 0,
      sprintCd: 0,
      sprintDir: { x: 0, z: 0 },
      hitCd: 0,
      blockCd: 0,
      hitBuffer: 0,
      spikeBuffer: 0,
      setupBuffer: 0,
      alignVx: 0,
      alignTimer: 0,
      stun: 0,
      charge: 0,
      serveAim: 0,
      anim: 'idle',
      animTimer: 0,
      stats: { points: 0, hits: 0 },
    };
  }

  private resetPlayers(): void {
    for (const p of this.players) {
      const s = slotPosition(p.team, this.teamSize, p.slot);
      p.pos = { x: s.x, y: 0, z: s.z };
      p.prev = { ...p.pos };
      p.vel = { x: 0, y: 0, z: 0 };
      p.grounded = true;
      p.moving = false;
      p.blocking = false;
      p.sprintTimer = 0;
      p.sprintCd = 0;
      p.stun = 0;
      p.hitBuffer = 0;
      p.spikeBuffer = 0;
      p.setupBuffer = 0;
      p.alignVx = 0;
      p.alignTimer = 0;
      p.charge = 0;
      p.anim = 'idle';
      p.animTimer = 0;
      p.facing = p.team === 0 ? Math.PI : 0;
    }
  }

  // ---------------------------------------------------------------- 球员

  private stepPlayer(p: Player, inp: ControlInput, dt: number): void {
    p.prev.x = p.pos.x;
    p.prev.y = p.pos.y;
    p.prev.z = p.pos.z;

    p.sprintCd = Math.max(0, p.sprintCd - dt);
    p.hitCd = Math.max(0, p.hitCd - dt);
    p.blockCd = Math.max(0, p.blockCd - dt);
    p.animTimer = Math.max(0, p.animTimer - dt);

    if (p.stun > 0) {
      p.stun = Math.max(0, p.stun - dt);
      if (p.anim !== 'dive') p.anim = 'stun';
      p.vel.x *= 0.9;
      p.vel.z *= 0.9;
      p.pos.x += p.vel.x * dt;
      p.pos.z += p.vel.z * dt;
      this.clampToCourt(p);
      this.stepVertical(p, dt);
      p.blocking = false;
      p.moving = false;
      return;
    }

    const active = this.phase === 'serve' || this.phase === 'rally';
    const locked = this.phase === 'serve' && p.id === this.serverId;

    if (active && !locked) {
      if (inp.sprint && p.grounded && p.sprintCd <= 0) {
        const len = Math.hypot(inp.moveX, inp.moveZ);
        if (len > 0.05) {
          p.sprintTimer = PLAYER.sprintDuration;
          p.sprintCd = PLAYER.sprintCooldown;
          p.sprintDir = { x: inp.moveX / len, z: inp.moveZ / len };
        }
      }

      let vx = 0;
      let vz = 0;
      if (p.sprintTimer > 0) {
        p.sprintTimer = Math.max(0, p.sprintTimer - dt);
        vx = p.sprintDir.x * PLAYER.sprintSpeed;
        vz = p.sprintDir.z * PLAYER.sprintSpeed;
      } else {
        const len = Math.hypot(inp.moveX, inp.moveZ);
        if (len > 0.05) {
          const sp = PLAYER.moveSpeed * p.speedScale * (p.grounded ? 1 : 0.55);
          vx = (inp.moveX / len) * sp;
          vz = (inp.moveZ / len) * sp;
        }
      }

      if (vx !== 0 || vz !== 0) {
        p.pos.x += vx * dt;
        p.pos.z += vz * dt;
        p.vel.x = vx;
        p.vel.z = vz;
        p.moving = true;
        p.facing = angleDamp(p.facing, Math.atan2(vx, vz), 16, dt);
      } else {
        p.moving = false;
        p.vel.x = 0;
        p.vel.z = 0;
      }

      if (inp.jump && p.grounded) {
        p.vel.y = PLAYER.jumpVelocity;
        p.grounded = false;
        this.events.emit('jump', { playerId: p.id, block: false });
      }
    } else {
      p.moving = false;
      p.vel.x = 0;
      p.vel.z = 0;
    }

    if (locked) {
      const face = p.team === 0 ? Math.PI : 0;
      p.facing = angleDamp(p.facing, face, 10, dt);
    }

    this.clampToCourt(p);
    this.stepVertical(p, dt);

    // 按下拦网时的自动微对齐：朝预测过网点侧移一小步（≤0.45m / 0.2s），不是瞬移
    if (p.alignTimer > 0) {
      p.alignTimer = Math.max(0, p.alignTimer - dt);
      p.pos.x += p.alignVx * dt;
      this.clampToCourt(p);
    }

    // 网前按 K 自动起跳，起跳后保持张臂拦网
    if (
      this.phase === 'rally' &&
      inp.block &&
      p.grounded &&
      p.stun <= 0 &&
      Math.abs(p.pos.z) < 1.8
    ) {
      // 贴网补跳：按下时球已经在过网窗口内（≤0.25s），这次起跳更快，让手能及时到网上沿
      const cross = this.predictNetCrossing();
      const lateHop = this.blockFastRise && !!cross && cross.t <= 0.25;
      p.vel.y = PLAYER.jumpVelocity * (lateHop ? 1.22 : 1);
      p.grounded = false;
      p.blockCd = 0.7;
      // 横向微对齐：按下瞬间按预测过网点修正 ≤0.45m（超出这个范围说明站位就错了，不救）
      if (cross && p.isHuman && this.blockAlignMax > 0 && Math.abs(cross.x - p.pos.x) <= 1.3) {
        const dx = clamp(cross.x - p.pos.x, -this.blockAlignMax, this.blockAlignMax);
        p.alignVx = dx / 0.2;
        p.alignTimer = 0.2;
      }
      this.events.emit('jump', { playerId: p.id, block: true });
    }
    if (inp.block && Math.abs(p.pos.z) < 1.8) p.blockCd = Math.max(p.blockCd, 0.7);
    p.blocking =
      this.phase === 'rally' &&
      (inp.blockHeld || p.blockCd > 0) &&
      !p.grounded &&
      Math.abs(p.pos.z) < 1.8;

    if (this.phase === 'rally') {
      // 击球输入缓冲：按下后 0.35s 内进入判定范围都能打中，按住 J 也会持续尝试
      if (inp.hit) p.hitBuffer = 0.35;
      p.hitBuffer = Math.max(0, p.hitBuffer - dt);
      if (p.hitBuffer > 0 || inp.hitHeld) {
        const connected = this.tryHit(p, inp);
        if (connected) {
          p.hitBuffer = 0;
        } else if (inp.hit) {
          // 空挥也给动作反馈，避免"按了没反应"的错觉
          p.anim = 'hit';
          p.animTimer = 0.22;
          this.events.emit('swing', { playerId: p.id });
        }
      }
    }

    // 手动击球键优先；没按键时，对面重扣进入己方界内且人已跑到位 → 自动起球。
    // 正在拦网 / 按了二传或扣杀时不抢球：否则玩家跳起来拦网，球还没过网就被“自动起球”
    // 摸掉一拍，拦网永远碰不到球（实机“一直拦不到”的主要原因）。
    if (
      this.autoDigOn &&
      this.phase === 'rally' &&
      !inp.hit &&
      !inp.hitHeld &&
      !inp.block &&
      !inp.blockHeld &&
      !inp.setup &&
      !inp.spike &&
      !p.blocking &&
      p.hitBuffer <= 0 &&
      p.setupBuffer <= 0 &&
      p.spikeBuffer <= 0
    ) {
      this.tryAutoDig(p, inp);
    }

    if (this.phase === 'rally') this.stepNetControls(p, inp, dt);

    if (this.phase === 'serve' && p.id === this.serverId) {
      // 轻点也能发球：按下即给一个最小蓄力
      if (inp.hit && p.charge <= 0) p.charge = 0.06;
      if (inp.hitHeld) {
        p.charge = Math.min(1, p.charge + dt / PLAYER.serveMaxCharge);
        if (p.isHuman) p.serveAim = clamp(p.pos.x * 0.25 + inp.moveX * 1.8, -3.2, 3.2);
      } else if (p.charge > 0) {
        this.doServe(p, p.charge);
      }
      p.facing = angleDamp(p.facing, p.team === 0 ? Math.PI : 0, 10, dt);
    }

    if (p.animTimer > 0 && (p.anim === 'hit' || p.anim === 'dive' || p.anim === 'cheer')) return;
    if (!p.grounded) p.anim = 'jump';
    else if (p.moving) p.anim = 'run';
    else p.anim = 'idle';
  }

  private stepVertical(p: Player, dt: number): void {
    p.pos.y += p.vel.y * dt;
    p.vel.y -= PLAYER.gravity * dt;
    if (p.pos.y <= 0) {
      p.pos.y = 0;
      if (p.vel.y < 0) p.vel.y = 0;
      p.grounded = true;
    } else {
      p.grounded = false;
    }
  }

  private clampToCourt(p: Player): void {
    p.pos.x = clamp(p.pos.x, -COURT.halfWidth - 0.45, COURT.halfWidth + 0.45);
    if (p.team === 0) p.pos.z = clamp(p.pos.z, 0.5, COURT.halfLength + 0.6);
    else p.pos.z = clamp(p.pos.z, -COURT.halfLength - 0.6, -0.5);
  }

  private handPos(p: Player): { x: number; y: number; z: number } {
    const sign = p.team === 0 ? -1 : 1;
    return { x: p.pos.x + 0.32, y: p.pos.y + 1.35, z: p.pos.z + sign * 0.25 };
  }

  // ---------------------------------------------------------------- 击球

  /**
   * 一传时决定本轮主攻（决定二传与扣球的分工）。判据只看位置，不看“是否在移动”：
   * 真人摇杆一直在微动，用移动状态判断会让真人永远被判成“在跑动”，从而永远拿不到二传球。
   * - 真人离进攻区 ≤6.2m（半个球场，默认站位约 4.1m）→ 真人主攻，人机把球做给玩家；
   * - 真人退到接近底线外 → 人机主攻，真人第二拍做二传（“玩家传球 → AI 扣杀”）。
   * 双真人或没有真人时，由一传的人自己当主攻。
   */
  private preferredAttacker(p: Player): number {
    const mate = this.players.find((q) => q.team === p.team && q.id !== p.id);
    if (!mate || !mate.isHuman || p.isHuman) return p.id;
    const h = mate;
    const sign = h.team === 0 ? 1 : -1;
    const zone = { x: clamp(h.pos.x * 0.8, -2.6, 2.6), z: sign * 1.75 };
    // 阈值为“半个球场”：真人默认站位（离进攻区 ~4.1m）一定判成主攻。
    // 只有真人退到接近底线外才让 AI 主攻。
    return dist2D(h.pos.x, h.pos.z, zone.x, zone.z) <= 6.2 ? h.id : p.id;
  }

  private tryHit(p: Player, inp: ControlInput, force?: 'setup' | 'auto' | 'send'): boolean {
    const attack = force === 'setup' ? false : this.attackWindow(p);
    if (!attack && !this.ballInReach(p)) {
      // 自动接扣杀用更宽的“跑到位”范围（球高带 + 水平距离），其余情况仍按胸口 1.75m
      if (!(force === 'auto' && this.autoDigReach(p))) return false;
    }
    if (p.hitCd > 0) return false;
    if (this.time - this.lastHitAt < PLAYER.hitGap) return false;

    const b = this.ball;
    const sign = p.team === 0 ? -1 : 1;
    const chestY = p.pos.y + PLAYER.chestHeight;
    const d = Math.hypot(b.pos.x - p.pos.x, b.pos.y - chestY, b.pos.z - p.pos.z);

    const t = this.touches[p.team];
    const mate = this.players.find((q) => q.team === p.team && q.id !== p.id);
    const from = { x: b.pos.x, y: b.pos.y, z: b.pos.z };
    const targetY = BALL.radius;

    // ---- 本次触球的性质与分工 ----
    // 第三拍：空中且球在头顶 = 扣球，否则只能处理过网
    // 第二拍：二传手组织（set）；主攻被迫救场时直接推过网（send），避免自己连打三拍
    let kind: HitKind;
    if (force === 'setup') {
      // 网前「二传」：主动把球吊给队友，队友下一拍主攻扣杀
      kind = 'set';
    } else if (force === 'send') {
      // 兜底处理过网（触球次数用尽 / 无队友）：明确走高吊过网，绝不变成“扣球”
      kind = 'send';
    } else if (attack) {
      kind = 'attack';
    } else if (t === 2) {
      kind = 'send';
    } else if (t === 1) {
      // 第二拍默认组织进攻（谁传谁当二传，搭档自动成为主攻）；
      // 只有人机判断“主攻根本赶不上”时才直接推过网兜底
      const dump = this.brains.get(p.id)?.dump ?? false;
      kind = dump ? 'send' : 'set';
    } else {
      kind = 'pass';
    }

    if (t === 0) {
      // 第一拍就定好这轮的“二传”和“主攻”：单人模式优先让真人扣
      let attackerId = this.preferredAttacker(p);
      let setterId = p.id;
      if (force === 'setup' && mate) {
        attackerId = mate.id;
      } else if (attackerId === p.id && mate) {
        let setter: Player | null = null;
        for (const m of this.players) {
          if (m.team !== p.team || m.id === p.id) continue;
          if (!setter || Math.abs(m.pos.z) < Math.abs(setter.pos.z)) setter = m;
        }
        setterId = setter ? setter.id : mate.id;
      }
      this.attackPlan[p.team] = { setterId, attackerId };
      // 明确按下「二传」时，队友这一拍直接快扣，不再先垫一下
      if (force === 'setup' && mate) this.quickAttack[p.team] = mate.id;
    } else if (t === 1 && kind === 'set') {
      // 第二拍谁传谁就是二传，搭档自动成为主攻（支持“真人二传 → AI 扣杀”）
      this.attackPlan[p.team] = { setterId: p.id, attackerId: mate ? mate.id : null };
    }

    if (kind === 'attack') {
      const opps = this.players.filter((q) => q.team !== p.team);
      let avgX = 0;
      for (const q of opps) avgX += q.pos.x;
      avgX = opps.length ? avgX / opps.length : 0;
      const autoAim = -Math.sign(avgX || this.rng(-0.5, 0.5)) * this.rng(2.3, 3.6);
      const aim =
        inp.aimX ?? (inp.moveX !== 0 ? clamp(p.pos.x + inp.moveX * 3, -3.6, 3.6) : autoAim);
      const target = {
        x: clamp(aim, -3.7, 3.7),
        y: targetY,
        z: sign * (3.6 + this.rng(0, 2.8)),
      };
      const dist = Math.hypot(target.x - from.x, target.z - from.z);
      // 球速倍率：人机难度越低扣球越慢，真人更容易防起
      const T = clamp(dist / 18, 0.38, 0.65) / Math.max(0.6, p.attackScale);
      b.vel = solveVelocity(from, target, Math.max(0.3, T));
      // 对手会“打手出界/改线”避开拦网手：只在真有拦网人时按概率发生，
      // 不拦网时不会自动绕过玩家（否则等于白送分）。
      const prof = p.isHuman ? null : aiProfile(this.skill, this.roleFor(p.team));
      const blocker = this.players.find(
        (q) => q.team !== p.team && q.blocking && Math.abs(q.pos.z) < 1.8,
      );
      if (blocker && prof && prof.wipeChance > 0 && this.rng(0, 1) < prof.wipeChance) {
        const side = from.x >= blocker.pos.x ? 1 : -1;
        const desired = blocker.pos.x + side * 1.0;
        const tc = Math.abs(from.z) / Math.max(1, Math.abs(b.vel.z));
        if (tc > 0.01) {
          b.vel.x += clamp((desired - (from.x + b.vel.x * tc)) / tc, -9, 9);
        }
      }
    } else if (kind === 'set') {
      // 二传：落点不写死，按“主攻能不能跑到”算在他的冲刺路径上。
      // 固定点（离网 1.75m）在后场队友身上会变成“传给空气”——球落地时人还在 4m 外。
      const attacker =
        this.attackPlan[p.team].attackerId !== null
          ? this.players.find((q) => q.id === this.attackPlan[p.team].attackerId)
          : undefined;
      const aim = this.setAim(p, attacker, inp.aimX);
      b.vel = lobVelocity(from, { x: aim.x, y: targetY, z: aim.z }, aim.apex);
    } else if (kind === 'send') {
      const aim = inp.aimX ?? clamp(p.pos.x + inp.moveX * 2.6, -3.5, 3.5);
      b.vel = lobVelocity(from, { x: aim, y: targetY, z: sign * (4.4 + this.rng(0, 2.4)) }, 5.2);
    } else {
      // 一传：垫给本轮指定的二传手，落点保持在进攻区内，保证还能组织进攻
      const setter =
        this.attackPlan[p.team].setterId !== null
          ? this.players.find((q) => q.id === this.attackPlan[p.team].setterId)
          : undefined;
      const ref = setter ?? mate;
      if (ref) {
        const tz = -sign * clamp(Math.abs(ref.pos.z) * 0.9, 1.2, 4.2);
        b.vel = lobVelocity(
          from,
          { x: clamp(ref.pos.x * 0.85, -3, 3), y: targetY, z: tz },
          5.4,
        );
      } else {
        b.vel = lobVelocity(from, { x: p.pos.x * 0.5, y: targetY, z: p.pos.z * 0.7 }, 5.4);
      }
    }

    const q = clamp(1 - Math.abs(d - 0.55) / 1.05, 0.1, 1);
    let power = Math.round(10 + 40 * q);
    if (kind === 'attack') power *= 2;
    const samePlayer = t > 0 && this.lastHitterByTeam[p.team] === p.id;
    if (samePlayer) power = Math.round(power * 0.5);

    this.ball.lastKind = kind;
    if (kind === 'attack') this.lastAttackTime[p.team] = this.time;
    this.touches[p.team] = t + 1;
    if (kind === 'attack') this.quickAttack[p.team] = null;
    this.lastHitAt = this.time;
    this.lastHitterByTeam[p.team] = p.id;
    b.lastHitTeam = p.team;
    b.lastHitterId = p.id;
    p.hitCd = PLAYER.hitCooldown;
    p.stats.hits++;
    p.anim = 'hit';
    p.animTimer = 0.26;

    if (p.sprintTimer > 0.06 && p.grounded) {
      p.stun = PLAYER.diveStun;
      p.anim = 'dive';
      p.animTimer = PLAYER.diveStun;
      p.vel.x = p.sprintDir.x * 6;
      p.vel.z = p.sprintDir.z * 6;
      p.sprintTimer = 0;
      this.events.emit('dive', { playerId: p.id });
    }

    this.events.emit('hit', {
      playerId: p.id,
      team: p.team,
      power,
      combo: this.touches[p.team],
      kind,
      perfect: q > 0.78,
      auto: force === 'auto',
      x: b.pos.x,
      y: b.pos.y,
      z: b.pos.z,
    });
    return true;
  }

  /**
   * 自动接扣杀：只在“对方扣杀 / 重扣球进入己方半场”时生效。
   * 必须同时满足：落点预测在界内、玩家跑到“水平距离 + 球高带”范围内、触球没满、没有连击。
   * 界外球一律不碰，避免帮对手救球。
   */
  private tryAutoDig(p: Player, inp: ControlInput): void {
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return;
    if (b.lastKind !== 'attack' || b.lastHitTeam === p.team) return;
    if (this.touches[p.team] >= 3) return;
    if (this.lastHitterByTeam[p.team] === p.id) return;
    // 只碰已经进入己方半场的球：球还在对面半场（含贴网的 -0.4m 容差）时不许自动起球，
    // 否则会“隔网摸球”，把对手那拍扣球凭空变成我方一传
    const ownSide = p.team === 0 ? b.pos.z > 0.05 : b.pos.z < -0.05;
    if (!ownSide) return;
    const landing = this.predictLanding();
    if (!landing || !this.landingInBounds(landing, p.team)) return;
    if (!this.autoDigReach(p)) return;
    // “跑到位置”才触球：落点必须真的在自己附近，顺手碰一下会把队友的球抢掉
    const range = this.autoDigRange(p);
    const mineD = Math.hypot(landing.x - p.pos.x, landing.z - p.pos.z);
    if (mineD > range + 1.0) return;
    const mate = this.players.find((q) => q.team === p.team && q.id !== p.id);
    // 责任区：落点在后场时前排球员不抢球（交给后排队友），
    // 只有后排队友明显够不到（已失位）时前排才补位救球。
    if (mate && Math.abs(p.pos.z) <= 3.0 && Math.abs(landing.z) > 3.4) {
      const mateBack = Math.abs(mate.pos.z) > 3.0;
      const mateD = Math.hypot(landing.x - mate.pos.x, landing.z - mate.pos.z);
      const mateReach = this.autoDigRange(mate) + 1.0;
      if (mateBack && mateD <= mateReach) return;
    }
    // 接球优先权：谁更近且够得着谁接（双方共用同一判定，不会互抢，也不会互相让球）
    if (mate) {
      const mateD = Math.hypot(landing.x - mate.pos.x, landing.z - mate.pos.z);
      const mateCanHit = this.ballInReach(mate) || this.autoDigReach(mate);
      if (mateCanHit && mateD + 0.8 < mineD) return;
    }
    // 起球默认给队友（pass/set 分支会吊向队友）；只有第三拍才处理过网
    const aim = clamp(-p.pos.x * 0.3 + this.rng(-0.7, 0.7), -3.2, 3.2);
    if (this.tryHit(p, { ...inp, hit: false, hitHeld: false, aimX: aim }, 'auto')) {
      this.autoDigs++;
      p.hitBuffer = 0;
    }
  }

  private noteSetFallback(p: Player, reason: 'noMate' | 'touchesExhausted' | 'noReach'): void {
    this.setFallbacks[reason]++;
    this.events.emit('setFallback', { playerId: p.id, reason });
  }

  private autoDigRange(p?: Player): number {
    const base = this.skill === 'easy' ? 2.15 : this.skill === 'normal' ? 1.95 : 1.75;
    // 前排球员的自动接球范围收窄：球从头顶飞向后场时不“截胡”，把球留给后排队友
    if (p && Math.abs(p.pos.z) <= 3.0) return base * 0.55;
    return base;
  }

  /** 自动接扣杀的有效范围：简单档更宽，困难档略收紧（三档都可用） */
  private autoDigReach(p: Player): boolean {
    const b = this.ball;
    const dxz = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
    const range = this.autoDigRange(p);
    // 只在球已经下落到可起球高度带时自动触球：
    // 球还在头顶上方飞向后场时不碰，避免前排的人把属于后场的球“截胡”。
    const maxY = this.skill === 'easy' ? 2.3 : this.skill === 'normal' ? 2.15 : 2.0;
    return dxz <= range && b.pos.y >= 0.35 && b.pos.y <= maxY && b.vel.y < 0;
  }

  /** 预测落点是否在本方半场界内（界外球不自动触球） */
  private landingInBounds(l: { x: number; z: number }, team: TeamId): boolean {
    if (Math.abs(l.x) > COURT.halfWidth - BALL.radius * 0.5) return false;
    if (team === 0) return l.z > 0 && l.z < COURT.halfLength;
    return l.z < 0 && l.z > -COURT.halfLength;
  }

  /** 网前「二传」语义按键：扣杀（自动起跳 + 扣球）/ 二传（回传队友） */
  private stepNetControls(p: Player, inp: ControlInput, dt: number): void {
    if (inp.spike) p.spikeBuffer = 0.9;
    if (inp.setup) p.setupBuffer = 0.6;
    const hadSetup = p.setupBuffer > 0;
    p.spikeBuffer = Math.max(0, p.spikeBuffer - dt);
    p.setupBuffer = Math.max(0, p.setupBuffer - dt);
    if (hadSetup && p.setupBuffer === 0) {
      // 缓冲耗尽还没碰到球：记一笔“够不着”，不做过网兜底（没触球就没有出球一说）
      this.noteSetFallback(p, 'noReach');
    }

    if (p.setupBuffer > 0 && this.ballInReach(p)) {
      const mate = this.players.find((q) => q.team === p.team && q.id !== p.id);
      const t = this.touches[p.team];
      if (!mate) {
        // 无队友可用：唯一合法的兜底是处理过网
        p.setupBuffer = 0;
        this.noteSetFallback(p, 'noMate');
        this.tryHit(p, inp, 'send');
      } else if (t >= 2) {
        // 触球次数已用尽（第三拍）：允许处理过网，否则这一拍就直接丢了
        p.setupBuffer = 0;
        this.noteSetFallback(p, 'touchesExhausted');
        this.tryHit(p, inp, 'send');
      } else if (this.tryHit(p, inp, 'setup')) {
        p.setupBuffer = 0;
        p.spikeBuffer = 0;
      }
    }

    if (p.spikeBuffer > 0) {
      if (!this.canAutoSpike(p)) {
        // 「扣杀」不合法（球不在可扣高度 / 触球已满 / 球不在己方半场）时：
        // 球在够得着的范围就退回普通击球，不能变成空按；够不着则清掉缓冲，不触发其他动作
        p.spikeBuffer = 0;
        if (this.ballInReach(p)) this.tryHit(p, inp);
        return;
      }
      if (p.grounded && p.stun <= 0) {
        const tt = this.ballTimeToHeight(PLAYER.spikeMinY + 0.6);
        if (tt !== null && tt <= 0.62) {
          p.vel.y = PLAYER.jumpVelocity;
          p.grounded = false;
          this.events.emit('jump', { playerId: p.id, block: false });
        }
      }
      if (this.attackWindow(p) && this.tryHit(p, inp)) {
        p.spikeBuffer = 0;
      }
    }
  }

  /** 「扣杀」合法性：第三拍、球在己方半场且够高够近；不合法时按下也不触发 */
  private canAutoSpike(p: Player): boolean {
    if (this.touches[p.team] < 2 || this.touches[p.team] >= 3) return false;
    const b = this.ball;
    if (!b.live || b.dead || b.heldBy !== null) return false;
    const ownSide = p.team === 0 ? b.pos.z > -0.4 : b.pos.z < 0.4;
    if (!ownSide) return false;
    if (b.pos.y < PLAYER.spikeMinY - 0.4) return false;
    if (dist2D(b.pos.x, b.pos.z, p.pos.x, p.pos.z) > 2.6) return false;
    return true;
  }

  /** 发球轨迹（蓄力预览与实际发球共用，保证所见即所得） */
  private serveTrajectory(p: Player, power: number): { start: Vec3; vel: Vec3 } {
    const sign = p.team === 0 ? -1 : 1;
    const start = this.handPos(p);
    const apex = 6.4 - 2.3 * power;
    const vel = lobVelocity(start, { x: p.serveAim, y: BALL.radius, z: sign * (4.6 + 3 * power) }, apex);
    return { start, vel };
  }

  /** 蓄力时的虚线弹道预览 */
  servePreview(): Vec3[] | null {
    if (this.phase !== 'serve') return null;
    const server = this.players.find((p) => p.id === this.serverId);
    if (!server || server.charge <= 0.03) return null;
    const { start, vel } = this.serveTrajectory(server, clamp(server.charge, 0.15, 1));
    const pts: Vec3[] = [];
    let { x, y, z } = start;
    let vx = vel.x;
    let vy = vel.y;
    let vz = vel.z;
    const h = 0.04;
    for (let i = 0; i < 70; i++) {
      pts.push({ x, y, z });
      vy -= BALL.gravity * h;
      x += vx * h;
      y += vy * h;
      z += vz * h;
      if (y <= BALL.radius) break;
    }
    return pts;
  }

  private doServe(p: Player, charge: number): void {
    const power = clamp(charge, 0.15, 1);
    const b = this.ball;
    const { start, vel } = this.serveTrajectory(p, power);
    b.pos = { ...start };
    b.prev = { ...start };
    b.vel = vel;
    b.live = true;
    b.dead = false;
    b.heldBy = null;
    b.lastHitTeam = p.team;
    b.lastHitterId = p.id;
    this.lastHitterByTeam[p.team] = p.id;
    this.touches = [0, 0];
    this.lastAttackTime = [-10, -10];
    p.charge = 0;
    p.hitCd = 0.5;
    p.hitBuffer = 0;
    p.anim = 'hit';
    p.animTimer = 0.26;

    this.setPhase('rally');
    this.events.emit('serve', { playerId: p.id, power });
  }

  // ---------------------------------------------------------------- 球

  private stepBall(dt: number): void {
    const b = this.ball;
    if (b.heldBy !== null) {
      const p = this.players.find((q) => q.id === b.heldBy);
      if (p) {
        const hp = this.handPos(p);
        b.pos = hp;
        b.prev = { ...hp };
      }
      return;
    }
    const blockers = this.players
      .filter((p) => p.blocking)
      .map((p) => ({
        playerId: p.id,
        team: p.team,
        x: p.pos.x,
        // 手掌 + 前臂形成的竖直拦截面：水平半宽 0.92m（原 0.78m 对真人横向偏差太苛刻），
        // 高度从肘部到指尖
        halfW: this.blockHalfW,
        minY: p.pos.y + 0.65,
        maxY: p.pos.y + 2.45,
      }));
    b.step(dt, blockers, (e) => this.onBallEvent(e));
  }

  private onBallEvent(e: BallEvent): void {
    switch (e.type) {
      case 'net':
        this.events.emit('net', { x: e.x, y: e.y, z: e.z });
        break;
      case 'block':
        this.events.emit('block', { playerId: e.playerId, x: e.x, y: e.y, z: e.z });
        break;
      case 'cross':
        this.touches = [0, 0];
        this.attackPlan = [
          { setterId: null, attackerId: null },
          { setterId: null, attackerId: null },
        ];
        break;
      case 'ground':
        this.onGround(e.x, e.z);
        break;
    }
  }

  private onGround(x: number, z: number): void {
    const inBounds = Math.abs(x) <= COURT.halfWidth && Math.abs(z) <= COURT.halfLength;
    const landSide: TeamId = z >= 0 ? 0 : 1;
    const lastTeam = this.ball.lastHitTeam ?? this.servingTeam;
    let winner: TeamId;
    if (!inBounds) winner = (1 - lastTeam) as TeamId;
    else if (landSide !== lastTeam) winner = lastTeam;
    else winner = (1 - lastTeam) as TeamId;

    this.events.emit('land', { x, z, winner, inBounds });
    this.awardPoint(winner);
  }

  // ---------------------------------------------------------------- 阶段

  private stepPhase(dt: number): void {
    switch (this.phase) {
      case 'kickoff': {
        this.phaseTimer -= dt;
        const n = Math.ceil(this.phaseTimer);
        if (n !== this.lastCount && n > 0 && n <= 3) {
          this.lastCount = n;
          this.events.emit('announce', { text: String(n), ms: 620 });
          this.events.emit('tick', { n });
        }
        if (this.phaseTimer <= 0) this.beginServe();
        break;
      }
      case 'serve': {
        this.serveElapsed += dt;
        if (this.serveElapsed > 9) {
          const server = this.players.find((p) => p.id === this.serverId);
          if (server) this.doServe(server, 0.5);
        }
        break;
      }
      case 'rally': {
        if (this.clock > 0) {
          this.clock = Math.max(0, this.clock - dt);
          if (this.clock <= 0 && !this.timeUp) {
            this.timeUp = true;
            this.events.emit('announce', {
              text: '时间到',
              sub: '本回合结束后结算',
              ms: 1400,
            });
          }
        }
        break;
      }
      case 'point': {
        this.phaseTimer -= dt;
        if (this.phaseTimer <= 0) this.afterPoint();
        break;
      }
      case 'setend': {
        this.phaseTimer -= dt;
        if (this.phaseTimer <= 0) this.afterSetEnd();
        break;
      }
      default:
        break;
    }
  }

  private beginServe(): void {
    this.setupServe();
    this.serveElapsed = 0;
    this.setPhase('serve');
    const mine = this.servingTeam === this.humanTeam;
    this.events.emit('announce', {
      text: mine ? '我方发球' : '对方发球',
      sub: mine ? '按住击球蓄力，松开发球' : '',
      ms: 1300,
    });
  }

  private setupServe(): void {
    this.resetPlayers();
    // 同队两人轮流发球：按 id 顺序轮转，每次该队开始发球取当前索引后 +1。
    // 规则：本队得分继续发球 → 下一个轮转人发；换发到对方 → 对方按自己的轮转继续。
    const teammates = this.players
      .filter((p) => p.team === this.servingTeam)
      .sort((a, b) => a.id - b.id);
    const idx = teammates.length > 0 ? this.serveIndex[this.servingTeam] % teammates.length : 0;
    const server = teammates[idx];
    if (teammates.length > 0) {
      this.serveIndex[this.servingTeam] = (idx + 1) % teammates.length;
    }
    if (server) {
      this.serverId = server.id;
      const sign = server.team === 0 ? 1 : -1;
      server.pos.x = clamp(server.pos.x * 0.55, -2, 2);
      server.pos.z = sign * (COURT.halfLength + 0.55);
      server.prev = { ...server.pos };
      server.facing = server.team === 0 ? Math.PI : 0;
      server.charge = 0;
      server.serveAim = server.isHuman
        ? clamp(server.pos.x * 0.25, -3.2, 3.2)
        : this.rng(-2.4, 2.4);
    }
    this.ball.reset();
    const s = this.players.find((p) => p.id === this.serverId);
    if (s) {
      this.ball.heldBy = s.id;
      this.ball.pos = this.handPos(s);
      this.ball.prev = { ...this.ball.pos };
    }
    this.touches = [0, 0];
    this.lastAttackTime = [-10, -10];
    this.attackPlan = [
      { setterId: null, attackerId: null },
      { setterId: null, attackerId: null },
    ];
    this.quickAttack = [null, null];
  }

  private awardPoint(winner: TeamId): void {
    this.scores[winner]++;
    const scorerId = this.lastHitterByTeam[winner];
    if (scorerId !== null) {
      const sp = this.players.find((p) => p.id === scorerId);
      if (sp) sp.stats.points++;
    }
    this.servingTeam = winner;
    this.slowmoTimer = 0.9;
    this.touches = [0, 0];
    this.lastAttackTime = [-10, -10];
    this.attackPlan = [
      { setterId: null, attackerId: null },
      { setterId: null, attackerId: null },
    ];
    this.quickAttack = [null, null];
    this.setPhase('point');
    this.phaseTimer = MATCH.pointSeconds;
    this.events.emit('score', {
      winner,
      scores: [this.scores[0], this.scores[1]],
      setsWon: [this.setsWon[0], this.setsWon[1]],
    });
    this.events.emit('announce', {
      text: winner === this.humanTeam ? '我方得分' : '对方得分',
      ms: 900,
    });
  }

  private afterPoint(): void {
    const [a, b] = this.scores;
    const target = MATCH.pointsToWinSet;
    let setWinner: TeamId | null = null;

    if (this.suddenDeath) {
      setWinner = a > b ? 0 : 1;
    } else if (a >= target) {
      setWinner = 0;
    } else if (b >= target) {
      setWinner = 1;
    } else if (this.timeUp) {
      if (a !== b) {
        setWinner = a > b ? 0 : 1;
      } else {
        this.suddenDeath = true;
        this.events.emit('announce', { text: 'DEUCE', sub: '下一分决定本局', ms: 1700 });
        this.beginServe();
        return;
      }
    }

    if (setWinner === null) {
      this.beginServe();
      return;
    }
    this.endSet(setWinner);
  }

  private endSet(winner: TeamId): void {
    this.setsWon[winner]++;
    this.setPhase('setend');
    this.phaseTimer = MATCH.setEndSeconds;
    this.events.emit('setEnd', {
      winner,
      setsWon: [this.setsWon[0], this.setsWon[1]],
    });
    this.events.emit('announce', {
      text: `SET ${this.setIndex + 1}`,
      sub: winner === this.humanTeam ? '你的队伍拿下本局' : '对手拿下本局',
      ms: 2200,
    });
  }

  private afterSetEnd(): void {
    const win = this.setsWon[0] >= MATCH.setsToWin ? 0 : 1;
    if (this.setsWon[0] >= MATCH.setsToWin || this.setsWon[1] >= MATCH.setsToWin) {
      this.matchWinner = win as TeamId;
      this.setPhase('matchend');
      this.events.emit('matchEnd', { winner: this.matchWinner, mvp: this.mvpName() });
      return;
    }

    const prevWinner = this.setsWon[0] > this.setsWon[1] ? 0 : 1;
    this.setIndex++;
    this.scores = [0, 0];
    this.clock = MATCH.setSeconds;
    this.timeUp = false;
    this.suddenDeath = false;
    this.servingTeam = prevWinner as TeamId;
    this.lastHitterByTeam = [null, null];
    this.resetPlayers();
    this.ball.reset();
    this.setPhase('kickoff');
    this.phaseTimer = MATCH.kickoffSeconds;
    this.lastCount = -1;
    this.events.emit('announce', {
      text: `SET ${this.setIndex + 1}`,
      sub: this.servingTeam === this.humanTeam ? '我方发球' : '对方发球',
      ms: 1200,
    });
  }

  private setPhase(p: Phase): void {
    if (this.phase === p) return;
    this.phase = p;
    this.events.emit('phase', { phase: p });
  }
}
