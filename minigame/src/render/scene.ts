import * as THREE from 'three';

import { clamp, damp } from '../core/math';
import type { GameEvents } from '../sim/types';
import type { World } from '../sim/world';
import type { CanvasLike } from '../platform/types';
import { Arena, skyTexture } from './arena';
import { BallView } from './ball-view';
import { CharacterView } from './character';
import { Effects } from './effects';

/** 竖屏机位：略抬高拉远，让远端看台与顶部灯光进入画面，增强场馆进深感 */
const CAM = {
  pos: new THREE.Vector3(0, 12.6, 20.8),
  look: new THREE.Vector3(0, 0.85, 0.2),
  fov: 55,
};

/** 表现层：只读取 World 状态，不写回任何模拟数据 */
export class SceneView {
  renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly effects: Effects;

  private arena = new Arena();
  private ballView = new BallView();
  private views = new Map<number, CharacterView>();

  private width: number;
  private height: number;
  private padHeight: number;

  private camPos = CAM.pos.clone();
  private camLook = CAM.look.clone();
  private shake = 0;
  private dustTimer = 0;
  private elapsed = 0;
  private previewLine: THREE.Line;
  private previewPts = new Float32Array(70 * 3);
  private receiverMark: THREE.Mesh;
  /** 最近一次 build 的角色阵容签名：同阵容重开一局直接复用角色视图，避免点击时重复烘焙贴图 */
  private rosterKey = '';
  private safeFallback = false;
  private lostNotified = false;
  private onContextLostCb: ((reason: string) => void) | null = null;

  constructor(
    canvas: CanvasLike,
    width: number,
    height: number,
    padHeight: number,
    dpr: number,
    onContextLost?: (reason: string) => void,
  ) {
    this.width = width;
    this.height = height;
    this.padHeight = padHeight;
    this.onContextLostCb = onContextLost ?? null;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas as unknown as HTMLCanvasElement,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // 显式固定色彩管线：全场景使用无光照材质，不依赖运行时灯光/色调映射差异
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.shadowMap.enabled = false;
    this.renderer.autoClear = false;
    this.bindContextEvents();

    // near/far 收紧：提升移动设备 16 位深度缓冲下的精度，避免贴身部件深度冲突
    this.camera = new THREE.PerspectiveCamera(CAM.fov, width / (height - padHeight), 0.5, 160);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camLook);

    this.scene.background = skyTexture();
    // 深色雾与场馆背景衔接，远处看台自然没入暗部
    this.scene.fog = new THREE.Fog(0x141f33, 34, 95);

    this.scene.add(this.arena.group);
    this.scene.add(this.ballView.group);
    this.effects = new Effects(this.scene, this.camera);

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(this.previewPts, 3));
    pGeo.setDrawRange(0, 0);
    this.previewLine = new THREE.Line(
      pGeo,
      new THREE.LineDashedMaterial({
        color: 0xff7aa8,
        dashSize: 0.26,
        gapSize: 0.18,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      }),
    );
    this.previewLine.frustumCulled = false;
    this.previewLine.visible = false;
    this.scene.add(this.previewLine);

    // 接球指示：头顶橙色倒三角
    this.receiverMark = new THREE.Mesh(
      new THREE.ConeGeometry(0.2, 0.32, 4),
      new THREE.MeshBasicMaterial({ color: 0xffb020, transparent: true, opacity: 0.95 }),
    );
    this.receiverMark.rotation.x = Math.PI;
    this.receiverMark.visible = false;
    this.scene.add(this.receiverMark);

    this.resize(width, height, padHeight);
  }

  /**
   * 小游戏 canvas 没有真正的 DOM 事件（wx-shim 补的 addEventListener 是空函数），
   * 所以这里的监听在真机上通常收不到；真正的兜底是 App 里定时 isContextLost() 轮询。
   */
  private bindContextEvents(): void {
    const c = this.renderer.domElement as unknown as {
      addEventListener?: (t: string, cb: () => void) => void;
    };
    const onLost = (): void => {
      this.lostNotified = true;
      this.onContextLostCb?.('webglcontextlost');
    };
    const onRestored = (): void => {
      this.lostNotified = false;
      this.onContextLostCb?.('webglcontextrestored');
    };
    try {
      if (typeof c.addEventListener === 'function') {
        c.addEventListener('webglcontextlost', onLost);
        c.addEventListener('webglcontextrestored', onRestored);
      }
    } catch {
      // 收不到就靠轮询
    }
  }

  /** WebGL 上下文是否已丢失（真机上事件不可靠，App 每秒轮询这个方法） */
  isContextLost(): boolean {
    try {
      const gl = this.renderer.getContext() as WebGLRenderingContext & {
        isContextLost?: () => boolean;
      };
      return typeof gl?.isContextLost === 'function' ? gl.isContextLost() : false;
    } catch {
      return false;
    }
  }

  /** 渲染能力摘要：真机日志里最关键的一行（GL 版本 / 最大贴图尺寸 / 画布像素 / DPR） */
  glInfo(): Record<string, string | number | boolean> {
    const out: Record<string, string | number | boolean> = {
      dpr: this.renderer.getPixelRatio(),
      canvas: `${this.width}x${this.height}`,
    };
    try {
      const c = this.renderer.domElement as unknown as { width: number; height: number };
      out.buffer = `${c.width}x${c.height}`;
    } catch {
      // 忽略
    }
    try {
      const gl = this.renderer.getContext() as WebGLRenderingContext;
      const gl2 = (globalThis as unknown as { WebGL2RenderingContext?: unknown })
        .WebGL2RenderingContext;
      const isGL2 = typeof gl2 === 'function' && gl instanceof (gl2 as new () => unknown);
      out.gl = isGL2 ? 'webgl2' : 'webgl1';
      out.maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      if (dbg) {
        out.gpu = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '').slice(0, 40);
      }
      out.lost = this.isContextLost();
    } catch {
      out.gl = 'unknown';
    }
    return out;
  }

  /** 本地排查用：主动丢弃上下文，验证自愈链路（真机调试面板上也能一键触发） */
  debugLoseContext(): void {
    try {
      const gl = this.renderer.getContext() as WebGLRenderingContext;
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      // 不支持就忽略
    }
  }

  /**
   * 上下文丢失后的重建尝试。同一张 canvas 上重建 WebGL 上下文在多数真机可行
   * （WebGL 规范会复用同一 context 对象；恢复失败时直接返回 false，由上层提示重启）。
   */
  rebuildRenderer(): boolean {
    try {
      const canvas = this.renderer.domElement as unknown as CanvasLike;
      const dpr = this.renderer.getPixelRatio();
      this.renderer.dispose();
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas as unknown as HTMLCanvasElement,
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
      this.renderer.setPixelRatio(dpr);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.NoToneMapping;
      this.renderer.shadowMap.enabled = false;
      this.renderer.autoClear = false;
      this.renderer.setSize(this.width, this.height, false);
      this.bindContextEvents();
      this.lostNotified = false;
      return !this.isContextLost();
    } catch {
      return false;
    }
  }

  /** 安全渲染降级：纯色地板 + 无光束 + 隐藏名字/号码贴图 */
  applySafeFallback(): void {
    if (this.safeFallback) return;
    this.safeFallback = true;
    this.arena.applySafeFallback();
    for (const v of this.views.values()) v.applySafeFallback();
  }

  resize(width: number, height: number, padHeight: number): void {
    this.width = width;
    this.height = height;
    this.padHeight = padHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(1, height - padHeight);
    this.camera.updateProjectionMatrix();
  }

  build(world: World): void {
    const key = world.players.map((p) => `${p.id}:${p.name}:${p.team}`).join('|');
    if (key === this.rosterKey && this.views.size === world.players.length) {
      // 同阵容（单人重开、返回首页后再开始）：直接复用，点击当帧不再创建 8 张 canvas 贴图
      return;
    }
    for (const v of this.views.values()) {
      this.scene.remove(v.root);
      v.dispose();
    }
    this.views.clear();
    for (const p of world.players) {
      const v = new CharacterView(p, p.id);
      this.views.set(p.id, v);
      this.scene.add(v.root);
    }
    this.rosterKey = key;
    if (this.safeFallback) {
      for (const v of this.views.values()) v.applySafeFallback();
    }
  }

  sync(world: World, alpha: number, dt: number): void {
    this.elapsed += dt;
    for (const p of world.players) {
      const view = this.views.get(p.id);
      if (!view) continue;
      const x = p.prev.x + (p.pos.x - p.prev.x) * alpha;
      const z = p.prev.z + (p.pos.z - p.prev.z) * alpha;
      view.update(dt, x, z, p);
    }

    const b = world.ball;
    const bx = b.prev.x + (b.pos.x - b.prev.x) * alpha;
    const by = b.prev.y + (b.pos.y - b.prev.y) * alpha;
    const bz = b.prev.z + (b.pos.z - b.prev.z) * alpha;

    const local = world.players.find((p) => p.id === world.localPlayerId);
    const hittable = world.phase === 'rally' && local !== undefined && world.ballInReach(local);
    this.ballView.setVisible(b.live || b.heldBy !== null);
    if (b.heldBy !== null) this.ballView.resetTrail();
    this.ballView.update(dt, bx, by, bz, hittable);

    const preview = world.servePreview();
    if (preview && preview.length > 1) {
      const n = Math.min(preview.length, 70);
      for (let i = 0; i < n; i++) {
        this.previewPts[i * 3] = preview[i].x;
        this.previewPts[i * 3 + 1] = preview[i].y;
        this.previewPts[i * 3 + 2] = preview[i].z;
      }
      const geo = this.previewLine.geometry as THREE.BufferGeometry;
      (geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
      geo.setDrawRange(0, n);
      this.previewLine.computeLineDistances();
      this.previewLine.visible = true;
      const last = preview[n - 1];
      this.effects.setLanding(last.x, last.z, true);
    } else {
      this.previewLine.visible = false;
      const landing = world.phase === 'rally' ? world.predictLanding() : null;
      if (landing) this.effects.setLanding(landing.x, landing.z, true);
      else this.effects.setLanding(0, 0, false);
    }

    // 冲刺脚边烟尘
    this.dustTimer -= dt;
    if (this.dustTimer <= 0) {
      this.dustTimer = 0.045;
      for (const p of world.players) {
        if (p.sprintTimer > 0 && p.grounded) {
          this.effects.puff(p.pos.x, p.pos.z, p.team === 0 ? '#8bffc4' : '#ffc0b0');
        }
      }
    }

    // 我方接球人头顶指示
    const rid = world.phase === 'rally' ? world.receiverOf(world.humanTeam) : null;
    const rp = rid !== null ? world.players.find((p) => p.id === rid) : null;
    if (rp) {
      this.receiverMark.visible = true;
      this.receiverMark.position.set(rp.pos.x, 3.1 + rp.pos.y, rp.pos.z);
      const s = 1 + Math.sin(this.elapsed * 9) * 0.12;
      this.receiverMark.scale.setScalar(s);
    } else {
      this.receiverMark.visible = false;
    }

    // 镜头跟随球做小幅平移，不做旋转
    const targetX = clamp(bx * 0.3, -2, 2);
    const targetZ = CAM.pos.z + clamp(bz * 0.12, -1.2, 1.2);
    this.camPos.x = damp(this.camPos.x, targetX, 2.4, dt);
    this.camPos.z = damp(this.camPos.z, targetZ, 2.4, dt);
    this.camLook.x = damp(this.camLook.x, bx * 0.14, 2.4, dt);
    this.camLook.z = damp(this.camLook.z, CAM.look.z + bz * 0.1, 2.4, dt);

    this.shake = Math.max(0, this.shake - dt * 2.2);

    this.camera.position.copy(this.camPos);
    if (this.shake > 0.001) {
      this.camera.position.x += (Math.random() - 0.5) * this.shake;
      this.camera.position.y += (Math.random() - 0.5) * this.shake;
    }
    this.camera.lookAt(this.camLook);

    this.effects.update(dt);
  }

  /** 只渲染上半屏 3D，底部手柄区留给 UI 层 */
  render(): void {
    const r = this.renderer;
    const gameH = this.height - this.padHeight;
    r.setScissorTest(true);
    r.setScissor(0, this.padHeight, this.width, gameH);
    r.setViewport(0, this.padHeight, this.width, gameH);
    r.clear();
    r.render(this.scene, this.camera);
    r.setScissorTest(false);
  }

  onHit(e: GameEvents['hit']): void {
    const color = e.team === 0 ? '#8dffc0' : '#ffa6b8';
    this.shake = Math.min(0.5, this.shake + e.power / 220);
    this.effects.burst(
      e.x,
      e.y,
      e.z,
      color,
      e.kind === 'attack' ? 16 : 8,
      e.kind === 'attack' ? 6 : 3.4,
    );
    this.effects.popNumber(e.x, e.y + 0.25, e.z, e.power, e.combo, e.perfect, e.kind);
  }

  onBlock(e: GameEvents['block']): void {
    this.shake = Math.min(0.4, this.shake + 0.16);
    this.effects.burst(e.x, e.y, e.z, '#ffffff', 14, 5);
  }

  onLand(e: GameEvents['land']): void {
    const color = e.winner === 0 ? '#5dffae' : '#ff7a9a';
    this.effects.ripple(e.x, e.z, color, 4.2, 0.75);
    this.effects.burst(e.x, 0.3, e.z, color, 26, 6.5);
    this.shake = Math.min(0.4, this.shake + 0.12);
  }

  celebratePlayer(id: number): void {
    this.views.get(id)?.celebrate();
  }
}
