/**
 * 房间客户端：建房/进房/开局/快照与输入上行/断线重连，协议为 JSON 文本帧。
 * 服务器只做房间管理与转发，不跑游戏逻辑（主机权威：房主端跑完整仿真）。
 */

import type { ControlInput } from '../sim/types';
import type { Skill } from '../sim/ai';
import type { Snap } from './mirror';
import { openTransport } from './transport';
import type { NetTransport } from './transport';

/** 开发/自动化测试用本地 WS 服务；生产走云开发（见 src/net/cloud.ts 与 src/config/cloud.ts） */
export const DEFAULT_SERVER_URL = 'ws://localhost:7788';

/** 本地 WS 快照频率 */
const SNAP_HZ_LOCAL = 15;

export interface RoomPlayer {
  pid: number;
  name: string;
}

export interface StartCfg {
  skill: Skill;
  seed: number;
  /** [房主名, 好友名]，好友缺席时第二项为空串 */
  names: [string, string];
  /** 好友位是否由 AI 补齐 */
  fillAi: boolean;
}

export type RoomEvent =
  | { t: 'room'; roomId: string; pid: 0 | 1; players: RoomPlayer[] }
  | { t: 'players'; players: RoomPlayer[] }
  | { t: 'start'; cfg: StartCfg }
  | { t: 'snap'; d: Snap }
  | { t: 'input'; d: ControlInput }
  | { t: 'peerLeft'; reason: string }
  | { t: 'peerBack' }
  | { t: 'againReq' }
  | { t: 'error'; code: string; msg: string }
  | { t: 'down' };

const PING_MS = 2500;
const DEAD_MS = 12000;

/** 联网客户端统一接口：本地 WS（开发/自动化测试）与云开发（生产）共用 */
export interface NetClient {
  readonly roomId: string | null;
  readonly pid: 0 | 1;
  /** 房主快照广播频率（本地 WS 15Hz；云数据库降频 8Hz） */
  readonly snapHz: number;
  createRoom(name: string): void;
  joinRoom(roomId: string, name: string, resume?: boolean): void;
  sendStart(skill: Skill): void;
  sendInput(inp: ControlInput): void;
  sendSnap(d: Snap): void;
  sendAgain(): void;
  /** 对局结束持久化（云实现落库；WS 实现无此能力则缺省） */
  settle?(result: { winner: number; setsWon: [number, number]; mvp: string }): void;
  leave(): void;
}

export class RoomClient implements NetClient {
  roomId: string | null = null;
  pid: 0 | 1 = 0;
  readonly snapHz = SNAP_HZ_LOCAL;

  private tx: NetTransport | null = null;
  private hello: Record<string, unknown> | null = null;
  private lastMsgAt = 0;
  private watchdog: ReturnType<typeof setInterval> | null = null;
  private suppressDown = false;

  constructor(
    private readonly onEvent: (e: RoomEvent) => void,
    private readonly url: string,
  ) {}

  createRoom(name: string): void {
    this.hello = { t: 'create', name };
    this.roomId = null;
    this.connect();
  }

  joinRoom(roomId: string, name: string, resume = false): void {
    if (!roomId) return;
    this.roomId = roomId;
    this.hello = { t: 'join', roomId, name, resume };
    this.connect();
  }

  /** 房主：广播开局（seed 保证两端构造出一致的阵容与站位） */
  sendStart(skill: Skill): void {
    this.send({ t: 'start', skill, seed: Date.now() % 2147483647 });
  }

  /** 好友：上行本地手柄输入 */
  sendInput(inp: ControlInput): void {
    this.send({ t: 'in', d: inp });
  }

  /** 房主：广播仿真快照 */
  sendSnap(d: Snap): void {
    this.send({ t: 'snap', d });
  }

  /** 好友：请求房主再来一局 */
  sendAgain(): void {
    this.send({ t: 'again' });
  }

  leave(): void {
    this.suppressDown = true;
    this.send({ t: 'cancel' });
    this.tx?.close();
    this.stopWatchdog();
    this.roomId = null;
    this.hello = null;
  }

  // ---------------------------------------------------------------- 内部

  private connect(): void {
    this.stopWatchdog();
    this.suppressDown = false;
    this.tx?.close();
    const tx = openTransport(this.url);
    this.tx = tx;
    let closed = false;
    tx.onOpen(() => {
      this.lastMsgAt = Date.now();
      if (this.hello) tx.send(JSON.stringify(this.hello));
    });
    tx.onMessage((d) => {
      this.lastMsgAt = Date.now();
      this.handle(d);
    });
    tx.onError(() => undefined);
    tx.onClose(() => {
      if (closed) return;
      closed = true;
      this.stopWatchdog();
      if (!this.suppressDown) this.onEvent({ t: 'down' });
    });
    this.lastMsgAt = Date.now();
    this.watchdog = setInterval(() => {
      if (Date.now() - this.lastMsgAt > DEAD_MS) {
        // 静默太久，主动断开，走 onClose -> down -> 重连
        this.suppressDown = false;
        tx.close();
        return;
      }
      this.send({ t: 'ping' });
    }, PING_MS);
  }

  private handle(raw: string): void {
    let m: Record<string, unknown>;
    try {
      m = JSON.parse(raw);
    } catch {
      return;
    }
    switch (m.t) {
      case 'room':
        this.roomId = String(m.roomId);
        this.pid = (m.pid as 0 | 1) ?? 0;
        this.onEvent({
          t: 'room',
          roomId: this.roomId,
          pid: this.pid,
          players: (m.players as RoomPlayer[]) ?? [],
        });
        break;
      case 'players':
        this.onEvent({ t: 'players', players: (m.players as RoomPlayer[]) ?? [] });
        break;
      case 'start':
        this.onEvent({ t: 'start', cfg: m.cfg as StartCfg });
        break;
      case 'snap':
        this.onEvent({ t: 'snap', d: m.d as Snap });
        break;
      case 'input':
        this.onEvent({ t: 'input', d: m.d as ControlInput });
        break;
      case 'peerLeft':
        this.onEvent({ t: 'peerLeft', reason: String(m.reason ?? '') });
        break;
      case 'peerBack':
        this.onEvent({ t: 'peerBack' });
        break;
      case 'againReq':
        this.onEvent({ t: 'againReq' });
        break;
      case 'error':
        this.onEvent({ t: 'error', code: String(m.code), msg: String(m.msg) });
        break;
      case 'pong':
      case 'ping':
        break;
      default:
        break;
    }
  }

  private send(o: unknown): void {
    try {
      this.tx?.send(JSON.stringify(o));
    } catch {
      // 底层断开时静默，断线由 watchdog/onClose 兜底
    }
  }

  private stopWatchdog(): void {
    if (this.watchdog !== null) {
      clearInterval(this.watchdog);
      this.watchdog = null;
    }
  }
}
