import * as THREE from 'three';

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

/** 开始 / 结算 / 暂停 三个全屏面板 */
export class Screens {
  private root = new THREE.Group();
  private sprite: THREE.Sprite;
  private hits: HitRect[] = [];
  private state: Screen = 'none';
  private skill: Skill = 'normal';
  private readonly panelTop: number;

  constructor(
    private readonly ui: UiLayer,
    private readonly W: number,
    private readonly H: number,
    private readonly handlers: ScreenHandlers,
    private readonly padH: number,
  ) {
    const blank = createUiCanvas(W, H, 1.5);
    this.sprite = uiSprite(makeTexture(blank.canvas), W, H, W / 2, H / 2, 60);
    this.root.add(this.sprite);
    this.root.visible = false;
    ui.scene.add(this.root);
    this.panelTop = Math.max(24, Math.round(H * 0.102));
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
    this.drawResult(world, winner, mvp);
  }

  showPause(): void {
    this.state = 'pause';
    this.root.visible = true;
    this.drawPause();
  }

  hide(): void {
    this.state = 'none';
    this.root.visible = false;
    this.hits = [];
  }

  touchStart(points: TouchPoint[]): void {
    if (!this.visible || points.length === 0) return;
    const p = points[0];
    for (const r of this.hits) {
      if (p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h) {
        this.activate(r.id);
        return;
      }
    }
  }

  private activate(id: string): void {
    if (id.startsWith('diff:')) {
      this.skill = id.slice(5) as Skill;
      this.drawStart();
      return;
    }
    if (this.state === 'start' && id === 'start') {
      this.handlers.onStart(this.skill);
      return;
    }
    if (this.state === 'result' && id === 'again') {
      this.handlers.onAgain();
      return;
    }
    if (this.state === 'pause' && id === 'resume') {
      this.handlers.onResume();
      return;
    }
    if (id === 'home') this.handlers.onHome();
  }

  // ---------------------------------------------------------------- 绘制

  private drawStart(): void {
    const { canvas, ctx } = this.prepare();
    const cx = this.W / 2;
    const top = this.panelTop;
    const panelH = Math.min(620, this.H - top - 24);

    this.panel(ctx, 24, top, 342, panelH);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#15273b';
    ctx.font = `900 40px ${FONT}`;
    ctx.fillText('Q版排球', cx, top + 72);
    ctx.fillStyle = '#6f8197';
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText('2v2 人机训练赛 · 7 分制 · 三局两胜', cx, top + 112);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#71829a';
    ctx.font = `700 13px ${FONT}`;
    ctx.fillText('难度', 56, top + 160);

    const skills: Array<{ id: Skill; label: string }> = [
      { id: 'easy', label: '简单' },
      { id: 'normal', label: '普通' },
      { id: 'hard', label: '困难' },
    ];
    skills.forEach((s, i) => {
      const x = 52 + i * 99;
      const y = top + 176;
      const on = this.skill === s.id;
      roundedRect(ctx, x, y, 88, 38, 19);
      ctx.fillStyle = on ? '#35c47a' : '#eef3f9';
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = on ? '#ffffff' : '#51667c';
      ctx.font = `700 15px ${FONT}`;
      ctx.fillText(s.label, x + 44, y + 20);
      this.hits.push({ id: `diff:${s.id}`, x, y, w: 88, h: 38 });
    });

    this.primaryButton(ctx, 'start', 64, top + 250, 262, 56, '开始比赛');
    this.tips(ctx, top);
    this.finish(canvas);
  }

  private drawResult(world: World, winner: TeamId, mvp: string): void {
    const { canvas, ctx } = this.prepare();
    const cx = this.W / 2;
    const top = this.panelTop;
    const panelH = Math.min(620, this.H - top - 24);
    this.panel(ctx, 24, top, 342, panelH);

    const win = winner === world.humanTeam;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = win ? '#1fae68' : '#e0566f';
    ctx.font = `900 42px ${FONT}`;
    ctx.fillText(win ? '胜利！' : '惜败', cx, top + 124);
    ctx.fillStyle = '#6f8197';
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText(win ? '配合默契，再来一局？' : '差一点，调整节奏再战', cx, top + 166);

    ctx.fillStyle = '#15273b';
    ctx.font = `900 56px ${FONT}`;
    ctx.fillText(`${world.setsWon[0]} : ${world.setsWon[1]}`, cx, top + 254);

    ctx.fillStyle = '#71829a';
    ctx.font = `600 15px ${FONT}`;
    ctx.fillText(mvp ? `MVP · ${mvp}` : '', cx, top + 306);

    this.primaryButton(ctx, 'again', 64, top + 384, 262, 56, '再来一局');
    this.secondaryButton(ctx, 'home', 64, top + 454, 262, 50, '返回大厅');
    this.finish(canvas);
  }

  private drawPause(): void {
    const { canvas, ctx } = this.prepare();
    const y = Math.round((this.H - 312) / 2);
    this.panel(ctx, 45, y, 300, 312);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#15273b';
    ctx.font = `900 34px ${FONT}`;
    ctx.fillText('暂停', this.W / 2, y + 72);

    this.primaryButton(ctx, 'resume', 75, y + 144, 240, 54, '继续比赛');
    this.secondaryButton(ctx, 'home', 75, y + 212, 240, 48, '返回大厅');
    this.finish(canvas);
  }

  private prepare(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    this.hits = [];
    const { canvas, ctx } = createUiCanvas(this.W, this.H, 1.5);
    ctx.fillStyle = 'rgba(7,20,34,0.48)';
    ctx.fillRect(0, 0, this.W, this.H);
    const top = this.H - this.padH;
    ctx.fillStyle = 'rgba(9,24,40,0.28)';
    ctx.fillRect(0, top, this.W, this.padH);
    return { canvas, ctx };
  }

  private panel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
    roundedRect(ctx, x + 3, y + 8, w, h, 30);
    ctx.fillStyle = 'rgba(6,20,34,0.22)';
    ctx.fill();
    roundedRect(ctx, x, y, w, h, 30);
    ctx.fillStyle = 'rgba(255,255,255,0.97)';
    ctx.fill();
  }

  private primaryButton(
    ctx: CanvasRenderingContext2D,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
  ): void {
    roundedRect(ctx, x, y + 3, w, h, h / 2);
    ctx.fillStyle = 'rgba(26,150,92,0.28)';
    ctx.fill();
    roundedRect(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = '#35c47a';
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = `800 20px ${FONT}`;
    ctx.fillText(label, x + w / 2, y + h / 2);
    this.hits.push({ id, x, y, w, h });
  }

  private secondaryButton(
    ctx: CanvasRenderingContext2D,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
  ): void {
    roundedRect(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = '#eef3f9';
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#51667c';
    ctx.font = `700 16px ${FONT}`;
    ctx.fillText(label, x + w / 2, y + h / 2);
    this.hits.push({ id, x, y, w, h });
  }

  private tips(ctx: CanvasRenderingContext2D, top: number): void {
    const lines = [
      '左摇杆移动，右侧按键：跳跃 / 击球 / 拦网 / 冲刺',
      '按住击球蓄力发球，松手发出；发球时左右拨摇杆瞄准',
      '一传垫给队友 → 二传托到网前 → 起跳扣杀',
      '每队最多三次触球，先到 7 分，三局两胜',
    ];
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `600 12.5px ${FONT}`;
    ctx.fillStyle = '#6b7c93';
    lines.forEach((line, i) => {
      ctx.fillText(line, 56, top + 346 + i * 26);
    });
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9aabbd';
    ctx.font = `600 11px ${FONT}`;
    ctx.fillText('微信小游戏 · 竖屏手柄版', this.W / 2, top + 574);
  }

  private finish(canvas: HTMLCanvasElement): void {
    setSpriteTexture(this.sprite, makeTexture(canvas));
    this.sprite.scale.set(this.W, this.H, 1);
  }
}
