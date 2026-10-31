/**
 * 微信小游戏运行时垫片。
 * 必须在 three.js 之前执行：three 初始化时会探测 window / document。
 */

declare const wx: any;
declare const GameGlobal: any;

const g: any = typeof globalThis !== 'undefined' ? globalThis : GameGlobal;

export const wxCanvas = wx.createCanvas();
const info: any = (wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()) || {};

export const screen = {
  width: info.windowWidth || info.screenWidth || 375,
  height: info.windowHeight || info.screenHeight || 667,
  dpr: Math.min(info.pixelRatio || 2, 2),
  safeTop: info.safeArea ? Math.max(0, info.safeArea.top || 0) : 0,
  safeBottom: info.safeArea
    ? Math.max(0, (info.windowHeight || info.screenHeight || 0) - info.safeArea.bottom)
    : 0,
};

const raf = (cb: (time: number) => void): number => {
  if (typeof wxCanvas.requestAnimationFrame === 'function') return wxCanvas.requestAnimationFrame(cb);
  return setTimeout(() => cb(Date.now()), 16) as unknown as number;
};

const caf = (id: number): void => {
  if (typeof wxCanvas.cancelAnimationFrame === 'function') wxCanvas.cancelAnimationFrame(id);
  else clearTimeout(id as unknown as number);
};

const makeCanvas = (width = 1, height = 1): any =>
  wx.createOffscreenCanvas({ type: '2d', width, height });

const win: any = {
  devicePixelRatio: screen.dpr,
  innerWidth: screen.width,
  innerHeight: screen.height,
  addEventListener(): void {},
  removeEventListener(): void {},
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  performance: { now: () => Date.now() },
  navigator: { userAgent: 'wechat-minigame', platform: 'wechat' },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
};

// 用构造函数返回实例，兼容 `new AudioContext()`
win.AudioContext = function (): any {
  return wx.createWebAudioContext ? wx.createWebAudioContext() : null;
};
win.webkitAudioContext = win.AudioContext;

const doc: any = {
  createElement(tag: string): any {
    if (tag === 'canvas') return makeCanvas();
    return { style: {}, appendChild(): void {}, remove(): void {} };
  },
  createElementNS(_ns: string, tag: string): any {
    return tag === 'canvas' ? makeCanvas() : { style: {} };
  },
  createTextNode(text: string): any {
    return { textContent: text };
  },
  documentElement: { style: {} },
  body: { style: {}, appendChild(): void {} },
  addEventListener(): void {},
  removeEventListener(): void {},
};

win.document = doc;

/** 浏览器里 window/document 可能是只读的；小游戏里不存在，正常赋值即可 */
const setGlobal = (key: string, value: any): void => {
  try {
    g[key] = value;
  } catch {
    // 只读全局，忽略
  }
  if (g[key] !== value) {
    try {
      Object.defineProperty(g, key, { value, configurable: true, writable: true });
    } catch {
      // 浏览器原生全局不可覆盖，保留原值
    }
  }
};

setGlobal('window', win);
setGlobal('self', win);
setGlobal('document', doc);
setGlobal('navigator', win.navigator);
setGlobal('performance', win.performance);
setGlobal('devicePixelRatio', screen.dpr);
setGlobal('innerWidth', screen.width);
setGlobal('innerHeight', screen.height);
setGlobal('requestAnimationFrame', raf);
setGlobal('cancelAnimationFrame', caf);
setGlobal('AudioContext', win.AudioContext);
setGlobal('Image', function (): any {
  return {};
});
