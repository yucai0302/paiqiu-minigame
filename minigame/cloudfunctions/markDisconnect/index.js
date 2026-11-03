// 云函数：markDisconnect —— 主动退出/断线标记。
// 等待房双方都退出即删房；对局中好友退出只标记席位（房主 watch → AI 接管）；
// 对局中房主退出直接关房（权威端没了，客机会收到明确提示）。
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const { leaveTransition } = require('./logic');

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const roomId = String(event.roomId || '');

  let room;
  try {
    const hit = await db.collection('rooms').doc(roomId).get();
    room = hit && hit.data;
  } catch {
    return { ok: true }; // 房间已不存在，退出幂等成功
  }
  if (!room) return { ok: true };

  const { patch, cleanup, error } = leaveTransition(room, OPENID);
  if (error) return { error: { code: 'not-member', msg: '你不在这个房间里' } };

  if (cleanup === 'delete') {
    for (const col of ['rooms', 'rooms_live']) {
      try {
        await db.collection(col).doc(roomId).remove();
      } catch {
        // 文档不存在时忽略
      }
    }
    for (const pid of [0, 1]) {
      try {
        await db.collection('rooms_inputs').doc(`${roomId}-${pid}`).remove();
      } catch {
        // ignore
      }
    }
    return { ok: true, cleanup: 'delete' };
  }

  if (patch) await db.collection('rooms').doc(roomId).update({ data: patch });
  return { ok: true, cleanup };
};
