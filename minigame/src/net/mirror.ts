/**
 * 主机权威同步：快照编码 / 镜像回放 / 远程输入缓冲。
 * - 房主每 1/15s 把 World 关键状态编码成紧凑 JSON 快照；
 * - 客机不跑仿真，用「上一份/当前份」两帧快照做位置插值，事件随快照一次性触发；
 * - 远程输入的边沿位（击球/跳跃/拦网）只消费一次，避免一次按键被多个物理步重复吃掉。
 */

import type { ControlInput, GameEvents } from '../sim/types';
import { emptyInput } from '../sim/types';
import type { World } from '../sim/world';

const r3 = (v: number): number => Math.round(v * 1000) / 1000;

export interface SnapPlayer {
  p: [number, number, number];
  v: [number, number, number];
  f: number;
  g: 0 | 1;
  m: 0 | 1;
  b: 0 | 1;
  spt: number;
  st: number;
  c: number;
  sa: number;
  a: string;
  at: number;
  pt: number;
}

export interface Snap {
  q: number;
  ph: string;
  pt: number;
  s: [number, number];
  sw: [number, number];
  si: number;
  sv: number;
  stn: number;
  tc: [number, number];
  ck: number;
  sl: number;
  tu: 0 | 1;
  sd: 0 | 1;
  se: number;
  ti: number;
  mw: number | null;
  b: {
    p: [number, number, number];
    v: [number, number, number];
    l: 0 | 1;
    d: 0 | 1;
    h: number | null;
    ht: number | null;
    hi: number | null;
  };
  ps: SnapPlayer[];
  ev: Array<[keyof GameEvents, unknown]>;
}

export type GameEventKind = keyof GameEvents;

/** 需要随快照同步给客机的事件（表现层依赖的全部） */
export const EVENT_KINDS: GameEventKind[] = [
  'announce',
  'tick',
  'serve',
  'hit',
  'block',
  'net',
  'jump',
  'dive',
  'swing',
  'land',
  'score',
  'setEnd',
  'matchEnd',
];

export function encodeSnapshot(w: World, q: number, ev: Array<[GameEventKind, unknown]>): Snap {
  const b = w.ball;
  return {
    q,
    ph: w.phase,
    pt: r3(w.phaseTimer),
    s: [w.scores[0], w.scores[1]],
    sw: [w.setsWon[0], w.setsWon[1]],
    si: w.setIndex,
    sv: w.serverId,
    stn: w.servingTeam,
    tc: [w.touches[0], w.touches[1]],
    ck: r3(w.clock),
    sl: r3(w.slowmoTimer),
    tu: w.timeUp ? 1 : 0,
    sd: w.suddenDeath ? 1 : 0,
    se: r3(w.serveElapsed),
    ti: r3(w.time),
    mw: w.matchWinner,
    b: {
      p: [r3(b.pos.x), r3(b.pos.y), r3(b.pos.z)],
      v: [r3(b.vel.x), r3(b.vel.y), r3(b.vel.z)],
      l: b.live ? 1 : 0,
      d: b.dead ? 1 : 0,
      h: b.heldBy,
      ht: b.lastHitTeam,
      hi: b.lastHitterId,
    },
    ps: w.players.map((p) => ({
      p: [r3(p.pos.x), r3(p.pos.y), r3(p.pos.z)],
      v: [r3(p.vel.x), r3(p.vel.y), r3(p.vel.z)],
      f: r3(p.facing),
      g: p.grounded ? 1 : 0,
      m: p.moving ? 1 : 0,
      b: p.blocking ? 1 : 0,
      spt: r3(p.sprintTimer),
      st: r3(p.stun),
      c: r3(p.charge),
      sa: r3(p.serveAim),
      a: p.anim,
      at: r3(p.animTimer),
      pt: p.stats.points,
    })),
    ev,
  };
}

/** 客机镜像：两帧快照插值回灌 World，渲染层无需感知联机 */
export class SnapshotMirror {
  /** 供 scene.sync 使用的插值系数 */
  alpha = 1;

  private prev: Snap | null = null;
  private curr: Snap | null = null;
  private tPrev = 0;
  private tCurr = 0;

  constructor(private readonly world: World) {}

  apply(s: Snap, now: number): void {
    this.prev = this.curr;
    this.tPrev = this.tCurr;
    this.curr = s;
    this.tCurr = now;
    if (!this.prev) {
      this.prev = s;
      this.tPrev = now;
    }
    // 事件随快照一次性触发（announce/score/hit/... 走 app 既有 wire）
    const ev = (s as { ev?: Snap['ev'] }).ev ?? [];
    for (const [k, payload] of ev) {
      (this.world.events as unknown as { emit: (k: string, p: unknown) => void }).emit(k, payload);
    }
  }

  update(now: number): void {
    const s = this.curr;
    if (!s || !this.prev) return;
    const span = Math.max(30, this.tCurr - this.tPrev);
    this.alpha = Math.min(1, Math.max(0, (now - this.tCurr) / span));

    const w = this.world;
    const p0 = this.prev;
    w.phase = s.ph as typeof w.phase;
    w.phaseTimer = s.pt;
    w.scores[0] = s.s[0];
    w.scores[1] = s.s[1];
    w.setsWon[0] = s.sw[0];
    w.setsWon[1] = s.sw[1];
    w.setIndex = s.si;
    w.serverId = s.sv;
    w.servingTeam = s.stn as typeof w.servingTeam;
    w.touches[0] = s.tc[0];
    w.touches[1] = s.tc[1];
    w.clock = s.ck;
    w.slowmoTimer = s.sl;
    w.timeUp = s.tu === 1;
    w.suddenDeath = s.sd === 1;
    w.serveElapsed = s.se;
    w.time = s.ti;
    w.matchWinner = s.mw as typeof w.matchWinner;

    const b = w.ball;
    b.pos.x = s.b.p[0];
    b.pos.y = s.b.p[1];
    b.pos.z = s.b.p[2];
    b.prev.x = p0.b.p[0];
    b.prev.y = p0.b.p[1];
    b.prev.z = p0.b.p[2];
    b.vel.x = s.b.v[0];
    b.vel.y = s.b.v[1];
    b.vel.z = s.b.v[2];
    b.live = s.b.l === 1;
    b.dead = s.b.d === 1;
    b.heldBy = s.b.h;
    b.lastHitTeam = s.b.ht as typeof b.lastHitTeam;
    b.lastHitterId = s.b.hi;

    for (let i = 0; i < s.ps.length && i < w.players.length; i++) {
      const sp = s.ps[i];
      const pp = p0.ps[i] ?? sp;
      const p = w.players[i];
      p.pos.x = sp.p[0];
      p.pos.y = sp.p[1];
      p.pos.z = sp.p[2];
      p.prev.x = pp.p[0];
      p.prev.y = pp.p[1];
      p.prev.z = pp.p[2];
      p.vel.x = sp.v[0];
      p.vel.y = sp.v[1];
      p.vel.z = sp.v[2];
      p.facing = sp.f;
      p.grounded = sp.g === 1;
      p.moving = sp.m === 1;
      p.blocking = sp.b === 1;
      p.sprintTimer = sp.spt;
      p.stun = sp.st;
      p.charge = sp.c;
      p.serveAim = sp.sa;
      p.anim = sp.a as typeof p.anim;
      p.animTimer = sp.at;
      p.stats.points = sp.pt;
    }
  }
}

/** 远程输入缓冲：房主侧暂存好友输入，边沿位只消费一次 */
export class RemoteInputBuf {
  private latest: ControlInput = emptyInput();
  private lastAt = 0;

  push(inp: ControlInput, now: number): void {
    this.latest = inp;
    this.lastAt = now;
  }

  /** 超过 1.5s 没有新包视为卡顿，返回空输入避免"幽灵持续移动" */
  take(now: number): ControlInput {
    if (now - this.lastAt > 1500) {
      this.latest = emptyInput();
      return emptyInput();
    }
    const out = { ...this.latest };
    this.latest.hit = false;
    this.latest.jump = false;
    this.latest.block = false;
    return out;
  }
}
