// 降级路径验证：CLOUD_ENV 为空时，邀请好友必须给出可读提示并回落单人模式，不崩不白屏。
// 两个用例：
//   1) nonet=1    —— 无 WebSocket 全局 + 无 wx.cloud（真机缺云配置的最常见形态）
//   2) fakecloud=1 —— 有 wx.cloud 接口但 CLOUD_ENV 为空（开发者工具/真机误配形态）
// 前置：CLOUD_ENV 当前为空串；npm run dev(5173) 已启动。
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.TEMP + '/pptr/node_modules/puppeteer-core');

const BASE = 'http://localhost:5173/web/wx-test.html';
const OUT = 'd:/Project/paiqiu-xcx/docs/screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const launch = () =>
  puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader-webgl', '--window-size=430,900'],
    defaultViewport: { width: 420, height: 860 },
    protocolTimeout: 300000,
  });

(async () => {
  const results = [];
  const cases = [
    { tag: 'nonet', query: 'nonet=1' },
    // 真机形态：wx.cloud 接口永远存在，但 CLOUD_ENV 未填 —— 两个开关叠加模拟
    { tag: 'fakecloud', query: 'nonet=1&fakecloud=1' },
  ];
  for (const c of cases) {
    const browser = await launch();
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e).slice(0, 300)));
    await page.goto(`${BASE}?nick=${encodeURIComponent('回归')}&${c.query}`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__paiqiu, { timeout: 20000 });
    await sleep(2500);

    // 点「邀请好友」胶囊
    await page.evaluate(() => {
      window.__touch('start', 1, 195, 659);
      window.__touch('end', 1, 195, 659);
    });
    await sleep(700);
    const probe = await page.evaluate(() =>
      JSON.stringify({
        netCreated: !!window.__paiqiu.net,
        screen: window.__paiqiu.screens.state,
        toastActive: window.__paiqiu.screens.toastT > 0,
        appState: window.__paiqiu.state,
      }),
    );
    await page.screenshot({ path: `${OUT}/home-degrade-${c.tag}.png` });
    console.log(`[${c.tag}] invite probe:`, probe);

    // 再点单人「开始比赛」验证完整回落
    await page.evaluate(() => {
      window.__touch('start', 1, 195, 579);
      window.__touch('end', 1, 195, 579);
    });
    await page.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 15000 });
    await sleep(800);
    await page.screenshot({ path: `${OUT}/home-degrade-single-${c.tag}.png` });
    const playing = await page.evaluate(() => JSON.stringify({
      state: window.__paiqiu.state,
      mode: window.__paiqiu.mode,
    }));
    console.log(`[${c.tag}] single fallback:`, playing, '| pageerrors:', errs.length);

    const p = JSON.parse(probe);
    const pass = p.netCreated === false && p.screen === 'start' && p.toastActive === true && errs.length === 0;
    results.push({ tag: c.tag, pass });
    await browser.close();
  }
  console.log('results:', JSON.stringify(results));
  if (results.some((r) => !r.pass)) process.exit(1);
  console.log('DEGRADE TESTS PASS');
})().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
