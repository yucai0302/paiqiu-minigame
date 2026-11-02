/**
 * 微信小游戏运行时垫片。
 * 必须在 three.js 之前执行：three 初始化时会探测 window / document。
 */

declare const wx: any;
declare const GameGlobal: any;

const g: any = typeof globalThis !== 'undefined' ? globalThis : GameGlobal;

/**
 * three.js WebGLRenderer 要求 canvas 具备 DOM 式接口：
 * 构造时调用 addEventListener（webglcontextlost/restored）、读取
 * style / clientWidth / clientHeight 等。wx canvas 与离屏 canvas 没有这些
 * 方法（PC 微信直接抛 "canvas.addEventListener is not a function"），
 * 这里统一补齐为空操作，所有交给 three 的 canvas 都必须经过它。
 */
const patchCanvasDom = (c: any): any => {
  if (!c) return c;
  const noop = (): void => {};
  const set = (key: string, value: any): void => {
    try {
      if (typeof c[key] === 'undefined') c[key] = value;
    } catch {
      // 只读属性忽略
    }
  };
  set('addEventListener', noop);
  set('removeEventListener', noop);
  set('dispatchEvent', () => false);
  set('setAttribute', noop);
  set('style', {});
  set('clientWidth', c.width || 0);
  set('clientHeight', c.height || 0);
  set('ownerDocument', null);
  if (typeof c.getBoundingClientRect !== 'function') {
    set('getBoundingClientRect', () => ({
      left: 0,
      top: 0,
      right: c.width || 0,
      bottom: c.height || 0,
      width: c.width || 0,
      height: c.height || 0,
    }));
  }
  return c;
};

export const wxCanvas = patchCanvasDom(wx.createCanvas());
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

/**
 * 创建 2d 离屏 canvas，带能力检测与回退：
 * 1. 优先 wx.createOffscreenCanvas（基础库 2.16.1+）；
 * 2. 不可用时退回 wx.createCanvas() —— 微信约定首次调用返回主屏画布、
 *    其后调用均返回离屏画布（1.x 起支持 2d）。本模块顶部已创建主屏画布，
 *    所以走到这里拿到的必是离屏实例；
 * 3. PC 微信（3.9.x）小游戏 runtime 缺少 createOffscreenCanvas，正是回退分支兜底。
 */
export const create2dCanvas = (width = 1, height = 1): any => {
  if (typeof wx.createOffscreenCanvas === 'function') {
    try {
      return patchCanvasDom(wx.createOffscreenCanvas({ type: '2d', width, height }));
    } catch {
      // 某些 runtime 有该函数但调用失败，继续走回退
    }
  }
  const c = patchCanvasDom(wx.createCanvas());
  c.width = width;
  c.height = height;
  return c;
};

const makeCanvas = (width = 1, height = 1): any => create2dCanvas(width, height);

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
