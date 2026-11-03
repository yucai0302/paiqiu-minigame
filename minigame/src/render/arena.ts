import * as THREE from 'three';
import { COURT } from '../sim/config';
import { SAFE_MODE } from '../platform/flags';

/**
 * 室内排球馆场景。
 *
 * 参考依据：
 * - FIVB 官方规则（2025-2028）：比赛区与无障碍区必须用不同颜色，界线白色 5cm，
 *   无障碍区边线外 ≥3m；前/后场区允许不同色。
 * - 东京 2020 有明体育馆：蓝色比赛区 + 灰蓝无障碍区；巴黎 2024：紫色比赛区。
 * - VNL/职业联赛场馆：深色观众席、场地四周 LED 广告板、顶部聚光、塑胶地板反光。
 *
 * 性能：整块地板（分区+白线+噪点质感）烘焙进一张贴图，只有 1 个 mesh；
 * 看台/LED/灯光全部共享材质与贴图，draw call 与旧版持平或更低。
 */

function canvas2d(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

/** 简易确定性噪点，避免每次构建纹理不同 */
function noise(g: CanvasRenderingContext2D, w: number, h: number, alpha: number, step = 4): void {
  let seed = 12345;
  const rnd = (): number => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const v = rnd();
      g.fillStyle = v > 0.5 ? `rgba(255,255,255,${alpha * (v - 0.5)})` : `rgba(0,0,0,${alpha * (0.5 - v)})`;
      g.fillRect(x, y, step, step);
    }
  }
}

/** 场馆背景：顶部暗蓝黑 → 底部暖灰，营造室内馆的暗部氛围 */
export function skyTexture(): THREE.Texture {
  const [c, g] = canvas2d(4, 256);
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#070d18');
  grad.addColorStop(0.45, '#101c30');
  grad.addColorStop(0.8, '#1d2c44');
  grad.addColorStop(1, '#27374f');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function shadowTexture(): THREE.Texture {
  const [c, g] = canvas2d(128, 128);
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(8,14,24,0.6)');
  grad.addColorStop(0.6, 'rgba(8,14,24,0.26)');
  grad.addColorStop(1, 'rgba(8,14,24,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  return t;
}

export function ballTexture(): THREE.Texture {
  const [c, g] = canvas2d(512, 256);
  g.fillStyle = '#f6c445';
  g.fillRect(0, 0, 512, 256);

  g.lineCap = 'round';
  g.strokeStyle = '#2f57c8';
  g.lineWidth = 14;
  for (let i = 0; i < 3; i++) {
    const x0 = i * 176 + 30;
    g.beginPath();
    g.moveTo(x0, 16);
    g.bezierCurveTo(x0 + 96, 74, x0 - 34, 176, x0 + 62, 244);
    g.stroke();
  }
  g.strokeStyle = 'rgba(255,255,255,0.9)';
  g.lineWidth = 7;
  g.beginPath();
  g.moveTo(0, 128);
  g.bezierCurveTo(128, 92, 384, 168, 512, 128);
  g.stroke();

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * 地板主贴图：无障碍区 + 比赛区 + 前后场区色差 + 白色界线 + 塑胶噪点质感。
 * 覆盖范围：比赛区外扩 3m 无障碍区（规则下限），即 14 x 22。
 */
function floorTexture(): THREE.Texture {
  const W = 704;
  const H = 1104;
  const px = W / 14; // 每单位像素
  const pz = H / 22;
  const [c, g] = canvas2d(W, H);

  // 无障碍区：灰蓝
  g.fillStyle = '#46587a';
  g.fillRect(0, 0, W, H);
  noise(g, W, H, 0.1);

  // 比赛区：东京蓝；u=(x+7)/14*W, v=(z+11)/22*H
  const cx0 = 3 * px;
  const cz0 = 3 * pz;
  const cw = 8 * px;
  const cl = 16 * pz;
  g.fillStyle = '#3a76d8';
  g.fillRect(cx0, cz0, cw, cl);
  // 前场区（中线两侧各 3m）稍深，规则允许前后场不同色
  const fz = (11 - 3) * pz;
  g.fillStyle = 'rgba(23,58,118,0.28)';
  g.fillRect(cx0, fz, cw, 6 * pz);

  // 塑胶地板高光条带（沿长边的柔和反光）
  for (let i = 0; i < 5; i++) {
    const y = (i + 0.5) * (H / 5);
    const grad = g.createLinearGradient(0, y - 40, 0, y + 40);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, y - 40, W, 80);
  }
  g.save();
  g.beginPath();
  g.rect(cx0, cz0, cw, cl);
  g.clip();
  noise(g, W, H, 0.08);
  g.restore();

  // 白色界线（5cm ≈ 2.5px，取 3px 保可读）
  g.strokeStyle = '#f5f8ff';
  g.lineWidth = 3;
  g.strokeRect(cx0, cz0, cw, cl);
  // 中线
  g.beginPath();
  g.moveTo(cx0, H / 2);
  g.lineTo(cx0 + cw, H / 2);
  g.stroke();
  // 进攻线（3m 线）
  for (const z of [11 - 3, 11 + 3]) {
    g.beginPath();
    g.moveTo(cx0, z * pz);
    g.lineTo(cx0 + cw, z * pz);
    g.stroke();
  }

  // 边缘暗角，收拢视线
  const vig = g.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.62);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(6,10,18,0.35)');
  g.fillStyle = vig;
  g.fillRect(0, 0, W, H);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** 场馆外圈地板：深色木纹 */
function outerFloorTexture(): THREE.Texture {
  const [c, g] = canvas2d(256, 256);
  g.fillStyle = '#2b3140';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 8; i++) {
    g.fillStyle = i % 2 ? '#2e3546' : '#282e3c';
    g.fillRect(0, i * 32, 256, 32);
    g.strokeStyle = 'rgba(12,16,24,0.5)';
    g.lineWidth = 1;
    g.strokeRect(-1, i * 32, 258, 32);
  }
  noise(g, 256, 256, 0.12);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(10, 10);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function netTexture(): THREE.Texture {
  const [c, g] = canvas2d(256, 128);
  g.clearRect(0, 0, 256, 128);
  g.strokeStyle = 'rgba(16,22,32,0.72)';
  g.lineWidth = 2;
  const step = 16;
  for (let x = 0; x <= 256; x += step) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 128);
    g.stroke();
  }
  for (let y = 0; y <= 128; y += step) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(256, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(7, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** LED 广告板贴图：发光字条循环 */
function ledBoardTexture(): THREE.Texture {
  const [c, g] = canvas2d(1024, 64);
  const grad = g.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, '#12308f');
  grad.addColorStop(0.5, '#1555d8');
  grad.addColorStop(1, '#12308f');
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 64);
  g.fillStyle = 'rgba(255,255,255,0.92)';
  g.font = '900 30px "PingFang SC","Microsoft YaHei",system-ui,sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  // 每 256px 一个独立单元，任意整数 repeat 都能无缝平铺
  const words = ['Q-VOLLEY', 'SUPER LEAGUE', 'SPIKE!', 'Q-VOLLEY'];
  words.forEach((w, i) => {
    g.fillText(w, (i + 0.5) * 256, 26);
    g.fillStyle = 'rgba(255,255,255,0.5)';
    g.beginPath();
    g.arc(i * 256 + 250, 32, 3, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(255,255,255,0.92)';
  });
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** 看台贴图：暗部观众席色点 */
function standsTexture(): THREE.Texture {
  const [c, g] = canvas2d(512, 128);
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#141c2c');
  grad.addColorStop(1, '#0a0f1a');
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 128);
  let seed = 777;
  const rnd = (): number => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const palette = ['#3d4a63', '#54627f', '#2c3850', '#6b7a99', '#455273', '#7a6a8c', '#4a5f7a'];
  for (let row = 0; row < 7; row++) {
    for (let i = 0; i < 64; i++) {
      if (rnd() < 0.28) continue; // 空位
      g.fillStyle = palette[Math.floor(rnd() * palette.length)];
      g.fillRect(i * 8 + 1, row * 17 + 6, 5, 9);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** 静态场景：地板、球网、LED 广告板、看台、顶部灯光 */
export class Arena {
  readonly group = new THREE.Group();
  private floorMesh: THREE.Mesh | null = null;
  private readonly beams: THREE.Mesh[] = [];
  private safe = false;

  constructor() {
    this.group.add(this.buildFloor());
    this.group.add(this.buildNet());
    this.group.add(this.buildBoards());
    this.group.add(this.buildStands());
    this.group.add(this.buildLights());
  }

  /** 运行时降级：纯色地板 + 关光束（不动几何体，避免重建整个场馆） */
  applySafeFallback(): void {
    if (this.safe) return;
    this.safe = true;
    if (this.floorMesh) {
      const mat = this.floorMesh.material as THREE.MeshBasicMaterial;
      if (mat.map) {
        mat.map.dispose();
        mat.map = null;
      }
      mat.color.setHex(0x3a76d8);
      mat.needsUpdate = true;
    }
    for (const b of this.beams) b.visible = false;
  }

  private buildFloor(): THREE.Group {
    const g = new THREE.Group();

    // 场馆外圈深色地板
    const outer = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 120),
      new THREE.MeshBasicMaterial({ map: outerFloorTexture() }),
    );
    outer.rotation.x = -Math.PI / 2;
    outer.position.y = -0.04;
    g.add(outer);

    // 比赛区 + 无障碍区（一张贴图搞定分区/界线/质感；安全模式退回纯色）
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 22),
      SAFE_MODE
        ? new THREE.MeshBasicMaterial({ color: 0x3a76d8 })
        : new THREE.MeshBasicMaterial({ map: floorTexture() }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.002;
    this.floorMesh = floor;
    g.add(floor);

    return g;
  }

  private buildNet(): THREE.Group {
    const g = new THREE.Group();
    const netW = COURT.netHalfWidth * 2 + 0.2;
    const netBottom = 1.15;
    const netTop = COURT.netHeight;

    const net = new THREE.Mesh(
      new THREE.PlaneGeometry(netW, netTop - netBottom),
      new THREE.MeshBasicMaterial({
        map: netTexture(),
        transparent: true,
        alphaTest: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    net.position.set(0, (netTop + netBottom) / 2, 0);
    g.add(net);

    // 白色上网带（真实球网标志带更宽更醒目）
    const bandMat = new THREE.MeshBasicMaterial({ color: 0xf4f7fb });
    const top = new THREE.Mesh(new THREE.BoxGeometry(netW + 0.1, 0.12, 0.07), bandMat);
    top.position.set(0, netTop + 0.03, 0);
    g.add(top);
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(netW, 0.05, 0.05), bandMat);
    bottom.position.set(0, netBottom, 0);
    g.add(bottom);

    // 网柱：深色保护垫 + 底座
    const padMat = new THREE.MeshBasicMaterial({ color: 0x1d3f8f });
    const baseMat = new THREE.MeshBasicMaterial({ color: 0x39424f });
    for (const x of [-COURT.halfWidth - 0.3, COURT.halfWidth + 0.3]) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.5, 0.24), padMat);
      pad.position.set(x, 1.25, 0);
      g.add(pad);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.12, 14), baseMat);
      base.position.set(x, 0.06, 0);
      g.add(base);
    }

    // 红白天线
    const red = new THREE.MeshBasicMaterial({ color: 0xff4d5e });
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (const x of [-COURT.antennaX, COURT.antennaX]) {
      for (let i = 0; i < 4; i++) {
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.25, 8), i % 2 ? red : white);
        seg.position.set(x, netTop + 0.125 + i * 0.25, 0);
        g.add(seg);
      }
    }

    return g;
  }

  /** 场地四周 LED 广告板 */
  private buildBoards(): THREE.Group {
    const g = new THREE.Group();
    const tex = ledBoardTexture();
    const sideTex = tex.clone();
    sideTex.needsUpdate = true;
    sideTex.repeat.set(2, 1);

    const mat = new THREE.MeshBasicMaterial({ map: tex });
    const sideMat = new THREE.MeshBasicMaterial({ map: sideTex });

    const h = 0.55;
    const y = h / 2 + 0.02;
    const mk = (w: number, d: number, x: number, z: number, m: THREE.Material): void => {
      const board = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      board.position.set(x, y, z);
      g.add(board);
    };
    // 端线后两块（面向镜头），边线外两块
    mk(16, 0.12, 0, -12.6, mat);
    mk(16, 0.12, 0, 12.6, mat);
    mk(0.12, 24, -8.2, 0, sideMat);
    mk(0.12, 24, 8.2, 0, sideMat);
    return g;
  }

  /** 环形看台：四面梯形墙 + 观众色点 */
  private buildStands(): THREE.Group {
    const g = new THREE.Group();
    const tex = standsTexture();

    const mkStand = (w: number, x: number, z: number, ry: number, tilt: number): void => {
      const t = tex.clone();
      t.needsUpdate = true;
      t.repeat.set(w / 10, 1);
      const stand = new THREE.Mesh(
        new THREE.PlaneGeometry(w, 5),
        new THREE.MeshBasicMaterial({ map: t }),
      );
      stand.position.set(x, 2.2, z);
      stand.rotation.y = ry;
      stand.rotation.x = tilt;
      g.add(stand);
    };

    // 远端（镜头对面）与两侧看台；近端压低避免挡镜头
    mkStand(44, 0, -16.5, 0, -0.32);
    mkStand(30, -13.5, 0, Math.PI / 2, -0.32);
    mkStand(30, 13.5, 0, -Math.PI / 2, -0.32);
    mkStand(44, 0, 17.5, Math.PI, 0.32);
    return g;
  }

  /** 顶部灯光：发光灯板 + 斜射光束，制造体育馆光感（安全模式关闭光束） */
  private buildLights(): THREE.Group {
    const g = new THREE.Group();
    const panelMat = new THREE.MeshBasicMaterial({ color: 0xf4f9ff });
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xbfdcff,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const rigs: Array<[number, number]> = [
      [-5.5, -6],
      [5.5, -6],
      [-5.5, 6],
      [5.5, 6],
    ];
    for (const [x, z] of rigs) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.4), panelMat);
      panel.position.set(x, 10.5, z);
      g.add(panel);

      if (!SAFE_MODE) {
        const beam = new THREE.Mesh(new THREE.ConeGeometry(2.6, 10.4, 20, 1, true), beamMat);
        beam.position.set(x, 5.2, z);
        g.add(beam);
        this.beams.push(beam);
      }
    }
    return g;
  }
}
