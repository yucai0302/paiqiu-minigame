// 退出/断线标记状态机（纯逻辑，供 index.js 与 tools/test-cloud-logic.mjs 共用）
//
// 返回 { patch, cleanup }：
//   patch  - 要合并进房间文档的字段
//   cleanup- 'delete'（房间该删了）| 'close'（对局中房主退出 → 关房）| null
function leaveTransition(room, openid) {
  const isHost = room.members[0] === openid;
  const isGuest = room.members[1] === openid;
  if (!isHost && !isGuest) return { patch: null, cleanup: null, error: 'not-member' };

  const now = Date.now();
  const patch = { updatedAt: now };
  let cleanup = null;

  if (isGuest) {
    if (room.state === 'waiting') {
      // 等待房退出 = 腾空席位
      patch.members = [room.members[0], ''];
      patch.names = [room.names[0], ''];
      patch.guestAlive = false;
    } else {
      // 对局中/结算后离开：只标记，房主侧 watch 感知
      patch.guestAlive = false;
    }
  } else {
    patch.hostAlive = false;
    if (room.state === 'playing') {
      // 房主是权威端：对局中退出直接关房，客机会收到明确提示
      patch.state = 'closed';
      cleanup = 'close';
    } else {
      cleanup = 'delete'; // 等待/结算房：房主走了就散
    }
  }

  // 双方都不在且不在对局中 → 房间删除
  const hostGone = isHost || room.hostAlive === false;
  const guestGone = isGuest || !room.members[1] || room.guestAlive === false;
  if (!cleanup && room.state !== 'playing' && hostGone && guestGone) cleanup = 'delete';

  return { patch, cleanup, error: null };
}

module.exports = { leaveTransition };
