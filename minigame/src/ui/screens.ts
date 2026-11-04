import * as THREE from 'three';

import { SAFE_MODE } from '../platform/flags';
import { layerTextureScale } from '../platform/resolution';
import type { TouchPoint } from '../platform/types';
import type { Skill } from '../sim/ai';
import type { TeamId } from '../sim/types';
import type { World } from '../sim/world';
import { createUiCanvas, makeTexture, roundedRect, setSpriteTexture, uiSprite } from './draw';
import type { UiCanvas } from './draw';
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
  /** 首页「邀请好友」入口 */
  onInvite: () => void;
  /** 房间页「邀请微信好友」分享按钮 */
  onShare: () => void;
  /** 房主「立即开始 · AI 补位」 */
  onHostStart: () => void;
  /** 退出房间 / 断网面板返回大厅 */
  onRoomExit: () => void;
  /** 断网面板「重新连接」 */
  onReconnect: () => void;
  /** 进场/渲染出错面板「重试」 */
  onFatalRetry: () => void;
}

type Screen = 'none' | 'start' | 'result' | 'pause' | 'room' | 'netdown' | 'fatal';

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
    pillY: titleY + 490, // 邀请好友胶囊中心
    tipsY: titleY + 530, // 图标提示条中心
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
  // 标题/立绘/CTA/难度卡：跟设备 DPR 烘焙（默认 uiTextureScale），避免 2x 贴图在 DPR3 上被放大 1.5x
  const { canvas, ctx } = createUiCanvas(w, h);
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
  ctx.fillText('弹弹排球', 4, 7);
  // 描边 + 主体
  ctx.lineWidth = 9;
  ctx.strokeStyle = '#16324a';
  ctx.strokeText('弹弹排球', 0, 0);
  const grad = ctx.createLinearGradient(0, -34, 0, 34);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(1, '#bfe8ff');
  ctx.fillStyle = grad;
  ctx.fillText('弹弹排球', 0, 0);
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
  // 标题/立绘/CTA/难度卡：跟设备 DPR 烘焙（默认 uiTextureScale），避免 2x 贴图在 DPR3 上被放大 1.5x
  const { canvas, ctx } = createUiCanvas(w, h);
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
  // 标题/立绘/CTA/难度卡：跟设备 DPR 烘焙（默认 uiTextureScale），避免 2x 贴图在 DPR3 上被放大 1.5x
  const { canvas, ctx } = createUiCanvas(w, h);
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
  // 标题/立绘/CTA/难度卡：跟设备 DPR 烘焙（默认 uiTextureScale），避免 2x 贴图在 DPR3 上被放大 1.5x
  const { canvas, ctx } = createUiCanvas(w, h);
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
  state: Screen = 'none';
  private skill: Skill = 'normal';
  private readonly panelTop: number;
  /**
   * 全屏 2D 层（首页静态层 / 房间 / 结算 / 暂停共用一张画布 + 一张贴图）。
   * 只建一次、原地重绘 + needsUpdate：DPR3 下单张 390×844 约 11.8MB，
   * 频繁切页面若每次新建 canvas 会造成明显 GC 抖动。
   */
  private layer: UiCanvas | null = null;
  private layerTex: THREE.CanvasTexture | null = null;

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

  // 房间 / 断网 / 提示
  private toastSpr: THREE.Sprite | null = null;
  private toastT = 0;
  private resultMode: 'local' | 'host' | 'guest' = 'local';
  private roomPid: 0 | 1 = 0;
  private roomId = '';
  private roomPlayers: Array<{ pid: number; name: string }> = [];
  private netDownMsg = '';
  private netCanReconnect = true;
  private fatalTitle = '';
  private fatalMsg = '';

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

  /** 每帧驱动：Toast 淡出；标题呼吸 / CTA 悬浮 / 难度卡片轻弹（安全模式下全部静止） */
  update(dt: number): void {
    this.t += dt;
    if (this.toastT > 0 && this.toastSpr) {
      this.toastT -= dt;
      const mat = this.toastSpr.material as THREE.SpriteMaterial;
      mat.opacity = Math.min(1, Math.max(0, this.toastT / 0.45));
      if (this.toastT <= 0) this.toastSpr.visible = false;
    }
    if (this.state !== 'start' || SAFE_MODE) return;
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
    if (id === 'invite') {
      this.handlers.onInvite();
      return;
    }
    if (id === 'share') {
      this.handlers.onShare();
      return;
    }
    if (id === 'hostStart') {
      this.handlers.onHostStart();
      return;
    }
    if (id === 'roomCancel' || id === 'netHome') {
      this.handlers.onRoomExit();
      return;
    }
    if (id === 'reconn') {
      this.handlers.onReconnect();
      return;
    }
    if (id === 'fatalRetry') {
      this.handlers.onFatalRetry();
      return;
    }
    if (id === 'fatalHome') {
      this.handlers.onRoomExit();
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
    this.hits.push({ id: 'invite', x: ly.cx - 113, y: ly.pillY - 23, w: 226, h: 46 });

    this.drawStatic();
  }

  /** 取全屏层的 2D 上下文：首次建画布/贴图，之后只清屏复用 */
  private layerCanvas(): CanvasRenderingContext2D {
    if (!this.layer) {
      this.layer = createUiCanvas(this.W, this.H, layerTextureScale());
      const mat = this.bg.material as THREE.SpriteMaterial;
      mat.map?.dispose();
      this.layerTex = makeTexture(this.layer.canvas);
      mat.map = this.layerTex;
      mat.needsUpdate = true;
      this.bg.scale.set(this.W, this.H, 1);
    }
    const ctx = this.layer.ctx;
    ctx.setTransform(this.layer.scale, 0, 0, this.layer.scale, 0, 0);
    ctx.clearRect(0, 0, this.W, this.H);
    return ctx;
  }

  private commitLayer(): void {
    if (!this.layer || !this.layerTex) return;
    this.layerTex.needsUpdate = true;
    this.bg.scale.set(this.W, this.H, 1);
  }

  /** 静态层：暗化罩、VS、引导语、图标提示条、规则、版本（仅在进入/切换难度时重绘） */
  private drawStatic(): void {
    const ly = layout(this.W, this.H, this.panelTop);
    const ctx = this.layerCanvas();

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

    // 邀请好友入口：珊瑚描边胶囊 + 双人小图标，与单人 CTA 拉开层级
    const pw = 226;
    const phh = 46;
    const px = ly.cx - pw / 2;
    const py = ly.pillY - phh / 2;
    roundedRect(ctx, px, py, pw, phh, phh / 2);
    ctx.fillStyle = 'rgba(255,93,115,0.20)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,130,150,0.8)';
    ctx.stroke();
    for (const [ox, alpha] of [
      [-7, 1],
      [8, 0.55],
    ] as const) {
      const ax = px + 38 + ox;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ffd6de';
      ctx.beginPath();
      ctx.arc(ax, py + 17, 5.4, 0, Math.PI * 2);
      ctx.fill();
      roundedRect(ctx, ax - 7.5, py + 24, 15, 11, 5.5);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.font = `800 15.5px ${FONT}`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(5,12,22,0.75)';
    ctx.strokeText('邀请好友 · 2人组队', px + pw / 2 + 14, ly.pillY);
    ctx.fillStyle = '#ffe6ec';
    ctx.fillText('邀请好友 · 2人组队', px + pw / 2 + 14, ly.pillY);

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

    this.commitLayer();
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

  // ---------------------------------------------------------------- 房间 / 断网 / 提示

  setResultMode(m: 'local' | 'host' | 'guest'): void {
    this.resultMode = m;
  }

  /** 顶部小 toast（仅覆盖层可见时展示） */
  toast(text: string): void {
    const { canvas, ctx } = createUiCanvas(360, 52, 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    let fontSize = 14.5;
    ctx.font = `700 ${fontSize}px ${FONT}`;
    if (ctx.measureText(text).width > 300) {
      // 超长文案自动缩字号，避免提示被截断
      fontSize = 12;
      ctx.font = `700 ${fontSize}px ${FONT}`;
    }
    const bw = Math.min(344, ctx.measureText(text).width + 44);
    roundedRect(ctx, 180 - bw / 2, 8, bw, 36, 18);
    ctx.fillStyle = 'rgba(9,16,28,0.92)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(140,175,220,0.4)';
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(5,12,22,0.8)';
    ctx.strokeText(text, 180, 27);
    ctx.fillStyle = '#e6eefb';
    ctx.fillText(text, 180, 27);
    const tex = makeTexture(canvas);
    if (!this.toastSpr) {
      this.toastSpr = uiSprite(tex, 360, 52, this.W / 2, this.H - 262, 70);
      this.root.add(this.toastSpr);
    } else {
      setSpriteTexture(this.toastSpr, tex);
    }
    (this.toastSpr.material as THREE.SpriteMaterial).opacity = 1;
    this.toastSpr.visible = true;
    this.toastT = 2.4;
  }

  showRoom(pid: 0 | 1, roomId: string, players: Array<{ pid: number; name: string }>): void {
    this.state = 'room';
    this.root.visible = true;
    this.roomPid = pid;
    this.roomId = roomId;
    this.roomPlayers = players;
    this.clearFx();
    this.drawRoom();
  }

  updateRoom(players: Array<{ pid: number; name: string }>): void {
    if (this.state !== 'room') return;
    this.roomPlayers = players;
    this.drawRoom();
  }

  showNetDown(msg: string, canReconnect: boolean): void {
    this.state = 'netdown';
    this.root.visible = true;
    this.netDownMsg = msg;
    this.netCanReconnect = canReconnect;
    this.clearFx();
    this.drawNetDown();
  }

  /** 进场失败 / 渲染中断：可读错误 + 重试 / 返回首页，绝不静默停住 */
  showFatal(title: string, msg: string): void {
    this.state = 'fatal';
    this.root.visible = true;
    this.fatalTitle = title;
    this.fatalMsg = msg;
    this.clearFx();
    this.drawFatal();
  }

  private drawFatal(): void {
    const { ctx } = this.overlay();
    ctx.fillStyle = 'rgba(4,9,16,0.34)';
    ctx.fillRect(0, 0, this.W, this.H);
    const cx = this.W / 2;
    const pw = 310;
    const ph = 300;
    const x = (this.W - pw) / 2;
    const y = Math.round((this.H - ph) / 2);
    this.glassPanel(ctx, x, y, pw, ph);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 22px ${FONT}`;
    ctx.fillStyle = '#ff8a9a';
    ctx.fillText(this.fatalTitle.slice(0, 16), cx, y + 46);

    const lines = this.wrapFatal(this.fatalMsg);
    ctx.font = `600 12.5px ${FONT}`;
    ctx.fillStyle = '#b9cbdf';
    lines.slice(0, 6).forEach((ln, i) => ctx.fillText(ln, cx, y + 82 + i * 20));

    this.candyButton(
      ctx,
      'fatalRetry',
      cx,
      y + 210,
      200,
      46,
      '重试',
      'rgba(52,225,135,0.75)',
      'rgba(52,225,135,0.14)',
      '#d5ffe8',
      16,
    );
    this.candyButton(
      ctx,
      'fatalHome',
      cx,
      y + 262,
      180,
      34,
      '返回首页',
      'rgba(150,175,210,0.35)',
      'rgba(0,0,0,0)',
      '#c6d6ea',
      13,
    );
    this.commitLayer();
  }

  private wrapFatal(msg: string): string[] {
    const out: string[] = [];
    for (const raw of (msg || '未知错误').split('\n')) {
      let line = '';
      for (const ch of raw) {
        line += ch;
        if (line.length >= 24) {
          out.push(line);
          line = '';
        }
      }
      if (line) out.push(line);
    }
    return out;
  }

  /** 糖果描边按钮（房间/断网面板通用） */
  private candyButton(
    ctx: CanvasRenderingContext2D,
    id: string,
    cx: number,
    cy: number,
    w: number,
    h: number,
    label: string,
    stroke: string,
    fill: string,
    text: string,
    fontSize = 15,
  ): void {
    roundedRect(ctx, cx - w / 2, cy - h / 2, w, h, h / 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.font = `800 ${fontSize}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = text;
    ctx.fillText(label, cx, cy + 0.5);
    this.hits.push({ id, x: cx - w / 2, y: cy - h / 2, w, h });
  }

  private drawRoom(): void {
    const { ctx } = this.overlay();
    const cx = this.W / 2;
    const pw = 322;
    const ph = 420;
    const x = (this.W - pw) / 2;
    const y = Math.round((this.H - ph) / 2 - 16);
    this.glassPanel(ctx, x, y, pw, ph);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 24px ${FONT}`;
    ctx.fillStyle = '#e8f0ff';
    ctx.fillText('好友组队房', cx, y + 46);

    ctx.font = `700 11.5px ${FONT}`;
    ctx.fillStyle = '#8ca1b8';
    ctx.fillText('房间号 · 发给好友即可进房', cx, y + 78);

    ctx.font = `900 30px ${FONT}`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(9,26,44,0.7)';
    ctx.strokeText(this.roomId, cx, y + 110);
    ctx.fillStyle = '#ffd75e';
    ctx.fillText(this.roomId, cx, y + 110);

    // 阵容位（房主/好友），空位虚线等待
    for (let i = 0; i < 2; i++) {
      const ry = y + 148 + i * 58;
      const rx = x + 24;
      const rw = pw - 48;
      const p = this.roomPlayers.find((q) => q.pid === i);
      if (p) {
        roundedRect(ctx, rx, ry, rw, 46, 14);
        ctx.fillStyle = i === 0 ? 'rgba(34,197,94,0.14)' : 'rgba(255,93,115,0.12)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = i === 0 ? 'rgba(110,231,160,0.55)' : 'rgba(255,150,170,0.45)';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(rx + 30, ry + 23, 14, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = i === 0 ? TEAM_GREEN : '#ff5d73';
        ctx.stroke();
        ctx.font = `800 13px ${FONT}`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(p.name.slice(0, 1), rx + 30, ry + 24);
        ctx.textAlign = 'left';
        ctx.font = `800 15px ${FONT}`;
        ctx.fillStyle = '#e6eefb';
        ctx.fillText(p.name.slice(0, 8), rx + 52, ry + 19);
        ctx.font = `600 10.5px ${FONT}`;
        ctx.fillStyle = i === 0 ? '#7ce8a8' : '#ffb3c2';
        ctx.fillText(i === 0 ? '房主' : '已就绪', rx + 52, ry + 35);
        ctx.textAlign = 'center';
      } else {
        roundedRect(ctx, rx, ry, rw, 46, 14);
        ctx.fillStyle = 'rgba(12,22,36,0.4)';
        ctx.fill();
        ctx.setLineDash([6, 5]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(130,150,180,0.4)';
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = `600 13px ${FONT}`;
        ctx.fillStyle = '#75879d';
        ctx.fillText('等待好友加入…', cx, ry + 23);
      }
    }

    const isHost = this.roomPid === 0;
    if (isHost) {
      this.candyButton(
        ctx,
        'share',
        cx,
        y + 300,
        216,
        46,
        '邀请微信好友',
        'rgba(52,225,135,0.75)',
        'rgba(52,225,135,0.14)',
        '#d5ffe8',
        16,
      );
      if (this.roomPlayers.length < 2) {
        this.candyButton(
          ctx,
          'hostStart',
          cx,
          y + 352,
          190,
          40,
          '立即开始 · AI 补位',
          'rgba(160,190,230,0.45)',
          'rgba(150,180,215,0.08)',
          '#c6d6ea',
          13,
        );
      } else {
        ctx.font = `600 12.5px ${FONT}`;
        ctx.fillStyle = '#9db2c9';
        ctx.fillText('已满员 · 即将开局', cx, y + 352);
      }
    } else {
      ctx.font = `700 14px ${FONT}`;
      ctx.fillStyle = '#cfe0f4';
      ctx.fillText('等待房主开始…', cx, y + 300);
    }
    this.candyButton(
      ctx,
      'roomCancel',
      cx,
      y + 392,
      120,
      32,
      '退出房间',
      'rgba(150,175,210,0.35)',
      'rgba(0,0,0,0)',
      '#93a7bd',
      12.5,
    );

    this.commitLayer();
  }

  private drawNetDown(): void {
    const { ctx } = this.overlay();
    ctx.fillStyle = 'rgba(4,9,16,0.28)';
    ctx.fillRect(0, 0, this.W, this.H);
    const cx = this.W / 2;
    const pw = 300;
    const ph = 250;
    const x = (this.W - pw) / 2;
    const y = Math.round((this.H - ph) / 2);
    this.glassPanel(ctx, x, y, pw, ph);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 24px ${FONT}`;
    ctx.fillStyle = '#ff8a9a';
    ctx.fillText('网络断开', cx, y + 54);
    ctx.font = `600 13.5px ${FONT}`;
    ctx.fillStyle = '#b9cbdf';
    this.netDownMsg.split('\n').forEach((ln, i) => ctx.fillText(ln, cx, y + 94 + i * 22));
    if (this.netCanReconnect) {
      this.candyButton(
        ctx,
        'reconn',
        cx,
        y + 158,
        200,
        46,
        '重新连接',
        'rgba(52,225,135,0.75)',
        'rgba(52,225,135,0.14)',
        '#d5ffe8',
        16,
      );
      this.candyButton(
        ctx,
        'netHome',
        cx,
        y + 212,
        180,
        36,
        '返回大厅',
        'rgba(150,175,210,0.35)',
        'rgba(0,0,0,0)',
        '#c6d6ea',
        13,
      );
    } else {
      this.candyButton(
        ctx,
        'netHome',
        cx,
        y + 176,
        200,
        46,
        '返回大厅',
        'rgba(150,175,210,0.45)',
        'rgba(0,0,0,0)',
        '#c6d6ea',
        15,
      );
    }
    this.commitLayer();
  }

  // ---------------------------------------------------------------- 结算 / 暂停（深色玻璃面板）

  private overlay(): { ctx: CanvasRenderingContext2D } {
    this.hits = [];
    const ctx = this.layerCanvas();
    ctx.fillStyle = 'rgba(6,14,26,0.55)';
    ctx.fillRect(0, 0, this.W, this.H);
    return { ctx };
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
    const { ctx } = this.overlay();
    const cx = this.W / 2;
    const y = Math.round((this.H - 470) / 2);
    this.glassPanel(ctx, 34, y, 322, 470);

    const win = winner === world.humanTeam;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = win ? '#3ce78c' : '#ff6b8a';
    ctx.font = `900 38px ${FONT}`;
    ctx.fillText(win ? '胜利！' : '惜败', cx, y + 66);
    ctx.fillStyle = '#9db2c9';
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText(win ? '配合默契，再来一局？' : '差一点，调整节奏再战', cx, y + 106);

    ctx.fillStyle = '#ffffff';
    ctx.font = `900 52px ${FONT}`;
    ctx.fillText(`${world.setsWon[0]} : ${world.setsWon[1]}`, cx, y + 176);

    ctx.fillStyle = '#8ca1b8';
    ctx.font = `600 13.5px ${FONT}`;
    ctx.fillText(mvp ? `MVP · ${mvp}` : '', cx, y + 222);

    // 双方阵容：头像位 + 名字（联机显示好友昵称，AI 用默认名）
    const teams: Array<[TeamId, string, string]> = [
      [0, '绿队', TEAM_GREEN],
      [1, '红队', TEAM_RED],
    ];
    for (const [team, label, color] of teams) {
      const ry = y + 254 + (team === 0 ? 0 : 34);
      roundedRect(ctx, 58, ry, 52, 22, 11);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.font = `900 11px ${FONT}`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, 84, ry + 12);
      let ax = 124;
      for (const p of world.players.filter((q) => q.team === team)) {
        ctx.beginPath();
        ctx.arc(ax, ry + 11, 11, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.14)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.font = `800 11px ${FONT}`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(p.name.slice(0, 1), ax, ry + 12);
        ctx.textAlign = 'left';
        ctx.font = `700 13px ${FONT}`;
        ctx.fillStyle = '#dfe9f5';
        const name = p.name.length > 6 ? `${p.name.slice(0, 6)}…` : p.name;
        ctx.fillText(name, ax + 17, ry + 12);
        ax += 17 + ctx.measureText(name).width + 16;
        ctx.textAlign = 'center';
      }
    }

    const againLabel = this.resultMode === 'guest' ? '申请再战' : '再来一局';
    const again = ctaTexture(againLabel, false);
    const spr = makeSprite(this.root, again.tex, again.w, again.h, cx, y + 352, this.H, 62);
    this.root.add(spr);
    this.ctaSpr = spr;
    this.ctaTexNormal = again.tex;
    this.ctaTexPressed = ctaTexture(againLabel, true).tex;
    this.hits.push({ id: 'again', x: cx - 140, y: y + 306, w: 280, h: 92 });

    this.ghostButton(ctx, 'home', cx - 110, y + 414, 220, 44, '返回大厅');
    this.commitLayer();
  }

  private drawPause(): void {
    const { ctx } = this.overlay();
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
    this.commitLayer();
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
