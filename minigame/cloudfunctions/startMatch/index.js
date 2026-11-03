// 云函数：startMatch —— 房主开局：写 matchCfg，初始化 live/inputs 文档。
// 客户端双方都 watch 房间文档，收到 state='playing' + matchCfg 后各自开局。
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const { buildMatchCfg } = require('./logic');

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
  // 仅房主（members[0]）可开局
  if (room.members[0] !== OPENID) {
    return { error: { code: 'not-host', msg: '只有房主可以开局' } };
  }

  const cfg = buildMatchCfg(room, event.skill, event.seed);
  const now = Date.now();

  await db
    .collection('rooms')
    .doc(roomId)
    .update({
      data: { state: 'playing', matchCfg: cfg, hostAlive: true, updatedAt: now },
    });

  // live 文档（房主直写快照；安全规则：仅房主可写、成员可读）
  await db
    .collection('rooms_live')
    .doc(roomId)
    .set({ data: { members: room.members, q: 0, s: '', updatedAt: now } });

  // 输入文档（好友直写输入；安全规则：成员可读写）
  for (const pid of [0, 1]) {
    await db
      .collection('rooms_inputs')
      .doc(`${roomId}-${pid}`)
      .set({ data: { members: room.members, d: '', at: 0, again: false, updatedAt: now } });
  }

  return { ok: true, cfg };
};
