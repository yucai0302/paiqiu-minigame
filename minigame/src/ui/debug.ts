import * as THREE from 'three';

import { createUiCanvas, makeTexture, setSpriteTexture, uiSprite } from './draw';
import type { UiLayer } from './layer';

const FONT = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

/**
 * 真机可读的调试面板：左上角半透明小卡片，2Hz 重绘。
 * 只在 debug 打开时创建，普通玩家完全无感（不占 draw call、不重绘 canvas）。
 */
export class DebugPanel {
  private sprite: THREE.Sprite;
  private lines: string[] = [];
  private t = 0;
  private readonly W = 356;
  private readonly H = 142;
  private readonly topY = 14;

  constructor(
    ui: UiLayer,
    private readonly screenH: number,
  ) {
    const { canvas } = createUiCanvas(this.W, this.H, 2);
    this.sprite = uiSprite(
      makeTexture(canvas),
      this.W,
      this.H,
      10 + this.W / 2,
      screenH - (this.topY + this.H / 2),
      90,
    );
    this.sprite.visible = false;
    ui.scene.add(this.sprite);
  }

  setVisible(v: boolean): void {
    this.sprite.visible = v;
  }

  setLines(lines: string[]): void {
    this.lines = lines;
    this.redraw();
  }

  /** 每帧调用；内部节流到 2Hz，避免调试面板本身造成掉帧 */
  update(dt: number): void {
    if (!this.sprite.visible) return;
    this.t += dt;
    if (this.t < 0.5) return;
    this.t = 0;
    this.redraw();
  }

  private redraw(): void {
    const { canvas, ctx } = createUiCanvas(this.W, this.H, 2);
    ctx.fillStyle = 'rgba(5,12,22,0.82)';
    ctx.fillRect(0, 0, this.W, this.H);
    ctx.strokeStyle = 'rgba(110,200,255,0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, this.W - 1, this.H - 1);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `600 11px ${FONT}`;
    let y = 8;
    for (const raw of this.lines.slice(0, 8)) {
      const line = raw.length > 46 ? raw.slice(0, 45) + '…' : raw;
      ctx.fillStyle = line.startsWith('!') ? '#ff9aa8' : '#cfe6ff';
      ctx.fillText(line, 9, y);
      y += 16;
    }
    setSpriteTexture(this.sprite, makeTexture(canvas));
  }
}
