/**
 * 拦网成功率测量：固定一次对手扣球的过网点（x / y / 过网时刻），
 * 让真人/拟人拦网手按不同“起跳提前量”起跳，统计拦网成功与失败原因。
 * 用法（minigame 目录）：
 *   npx esbuild tools/bench-block.ts --bundle --format=esm --platform=node --outfile=.tmp/bblock.mjs
 *   node .tmp/bblock.mjs --out=.tmp/block.json [--samples=12]
 */
import { createRng } from '../src/core/math';
import { World } from '../src/sim/world';
import { emptyInput } from '../src/sim/types';
import type { ControlInput } from '../src/sim/types';

const STEP = 1 / 60;
const SAMPLES_ARG = process.argv.find((a) => a.startsWith('--samples='));
const SAMPLES = SAMPLES_ARG ? Number(SAMPLES_ARG.slice('--samples='.length)) : 12;

/** 真人的横向偏差模型：越早起跳 = 越早“押”扣球线路，偏差越大
 *  σ(lead) = 0.55 + 0.9×lead（0.1s→0.64m，0.5s→1.0m，0.7s→1.18m），截断 ±2.4m
 *  依据：真人拦网时是“盯主攻肩线 → 横移 → 起跳”，提前量越大越依赖预判 */
function lateralError(rng: (a: number, b: number) => number, lead: number): number {
  let e = 0;
  for (let i = 0; i < 3; i++) e += rng(-1, 1);
  const sigma = 0.55 + 0.9 * lead;
  return Math.max(-2.4, Math.min(2.4, e * sigma));
}

interface TrialOpts {
  lead: number;
  lateral: number;
  /** 是否允许“贴网补跳”（起跳加速） */
  lateHop: boolean;
  /** 拦网面水平半宽 */
  halfWOverride: number | null;
  /** 按下拦网时按预测过网 x 自动微对齐（米，0 = 关闭） */
  autoAlign: number;
  /** true = 旧版拦网参数（0.78m / 无对齐 / 无补跳） */
  legacy?: boolean;
  /** 关闭自动接球，隔离拦网本身 */
  noDig?: boolean;
}

interface TrialResult {
  ok: boolean;
  reason: 'block' | 'lateral' | 'notAirborne' | 'height' | 'other';
  crossT: number;
  crossX: number;
  crossY: number;
  playerX: number;
  detail?: string;
}

function runTrial(o: TrialOpts, seed: number, skill: 'easy' | 'normal' | 'hard' = 'normal'): TrialResult {
  const rng = createRng(seed);
  const w = new World({ teamSize: 2, skill, humanCount: 1, humanName: '你', seed });
  w.startMatch();
  w.phase = 'rally';
  const h = w.players[0];
  const ally = w.players[1];

  // 对手扣球：从对面 3.2m 外飞过来，过网点高 2.5~3.1m（正常扣球高度，不降速不降高）
  const crossYTarget = 2.5 + rng(0, 0.6);
  const from = { x: 0.2, y: 3.6, z: -3.2 };
  const T0 = 0.72;
  const target = { x: 1.2, y: crossYTarget, z: 0 };
  const vel = {
    x: (target.x - from.x) / T0,
    y: (target.y - from.y + 0.5 * 18 * T0 * T0) / T0,
    z: (target.z - from.z) / T0,
  };
  w.ball.live = true;
  w.ball.dead = false;
  w.ball.heldBy = null;
  w.ball.pos = { ...from };
  w.ball.prev = { ...w.ball.pos };
  w.ball.vel = vel;
  w.ball.lastKind = 'attack';
  w.ball.lastHitTeam = 1;
  w.ball.lastHitterId = 2;
  w.touches = [0, 0];
  if (o.legacy) {
    w.blockHalfW = 0.78;
    w.blockAlignMax = 0;
    w.blockFastRise = false;
  }
  if (process.argv.includes('--nolate')) w.blockFastRise = false;
  // 逐项归因：0.78m 宽度配合自动微对齐 / 0.92m 宽度但不微对齐，各跑一遍
  if (process.argv.includes('--noalign')) w.blockAlignMax = 0;
  if (process.argv.includes('--w078')) w.blockHalfW = 0.78;
  if (o.noDig) w.autoDigOn = false;

  const cross = w.predictNetCrossing();
  if (!cross) return { ok: false, reason: 'other', crossT: 0, crossX: 0, crossY: 0, playerX: 0 };
  h.pos = { x: cross.x + o.lateral, y: 0, z: 1.15 };
  h.prev = { ...h.pos };
  ally.pos = { x: 2.1, y: 0, z: 5.2 };
  ally.prev = { ...ally.pos };
  // 把对手挪远：避免 AI 对手在对面接自己这一拍、抢走测试球
  for (const q of w.players) {
    if (q.team !== 1) continue;
    q.pos = { x: q.id === 2 ? -3.4 : 3.4, y: 0, z: -7.4 };
    q.prev = { ...q.pos };
  }

  let pressed = false;
  let aligned = false;
  let jumpAt = -1;
  let blocked = false;
  let airborneAtCross = false;
  let crossT = 0;
  let crossX = 0;
  let crossY = 0;
  let lastZ = w.ball.pos.z;
  let lastY = w.ball.pos.y;
  let lastX = w.ball.pos.x;
  w.events.on('block', () => {
    blocked = true;
  });

  const start = w.time;
  for (let i = 0; i < 180; i++) {
    const inp: ControlInput = emptyInput();
    const b = w.ball;
    const c = w.predictNetCrossing();
    const remaining = c ? c.t : 99;
    if (!pressed && remaining <= o.lead && b.live) {
      pressed = true;
      jumpAt = w.time;
      inp.block = true;
      inp.blockHeld = true;
      if (o.autoAlign > 0 && c) {
        const dx = Math.max(-o.autoAlign, Math.min(o.autoAlign, c.x - h.pos.x));
        h.pos.x += dx;
        aligned = true;
      }
    }
    w.inputProvider = () => inp;
    w.step(STEP);
    if (b.live && ((lastZ > 0 && b.pos.z <= 0) || (lastZ < 0 && b.pos.z >= 0)) && crossT === 0) {
      const k = lastZ / (lastZ - b.pos.z);
      crossX = lastX + (b.pos.x - lastX) * k;
      crossY = lastY + (b.pos.y - lastY) * k;
      crossT = w.time - start;
      airborneAtCross = !h.grounded;
    }
    lastZ = b.pos.z;
    lastY = b.pos.y;
    lastX = b.pos.x;
    if (blocked || !b.live) break;
  }

  if (blocked) return { ok: true, reason: 'block', crossT, crossX, crossY, playerX: h.pos.x };
  if (o.lateHop) {
    // no-op: 该开关只影响 world 内部起跳速度
  }
  let reason: TrialResult['reason'] = !airborneAtCross ? 'notAirborne' : 'lateral';
  let detail = '';
  if (airborneAtCross) {
    const dx = Math.abs(h.pos.x - crossX);
    const minY = h.pos.y + 0.65;
    const maxY = h.pos.y + 2.45;
    if (crossY < minY || crossY > maxY) reason = 'height';
    detail = `dx=${dx.toFixed(2)} py=${h.pos.y.toFixed(2)} faceY=${minY.toFixed(2)}~${maxY.toFixed(2)} crossY=${crossY.toFixed(2)} pz=${h.pos.z.toFixed(2)}`;
  }
  void aligned;
  void jumpAt;
  void o.halfWOverride;
  return { ok: false, reason, crossT, crossX, crossY, playerX: h.pos.x, detail };
}

const leads = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8];
const out: Array<Record<string, unknown>> = [];
const LEGACY = process.argv.includes('--legacy');
const NO_DIG = process.argv.includes('--nodig');

for (const lead of leads) {
  let ok = 0;
  let lateral = 0;
  let notAir = 0;
  let height = 0;
  for (let s = 0; s < SAMPLES; s++) {
    const r = runTrial(
      {
        lead,
        lateral: lateralError(createRng(s * 977 + 1), lead),
        lateHop: false,
        halfWOverride: null,
        autoAlign: 0,
        legacy: LEGACY,
        noDig: NO_DIG,
      },
      s * 31 + 5,
    );
    if (r.ok) ok++;
    else if (r.reason === 'notAirborne') notAir++;
    else if (r.reason === 'height') height++;
    else lateral++;
  }
  // 正对主攻（横向 0 误差）的成功率
  let ok0 = 0;
  for (let s = 0; s < SAMPLES; s++) {
    const r = runTrial(
      { lead, lateral: 0, lateHop: false, halfWOverride: null, autoAlign: 0, legacy: LEGACY, noDig: NO_DIG },
      s * 31 + 5,
    );
    if (r.ok) ok0++;
  }
  out.push({
    lead,
    humanOk: (ok / SAMPLES * 100).toFixed(0) + '%',
    alignedOk: (ok0 / SAMPLES * 100).toFixed(0) + '%',
    lateralFail: lateral,
    heightFail: height,
    notAirFail: notAir,
  });
}

console.log(JSON.stringify({ samples: SAMPLES, rows: out }, null, 2));
// 横向偏差敏感度：固定起跳提前量 0.35s，看 ±0.4~2.4m 的偏差能否拦到
if (process.argv.includes('--grid')) {
  const lat = [0, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 2.0, 2.4];
  const grid: Array<Record<string, unknown>> = [];
  const N = 10;
  for (const e of lat) {
    const rate = (legacy: boolean) => {
      let n = 0;
      for (let s = 0; s < N; s++) {
        const r = runTrial(
          { lead: 0.35, lateral: e, lateHop: false, halfWOverride: null, autoAlign: 0, legacy },
          s * 41 + 3,
        );
        if (r.ok) n++;
      }
      return `${((n / N) * 100).toFixed(0)}%`;
    };
    grid.push({ lateralErr: e, legacy: rate(true), now: rate(false) });
  }
  console.table(grid);
}
if (process.argv.includes('--debug')) {
  for (let s = 0; s < 16; s++) {
    const r = runTrial({ lead: 0.2, lateral: 0, lateHop: false, halfWOverride: null, autoAlign: 0 }, s * 31 + 5);
    console.log(`seed${s} ok=${r.ok} ${r.reason} crossX=${r.crossX.toFixed(2)} ${r.detail ?? ''}`);
  }
}
if (process.argv.includes('--trace')) {
  const w = new World({ teamSize: 2, skill: 'normal', humanCount: 1, humanName: '你', seed: 8 });
  w.startMatch();
  w.phase = 'rally';
  const h = w.players[0];
  const y0 = 3.7;
  const vz = 6.0;
  const z0 = -4.2;
  const T0 = 4.2 / vz;
  const cy = 2.6;
  const vy = (cy - y0 + 0.5 * 18 * T0 * T0) / T0;
  w.ball.live = true;
  w.ball.pos = { x: 0.6, y: y0, z: z0 };
  w.ball.prev = { ...w.ball.pos };
  w.ball.vel = { x: 0.9, y: vy, z: vz };
  w.ball.lastKind = 'attack';
  w.ball.lastHitTeam = 1;
  const c0 = w.predictNetCrossing();
  console.log('predicted cross', c0);
  h.pos = { x: (c0?.x ?? 0) + 0, y: 0, z: 1.15 };
  let pressed = false;
  for (let i = 0; i < 60; i++) {
    const inp: ControlInput = emptyInput();
    const c = w.predictNetCrossing();
    if (!pressed && c && c.t <= 0.2) {
      pressed = true;
      inp.block = true;
      inp.blockHeld = true;
    }
    w.inputProvider = () => inp;
    w.step(STEP);
    if (i % 4 === 0 || pressed) {
      console.log(
        `i${i} t=${w.time.toFixed(2)} ball=(${w.ball.pos.x.toFixed(2)},${w.ball.pos.y.toFixed(2)},${w.ball.pos.z.toFixed(2)}) p=(y${h.pos.y.toFixed(2)},z${h.pos.z.toFixed(2)} grounded=${h.grounded} cd=${h.blockCd.toFixed(2)} blocking=${h.blocking}) pred=${c ? c.t.toFixed(2) : '-'}`,
      );
    }
    if (!w.ball.live) break;
  }
}
const fs = await import('node:fs/promises');
await fs.mkdir('.tmp', { recursive: true }).catch(() => undefined);
const argOut = process.argv.find((a) => a.startsWith('--out='));
const outPath = argOut ? argOut.slice('--out='.length) : '.tmp/block.json';
await fs.writeFile(outPath, JSON.stringify({ samples: SAMPLES, rows: out }, null, 2));
console.table(out);
