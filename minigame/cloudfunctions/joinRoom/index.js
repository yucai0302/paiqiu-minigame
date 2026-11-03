// 云函数：joinRoom —— 好友进房 / 断线重连（座位状态机见 logic.js，有单元测试）
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const { pickSeat } = require('./logic');

function sanitizeName(raw) {
  const s = String(raw || '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
    .slice(0, 12);
  return s || '玩家';
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const roomId = String(event.roomId || '');
  const name = sanitizeName(event.name);
  const resume = !!event.resume;

  let room;
  try {
    const hit = await db.collection('rooms').doc(roomId).get();
    room = hit && hit.data;
  } catch {
    return { error: { code: 'room-not-found', msg: '房间不存在或已解散' } };
  }
  if (!room) return { error: { code: 'room-not-found', msg: '房间不存在或已解散' } };

  const seat = pickSeat(room, OPENID, resume);
  if (seat.error) return seat;

  const pid = seat.pid;
  const now = Date.now();
  const patch = { updatedAt: now };
  if (pid === 0) {
    patch.members = [OPENID, room.members[1] || ''];
    patch.names = [name, room.names[1] || ''];
    patch.hostAlive = true;
  } else {
    patch.members = [room.members[0] || '', OPENID];
    patch.names = [room.names[0] || '玩家', name];
    patch.guestAlive = true;
  }
  await db.collection('rooms').doc(roomId).update({ data: patch });

  // 返回给客户端的当前阵容（room watch 也会推送同样内容给房主）
  const members = patch.members || room.members;
  const names = patch.names || room.names;
  const players = [];
  for (let i = 0; i < 2; i++) {
    if (members[i]) players.push({ pid: i, name: names[i] || '玩家' });
  }
  return { pid, players };
};
