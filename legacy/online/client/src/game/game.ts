import { GameAudio } from './audio/audio';
import { HumanInput } from './input/human-input';
import { SceneView } from './render/scene';
import { DEFAULT_TEAM_SIZE } from './sim/config';
import { emptyInput } from './sim/types';
import { World } from './sim/world';
import { Hud } from './ui/hud';
import type { Skill } from './sim/ai';
import type { ControlInput } from './sim/types';
import type { PlayClient } from '../net/play-client';

const STEP = 1 / 60;

export interface OnlineSession {
  client: PlayClient;
  seed: number;
  slot: number;
  names: string[];
}

export interface GameOptions {
  online?: OnlineSession;
  onExit?: () => void;
}

/** 游戏外壳：固定步长驱动模拟，渲染层插值，UI 只读 */
export class Game {
  private world: World;
  private scene: SceneView;
  private hud: Hud;
  private audio = new GameAudio();
  private input: HumanInput;

  private acc = 0;
  private last = 0;
  private skill: Skill = 'normal';
  private teamSize = DEFAULT_TEAM_SIZE;
  private raf = 0;
  private disposed = false;
  private online?: OnlineSession;
  private onExit?: () => void;
  private localPlayerId = 0;
  private tick = 0;
  private waiting = false;
  private readonly stepInputs = new Map<number, ControlInput>();

  private startVisible = true;
  private resultVisible = false;
  private pauseVisible = false;

  constructor(canvas: HTMLCanvasElement, fxLayer: HTMLElement, options: GameOptions = {}) {
    const size = Number(new URLSearchParams(window.location.search).get('size'));
    if (Number.isFinite(size) && size >= 1 && size <= 4) {
      this.teamSize = Math.round(size);
    }
    this.online = options.online;
    this.onExit = options.onExit;
    this.localPlayerId = this.online ? this.online.slot : 0;
    if (this.online) this.teamSize = this.online.names.length;

    this.scene = new SceneView(canvas, fxLayer);
    this.input = new HumanInput(window);
    this.hud = new Hud({
      onStart: (s) => this.startMatch(s),
      onAgain: () => (this.online ? this.exitToLobby() : this.startMatch(this.skill)),
      onHome: () => this.backHome(),
      onResume: () => this.setPaused(false),
      onQuit: () => this.backHome(),
    });

    this.world = this.createWorld(this.skill);
    if (this.online) {
      this.startVisible = false;
      this.hud.showStart(false);
      this.world.startMatch();
      this.audio.unlock();
      this.audio.startBgm();
      this.tick = 0;
    } else {
      this.hud.showStart(true);
    }

    window.addEventListener('resize', this.onResize);
    this.input.onEscape = () => {
      if (!this.online) this.togglePause();
    };
    this.input.onMute = () => {
      const muted = this.audio.toggleMute();
      this.hud.announce(muted ? '已静音' : '音效开启', '', 700);
    };

    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    this.input.dispose();
  }

  private onResize = (): void => {
    this.scene.resize();
  };

  // ---------------------------------------------------------------- 流程

  private startMatch(skill: Skill): void {
    this.skill = skill;
    this.audio.unlock();
    this.audio.startBgm();

    this.world = this.createWorld(skill);
    this.world.startMatch();

    this.startVisible = false;
    this.resultVisible = false;
    this.pauseVisible = false;
    this.hud.showStart(false);
    this.hud.hideResult();
    this.hud.showPause(false);
    this.input.reset();
    this.stepInputs.clear();
    this.tick = 0;
    this.acc = 0;
  }

  private exitToLobby(): void {
    this.onExit?.();
  }

  private backHome(): void {
    if (this.online) {
      this.exitToLobby();
      return;
    }
    this.startVisible = true;
    this.resultVisible = false;
    this.pauseVisible = false;
    this.hud.showStart(true);
    this.hud.hideResult();
    this.hud.showPause(false);
    this.world = this.createWorld(this.skill);
    this.input.reset();
    this.acc = 0;
  }

  private togglePause(): void {
    if (this.online) return;
    if (this.startVisible || this.resultVisible) return;
    this.setPaused(!this.pauseVisible);
  }

  private setPaused(v: boolean): void {
    this.pauseVisible = v;
    this.hud.showPause(v);
    this.input.reset();
  }

  // ---------------------------------------------------------------- 装配

  private createWorld(skill: Skill): World {
    const online = this.online;
    const world = new World({
      teamSize: this.teamSize,
      skill,
      humanCount: online ? online.names.length : 1,
      names: online ? online.names : undefined,
      localPlayerId: this.localPlayerId,
      seed: online ? online.seed : undefined,
    });
    world.inputProvider = (playerId) => this.sampleInput(playerId);
    this.scene.build(world);
    this.wire(world);
    return world;
  }

  private sampleInput(playerId: number): ControlInput {
    if (!this.online) {
      return playerId === this.localPlayerId ? this.input.read() : emptyInput();
    }
    return this.stepInputs.get(playerId) ?? emptyInput();
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
    world.events.on('matchEnd', (e) => {
      this.resultVisible = true;
      this.hud.showResult(world, e.winner, e.mvp);
      this.audio.fanfare();
    });
  }

  // ---------------------------------------------------------------- 主循环

  private loop = (now: number): void => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const realDt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;

    const running = !this.startVisible && !this.resultVisible && !this.pauseVisible;
    this.input.enabled = running;

    if (running) {
      const slow = this.world.slowmoTimer > 0;
      if (slow) this.world.slowmoTimer = Math.max(0, this.world.slowmoTimer - realDt);
      this.acc += realDt * (slow ? 0.42 : 1);

      let guard = 0;
      while (this.acc >= STEP && guard++ < 6) {
        if (this.online) {
          const remote = this.online.client.takeInput(this.tick);
          if (!remote) {
            this.acc = Math.min(this.acc, STEP);
            if (!this.waiting) {
              this.waiting = true;
              this.hud.announce('等待队友…', '对局中请保持在当前标签页', 1500);
            }
            break;
          }
          this.waiting = false;
          const local = this.input.read();
          this.stepInputs.set(this.online.slot, local);
          this.stepInputs.set(1 - this.online.slot, remote);
          this.online.client.sendInput(this.tick, local);
        }
        this.world.step(STEP);
        this.tick++;
        this.acc -= STEP;
      }
      this.scene.sync(this.world, this.acc / STEP, realDt);
      this.audio.update(realDt);
    } else {
      this.acc = 0;
      this.scene.sync(this.world, 1, realDt);
    }

    this.scene.render();
    this.hud.update(this.world);
  };
}
