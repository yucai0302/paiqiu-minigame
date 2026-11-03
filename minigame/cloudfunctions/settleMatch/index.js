// 云函数：settleMatch —— 结算落库（matches 集合）并把房间置为 result 状态。
// 双方 room watch 看到 state='result'，客户端的结算画面则由终局快照事件驱动。
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const { sanitizeResult } = require('./logic');

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const roomId = String(event.roomId || '');

  let room;
  try {
    const hit = await db.collection('rooms').doc(roomId).get();
    room = hit && hit.data;
  } catch {
    return { error: { code: 'room-not-found', msg: '房间不存在或已解散' } };
  }
  if (!room) return { error: { code: 'room-not-found', msg: '房间不存在或已解散' } };
  if (!room.members.includes(OPENID)) {
    return { error: { code: 'not-member', msg: '你不在这个房间里' } };
  }

  const result = sanitizeResult(event);
  const now = Date.now();
  await db.collection('matches').add({
    data: {
      roomId,
      names: room.names,
      skill: room.matchCfg ? room.matchCfg.skill : 'normal',
      setsWon: result.setsWon,
      winner: result.winner,
      mvp: result.mvp,
      finishedAt: now,
    },
  });
  await db
    .collection('rooms')
    .doc(roomId)
    .update({ data: { state: 'result', updatedAt: now } });
  return { ok: true };
};
