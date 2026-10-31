import { logger } from '@lark-apaas/client-toolkit/logger';

import type { ControlInput } from '../game/sim/types';

export interface RoomPlayerInfo {
  slot: number;
  name: string;
}

export interface RoomState {
  code: string;
  started: boolean;
  you: number;
  players: RoomPlayerInfo[];
}

export interface StartInfo {
  seed: number;
  players: RoomPlayerInfo[];
}

export interface PlayClientHandlers {
  onRoom: (room: RoomState) => void;
  onStart: (info: StartInfo) => void;
  onPeerLeft: () => void;
  onError: (message: string) => void;
  onClose: () => void;
}

const withToken = (baseUrl: string, token: string): string => {
  const joiner = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${joiner}token=${encodeURIComponent(token)}`;
};

/** 对局通道：只负责房间与输入转发，不跑物理 */
export class PlayClient {
  readonly socket: WebSocket;
  private readonly handlers: PlayClientHandlers;
  private readonly remoteInputs = new Map<number, ControlInput>();
  private readonly queue: Record<string, unknown>[] = [];
  private opened = false;

  constructor(token: string, wsUrl: string, handlers: PlayClientHandlers) {
    this.handlers = handlers;
    this.socket = new WebSocket(withToken(wsUrl, token));
    this.socket.onopen = () => {
      this.opened = true;
      for (const msg of this.queue.splice(0)) this.socket.send(JSON.stringify(msg));
    };
    this.socket.onmessage = (ev: MessageEvent<string>) => this.handle(ev.data);
    this.socket.onerror = () => logger.error('对局通道连接失败');
    this.socket.onclose = () => {
      this.opened = false;
      this.handlers.onClose();
    };
  }

  createRoom(): void {
    this.send({ t: 'create' });
  }

  joinRoom(code: string): void {
    this.send({ t: 'join', code });
  }

  start(): void {
    this.send({ t: 'start' });
  }

  leave(): void {
    this.send({ t: 'leave' });
    this.socket.close();
  }

  sendInput(tick: number, input: ControlInput): void {
    if (this.socket.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify({ t: 'input', tick, input }));
  }

  takeInput(tick: number): ControlInput | undefined {
    const input = this.remoteInputs.get(tick);
    if (input) this.remoteInputs.delete(tick);
    return input;
  }

  private send(msg: Record<string, unknown>): void {
    if (this.opened && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
      return;
    }
    this.queue.push(msg);
  }

  private handle(raw: string): void {
    let msg: Record<string, unknown>;
    try {
      msg = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return;
    }

    if (msg.t === 'room') {
      const players = Array.isArray(msg.players) ? (msg.players as RoomPlayerInfo[]) : [];
      this.handlers.onRoom({
        code: String(msg.code ?? ''),
        started: msg.started === true,
        you: Number(msg.you ?? 0),
        players,
      });
      return;
    }

    if (msg.t === 'start') {
      const players = Array.isArray(msg.players) ? (msg.players as RoomPlayerInfo[]) : [];
      this.handlers.onStart({ seed: Number(msg.seed ?? 1), players });
      return;
    }

    if (msg.t === 'input') {
      const tick = Number(msg.tick);
      if (!Number.isFinite(tick) || !msg.input) return;
      this.remoteInputs.set(tick, msg.input as ControlInput);
      this.prune(tick);
      return;
    }

    if (msg.t === 'peerLeft') {
      this.handlers.onPeerLeft();
      return;
    }

    if (msg.t === 'error') {
      this.handlers.onError(String(msg.message ?? '对局通道异常'));
    }
  }

  private prune(tick: number): void {
    const floor = tick - 240;
    for (const key of this.remoteInputs.keys()) {
      if (key < floor) this.remoteInputs.delete(key);
    }
  }
}
