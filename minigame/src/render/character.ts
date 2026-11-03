import * as THREE from 'three';
import { shadowTexture } from './arena';
import { SAFE_MODE } from '../platform/flags';
import type { Player } from '../sim/types';

/**
 * 低多边形卡通角色（重做版）。
 *
 * 与旧版的关键差异：
 * 1. 移除 BackSide 描边壳 —— 旧形象在微信小游戏 WebGL 环境里因深度缓冲精度不足
 *    （相机 near=0.1 / far=260），深青色描边壳会覆盖本体，导致整个人物看起来纯黑。
 * 2. 全场景统一无光照材质（MeshBasicMaterial），不依赖运行时灯光/色彩管线，
 *    避免开发者工具 lit shader 过曝导致的人物不可见；明暗靠贴图烘焙与配色。
 * 3. 两队配色拉开明度与色相差距：我方草绿系、对手珊瑚红系，竖屏小屏一眼可辨。
 */

const SKINS = ['#f8cba6', '#eab792', '#d49a72', '#b07a52'];
const HAIRS = ['#2e2622', '#4a2f22', '#1a2440', '#c9932f', '#e2643f', '#3f3a63'];
const HOME_KIT = ['#22c55e', '#16a34a', '#4ade80', '#0d9488'];
const AWAY_KIT = ['#ff5d73', '#fb7185', '#f97362', '#e1437a'];
const TEAM_RING = ['#4dffa0', '#ff8a7a'];

/** 角色用到的几何体全部共享，重开一局不会产生额外显存 */
const G = {
  head: new THREE.SphereGeometry(0.4, 24, 18),
  body: new THREE.CapsuleGeometry(0.32, 0.16, 8, 20),
  arm: new THREE.CapsuleGeometry(0.075, 0.22, 4, 10),
  leg: new THREE.CapsuleGeometry(0.098, 0.22, 4, 10),
  sleeve: new THREE.CapsuleGeometry(0.105, 0.06, 4, 12),
  cuff: new THREE.TorusGeometry(0.104, 0.02, 6, 14),
  wrist: new THREE.TorusGeometry(0.082, 0.022, 6, 14),
  hand: new THREE.SphereGeometry(0.088, 10, 8),
  shoe: new THREE.SphereGeometry(0.118, 12, 10),
  sole: new THREE.BoxGeometry(0.22, 0.05, 0.33),
  sock: new THREE.CylinderGeometry(0.1, 0.107, 0.12, 12),
  knee: new THREE.TorusGeometry(0.1, 0.026, 6, 14),
  shorts: new THREE.CylinderGeometry(0.28, 0.26, 0.23, 16),
  waist: new THREE.TorusGeometry(0.268, 0.022, 6, 18),
  stripe: new THREE.BoxGeometry(0.032, 0.3, 0.14),
  chestStripe: new THREE.BoxGeometry(0.5, 0.07, 0.02),
  number: new THREE.PlaneGeometry(0.4, 0.4),
  badge: new THREE.PlaneGeometry(0.22, 0.22),
  sclera: new THREE.SphereGeometry(0.098, 12, 12),
  pupil: new THREE.SphereGeometry(0.048, 10, 10),
  glint: new THREE.SphereGeometry(0.026, 8, 8),
  brow: new THREE.BoxGeometry(0.13, 0.032, 0.03),
  mouth: new THREE.TorusGeometry(0.06, 0.016, 6, 12, Math.PI),
  cheek: new THREE.CircleGeometry(0.055, 14),
  ear: new THREE.SphereGeometry(0.07, 10, 8),
  hairCap: new THREE.SphereGeometry(0.43, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.42),
  hairBack: new THREE.SphereGeometry(0.4, 20, 14),
  hairBlob: new THREE.SphereGeometry(0.13, 12, 10),
  hairBun: new THREE.SphereGeometry(0.118, 12, 10),
  hairTail: new THREE.CapsuleGeometry(0.078, 0.2, 4, 10),
  spike: new THREE.ConeGeometry(0.092, 0.21, 8),
  headband: new THREE.TorusGeometry(0.42, 0.03, 8, 22),
  ring: new THREE.RingGeometry(0.46, 0.62, 44),
  shadow: new THREE.PlaneGeometry(1.45, 1.45),
};

const SHADOW_TEX = shadowTexture();

/**
 * 全场景统一使用无光照材质：不依赖运行时灯光/色彩管线，
 * 浏览器、PC 微信、开发者工具三端渲染结果一致（IDE 的 lit shader 曾导致
 * 受光材质整体过曝发白、人物不可见）。明暗层次由贴图烘焙与配色承担。
 */
function litMat(color: THREE.ColorRepresentation, _roughness: number): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color });
}

function roundRect(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function makeLabel(name: string, color: string, num: number): THREE.Sprite {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 112;
  const g = c.getContext('2d')!;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineJoin = 'round';

  g.font = '700 36px "PingFang SC","Microsoft YaHei",system-ui,sans-serif';
  g.lineWidth = 9;
  g.strokeStyle = 'rgba(9,26,44,0.82)';
  g.strokeText(name, 128, 34);
  g.fillStyle = '#ffffff';
  g.fillText(name, 128, 34);

  const bw = 60;
  const bh = 32;
  g.fillStyle = color;
  roundRect(g, 128 - bw / 2, 62, bw, bh, 16);
  g.fill();
  g.fillStyle = '#08202f';
  g.font = '900 24px system-ui,sans-serif';
  g.fillText(String(num).padStart(2, '0'), 128, 79);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(2.35, 1.03, 1);
  return sprite;
}

/** 球衣号码：白底圆牌 + 队色描边 + 深色数字，透明底 */
function numberTexture(num: number, kit: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineJoin = 'round';

  g.beginPath();
  g.arc(64, 64, 56, 0, Math.PI * 2);
  g.fillStyle = 'rgba(255,255,255,0.95)';
  g.fill();
  g.lineWidth = 8;
  g.strokeStyle = kit;
  g.stroke();

  g.font = '900 64px "PingFang SC","Microsoft YaHei",system-ui,sans-serif';
  g.fillStyle = '#1c2b3a';
  g.fillText(String(num), 64, 68);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 程序化 Q 版角色：大头小身、可换发型、球衣号码，附跑动/跳跃/扣球/扑救/庆祝动画 */
export class CharacterView {
  readonly root = new THREE.Group();
  readonly label: THREE.Sprite;

  private rig = new THREE.Group();
  private head = new THREE.Group();
  private eyes: THREE.Group[] = [];
  private mouth: THREE.Mesh;
  private lArm = new THREE.Group();
  private rArm = new THREE.Group();
  private lLeg = new THREE.Group();
  private rLeg = new THREE.Group();
  private shadow: THREE.Mesh;
  private shadowMat: THREE.MeshBasicMaterial;
  private ring: THREE.Mesh;
  private ringMat: THREE.MeshBasicMaterial;
  private phase = Math.random() * Math.PI * 2;
  private cheerTimer = 0;
  private blinkTimer: number;
  private blinkPeriod: number;
  private headBaseY = 1.46;
  /** 本角色独有的贴图（标签 / 号码），重建时只释放这些，共享贴图（影子）不能动 */
  private readonly ownTextures: THREE.Texture[] = [];
  /** 号码牌（安全模式下隐藏） */
  private readonly numberMeshes: THREE.Mesh[] = [];

  constructor(p: Player, idx: number) {
    const skin = SKINS[idx % SKINS.length];
    const hair = HAIRS[(idx * 3 + 1) % HAIRS.length];
    const kit = p.team === 0 ? HOME_KIT[idx % HOME_KIT.length] : AWAY_KIT[idx % AWAY_KIT.length];
    const teamColor = TEAM_RING[p.team];
    this.blinkTimer = idx * 0.7;
    this.blinkPeriod = 3.1 + (idx % 3) * 0.55;

    const kitMat = litMat(kit, 0.6);
    const kitDark = litMat(new THREE.Color(kit).multiplyScalar(0.6), 0.68);
    const trimMat = litMat(0xffffff, 0.5);
    const skinMat = litMat(skin, 0.66);
    const hairMat = litMat(hair, 0.74);
    // 五官用无光照材质：任何运行时下都清晰可读
    const scleraMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x26202c });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const browMat = new THREE.MeshBasicMaterial({ color: 0x3a2f28 });
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x8a3040 });
    const cheekMat = new THREE.MeshBasicMaterial({
      color: 0xff8fa0,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    // 影子 + 脚下光环（贴地，不随跳跃升高）
    this.shadowMat = new THREE.MeshBasicMaterial({
      map: SHADOW_TEX,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    this.shadow = new THREE.Mesh(G.shadow, this.shadowMat);
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.012;
    this.root.add(this.shadow);

    this.ringMat = new THREE.MeshBasicMaterial({
      color: teamColor,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.ring = new THREE.Mesh(G.ring, this.ringMat);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.02;
    this.root.add(this.ring);

    this.root.add(this.rig);

    // ---- 躯干 ----
    const body = new THREE.Mesh(G.body, kitMat);
    body.position.y = 0.8;
    this.rig.add(body);

    // 领口白边
    const collar = new THREE.Mesh(G.waist, trimMat);
    collar.rotation.x = Math.PI / 2;
    collar.scale.setScalar(1.05);
    collar.position.y = 1.02;
    this.rig.add(collar);

    // 胸前横条纹（队识别元素之一）
    const chest = new THREE.Mesh(G.chestStripe, trimMat);
    chest.position.set(0, 0.82, 0.32);
    this.rig.add(chest);

    // 侧缝条纹
    for (const s of [-1, 1]) {
      const stripe = new THREE.Mesh(G.stripe, trimMat);
      stripe.position.set(s * 0.302, 0.82, 0);
      this.rig.add(stripe);
    }

    // 号码牌：背后大牌 + 胸前小牌，白底队色描边，正反都能认出队伍
    if (!SAFE_MODE) {
      const numTex = numberTexture(p.id + 1, kit);
      this.ownTextures.push(numTex);
      const backMat = new THREE.MeshBasicMaterial({
        map: numTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
      const backNum = new THREE.Mesh(G.number, backMat);
      backNum.position.set(0, 0.84, -0.328);
      backNum.rotation.y = Math.PI;
      this.rig.add(backNum);
      this.numberMeshes.push(backNum);

      const badgeMat = new THREE.MeshBasicMaterial({
        map: numTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
      const badge = new THREE.Mesh(G.badge, badgeMat);
      badge.position.set(0.14, 0.68, 0.295);
      this.rig.add(badge);
      this.numberMeshes.push(badge);
    }

    // ---- 短裤 ----
    const shorts = new THREE.Mesh(G.shorts, kitDark);
    shorts.position.y = 0.545;
    this.rig.add(shorts);
    const waist = new THREE.Mesh(G.waist, trimMat);
    waist.rotation.x = Math.PI / 2;
    waist.position.y = 0.655;
    this.rig.add(waist);
    for (const s of [-1, 1]) {
      const stripe = new THREE.Mesh(G.stripe, trimMat);
      stripe.scale.set(0.7, 0.55, 0.55);
      stripe.position.set(s * 0.258, 0.55, 0);
      this.rig.add(stripe);
    }

    // ---- 头部与五官 ----
    this.head.position.y = this.headBaseY;
    this.rig.add(this.head);

    const skull = new THREE.Mesh(G.head, skinMat);
    this.head.add(skull);

    // 耳朵
    for (const s of [-1, 1]) {
      const ear = new THREE.Mesh(G.ear, skinMat);
      ear.position.set(s * 0.395, -0.02, 0);
      ear.scale.set(0.5, 0.75, 0.6);
      this.head.add(ear);
    }

    this.buildHair(idx, hairMat, trimMat);

    // 眼睛：白眼球 + 黑瞳 + 高光，三层都是无光照材质
    for (const s of [-1, 1]) {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(s * 0.145, 0.03, 0.36);

      const sclera = new THREE.Mesh(G.sclera, scleraMat);
      sclera.scale.set(1, 1.25, 0.55);
      eyeGroup.add(sclera);

      const pupil = new THREE.Mesh(G.pupil, pupilMat);
      pupil.position.set(0, -0.005, 0.055);
      pupil.scale.set(1, 1.3, 0.5);
      eyeGroup.add(pupil);

      const glint = new THREE.Mesh(G.glint, glintMat);
      glint.position.set(s * -0.024, 0.05, 0.075);
      eyeGroup.add(glint);

      this.head.add(eyeGroup);
      this.eyes.push(eyeGroup);
    }

    // 眉毛（轻微八字，呆萌感）
    for (const s of [-1, 1]) {
      const brow = new THREE.Mesh(G.brow, browMat);
      brow.position.set(s * 0.15, 0.175, 0.36);
      brow.rotation.z = s * -0.18;
      brow.rotation.y = s * 0.28;
      this.head.add(brow);
    }

    this.mouth = new THREE.Mesh(G.mouth, mouthMat);
    this.mouth.position.set(0, -0.1, 0.385);
    this.mouth.rotation.z = Math.PI;
    this.head.add(this.mouth);

    for (const s of [-1, 1]) {
      const cheek = new THREE.Mesh(G.cheek, cheekMat);
      cheek.position.set(s * 0.24, -0.06, 0.315);
      cheek.rotation.y = s * 0.62;
      this.head.add(cheek);
    }

    // ---- 手臂 ----
    this.lArm.position.set(-0.32, 1.08, 0);
    this.rArm.position.set(0.32, 1.08, 0);
    for (const [arm, side] of [
      [this.lArm, -1],
      [this.rArm, 1],
    ] as const) {
      const limb = new THREE.Mesh(G.arm, skinMat);
      limb.position.y = -0.21;
      arm.add(limb);

      const sleeve = new THREE.Mesh(G.sleeve, kitMat);
      sleeve.position.y = -0.05;
      arm.add(sleeve);

      const cuff = new THREE.Mesh(G.cuff, trimMat);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.y = -0.16;
      arm.add(cuff);

      const wrist = new THREE.Mesh(G.wrist, trimMat);
      wrist.rotation.x = Math.PI / 2;
      wrist.position.y = -0.35;
      arm.add(wrist);

      const hand = new THREE.Mesh(G.hand, skinMat);
      hand.position.set(side * 0.004, -0.415, 0);
      arm.add(hand);

      this.rig.add(arm);
    }

    // ---- 腿 ----
    this.lLeg.position.set(-0.14, 0.56, 0);
    this.rLeg.position.set(0.14, 0.56, 0);
    for (const leg of [this.lLeg, this.rLeg]) {
      const limb = new THREE.Mesh(G.leg, skinMat);
      limb.position.y = -0.19;
      leg.add(limb);

      const knee = new THREE.Mesh(G.knee, trimMat);
      knee.rotation.x = Math.PI / 2;
      knee.position.y = -0.225;
      leg.add(knee);

      const sock = new THREE.Mesh(G.sock, trimMat);
      sock.position.y = -0.33;
      leg.add(sock);

      const shoe = new THREE.Mesh(G.shoe, kitDark);
      shoe.position.set(0, -0.415, 0.05);
      shoe.scale.set(1.05, 0.72, 1.5);
      leg.add(shoe);

      const sole = new THREE.Mesh(G.sole, trimMat);
      sole.position.set(0, -0.478, 0.06);
      leg.add(sole);

      this.rig.add(leg);
    }

    this.label = makeLabel(p.name, teamColor, p.id + 1);
    this.label.position.y = 2.55;
    this.label.visible = !SAFE_MODE;
    this.root.add(this.label);
    const labelMap = (this.label.material as THREE.SpriteMaterial).map;
    if (labelMap) this.ownTextures.push(labelMap);
  }

  private buildHair(idx: number, hairMat: THREE.MeshBasicMaterial, trimMat: THREE.MeshBasicMaterial): void {
    const hair = new THREE.Group();
    this.head.add(hair);

    const cap = new THREE.Mesh(G.hairCap, hairMat);
    cap.rotation.y = idx * 0.9;
    hair.add(cap);

    // 后脑与两侧的发量，避免从背后看露出大片颈背
    const back = new THREE.Mesh(G.hairBack, hairMat);
    back.position.set(0, -0.05, -0.12);
    back.scale.set(1.07, 1.06, 0.76);
    hair.add(back);

    const style = idx % 4;

    if (style === 0) {
      // 齐刘海蘑菇头
      for (const x of [-0.17, 0, 0.17]) {
        const fringe = new THREE.Mesh(G.hairBlob, hairMat);
        fringe.position.set(x, 0.22, 0.32);
        fringe.scale.set(1, 0.65, 0.85);
        hair.add(fringe);
      }
      for (const s of [-1, 1]) {
        const lock = new THREE.Mesh(G.hairBlob, hairMat);
        lock.position.set(s * 0.36, -0.1, 0.03);
        lock.scale.set(0.55, 1.2, 0.75);
        hair.add(lock);
      }
    } else if (style === 1) {
      // 侧分 + 头带
      const fringe = new THREE.Mesh(G.hairBlob, hairMat);
      fringe.position.set(0.02, 0.23, 0.31);
      fringe.scale.set(1.7, 0.65, 0.82);
      fringe.rotation.z = -0.16;
      hair.add(fringe);

      const lock = new THREE.Mesh(G.hairBlob, hairMat);
      lock.position.set(-0.35, -0.08, 0.02);
      lock.scale.set(0.6, 1.1, 0.7);
      hair.add(lock);

      const band = new THREE.Mesh(G.headband, trimMat);
      band.rotation.x = Math.PI / 2;
      band.position.y = 0.1;
      hair.add(band);
    } else if (style === 2) {
      // 马尾
      const bun = new THREE.Mesh(G.hairBun, hairMat);
      bun.position.set(0, 0.13, -0.39);
      bun.scale.set(1.05, 1.05, 0.9);
      hair.add(bun);

      const tail = new THREE.Mesh(G.hairTail, hairMat);
      tail.position.set(0, -0.17, -0.46);
      tail.rotation.x = -0.22;
      tail.scale.set(0.9, 1.2, 0.9);
      hair.add(tail);

      const fringe = new THREE.Mesh(G.hairBlob, hairMat);
      fringe.position.set(0, 0.23, 0.31);
      fringe.scale.set(1.35, 0.65, 0.85);
      hair.add(fringe);
    } else {
      // 呆毛 + 双丸子
      for (const s of [-1, 1]) {
        const knot = new THREE.Mesh(G.hairBun, hairMat);
        knot.position.set(s * 0.29, 0.27, -0.04);
        knot.scale.setScalar(0.95);
        hair.add(knot);
      }
      for (let i = 0; i < 3; i++) {
        const spike = new THREE.Mesh(G.spike, hairMat);
        spike.position.set((i - 1) * 0.15, 0.38, 0.09);
        spike.rotation.z = (i - 1) * -0.5;
        spike.rotation.x = -0.2;
        hair.add(spike);
      }
      const fringe = new THREE.Mesh(G.hairBlob, hairMat);
      fringe.position.set(0, 0.23, 0.31);
      fringe.scale.set(1.3, 0.65, 0.85);
      hair.add(fringe);
    }
  }

  celebrate(): void {
    this.cheerTimer = 1.6;
  }

  /** 安全渲染降级：去掉名字牌与号码牌（贴图最多的两处） */
  applySafeFallback(): void {
    this.label.visible = false;
    for (const m of this.numberMeshes) m.visible = false;
  }

  /** 重开一局时释放本角色的材质与贴图（几何体为全局共享，不释放） */
  dispose(): void {
    this.root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh && !(obj as THREE.Sprite).isSprite) return;
      const mat = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[];
      const list = Array.isArray(mat) ? mat : [mat];
      for (const m of list) m.dispose();
    });
    // 影子的贴图是全局共享的（SHADOW_TEX），不能跟着角色一起释放
    for (const t of this.ownTextures) t.dispose();
    this.ownTextures.length = 0;
    this.shadowMat.dispose();
    this.ringMat.dispose();
  }

  update(dt: number, x: number, z: number, p: Player): void {
    this.root.position.x = x;
    this.root.position.z = z;
    this.root.rotation.y = p.facing;

    this.cheerTimer = Math.max(0, this.cheerTimer - dt);
    this.phase += dt * (p.moving && p.grounded ? 13 : 2.4);

    let legL = 0;
    let legR = 0;
    let armL = 0;
    let armR = 0;
    let rigX = 0;
    let rigY = p.pos.y;
    let bounce = 0;
    let headX = 0;
    let eyeMood = 1;
    let mouthMood = 1;

    if (this.cheerTimer > 0) {
      armL = -2.6;
      armR = -2.6;
      bounce = Math.abs(Math.sin(this.phase * 5)) * 0.16;
      headX = -0.12;
      eyeMood = 0.34;
      mouthMood = 1.9;
    } else if (p.blocking) {
      // 拦网：双臂高举、身体前倾
      armL = -2.95;
      armR = -2.95;
      legL = -0.18;
      legR = 0.18;
      rigX = 0.08;
      headX = 0.06;
      eyeMood = 0.75;
    } else {
      switch (p.anim) {
        case 'run': {
          const s = Math.sin(this.phase);
          legL = s * 0.85;
          legR = -s * 0.85;
          armL = -s * 0.75;
          armR = s * 0.75;
          bounce = Math.abs(Math.sin(this.phase)) * 0.05;
          headX = 0.05;
          break;
        }
        case 'jump': {
          legL = -0.45;
          legR = 0.3;
          armL = -2.1;
          armR = -2.1;
          headX = -0.08;
          eyeMood = 0.8;
          break;
        }
        case 'hit': {
          const k = 1 - Math.min(1, p.animTimer / 0.26);
          const s = Math.sin(k * Math.PI);
          armL = -2.2 * s;
          armR = -2.7 * s;
          rigX = 0.16 * s;
          headX = 0.1 * s;
          eyeMood = 0.62;
          break;
        }
        case 'dive': {
          rigX = 1.25;
          rigY = 0.3;
          armL = -2.4;
          armR = -2.4;
          headX = 0.15;
          eyeMood = 0.55;
          break;
        }
        case 'stun': {
          rigX = 1.5;
          rigY = 0.22;
          armL = -1.2;
          armR = -1.2;
          headX = 0.2;
          eyeMood = 0.45;
          mouthMood = -0.9;
          break;
        }
        default: {
          const s = Math.sin(this.phase);
          armL = 0.06 + s * 0.06;
          armR = -0.06 - s * 0.06;
          bounce = Math.sin(this.phase * 2) * 0.015;
          headX = Math.sin(this.phase * 0.9) * 0.03;
          break;
        }
      }
    }

    this.rig.position.y = THREE.MathUtils.damp(this.rig.position.y, rigY + bounce, 26, dt);
    this.rig.rotation.x = THREE.MathUtils.damp(this.rig.rotation.x, rigX, 16, dt);
    this.lLeg.rotation.x = THREE.MathUtils.damp(this.lLeg.rotation.x, legL, 20, dt);
    this.rLeg.rotation.x = THREE.MathUtils.damp(this.rLeg.rotation.x, legR, 20, dt);
    this.lArm.rotation.x = THREE.MathUtils.damp(this.lArm.rotation.x, armL, 20, dt);
    this.rArm.rotation.x = THREE.MathUtils.damp(this.rArm.rotation.x, armR, 20, dt);
    this.lArm.rotation.z = THREE.MathUtils.damp(this.lArm.rotation.z, -0.08, 12, dt);
    this.rArm.rotation.z = THREE.MathUtils.damp(this.rArm.rotation.z, 0.08, 12, dt);

    // 头部跟随动作轻微点头，待机时缓慢呼吸
    this.head.position.y = THREE.MathUtils.damp(
      this.head.position.y,
      this.headBaseY + (p.moving ? Math.abs(Math.sin(this.phase)) * 0.02 : Math.sin(this.phase) * 0.01),
      18,
      dt,
    );
    this.head.rotation.x = THREE.MathUtils.damp(this.head.rotation.x, headX, 14, dt);

    // 随机眨眼 + 情绪表情
    this.blinkTimer += dt;
    const t = this.blinkTimer % this.blinkPeriod;
    const closed = t > this.blinkPeriod - 0.12;
    const eyeTarget = closed ? 0.12 : eyeMood;
    for (const eye of this.eyes) {
      eye.scale.y = THREE.MathUtils.damp(eye.scale.y, eyeTarget, 36, dt);
    }
    this.mouth.scale.y = THREE.MathUtils.damp(this.mouth.scale.y, mouthMood, 14, dt);

    this.label.position.y = 2.55 + p.pos.y;

    const h = Math.min(1, p.pos.y / 1.5);
    this.shadow.scale.setScalar(1 - h * 0.35);
    this.shadowMat.opacity = 0.55 * (1 - h * 0.65);
    this.ringMat.opacity = 0.5 * (1 - h * 0.5);
  }
}
