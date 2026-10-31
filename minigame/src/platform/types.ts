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
}
