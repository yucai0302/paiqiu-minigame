import * as THREE from 'three';

import { MATCH } from '../sim/config';
import type { World } from '../sim/world';
import { createUiCanvas, makeTexture, roundedRect, setSpriteTexture, textTexture, uiSprite } from './draw';
import type { UiLayer } from './layer';

const FONT = '"PingFang SC","Microsoft YaHei",system-ui,sans-serif';

/** 顶部记分板、播报、触球计数、蓄力条、暂停键 */
export class Hud {
  private root = new THREE.Group();
  private scoreSprite: THREE.Sprite;
  private announceSprite: THREE.Sprite;
  private touchSprite: THREE.Sprite;
  private serveTrack: THREE.Sprite;
  private serveFill: THREE.Mesh;
  private pauseBg: THREE.Mesh;
  private pauseIcon: THREE.Sprite;

  private scoreKey = '';
  private touchKey = -1;
  private announceT = 0;
  private announcePop = 0;

  private readonly W: number;
  private readonly y0: number;

  constructor(ui: UiLayer, W: number, H: number, padH: number, safeTop = 0) {
    this.W = W;
    this.y0 = H - padH;

    const blank = createUiCanvas(330, 96, 2);
    const top = Math.min(safeTop, 60);
    this.scoreSprite = uiSprite(makeTexture(blank.canvas), 330, 96, W / 2, H - (52 + top), 12);
    this.root.add(this.scoreSprite);

    const blankAnnounce = createUiCanvas(340, 104, 2);
    const announceShift = Math.min(safeTop, 30);
    this.announceSprite = uiSprite(
      makeTexture(blankAnnounce.canvas),
      340,
      104,
      W / 2,
      H - ((H - padH) * 0.26 + announceShift),
      14,
    );
    this.announceSprite.visible = false;
    this.root.add(this.announceSprite);

    const blankTouch = createUiCanvas(118, 28, 2);
    this.touchSprite = uiSprite(
      makeTexture(blankTouch.canvas),
      118,
      28,
      78,
      H - (this.y0 - 64),
      12,
    );
    this.root.add(this.touchSprite);

    // 蓄力条：圆角深色轨道（与手柄区深色带统一）+ 绿→黄→红渐变填充
    const trackC = createUiCanvas(190, 14, 2);
    roundedRect(trackC.ctx, 1, 1, 188, 12, 6);
    trackC.ctx.fillStyle = 'rgba(10,17,28,0.55)';
    trackC.ctx.fill();
    trackC.ctx.lineWidth = 1.5;
    trackC.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    trackC.ctx.stroke();
    this.serveTrack = uiSprite(makeTexture(trackC.canvas), 190, 14, W / 2, H - (this.y0 - 24), 11);
    this.serveTrack.visible = false;
    this.root.add(this.serveTrack);

    const fillC = createUiCanvas(178, 8, 2);
    const fillGrad = fillC.ctx.createLinearGradient(0, 0, 178, 0);
    fillGrad.addColorStop(0, '#34d399');
    fillGrad.addColorStop(0.55, '#fbbf24');
    fillGrad.addColorStop(1, '#ff5d73');
    roundedRect(fillC.ctx, 0, 0, 178, 8, 4);
    fillC.ctx.fillStyle = fillGrad;
    fillC.ctx.fill();
    const fillGeo = new THREE.PlaneGeometry(1, 8);
    fillGeo.translate(0.5, 0, 0);
    this.serveFill = new THREE.Mesh(
      fillGeo,
      new THREE.MeshBasicMaterial({
        map: makeTexture(fillC.canvas),
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    this.serveFill.position.set(W / 2 - 89, H - (this.y0 - 24), 0);
    this.serveFill.renderOrder = 12;
    this.serveFill.visible = false;
    this.root.add(this.serveFill);

    this.pauseBg = new THREE.Mesh(
      new THREE.CircleGeometry(16, 40),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.86,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    this.pauseBg.position.set(W - 30, H - 132, 0);
    this.pauseBg.renderOrder = 12;
    this.root.add(this.pauseBg);

    const icon = textTexture('II', { fontSize: 14, weight: 900, color: '#2b4a66', pad: 1 });
    this.pauseIcon = uiSprite(icon.tex, icon.width, icon.height, W - 30, H - 132, 13);
    this.root.add(this.pauseIcon);

    ui.scene.add(this.root);
  }

  setVisible(v: boolean): void {
    this.root.visible = v;
  }

  update(world: World): void {
    const clock = Math.ceil(world.clock);
    const warn = world.clock <= 5 && (world.phase === 'rally' || world.phase === 'serve');
    const key = `${clock}|${world.scores[0]}|${world.scores[1]}|${world.setIndex}|${world.setsWon[0]}|${world.setsWon[1]}|${warn}|${world.serverId}`;
    if (key !== this.scoreKey) {
      this.scoreKey = key;
      this.drawScore(world, clock, warn);
    }

    const t = world.touches[world.humanTeam];
    if (t !== this.touchKey) {
      this.touchKey = t;
      this.drawTouch(t);
    }

    const local = world.players.find((p) => p.id === world.localPlayerId);
    const serving = world.phase === 'serve' && !!local && world.serverId === local.id;
    this.serveTrack.visible = serving;
    this.serveFill.visible = serving;
    if (serving && local) {
      const ratio = Math.max(0.03, Math.min(1, local.charge));
      this.serveFill.scale.x = 178 * ratio;
    }
  }

  tick(dt: number): void {
    if (this.announceT <= 0) return;
    this.announceT -= dt;
    this.announcePop = Math.max(0, this.announcePop - dt);
    const mat = this.announceSprite.material as THREE.SpriteMaterial;
    mat.opacity = Math.min(1, this.announceT / 0.28);
    const k = 1 + this.announcePop * 0.55;
    this.announceSprite.scale.set(340 * k, 104 * k, 1);
    if (this.announceT <= 0) this.announceSprite.visible = false;
  }

  announce(text: string, sub?: string, ms = 1200): void {
    if (!text) return;
    const { canvas, ctx } = createUiCanvas(340, 104, 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';

    ctx.font = `900 40px ${FONT}`;
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(9,26,44,0.55)';
    ctx.strokeText(text, 170, sub ? 44 : 52);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, 170, sub ? 44 : 52);

    if (sub) {
      ctx.font = `600 14px ${FONT}`;
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(9,26,44,0.5)';
      ctx.strokeText(sub, 170, 80);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillText(sub, 170, 80);
    }

    setSpriteTexture(this.announceSprite, makeTexture(canvas));
    this.announceSprite.visible = true;
    this.announceSprite.scale.set(340, 104, 1);
    (this.announceSprite.material as THREE.SpriteMaterial).opacity = 1;
    this.announceT = ms / 1000;
    this.announcePop = 0.16;
  }

  hitPause(x: number, y: number): boolean {
    if (!this.root.visible) return false;
    const dx = x - (this.W - 30);
    const dy = y - 132;
    return dx * dx + dy * dy <= 26 * 26;
  }

  private drawScore(world: World, clock: number, warn: boolean): void {
    const { canvas, ctx } = createUiCanvas(330, 96, 2);
    const [s0, s1] = world.scores;
    const server = world.players.find((p) => p.id === world.serverId);
    const serveTeam = server ? server.team : -1;

    // 深色电子屏面板
    roundedRect(ctx, 1, 1, 328, 94, 14);
    ctx.fillStyle = 'rgba(10,17,30,0.94)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(120,160,220,0.4)';
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.moveTo(16, 3);
    ctx.lineTo(314, 3);
    ctx.stroke();

    ctx.textBaseline = 'middle';

    // 顶行：SET | 计时 mm:ss | 目标分
    ctx.font = `700 11px ${FONT}`;
    ctx.fillStyle = '#8ea3c2';
    ctx.textAlign = 'left';
    ctx.fillText(`SET ${world.setIndex + 1}`, 18, 16);
    ctx.textAlign = 'right';
    ctx.fillText(`to ${MATCH.pointsToWinSet}`, 312, 16);
    ctx.textAlign = 'center';
    ctx.font = `800 17px ${FONT}`;
    ctx.fillStyle = warn ? '#ff6b6b' : '#e8f0ff';
    ctx.fillText(`${Math.floor(clock / 60)}:${String(clock % 60).padStart(2, '0')}`, 165, 16);

    // 队名胶囊（队色与角色球衣一致）+ 发球方亮点
    const capsule = (x: number, label: string, color: string, serving: boolean): void => {
      roundedRect(ctx, x, 34, 76, 26, 13);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = `900 12px ${FONT}`;
      ctx.fillText(label, x + 38, 47);
      if (serving) {
        ctx.beginPath();
        ctx.arc(x + 38, 28, 3.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd75e';
        ctx.fill();
      }
    };
    capsule(14, 'HOME', '#16a34a', serveTeam === 0);
    capsule(240, 'AWAY', '#e1437a', serveTeam === 1);

    // 大比分（弱描边模拟 LED 发光）
    ctx.font = `900 38px ${FONT}`;
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(120,190,255,0.35)';
    ctx.lineJoin = 'round';
    ctx.strokeText(`${s0} : ${s1}`, 165, 49);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${s0} : ${s1}`, 165, 49);

    // 局分指示（三局两胜）
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(150 + i * 15, 80, 3.4, 0, Math.PI * 2);
      ctx.fillStyle =
        i < world.setsWon[0] ? '#22c55e' : i >= 3 - world.setsWon[1] ? '#e1437a' : '#33415c';
      ctx.fill();
    }
    ctx.font = `600 10px ${FONT}`;
    ctx.fillStyle = '#66788f';
    ctx.textAlign = 'left';
    ctx.fillText('SETS', 18, 80);
    ctx.textAlign = 'right';
    ctx.fillText(`BO${MATCH.setsToWin * 2 - 1}`, 312, 80);

    setSpriteTexture(this.scoreSprite, makeTexture(canvas));
  }

  private drawTouch(t: number): void {
    const { canvas, ctx } = createUiCanvas(118, 28, 2);
    roundedRect(ctx, 0, 0, 118, 28, 14);
    ctx.fillStyle = t >= 3 ? '#ffe2e2' : t === 2 ? '#fff0e2' : 'rgba(255,255,255,0.9)';
    ctx.fill();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `700 12px ${FONT}`;
    ctx.fillStyle = t >= 3 ? '#d94a4a' : t === 2 ? '#e08a2e' : '#4a5f76';
    ctx.fillText(t >= 3 ? '触球已满' : `触球 ${t}/3`, 12, 14);

    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(88 + i * 9, 14, 3, 0, Math.PI * 2);
      ctx.fillStyle = i < t ? (t >= 3 ? '#e14b4b' : '#35c47a') : '#dbe5f0';
      ctx.fill();
    }
    setSpriteTexture(this.touchSprite, makeTexture(canvas));
  }
}
