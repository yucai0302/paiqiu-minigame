import * as THREE from 'three';

import { SAFE_MODE } from '../platform/flags';
import type { TouchPoint } from '../platform/types';
import type { Skill } from '../sim/ai';
import type { TeamId } from '../sim/types';
import type { World } from '../sim/world';
import { createUiCanvas, makeTexture, roundedRect, setSpriteTexture, uiSprite } from './draw';
import type { UiLayer } from './layer';

const FONT = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

interface HitRect {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ScreenHandlers {
  onStart: (skill: Skill) => void;
  onAgain: () => void;
  onHome: () => void;
  onResume: () => void;
}

type Screen = 'none' | 'start' | 'result' | 'pause';

/** 队色：与角色球衣一致 */
const TEAM_GREEN = '#22c55e';
const TEAM_RED = '#e1437a';

const DIFFS: Array<{ id: Skill; label: string; sub: string; desc: string }> = [
  { id: 'easy', label: '简单', sub: '轻松上手', desc: 'AI 反应较慢，适合第一次玩' },
  { id: 'normal', label: '普通', sub: '标准对战', desc: '适中的 AI 强度，适合热身' },
  { id: 'hard', label: '困难', sub: '高强度', desc: 'AI 全速反应，赢球要凭真本事' },
];

/** 竖屏布局常量（390x844 基准，居中排布） */
function layout(W: number, H: number, panelTop: number): Record<string, number> {
  const titleY = panelTop + 66; // 标题 sprite 中心
  return {
    titleY,
    chibiY: titleY + 132, // 两个 Q 版球员
    cardY: titleY + 232, // 难度卡片顶
    cardH: 92,
    descY: titleY + 350,
    ctaY: titleY + 410, // CTA 中心
    hintY: titleY + 462,
    tipsY: titleY + 502, // 图标提示条中心
    ruleY: H - 66,
    verY: H - 28,
    cx: W / 2,
  };
}

function makeSprite(
  scene: THREE.Scene | THREE.Group,
  tex: THREE.Texture,
  w: number,
  h: number,
  x: number,
  yTopDown: number,
  H: number,
  order: number,
): THREE.Sprite {
  return uiSprite(tex, w, h, x, H - yTopDown, order);
}

/** 标题贴图：描边 + 投影 + 微倾斜 + 副标题胶囊 */
function titleTexture(): { tex: THREE.Texture; w: number; h: number } {
  const w = 360;
  const h = 168;
  const { canvas, ctx } = createUiCanvas(w, h, 2);
  const cx = w / 2;

  ctx.save();
  ctx.translate(cx, 62);
  ctx.rotate((-2.4 * Math.PI) / 180);
  ctx.font = `900 62px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  // 投影
  ctx.fillStyle = 'rgba(8,18,32,0.55)';
  ctx.fillText('Q版排球', 4, 7);
  // 描边 + 主体
  ctx.lineWidth = 9;
  ctx.strokeStyle = '#16324a';
  ctx.strokeText('Q版排球', 0, 0);
  const grad = ctx.createLinearGradient(0, -34, 0, 34);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(1, '#bfe8ff');
  ctx.fillStyle = grad;
  ctx.fillText('Q版排球', 0, 0);
  ctx.restore();

  // 副标题胶囊
  roundedRect(ctx, cx - 108, 116, 220, 32, 16);
  ctx.fillStyle = 'rgba(10,19,32,0.62)';
  ctx.fill();
  ctx.fillStyle = '#cfe0f4';
  ctx.font = `600 14px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('2v2 · 7 分制 · 三局两胜', cx + 10, 132);

  return { tex: makeTexture(canvas), w, h };
}

/** Q 版球员小立绘（首页舞台装饰，风格对齐 3D 角色） */
function chibiTexture(kit: string, hair: string, flip: boolean): { tex: THREE.Texture; w: number; h: number } {
  const w = 96;
  const h = 124;
  const { canvas, ctx } = createUiCanvas(w, h, 2);
  const cx = w / 2;
  if (flip) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  }

  // 投影
  ctx.beginPath();
  ctx.ellipse(cx, 116, 26, 7, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(6,14,24,0.4)';
  ctx.fill();

  // 腿
  ctx.fillStyle = '#2c3a4e';
  roundedRect(ctx, cx - 14, 88, 10, 22, 5);
  ctx.fill();
  roundedRect(ctx, cx + 4, 88, 10, 22, 5);
  ctx.fill();
  // 鞋
  ctx.fillStyle = '#ffffff';
  roundedRect(ctx, cx - 17, 104, 15, 8, 4);
  ctx.fill();
  roundedRect(ctx, cx + 2, 104, 15, 8, 4);
  ctx.fill();

  // 身体（球衣）
  roundedRect(ctx, cx - 22, 52, 44, 42, 12);
  ctx.fillStyle = kit;
  ctx.fill();
  // 手臂
  ctx.fillStyle = kit;
  roundedRect(ctx, cx - 32, 56, 12, 26, 6);
  ctx.fill();
  roundedRect(ctx, cx + 20, 56, 12, 26, 6);
  ctx.fill();

  // 头
  ctx.beginPath();
  ctx.arc(cx, 34, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#f8cba6';
  ctx.fill();
  // 头发
  ctx.beginPath();
  ctx.arc(cx, 28, 24, Math.PI * 1.05, Math.PI * 1.95);
  ctx.lineTo(cx + 24, 30);
  ctx.arc(cx, 30, 24, 0.15, Math.PI - 0.15, true);
  ctx.closePath();
  ctx.fillStyle = hair;
  ctx.fill();
  // 眼睛 + 腮红
  ctx.fillStyle = '#23303f';
  ctx.beginPath();
  ctx.arc(cx - 8, 38, 2.6, 0, Math.PI * 2);
  ctx.arc(cx + 8, 38, 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,120,140,0.4)';
  ctx.beginPath();
  ctx.arc(cx - 13, 44, 4, 0, Math.PI * 2);
  ctx.arc(cx + 13, 44, 4, 0, Math.PI * 2);
  ctx.fill();
  // 微笑
  ctx.strokeStyle = '#23303f';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, 42, 6, 0.25, Math.PI - 0.25);
  ctx.stroke();

  return { tex: makeTexture(canvas), w, h };
}

/** 主按钮贴图：队色渐变 + 烘焙投影 + 顶部高光 */
function ctaTexture(label: string, pressed: boolean): { tex: THREE.Texture; w: number; h: number } {
  const w = 280;
  const h = 92;
  const { canvas, ctx } = createUiCanvas(w, h, 2);
  const bx = 10;
  const by = 10;
  const bw = w - 20;
  const bh = 64;

  ctx.beginPath();
  ctx.ellipse(w / 2, by + bh + 12, bw * 0.42, 10, 0, 0, Math.PI * 2);
  ctx.fillStyle = pressed ? 'rgba(4,12,20,0.25)' : 'rgba(4,12,20,0.42)';
  ctx.fill();

  const grad = ctx.createLinearGradient(0, by, 0, by + bh);
  if (pressed) {
    grad.addColorStop(0, '#17a05a');
    grad.addColorStop(1, '#0f8a4c');
  } else {
    grad.addColorStop(0, '#34e187');
    grad.addColorStop(1, '#15b163');
  }
  roundedRect(ctx, bx, by + (pressed ? 3 : 0), bw, bh, bh / 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.stroke();
  if (!pressed) {
    roundedRect(ctx, bx + 8, by + 6, bw - 16, bh * 0.4, bh * 0.2);
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.fill();
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 25px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(10,60,35,0.35)';
  const ty = by + bh / 2 + (pressed ? 3 : 0);
  ctx.strokeText(label, w / 2, ty);
  ctx.fillText(label, w / 2, ty);

  return { tex: makeTexture(canvas), w, h };
}

/** 难度卡片贴图 */
function diffCardTexture(
  d: (typeof DIFFS)[number],
  selected: boolean,
): { tex: THREE.Texture; w: number; h: number } {
  const w = 112;
  const h = 104;
  const { canvas, ctx } = createUiCanvas(w, h, 2);
  const cx = w / 2;

  if (selected) {
    // 发光外圈
    roundedRect(ctx, 0, 0, w, h, 20);
    ctx.fillStyle = 'rgba(52,225,135,0.35)';
    ctx.fill();
  }
  roundedRect(ctx, 4, 4, w - 8, h - 8, 17);
  if (selected) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#34e187');
    grad.addColorStop(1, '#15b163');
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = 'rgba(12,22,36,0.72)';
  }
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = selected ? 'rgba(255,255,255,0.65)' : 'rgba(150,180,215,0.28)';
  ctx.stroke();

  const fg = selected ? '#ffffff' : 'rgba(214,228,244,0.82)';
  const iconColor = selected ? '#0e7a44' : 'rgba(120,220,170,0.9)';

  // 图标：简单=慢球（带尾迹点）、普通=排球、困难=火焰
  ctx.save();
  ctx.translate(cx, 34);
  if (d.id === 'hard') {
    ctx.fillStyle = selected ? '#ffd75e' : '#ff9d4d';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.quadraticCurveTo(10, -4, 8, 6);
    ctx.quadraticCurveTo(6, 14, 0, 14);
    ctx.quadraticCurveTo(-10, 14, -9, 4);
    ctx.quadraticCurveTo(-8, -4, -2, -8);
    ctx.quadraticCurveTo(-3, -2, 1, 1);
    ctx.quadraticCurveTo(4, -4, 0, -14);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = selected ? '#ffffff' : '#e8f2ff';
    ctx.fill();
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, -4);
    ctx.quadraticCurveTo(0, 2, 10, -4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-7, 8);
    ctx.quadraticCurveTo(0, 3, 7, 8);
    ctx.stroke();
    if (d.id === 'easy') {
      ctx.fillStyle = iconColor;
      for (const [dx, dy, r] of [
        [-19, -5, 2.2],
        [-24, -8, 1.6],
        [-28, -11, 1.1],
      ] as const) {
        ctx.beginPath();
        ctx.arc(dx, dy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = fg;
  ctx.font = `800 16px ${FONT}`;
  ctx.fillText(d.label, cx, 66);
  ctx.font = `600 10px ${FONT}`;
  ctx.fillStyle = selected ? 'rgba(255,255,255,0.85)' : 'rgba(150,170,195,0.7)';
  ctx.fillText(d.sub, cx, 84);

  return { tex: makeTexture(canvas), w, h };
}

/** 开始 / 结算 / 暂停 三个全屏面板（Switch 风格：场馆作舞台，面板退为半透明） */
export class Screens {
  private root = new THREE.Group();
  private bg: THREE.Sprite;
  private hits: HitRect[] = [];
  private state: Screen = 'none';
  private skill: Skill = 'normal';
  private readonly panelTop: number;

  // 首页动效元素（仅 transform 动画，不逐帧重绘 canvas，低端机友好）
  private titleSpr: THREE.Sprite | null = null;
  private chibiSpr: THREE.Sprite[] = [];
  private ctaSpr: THREE.Sprite | null = null;
  private ctaTexNormal: THREE.Texture | null = null;
  private ctaTexPressed: THREE.Texture | null = null;
  private ctaPressed = false;
  private diffSpr: THREE.Sprite[] = [];
  private diffTex: THREE.Texture[][] = []; // [i][0=normal,1=selected]
  private diffDescSpr: THREE.Sprite | null = null;
  private t = 0;

  constructor(
    private readonly ui: UiLayer,
    private readonly W: number,
    private readonly H: number,
    private readonly handlers: ScreenHandlers,
    private readonly padH: number,
  ) {
    const blank = createUiCanvas(2, 2, 1);
    this.bg = uiSprite(makeTexture(blank.canvas), 2, 2, W / 2, H / 2, 60);
    this.root.add(this.bg);
    this.root.visible = false;
    ui.scene.add(this.root);
    this.panelTop = Math.max(24, Math.round(H * 0.122));
  }

  get visible(): boolean {
    return this.state !== 'none';
  }

  showStart(skill: Skill): void {
    this.skill = skill;
    this.state = 'start';
    this.root.visible = true;
    this.drawStart();
  }

  showResult(world: World, winner: TeamId, mvp: string): void {
    this.state = 'result';
    this.root.visible = true;
    this.clearFx();
    this.drawResult(world, winner, mvp);
  }

  showPause(): void {
    this.state = 'pause';
    this.root.visible = true;
    this.clearFx();
    this.drawPause();
  }

  hide(): void {
    this.state = 'none';
    this.root.visible = false;
    this.hits = [];
    this.ctaPressed = false;
  }

  /** 每帧驱动：标题呼吸 / CTA 悬浮 / 难度卡片轻弹（安全模式下全部静止） */
  update(dt: number): void {
    if (this.state !== 'start') return;
    this.t += dt;
    if (SAFE_MODE) return;
    const t = this.t;
    if (this.titleSpr) {
      const s = 1 + Math.sin(t * 2) * 0.014;
      this.titleSpr.scale.set(360 * s, 168 * s, 1);
    }
    if (this.ctaSpr && !this.ctaPressed) {
      const s = 1.015 + Math.sin(t * 3.2) * 0.018;
      this.ctaSpr.scale.set(280 * s, 92 * s, 1);
    }
    this.chibiSpr.forEach((spr, i) => {
      const ly = layout(this.W, this.H, this.panelTop);
      spr.position.y = this.H - ly.chibiY + Math.sin(t * 2.2 + i * Math.PI) * 4;
    });
    this.diffSpr.forEach((spr, i) => {
      const selected = DIFFS[i].id === this.skill;
      const s = selected ? 1.1 + Math.sin(t * 2.6) * 0.02 : 1;
      spr.scale.set(112 * s, 104 * s, 1);
    });
  }

  touchStart(points: TouchPoint[]): void {
    if (!this.visible || points.length === 0) return;
    const p = points[0];
    for (const r of this.hits) {
      if (p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) {
        this.activate(r.id, true);
        return;
      }
    }
  }

  touchEnd(points: TouchPoint[]): void {
    if (!this.visible) return;
    if (this.ctaPressed) {
      const p = points[0];
      const hit = p
        ? this.hits.find(
            (r) =>
              (r.id === 'start' || r.id === 'again' || r.id === 'resume') &&
              p.x >= r.x &&
              p.x <= r.x + r.w &&
              p.y >= r.y &&
              p.y <= r.y + r.h,
          )
        : undefined;
      const id = hit?.id;
      this.ctaPressed = false;
      this.refreshCta();
      if (id) this.firePrimary(id);
    }
  }

  private activate(id: string, down: boolean): void {
    if (id.startsWith('diff:')) {
      this.skill = id.slice(5) as Skill;
      this.refreshDiff();
      this.drawStatic(); // 更新选中难度的说明行
      return;
    }
    const isPrimary = id === 'start' || id === 'again' || id === 'resume';
    if (isPrimary && down) {
      // 主按钮改为按下-松手两段式，给明确按压反馈
      this.ctaPressed = true;
      this.refreshCta();
      return;
    }
    if (isPrimary) return; // 松手在 touchEnd 里处理
    if (id === 'home') this.handlers.onHome();
  }

  private firePrimary(id: string): void {
    if (this.state === 'start' && id === 'start') this.handlers.onStart(this.skill);
    else if (this.state === 'result' && id === 'again') this.handlers.onAgain();
    else if (this.state === 'pause' && id === 'resume') this.handlers.onResume();
  }

  // ---------------------------------------------------------------- 首页

  private clearFx(): void {
    for (const s of [this.titleSpr, this.ctaSpr, this.diffDescSpr, ...this.chibiSpr, ...this.diffSpr]) {
      if (s) this.root.remove(s);
    }
    this.titleSpr = null;
    this.ctaSpr = null;
    this.diffDescSpr = null;
    this.chibiSpr = [];
    this.diffSpr = [];
    this.diffTex = [];
    this.ctaTexNormal = null;
    this.ctaTexPressed = null;
  }

  private drawStart(): void {
    this.clearFx();
    this.hits = [];
    this.t = 0;
    const ly = layout(this.W, this.H, this.panelTop);

    // 标题
    const title = titleTexture();
    this.titleSpr = makeSprite(this.root, title.tex, title.w, title.h, ly.cx, ly.titleY, this.H, 62);
    this.root.add(this.titleSpr);

    // Q 版球员舞台装饰
    const c0 = chibiTexture(TEAM_GREEN, '#2e2622', false);
    const c1 = chibiTexture(TEAM_RED, '#c9932f', true);
    for (const [tex, x] of [
      [c0, ly.cx - 108],
      [c1, ly.cx + 108],
    ] as const) {
      const spr = makeSprite(this.root, tex.tex, tex.w, tex.h, x, ly.chibiY, this.H, 62);
      this.chibiSpr.push(spr);
      this.root.add(spr);
    }

    // 难度卡片
    DIFFS.forEach((d, i) => {
      const n = diffCardTexture(d, false);
      const s = diffCardTexture(d, true);
      this.diffTex.push([n.tex, s.tex]);
      const x = ly.cx + (i - 1) * 122;
      const spr = makeSprite(this.root, n.tex, n.w, n.h, x, ly.cardY + ly.cardH / 2, this.H, 62);
      const mat = spr.material as THREE.SpriteMaterial;
      mat.opacity = i === 1 ? 1 : 0.85;
      this.diffSpr.push(spr);
      this.root.add(spr);
      this.hits.push({ id: `diff:${d.id}`, x: x - 56, y: ly.cardY, w: 112, h: ly.cardH });
    });
    this.refreshDiff();

    // CTA
    const ctaN = ctaTexture(this.state === 'start' ? '开始比赛' : '再来一局', false);
    const ctaP = ctaTexture(this.state === 'start' ? '开始比赛' : '再来一局', true);
    this.ctaTexNormal = ctaN.tex;
    this.ctaTexPressed = ctaP.tex;
    this.ctaSpr = makeSprite(this.root, ctaN.tex, ctaN.w, ctaN.h, ly.cx, ly.ctaY, this.H, 62);
    this.root.add(this.ctaSpr);
    this.hits.push({ id: 'start', x: ly.cx - 140, y: ly.ctaY - 46, w: 280, h: 92 });

    this.drawStatic();
  }

  /** 静态层：暗化罩、VS、引导语、图标提示条、规则、版本（仅在进入/切换难度时重绘） */
  private drawStatic(): void {
    const ly = layout(this.W, this.H, this.panelTop);
    const { canvas, ctx } = createUiCanvas(this.W, this.H, 1.5);

    // 轻暗化：保住场馆舞台感
    ctx.fillStyle = 'rgba(6,14,26,0.38)';
    ctx.fillRect(0, 0, this.W, this.H);
    // 上下渐晕收拢视线
    const vig = ctx.createLinearGradient(0, 0, 0, this.H);
    vig.addColorStop(0, 'rgba(5,12,22,0.5)');
    vig.addColorStop(0.28, 'rgba(5,12,22,0)');
    vig.addColorStop(0.8, 'rgba(5,12,22,0)');
    vig.addColorStop(1, 'rgba(5,12,22,0.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, this.W, this.H);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // VS
    ctx.font = `900 26px ${FONT}`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#16324a';
    ctx.strokeText('VS', ly.cx, ly.chibiY - 6);
    ctx.fillStyle = '#ffd75e';
    ctx.fillText('VS', ly.cx, ly.chibiY - 6);

    // 难度标签 + 选中说明
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9db2c9';
    ctx.font = `700 13px ${FONT}`;
    ctx.fillText('选择难度', ly.cx - 168, ly.cardY - 16);
    ctx.textAlign = 'center';
    ctx.font = `600 12.5px ${FONT}`;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(5,12,22,0.8)';
    const d = DIFFS.find((q) => q.id === this.skill) ?? DIFFS[1];
    ctx.strokeText(d.desc, ly.cx, ly.descY);
    ctx.fillStyle = '#b9cbdf';
    ctx.fillText(d.desc, ly.cx, ly.descY);

    // CTA 引导语
    ctx.font = `600 12.5px ${FONT}`;
    ctx.strokeText('点击开始 · 你是绿队 01', ly.cx, ly.hintY);
    ctx.fillStyle = 'rgba(214,232,246,0.85)';
    ctx.fillText('点击开始 · 你是绿队 01', ly.cx, ly.hintY);

    // 操作提示条：图标 + 短标签
    const tips: Array<{ label: string; draw: (g: CanvasRenderingContext2D, x: number, y: number) => void }> = [
      { label: '移动', draw: (g, x, y) => this.iconStick(g, x, y) },
      { label: '击球·发球', draw: (g, x, y) => this.iconBall(g, x, y) },
      { label: '跳跃', draw: (g, x, y) => this.iconJump(g, x, y) },
      { label: '拦网', draw: (g, x, y) => this.iconBlock(g, x, y) },
      { label: '冲刺', draw: (g, x, y) => this.iconSprint(g, x, y) },
    ];
    tips.forEach((tip, i) => {
      const x = ly.cx + (i - 2) * 75;
      ctx.beginPath();
      ctx.arc(x, ly.tipsY, 17, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(12,22,36,0.66)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(150,180,215,0.35)';
      ctx.stroke();
      tip.draw(ctx, x, ly.tipsY);
      ctx.font = `600 10.5px ${FONT}`;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(5,12,22,0.8)';
      ctx.strokeText(tip.label, x, ly.tipsY + 30);
      ctx.fillStyle = '#a9bdd2';
      ctx.fillText(tip.label, x, ly.tipsY + 30);
    });

    // 规则短句
    ctx.fillStyle = '#8ca1b8';
    ctx.font = `600 11.5px ${FONT}`;
    ctx.fillText('每队最多三次触球 · 先得 7 分 · 三局两胜', ly.cx, ly.ruleY);

    // 版本行
    ctx.fillStyle = 'rgba(140,161,184,0.55)';
    ctx.font = `600 10.5px ${FONT}`;
    ctx.fillText('微信小游戏 · 竖屏手柄版', ly.cx, ly.verY);

    setSpriteTexture(this.bg, makeTexture(canvas));
    this.bg.scale.set(this.W, this.H, 1);
  }

  private refreshDiff(): void {
    this.diffSpr.forEach((spr, i) => {
      const selected = DIFFS[i].id === this.skill;
      const mat = spr.material as THREE.SpriteMaterial;
      mat.map = this.diffTex[i][selected ? 1 : 0];
      mat.needsUpdate = true;
      mat.opacity = selected ? 1 : 0.85;
      if (SAFE_MODE) {
        const s = selected ? 1.1 : 1;
        spr.scale.set(112 * s, 104 * s, 1);
      }
    });
  }

  private refreshCta(): void {
    if (!this.ctaSpr || !this.ctaTexNormal || !this.ctaTexPressed) return;
    const mat = this.ctaSpr.material as THREE.SpriteMaterial;
    mat.map = this.ctaPressed ? this.ctaTexPressed : this.ctaTexNormal;
    mat.needsUpdate = true;
    const s = this.ctaPressed ? 0.93 : 1;
    this.ctaSpr.scale.set(280 * s, 92 * s, 1);
  }

  // ---------------------------------------------------------------- 结算 / 暂停（深色玻璃面板）

  private overlay(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    this.hits = [];
    const { canvas, ctx } = createUiCanvas(this.W, this.H, 1.5);
    ctx.fillStyle = 'rgba(6,14,26,0.55)';
    ctx.fillRect(0, 0, this.W, this.H);
    return { canvas, ctx };
  }

  private glassPanel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
    roundedRect(ctx, x + 3, y + 8, w, h, 24);
    ctx.fillStyle = 'rgba(4,10,18,0.35)';
    ctx.fill();
    roundedRect(ctx, x, y, w, h, 24);
    ctx.fillStyle = 'rgba(11,20,34,0.88)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(140,175,220,0.3)';
    ctx.stroke();
  }

  private drawResult(world: World, winner: TeamId, mvp: string): void {
    const { canvas, ctx } = this.overlay();
    const cx = this.W / 2;
    const y = Math.round((this.H - 420) / 2);
    this.glassPanel(ctx, 34, y, 322, 420);

    const win = winner === world.humanTeam;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = win ? '#3ce78c' : '#ff6b8a';
    ctx.font = `900 40px ${FONT}`;
    ctx.fillText(win ? '胜利！' : '惜败', cx, y + 74);
    ctx.fillStyle = '#9db2c9';
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText(win ? '配合默契，再来一局？' : '差一点，调整节奏再战', cx, y + 116);

    ctx.fillStyle = '#ffffff';
    ctx.font = `900 54px ${FONT}`;
    ctx.fillText(`${world.setsWon[0]} : ${world.setsWon[1]}`, cx, y + 196);

    ctx.fillStyle = '#8ca1b8';
    ctx.font = `600 14px ${FONT}`;
    ctx.fillText(mvp ? `MVP · ${mvp}` : '', cx, y + 248);

    const again = ctaTexture('再来一局', false);
    const spr = makeSprite(this.root, again.tex, again.w, again.h, cx, y + 306, this.H, 62);
    this.root.add(spr);
    this.ctaSpr = spr;
    this.ctaTexNormal = again.tex;
    this.ctaTexPressed = ctaTexture('再来一局', true).tex;
    this.hits.push({ id: 'again', x: cx - 140, y: y + 260, w: 280, h: 92 });

    this.ghostButton(ctx, 'home', cx - 110, y + 356, 220, 46, '返回大厅');
    setSpriteTexture(this.bg, makeTexture(canvas));
    this.bg.scale.set(this.W, this.H, 1);
  }

  private drawPause(): void {
    const { canvas, ctx } = this.overlay();
    const y = Math.round((this.H - 300) / 2);
    this.glassPanel(ctx, 45, y, 300, 300);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e8f0ff';
    ctx.font = `900 32px ${FONT}`;
    ctx.fillText('暂停', this.W / 2, y + 64);

    const resume = ctaTexture('继续比赛', false);
    const spr = makeSprite(this.root, resume.tex, resume.w, resume.h, this.W / 2, y + 146, this.H, 62);
    this.root.add(spr);
    this.ctaSpr = spr;
    this.ctaTexNormal = resume.tex;
    this.ctaTexPressed = ctaTexture('继续比赛', true).tex;
    this.hits.push({ id: 'resume', x: this.W / 2 - 140, y: y + 100, w: 280, h: 92 });

    this.ghostButton(ctx, 'home', this.W / 2 - 110, y + 208, 220, 46, '返回大厅');
    setSpriteTexture(this.bg, makeTexture(canvas));
    this.bg.scale.set(this.W, this.H, 1);
  }

  private ghostButton(
    ctx: CanvasRenderingContext2D,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
  ): void {
    roundedRect(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = 'rgba(120,150,190,0.16)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(140,175,220,0.35)';
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#b9cbdf';
    ctx.font = `700 15px ${FONT}`;
    ctx.fillText(label, x + w / 2, y + h / 2);
    this.hits.push({ id, x, y, w, h });
  }

  // ---------------------------------------------------------------- 提示条小图标

  private iconStick(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.strokeStyle = '#9fd8ff';
    g.lineWidth = 1.6;
    g.beginPath();
    g.arc(x, y, 9, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.arc(x, y, 3.4, 0, Math.PI * 2);
    g.fillStyle = '#34e187';
    g.fill();
  }

  private iconBall(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.beginPath();
    g.arc(x, y, 8, 0, Math.PI * 2);
    g.fillStyle = '#ffffff';
    g.fill();
    g.strokeStyle = '#ff5d73';
    g.lineWidth = 1.6;
    g.beginPath();
    g.moveTo(x - 7, y - 2);
    g.quadraticCurveTo(x, y + 2, x + 7, y - 2);
    g.stroke();
  }

  private iconJump(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.strokeStyle = '#7cc9ff';
    g.lineWidth = 2.2;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    for (const dy of [2, -4]) {
      g.beginPath();
      g.moveTo(x - 5, y + dy + 3);
      g.lineTo(x, y + dy - 3);
      g.lineTo(x + 5, y + dy + 3);
      g.stroke();
    }
  }

  private iconBlock(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.strokeStyle = '#b9a7ff';
    g.lineWidth = 1.8;
    roundedRect(g, x - 7, y - 5, 14, 10, 2);
    g.stroke();
    g.beginPath();
    g.moveTo(x, y - 5);
    g.lineTo(x, y + 5);
    g.moveTo(x - 7, y);
    g.lineTo(x + 7, y);
    g.stroke();
  }

  private iconSprint(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.strokeStyle = '#ffd75e';
    g.lineWidth = 2;
    g.lineCap = 'round';
    for (const [dy, len] of [
      [-4, 9],
      [1, 12],
      [6, 8],
    ] as const) {
      g.beginPath();
      g.moveTo(x - 8, y + dy);
      g.lineTo(x - 8 + len, y + dy);
      g.stroke();
    }
  }
}
