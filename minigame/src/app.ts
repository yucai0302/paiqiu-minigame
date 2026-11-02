import { GameAudio } from './audio/audio';
import type { Platform } from './platform/types';
import { SceneView } from './render/scene';
import type { Skill } from './sim/ai';
import type { TeamId } from './sim/types';
import { World } from './sim/world';
import { Gamepad } from './ui/gamepad';
import { Hud } from './ui/hud';
import { UiLayer } from './ui/layer';
import { Screens } from './ui/screens';

const STEP = 1 / 60;

type AppState = 'start' | 'playing' | 'paused' | 'result';

/** 游戏外壳：固定步长驱动模拟，3D 只占上半屏，底部交给手柄 */
export class App {
  private readonly platform: Platform;
  private readonly padH: number;
  private readonly scene: SceneView;
  private readonly ui: UiLayer;
  private readonly hud: Hud;
  private readonly screens: Screens;
  private readonly pad: Gamepad;
  private readonly audio: GameAudio;

  private world: World;
  private skill: Skill = 'normal';
  private state: AppState = 'start';

  private acc = 0;
  private last = 0;
  private rafId = 0;
  private disposed = false;

  constructor(platform: Platform) {
    this.platform = platform;
    this.padH = Math.max(124, Math.round(platform.height / 6));

    this.scene = new SceneView(
      platform.canvas,
      platform.width,
      platform.height,
      this.padH,
      platform.dpr,
    );
    this.ui = new UiLayer(platform.width, platform.height);
    this.hud = new Hud(
      this.ui,
      platform.width,
      platform.height,
      this.padH,
      platform.safeTop,
    );
    this.pad = new Gamepad(this.ui, platform, platform.width, platform.height, this.padH);
    this.screens = new Screens(this.ui, platform.width, platform.height, {
      onStart: (skill) => this.start(skill),
      onAgain: () => this.start(this.skill),
      onHome: () => this.home(),
      onResume: () => this.resume(),
    }, this.padH);
    this.audio = new GameAudio(() => platform.createAudioContext());

    this.world = this.createWorld(this.skill);
    this.hud.setVisible(false);
    this.pad.setVisible(false);
    this.pad.setEnabled(false);
    this.screens.showStart(this.skill);

    this.bindTouches();

    this.last = platform.now();
    this.rafId = platform.raf(this.loop);
    if (typeof globalThis !== 'undefined') {
      (globalThis as unknown as { __paiqiu?: App }).__paiqiu = this;
    }
  }

  dispose(): void {
    this.disposed = true;
    this.platform.cancelRaf(this.rafId);
  }

  // ---------------------------------------------------------------- 流程

  private start(skill: Skill): void {
    this.skill = skill;
    this.audio.unlock();
    this.audio.startBgm();

    this.world = this.createWorld(skill);
    this.world.startMatch();

    this.state = 'playing';
    this.screens.hide();
    this.hud.setVisible(true);
    this.pad.setVisible(true);
    this.pad.setEnabled(true);
    this.acc = 0;
    this.last = this.platform.now();
  }

  private pause(): void {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pad.setEnabled(false);
    this.pad.setVisible(false);
    this.screens.showPause();
  }

  private resume(): void {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.screens.hide();
    this.pad.setVisible(true);
    this.pad.setEnabled(true);
    this.acc = 0;
    this.last = this.platform.now();
  }

  private home(): void {
    this.world = this.createWorld(this.skill);
    this.state = 'start';
    this.screens.showStart(this.skill);
    this.hud.setVisible(false);
    this.pad.setEnabled(false);
    this.pad.setVisible(false);
  }

  // ---------------------------------------------------------------- 装配

  private createWorld(skill: Skill): World {
    const world = new World({
      teamSize: 2,
      skill,
      humanCount: 1,
      localPlayerId: 0,
      humanName: '你',
    });
    world.inputProvider = () => this.pad.read();
    this.scene.build(world);
    this.wire(world);
    return world;
  }

  private wire(world: World): void {
    world.events.on('hit', (e) => {
      this.scene.onHit(e);
      this.audio.hit(e.power, e.kind === 'attack');
    });
    world.events.on('block', (e) => {
      this.scene.onBlock(e);
      this.audio.block();
    });
    world.events.on('land', (e) => {
      this.scene.onLand(e);
      this.audio.land();
    });
    world.events.on('score', (e) => {
      this.audio.score();
      for (const p of world.players) {
        if (p.team === e.winner) this.scene.celebratePlayer(p.id);
      }
    });
    world.events.on('announce', (e) => this.hud.announce(e.text, e.sub, e.ms));
    world.events.on('tick', () => this.audio.tick());
    world.events.on('serve', () => this.audio.serve());
    world.events.on('net', () => this.audio.net());
    world.events.on('jump', () => this.audio.jump());
    world.events.on('dive', () => this.audio.dive());
    world.events.on('swing', () => this.audio.swing());
    world.events.on('setEnd', () => this.audio.fanfare());
    world.events.on('matchEnd', (e: { winner: TeamId; mvp: string }) => {
      this.state = 'result';
      this.pad.setEnabled(false);
      this.pad.setVisible(false);
      this.hud.setVisible(false);
      this.screens.showResult(world, e.winner, e.mvp);
      this.audio.fanfare();
    });
  }

  private bindTouches(): void {
    this.platform.onTouchStart((changed) => {
      if (this.screens.visible) {
        this.screens.touchStart(changed);
        return;
      }
      const first = changed[0];
      if (this.state === 'playing' && first && this.hud.hitPause(first.x, first.y)) {
        this.pause();
        return;
      }
      this.pad.onStart(changed);
    });
    this.platform.onTouchMove((active) => {
      if (!this.screens.visible) this.pad.onMove(active);
    });
    this.platform.onTouchEnd((changed, active) => {
      if (this.screens.visible) {
        this.screens.touchEnd(changed);
        return;
      }
      this.pad.onEnd(changed, active);
    });
    this.platform.onTouchCancel(() => this.pad.onCancel());
  }

  // ---------------------------------------------------------------- 主循环

  private loop = (now: number): void => {
    if (this.disposed) return;
    this.rafId = this.platform.raf(this.loop);

    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;

    if (this.state === 'playing') {
      const slow = this.world.slowmoTimer > 0;
      if (slow) this.world.slowmoTimer = Math.max(0, this.world.slowmoTimer - dt);
      this.acc += dt * (slow ? 0.42 : 1);

      let guard = 0;
      while (this.acc >= STEP && guard++ < 6) {
        this.world.step(STEP);
        this.acc -= STEP;
      }
      this.scene.sync(this.world, this.acc / STEP, dt);
      this.audio.update(dt);
    } else {
      this.acc = 0;
      this.scene.sync(this.world, 1, dt);
    }

    this.hud.update(this.world);
    this.hud.tick(dt);
    this.screens.update(dt);
    this.scene.render();
    this.ui.render(this.scene.renderer);
  };
}
