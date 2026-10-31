import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';

import { WebSocketServer, WebSocket } from 'ws';

interface TokenPayload {
  uid: string;
  name: string;
  exp: number;
}

interface RoomPlayer {
  ws: WebSocket;
  uid: string;
  name: string;
  slot: 0 | 1;
}

interface Room {
  code: string;
  players: RoomPlayer[];
  started: boolean;
  seed: number;
}

interface ControlInput {
  moveX: number;
  moveZ: number;
  sprint: boolean;
  jump: boolean;
  hit: boolean;
  hitHeld: boolean;
  block: boolean;
  blockHeld: boolean;
}

const PORT = Number(process.env.GAME_WS_PORT ?? 8081);
const SECRET = process.env.PLAY_TOKEN_SECRET ?? 'paiqiu-dev-secret';

const rooms = new Map<string, Room>();

const safeEqual = (a: string, b: string): boolean => {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
};

const parseToken = (token: string): TokenPayload | null => {
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac('sha256', SECRET).update(body).digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  try {
    const raw = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TokenPayload;
    if (!raw.uid || typeof raw.exp !== 'number' || raw.exp * 1000 < Date.now()) return null;
    return raw;
  } catch {
    return null;
  }
};

const send = (ws: WebSocket, data: unknown): void => {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
};

const newCode = (): string => {
  for (let i = 0; i < 20; i++) {
    const code = String(randomInt(100000, 1000000));
    if (!rooms.has(code)) return code;
  }
  return String(Date.now()).slice(-6);
};

const roomState = (room: Room, you: number) => ({
  t: 'room',
  code: room.code,
  started: room.started,
  you,
  players: room.players.map((p: RoomPlayer) => ({ slot: p.slot, name: p.name })),
});

const broadcastRoom = (room: Room): void => {
  for (const p of room.players) send(p.ws, roomState(room, p.slot));
};

const broadcast = (room: Room, data: unknown): void => {
  for (const p of room.players) send(p.ws, data);
};

const clampNum = (v: unknown, min: number, max: number): number => {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : 0;
  return Math.min(max, Math.max(min, n));
};

const sanitizeInput = (raw: unknown): ControlInput => {
  const r = (raw ?? {}) as Partial<ControlInput>;
  return {
    moveX: clampNum(r.moveX, -1, 1),
    moveZ: clampNum(r.moveZ, -1, 1),
    sprint: r.sprint === true,
    jump: r.jump === true,
    hit: r.hit === true,
    hitHeld: r.hitHeld === true,
    block: r.block === true,
    blockHeld: r.blockHeld === true,
  };
};

const leaveRoom = (ws: WebSocket): void => {
  for (const room of rooms.values()) {
    const idx = room.players.findIndex((p: RoomPlayer) => p.ws === ws);
    if (idx < 0) continue;
    room.players.splice(idx, 1);
    if (room.players.length === 0) {
      rooms.delete(room.code);
    } else {
      broadcast(room, { t: 'peerLeft' });
    }
    return;
  }
};

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket, req): void => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const payload = parseToken(url.searchParams.get('token') ?? '');
  if (!payload) {
    send(ws, { t: 'error', message: '身份校验失败，请重新进入' });
    ws.close();
    return;
  }

  let room: Room | null = null;
  let me: RoomPlayer | null = null;

  ws.on('message', (buf): void => {
    let msg: Record<string, unknown>;
    try {
      msg = JSON.parse(buf.toString()) as Record<string, unknown>;
    } catch {
      return;
    }

    if (msg.t === 'create') {
      if (room) return;
      const code = newCode();
      room = { code, players: [], started: false, seed: 0 };
      me = { ws, uid: payload.uid, name: payload.name, slot: 0 };
      room.players.push(me);
      rooms.set(code, room);
      send(ws, roomState(room, 0));
      return;
    }

    if (msg.t === 'join') {
      if (room) return;
      const code = String(msg.code ?? '');
      const target = rooms.get(code);
      if (!target) {
        send(ws, { t: 'error', message: '房间不存在或已结束' });
        return;
      }
      if (target.started) {
        send(ws, { t: 'error', message: '这一局已经开始了' });
        return;
      }
      if (target.players.length >= 2) {
        send(ws, { t: 'error', message: '房间已满' });
        return;
      }
      me = { ws, uid: payload.uid, name: payload.name, slot: 1 };
      target.players.push(me);
      room = target;
      broadcastRoom(target);
      return;
    }

    if (!room || !me) return;

    if (msg.t === 'start') {
      if (me.slot !== 0) {
        send(ws, { t: 'error', message: '只有房主可以开始' });
        return;
      }
      if (room.started) return;
      if (room.players.length < 2) {
        send(ws, { t: 'error', message: '等队友进来再开始' });
        return;
      }
      room.started = true;
      room.seed = randomInt(1, 2147483647);
      broadcast(room, {
        t: 'start',
        seed: room.seed,
        players: room.players.map((p: RoomPlayer) => ({ slot: p.slot, name: p.name })),
      });
      return;
    }

    if (msg.t === 'input') {
      if (!room.started) return;
      const tick = Math.floor(clampNum(msg.tick, 0, 10_000_000));
      const input = sanitizeInput(msg.input);
      for (const p of room.players) {
        if (p.slot !== me.slot) send(p.ws, { t: 'input', tick, input });
      }
      return;
    }

    if (msg.t === 'leave') {
      ws.close();
    }
  });

  ws.on('close', (): void => {
    leaveRoom(ws);
    room = null;
    me = null;
  });

  ws.on('error', (): void => {
    leaveRoom(ws);
  });
});

setInterval(() => {
  for (const ws of wss.clients) {
    if (ws.readyState === WebSocket.OPEN) ws.ping();
  }
}, 30000);

process.stdout.write(`[game-server] listening on ws://localhost:${PORT}\n`);
