// 双端联机 E2E：两个无头浏览器页面模拟两名真人，跑完一整局，取证截图。
// 前置：room-server.mjs 已启动（7788），npm run dev 已启动（5173），npm run build 已跑。
// 用法：node tools/e2e-online.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.TEMP + '/pptr/node_modules/puppeteer-core');

const BASE = 'http://localhost:5173/web/wx-test.html';
const OUT = 'd:/Project/paiqiu-xcx/docs/screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const launchBrowser = () =>
  puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    // 每个客户端独立浏览器：同浏览器多标签会触发后台标签 rAF 节流，把游戏循环降到 1fps
    args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader-webgl', '--window-size=430,900'],
    defaultViewport: { width: 420, height: 860 },
    protocolTimeout: 300000,
  });

const errors = { A: [], B: [], C: [] };
const browsers = [];

(async () => {
  const mkPage = async (tag) => {
    const b = await launchBrowser();
    browsers.push(b);
    const p = await b.newPage();
    p.on('pageerror', (e) => errors[tag].push(String(e).slice(0, 400)));
    p.on('console', (m) => {
      const t = m.text();
      if (m.type() === 'error' && !t.includes('favicon') && !t.includes('404')) errors[tag].push(t.slice(0, 400));
    });
    return p;
  };
  const shot = (p, name) => p.screenshot({ path: `${OUT}/${name}.png` }).then(() => console.log('shot:', name));
  const dump = (p, tag) => p.evaluate(() => {
    const a = window.__paiqiu;
    const tx = a && a.net && a.net.tx;
    return JSON.stringify({
      state: a.state, mode: a.mode, downTries: a.downTries,
      roomId: a.net && a.net.roomId, hasTx: !!tx,
      ready: tx && tx.ws ? tx.ws.readyState : -1,
      time: a.world.time, scores: a.world.scores, phase: a.world.phase,
    });
  }).then((s) => console.log(`[${tag}]`, s));
  const tap = (p, x, y, id = 1) => p.evaluate((x, y, id) => {
    window.__touch('start', id, x, y);
    window.__touch('end', id, x, y);
  }, x, y, id);
  const wiggle = (p) => p.evaluate(() => {
    // 摇杆向右推住 + 按一下击球（游戏坐标系：摇杆(76,776)，击球键(324,801)）
    window.__touch('start', 11, 76, 776);
    window.__touch('move', 11, 130, 776);
    window.__touch('start', 12, 324, 801);
  });
  const release = (p) => p.evaluate(() => {
    window.__touch('end', 11, 76, 776);
    window.__touch('end', 12, 324, 801);
  });

  // ---------------- 房主建局 ----------------
  const A = await mkPage('A');
  await A.goto(`${BASE}?nick=${encodeURIComponent('小明')}`, { waitUntil: 'load' });
  await A.waitForFunction(() => window.__paiqiu, { timeout: 20000 });
  await sleep(2500);
  await tap(A, 195, 659); // 首页「邀请好友 · 2人组队」胶囊
  await A.waitForFunction(
    () => window.__paiqiu && window.__paiqiu.net && window.__paiqiu.net.roomId,
    { timeout: 15000 },
  );
  const roomId = await A.evaluate(() => window.__paiqiu.net.roomId);
  console.log('roomId =', roomId);
  await sleep(400);
  await shot(A, 'online-room-host-waiting');

  // ---------------- 好友冷启动进房（模拟点分享卡片） ----------------
  const B = await mkPage('B');
  await B.goto(`${BASE}?nick=${encodeURIComponent('小红')}&room=${roomId}`, { waitUntil: 'load' });
  await B.waitForFunction(() => window.__paiqiu, { timeout: 20000 });

  // 满员自动开局
  await A.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 20000 });
  await B.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 20000 });
  console.log('both playing (满员自动开局)');
  await sleep(1200);
  await shot(A, 'online-match-kickoff-host');
  await shot(B, 'online-match-kickoff-guest');

  // ---------------- 双方移动 / 击球 ----------------
  await wiggle(A);
  await wiggle(B);
  await sleep(2000);
  const posA = await A.evaluate(() => JSON.stringify(window.__paiqiu.world.players[0].pos));
  const posB = await B.evaluate(() => JSON.stringify(window.__paiqiu.world.players[0].pos));
  console.log('host p0.pos =', posA, '| guest mirror p0.pos =', posB);
  await shot(A, 'online-match-rally-host');
  await shot(B, 'online-match-rally-guest');
  await release(A);
  await release(B);

  // ---------------- 比分变化（验证两端一致） ----------------
  await A.waitForFunction(
    () => window.__paiqiu.world.scores[0] + window.__paiqiu.world.scores[1] > 0,
    { timeout: 120000 },
  );
  const sA = await A.evaluate(() => JSON.stringify(window.__paiqiu.world.scores));
  await sleep(900); // 等客机收到下一份快照
  const sB = await B.evaluate(() => JSON.stringify(window.__paiqiu.world.scores));
  console.log(`scores host = ${sA} | guest = ${sB} → ${sA === sB ? 'MATCH' : 'MISMATCH'}`);
  await shot(A, 'online-match-score-host');
  await shot(B, 'online-match-score-guest');

  // ---------------- 发球者双端一致（需求二：快照携带发球者 id） ----------------
  const serveSeen = [];
  for (let i = 0; i < 3; i++) {
    await A.waitForFunction(() => window.__paiqiu.world.phase === 'serve', { timeout: 150000 });
    const svA = await A.evaluate(() =>
      JSON.stringify({ sv: window.__paiqiu.world.serverId, st: window.__paiqiu.world.servingTeam }),
    );
    await sleep(1200); // 等客机收到快照
    const svB = await B.evaluate(() =>
      JSON.stringify({ sv: window.__paiqiu.world.serverId, st: window.__paiqiu.world.servingTeam }),
    );
    const ok = svA === svB;
    serveSeen.push({ host: svA, guest: svB, ok });
    console.log(`serve#${i + 1} host=${svA} guest=${svB} → ${ok ? 'MATCH' : 'MISMATCH'}`);
    // 等这一回合真正发出去，下一次循环才是“下一轮发球”
    await A.waitForFunction(() => window.__paiqiu.world.phase !== 'serve', { timeout: 150000 });
  }
  console.log('serve samples:', JSON.stringify(serveSeen));
  await shot(A, 'online-serve-rotation-host');
  await shot(B, 'online-serve-rotation-guest');

  // ---------------- 中途断线 → AI 接管 → 自动重连 ----------------
  await B.evaluate(() => window.__paiqiu.net && window.__paiqiu.net.tx && window.__paiqiu.net.tx.ws.close());
  console.log('guest socket killed');
  await sleep(1000);
  await shot(A, 'online-disconnect-ai-takeover-host'); // 房主端：好友断线 AI 接管播报
  // 客机自动重连（3 次退避）；等待传输层真正重建
  await dump(B, 'B after kill');
  await B.waitForFunction(
    () =>
      window.__paiqiu.net &&
      window.__paiqiu.net.tx &&
      window.__paiqiu.net.tx.ws &&
      window.__paiqiu.net.tx.ws.readyState === 1,
    { timeout: 30000 },
  );
  console.log('guest transport re-established');
  await sleep(2000); // 等 start 重放与首份快照
  await dump(B, 'B after reconnect');
  const reconnScores = await A.evaluate(() => JSON.stringify(window.__paiqiu.world.scores));
  console.log('after reconnect, host scores =', reconnScores);
  await shot(B, 'online-reconnected-guest');

  // ---------------- 跑完一局 → 结算 ----------------
  await A.waitForFunction(() => window.__paiqiu.state === 'result', { timeout: 300000 });
  await B.waitForFunction(() => window.__paiqiu.state === 'result', { timeout: 60000 });
  const finA = await A.evaluate(() => JSON.stringify({
    sets: window.__paiqiu.world.setsWon,
    players: window.__paiqiu.world.players.map((p) => p.name),
    mode: window.__paiqiu.mode,
  }));
  const finB = await B.evaluate(() => JSON.stringify({
    sets: window.__paiqiu.world.setsWon,
    players: window.__paiqiu.world.players.map((p) => p.name),
    mode: window.__paiqiu.mode,
  }));
  console.log('result host =', finA);
  console.log('result guest =', finB);
  await shot(A, 'online-result-host');
  await shot(B, 'online-result-guest');

  // ---------------- 单人模式回归 ----------------
  // 联机证据已全部落盘：先关掉 A/B 两个浏览器，避免 3 个 swiftshader Chrome
  // 把 CPU 打满导致 C 页 evaluate 饥饿（protocolTimeout）
  await A.browser().close();
  await B.browser().close();
  console.log('A/B browsers closed for single regression');
  const C = await mkPage('C');
  await C.goto(`${BASE}`, { waitUntil: 'load' });
  await C.waitForFunction(() => window.__paiqiu, { timeout: 20000 });
  await sleep(2500);
  await tap(C, 195, 579); // 单人「开始比赛」CTA
  await C.waitForFunction(() => window.__paiqiu.state === 'playing', { timeout: 15000 });
  await wiggle(C);
  await sleep(1500);
  await shot(C, 'single-regression-match');
  await release(C);
  // 挂机局每分 ~14s（含 9s 自动发球等待），整局模拟 ~230s；swiftshader 拖慢 ~2 倍墙钟
  await C.waitForFunction(() => window.__paiqiu.state === 'result', { timeout: 600000 });
  const finC = await C.evaluate(() => JSON.stringify({
    sets: window.__paiqiu.world.setsWon,
    mode: window.__paiqiu.mode,
    players: window.__paiqiu.world.players.map((p) => p.name),
  }));
  console.log('single result =', finC);
  await shot(C, 'single-regression-result');

  const anyErr = Object.entries(errors).filter(([, v]) => v.length);
  console.log('page errors:', anyErr.length ? JSON.stringify(errors) : 'NONE');
  for (const b of browsers) await b.close();
  if (anyErr.length) process.exit(2);
  console.log('E2E PASS');
})().catch(async (e) => {
  console.error('FATAL', e);
  console.log('errors at FATAL:', JSON.stringify(errors));
  for (const b of browsers) {
    try {
      await b.close();
    } catch {
      // ignore
    }
  }
  process.exit(1);
});
