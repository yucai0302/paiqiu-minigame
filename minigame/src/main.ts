import { App } from './app';
import { CLOUD_ENV } from './config/cloud';
import { initCloud } from './net/cloud';
import { mark, recordError } from './platform/diag';

declare const wx: any;

/** 入口：小游戏走 wx 画布，浏览器走 DOM 画布（用于本地调试） */
export async function boot(): Promise<void> {
  try {
    if (typeof wx !== 'undefined' && typeof wx.createCanvas === 'function') {
      // 云开发要在启动早期 init（带 env + traceUser），CloudRoomClient 侧幂等兜底
      if (CLOUD_ENV) {
        try {
          initCloud(CLOUD_ENV);
          mark('cloud-init');
        } catch (e) {
          // 云初始化失败不阻塞游戏：联机入口会走降级提示
          recordError('cloud-init', e);
        }
      }
      const { createWxPlatform } = await import('./platform/wx');
      new App(createWxPlatform());
    } else {
      const { createWebPlatform } = await import('./platform/web');
      new App(createWebPlatform());
    }
  } catch (e) {
    // 构造期失败同样不能白屏：把可读错误直接弹出来（真机没有控制台）
    recordError('boot', e);
    const msg = String((e as { message?: string })?.message ?? e).slice(0, 200);
    try {
      if (typeof wx !== 'undefined' && typeof wx.showModal === 'function') {
        wx.showModal({ title: '小游戏启动失败', content: msg, showCancel: false, confirmText: '知道了' });
      }
    } catch {
      // 连弹窗都不可用就只能留日志
    }
  }
}
