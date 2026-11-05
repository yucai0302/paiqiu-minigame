// 网前「二传」→ 队友冲刺 → 扣杀：iPhone 竖屏连续帧。
// 场景固定为“对面扣球进入己方半场 → 玩家在网前按二传”，与 tools/bench-netset.ts 同一构造，
// 保证截图和基准数据说的是同一件事。
// 前置：npm run build 已跑；npm run dev（5173）已启动。
// 用法：node tools/shot-netset-frames.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.TEMP + '/pptr/node_modules/puppeteer-core');

const BASE = 'http://localhost:5173/web/wx-test.html?dpr=3&safeBottom=34';
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
  await page.evaluate(() => window.__paiqiu.start('normal'));
  await page.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 30000 });

  await page.evaluate(() => {
    const app = window.__paiqiu;
    const w = app.world;
    const h = w.players.find((p) => p.isHuman);
    const mate = w.players.find((p) => p.team === 0 && !p.isHuman);
    const solve = (from, to, T) => ({
      x: (to.x - from.x) / T,
      y: (to.y - from.y) / T + 0.5 * 18 * T,
      z: (to.z - from.z) / T,
    });

    w.phase = 'rally';
    w.slowmoTimer = 0;
    const hx = -0.4;
    h.pos = { x: hx, y: 0, z: 2.0 };
    h.prev = { ...h.pos };
    mate.pos = { x: hx * 0.5, y: 0, z: 4.9 };
    mate.prev = { ...mate.pos };
    for (const q of w.players) {
      if (q.team !== 1) continue;
      q.pos = { x: q.id === 2 ? -2.6 : 2.6, y: 0, z: q.id === 2 ? -4.0 : -6.2 };
      q.prev = { ...q.pos };
    }
    const from = { x: hx * 0.5 - 0.3, y: 3.4, z: -1.1 };
    const to = { x: hx, y: 2.35, z: 2.35 };
    w.ball.live = true;
    w.ball.dead = false;
    w.ball.heldBy = null;
    w.ball.pos = { ...from };
    w.ball.prev = { ...from };
    w.ball.vel = solve(from, to, 0.5);
    w.ball.lastKind = 'attack';
    w.ball.lastHitTeam = 1;
    w.ball.lastHitterId = 2;
    w.touches = [0, 0];

    window.__events = [];
    window.__shotReq = null;
    window.__hudText = '';
    let pressed = false;
    let pressAt = -1;
    w.inputProvider = () => {
      const inp = {
        moveX: 0,
        moveZ: 0,
        sprint: false,
        jump: false,
        hit: false,
        hitHeld: false,
        block: false,
        blockHeld: false,
        setup: false,
        spike: false,
      };
      if (w.phase !== 'rally') return inp;
      // 拟人按键延迟：看到球出手后先反应 120ms 再按「二传」
      if (!pressed && w.ball.live && (w.ballInReach(h) || (w.ball.vel.z > 0.5 && w.ball.pos.z > -1.5))) {
        if (pressAt < 0) pressAt = w.time;
        if (w.time - pressAt >= 0.12) {
          pressed = true;
          inp.setup = true;
          w.slowmoTimer = 2.4;
        }
      }
      return inp;
    };
    // 冻结画面再截图：否则截图本身耗时 300~500ms（慢放后仍会推进 0.15~0.2s 模拟时间），
    // 连续帧会漂到下一拍，看起来就不像“二传→冲刺→扣杀”了。
    window.__frozen = false;
    window.__freeze = () => {
      if (app.state === 'playing') {
        app.state = 'paused';
        window.__frozen = true;
      }
    };
    window.__unfreeze = () => {
      if (app.state === 'paused') {
        app.state = 'playing';
        window.__frozen = false;
      }
    };
    w.events.on('hit', (e) => {
      window.__events.push({ kind: e.kind, pid: e.playerId, team: e.team, z: +e.z.toFixed(2) });
      if (e.team === 0 && e.playerId === 0 && e.kind === 'set') {
        window.__shotReq = 'chain1';
        window.__freeze();
      }
      if (e.team === 0 && e.playerId !== 0 && e.kind === 'attack') {
        window.__shotReq = 'chain3';
        // 扣球出手后 100ms 冻结：队友已离地、球刚离开手，画面上能看出是“扣”而不是“顶”
        setTimeout(() => window.__freeze(), 100);
      }
    });

    const hud = document.createElement('div');
    hud.style.cssText =
      'position:fixed;left:8px;top:8px;z-index:99;padding:6px 8px;border-radius:8px;' +
      'background:rgba(0,0,0,.62);color:#fff;font:12px/1.5 -apple-system,monospace;white-space:pre;pointer-events:none';
    document.body.appendChild(hud);
    setInterval(() => {
      if (app.state === 'result') {
        w.startMatch();
        w.slowmoTimer = 0;
        app.state = 'playing';
        app.screens.hide();
      }
      hud.textContent =
        (window.__hudText || '') +
        `\n玩家 z=${h.pos.z.toFixed(2)}  队友 z=${mate.pos.z.toFixed(2)} y=${mate.pos.y.toFixed(2)}` +
        `\n触球=${w.touches[0]}`;
    }, 40);

    window.__state = () => ({
      phase: w.phase,
      touches: w.touches.slice(),
      ball: { x: +w.ball.pos.x.toFixed(2), y: +w.ball.pos.y.toFixed(2), z: +w.ball.pos.z.toFixed(2) },
      humanZ: +h.pos.z.toFixed(2),
      mate: { x: +mate.pos.x.toFixed(2), z: +mate.pos.z.toFixed(2), y: +mate.pos.y.toFixed(2) },
      req: window.__shotReq,
      frozen: window.__frozen,
      events: window.__events.slice(),
    });
  });

  const shot = async (name) => {
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('shot:', name);
  };
  const st = () => page.evaluate(() => window.__state());
  const setHud = (t) => page.evaluate((tt) => (window.__hudText = tt), t);

  const freeze = () => page.evaluate(() => window.__freeze());
  const unfreeze = () => page.evaluate(() => window.__unfreeze());

  let chain1At = 0;
  let s1 = false;
  let s2 = false;
  let ok = false;
  const t0 = Date.now();
  while (Date.now() - t0 < 90000) {
    const s = await st();
    if (!s1 && s.frozen && s.req === 'chain1') {
      await setHud('①网前按「二传」：球高吊向队友的冲刺路径');
      await shot('netset-chain1');
      s1 = true;
      chain1At = Date.now();
      await unfreeze();
      await sleep(500);
      continue;
    }
    if (s1 && !s2 && Date.now() - chain1At >= 500) {
      await freeze();
      await setHud(`②队友从后场冲刺上前（z=${s.mate.z}）`);
      await shot('netset-chain2');
      s2 = true;
      await unfreeze();
      continue;
    }
    if (s.frozen && s.req === 'chain3') {
      await setHud('③队友冲上来扣杀，球飞向对方半场');
      await shot('netset-chain3');
      ok = true;
      await page.evaluate(() => (window.__paiqiu.world.slowmoTimer = 0));
      await unfreeze();
      break;
    }
    await sleep(50);
  }

  const final = await st();
  console.log('events:', JSON.stringify(final.events));
  console.log('RESULT', JSON.stringify({ s1, s2, s3: ok, errors }));
  await browser.close();
  process.exit(ok ? 0 : 1);
})();
