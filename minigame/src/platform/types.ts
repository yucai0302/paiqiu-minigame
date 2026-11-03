export interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export interface CanvasLike {
  width: number;
  height: number;
  getContext(type: string, attrs?: unknown): unknown;
  requestAnimationFrame?(cb: (time: number) => void): number;
  cancelAnimationFrame?(id: number): void;
}

/** 平台差异全部收敛在这里：小游戏只有 wx，浏览器只有 DOM */
export interface Platform {
  canvas: CanvasLike;
  width: number;
  height: number;
  dpr: number;
  safeTop: number;
  safeBottom: number;
  createCanvas(width: number, height: number): CanvasLike;
  raf(cb: (time: number) => void): number;
  cancelRaf(id: number): void;
  now(): number;
  createAudioContext(): AudioContext | null;
  onTouchStart(cb: (changed: TouchPoint[]) => void): void;
  onTouchMove(cb: (active: TouchPoint[]) => void): void;
  onTouchEnd(cb: (changed: TouchPoint[], active: TouchPoint[]) => void): void;
  onTouchCancel(cb: (active: TouchPoint[]) => void): void;
  vibrateShort(): void;
  /** 冷启动 query（wx.getLaunchOptionsSync / 浏览器 location.search） */
  getLaunchQuery(): Record<string, string>;
  /** 尽量拿微信昵称；拿不到回调默认名 */
  getNickName(cb: (name: string) => void): void;
  /** 分享小程序卡片，query 会拼进卡片链接 */
  shareAppMessage(title: string, query: string): void;
  /** 系统级弹窗（渲染层挂掉时唯一还能显示的通道） */
  showModal(title: string, content: string): void;
  /** 重启小游戏/刷新页面，用于渲染器无法恢复时兜底 */
  restartApp(): void;
}
