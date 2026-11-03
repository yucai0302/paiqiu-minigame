// 云函数纯逻辑单元测试（不依赖 wx-server-sdk / 云环境，本地直接跑）：
//   node tools/test-cloud-logic.mjs
import { createRequire } from 'node:module';
import assert from 'node:assert';

const require = createRequire(import.meta.url);
const { pickSeat } = require('../cloudfunctions/joinRoom/logic.js');
const { isNewerSnapshot, buildMatchCfg } = require('../cloudfunctions/startMatch/logic.js');
const { sanitizeResult } = require('../cloudfunctions/settleMatch/logic.js');
const { leaveTransition } = require('../cloudfunctions/markDisconnect/logic.js');

let passed = 0;
const ok = (name, fn) => {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
};

// ---------------- joinRoom 座位状态机 ----------------
const H = 'openid-HOST';
const G = 'openid-GUEST';
const waiting = () => ({
  members: [H, ''],
  names: ['小明', ''],
  hostAlive: true,
  guestAlive: false,
  state: 'waiting',
});

console.log('joinRoom.pickSeat 座位状态机:');
ok('等待房 → 好友入座 pid=1', () => {
  assert.deepStrictEqual(pickSeat(waiting(), G, false), { pid: 1 });
});
ok('满员 → room-full', () => {
  const room = { ...waiting(), members: [H, G], guestAlive: true };
  assert.strictEqual(pickSeat(room, 'openid-3rd', false).error.code, 'room-full');
});
ok('对局中非重连 → room-in-match', () => {
  const room = { ...waiting(), members: [H, G], guestAlive: true, state: 'playing' };
  assert.strictEqual(pickSeat(room, 'openid-3rd', false).error.code, 'room-in-match');
});
ok('对局中本人断线 → 可重连回原座位', () => {
  const room = {
    ...waiting(),
    members: [H, G],
    guestAlive: false,
    state: 'playing',
  };
  assert.deepStrictEqual(pickSeat(room, G, true), { pid: 1 });
  const hostDown = { ...room, hostAlive: false, guestAlive: true };
  assert.deepStrictEqual(pickSeat(hostDown, H, true), { pid: 0 });
});
ok('对局中他人断线 → 不许冒名重连', () => {
  const room = { ...waiting(), members: [H, G], guestAlive: false, state: 'playing' };
  assert.strictEqual(pickSeat(room, H, true).error.code, 'room-in-match'); // 房主没掉线却想"重连"
});
ok('已解散 → room-closed', () => {
  assert.strictEqual(pickSeat({ ...waiting(), state: 'closed' }, G, false).error.code, 'room-closed');
});

// ---------------- startMatch 开局配置 ----------------
console.log('startMatch 开局配置:');
ok('好友在场 → fillAi=false 且带上好友名', () => {
  const cfg = buildMatchCfg({ members: [H, G], names: ['小明', '小红'], guestAlive: true }, 'hard', 42);
  assert.deepStrictEqual(cfg, { skill: 'hard', seed: 42, names: ['小明', '小红'], fillAi: false });
});
ok('好友缺席 → fillAi=true 且好友名留空（客户端回退 AI 名）', () => {
  const cfg = buildMatchCfg(waiting(), 'normal', 7);
  assert.strictEqual(cfg.fillAi, true);
  assert.strictEqual(cfg.names[1], '');
});
ok('非法难度/种子 → 回退 normal/1', () => {
  const cfg = buildMatchCfg(waiting(), 'hell', NaN);
  assert.strictEqual(cfg.skill, 'normal');
  assert.strictEqual(cfg.seed, 1);
});

// ---------------- 快照合并（q 单调去重） ----------------
console.log('快照合并 isNewerSnapshot:');
ok('只接受更新的 q：跳过旧包/重复包/乱序包', () => {
  assert.strictEqual(isNewerSnapshot(3, 4), true);
  assert.strictEqual(isNewerSnapshot(3, 3), false); // 重复
  assert.strictEqual(isNewerSnapshot(5, 4), false); // 乱序回旧
});

// ---------------- settleMatch 结算净化 ----------------
console.log('settleMatch 结算净化:');
ok('winner 只能是 0/1，局分夹在 0-9，mvp 截断', () => {
  const r = sanitizeResult({ winner: 3, setsWon: [-2, 99], mvp: 'x'.repeat(40) });
  assert.strictEqual(r.winner, 0);
  assert.deepStrictEqual(r.setsWon, [0, 9]);
  assert.strictEqual(r.mvp.length, 16);
  assert.strictEqual(sanitizeResult({ winner: 1 }).winner, 1);
});

// ---------------- markDisconnect 退出状态机 ----------------
console.log('markDisconnect 退出状态机:');
ok('等待房好友退出 → 腾空席位不删房', () => {
  const room = { ...waiting(), members: [H, G], guestAlive: true };
  const r = leaveTransition(room, G);
  assert.strictEqual(r.cleanup, null);
  assert.strictEqual(r.patch.guestAlive, false);
  assert.strictEqual(r.patch.members[1], '');
});
ok('对局中好友退出 → 仅标记席位（房主侧 AI 接管）', () => {
  const room = { ...waiting(), members: [H, G], guestAlive: true, state: 'playing' };
  const r = leaveTransition(room, G);
  assert.strictEqual(r.cleanup, null);
  assert.strictEqual(r.patch.guestAlive, false);
});
ok('对局中房主退出 → 关房（客机收到明确提示）', () => {
  const room = { ...waiting(), members: [H, G], guestAlive: true, state: 'playing' };
  const r = leaveTransition(room, H);
  assert.strictEqual(r.cleanup, 'close');
  assert.strictEqual(r.patch.state, 'closed');
});
ok('等待房房主退出 → 删房', () => {
  const r = leaveTransition(waiting(), H);
  assert.strictEqual(r.cleanup, 'delete');
});
ok('结算后好友退出 + 房主已掉 → 删房', () => {
  const room = { ...waiting(), members: [H, G], hostAlive: false, state: 'result' };
  const r = leaveTransition(room, G);
  assert.strictEqual(r.cleanup, 'delete');
});

console.log(`\nCLOUD-LOGIC TESTS: ${passed} passed, 0 failed`);
