import * as THREE from 'three';

import { clamp } from '../core/math';
import type { Platform, TouchPoint } from '../platform/types';
import type { ControlInput } from '../sim/types';
import { emptyInput } from '../sim/types';
import { textTexture, uiSprite } from './draw';
import type { UiLayer } from './layer';

type BtnId = 'jump' | 'hit' | 'block' | 'sprint';

interface Btn {
  id: BtnId;
  x: number;
  y: number;
  r: number;
  color: number;
  label: string;
  mesh: THREE.Mesh;
  ring: THREE.Mesh;
  text: THREE.Sprite;
  textW: number;
  textH: number;
  pointer: number;
}

const PAD_BG = 0xedf2f8;

/** 底部手柄：左摇杆 + 右侧四键，直接产出 ControlInput */
export class Gamepad {
  private root = new THREE.Group();
  private btns: Btn[] = [];

  private joyBase: THREE.Mesh;
  private joyShadow: THREE.Mesh;
  private joyRing: THREE.Mesh;
  private joyKnob: THREE.Mesh;
  private joyKnobRing: THREE.Mesh;
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

    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(W, padH),
      new THREE.MeshBasicMaterial({ color: PAD_BG, depthTest: false, depthWrite: false, side: THREE.DoubleSide }),
    );
    bg.position.set(W / 2, H - (this.y0 + padH / 2), 0);
    bg.renderOrder = 0;
    this.root.add(bg);

    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(W, 1),
      new THREE.MeshBasicMaterial({ color: 0xd8e2ef, depthTest: false, depthWrite: false, side: THREE.DoubleSide }),
    );
    line.position.set(W / 2, H - this.y0, 0);
    line.renderOrder = 1;
    this.root.add(line);

    const safe = Math.min(this.platform.safeBottom, 30);
    this.joyHome = { x: 72, y: this.y0 + (padH - safe) * 0.52 };
    this.joyOrigin = { ...this.joyHome };

    this.joyBase = this.circle(46, 0xffffff, 0.95, 2);
    this.joyShadow = this.ring(46, 54, 0xc6d6e8, 0.42, 2);
    this.joyRing = this.ring(43, 46.5, 0xc9d7e8, 0.95, 3);
    this.joyKnob = this.circle(21, 0xffffff, 1, 4);
    this.joyKnobRing = this.ring(18.5, 21, 0x8aa3bf, 1, 5);
    this.root.add(
      this.joyBase,
      this.joyShadow,
      this.joyRing,
      this.joyKnob,
      this.joyKnobRing,
    );

    const contentH = padH - 8 - safe;
    const rowTop = this.y0 + contentH * 0.3;
    const rowBottom = this.y0 + contentH * 0.74;
    const colRight = W - 64;
    const colLeft = W - 134;

    this.addButton('hit', colRight, rowBottom, 30, 0xff6b8a, '击球');
    this.addButton('jump', colRight, rowTop, 23, 0x4aa3ff, '跳跃');
    this.addButton('block', colLeft, rowBottom, 24, 0x7c6cff, '拦网');
    this.addButton('sprint', colLeft, rowTop, 21, 0xffab2e, '冲刺');

    this.ui.scene.add(this.root);
    this.root.visible = false;
    this.updateVisual();
  }

  private circle(r: number, color: number, opacity: number, order: number): THREE.Mesh {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(r, 48),
      new THREE.MeshBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    mesh.renderOrder = order;
    return mesh;
  }

  private ring(
    inner: number,
    outer: number,
    color: number,
    opacity: number,
    order: number,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(inner, outer, 48),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    mesh.renderOrder = order;
    return mesh;
  }

  private addButton(id: BtnId, x: number, y: number, r: number, color: number, label: string): void {
    const mesh = this.circle(r, color, 1, 4);
    mesh.position.set(x, this.H - y, 0);
    const ring = this.ring(r - 2.5, r, 0xffffff, 0.55, 5);
    ring.position.set(x, this.H - y, 0);
    const text = textTexture(label, { fontSize: 15, weight: 800, color: '#ffffff', pad: 2 });
    const sprite = uiSprite(text.tex, text.width, text.height, x, this.H - y, 6);
    this.root.add(mesh, ring, sprite);
    this.btns.push({
      id,
      x,
      y,
      r,
      color,
      label,
      mesh,
      ring,
      text: sprite,
      textW: text.width,
      textH: text.height,
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
    const wy = this.H - baseY;
    const wky = this.H - ky;
    this.joyBase.position.set(baseX, wy, 0);
    this.joyShadow.position.set(baseX, wy, 0);
    this.joyRing.position.set(baseX, wy, 0);
    this.joyKnob.position.set(kx, wky, 0);
    this.joyKnobRing.position.set(kx, wky, 0);

    for (const b of this.btns) {
      const down = b.pointer >= 0;
      b.mesh.scale.setScalar(down ? 0.92 : 1);
      b.ring.scale.setScalar(down ? 0.92 : 1);
      b.text.scale.set(
        b.textW * (down ? 0.92 : 1),
        b.textH * (down ? 0.92 : 1),
        1,
      );
      (b.mesh.material as THREE.MeshBasicMaterial).color.setHex(
        down ? lighten(b.color) : b.color,
      );
    }
  }
}

function lighten(hex: number): number {
  const r = Math.min(255, ((hex >> 16) & 0xff) + 26);
  const g = Math.min(255, ((hex >> 8) & 0xff) + 26);
  const b = Math.min(255, (hex & 0xff) + 26);
  return (r << 16) | (g << 8) | b;
}
