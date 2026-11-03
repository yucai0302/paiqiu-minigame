// 加入房座位状态机（纯逻辑，供 index.js 与 tools/test-cloud-logic.mjs 共用）
//
// 房间文档形态：
//   members:   [hostOpenid, guestOpenid]，空位为 ''
//   hostAlive / guestAlive: 席位是否在线（断线重连用）
//   state: 'waiting' | 'playing' | 'result' | 'closed'
//
// 返回 { pid: 0|1 } 或 { error: { code, msg } }，不产生副作用。

function err(code, msg) {
  return { error: { code, msg } };
}

/** 选座：等待房正常入座；对局中只允许本人重连；满员/已解散给出可读错误 */
function pickSeat(room, openid, resume) {
  const { members, hostAlive, guestAlive, state } = room;
  const hostOpenid = members[0] || '';
  const guestOpenid = members[1] || '';
  const hostGone = !!hostOpenid && hostAlive === false;
  const guestGone = !!guestOpenid && guestAlive === false;

  if (state === 'closed') return err('room-closed', '房间已解散');
  if (!hostOpenid) return err('room-not-found', '房间不存在或已解散');

  if (state === 'playing') {
    // 对局中：只允许重连自己掉线的席位
    if (resume && openid === hostOpenid && hostGone) return { pid: 0 };
    if (resume && openid === guestOpenid && guestGone) return { pid: 1 };
    return err('room-in-match', '房间正在对局中，稍后再试');
  }

  // 显式重连优先（等待房/结算后回到自己席位）
  if (resume && openid === hostOpenid) return { pid: 0 };
  if (resume && openid === guestOpenid) return { pid: 1 };

  // 普通加入：房主空位（罕见）→ 客人空位 → 满员
  if (hostGone) return { pid: 0 };
  if (!guestOpenid || guestGone) return { pid: 1 };
  return err('room-full', '房间已满');
}

module.exports = { pickSeat };
