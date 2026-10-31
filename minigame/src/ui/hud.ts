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
  private serveTrack: THREE.Mesh;
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

    this.serveTrack = new THREE.Mesh(
      new THREE.PlaneGeometry(180, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.62,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    this.serveTrack.position.set(W / 2, H - (this.y0 - 24), 0);
    this.serveTrack.renderOrder = 11;
    this.serveTrack.visible = false;
    this.root.add(this.serveTrack);

    const fillGeo = new THREE.PlaneGeometry(1, 8);
    fillGeo.translate(0.5, 0, 0);
    this.serveFill = new THREE.Mesh(
      fillGeo,
      new THREE.MeshBasicMaterial({ color: 0x35c47a, depthTest: false, depthWrite: false, side: THREE.DoubleSide }),
    );
    this.serveFill.position.set(W / 2 - 90, H - (this.y0 - 24), 0);
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
    const key = `${clock}|${world.scores[0]}|${world.scores[1]}|${world.setIndex}|${world.setsWon[0]}|${world.setsWon[1]}|${warn}`;
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
      this.serveFill.scale.x = 180 * ratio;
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

    roundedRect(ctx, 113, 0, 104, 30, 15);
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = warn ? '#e14b4b' : '#15273b';
    ctx.font = `800 20px ${FONT}`;
    ctx.fillText(String(clock), 165, 16);

    roundedRect(ctx, 3, 34, 324, 44, 22);
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    ctx.fill();

    roundedRect(ctx, 18, 46, 68, 20, 10);
    ctx.fillStyle = '#3ecf7a';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = `800 11px ${FONT}`;
    ctx.fillText('HOME', 52, 56);

    roundedRect(ctx, 244, 46, 68, 20, 10);
    ctx.fillStyle = '#ff5f87';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('AWAY', 278, 56);

    ctx.fillStyle = '#15273b';
    ctx.font = `900 26px ${FONT}`;
    ctx.fillText(String(s0), 132, 56);
    ctx.fillText('—', 165, 54);
    ctx.fillText(String(s1), 198, 56);

    ctx.font = `600 11px ${FONT}`;
    ctx.fillStyle = '#71829a';
    ctx.textAlign = 'left';
    ctx.fillText(`SET ${world.setIndex + 1}`, 36, 87);
    ctx.textAlign = 'right';
    ctx.fillText(`to ${MATCH.pointsToWinSet}`, 294, 87);

    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(150 + i * 15, 87, 3.2, 0, Math.PI * 2);
      ctx.fillStyle =
        i < world.setsWon[0] ? '#3ecf7a' : i >= 3 - world.setsWon[1] ? '#ff5f87' : '#dbe5f0';
      ctx.fill();
    }

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
