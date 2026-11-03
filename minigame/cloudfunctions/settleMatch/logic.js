// 结算净化（纯逻辑，供 index.js 与 tools/test-cloud-logic.mjs 共用）
function sanitizeResult(raw) {
  const winner = Number(raw && raw.winner) === 1 ? 1 : 0;
  const clamp = (v) => Math.max(0, Math.min(9, Math.round(Number(v) || 0)));
  return {
    winner,
    setsWon: [clamp(raw && raw.setsWon && raw.setsWon[0]), clamp(raw && raw.setsWon && raw.setsWon[1])],
    mvp: String((raw && raw.mvp) || '').slice(0, 16) || '',
  };
}

module.exports = { sanitizeResult };
