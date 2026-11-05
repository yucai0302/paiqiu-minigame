// 真人实测反馈的两条证据截图（iPhone 竖屏）：
//   ① 玩家在网前、摇杆一直微动时，AI 队友仍然把二传球送到玩家脚下
//   ② 对面扣球时，AI 队友明显横移去救（不是站着看）
// 前置：npm run build 已跑；dev server（5173）已启动。
// 用法：node tools/shot-human-feedback.mjs [skill]
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

  // 页面内：拟人手感注入 + 取景 HUD + 事件探测
  await page.evaluate(() => {
    const app = window.__paiqiu;
    const w = app.world;
    const human = w.players.find((p) => p.isHuman);
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const rnd = (a, b) => a + Math.random() * (b - a);
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
      jitterTimer: 0,
      jx: 0,
      jz: 0,
      target: null,
      servePower: 0.7,
      jumpAt: -1,
      hitAt: -1,
      hitHold: 0,
      t: 0,
      read(p, dt) {
        this.t += dt;
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
          if (p.id === w.serverId) inp.hitHeld = p.charge < this.servePower;
          else this.move(p, inp, slotPos(p.team, p.slot).x, slotPos(p.team, p.slot).z);
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

        // 摇杆持续微动（真人手感的关键：即使在防守位也不停手）
        this.jitterTimer -= dt;
        if (this.jitterTimer <= 0) {
          this.jitterTimer = rnd(0.09, 0.19);
          const a = rnd(-0.45, 0.45);
          const m = rnd(0.05, 0.3);
          this.jx = Math.cos(a) * m;
          this.jz = Math.sin(a) * m;
        }
        if (inp.moveX !== 0 || inp.moveZ !== 0) {
          inp.moveX = clamp(inp.moveX + this.jx, -1, 1);
          inp.moveZ = clamp(inp.moveZ + this.jz, -1, 1);
          const l = Math.hypot(inp.moveX, inp.moveZ);
          if (l > 1) {
            inp.moveX /= l;
            inp.moveZ /= l;
          }
        } else {
          inp.moveX = this.jx;
          inp.moveZ = this.jz;
        }

        const touches = w.touches[p.team];
        const plan = w.attackPlan[p.team];
        const attacker = plan.attackerId === null || plan.attackerId === p.id;
        const hd = Math.hypot(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);
        const canHit = w.ballInReach(p);

        let want = true;
        if (touches === 1) want = plan.setterId === p.id || ball.pos.y < 1.05;
        else if (touches >= 2) want = attacker || (ball.pos.y < 1.2 && hd < 1.0);

        if (touches >= 2 && attacker && p.grounded && hd < 2.2) {
          const tt = w.ballTimeToHeight(2.25 + 0.6);
          if (tt !== null && tt <= 0.55 && tt > 0.02 && this.jumpAt < 0) this.jumpAt = this.t + rnd(0.15, 0.3);
        }
        if (this.jumpAt >= 0 && this.t >= this.jumpAt) {
          inp.jump = true;
          this.jumpAt = -1;
        }

        const ttChest = w.ballTimeToHeight(2.25 + 0.3);
        const anticipate = ttChest !== null && ttChest <= 0.3 && hd < 2.2;
        const wantPress = canHit ? want : want && anticipate;
        if (wantPress && this.hitAt < 0) this.hitAt = this.t + rnd(0.15, 0.28);
        if (this.hitAt >= 0 && this.t >= this.hitAt) {
          this.hitAt = -1;
          this.hitHold = 0.14;
        }
        this.hitHold = Math.max(0, this.hitHold - dt);
        inp.hit = this.hitHold > 0;
        inp.hitHeld = this.hitHold > 0;
        window.__lastInp = inp;
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

    // ---- 取景 HUD：把“队友横移多少 / 玩家摇杆在动”直接叠在截图角落，便于核对 ----
    const hud = document.createElement('div');
    hud.style.cssText =
      'position:fixed;left:8px;top:8px;z-index:99;padding:6px 8px;border-radius:8px;' +
      'background:rgba(0,0,0,.62);color:#fff;font:12px/1.5 -apple-system,monospace;white-space:pre;pointer-events:none';
    document.body.appendChild(hud);
    window.__hudText = '';
    setInterval(() => {
      const mate = w.players.find((p) => p.team === 0 && !p.isHuman);
      const inp = window.__lastInp || { moveX: 0, moveZ: 0 };
      const stick = Math.hypot(inp.moveX || 0, inp.moveZ || 0);
      const land = w.predictLanding();
      hud.textContent =
        (window.__hudText || '') +
        `\n队友 阿洛 x=${mate.pos.x.toFixed(2)} z=${mate.pos.z.toFixed(2)}` +
        `\n玩家摇杆 |v|=${stick.toFixed(2)}` +
        (land ? `\n球落点 x=${land.x.toFixed(2)} z=${land.z.toFixed(2)}` : '');
    }, 50);

    // ---- 事件探测 ----
    window.__shotReq = null;
    window.__allyTrack = null;
    window.__c1 = false;
    window.__c2 = false;
    window.__rallyLog = [];
    w.events.on('serve', () => {
      window.__rallyLog = [];
    });
    w.events.on('hit', (e) => {
      window.__rallyLog.push({ kind: e.kind, pid: e.playerId, team: e.team });
      // ① 队友二传，且玩家此刻在网前（|z|<=3.2）、摇杆在微动
      if (
        !window.__c1 &&
        e.team === 0 &&
        e.playerId !== 0 &&
        e.kind === 'set' &&
        Math.abs(human.pos.z) <= 3.2
      ) {
        const inp = window.__lastInp || { moveX: 0, moveZ: 0 };
        if (Math.hypot(inp.moveX || 0, inp.moveZ || 0) > 0.04) {
          window.__c1 = true;
          window.__hudText = `①队友二传 → 玩家（玩家在网前 z=${human.pos.z.toFixed(2)}，摇杆 |v|=${Math.hypot(
            inp.moveX,
            inp.moveZ,
          ).toFixed(2)}）`;
          window.__shotReq = 'fb-pass';
          w.slowmoTimer = 3;
        }
      }
      // ② 对面扣球：记录队友起始位置，抓横移
      if (!window.__c2 && e.team === 1 && e.kind === 'attack') {
        const mate = w.players.find((p) => p.team === 0 && !p.isHuman);
        window.__allyTrack = { x: mate.pos.x, z: mate.pos.z, t: w.time };
        window.__c2 = true;
        window.__shotReq = 'fb-dig';
        w.slowmoTimer = 3;
      }
    });

    window.__state = () => {
      const mate = w.players.find((p) => p.team === 0 && !p.isHuman);
      const land = w.predictLanding();
      return {
        phase: w.phase,
        scores: w.scores,
        ball: { x: +w.ball.pos.x.toFixed(2), y: +w.ball.pos.y.toFixed(2), z: +w.ball.pos.z.toFixed(2) },
        ally: { x: +mate.pos.x.toFixed(2), z: +mate.pos.z.toFixed(2) },
        human: {
          x: +human.pos.x.toFixed(2),
          y: +human.pos.y.toFixed(2),
          z: +human.pos.z.toFixed(2),
        },
        landing: land ? { x: +land.x.toFixed(2), z: +land.z.toFixed(2), t: +land.t.toFixed(2) } : null,
        start: window.__allyTrack,
      };
    };
  });

  const shot = async (name) => {
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('shot:', name);
  };
  const st = () => page.evaluate(() => window.__state());

  const take = async (tag, times) => {
    const frames = [];
    for (let i = 0; i < times.length; i++) {
      if (i > 0) await sleep(times[i]);
      frames.push(await st());
      await shot(`${tag}-${i + 1}`);
    }
    return frames;
  };

  const started = Date.now();
  let ok1 = false;
  let ok2 = false;
  let tries = 0;
  while (Date.now() - started < 300000 && (!ok1 || !ok2)) {
    const req = await page.evaluate(() => {
      const r = window.__shotReq;
      window.__shotReq = null;
      return r;
    });
    if (!req) {
      await sleep(100);
      continue;
    }
    tries++;
    // 慢动作下每帧间隔按真实时间取：传球链路 0/500/700/900，救球链路 0/300/300/300
    const frames = await take(req, req === 'fb-pass' ? [0, 500, 700, 900] : [0, 300, 300, 300]);
    const start = frames[0].start;
    const end = frames[frames.length - 1].ally;
    const dx = start ? Math.hypot(end.x - start.x, end.z - start.z) : 0;
    console.log(req, 'frames:', JSON.stringify(frames), 'allyMove=', dx.toFixed(2));
    await page.evaluate(() => {
      window.__paiqiu.world.slowmoTimer = 0;
      window.__hudText = '';
    });
    if (req === 'fb-pass') {
      // ① 只要本回合后续玩家真的碰到球（击球/扣杀）即采纳
      const rally = await page.evaluate(() => window.__rallyLog.slice());
      const idx = rally.findIndex((e) => e.team === 0 && e.pid !== 0 && e.kind === 'set');
      const humanTouched = rally.slice(idx + 1).some((e) => e.team === 0 && e.pid === 0);
      console.log('pass chain, human touched:', humanTouched, 'rally:', JSON.stringify(rally));
      if (idx >= 0 && humanTouched) ok1 = true;
      else await page.evaluate(() => (window.__c1 = false));
    }
    if (req === 'fb-dig') {
      // ② 队友必须真的横移（>=0.8m）才采纳
      const touched = await page.evaluate(() => {
        const r = window.__rallyLog;
        const i = r.findIndex((e) => e.team === 1 && e.kind === 'attack');
        return i >= 0 && r.slice(i + 1).some((e) => e.team === 0 && e.pid !== 0);
      });
      console.log('dig chain, ally moved:', dx.toFixed(2), 'ally touched:', touched);
      if (dx >= 0.8) ok2 = true;
      else await page.evaluate(() => (window.__c2 = false));
    }
    if (tries >= 12) break;
  }

  console.log('result:', JSON.stringify({ pass: ok1, dig: ok2 }));
  console.log('errors:', JSON.stringify(errors));
  await browser.close();
  process.exit(ok1 && ok2 ? 0 : 1);
})();
