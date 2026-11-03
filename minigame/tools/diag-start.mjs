/**
 * "首页定格 / 点开始无反应" 真机差异复现 + 修复复验脚本。
 *
 * 用法：
 *   node tools/diag-start.mjs                # 测当前构建（js/main.js）
 *   node tools/diag-start.mjs --old          # 测体验版线上构建（.tmp/main-shipped.js）
 *   node tools/diag-start.mjs --only=rafonce
 *
 * 每个组合记录：循环是否在推进（screens.t 是否为 0/NaN 且不增长）、点开始后
 * 是否进入 playing、帧计数、错误列表、以及截图。
 */
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const puppeteer = require(process.env.TEMP + '/pptr/node_modules/puppeteer-core');

const ROOT = 'd:/Project/paiqiu-xcx/minigame';
const OUT_SHOTS = 'd:/Project/paiqiu-xcx/docs/screenshots';
const OUT_DOC = 'd:/Project/paiqiu-xcx/docs';
const OLD_BUNDLE = join(ROOT, '.tmp/main-shipped.js');
const useOld = process.argv.includes('--old');
const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = onlyArg ? onlyArg.slice('--only='.length).split(',') : null;

const COMBOS = [
  { name: 'base', q: '' },
  { name: 'noraf', q: 'noraf=1' },
  { name: 'noraf+canvasraf', q: 'noraf=1&canvasraf=1' },
  { name: 'canvasraf', q: 'canvasraf=1' },
  { name: 'rafonce', q: 'canvasraf=1&rafonce=1' },
  { name: 'noraf+rafonce', q: 'noraf=1&canvasraf=1&rafonce=1' },
  { name: 'rafnots', q: 'rafnots=1' },
  { name: 'audiofail', q: 'audiofail=1' },
  { name: 'nocloud', q: 'nocloud=1' },
  { name: 'dpr3', q: 'dpr=3' },
  { name: 'nocanvas2d', q: 'nocanvas2d=1' },
  { name: 'safefx+rafonce', q: 'safefx=1&canvasraf=1&rafonce=1' },
];

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
};

const startServer = () =>
  new Promise((resolve) => {
    const s = createServer(async (req, res) => {
      const p = decodeURIComponent((req.url || '/').split('?')[0]);
      const file = normalize(join(ROOT, p));
      if (!file.startsWith(normalize(ROOT))) {
        res.writeHead(403);
        res.end('forbidden');
        return;
      }
      try {
        const body = await readFile(file);
        res.writeHead(200, {
          'Content-Type': types[extname(file)] || 'application/octet-stream',
          'Cache-Control': 'no-store',
        });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('not found');
      }
    });
    s.listen(5178, '127.0.0.1', () => resolve(s));
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const launch = () =>
  puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: [
      '--enable-unsafe-swiftshader',
      '--use-gl=angle',
      '--use-angle=swiftshader-webgl',
      '--window-size=430,900',
    ],
    defaultViewport: { width: 420, height: 860 },
    protocolTimeout: 300000,
  });

const readState = (page) =>
  page.evaluate(() => {
    const app = window.__paiqiu;
    if (!app) return { boot: false };
    const sc = app.screens || {};
    const world = app.world || {};
    return {
      boot: true,
      state: app.state,
      screen: sc.state,
      animT: typeof sc.t === 'number' ? sc.t : 'none',
      frameNo: typeof app.frameNo === 'number' ? app.frameNo : 'n/a',
      rafBroken: typeof app.rafBroken === 'boolean' ? app.rafBroken : 'n/a',
      pendingStart: app.pendingStart ? app.pendingStart.step : null,
      phase: world.phase,
      fatal: app.fatal ?? 'n/a',
      degraded: app.degradeTried ?? 'n/a',
      diag: typeof window.__paiqiuDiag?.dumpText === 'function' ? window.__paiqiuDiag.dumpText() : '',
    };
  });

(async () => {
  if (useOld && !existsSync(OLD_BUNDLE)) {
    console.error('缺少体验版构建副本：', OLD_BUNDLE);
    process.exit(1);
  }
  await mkdir(OUT_SHOTS, { recursive: true });
  const server = await startServer();
  const browser = await launch();
  const results = [];

  for (const combo of COMBOS) {
    if (only && !only.some((n) => combo.name.includes(n))) continue;
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 200)}`);
    });
    if (useOld) {
      await page.setRequestInterception(true);
      page.on('request', async (req) => {
        if (req.url().includes('/js/main.js')) {
          try {
            const body = await readFile(OLD_BUNDLE, 'utf8');
            await req.respond({ status: 200, contentType: 'text/javascript; charset=utf-8', body });
          } catch {
            await req.abort();
          }
        } else {
          await req.continue();
        }
      });
    }

    const url = `http://127.0.0.1:5178/web/wx-test.html?debug=1&${combo.q}`;
    let booted = false;
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForFunction(() => window.__paiqiu, { timeout: 25000 });
      booted = true;
    } catch {
      booted = false;
    }

    let s1 = { boot: booted };
    let s2 = {};
    let tapAt = null;
    if (booted) {
      await sleep(1400);
      s1 = await readState(page);
      await sleep(420);
      s2 = await readState(page);
      if (['base', 'rafonce', 'audiofail', 'dpr3'].includes(combo.name)) {
        await page.screenshot({
          path: join(OUT_SHOTS, `start-${combo.name}-home-${useOld ? 'shipped' : 'fixed'}.png`),
        });
      }
      // 点「开始比赛」：按首页命中矩形中心点按
      tapAt = await page.evaluate(() => {
        const hits = (window.__paiqiu?.screens?.hits) || [];
        const h = hits.find((r) => r.id === 'start');
        return h ? { x: h.x + h.w / 2, y: h.y + h.h / 2 } : { x: 195, y: 579 };
      });
      try {
        await page.evaluate(({ x, y }) => {
          window.__touch('start', 1, x, y);
          window.__touch('end', 1, x, y);
        }, tapAt);
      } catch (e) {
        // 触控回调里抛出 = 进场初始化中断（真机上被 runtime 吞掉，表现就是"点了没反应"）
        errors.push(`tap: ${String(e.message || e).slice(0, 200)}`);
      }
      await sleep(2200);
    }

    const after = booted ? await readState(page) : { boot: false };
    const shotName = `start-${combo.name.replace(/\+/g, '_')}-${useOld ? 'shipped' : 'fixed'}.png`;
    if (booted) {
      await page.screenshot({ path: join(OUT_SHOTS, shotName) });
    }

    const animGrew =
      typeof s1.animT === 'number' &&
      Number.isFinite(s1.animT) &&
      typeof s2.animT === 'number' &&
      Number.isFinite(s2.animT) &&
      s2.animT > s1.animT;
    const row = {
      combo: combo.name,
      bundle: useOld ? 'shipped' : 'fixed',
      booted,
      loopAlive: animGrew,
      animT: `${s1.animT} -> ${s2.animT}`,
      frames: `${s1.frameNo} -> ${s2.frameNo}`,
      driver: after.rafBroken,
      afterState: after.state,
      afterScreen: after.screen,
      phase: after.phase,
      degraded: after.degraded,
      fatal: after.fatal,
      errors: errors.slice(0, 3),
      shot: shotName,
    };
    results.push(row);
    console.log(
      `[${row.bundle}] ${combo.name.padEnd(16)} boot=${booted ? 'Y' : 'N'} loop=${animGrew ? 'ALIVE' : 'DEAD'} t=${row.animT} f=${row.frames} state=${after.state}/${after.screen} drv=${row.driver} err=${errors.length}`,
    );
    if ((combo.name === 'base' || combo.name === 'dpr3') && after.diag) {
      console.log(after.diag.split('\n').slice(0, 18).join('\n'));
    }
    await page.close();
  }

  await browser.close();
  server.close();

  const tag = useOld ? 'shipped' : 'fixed';
  await writeFile(join(OUT_DOC, `start-diag-${tag}.json`), JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n结果已写入 docs/start-diag-${tag}.json，截图在 docs/screenshots/start-*.png`);
})();
