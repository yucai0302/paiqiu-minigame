import { screen, wxCanvas } from './wx-shim';
import type { CanvasLike, Platform, TouchPoint } from './types';

declare const wx: any;

const toPoints = (list: any[]): TouchPoint[] =>
  (list || []).map((t: any) => ({
    id: typeof t.identifier === 'number' ? t.identifier : 0,
    x: t.clientX,
    y: t.clientY,
  }));

export function createWxPlatform(): Platform {
  return {
    canvas: wxCanvas as CanvasLike,
    width: screen.width,
    height: screen.height,
    dpr: screen.dpr,
    safeTop: screen.safeTop,
    safeBottom: screen.safeBottom,
    createCanvas(width: number, height: number): CanvasLike {
      return wx.createOffscreenCanvas({ type: '2d', width, height }) as CanvasLike;
    },
    raf(cb: (time: number) => void): number {
      if (typeof wxCanvas.requestAnimationFrame === 'function') return wxCanvas.requestAnimationFrame(cb);
      return setTimeout(() => cb(Date.now()), 16) as unknown as number;
    },
    cancelRaf(id: number): void {
      if (typeof wxCanvas.cancelAnimationFrame === 'function') wxCanvas.cancelAnimationFrame(id);
      else clearTimeout(id as unknown as number);
    },
    now: () => Date.now(),
    createAudioContext(): AudioContext | null {
      return wx.createWebAudioContext ? (wx.createWebAudioContext() as AudioContext) : null;
    },
    onTouchStart(cb): void {
      wx.onTouchStart((e: any) => cb(toPoints(e.changedTouches)));
    },
    onTouchMove(cb): void {
      wx.onTouchMove((e: any) => cb(toPoints(e.touches)));
    },
    onTouchEnd(cb): void {
      wx.onTouchEnd((e: any) => cb(toPoints(e.changedTouches), toPoints(e.touches)));
    },
    onTouchCancel(cb): void {
      wx.onTouchCancel((e: any) => cb(toPoints(e.touches)));
    },
    vibrateShort(): void {
      try {
        wx.vibrateShort({ type: 'light' });
      } catch {
        // 部分机型不支持，忽略
      }
    },
  };
}
