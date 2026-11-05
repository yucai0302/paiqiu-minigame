/* 临时诊断：网前按「二传」到底走了哪条出球分支 */
import { World } from '../src/sim/world';
import type { ControlInput } from '../src/sim/types';
import { emptyInput } from '../src/sim/types';

const STEP = 1 / 60;

function run(label: string, touches: 0 | 1 | 2, humanZ: number, pressAt: 'reach' | 'cross') {
  const w = new World({ teamSize: 2, skill: 'normal', humanCount: 1, humanName: '你', seed: 7 });
  w.startMatch();
  w.phase = 'rally';
  const h = w.players[0];
  const ally = w.players[1];
  h.pos = { x: 0, y: 0, z: humanZ };
  h.prev = { ...h.pos };
  ally.pos = { x: 1.6, y: 0, z: 4.6 };
  ally.prev = { ...ally.pos };
  w.ball.live = true;
  w.ball.dead = false;
  w.ball.heldBy = null;
  w.ball.pos = { x: 0.3, y: 3.1, z: -1.4 };
  w.ball.prev = { ...w.ball.pos };
  w.ball.vel = { x: 0.4, y: -1.4, z: 3.4 };
  w.ball.lastKind = 'attack';
  w.ball.lastHitTeam = 1;
  w.ball.lastHitterId = 2;
  w.touches = [touches, 2];
  w.lastAttackTime = [-1, -1];

  let pressed = false;
  let pressAtT = 99;
  const hits: string[] = [];
  let crossZ: number | null = null;
  let startZ = 0;
  let landZ: number | null = null;
  w.events.on('hit', (e) => {
    const pl = w.players.map((p) => `p${p.id}(${p.pos.x.toFixed(1)},${p.pos.y.toFixed(1)},${p.pos.z.toFixed(1)})`).join(' ');
    hits.push(
      `t=${w.time.toFixed(2)} p${e.playerId} ${e.kind} touches=${e.combo} ball=(${e.x.toFixed(2)},${e.y.toFixed(2)},${e.z.toFixed(2)}) | ${pl}`,
    );
  });
  w.events.on('land', (e) => {
    landZ = e.z;
    hits.push(`LAND z=${e.z.toFixed(2)} winner=${e.winner} in=${e.inBounds}`);
  });

  for (let i = 0; i < 220; i++) {
    const inp: ControlInput = emptyInput();
    const b = w.ball;
    if (!pressed) {
      const canReach = w.ballInReach(h);
      const willCross = b.pos.z > -0.2;
      if ((pressAt === 'reach' && canReach) || (pressAt === 'cross' && willCross)) {
        pressed = true;
        pressAtT = w.time;
        inp.setup = true;
      }
    }
    w.inputProvider = () => inp;
    const prevZ = w.ball.pos.z;
    w.step(STEP);
    if (crossZ === null && prevZ > 0 && w.ball.pos.z <= 0) {
      crossZ = w.ball.pos.z;
      hits.push(`CROSSED-NET at t=${w.time.toFixed(2)} y=${w.ball.pos.y.toFixed(2)}`);
    }
    if (i === 0) startZ = w.ball.pos.z;
  }
  console.log(`\n[${label}] touches=${touches} humanZ=${humanZ} press=${pressAt} pressAtT=${pressAtT.toFixed(2)}`);
  for (const s of hits) console.log('  ' + s);
  console.log(`  started z=${startZ.toFixed(2)} crossedNet=${crossZ !== null} landZ=${landZ === null ? 'live' : landZ.toFixed(2)}`);
  console.log(`  fallbacks=${JSON.stringify(w.setFallbacks)} quickAttack=${JSON.stringify(w.quickAttack)}`);
}

run('A 第一拍(0) 二传', 0, 2.2, 'reach');
run('B 第一拍(0) 二传', 0, 2.2, 'cross');
run('C 第二拍(1) 二传', 1, 2.2, 'reach');
run('D 第二拍(1) 二传', 1, 2.2, 'cross');
run('E 第三拍(2) 二传', 2, 2.2, 'reach');
run('F 第二拍(1) 二传 站更深 3.4', 1, 3.4, 'reach');
