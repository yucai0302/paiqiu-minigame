import * as THREE from 'three';
import { uiTextureScale } from '../platform/resolution';

const FONT_STACK = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

export interface UiCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** 画布像素 / CSS 像素 */
  scale: number;
}

/** 以 CSS 尺寸建画布，内部按分辨率策略的 UI 倍率放大，保证与设备像素对齐 */
export function createUiCanvas(width: number, height: number, scale = uiTextureScale()): UiCanvas {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.scale(scale, scale);
  return { canvas, ctx, scale };
}

export function makeTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

export function uiSprite(
  tex: THREE.Texture,
  width: number,
  height: number,
  x: number,
  y: number,
  order = 1,
): THREE.Sprite {
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(width, height, 1);
  sprite.position.set(x, y, 0);
  sprite.renderOrder = order;
  return sprite;
}

export function setSpriteTexture(sprite: THREE.Sprite, tex: THREE.Texture): void {
  const mat = sprite.material as THREE.SpriteMaterial;
  mat.map?.dispose();
  mat.map = tex;
  mat.needsUpdate = true;
}

export function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export interface TextOptions {
  fontSize?: number;
  weight?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
  pad?: number;
  scale?: number;
}

export function textTexture(
  text: string,
  opts: TextOptions = {},
): { tex: THREE.CanvasTexture; width: number; height: number } {
  const fontSize = opts.fontSize ?? 16;
  const weight = opts.weight ?? 700;
  const pad = opts.pad ?? 4;
  const scale = opts.scale ?? uiTextureScale();
  const font = `${weight} ${fontSize}px ${FONT_STACK}`;

  const probe = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
  probe.font = font;
  const width = Math.ceil(probe.measureText(text).width) + pad * 2;
  const height = Math.ceil(fontSize * 1.35) + pad * 2;

  const { canvas, ctx } = createUiCanvas(width, height, scale);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  if (opts.stroke && opts.strokeWidth) {
    ctx.lineWidth = opts.strokeWidth;
    ctx.strokeStyle = opts.stroke;
    ctx.strokeText(text, width / 2, height / 2);
  }
  ctx.fillStyle = opts.color ?? '#ffffff';
  ctx.fillText(text, width / 2, height / 2);

  return { tex: makeTexture(canvas), width, height };
}
