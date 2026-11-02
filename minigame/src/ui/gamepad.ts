import * as THREE from 'three';

import { clamp } from '../core/math';
import type { Platform, TouchPoint } from '../platform/types';
import type { ControlInput } from '../sim/types';
import { emptyInput } from '../sim/types';
import { createUiCanvas, makeTexture, roundedRect, uiSprite } from './draw';
import type { UiLayer } from './layer';

type BtnId = 'jump' | 'hit' | 'block' | 'sprint';

interface Btn {
  id: BtnId;
  x: number;
  y: number;
  r: number;
  sprite: THREE.Sprite;
  size: number;
  texNormal: THREE.Texture;
  texPressed: THREE.Texture;
  pointer: number;
}

const FONT = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

/** 四键配色：与角色球衣同一卡通色系（珊瑚红/天蓝/柔紫/明黄） */
const BTN_STYLE: Record<BtnId, { color: string; label: string }> = {
  hit: { color: '#ff5d73', label: '击球' },
  jump: { color: '#38bdf8', label: '跳跃' },
  block: { color: '#8b7cf6', label: '拦网' },
  sprint: { color: '#fbbf24', label: '冲刺' },
};

/** 摇杆旋钮用我方主色绿，与角色呼应 */
const KNOB_TOP = '#5ee8a8';
const KNOB_BOTTOM = '#14b8a6';

function shade(hex: string, f: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number): number => Math.max(0, Math.min(255, Math.round(v * f)));
  const r = ch((n >> 16) & 0xff);
  const g = ch((n >> 8) & 0xff);
  const b = ch(n & 0xff);
  return `rgb(${r},${g},${b})`;
}

/** 手柄区背景：藏青半透明渐变带 + 顶部柔和高光，不抢球场视线 */
function padBackground(W: number, padH: number): THREE.Texture {
  const { canvas, ctx } = createUiCanvas(Math.max(2, Math.round(W)), Math.max(2, Math.round(padH)), 2);
  const grad = ctx.createLinearGradient(0, 0, 0, padH);
  grad.addColorStop(0, 'rgba(18,30,46,0.52)');
  grad.addColorStop(0.25, 'rgba(15,25,40,0.72)');
  grad.addColorStop(1, 'rgba(10,17,28,0.88)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, padH);
  // 顶部柔和高光，与球场雪地过渡
  const glow = ctx.createLinearGradient(0, 0, 0, 10);
  glow.addColorStop(0, 'rgba(255,255,255,0.35)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, 10);
  return makeTexture(canvas);
}

/** 摇杆底盘：半透明圆盘 + 白色外圈 + 四方向刻度点，明确中心与外圈手感 */
function joyBaseTexture(): { tex: THREE.Texture; size: number } {
  const size = 124;
  const c = size / 2;
  const { canvas, ctx } = createUiCanvas(size, size, 2);

  ctx.beginPath();
  ctx.ellipse(c, c + 4, 50, 46, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(6,12,20,0.3)';
  ctx.fill();

  const grad = ctx.createLinearGradient(0, c - 50, 0, c + 50);
  grad.addColorStop(0, 'rgba(255,255,255,0.2)');
  grad.addColorStop(1, 'rgba(255,255,255,0.08)');
  ctx.beginPath();
  ctx.arc(c, c, 50, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.stroke();

  // 内圈虚感环
  ctx.beginPath();
  ctx.arc(c, c, 36, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.stroke();

  // 四方向刻度点
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  for (const [dx, dy] of [
    [0, -42],
    [0, 42],
    [-42, 0],
    [42, 0],
  ] as const) {
    ctx.beginPath();
    ctx.arc(c + dx, c + dy, 2.6, 0, Math.PI * 2);
    ctx.fill();
  }
  return { tex: makeTexture(canvas), size };
}

/** 摇杆旋钮：绿色渐变球 + 白描边 + 高光点 */
function joyKnobTexture(): { tex: THREE.Texture; size: number } {
  const size = 64;
  const c = size / 2;
  const { canvas, ctx } = createUiCanvas(size, size, 2);

  ctx.beginPath();
  ctx.ellipse(c, c + 3, 22, 20, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(6,12,20,0.32)';
  ctx.fill();

  const grad = ctx.createLinearGradient(0, c - 22, 0, c + 22);
  grad.addColorStop(0, KNOB_TOP);
  grad.addColorStop(1, KNOB_BOTTOM);
  ctx.beginPath();
  ctx.arc(c, c, 22, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(c - 6, c - 8, 7, 5, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fill();
  return { tex: makeTexture(canvas), size };
}

// ---- 按键图标（白色线条，居中画在 (0,0)，调用方先 translate）----

function iconBall(ctx: CanvasRenderingContext2D, base: string): void {
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = base;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-9, -3);
  ctx.quadraticCurveTo(0, 2, 9, -3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-6, 7);
  ctx.quadraticCurveTo(0, 1, 6, 7);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-3, -9);
  ctx.quadraticCurveTo(2, 0, -2, 9);
  ctx.stroke();
}

function iconJump(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 3.4;
  ctx.strokeStyle = '#ffffff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const dy of [3, -5]) {
    ctx.beginPath();
    ctx.moveTo(-8, dy + 4);
    ctx.lineTo(0, dy - 4);
    ctx.lineTo(8, dy + 4);
    ctx.stroke();
  }
}

function iconBlock(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = '#ffffff';
  ctx.lineCap = 'round';
  roundedRect(ctx, -10, -7, 20, 14, 3);
  ctx.stroke();
  ctx.lineWidth = 1.8;
  for (const x of [-3.4, 3.4]) {
    ctx.beginPath();
    ctx.moveTo(x, -7);
    ctx.lineTo(x, 7);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();
}

function iconSprint(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ffffff';
  ctx.lineCap = 'round';
  for (const [y, x0, x1] of [
    [-5, -11, 0],
    [1, -11, 3],
    [7, -11, -1],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
  }
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.moveTo(2, -6);
  ctx.lineTo(11, 1);
  ctx.lineTo(2, 8);
  ctx.stroke();
}

/** 按键贴图：烘焙投影 + 上浅下深渐变 + 白描边 + 顶部高光 + 图标 + 文字 */
function buttonTexture(id: BtnId, r: number, pressed: boolean): { tex: THREE.Texture; size: number } {
  const { color, label } = BTN_STYLE[id];
  const size = Math.ceil(r * 2 + 24);
  const c = size / 2;
  const { canvas, ctx } = createUiCanvas(size, size, 2);

  // 投影
  ctx.beginPath();
  ctx.ellipse(c, c + r * 0.55, r * 0.9, r * 0.34, 0, 0, Math.PI * 2);
  ctx.fillStyle = pressed ? 'rgba(6,12,20,0.22)' : 'rgba(6,12,20,0.34)';
  ctx.fill();

  // 主体渐变
  const top = pressed ? shade(color, 0.86) : shade(color, 1.14);
  const bottom = pressed ? shade(color, 0.7) : shade(color, 0.92);
  const grad = ctx.createLinearGradient(0, c - r, 0, c + r);
  grad.addColorStop(0, top);
  grad.addColorStop(1, bottom);
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = pressed ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)';
  ctx.stroke();

  // 顶部高光弧（按下时去掉，明确按压态）
  if (!pressed) {
    ctx.beginPath();
    ctx.ellipse(c, c - r * 0.48, r * 0.6, r * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.fill();
  }

  // 图标
  ctx.save();
  ctx.translate(c, c - r * 0.14);
  if (id === 'hit') iconBall(ctx, color);
  else if (id === 'jump') iconJump(ctx);
  else if (id === 'block') iconBlock(ctx);
  else iconSprint(ctx);
  ctx.restore();

  // 功能文字（图标 + 文字双通道识别）
  ctx.font = `800 11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(10,20,32,0.35)';
  ctx.strokeText(label, c, c + r * 0.52);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, c, c + r * 0.52);

  return { tex: makeTexture(canvas), size };
}

/** 底部手柄：左摇杆 + 右侧四键，直接产出 ControlInput */
export class Gamepad {
  private root = new THREE.Group();
  private btns: Btn[] = [];

  private joyBase: THREE.Sprite;
  private joyKnob: THREE.Sprite;
  private joyBaseSize: number;
  private joyKnobSize: number;
  private joyHome: { x: number; y: number };
  private joyOrigin: { x: number; y: number };
  private joyVec = { x: 0, y: 0 };
  private joyId = -1;

  private hitEdge = false;
  private jumpEdge = false;
  private blockEdge = false;
  private hitHeld = false;
  private blockHeld = false;
  private sprintHeld = false;

  private enabled = false;
  private readonly y0: number;

  constructor(
    private readonly ui: UiLayer,
    private readonly platform: Platform,
    private readonly W: number,
    private readonly H: number,
    private readonly padH: number,
  ) {
    this.y0 = H - padH;

    const bgTex = padBackground(W, padH);
    const bg = uiSprite(bgTex, W, padH, W / 2, H - (this.y0 + padH / 2), 0);
    this.root.add(bg);

    const safe = Math.min(this.platform.safeBottom, 30);
    this.joyHome = { x: 76, y: this.y0 + (padH - safe) * 0.52 };
    this.joyOrigin = { ...this.joyHome };

    const base = joyBaseTexture();
    this.joyBaseSize = base.size;
    this.joyBase = uiSprite(base.tex, base.size, base.size, this.joyHome.x, H - this.joyHome.y, 2);
    const knob = joyKnobTexture();
    this.joyKnobSize = knob.size;
    this.joyKnob = uiSprite(knob.tex, knob.size, knob.size, this.joyHome.x, H - this.joyHome.y, 4);
    this.root.add(this.joyBase, this.joyKnob);

    const contentH = padH - 8 - safe;
    const rowTop = this.y0 + contentH * 0.28;
    const rowBottom = this.y0 + contentH * 0.74;
    const colRight = W - 66;
    const colLeft = W - 140;

    // 主键击球最大，其余按键拉开大小区分重要度
    this.addButton('hit', colRight, rowBottom, 33);
    this.addButton('jump', colRight, rowTop, 26);
    this.addButton('block', colLeft, rowBottom, 26);
    this.addButton('sprint', colLeft, rowTop, 23);

    this.ui.scene.add(this.root);
    this.root.visible = false;
    this.updateVisual();
  }

  private addButton(id: BtnId, x: number, y: number, r: number): void {
    const normal = buttonTexture(id, r, false);
    const pressed = buttonTexture(id, r, true);
    const sprite = uiSprite(normal.tex, normal.size, normal.size, x, this.H - y, 4);
    this.root.add(sprite);
    this.btns.push({
      id,
      x,
      y,
      r,
      sprite,
      size: normal.size,
      texNormal: normal.tex,
      texPressed: pressed.tex,
      pointer: -1,
    });
  }

  setVisible(v: boolean): void {
    this.root.visible = v;
  }

  setEnabled(v: boolean): void {
    if (!v) this.releaseAll();
    this.enabled = v;
  }

  onStart(points: TouchPoint[]): void {
    if (!this.enabled || !this.root.visible) return;
    for (const p of points) {
      if (p.y < this.y0) continue;
      if (p.x < this.W * 0.5 && this.joyId < 0) {
        this.joyId = p.id;
        this.joyOrigin = {
          x: clamp(p.x, 56, this.W * 0.5 - 16),
          y: clamp(p.y, this.y0 + 48, this.H - 48),
        };
        this.joyVec = { x: 0, y: 0 };
        continue;
      }
      const btn = this.hitButton(p.x, p.y);
      if (btn && btn.pointer < 0) {
        btn.pointer = p.id;
        this.press(btn, true);
        if (btn.id === 'hit' || btn.id === 'jump') this.platform.vibrateShort();
      }
    }
    this.updateVisual();
  }

  onMove(active: TouchPoint[]): void {
    if (this.joyId >= 0) {
      const p = active.find((q) => q.id === this.joyId);
      if (p) {
        const dx = p.x - this.joyOrigin.x;
        const dy = p.y - this.joyOrigin.y;
        const len = Math.hypot(dx, dy);
        const max = 40;
        const k = len > max ? max / len : 1;
        this.joyVec = { x: (dx * k) / max, y: (dy * k) / max };
      }
    }
    this.updateVisual();
  }

  onEnd(changed: TouchPoint[], active: TouchPoint[]): void {
    for (const p of changed) {
      if (p.id === this.joyId) {
        this.joyId = -1;
        this.joyVec = { x: 0, y: 0 };
        this.joyOrigin = { ...this.joyHome };
      }
      for (const b of this.btns) {
        if (b.pointer === p.id) {
          b.pointer = -1;
          this.press(b, false);
        }
      }
    }
    // 兜底：活动列表里不存在的触点一律释放
    for (const b of this.btns) {
      if (b.pointer >= 0 && !active.some((p) => p.id === b.pointer)) {
        b.pointer = -1;
        this.press(b, false);
      }
    }
    this.updateVisual();
  }

  onCancel(): void {
    this.releaseAll();
    this.updateVisual();
  }

  read(): ControlInput {
    if (!this.enabled) {
      this.resetEdges();
      return emptyInput();
    }
    const out = emptyInput();
    const len = Math.hypot(this.joyVec.x, this.joyVec.y);
    if (len >= 0.12) {
      const k = Math.min(1, len) / len;
      out.moveX = this.joyVec.x * k;
      out.moveZ = this.joyVec.y * k;
    }
    out.sprint = this.sprintHeld;
    out.jump = this.jumpEdge;
    out.hit = this.hitEdge;
    out.hitHeld = this.hitHeld;
    out.block = this.blockEdge;
    out.blockHeld = this.blockHeld;
    this.jumpEdge = false;
    this.hitEdge = false;
    this.blockEdge = false;
    return out;
  }

  private hitButton(x: number, y: number): Btn | null {
    for (const b of this.btns) {
      const dx = x - b.x;
      const dy = y - b.y;
      if (dx * dx + dy * dy <= b.r * b.r) return b;
    }
    return null;
  }

  private press(btn: Btn, down: boolean): void {
    if (btn.id === 'jump') {
      if (down) this.jumpEdge = true;
    } else if (btn.id === 'hit') {
      this.hitHeld = down;
      if (down) this.hitEdge = true;
    } else if (btn.id === 'block') {
      this.blockHeld = down;
      if (down) this.blockEdge = true;
    } else {
      this.sprintHeld = down;
    }
  }

  private resetEdges(): void {
    this.jumpEdge = false;
    this.hitEdge = false;
    this.blockEdge = false;
  }

  private releaseAll(): void {
    this.joyId = -1;
    this.joyVec = { x: 0, y: 0 };
    this.joyOrigin = { ...this.joyHome };
    for (const b of this.btns) {
      b.pointer = -1;
      this.press(b, false);
    }
    this.resetEdges();
    this.updateVisual();
  }

  private updateVisual(): void {
    const baseX = this.joyId >= 0 ? this.joyOrigin.x : this.joyHome.x;
    const baseY = this.joyId >= 0 ? this.joyOrigin.y : this.joyHome.y;
    const kx = baseX + this.joyVec.x * 40;
    const ky = baseY + this.joyVec.y * 40;
    this.joyBase.position.set(baseX, this.H - baseY, 0);
    this.joyKnob.position.set(kx, this.H - ky, 0);
    // 拖出时旋钮略放大，增强"握感"
    const grabbing = this.joyId >= 0;
    this.joyKnob.scale.setScalar(this.joyKnobSize * (grabbing ? 1.08 : 1));
    this.joyBase.scale.setScalar(this.joyBaseSize * (grabbing ? 1.04 : 1));

    for (const b of this.btns) {
      const down = b.pointer >= 0;
      // 两张贴图常驻复用，直接换 map，不走 setSpriteTexture（它会 dispose 旧贴图）
      const mat = b.sprite.material as THREE.SpriteMaterial;
      mat.map = down ? b.texPressed : b.texNormal;
      mat.needsUpdate = true;
      b.sprite.scale.setScalar(b.size * (down ? 0.9 : 1));
    }
  }
}
