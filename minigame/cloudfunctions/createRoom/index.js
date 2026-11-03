// 云函数：createRoom —— 房主建房
// 部署：微信开发者工具 → 云开发 → 右键 cloudfunctions/createRoom → 上传并部署
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const NAME_MAX = 12;

function sanitizeName(raw) {
  const s = String(raw || '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
    .slice(0, NAME_MAX);
  return s || '玩家';
}

function genRoomId() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const name = sanitizeName(event.name);

  // 6 位房间号，碰撞重试 5 次
  let roomId = '';
  for (let i = 0; i < 5; i++) {
    const cand = genRoomId();
    try {
      const hit = await db.collection('rooms').doc(cand).get();
      if (!hit || !hit.data) {
        roomId = cand;
        break;
      }
    } catch {
      roomId = cand; // doc 不存在会抛错 → 号可用
      break;
    }
  }
  if (!roomId) return { error: { code: 'room-id', msg: '房间号生成失败，请重试' } };

  const now = Date.now();
  await db
    .collection('rooms')
    .doc(roomId)
    .set({
      data: {
        members: [OPENID, ''],
        names: [name, ''],
        hostAlive: true,
        guestAlive: false,
        state: 'waiting',
        matchCfg: null,
        createdAt: now,
        updatedAt: now,
      },
    });
  return { roomId, pid: 0 };
};

exports._sanitizeName = sanitizeName;
