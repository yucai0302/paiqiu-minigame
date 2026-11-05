import * as THREE from 'three';

import { clamp } from '../core/math';
import type { Platform, TouchPoint } from '../platform/types';
import type { ControlInput } from '../sim/types';
import { emptyInput } from '../sim/types';
import type { World } from '../sim/world';
import { createUiCanvas, makeTexture, roundedRect, uiSprite } from './draw';
import type { UiLayer } from './layer';

type BtnId = 'jump' | 'hit' | 'block' | 'sprint';
/** 贴图语义：网前会把「击球→扣杀」「跳跃→二传」换皮，尺寸/命中区不变 */
type BtnSkin = BtnId | 'spike' | 'set';

interface Btn {
  id: BtnId;
  x: number;
  y: number;
  /** 视觉半径（只影响绘制与间距） */
  r: number;
  /** 命中半径（可独立放大，但不与相邻键重叠） */
  hitR: number;
  sprite: THREE.Sprite;
  size: number;
  texNormal: THREE.Texture;
  texPressed: THREE.Texture;
  /** 网前语义的备用贴图（仅击球/跳跃键有） */
  texNormalAlt?: THREE.Texture;
  texPressedAlt?: THREE.Texture;
  pointer: number;
}

const FONT = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

/** 四键配色：与角色球衣同一卡通色系（珊瑚红/天蓝/柔紫/明黄） */
const BTN_STYLE: Record<BtnSkin, { color: string; label: string }> = {
  hit: { color: '#ff5d73', label: '击球' },
  jump: { color: '#38bdf8', label: '跳跃' },
  block: { color: '#8b7cf6', label: '拦网' },
  sprint: { color: '#fbbf24', label: '冲刺' },
  spike: { color: '#ff5d73', label: '扣杀' },
  set: { color: '#38bdf8', label: '二传' },
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

/** 扣杀：球 + 向下重砸箭头 + 速度线（糖果质感同色系） */
function iconSpike(ctx: CanvasRenderingContext2D, base: string): void {
  ctx.beginPath();
  ctx.arc(6, -6, 4.2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 1.6;
  ctx.strokeStyle = base;
  ctx.beginPath();
  ctx.moveTo(2.4, -4.6);
  ctx.quadraticCurveTo(6, -6, 9.4, -4.2);
  ctx.stroke();
  // 下砸箭头
  ctx.lineWidth = 3.4;
  ctx.strokeStyle = '#ffffff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-2, -10);
  ctx.lineTo(-2, 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-8, 0);
  ctx.lineTo(-2, 8);
  ctx.lineTo(4, 0);
  ctx.stroke();
  // 速度线
  ctx.lineWidth = 2;
  for (const [y, x0, x1] of [
    [-8, -11, -7],
    [0, -11, -8],
    [8, -11, -9],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
  }
}

/** 二传：球 + 双手托起的上抛弧线 */
function iconSet(ctx: CanvasRenderingContext2D): void {
  ctx.beginPath();
  ctx.arc(0, -7, 4.2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ffffff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  // 双手托球
  ctx.beginPath();
  ctx.moveTo(-10, 2);
  ctx.quadraticCurveTo(-6, 8, -1, 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(10, 2);
  ctx.quadraticCurveTo(6, 8, 1, 3);
  ctx.stroke();
  // 上抛箭头
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-9, -2);
  ctx.lineTo(-9, -9);
  ctx.lineTo(-12, -6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(9, -2);
  ctx.lineTo(9, -9);
  ctx.lineTo(12, -6);
  ctx.stroke();
}

/** 各键的"设计基准半径"，图标与文字按 r/基准 等比放大，避免大键里图标偏小 */
const BASE_R: Record<BtnId, number> = { hit: 33, jump: 26, block: 26, sprint: 23 };
const ALT_OF: Partial<Record<BtnId, BtnSkin>> = { hit: 'spike', jump: 'set' };

/** 按键贴图：烘焙投影 + 上浅下深渐变 + 白描边 + 顶部高光 + 图标 + 文字 */
function buttonTexture(
  skin: BtnSkin,
  baseId: BtnId,
  r: number,
  pressed: boolean,
): { tex: THREE.Texture; size: number } {
  const { color, label } = BTN_STYLE[skin];
  const size = Math.ceil(r * 2 + 24);
  const c = size / 2;
  // UI 贴图跟随设备 DPR 烘焙（DPR3 下 1 贴图像素 = 1 设备像素），文字边缘不再二次放大
  const { canvas, ctx } = createUiCanvas(size, size);
  // 图标/文字随按键尺寸等比放大，视觉上仍然"按键变大、图标也变大"
  const k = r / BASE_R[baseId];

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
  ctx.scale(k, k);
  if (skin === 'hit') iconBall(ctx, color);
  else if (skin === 'spike') iconSpike(ctx, color);
  else if (skin === 'jump') iconJump(ctx);
  else if (skin === 'set') iconSet(ctx);
  else if (skin === 'block') iconBlock(ctx);
  else iconSprint(ctx);
  ctx.restore();

  // 功能文字（图标 + 文字双通道识别）
  ctx.font = `800 ${(11 * k).toFixed(1)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3 * k;
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
  private spikeEdge = false;
  private setupEdge = false;
  /** 网前进攻区：击球键=扣杀、跳跃键=二传（带滞回，避免边界抖动闪烁） */
  private netMode = false;

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

    const safe = Math.min(this.platform.safeBottom, 34);
    // 摇杆视觉不动：仍按"原 1/6 手柄带"的绝对位置摆放，避免右侧改版把左手位带着上移
    const legacyPadH = Math.max(124, H / 6);
    this.joyHome = { x: 76, y: H - legacyPadH + (legacyPadH - safe) * 0.52 };
    this.joyOrigin = { ...this.joyHome };

    const base = joyBaseTexture();
    this.joyBaseSize = base.size;
    this.joyBase = uiSprite(base.tex, base.size, base.size, this.joyHome.x, H - this.joyHome.y, 2);
    const knob = joyKnobTexture();
    this.joyKnobSize = knob.size;
    this.joyKnob = uiSprite(knob.tex, knob.size, knob.size, this.joyHome.x, H - this.joyHome.y, 4);
    this.root.add(this.joyBase, this.joyKnob);

    // ---- 右侧四键：沿右手拇指"从右下向内上"的弧线排布（对角错落，非 2×2 方格）----
    // 底边 = 屏幕底部向内 6px 且避开 home indicator；顶边 = 3D 视口下沿，绝不覆盖球场主体。
    // 尺寸 + 12% 后，四键之间（含命中区）仍保留 ≥2px 净缝，见 docs/ui-clarity-gamepad.md 数值表。
    const bottomLimit = H - safe - 6;
    const yBottom = bottomLimit - 37; // 主键击球中心
    const yTop = yBottom - 66; // 上方两键中心（与主键错开 42px 横向，避免正上正下贴合）

    // 主键最大且最靠右下（拇指自然落点），其余按使用频率递减
    this.addButton('hit', W - 52, yBottom, 37, 6);
    this.addButton('jump', W - 94, yTop, 29, 4);
    this.addButton('block', W - 140, yBottom + 2, 29, 4);
    this.addButton('sprint', W - 160, yTop + 2, 26, 4);

    this.ui.scene.add(this.root);
    this.root.visible = false;
    this.updateVisual();
  }

  private addButton(id: BtnId, x: number, y: number, r: number, hitPad: number): void {
    const normal = buttonTexture(id, id, r, false);
    const pressed = buttonTexture(id, id, r, true);
    const alt = ALT_OF[id];
    const altNormal = alt ? buttonTexture(alt, id, r, false) : undefined;
    const altPressed = alt ? buttonTexture(alt, id, r, true) : undefined;
    const sprite = uiSprite(normal.tex, normal.size, normal.size, x, this.H - y, 4);
    this.root.add(sprite);
    this.btns.push({
      id,
      x,
      y,
      r,
      hitR: r + hitPad,
      sprite,
      size: normal.size,
      texNormal: normal.tex,
      texPressed: pressed.tex,
      texNormalAlt: altNormal?.tex,
      texPressedAlt: altPressed?.tex,
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

  read(world?: World): ControlInput {
    this.refreshNetMode(world);
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
    out.block = this.blockEdge;
    out.blockHeld = this.blockHeld;
    if (this.netMode) {
      // 网前：击球键=扣杀（自动起跳），跳跃键=二传（回传队友）
      out.spike = this.spikeEdge;
      out.setup = this.setupEdge;
    } else {
      out.jump = this.jumpEdge;
      out.hit = this.hitEdge;
      out.hitHeld = this.hitHeld;
    }
    this.jumpEdge = false;
    this.hitEdge = false;
    this.blockEdge = false;
    this.spikeEdge = false;
    this.setupEdge = false;
    return out;
  }

  /** 用玩家与网的距离判定进攻区（不用“是否移动”），带 0.5m 滞回 */
  private refreshNetMode(world?: World): void {
    if (!world) return;
    const p = world.players.find((q) => q.id === world.localPlayerId);
    if (!p) return;
    const ownSide = p.team === 0 ? p.pos.z > -0.4 : p.pos.z < 0.4;
    const distNet = Math.abs(p.pos.z);
    const next =
      world.phase === 'rally' &&
      ownSide &&
      (this.netMode ? distNet <= 3.25 : distNet <= 2.75);
    if (next === this.netMode) return;
    this.netMode = next;
    // 切语义时清掉旧边沿，避免“换皮瞬间误触发”
    this.jumpEdge = false;
    this.hitEdge = false;
    this.hitHeld = false;
    this.spikeEdge = false;
    this.setupEdge = false;
    this.updateVisual();
  }

  private hitButton(x: number, y: number): Btn | null {
    // 命中区比视觉大一圈（拇指容错）；各键命中区之间留有净缝，且击球键排在最前，优先级最高
    for (const b of this.btns) {
      const dx = x - b.x;
      const dy = y - b.y;
      if (dx * dx + dy * dy <= b.hitR * b.hitR) return b;
    }
    return null;
  }

  private press(btn: Btn, down: boolean): void {
    if (btn.id === 'jump') {
      if (down) {
        if (this.netMode) this.setupEdge = true;
        else this.jumpEdge = true;
      }
    } else if (btn.id === 'hit') {
      if (this.netMode) {
        if (down) this.spikeEdge = true;
      } else {
        this.hitHeld = down;
        if (down) this.hitEdge = true;
      }
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
    this.spikeEdge = false;
    this.setupEdge = false;
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
      const alt = this.netMode && b.texNormalAlt !== undefined;
      // 两张贴图常驻复用，直接换 map，不走 setSpriteTexture（它会 dispose 旧贴图）
      const mat = b.sprite.material as THREE.SpriteMaterial;
      mat.map = down
        ? alt
          ? b.texPressedAlt!
          : b.texPressed
        : alt
          ? b.texNormalAlt!
          : b.texNormal;
      mat.needsUpdate = true;
      // 按压反馈：收缩 + 轻微下沉（比只换颜色更明确）
      b.sprite.scale.setScalar(b.size * (down ? 0.86 : 1));
      b.sprite.position.y = this.H - b.y - (down ? 2 : 0);
    }
  }
}
