// 第三轮需求截图（iPhone 竖屏）：
//   ① 网前击球键显示「扣杀」→ 按一下自动起跳并扣球成功
//   ② 网前跳跃键显示「二传」→ 球回队友、队友扣杀
//   ③ 离开网前区域，按钮恢复「击球 / 跳跃」
//   ④ 一次成功拦网（球被挡回）
// 前置：npm run build 已跑、dev server(5173) 已启动。
// 用法：node tools/shot-net-buttons.mjs
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
    const human = w.players.find((p) => p.isHuman);
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const rnd = (a, b) => a + Math.random() * (b - a);
    const zone0 = w.attackZone(0);

    window.__mode = 'spike';
    window.__log = [];
    window.__hudText = '';

    const btn = (id) => app.pad.btns.find((b) => b.id === id);
    window.__pressVisual = (id) => {
      for (const b of app.pad.btns) b.pointer = b.id === id ? 1 : -1;
      app.pad.updateVisual();
    };
    window.__clearVisual = () => {
      for (const b of app.pad.btns) b.pointer = -1;
      app.pad.updateVisual();
    };
    window.__netMode = () => app.pad.netMode;

    const bot = {
      t: 0,
      wantSpike: false,
      spikePressAt: -1,
      wantSetup: false,
      setupPressAt: -1,
      wantBlock: false,
      blockPressAt: -1,
      read(p, dt) {
        this.t += dt;
        // 每个 tick 让手柄刷新视觉状态（视觉模式切换就在这里发生）
        app.pad.read(w);
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
          else this.go(p, inp, 0, 3.6);
          return inp;
        }
        if (w.phase !== 'rally') return inp;

        const mode = window.__mode;
        const ball = w.ball;
        const land = w.predictLanding();
        const touches = w.touches[0];
        const plan = w.attackPlan[0];
        const attacker = plan.attackerId === null || plan.attackerId === 0;
        const hd = Math.hypot(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);

        if (mode === 'deep') {
          this.go(p, inp, 1.9, 5.8);
        } else if (mode === 'block') {
          const oppSide = Math.sign(ball.pos.z) === -1;
          this.go(p, inp, oppSide ? clamp(ball.pos.x, -2.4, 2.4) : clamp(land ? land.x : 0, -2.4, 2.4), 1.35);
        } else if (mode === 'set' && touches >= 1) {
          // 二传之后留在网前，方便截图里同时看到「二传」按钮和队友起跳
          this.go(p, inp, 0, 1.35);
        } else {
          // 网前模式：先站网前，需要接球/扣球时进进攻区
          if (touches === 0 && land && Math.sign(land.z) === 1 && land.t < 1.4) {
            this.go(p, inp, clamp(land.x, -3.4, 3.4), clamp(land.z, 1.2, 4.2));
          } else if (touches === 1 && plan.attackerId === 0 && plan.setterId !== 0) {
            this.go(p, inp, zone0.x, zone0.z);
          } else if (touches >= 2 && attacker) {
            this.go(p, inp, zone0.x, zone0.z);
          } else {
            this.go(p, inp, 0, 1.6);
          }
        }

        // ---- 扣杀：条件满足才按（按下后世界会替玩家自动起跳） ----
        if (mode === 'spike' && touches === 2 && attacker && ball.live && ball.pos.z > -0.2) {
          const tall = ball.pos.y >= 2.0;
          if (!this.wantSpike && tall && hd <= 2.2) {
            this.wantSpike = true;
            this.spikePressAt = this.t + rnd(0.1, 0.18);
          }
        }
        if (this.wantSpike && this.t >= this.spikePressAt) {
          inp.spike = true; // 边沿，模拟“点一下”
          this.wantSpike = false;
          w.slowmoTimer = 2.4; // 慢放，便于抓到自动起跳的瞬间
        }

        // ---- 二传：球够得着、且还在自己这边就回传队友 ----
        if (mode === 'set' && touches <= 1 && ball.live && ball.pos.z > 0 && w.ballInReach(p)) {
          if (!this.wantSetup) {
            this.wantSetup = true;
            this.setupPressAt = this.t + rnd(0.08, 0.15);
          }
        }
        if (this.wantSetup && this.t >= this.setupPressAt) {
          inp.setup = true;
          this.wantSetup = false;
          w.slowmoTimer = 2.4; // 慢放，抓队友快扣
        }

        // ---- 拦网：按“球过网的预测点”站位，并在球到网前 0.45s 内起跳 ----
        if (mode === 'block') {
          const cross = w.predictNetCrossing();
          if (cross && cross.y >= 2.0 && cross.y <= 4.0) {
            this.go(p, inp, clamp(cross.x, -2.6, 2.6), 1.3);
          } else {
            this.go(p, inp, clamp(ball.pos.x, -2.4, 2.4), 1.3);
          }
          const foeAir = w.players.some(
            (q) => q.team === 1 && !q.grounded && q.pos.y > 0.05 && Math.abs(q.pos.z) < 2.8,
          );
          const incoming = ball.live && ball.lastKind === 'attack' && ball.lastHitTeam === 1;
          const soon = !!cross && cross.t <= 0.45 && cross.t > 0.02 && cross.y >= 2.0;
          if ((foeAir || incoming || soon) && p.grounded && Math.abs(p.pos.z) < 1.75) {
            if (!this.wantBlock) {
              this.wantBlock = true;
              this.blockPressAt = this.t + rnd(0.02, 0.08);
            }
          }
          if (this.wantBlock && this.t >= this.blockPressAt) {
            inp.block = true;
            inp.blockHeld = true;
            this.wantBlock = false;
          }
        }

        window.__lastInp = inp;
        return inp;
      },
      go(p, inp, x, z) {
        const dx = x - p.pos.x;
        const dz = z - p.pos.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.2) return;
        inp.moveX = dx / d;
        inp.moveZ = dz / d;
        if (d > 2.4 && p.sprintCd <= 0 && p.grounded) inp.sprint = true;
      },
    };
    w.inputProvider = () => bot.read(human, 1 / 60);

    w.events.on('hit', (e) => {
      window.__log.push({ t: 'hit', kind: e.kind, pid: e.playerId, team: e.team });
      if (e.playerId === 0 && e.kind === 'set') window.__humanSetDone = true;
      if (window.__freezeMode === 'spike' && e.playerId === 0 && e.kind === 'attack') window.__freezeNow();
      // 队友快扣：命中后稍等 180ms 再冻结，画面里队友已经离地、球也飞向对方半场
      if (window.__freezeMode === 'set' && e.playerId === 1 && e.kind === 'attack' && window.__humanSetDone && app.pad.netMode)
        setTimeout(() => window.__freezeNow(), 180);
    });
    w.events.on('jump', (e) => window.__log.push({ t: 'jump', pid: e.playerId, block: !!e.block }));
    w.events.on('block', (e) => {
      window.__log.push({ t: 'block', pid: e.playerId, x: +e.x.toFixed(2), y: +e.y.toFixed(2) });
      if (window.__freezeMode === 'block' && e.playerId === 0) window.__freezeNow();
    });
    w.events.on('serve', (e) => {
      window.__log.push({ t: 'serve', pid: e.playerId });
      // 新一回合开始：二传标记只在同一回合内有效
      window.__humanSetDone = false;
    });

    // 冻结画面：直接改 state（不走 pause()，避免暂停菜单挡住手柄）
    window.__freezeMode = 'spike';
    window.__frozen = false;
    window.__humanSetDone = false;
    window.__freezeNow = () => {
      if (app.state !== 'playing') return;
      app.state = 'paused';
      window.__frozen = true;
    };
    window.__unfreeze = () => {
      window.__frozen = false;
      app.state = 'playing';
    };

    // 截图用角标：把按钮语义/玩家位置直接写进画面
    const hud = document.createElement('div');
    hud.style.cssText =
      'position:fixed;left:8px;top:8px;z-index:99;padding:6px 8px;border-radius:8px;' +
      'background:rgba(0,0,0,.62);color:#fff;font:12px/1.5 -apple-system,monospace;white-space:pre;pointer-events:none';
    document.body.appendChild(hud);
    setInterval(() => {
      // 一局打完会自动结算；截图脚本里直接重开同一场比赛，保持同一 World（监听不会丢）
      if (app.state === 'result') {
        w.startMatch();
        w.slowmoTimer = 0;
        app.state = 'playing';
        app.screens.hide();
        window.__frozen = false;
        window.__humanSetDone = false;
        window.__log.push({ t: 'restart' });
      }
      const net = app.pad.netMode;
      hud.textContent =
        `模式=${window.__mode}  网前=${net ? '是' : '否'}\n` +
        (window.__hudText || '') +
        `\n玩家 z=${human.pos.z.toFixed(2)} y=${human.pos.y.toFixed(2)}` +
        `\n击球键=${net ? '扣杀' : '击球'}  跳跃键=${net ? '二传' : '跳跃'}`;
    }, 40);

    window.__state = () => ({
      mode: window.__mode,
      net: app.pad.netMode,
      phase: w.phase,
      scores: w.scores.slice(),
      touches: w.touches.slice(),
      plan: { setter: w.attackPlan[0].setterId, attacker: w.attackPlan[0].attackerId },
      human: { x: +human.pos.x.toFixed(2), y: +human.pos.y.toFixed(2), z: +human.pos.z.toFixed(2) },
      ball: { x: +w.ball.pos.x.toFixed(2), y: +w.ball.pos.y.toFixed(2), z: +w.ball.pos.z.toFixed(2), kind: w.ball.lastKind },
      log: window.__log.slice(),
      inp: window.__lastInp,
    });
    window.__setMode = (m) => {
      window.__mode = m;
      window.__freezeMode = m;
      window.__frozen = false;
      window.__humanSetDone = false;
      window.__hudText = '';
    };
  });

  const shot = async (name) => {
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('shot:', name);
  };
  const st = () => page.evaluate(() => window.__state());
  const setMode = (m, text = '') =>
    page.evaluate((mm, tt) => {
      window.__setMode(mm);
      window.__hudText = tt;
    }, m, text);

  const waitFor = async (fnName, timeout = 240000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      const s = await st();
      if (s[fnName]) return s;
      await sleep(60);
    }
    return null;
  };

  // ---------- ① 扣杀 ----------
  await setMode('spike', '网前进攻区：击球键已变为「扣杀」');
  let spikeShot = null;
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 300000) {
      const s = await page.evaluate(() => {
        const app = window.__paiqiu;
        const w = app.world;
        const p = w.players.find((q) => q.isHuman);
        const b = w.ball;
        const plan = w.attackPlan[0];
        const hd = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
        const ready =
          app.pad.netMode &&
          w.phase === 'rally' &&
          w.touches[0] === 2 &&
          (plan.attackerId === null || plan.attackerId === 0) &&
          b.live &&
          b.pos.z > -0.2 &&
          b.pos.y >= 2.0 &&
          hd <= 2.3;
        return { ready, y: +p.pos.y.toFixed(2), z: +p.pos.z.toFixed(2) };
      });
      if (s.ready) {
        await page.evaluate(() => window.__pressVisual('hit'));
        await shot('net-spike-button');
        await page.evaluate(() => window.__clearVisual());
        // 等“自动起跳”的瞬间（玩家没有按过跳跃键，y 自己抬起来）
        const t1 = Date.now();
        let jumped = false;
        while (Date.now() - t1 < 6000) {
          const s2 = await st();
          if (!jumped && s2.human.y > 0.35) {
            await shot('net-spike-jump');
            jumped = true;
          }
          const frozen = await page.evaluate(() => window.__frozen);
          if (frozen) {
            await shot('net-spike-hit');
            spikeShot = await st();
            await page.evaluate(() => window.__unfreeze());
            break;
          }
          await sleep(50);
        }
        await page.evaluate(() => { window.__paiqiu.world.slowmoTimer = 0; });
        break;
      }
      await sleep(60);
    }
  }
  const spikeOk = await page.evaluate(() => {
    const log = window.__log;
    const jumps = log.filter((e) => e.t === 'jump' && e.pid === 0 && !e.block);
    const hits = log.filter((e) => e.t === 'hit' && e.pid === 0 && e.kind === 'attack');
    return { autoJumps: jumps.length, humanAttacks: hits.length };
  });
  console.log('spike:', JSON.stringify(spikeOk), spikeShot ? JSON.stringify(spikeShot.human) : null);

  // ---------- ③ 离开网前（先拍，避免后续状态干扰） ----------
  await setMode('deep', '离开网前区域：按钮恢复「击球 / 跳跃」');
  await sleep(900);
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 90000) {
      const s = await st();
      if (s.phase === 'rally' && !s.net && Math.abs(s.human.z) >= 4.6) break;
      await sleep(80);
    }
    await page.evaluate(() => { window.__paiqiu.world.slowmoTimer = 2; });
    await sleep(250);
    await shot('net-leave-normal-buttons');
    await page.evaluate(() => { window.__paiqiu.world.slowmoTimer = 0; });
  }

  // ---------- ② 二传 ----------
  await page.evaluate(() => (window.__log = []));
  await setMode('set', '网前进攻区：跳跃键已变为「二传」');
  let setOk = null;
  {
    const t0 = Date.now();
    let shotBtn = false;
    // 连续帧：1 = 按下二传瞬间，2 = 队友冲刺中，3 = 队友起跳扣杀
    let chain = 0;
    let chainAt = 0;
    while (Date.now() - t0 < 300000) {
      const s = await page.evaluate(() => {
        const app = window.__paiqiu;
        const w = app.world;
        const p = w.players.find((q) => q.isHuman);
        const b = w.ball;
        const plan = w.attackPlan[0];
        const log = window.__log;
        // 只看本回合：最后一次发球之后的日志
        const serveIdx = log.map((e) => e.t).lastIndexOf('serve');
        const rally = log.slice(serveIdx + 1);
        const setIdx = rally.findIndex((e) => e.t === 'hit' && e.pid === 0 && e.kind === 'set');
        const atkIdx = rally.findIndex((e) => e.t === 'hit' && e.pid === 1 && e.kind === 'attack');
        const mate = w.players.find((q) => q.team === 0 && !q.isHuman);
        return {
          near: app.pad.netMode && w.phase === 'rally' && w.touches[0] <= 1 && b.pos.z > 0,
          net: app.pad.netMode,
          phase: w.phase,
          inReach: w.ballInReach(p),
          kind: b.lastKind,
          setIdx,
          atkIdx,
          frozen: window.__frozen,
          allyZ: +mate.pos.z.toFixed(2),
          allyY: +mate.pos.y.toFixed(2),
          touches: w.touches[0],
        };
      });
      if (!shotBtn && s.near && s.phase === 'rally') {
        await page.evaluate(() => window.__pressVisual('jump'));
        await shot('net-set-button');
        await page.evaluate(() => window.__clearVisual());
        shotBtn = true;
      }
      if (chain === 0 && s.setIdx >= 0) {
        await page.evaluate(
          (z) => (window.__hudText = `①按下二传：球已高吊给队友（队友 z=${z}，正在上前）`),
          s.allyZ,
        );
        await shot('netset-chain1');
        chain = 1;
        chainAt = Date.now();
      } else if (chain === 1 && Date.now() - chainAt > 520) {
        await page.evaluate(
          (a) => (window.__hudText = `②队友冲刺接这一拍（z=${a.z}，离地 ${a.y}m）`),
          { z: s.allyZ, y: s.allyY },
        );
        await shot('netset-chain2');
        chain = 2;
      }
      // 人类「二传」→ 队友扣杀：命中瞬间冻结画面再截图
      if (s.frozen && s.setIdx >= 0 && s.atkIdx > s.setIdx) {
        await page.evaluate(() => (window.__hudText = '③队友冲上来扣杀，球飞向对方半场'));
        await shot('netset-chain3');
        setOk = { log: await page.evaluate(() => window.__log.slice()), state: (await st()).ball };
        await page.evaluate(() => window.__unfreeze());
        break;
      }
      await sleep(60);
    }
  }
  console.log('set:', setOk ? JSON.stringify(setOk.state) : null);

  // ---------- ④ 拦网 ----------
  await page.evaluate(() => (window.__log = []));
  await setMode('block', '网前拦网：拦网键始终保留');
  let blockOk = null;
  {
    const t0 = Date.now();
    while (Date.now() - t0 < 300000) {
      const frozen = await page.evaluate(() => window.__frozen);
      if (frozen) {
        const s = await st();
        await shot('net-block-success');
        blockOk = s.log.filter((e) => e.t === 'block');
        await page.evaluate(() => window.__unfreeze());
        break;
      }
      await sleep(60);
    }
  }
  console.log('block:', blockOk ? JSON.stringify(blockOk) : null);

  console.log(
    'RESULT',
    JSON.stringify({
      spike: spikeOk,
      set: setOk ? true : false,
      leave: true,
      block: blockOk ? blockOk.length : 0,
      errors,
    }),
  );
  await browser.close();
  process.exit(spikeOk.humanAttacks > 0 && setOk && blockOk ? 0 : 1);
})();
