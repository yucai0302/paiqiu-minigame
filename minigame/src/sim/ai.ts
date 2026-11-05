import { clamp, dist2D } from '../core/math';
import type { Rng } from '../core/math';
import { PLAYER } from './config';
import { slotPosition } from './formation';
import { emptyInput } from './types';
import type { ControlInput, Phase, Player } from './types';
import type { World } from './world';

export type Skill = 'easy' | 'normal' | 'hard';

/** ally = 真人队友，foe = 对手；两套参数分开，队友始终会配合，对手按难度加压 */
export type AiRole = 'ally' | 'foe';

export interface AiProfile {
  label: string;
  /** 移动速度倍率 */
  moveScale: number;
  /** 反应间隔：在这段时间内不改决策 */
  reaction: number;
  /** 落点判断误差（米） */
  aimError: number;
  /** 发球蓄力范围 */
  servePower: [number, number];
  /** 是否具备扣球能力 */
  canSpike: boolean;
  /** 有扣球机会时真的起跳扣杀的概率 */
  spikeChance: number;
  /** 起跳提前量（秒，球下落到扣球高度前多久起跳） */
  jumpLead: number;
  /** 起跳时机误差（秒） */
  jumpErr: number;
  /** 扣球落点偏差（米） */
  attackAimError: number;
  /** 扣球球速倍率（<1 更慢、更好接） */
  attackScale: number;
  /** 对面扣球后多久才开始移动（秒，模拟反应不及） */
  digDelay: number;
  /** 接扣球时允许的横向离球距离（米），越小越容易被扣死 */
  digReach: number;
  /** 判断到对手进攻时起跳拦网的概率（0 = 不拦网） */
  blockChance: number;
  /** 面对拦网手时“打手出界/改线”的概率（越高越会避开拦网，但不会自动绕过真人） */
  wipeChance: number;
  /** 拦网站位的横向误差（米）：越大越容易漏拦，避免 AI 拦网过于无敌 */
  blockError: number;
  /** 二传给真人做球的积极性 0~1（0 = 不配合） */
  teamplay: number;
}

export const AI_PROFILES: Record<Skill, Record<AiRole, AiProfile>> = {
  easy: {
    ally: {
      label: '简单·队友',
      moveScale: 0.95,
      reaction: 0.2,
      aimError: 0.3,
      servePower: [0.5, 0.8],
      canSpike: true,
      spikeChance: 0.85,
      jumpLead: 0.34,
      jumpErr: 0.03,
      attackAimError: 0.5,
      attackScale: 0.95,
      digDelay: 0.12,
      digReach: 1.15,
      blockChance: 0.32,
      wipeChance: 0,
      blockError: 0.5,
      teamplay: 1,
    },
    foe: {
      label: '简单·对手',
      moveScale: 0.75,
      reaction: 0.45,
      aimError: 0.9,
      servePower: [0.45, 0.7],
      canSpike: true,
      spikeChance: 0.5,
      jumpLead: 0.34,
      jumpErr: 0.1,
      attackAimError: 0.8,
      attackScale: 1,
      digDelay: 0.4,
      digReach: 1,
      blockChance: 0,
      wipeChance: 0.05,
      blockError: 0.9,
      teamplay: 0,
    },
  },
  normal: {
    ally: {
      label: '普通·队友',
      moveScale: 0.98,
      reaction: 0.15,
      aimError: 0.25,
      servePower: [0.55, 0.85],
      canSpike: true,
      spikeChance: 0.9,
      jumpLead: 0.34,
      jumpErr: 0.02,
      attackAimError: 0.35,
      attackScale: 1,
      digDelay: 0.1,
      digReach: 1.3,
      blockChance: 0.16,
      wipeChance: 0,
      blockError: 0.5,
      teamplay: 0.95,
    },
    foe: {
      label: '普通·对手',
      moveScale: 0.93,
      reaction: 0.24,
      aimError: 0.5,
      servePower: [0.55, 0.85],
      canSpike: true,
      spikeChance: 0.8,
      jumpLead: 0.34,
      jumpErr: 0.04,
      attackAimError: 0.52,
      attackScale: 1.05,
      digDelay: 0.24,
      digReach: 1.28,
      blockChance: 0.05,
      wipeChance: 0.3,
      blockError: 1.5,
      teamplay: 0,
    },
  },
  hard: {
    ally: {
      label: '困难·队友',
      moveScale: 1,
      reaction: 0.1,
      aimError: 0.2,
      servePower: [0.6, 0.95],
      canSpike: true,
      spikeChance: 0.95,
      jumpLead: 0.34,
      jumpErr: 0.015,
      attackAimError: 0.25,
      attackScale: 1.02,
      digDelay: 0.08,
      digReach: 1.4,
      blockChance: 0.24,
      wipeChance: 0,
      blockError: 0.4,
      teamplay: 0.9,
    },
    foe: {
      label: '困难·对手',
      moveScale: 1,
      reaction: 0.18,
      aimError: 0.3,
      servePower: [0.6, 0.95],
      canSpike: true,
      spikeChance: 0.92,
      jumpLead: 0.34,
      jumpErr: 0.025,
      attackAimError: 0.38,
      attackScale: 1.19,
      digDelay: 0.17,
      digReach: 1.36,
      blockChance: 0.1,
      wipeChance: 0.55,
      blockError: 1.2,
      teamplay: 0,
    },
  },
};

/** 兼容旧导出：世界层只用到 label / moveScale / reaction 等摘要信息 */
export const SKILLS: Record<Skill, { label: string; moveScale: number; reaction: number; aimError: number; canSpike: boolean }> =
  {
    easy: { ...pick(AI_PROFILES.easy.foe), label: '简单' },
    normal: { ...pick(AI_PROFILES.normal.foe), label: '普通' },
    hard: { ...pick(AI_PROFILES.hard.foe), label: '困难' },
  };

function pick(p: AiProfile): { moveScale: number; reaction: number; aimError: number; canSpike: boolean } {
  return { moveScale: p.moveScale, reaction: p.reaction, aimError: p.aimError, canSpike: p.canSpike };
}

export function aiProfile(skill: Skill, role: AiRole): AiProfile {
  return AI_PROFILES[skill][role];
}

/** 人机大脑：每 tick 产出一份与真人完全一致的 ControlInput */
export class AIBrain {
  readonly role: AiRole;
  readonly profile: AiProfile;
  /** 第二拍是否要把球直接推过网（二传赶不上或真人不在进攻位时兜底用） */
  dump = false;

  private phase: Phase = 'idle';
  private thinkTimer = 0;
  private target: { x: number; z: number } | null = null;
  private servePower = 0.6;
  private lastTouchSeen = -1;
  private lastOppTouchSeen = -1;
  private spikeWanted = false;
  private blockWanted = false;
  /** 每次拦网的固定横向误差（每次进攻只抽一次，避免抖动） */
  private blockOffset = 0;
  private readonly rng: Rng;
  /** 前后排分工开关（bench 分组对比用；默认开） */
  private readonly frontBack: boolean;

  constructor(skill: Skill, rng: Rng, role: AiRole = 'foe', frontBack = true) {
    this.role = role;
    this.profile = aiProfile(skill, role);
    this.rng = rng;
    this.frontBack = frontBack;
    this.thinkTimer = rng(0, 0.1);
  }

  get moveScale(): number {
    return this.profile.moveScale;
  }

  get canSpike(): boolean {
    return this.profile.canSpike;
  }

  think(world: World, p: Player, dt: number): ControlInput {
    const inp = emptyInput();
    this.dump = false;
    const phase = world.phase;

    if (phase !== this.phase) {
      if (phase === 'serve') {
        this.servePower = this.rng(this.profile.servePower[0], this.profile.servePower[1]);
        this.thinkTimer = 0;
        this.target = null;
        this.lastTouchSeen = -1;
        this.spikeWanted = false;
      }
      this.phase = phase;
    }

    if (phase === 'idle' || phase === 'point' || phase === 'setend' || phase === 'matchend') {
      return inp;
    }

    if (phase === 'serve') {
      if (p.id === world.serverId) {
        inp.hitHeld = p.charge < this.servePower;
      } else {
        const s = slotPosition(p.team, world.teamSize, p.slot);
        this.moveTo(p, inp, s.x, s.z);
      }
      return inp;
    }

    // ---- 对打阶段 ----
    const ball = world.ball;
    const landing = world.predictLanding();
    const mySign = p.team === 0 ? 1 : -1;
    const opp: 0 | 1 = p.team === 0 ? 1 : 0;

    // 对面的球以扣球速度飞过来时，先“愣”一小会儿再启动（球速快，反应不及）
    const incomingAttack = ball.live && ball.lastKind === 'attack' && ball.lastHitTeam === opp;
    const digFrozen = incomingAttack && world.time - world.lastAttackTime[opp] < this.profile.digDelay;

    this.thinkTimer -= dt;
    if (this.thinkTimer <= 0) {
      this.thinkTimer = this.profile.reaction;
      if (!digFrozen) this.updateTarget(world, p, landing);
    }
    if (this.target) this.moveTo(p, inp, this.target.x, this.target.z);

    const canHit = world.ballInReach(p);
    const touches = world.touches[p.team];
    const plan = world.attackPlan[p.team];
    const isSetter = plan.setterId === p.id;
    const isAttacker = plan.attackerId === null || plan.attackerId === p.id;
    const hd = dist2D(ball.pos.x, ball.pos.z, p.pos.x, p.pos.z);
    const closest = this.isClosest(world, p, landing);

    if (touches !== this.lastTouchSeen) {
      if (touches === 2) {
        this.spikeWanted = this.profile.canSpike && this.rng(0, 1) < this.profile.spikeChance;
      }
      this.lastTouchSeen = touches;
    }
    if (world.touches[opp] !== this.lastOppTouchSeen) {
      if (world.touches[opp] === 1) {
        this.blockWanted = this.rng(0, 1) < this.profile.blockChance;
        this.blockOffset = this.rng(-1, 1) * this.profile.blockError;
      }
      this.lastOppTouchSeen = world.touches[opp];
    }

    // 接扣球时对落点要求更严：离球不够近就救不起
    const digOk = !incomingAttack || hd <= this.profile.digReach;
    const oppTouches = world.touches[opp];

    if (touches >= 2) {
      if (isAttacker) {
        if (this.spikeWanted && p.grounded && this.shouldJump(world, p, hd)) inp.jump = true;
        if (world.attackWindow(p) && digOk) {
          inp.hit = true;
          inp.aimX = this.attackAim(world, p, this.profile.attackAimError);
        } else if (canHit && hd < 1.0 && ball.pos.y < 1.35) {
          // 球已经掉下来，起跳也打不到：低手处理过网
          inp.hit = true;
        }
      } else if (canHit && digOk && ball.pos.y < 1.5 && hd < 1.0) {
        // 扣球手没跟上，队友兜底把球处理过网
        inp.hit = true;
      }
    } else if (touches === 1) {
      if (isSetter) {
        if (canHit && digOk) {
          // 真人主攻远未就位 / 站着不动时，别吊给空气，直接把球推过网
          const attacker = this.findAttacker(world, p);
          const zone = world.attackZone(p.team);
          const attDist = attacker ? dist2D(attacker.pos.x, attacker.pos.z, zone.x, zone.z) : 99;
          // 只看位置：真人主攻在进攻区附近就正常吊球给他，不再因为“他在移动”就改推过网。
          // 二传落点已经改成“主攻脚下”，只有真人彻底失位（>7m）才推过网兜底。
          this.dump = this.role === 'ally' && !!attacker && attacker.isHuman && attDist > 7;
          inp.hit = true;
          if (!this.dump) {
            // 直接把球吊到主攻头顶，而不是球网前的固定区（真人跑不到就没法扣）
            const aimX = attacker ? attacker.pos.x : zone.x;
            inp.aimX = clamp(aimX + this.rng(-0.3, 0.3), -3, 3);
          }
        }
      } else if (isAttacker) {
        // 快攻（真人按「二传」做球）：提前 0.35s 起跳，否则球进扣球带时人才刚离地
        if (p.grounded && world.quickAttack[p.team] === p.id) {
          const tt = world.ballTimeToHeight(PLAYER.spikeMaxY);
          if (tt !== null && tt <= 0.35) inp.jump = true;
        }
        if (world.attackWindow(p) && digOk) {
          // 真人按「二传」做球 → 队友这一拍直接快扣（不再多垫一拍）；
          // 快攻这一拍也起跳，否则画面上像“站着把球顶回去”，不像扣杀
          inp.hit = true;
          inp.aimX = this.attackAim(world, p, this.profile.attackAimError);
        } else if (canHit && digOk && ball.pos.y < 1.1 && hd < 0.9) {
          // 二传没赶上，主攻只能低位兜底
          inp.hit = true;
        }
      }
    } else if (canHit && digOk && (closest || hd < 0.8)) {
      inp.hit = true;
    }

    // 拦网：看到对面攻手起跳 / 扣球已经出手 → 同步起跳封堵。
    // 之前的判据是“对方的二传球下落到网前”就跳，跳早了 0.4~0.5s，球真正过网时人已经在下落，
    // 所以拦网起跳很多、真正拦到很少。改成与真人一致的时机：对方扣球手离地 → 立刻起跳。
    const oppAttacker = world.players.find(
      (q) =>
        q.team === opp &&
        !q.grounded &&
        q.pos.y > 0.05 &&
        Math.abs(q.pos.z) < 2.8,
    );
    const oppSpiking = ball.live && ball.lastKind === 'attack' && ball.lastHitTeam === opp;
    const mateNow = world.players.find((q) => q.team === p.team && q.id !== p.id);
    const mateFrontNow = !!mateNow && Math.abs(mateNow.pos.z) <= 3.0;
    if (
      this.blockWanted &&
      (oppAttacker || oppSpiking) &&
      ball.live &&
      Math.abs(p.pos.z) < 1.8 &&
      p.grounded &&
      !(this.frontBack && this.role === 'ally' && mateFrontNow)
    ) {
      inp.block = true;
    }

    return inp;
  }

  private findAttacker(world: World, p: Player): Player | null {
    const plan = world.attackPlan[p.team];
    if (plan.attackerId === null) return null;
    return world.players.find((q) => q.id === plan.attackerId && q.team === p.team) ?? null;
  }

  /** 球下落到扣球带下沿前 jumpLead 秒起跳（比“看球高就跳”准得多） */
  private shouldJump(world: World, p: Player, hd: number): boolean {
    if (hd > 2.3) return false;
    if (world.touches[p.team] !== 2) return false;
    const plan = world.attackPlan[p.team];
    if (plan.attackerId !== null && plan.attackerId !== p.id) return false;
    // 扣球带是相对地面的固定高度带，起跳时机按“球落到带上沿偏下”来算
    const tt = world.ballTimeToHeight(PLAYER.spikeMinY + 0.6);
    if (tt === null) return false;
    const lead = this.profile.jumpLead + this.rng(-this.profile.jumpErr, this.profile.jumpErr);
    return tt <= lead && tt >= 0;
  }

  private attackAim(world: World, p: Player, err: number): number {
    const sign = p.team === 0 ? -1 : 1;
    const opps = world.players.filter((q) => q.team !== p.team);
    const landZ = sign * 4.8;
    let best = 0;
    let bestGap = -1;
    for (const x of [-3.2, -2.2, -1.2, 0, 1.2, 2.2, 3.2]) {
      let nearest = Infinity;
      for (const q of opps) nearest = Math.min(nearest, dist2D(q.pos.x, q.pos.z, x, landZ));
      if (nearest > bestGap) {
        bestGap = nearest;
        best = x;
      }
    }
    return clamp(best + this.rng(-err, err), -3.6, 3.6);
  }

  private updateTarget(
    world: World,
    p: Player,
    landing: { x: number; z: number; t: number } | null,
  ): void {
    const mySign = p.team === 0 ? 1 : -1;
    const slot = slotPosition(p.team, world.teamSize, p.slot);
    const ball = world.ball;
    const touches = world.touches[p.team];
    const plan = world.attackPlan[p.team];
    const err = this.profile.aimError;
    const opp = p.team === 0 ? 1 : 0;

    const incoming = landing !== null && Math.sign(landing.z) === mySign && ball.live;

    // 前后排分工：默认由 AI 队友负责后场。
    // - 玩家在前排（|z|≤3m）时，队友必须退到后场防守位（两人不能同一前排队位）；
    // - 玩家主动后撤到后场时，队友才能上前（拦网/二传），此时后场由玩家覆盖；
    // - 只有轮到自己做第二拍二传（settingThisTouch）时才上前。
    const mate = world.players.find((q) => q.team === p.team && q.id !== p.id);
    const mateFront = !!mate && Math.abs(mate.pos.z) <= 3.0;
    const settingThisTouch =
      touches === 1 && plan.setterId === p.id && ball.live && Math.sign(ball.pos.z) === mySign;
    // 这一拍轮到自己进攻时不能退后场（会把“玩家做球 → 队友扣杀”破坏掉）。
    // 关键：己方球还在空中（玩家刚按「二传」把球吊起来、touches 还停在 1）时也算进攻拍，
    // 否则队友会让位回后场，球落在网前 2m 处没人接（实机“二传给空气”的根因）。
    const ourBall = ball.live && ball.lastHitTeam === p.team;
    const attackingThisTouch =
      plan.attackerId === p.id && (touches >= 2 || ourBall || world.quickAttack[p.team] === p.id);
    const coverBack =
      this.frontBack &&
      this.role === 'ally' &&
      !settingThisTouch &&
      !attackingThisTouch &&
      mateFront;

    // 己方球在空中且轮到自己进攻（玩家/队友的二传）：立刻从后场冲向这一拍，不再守后场
    if (attackingThisTouch && ourBall && Math.sign(ball.pos.z) === mySign) {
      if (landing && Math.sign(landing.z) === mySign) {
        this.target = { x: landing.x, z: landing.z };
      } else {
        const zone = world.attackZone(p.team);
        this.target = { x: zone.x, z: zone.z };
      }
      return;
    }

    // 对手第二拍（二传）已经出球、球还在对面半场时才上到网前封堵。
    // 之前只要对面第一拍垫起就跑去网前，等于整轮放弃后场防守，救球数直接少了四成。
    if (
      this.blockWanted &&
      !coverBack &&
      world.touches[opp] >= 2 &&
      ball.live &&
      Math.sign(ball.pos.z) !== mySign &&
      Math.abs(ball.pos.z) < 3.4 &&
      ball.pos.y > 1.6
    ) {
      this.target = { x: clamp(ball.pos.x + this.blockOffset, -3.2, 3.2), z: mySign * 1.25 };
      return;
    }

    // 救球优先级最高：球要落在己方半场时先判断“我来不来得及”，再看队友是不是已经贴在球边。
    // 只对“对方的球”生效（扣球或本方还没碰过的来球）；自家二传/垫起的球不能抢，否则
    // AI 会追着自己刚传出去的球跑回网前，既破坏前后排分工又抢了主攻的球。
    const spike = ball.live && ball.lastKind === 'attack' && ball.lastHitTeam === opp;
    const freeFromOpp = world.touches[p.team] === 0 && ball.lastHitTeam === opp;
    if (incoming && landing!.t < 2.6 && (spike || freeFromOpp)) {
      const mateDist = mate ? dist2D(mate.pos.x, mate.pos.z, landing!.x, landing!.z) : 99;
      const myDist = dist2D(p.pos.x, p.pos.z, landing!.x, landing!.z);
      const eta = myDist / Math.max(1, PLAYER.moveSpeed * p.speedScale);
      // 留 0.42s 余量：不必正好跑到落点，进入 digReach 范围就能救起
      const canReach = landing!.t + 0.42 >= eta;
      if (this.role === 'ally') {
        // 前排（网前 2.9m 内）是真人队友的责任区：他离得近、或者已经按了二传/扣杀/拦网，
        // 就把这一拍让给他，AI 不要从后场冲上来抢（实机“站网前按二传却被队友摸走”的根因）。
        const frontZone = Math.abs(landing!.z) <= 2.9;
        const mateFrontZone = !!mate && Math.abs(mate.pos.z) <= 3.0;
        const mateIntent =
          !!mate && (mate.setupBuffer > 0 || mate.spikeBuffer > 0 || mate.blockCd > 0.3);
        const giveToMate = frontZone && mateFrontZone && (mateDist <= 1.8 || mateIntent);
        // 队友：够得着就去救。对面扣球时不再“让给真人”——真人反应慢半拍就接不住这种快球。
        // 快球判定“来不及”时也别放弃：跑到附近仍然有起球机会（自动接球/扑救都有范围）
        if ((canReach || (spike && myDist < 3.2)) && !giveToMate) {
          this.target = { x: landing!.x, z: landing!.z };
          return;
        }
      }
      if (mateDist > 1.5) {
        this.target = { x: landing!.x, z: landing!.z };
        return;
      }
    }

    if (coverBack) {
      // 后场防守位：两人不同竖线，按落点/来球方向分边
      this.target = this.backCourtTarget(world, p, mate, landing);
      return;
    }

    if (!incoming) {
      let tx = slot.x;
      let tz = slot.z;
      const oppTouches = world.touches[opp];
      if (ball.live && Math.sign(ball.pos.z) !== mySign && oppTouches >= 2) {
        // 对手准备第三次触球：退到中场防守，盯住球的方向
        tx = clamp(ball.pos.x * 0.45 + slot.x * 0.3, -3, 3);
        tz = mySign * 4.1;
      }
      this.target = { x: tx, z: tz };
      return;
    }

    const landingTarget = {
      x: clamp(landing!.x + this.rng(-err, err), -4 + 0.3, 4 - 0.3),
      z: clamp(landing!.z + this.rng(-err, err), mySign > 0 ? 0.6 : -8.4, mySign > 0 ? 8.4 : -0.6),
    };

    if (touches === 0) {
      // 第一拍：最近的人接一传，另一人提前到网前准备二传
      if (this.isClosest(world, p, landing)) {
        this.target = landingTarget;
      } else {
        this.target = {
          x: clamp(slot.x * 0.75 + landing!.x * 0.2, -3, 3),
          z: mySign * 2.4,
        };
      }
      return;
    }

    if (touches === 1) {
      // 第二拍：二传去接球；主攻提前跑到网前进攻区
      if (plan.setterId === null || plan.setterId === p.id) {
        this.target = landingTarget;
      } else if (plan.attackerId === p.id) {
        const zone = world.attackZone(p.team);
        this.target = { x: zone.x, z: zone.z };
      } else {
        this.target = { x: slot.x, z: slot.z };
      }
      return;
    }

    // 第三拍：主攻追球起跳，其余人回位防守
    if (plan.attackerId === null || plan.attackerId === p.id) {
      this.target = landingTarget;
    } else {
      this.target = { x: slot.x, z: mySign * Math.max(4, Math.abs(slot.z)) };
    }
  }

  private isClosest(world: World, p: Player, landing: { x: number; z: number } | null): boolean {
    if (!landing) return false;
    const d = dist2D(p.pos.x, p.pos.z, landing.x, landing.z);
    for (const q of world.players) {
      if (q.team !== p.team || q.id === p.id) continue;
      const dq = dist2D(q.pos.x, q.pos.z, landing.x, landing.z);
      // 真人想接就让他接（不再用“是否移动”判断，真人摇杆永远在微动）
      if (dq < d - 0.35) return false;
    }
    return true;
  }

  /**
   * 前后排分工的后场防守位：
   * - z 固定在后场 4.2~5.8m（默认 4.6m）；
   * - 有己方落点时守落点；
   * - 对手持球时按来球的左右镜像站位（中路偏一侧），并和玩家错开至少 1.5m 的竖线，
   *   避免“两人同一条线互让球”。
   */
  private backCourtTarget(
    world: World,
    p: Player,
    mate: Player | undefined,
    landing: { x: number; z: number; t: number } | null,
  ): { x: number; z: number } {
    const mySign = p.team === 0 ? 1 : -1;
    // 只有“对方的球”才守落点；自家二传/垫起的球是要给主攻扣的，
    // 去守它会把队友又拽回网前（这正是二传后不回撤的原因）
    const oppBall = world.ball.live && world.ball.lastHitTeam === (1 - p.team);
    let x = 0;
    let z = 4.35;
    if (oppBall && landing && Math.sign(landing.z) === mySign && landing.t < 2.4) {
      // 有明确落点：守落点，但仍留在后场（≥3.6m），避免和前排玩家叠在一起
      x = landing.x;
      z = clamp(Math.abs(landing.z), 3.6, 5.8);
    } else if (world.ball.live && Math.sign(world.ball.pos.z) !== mySign) {
      // 对面持球（还没扣）：站中路、并朝来球可能的斜线方向偏一点
      x = clamp(-world.ball.pos.x * 0.5, -2.4, 2.4);
    }
    if (mate && Math.abs(x - mate.pos.x) < 1.5) {
      // 两人错开竖线：宁可偏移到另一侧，也不和玩家踩同一条线
      x = mate.pos.x >= 0 ? clamp(mate.pos.x - 2.2, -3.2, 3.2) : clamp(mate.pos.x + 2.2, -3.2, 3.2);
    }
    return { x, z: mySign * z };
  }

  private moveTo(p: Player, inp: ControlInput, x: number, z: number): void {
    const dx = x - p.pos.x;
    const dz = z - p.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.24) return;
    inp.moveX = dx / d;
    inp.moveZ = dz / d;
    if (d > 2.6 && p.sprintCd <= 0 && p.grounded) inp.sprint = true;
  }
}
