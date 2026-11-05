// 第四轮需求截图（iPhone 竖屏）：前后排分工 + 跑到即自动接扣杀
//   ① roles-ally-backcourt    玩家在网前时，AI 队友站在后场
//   ② roles-set-forward       队友上前补第二拍（二传）
//   ③ roles-set-retreat       传完立即回撤（与②对比 z 坐标）
//   ④ roles-backcourt-dig     对面扣球，后场队友把球救起
//   ⑤ auto-dig-before / after 玩家跑到位但没按键，球被自动起球（连续两帧）
//   ⑥ auto-out-no-touch       界外球从玩家身边落地，自动系统没有碰球
// 前置：npm run build 已跑、dev server(5173) 已启动。
// 用法：node tools/shot-roles.mjs
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
  await page.evaluate(() => window.__paiqiu.start('easy'));
  await page.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 30000 });

  await page.evaluate(() => {
    const app = window.__paiqiu;
    const w = app.world;
    const human = w.players.find((p) => p.isHuman);
    const ally = w.players.find((p) => !p.isHuman && p.team === 0);

    window.__target = { x: 0, z: 1.6 };
    window.__log = [];
    window.__hudText = '';

    const go = (p, inp, x, z) => {
      const dx = x - p.pos.x;
      const dz = z - p.pos.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.2) return;
      inp.moveX = dx / d;
      inp.moveZ = dz / d;
      if (d > 2.4 && p.sprintCd <= 0 && p.grounded) inp.sprint = true;
    };

    // 只跑位、永远不按击球键：让自动接扣杀承担起球
    const bot = {
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
          spike: false,
          setup: false,
        };
        if (w.phase === 'serve') {
          if (p.id === w.serverId) inp.hitHeld = p.charge < 0.75;
          else go(p, inp, 0, 3.6);
          return inp;
        }
        if (w.phase !== 'rally') return inp;
        go(p, inp, window.__target.x, window.__target.z);
        return inp;
      },
    };
    w.inputProvider = () => bot.read(human, 1 / 60);

    window.__freezeMode = '';
    window.__frozen = false;
    window.__freezeNow = () => {
      if (app.state !== 'playing') return;
      app.state = 'paused';
      window.__frozen = true;
    };
    window.__unfreeze = () => {
      window.__frozen = false;
      app.state = 'playing';
    };

    w.events.on('hit', (e) => {
      const last = window.__log.filter((x) => x.t === 'hit').slice(-1)[0];
      window.__log.push({
        t: 'hit',
        kind: e.kind,
        pid: e.playerId,
        team: e.team,
        auto: !!e.auto,
        afterAttack: !!(last && last.kind === 'attack' && last.team !== e.team),
      });
      // ④ 队友后场救球：注入扣球后用 armed 标记，谁先把球救起就冻结
      if (
        window.__freezeMode === 'dig' &&
        window.__digArmed &&
        e.team === 0 &&
        e.playerId === 1
      ) {
        window.__digArmed = false;
        window.__freezeNow();
      }
      // ⑤ 自动接扣杀：玩家没有按键
      if (window.__freezeMode === 'auto' && e.playerId === 0 && e.auto) window.__freezeNow();
    });
    w.events.on('serve', () => window.__log.push({ t: 'serve' }));
    w.events.on('land', (e) => {
      window.__log.push({ t: 'land', winner: e.winner, inBounds: e.inBounds });
      // ⑥ 界外球落地：冻结在落地这一帧，证明没有人碰过它
      if (window.__freezeMode === 'out' && !e.inBounds) window.__freezeNow();
    });

    // 角标：直接显示两人的 z 坐标与自动接球次数，便于对比截图
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
        window.__frozen = false;
      }
      hud.textContent =
        `${window.__hudText}\n` +
        `玩家 z=${human.pos.z.toFixed(2)}  队友 z=${ally.pos.z.toFixed(2)}\n` +
        `自动接扣杀 ${w.autoDigs} 次  球=(${w.ball.pos.x.toFixed(1)},${w.ball.pos.y.toFixed(1)},${w.ball.pos.z.toFixed(1)})`;
    }, 40);

    window.__state = () => ({
      phase: w.phase,
      scores: w.scores.slice(),
      playerZ: +human.pos.z.toFixed(2),
      allyZ: +ally.pos.z.toFixed(2),
      touches: w.touches.slice(),
      autoDigs: w.autoDigs,
      ball: {
        x: +w.ball.pos.x.toFixed(2),
        y: +w.ball.pos.y.toFixed(2),
        z: +w.ball.pos.z.toFixed(2),
        live: w.ball.live,
        dead: w.ball.dead,
      },
      log: window.__log.slice(),
    });
    window.__setHud = (t) => (window.__hudText = t);
    window.__setTarget = (x, z) => (window.__target = { x, z });
  });

  const shot = async (name) => {
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('shot:', name);
  };
  const st = () => page.evaluate(() => window.__state());
  const hud = (t) => page.evaluate((tt) => window.__setHud(tt), t);
  const target = (x, z) => page.evaluate((xx, zz) => window.__setTarget(xx, zz), x, z);
  const setFreeze = (m) =>
    page.evaluate((mm) => {
      window.__freezeMode = mm;
      window.__frozen = false;
    }, m);
  // 等到对打阶段立刻冻结，方便注入受控球（发球/结算阶段注入会被回合逻辑覆盖）
  const freezeAtRally = async (timeout = 90000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      const ok = await page.evaluate(() => {
        const app = window.__paiqiu;
        if (app.world.phase === 'rally') {
          app.state = 'paused';
          return true;
        }
        return false;
      });
      if (ok) return true;
      await sleep(30);
    }
    return false;
  };
  const resume = () =>
    page.evaluate(() => {
      window.__paiqiu.state = 'playing';
      window.__paiqiu.screens.hide();
      window.__frozen = false;
    });

  // ---------- ① 玩家网前 / 队友后场 ----------
  await hud('① 玩家在网前当主攻 → 队友退到后场防守位');
  await target(0, 1.6);
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 180000) {
      const s = await st();
      if (s.phase === 'rally' && Math.abs(s.playerZ) <= 2.4 && Math.abs(s.allyZ) >= 4.2) {
        await page.evaluate(() => (window.__paiqiu.world.slowmoTimer = 1.2));
        await sleep(120);
        await shot('roles-ally-backcourt');
        await page.evaluate(() => (window.__paiqiu.world.slowmoTimer = 0));
        break;
      }
      await sleep(60);
    }
  }

  // ---------- ②③ 队友上前二传 → 传完回撤 ----------
  await hud('② 队友上前补第二拍二传（记录 z）');
  await target(0, 1.5);
  await sleep(200);
  await freezeAtRally();
  await page.evaluate(() => {
    const w = window.__paiqiu.world;
    // 构造一个“必须队友做第二拍”的球：高吊落在网前，队友要从后场赶上来
    const b = w.ball;
    w.touches[0] = 1;
    w.attackPlan[0] = { setterId: 1, attackerId: 0 };
    b.pos = { x: 0.4, y: 2.6, z: 1.0 };
    b.prev = { ...b.pos };
    b.vel = { x: 0, y: 3.4, z: 1.6 };
    b.live = true;
    b.dead = false;
    b.heldBy = null;
    b.lastKind = 'pass';
    b.lastHitTeam = 0;
    b.lastHitterId = 0;
    window.__freezeMode = '';
    window.__log = [];
  });
  await resume();
  {
    let forward = null;
    const t0 = Date.now();
    let setSeen = null;
    while (Date.now() - t0 < 20000) {
      const s = await st();
      const hits = s.log.filter((e) => e.t === 'hit' && e.pid === 1 && e.kind === 'set');
      if (hits.length > 0) setSeen = s;
      if (!forward && hits.length === 0 && Math.abs(s.allyZ) <= 3.4) {
        forward = s;
        await page.evaluate(() => (window.__paiqiu.world.slowmoTimer = 1.2));
        await sleep(100);
        await shot('roles-set-forward');
        await page.evaluate(() => (window.__paiqiu.world.slowmoTimer = 0));
      }
      if (hits.length > 0) break;
      await sleep(40);
    }
    // 传完等回撤：队友 z 应明显变大
    const t1 = Date.now();
    let back = null;
    while (Date.now() - t1 < 8000) {
      const s = await st();
      if (Math.abs(s.allyZ) >= 4.0) {
        back = s;
        await shot('roles-set-retreat');
        break;
      }
      await sleep(50);
    }
    console.log(
      'set-retreat:',
      JSON.stringify({
        forward: forward ? forward.allyZ : null,
        setZ: setSeen ? setSeen.allyZ : null,
        back: back ? back.allyZ : null,
      }),
    );
  }

  // ---------- ④ 后场救起对面扣球 ----------
  await hud('④ 对面扣球 → 后场队友把人到位、球被救起');
  await target(0, 1.8);
  await setFreeze('dig');
  // 先等玩家真正回到网前（否则玩家会离落点更近，抢在队友前面自动起球）
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 20000) {
      const s = await st();
      if (s.phase === 'rally' && Math.abs(s.playerZ) <= 2.2) break;
      await sleep(50);
    }
  }
  await freezeAtRally();
  await page.evaluate(() => {
    const w = window.__paiqiu.world;
    const b = w.ball;
    w.touches = [0, 2];
    w.attackPlan[0] = { setterId: 1, attackerId: 0 };
    w.lastHitterByTeam = [null, null];
    b.pos = { x: -1.0, y: 3.0, z: 1.2 };
    b.prev = { ...b.pos };
    b.vel = { x: 0.2, y: -5.5, z: 9.0 };
    b.live = true;
    b.dead = false;
    b.heldBy = null;
    b.lastKind = 'attack';
    b.lastHitTeam = 1;
    b.lastHitterId = 2;
    window.__digArmed = true;
    window.__log = [];
  });
  await resume();
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
      if (await page.evaluate(() => window.__frozen)) {
        const s = await st();
        await shot('roles-backcourt-dig');
        console.log('backcourt-dig:', JSON.stringify(s.log.slice(-3)));
        await page.evaluate(() => window.__unfreeze());
        break;
      }
      await sleep(40);
    }
  }

  // ---------- ⑤ 跑到位自动接扣杀（连续两帧） ----------
  await hud('⑤ 玩家跑到位但没按键 → 自动起球（前）');
  await target(1.0, 4.6);
  await sleep(300);
  await freezeAtRally();
  await page.evaluate(() => {
    const w = window.__paiqiu.world;
    const b = w.ball;
    w.touches = [0, 2];
    w.attackPlan[0] = { setterId: 1, attackerId: 0 };
    w.lastHitterByTeam = [null, null];
    b.pos = { x: 1.0, y: 3.0, z: 1.2 };
    b.prev = { ...b.pos };
    b.vel = { x: 0.2, y: -5.5, z: 7.5 };
    b.live = true;
    b.dead = false;
    b.heldBy = null;
    b.lastKind = 'attack';
    b.lastHitTeam = 1;
    b.lastHitterId = 2;
    window.__freezeMode = 'auto';
    window.__log = [];
  });
  await resume();
  {
    // “前”一帧：球还在空中飞、玩家已经跑到落点附近，但没按键
    await sleep(90);
    const b1 = await st();
    await page.evaluate(() => {
      window.__paiqiu.state = 'paused';
    });
    await shot('auto-dig-before');
    // 注意：这里不能调用 __unfreeze()，会清掉 hit 瞬间设置的 __frozen 标记
    await page.evaluate(() => {
      window.__paiqiu.state = 'playing';
      window.__paiqiu.screens.hide();
    });
    console.log('auto-dig-before:', JSON.stringify({ ball: b1.ball, playerZ: b1.playerZ }));

    const t0 = Date.now();
    while (Date.now() - t0 < 20000) {
      if (await page.evaluate(() => window.__frozen)) {
        await page.evaluate(() => (window.__paiqiu.world.slowmoTimer = 0));
        await shot('auto-dig-after');
        const log = await page.evaluate(() => window.__log.slice());
        console.log('auto-dig:', JSON.stringify({ log }));
        await page.evaluate(() => window.__unfreeze());
        break;
      }
      await sleep(30);
    }
  }

  // ---------- ⑥ 界外球不自动碰 ----------
  await hud('⑥ 界外球：玩家在球附近，但自动系统不碰球');
  await setFreeze('');
  await target(3.3, 3.6);
  await sleep(300);
  await freezeAtRally();
  await page.evaluate(() => {
    const w = window.__paiqiu.world;
    const b = w.ball;
    w.touches = [0, 2];
    w.attackPlan[0] = { setterId: 1, attackerId: 0 };
    w.lastHitterByTeam = [null, null];
    b.pos = { x: 4.5, y: 2.4, z: 3.0 };
    b.prev = { ...b.pos };
    b.vel = { x: 1.0, y: -1.5, z: 0.4 };
    b.live = true;
    b.dead = false;
    b.heldBy = null;
    b.lastKind = 'attack';
    b.lastHitTeam = 1;
    b.lastHitterId = 2;
    window.__freezeMode = 'out';
    window.__log = [];
    window.__frozen = false;
  });
  await resume();
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
      if (await page.evaluate(() => window.__frozen)) {
        const log = await page.evaluate(() => window.__log.slice());
        const s = await st();
        await shot('auto-out-no-touch');
        console.log('auto-out:', JSON.stringify({ ball: s.ball, log }));
        await page.evaluate(() => window.__unfreeze());
        break;
      }
      await sleep(30);
    }
  }

  const final = await st();
  console.log(
    'RESULT',
    JSON.stringify({
      playerZ: final.playerZ,
      allyZ: final.allyZ,
      autoDigs: final.autoDigs,
      errors,
    }),
  );
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
