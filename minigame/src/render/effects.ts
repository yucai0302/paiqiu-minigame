import * as THREE from 'three';

interface Ripple {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  t: number;
  dur: number;
  max: number;
}

const KIND_LABEL: Record<string, string> = {
  pass: '一传',
  set: '二传',
  send: '过网',
  attack: '扣球',
};

interface Floater {
  sprite: THREE.Sprite;
  tex: THREE.CanvasTexture;
  t: number;
  dur: number;
  y0: number;
}

/** 粒子 / 落地波纹 / 落点指示 / 飘字，全部程序化，无贴图资源 */
export class Effects {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private floaters: Floater[] = [];

  private points: THREE.Points;
  private pPos: Float32Array;
  private pCol: Float32Array;
  private pVel: Float32Array;
  private pLife: Float32Array;
  private pMax: Float32Array;
  private readonly count = 300;
  private cursor = 0;

  private ripples: Ripple[] = [];
  private landing: THREE.Mesh;
  private landingMat: THREE.MeshBasicMaterial;
  private t = 0;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;

    this.pPos = new Float32Array(this.count * 3);
    this.pCol = new Float32Array(this.count * 3);
    this.pVel = new Float32Array(this.count * 3);
    this.pLife = new Float32Array(this.count);
    this.pMax = new Float32Array(this.count);
    for (let i = 0; i < this.count; i++) this.pPos[i * 3 + 1] = -100;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pPos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.pCol, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);

    const lgeo = new THREE.RingGeometry(0.42, 0.56, 40);
    this.landingMat = new THREE.MeshBasicMaterial({
      color: 0xffb020,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.landing = new THREE.Mesh(lgeo, this.landingMat);
    this.landing.rotation.x = -Math.PI / 2;
    this.landing.position.y = 0.03;
    this.landing.visible = false;
    scene.add(this.landing);

    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(0.82, 1, 48),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      m.rotation.x = -Math.PI / 2;
      m.visible = false;
      scene.add(m);
      this.ripples.push({ mesh: m, mat: m.material as THREE.MeshBasicMaterial, t: 0, dur: 0, max: 1 });
    }
  }

  update(dt: number): void {
    this.t += dt;

    for (let i = 0; i < this.count; i++) {
      if (this.pLife[i] <= 0) continue;
      this.pLife[i] -= dt;
      if (this.pLife[i] <= 0) {
        this.pPos[i * 3 + 1] = -100;
        continue;
      }
      this.pVel[i * 3 + 1] -= 7 * dt;
      this.pPos[i * 3] += this.pVel[i * 3] * dt;
      this.pPos[i * 3 + 1] += this.pVel[i * 3 + 1] * dt;
      this.pPos[i * 3 + 2] += this.pVel[i * 3 + 2] * dt;
      if (this.pPos[i * 3 + 1] < 0.05) {
        this.pPos[i * 3 + 1] = 0.05;
        this.pVel[i * 3 + 1] *= -0.3;
        this.pVel[i * 3] *= 0.7;
        this.pVel[i * 3 + 2] *= 0.7;
      }
    }
    const geo = this.points.geometry as THREE.BufferGeometry;
    (geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (geo.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;

    for (const r of this.ripples) {
      if (r.t <= 0) continue;
      r.t -= dt;
      const k = 1 - r.t / r.dur;
      const s = 0.3 + k * r.max;
      r.mesh.scale.setScalar(s);
      r.mat.opacity = Math.max(0, 0.85 * (1 - k));
      if (r.t <= 0) r.mesh.visible = false;
    }

    if (this.landing.visible) {
      const s = 1 + Math.sin(this.t * 5) * 0.08;
      this.landing.scale.setScalar(s);
      this.landingMat.opacity = 0.55 + Math.sin(this.t * 5) * 0.2;
    }

    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const f = this.floaters[i];
      f.t -= dt;
      const k = 1 - f.t / f.dur;
      f.sprite.position.y = f.y0 + k * 1.05;
      const mat = f.sprite.material as THREE.SpriteMaterial;
      mat.opacity = Math.max(0, Math.min(1, (f.t / f.dur) * 2));
      if (f.t <= 0) {
        this.scene.remove(f.sprite);
        mat.dispose();
        f.tex.dispose();
        this.floaters.splice(i, 1);
      }
    }
  }

  setLanding(x: number, z: number, visible: boolean): void {
    this.landing.visible = visible;
    if (visible) this.landing.position.set(x, 0.03, z);
  }

  burst(x: number, y: number, z: number, color: string, n = 18, speed = 5): void {
    const c = new THREE.Color(color);
    for (let k = 0; k < n; k++) {
      const i = this.cursor;
      this.cursor = (this.cursor + 1) % this.count;
      const a = Math.random() * Math.PI * 2;
      const up = Math.random() * 0.9 + 0.2;
      const sp = speed * (0.35 + Math.random() * 0.9);
      this.pPos[i * 3] = x;
      this.pPos[i * 3 + 1] = y;
      this.pPos[i * 3 + 2] = z;
      this.pVel[i * 3] = Math.cos(a) * sp;
      this.pVel[i * 3 + 1] = up * sp;
      this.pVel[i * 3 + 2] = Math.sin(a) * sp;
      const life = 0.35 + Math.random() * 0.45;
      this.pLife[i] = life;
      this.pMax[i] = life;
      this.pCol[i * 3] = c.r;
      this.pCol[i * 3 + 1] = c.g;
      this.pCol[i * 3 + 2] = c.b;
    }
  }

  /** 冲刺 / 起跳的脚边烟尘 */
  puff(x: number, z: number, color: string): void {
    const c = new THREE.Color(color);
    for (let k = 0; k < 2; k++) {
      const i = this.cursor;
      this.cursor = (this.cursor + 1) % this.count;
      this.pPos[i * 3] = x + (Math.random() - 0.5) * 0.45;
      this.pPos[i * 3 + 1] = 0.08;
      this.pPos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.45;
      this.pVel[i * 3] = (Math.random() - 0.5) * 0.9;
      this.pVel[i * 3 + 1] = 0.9 + Math.random() * 0.8;
      this.pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
      const life = 0.28 + Math.random() * 0.3;
      this.pLife[i] = life;
      this.pMax[i] = life;
      this.pCol[i * 3] = c.r;
      this.pCol[i * 3 + 1] = c.g;
      this.pCol[i * 3 + 2] = c.b;
    }
  }

  ripple(x: number, z: number, color: string, max = 4, dur = 0.6): void {
    const r = this.ripples.find((q) => q.t <= 0) ?? this.ripples[0];
    r.mesh.visible = true;
    r.mesh.position.set(x, 0.04, z);
    r.mesh.scale.setScalar(0.3);
    r.mat.color.set(color);
    r.mat.opacity = 0.85;
    r.t = dur;
    r.dur = dur;
    r.max = max;
  }

  /** 球位置弹出击球数字（世界空间 Sprite，替代原 DOM 飘字） */
  popNumber(
    x: number,
    y: number,
    z: number,
    value: number,
    combo: number,
    perfect: boolean,
    kind: string,
  ): void {
    const scale = 2;
    const w = 210;
    const h = 96;
    const c = document.createElement('canvas');
    c.width = w * scale;
    c.height = h * scale;
    const g = c.getContext('2d') as CanvasRenderingContext2D;
    g.scale(scale, scale);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.lineJoin = 'round';

    const label = KIND_LABEL[kind] ?? '';
    g.font = '700 15px "PingFang SC","Microsoft YaHei",sans-serif';
    g.lineWidth = 5;
    g.strokeStyle = 'rgba(8,24,40,0.75)';
    g.fillStyle = perfect ? '#ffd75e' : '#ffffff';
    g.strokeText(label, w / 2, 22);
    g.fillText(label, w / 2, 22);

    g.font = '900 34px "PingFang SC","Microsoft YaHei",sans-serif';
    const text = combo > 1 ? `${value}  x${combo}` : `${value}`;
    g.lineWidth = 7;
    g.strokeText(text, w / 2, 58);
    g.fillText(text, w / 2, 58);

    const tex = new THREE.CanvasTexture(c as unknown as HTMLCanvasElement);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.55, 0.71, 1);
    sprite.position.set(x, y + 0.4, z);
    sprite.renderOrder = 20;
    this.scene.add(sprite);
    this.floaters.push({ sprite, tex, t: 0.9, dur: 0.9, y0: y + 0.4 });
  }
}
