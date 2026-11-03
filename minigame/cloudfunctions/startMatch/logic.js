// 开局配置（纯逻辑，供 index.js 与 tools/test-cloud-logic.mjs 共用）
//
// 快照合并规则：live 文档带单调递增的 q 序号，watch 偶发重推/乱序时
// 客户端只应用比本地新的快照（src/net/cloud.ts 的 watchLiveDoc 用同一规则）。
function isNewerSnapshot(lastQ, incomingQ) {
  return Number(incomingQ) > Number(lastQ);
}

/** 依据房间现状构造 matchCfg：好友缺席则 AI 补位（fillAi） */
function buildMatchCfg(room, skill, seed) {
  const guestPresent = !!(room.members && room.members[1]) && room.guestAlive !== false;
  return {
    skill: ['easy', 'normal', 'hard'].includes(skill) ? skill : 'normal',
    seed: Number(seed) || 1,
    names: [room.names[0] || '玩家', guestPresent ? room.names[1] || '玩家' : ''],
    fillAi: !guestPresent,
  };
}

module.exports = { isNewerSnapshot, buildMatchCfg };
