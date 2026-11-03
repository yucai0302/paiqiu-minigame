import { create2dCanvas, screen, wxCanvas } from './wx-shim';
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
      return create2dCanvas(width, height) as CanvasLike;
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
      // iOS 上该接口在个别版本会抛异常/返回空对象，音频失败不能拖垮进场
      try {
        return wx.createWebAudioContext ? (wx.createWebAudioContext() as AudioContext) : null;
      } catch {
        return null;
      }
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
    getLaunchQuery(): Record<string, string> {
      try {
        const q = wx.getLaunchOptionsSync?.().query;
        return q && typeof q === 'object' ? q : {};
      } catch {
        return {};
      }
    },
    getNickName(cb): void {
      // 优先级：冷启动 query 里的 nick（调试用）→ wx.getUserInfo → 默认名
      const q = this.getLaunchQuery();
      if (q.nick) {
        cb(q.nick);
        return;
      }
      if (typeof wx.getUserInfo === 'function') {
        try {
          wx.getUserInfo({
            success: (r: any) => cb(r?.userInfo?.nickName || '玩家'),
            fail: () => cb('玩家'),
          });
          return;
        } catch {
          // 老基础库异常时直接降级
        }
      }
      cb('玩家');
    },
    shareAppMessage(title: string, query: string): void {
      try {
        wx.shareAppMessage({ title, query });
      } catch {
        // 分享失败不阻塞流程
      }
    },
    showModal(title: string, content: string): void {
      try {
        wx.showModal({ title, content, showCancel: false, confirmText: '知道了' });
      } catch {
        // 基础库不支持时忽略（控制台还有 error 日志）
      }
    },
    restartApp(): void {
      try {
        if (typeof wx.restartMiniProgram === 'function') {
          wx.restartMiniProgram({ path: '' });
          return;
        }
        if (typeof wx.exitMiniProgram === 'function') {
          wx.exitMiniProgram({});
          return;
        }
      } catch {
        // 忽略
      }
      this.showModal('请重新进入小游戏', '画面渲染无法恢复，请杀掉小游戏后重新打开。');
    },
  };
}
