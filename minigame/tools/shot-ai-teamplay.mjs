// 浏览器调试页（iPhone 竖屏）跑一局人机，抓取两条配合链路的连续帧。
// 前置：npm run build 已跑；npm run dev（5173）已启动。
// 用法：node tools/shot-ai-teamplay.mjs [skill]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.TEMP + '/pptr/node_modules/puppeteer-core');

const SKILL = process.argv[2] || 'normal';
const BASE = `http://localhost:5173/web/wx-test.html?dpr=3&safeBottom=34`;
const OUT = 'd:/Project/paiqiu-xcx/docs/screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const launch = () =>
  puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader-webgl'],
    defaultViewport: { width: 390, height: 844, deviceScaleFactor: 3 },
    protocolTimeout: 300000,
  });

(async () => {
  const browser = await launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__paiqiu && window.__paiqiu.world, { timeout: 30000 });
  await page.evaluate((skill) => window.__paiqiu.start(skill), SKILL);
  await page.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 30000 });

  // 在页面内装入「中等真人」脚本 + 链路探测器（只看不改判定）
  await page.evaluate(() => {
    const app = window.__paiqiu;
    const w = app.world;
    const human = w.players.find((p) => p.isHuman);
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const slotPos = (team, slot) => {
      const f = [
        [-1.9, 3.1],
        [1.9, 5.8],
      ];
      const s = f[Math.min(slot, 1)];
      return { x: s[0], z: team === 0 ? s[1] : -s[1] };
    };
    const bot = {
      timer: 0,
      target: null,
      servePower: 0.7,
      read(p, dt) {
        const inp = {
          moveX: 0,
          moveZ: 0,
          sprint: false,
          jump: false,
          hit: false,
          hitHeld: false,
          block: false,
          blockHeld: false,
        };
        if (w.phase === 'serve') {
          if (p.id === w.serverId) {
            if (p.charge >= this.servePower) this.servePower = 0.7;
            inp.hitHeld = p.charge < this.servePower;
          } else {
            const s = slotPos(p.team, p.slot);
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
          this.update(p, landing);
        }
        if (this.target) this.move(p, inp, this.target.x, this.target.z);

        const touches = w.touches[p.team];
        const plan = w.attackPlan[p.team];
        const attacker = plan.attackerId === null || plan.attackerId === p.id;
        const hd = Math.hypot(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);
        const canHit = w.ballInReach(p);

        let want = true;
        if (touches === 1) want = plan.setterId === p.id || ball.pos.y < 1.05;
        else if (touches >= 2) want = attacker || (ball.pos.y < 1.2 && hd < 1.0);

        if (touches >= 2 && attacker && p.grounded && hd < 2.0) {
          const tt = w.ballTimeToHeight(p.pos.y + 2.15);
          if (tt !== null && tt <= 0.35 && tt > 0.02) inp.jump = true;
        }
        inp.hit = (canHit && want) || w.attackWindow(p);
        return inp;
      },
      update(p, landing) {
        const sign = p.team === 0 ? 1 : -1;
        const slot = slotPos(p.team, p.slot);
        const touches = w.touches[p.team];
        const plan = w.attackPlan[p.team];
        const incoming = landing !== null && Math.sign(landing.z) === sign;

        if (touches === 1 && plan.attackerId === p.id && plan.setterId !== p.id) {
          const zone = w.attackZone(p.team);
          this.target = { x: zone.x, z: zone.z };
          return;
        }
        if (incoming && landing.t < 2.0 && (touches < 2 || plan.attackerId === p.id)) {
          this.target = {
            x: clamp(landing.x, -4, 4),
            z: clamp(landing.z, sign > 0 ? 0.6 : -8.2, sign > 0 ? 8.2 : -0.6),
          };
          return;
        }
        this.target = { x: slot.x, z: slot.z };
      },
      move(p, inp, x, z) {
        const dx = x - p.pos.x;
        const dz = z - p.pos.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.24) return;
        inp.moveX = dx / d;
        inp.moveZ = dz / d;
        if (d > 2.6 && p.sprintCd <= 0 && p.grounded) inp.sprint = true;
      },
    };
    w.inputProvider = () => bot.read(human, 1 / 60);

    // ---- 链路探测（只记录事件，不改逻辑） ----
    const log = [];
    window.__log = log;
    window.__shotReq = null;
    window.__rallyLog = [];
    let prev = null;
    w.events.on('serve', () => {
      window.__rallyLog = [];
    });
    w.events.on('hit', (e) => {
      const snap = {
        kind: e.kind,
        pid: e.playerId,
        team: e.team,
        ballY: +w.ball.pos.y.toFixed(2),
        touches: [w.touches[0], w.touches[1]],
      };
      log.push(snap);
      window.__rallyLog.push({ kind: e.kind, pid: e.playerId, team: e.team });
      // 队友二传 → 玩家扣杀：在「队友 set」这一拍就开慢动作，方便连拍
      if (e.team === 0 && e.playerId !== 0 && e.kind === 'set' && !window.__c1shot) {
        window.__c1shot = true;
        window.__shotReq = 'chain1';
        w.slowmoTimer = 4;
      }
      // 玩家二传 → 队友扣杀
      if (e.team === 0 && e.playerId === 0 && e.kind === 'set' && !window.__c2shot) {
        window.__c2shot = true;
        window.__shotReq = 'chain2';
        w.slowmoTimer = 4;
      }
      prev = snap;
    });
    w.events.on('land', (e) => {
      log.push({ kind: 'land', winner: e.winner });
      window.__rallyLog.push({ kind: 'land', winner: e.winner });
      window.__lastLand = e.winner;
    });
  });

  const state = () =>
    page.evaluate(() => {
      const w = window.__paiqiu.world;
      const h = w.players.find((p) => p.isHuman);
      const mate = w.players.find((p) => p.team === 0 && !p.isHuman);
      return {
        phase: w.phase,
        touches: [w.touches[0], w.touches[1]],
        scores: w.scores,
        ball: { x: +w.ball.pos.x.toFixed(2), y: +w.ball.pos.y.toFixed(2), z: +w.ball.pos.z.toFixed(2) },
        humanY: +h.pos.y.toFixed(2),
        mateY: +mate.pos.y.toFixed(2),
        mateZ: +mate.pos.z.toFixed(2),
        lastLand: window.__lastLand ?? null,
      };
    });

  const shot = async (name) => {
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('shot:', name);
  };

  let picks = 0;
  let done1 = false;
  let done2 = false;
  const started = Date.now();
  while (Date.now() - started < 300000 && (!done1 || !done2)) {
    const req = await page.evaluate(() => {
      const r = window.__shotReq;
      window.__shotReq = null;
      return r;
    });
    if (!req) {
      await sleep(120);
      continue;
    }
    picks++;
    const tag = req;
    // 连拍四帧：二传出球 → 起跳扣杀 → 扣球过网 → 落地得分
    const frames = [];
    for (let i = 0; i < 4; i++) {
      if (i > 0) await sleep(i === 1 ? 500 : i === 2 ? 700 : 900);
      frames.push(await state());
      await shot(`${tag}-${i + 1}`);
    }
    console.log(tag, 'frames:', JSON.stringify(frames));
    await page.evaluate(() => {
      window.__paiqiu.world.slowmoTimer = 0;
    });

    // 等这一回合落地，只有「配合链路 + 本方得分」同时成立才采纳这组截图
    let rally = await page.evaluate(() => window.__rallyLog || []);
    const tWait = Date.now();
    while (!rally.some((e) => e.kind === 'land') && Date.now() - tWait < 8000) {
      await sleep(200);
      rally = await page.evaluate(() => window.__rallyLog || []);
      if (rally.length === 0) break;
    }
    const land = rally.find((e) => e.kind === 'land');
    let ok = false;
    for (let i = 1; i < rally.length; i++) {
      const a = rally[i - 1];
      const b = rally[i];
      if (a.team !== 0 || b.team !== 0) continue;
      if (tag === 'chain1' && a.pid !== 0 && b.pid === 0 && a.kind === 'set' && b.kind === 'attack') ok = true;
      if (tag === 'chain2' && a.pid === 0 && b.pid !== 0 && a.kind === 'set' && b.kind === 'attack') ok = true;
    }
    const scored = !!land && land.winner === 0;
    console.log(tag, 'chain ok:', ok, 'scored:', scored, 'rally:', JSON.stringify(rally));
    if (ok && scored) {
      if (tag === 'chain1') done1 = true;
      if (tag === 'chain2') done2 = true;
    } else {
      // 这组截图没得分，放开标记让下一回合重拍
      await page.evaluate((t) => {
        if (t === 'chain1') window.__c1shot = false;
        else window.__c2shot = false;
      }, tag);
    }
    if (picks >= 12) break;
  }

  const log = await page.evaluate(() => window.__log.slice(-40));
  console.log('events:', JSON.stringify(log));
  console.log('chains:', JSON.stringify({ chain1: done1, chain2: done2 }));
  console.log('errors:', JSON.stringify(errors));
  await browser.close();
  process.exit(done1 && done2 ? 0 : 1);
})();
