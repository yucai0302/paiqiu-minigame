/**
 * 网前「二传」去向分布测量。
 * 场景：对面扣球过来，玩家站在网前按「二传」，队友在后场。
 * 统计二传之后的出球去向：传队友（队友下一拍接/扣） / 过网 / 其他（落地或没碰到）。
 *
 * 口径：
 *   --bot=ideal   零延迟机器人（球一进触球范围立刻按）
 *   --bot=human   拟人机器人（进触球范围后 150~300ms 才按，含反应延迟与误判）
 *
 * 用法（minigame 目录）：
 *   npx esbuild tools/bench-netset.ts --bundle --format=esm --platform=node --outfile=.tmp/bnetset.mjs
 *   node .tmp/bnetset.mjs --samples=60 --bot=human --out=.tmp/netset-human.json
 */
import { createRng } from '../src/core/math';
import { World } from '../src/sim/world';
import { emptyInput } from '../src/sim/types';
import type { ControlInput } from '../src/sim/types';
import { BALL } from '../src/sim/config';

const STEP = 1 / 60;
const arg = (k: string, d: string) => {
  const a = process.argv.find((x) => x.startsWith(`--${k}=`));
  return a ? a.slice(k.length + 3) : d;
};
const SAMPLES = Number(arg('samples', '60'));
const BOT = arg('bot', 'human') as 'ideal' | 'human';
const OUT = arg('out', `.tmp/netset-${BOT}.json`);
const SKILLS = (arg('skills', 'easy,normal,hard')).split(',') as Array<'easy' | 'normal' | 'hard'>;

interface Sample {
  skill: string;
  outcome: 'mate' | 'over' | 'other';
  touchesAtSet: number;
  setZ: number | null;
  setX: number | null;
  allyZAtSet: number;
  allyZAtMate: number;
  allyShift: number;
  mateArriveGap: number | null;
  pressed: boolean;
  fallbacks: Record<string, number>;
}

function solve(from: { x: number; y: number; z: number }, to: { x: number; y: number; z: number }, T: number) {
  return {
    x: (to.x - from.x) / T,
    z: (to.z - from.z) / T,
    y: (to.y - from.y + 0.5 * BALL.gravity * T * T) / T,
  };
}

function sample(skill: 'easy' | 'normal' | 'hard', seed: number): Sample {
  const rng = createRng(seed);
  const w = new World({ teamSize: 2, skill, humanCount: 1, humanName: '你', seed });
  w.startMatch();
  w.phase = 'rally';
  const h = w.players[0];
  const ally = w.players[1];

  const hx = rng(-1.4, 1.4);
  h.pos = { x: hx, y: 0, z: 2.0 + rng(-0.6, 0.6) };
  h.prev = { ...h.pos };
  ally.pos = { x: hx * 0.5 + rng(-0.6, 0.6), y: 0, z: 4.4 + rng(0, 0.7) };
  ally.prev = { ...ally.pos };
  for (const q of w.players) {
    if (q.team !== 1) continue;
    q.pos = { x: q.id === 2 ? -1.7 : 1.7, y: 0, z: q.id === 2 ? -3.4 : -5.6 };
    q.prev = { ...q.pos };
  }

  // 对面扣球：从对面半场飞向玩家身前
  const from = { x: hx * 0.5 - 0.4, y: 3.4, z: -1.1 };
  const to = { x: hx + rng(-0.35, 0.35), y: 2.3, z: h.pos.z + rng(0.0, 0.5) };
  const T = 0.5;
  w.ball.live = true;
  w.ball.dead = false;
  w.ball.heldBy = null;
  w.ball.pos = { ...from };
  w.ball.prev = { ...from };
  w.ball.vel = solve(from, to, T);
  w.ball.lastKind = 'attack';
  w.ball.lastHitTeam = 1;
  w.ball.lastHitterId = 2;
  w.touches = [0, 0];

  let pressed = false;
  let pressDelay = BOT === 'ideal' ? 0 : rng(0.15, 0.3);
  let pressAt = -1;
  let touchAt = -1;
  let touchesAtSet = 0;
  let setZ: number | null = null;
  let setX: number | null = null;
  let allyZAtSet = 0;
  let allyZAtMate = 0;
  let crossesAfter = false;
  let mateAfter = false;
  let setPending = false;
  let landed = false;
  let allyShift = 0;
  let mateArriveGap: number | null = null;
  let landPredAfterSet: { x: number; z: number } | null = null;
  let mateHitAfterSet = false;

  w.events.on('hit', (e) => {
    if (e.playerId === h.id && !setPending) {
      setPending = true;
      touchAt = w.time;
      touchesAtSet = e.combo;
      setZ = e.z;
      setX = e.x;
      allyZAtSet = Math.abs(ally.pos.z);
      landPredAfterSet = w.predictLanding();
    } else if (setPending && e.playerId !== h.id && !mateHitAfterSet) {
      mateHitAfterSet = true;
      mateAfter = true;
      allyZAtMate = Math.abs(ally.pos.z);
      allyShift = Math.abs(allyZAtSet - allyZAtMate);
      if (landPredAfterSet) {
        mateArriveGap = Math.hypot(ally.pos.x - landPredAfterSet.x, ally.pos.z - landPredAfterSet.z);
      }
    }
  });
  w.events.on('land', () => {
    landed = true;
  });

  const start = w.time;
  const TRACE = process.argv.includes('--trace');
  for (let i = 0; i < 260; i++) {
    const inp: ControlInput = emptyInput();
    if (!pressed && w.ball.live) {
      // 真人看球出手就准备按「二传」（球还没进触球范围），按下后再吃 150~300ms 反应延迟
      const comingToMe = w.ball.vel.z > 0.5 && w.ball.pos.z > -2.0;
      const inReach = w.ballInReach(h);
      if (inReach || comingToMe) {
        if (pressAt < 0) pressAt = w.time;
      }
      if (pressAt >= 0 && w.time - pressAt >= pressDelay) {
        pressed = true;
        inp.setup = true;
      }
    }
    w.inputProvider = () => inp;
    const prevZ = w.ball.pos.z;
    w.step(STEP);
    if (TRACE && i % 3 === 0) {
      console.log(
        `i${i} t=${(w.time - start).toFixed(2)} ball=(${w.ball.pos.x.toFixed(2)},${w.ball.pos.y.toFixed(2)},${w.ball.pos.z.toFixed(2)}) live=${w.ball.live} reach=${w.ballInReach(h)} h=(${h.pos.x.toFixed(2)},${h.pos.z.toFixed(2)}) cd=${h.hitCd.toFixed(2)} setupBuf=${h.setupBuffer.toFixed(2)} pressed=${pressed}`,
      );
    }
    if (setPending && prevZ > 0 && w.ball.pos.z <= 0) crossesAfter = true;
    if (setPending && landed) break;
    if (!setPending && w.ball.landed) break;
    if (w.time - start > 4.2) break;
  }

  void touchAt;
  const outcome: Sample['outcome'] = !setPending ? 'other' : mateAfter ? 'mate' : crossesAfter ? 'over' : 'other';
  return {
    skill,
    outcome,
    touchesAtSet,
    setZ,
    setX,
    allyZAtSet,
    allyZAtMate,
    allyShift,
    mateArriveGap,
    pressed,
    fallbacks: { ...w.setFallbacks },
  };
}

const rows: Array<Record<string, unknown>> = [];
const all: Sample[] = [];
for (const skill of SKILLS) {
  const list: Sample[] = [];
  for (let s = 0; s < SAMPLES; s++) list.push(sample(skill, s * 7919 + 13));
  all.push(...list);
  const n = list.length;
  const mate = list.filter((x) => x.outcome === 'mate').length;
  const over = list.filter((x) => x.outcome === 'over').length;
  const other = n - mate - over;
  const shifts = list.filter((x) => x.outcome === 'mate').map((x) => x.allyShift);
  const gaps = list.filter((x) => x.mateArriveGap !== null).map((x) => x.mateArriveGap as number);
  const avg = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
  rows.push({
    skill,
    n,
    mate: `${((mate / n) * 100).toFixed(1)}%`,
    over: `${((over / n) * 100).toFixed(1)}%`,
    other: `${((other / n) * 100).toFixed(1)}%`,
    allySprintAvgM: avg(shifts).toFixed(2),
    mateArriveGapAvgM: avg(gaps).toFixed(2),
  });
}
const fb = { noMate: 0, touchesExhausted: 0, noReach: 0 };
for (const s of all) for (const k of Object.keys(fb) as Array<keyof typeof fb>) fb[k] += s.fallbacks[k] ?? 0;

console.log(`\n== 网前二传去向分布（bot=${BOT}, samples=${SAMPLES}/档）==`);
console.table(rows);
console.log('二传兜底触发计数', fb);
const fs = await import('node:fs/promises');
await fs.mkdir('.tmp', { recursive: true }).catch(() => undefined);
await fs.writeFile(OUT, JSON.stringify({ bot: BOT, samples: SAMPLES, rows, fallbacks: fb, detail: all }, null, 2));
