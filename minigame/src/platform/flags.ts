/**
 * 安全渲染模式：排查渲染兼容问题的一键开关。
 *
 * 开启方式：
 * - 浏览器调试页：URL 加 `?safefx=1`
 * - 微信开发者工具 / 真机：在 game.js 入口最顶部（require 之前）加一行
 *   `GameGlobal.__SAFEFX__ = 1;`
 *
 * 效果：地板退回纯色、关闭体积光束、隐藏人物名牌/号码贴图。
 * 若开启后画面恢复正常，说明问题出在 canvas 贴图或 additive 混合路径；
 * 若仍异常，则问题在更底层的渲染环境。
 */
const g = globalThis as { __SAFEFX__?: unknown };

export const SAFE_MODE: boolean = g.__SAFEFX__ === 1 || g.__SAFEFX__ === true;
