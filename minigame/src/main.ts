import { App } from './app';

declare const wx: any;

/** 入口：小游戏走 wx 画布，浏览器走 DOM 画布（用于本地调试） */
export async function boot(): Promise<void> {
  if (typeof wx !== 'undefined' && typeof wx.createCanvas === 'function') {
    const { createWxPlatform } = await import('./platform/wx');
    new App(createWxPlatform());
  } else {
    const { createWebPlatform } = await import('./platform/web');
    new App(createWebPlatform());
  }
}
