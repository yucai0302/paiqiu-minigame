// 单镜头取证：rally 阶段杀掉客机 socket，400ms 内截房主"好友断线 · AI 队友接管"播报。
// 前置：room-server.mjs(7788) + npm run dev(5173) 已启动。
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
  const A = await (await launch()).newPage();
  const B = await (await launch()).newPage();
  await A.goto(`${BASE}?nick=${encodeURIComponent('小明')}`, { waitUntil: 'load' });
  await A.waitForFunction(() => window.__paiqiu, { timeout: 20000 });
  await sleep(2500);
  await A.evaluate(() => {
    window.__touch('start', 1, 195, 659);
    window.__touch('end', 1, 195, 659);
  });
  await A.waitForFunction(() => window.__paiqiu.net && window.__paiqiu.net.roomId, { timeout: 15000 });
  const roomId = await A.evaluate(() => window.__paiqiu.net.roomId);
  console.log('roomId', roomId);
  await B.goto(`${BASE}?nick=${encodeURIComponent('小红')}&room=${roomId}`, { waitUntil: 'load' });
  await A.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 20000 });
  await B.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 20000 });
  // 等 rally（球真正飞起来，此阶段没有发球播报来抢屏）
  await A.waitForFunction(() => window.__paiqiu.world.phase === 'rally', { timeout: 60000 });
  console.log('rally reached, killing guest socket');
  await B.evaluate(() => window.__paiqiu.net && window.__paiqiu.net.tx && window.__paiqiu.net.tx.ws.close());
  await sleep(400);
  await A.screenshot({ path: `${OUT}/online-disconnect-ai-takeover-host.png` });
  const info = await A.evaluate(() => JSON.stringify({
    mode: window.__paiqiu.mode,
    friendHuman: window.__paiqiu.world.players[1].isHuman,
  }));
  console.log('host state after kill:', info);
  await A.browser().close();
  await B.browser().close();
  console.log('DONE');
})().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
