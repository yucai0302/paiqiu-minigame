// 房间服务器（开发/自动化测试用）：零依赖手写 WebSocket（RFC6455 文本帧）。
// 生产可换云函数/专业联机服务，协议不变（见 docs/online-mode.md）。
//
// 协议（JSON 文本帧，服务器只管房间与转发，不跑游戏逻辑）：
//   C→S {t:'create', name}            S→C {t:'room', roomId, pid:0, players}
//   C→S {t:'join', roomId, name, resume?}  S→C {t:'room'...} + 双方 {t:'players', players}
//   C→S {t:'start', skill, seed}(房主) S→双方 {t:'start', cfg:{skill,seed,names,fillAi}}
//   C→S {t:'in', d}(好友)   → 房主 {t:'input', d}
//   C→S {t:'snap', d}(房主) → 好友 {t:'snap', d}
//   C→S {t:'again'}(好友)   → 房主 {t:'againReq'}
//   C→S {t:'cancel'} 退出：等待房解散；对局中好友位标记可重连，对方收 {t:'peerLeft'}
//   C→S {t:'ping'}    → {t:'pong'}（应用层心跳）
import http from 'node:http';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 7788);
const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const RECONNECT_TTL_MS = 5 * 60 * 1000; // 对局中掉线保留房间的时长
const WAITING_TTL_MS = 10 * 60 * 1000;

/** @type {Map<string, Room>} */
const rooms = new Map();
/** @type {Set<Client>} */
const clients = new Set();

class Room {
  constructor(id) {
    this.id = id;
    this.seats = [
      { name: '', alive: false, client: null },
      { name: '', alive: false, client: null },
    ]; // [0]=房主 [1]=好友
    this.inMatch = false;
    this.match = null; // { skill, seed, names, fillAi }
    this.created = Date.now();
    this.lastAliveAt = Date.now();
    this.snapCount = 0;
    this.maxSnapBytes = 0; // 单份快照最大字节数（对照数据库单文档上限）
  }

  alivePlayers() {
    const list = [];
    for (let i = 0; i < 2; i++) {
      if (this.seats[i].alive) list.push({ pid: i, name: this.seats[i].name });
    }
    return list;
  }
}

class Client {
  constructor(sock) {
    this.sock = sock;
    this.buf = Buffer.alloc(0);
    this.room = null;
    this.seat = -1;
    this.alive = true;
    this.lastMsg = Date.now();
  }

  send(obj) {
    const data = Buffer.from(JSON.stringify(obj));
    const len = data.length;
    let header;
    if (len < 126) {
      header = Buffer.alloc(2);
      header[1] = len;
    } else if (len < 65536) {
      header = Buffer.alloc(4);
      header[1] = 126;
      header.writeUInt16BE(len, 2);
    } else {
      header = Buffer.alloc(10);
      header[1] = 127;
      header.writeBigUInt64BE(BigInt(len), 2);
    }
    header[0] = 0x81; // FIN + text
    try {
      this.sock.write(Buffer.concat([header, data]));
    } catch {
      // 对端已断开
    }
  }
}

const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

function closeClient(c) {
  if (!c.alive) return;
  c.alive = false;
  clients.delete(c);
  const room = c.room;
  if (!room) return;
  room.seats[c.seat].alive = false;
  room.seats[c.seat].client = null;
  room.lastAliveAt = Date.now();
  const peer = room.seats[1 - c.seat].client;
  if (peer && peer.alive) {
    peer.send({ t: 'peerLeft', reason: 'disconnect' });
    log(`room ${room.id}: seat ${c.seat}(${c.name || '?'}) 断线，通知对方`);
  }
  // RFC6455 关闭握手：回一个空 close 帧再收尾 TCP。
  // 不然浏览器侧 onclose 永远不触发（readyState 卡在 CLOSING），客机感知不到断线。
  try {
    c.sock.write(Buffer.from([0x88, 0x00]));
  } catch {
    // ignore
  }
  try {
    c.sock.end();
  } catch {
    // ignore
  }
  setTimeout(() => {
    try {
      c.sock.destroy();
    } catch {
      // ignore
    }
  }, 200).unref();
}

function makeRoomId() {
  let id;
  do {
    id = String(Math.floor(100000 + Math.random() * 900000));
  } while (rooms.has(id));
  return id;
}

function handleMessage(c, m, rawBytes) {
  const t = m && m.t;
  if (t === 'ping') {
    c.send({ t: 'pong' });
    return;
  }
  if (t === 'pong') return;

  if (t === 'create') {
    const id = makeRoomId();
    const room = new Room(id);
    room.seats[0] = { name: String(m.name || '玩家'), alive: true, client: c };
    rooms.set(id, room);
    c.room = room;
    c.seat = 0;
    c.name = room.seats[0].name;
    c.send({ t: 'room', roomId: id, pid: 0, players: room.alivePlayers() });
    log(`room ${id}: 房主 ${c.name} 建房`);
    return;
  }

  if (t === 'join') {
    const room = rooms.get(String(m.roomId || ''));
    if (!room) {
      c.send({ t: 'error', code: 'room-not-found', msg: '房间不存在或已解散' });
      return;
    }
    const resume = !!m.resume;
    if (room.inMatch) {
      // 对局中只允许重连：找掉线号位（优先同名，其次唯一空位）
      const dead = [0, 1].filter((i) => !room.seats[i].alive && room.seats[i].name);
      const byName = dead.find((i) => room.seats[i].name === String(m.name || ''));
      const seat = byName ?? (dead.length === 1 ? dead[0] : -1);
      if (seat === undefined || seat < 0) {
        c.send({ t: 'error', code: 'room-in-match', msg: '房间正在对局中，稍后再试' });
        return;
      }
      c.seat = seat;
    } else if (!room.seats[0].alive && room.seats[0].name) {
      c.seat = 0; // 等待房房主断线后顶上（罕见）
    } else if (!room.seats[1].alive) {
      c.seat = 1;
    } else {
      c.send({ t: 'error', code: 'room-full', msg: '房间已满' });
      return;
    }
    room.seats[c.seat] = { name: String(m.name || '玩家'), alive: true, client: c };
    c.room = room;
    c.name = room.seats[c.seat].name;
    room.lastAliveAt = Date.now();
    c.send({ t: 'room', roomId: room.id, pid: c.seat, players: room.alivePlayers() });
    for (const s of room.seats) {
      if (s.alive && s.client && s.client !== c) {
        s.client.send({ t: 'players', players: room.alivePlayers() });
        if (resume) s.client.send({ t: 'peerBack' });
      }
    }
    log(`room ${room.id}: ${resume ? '重连' : '加入'} ${c.name}(seat ${c.seat})，当前 ${JSON.stringify(room.alivePlayers())}`);
    // 对局中重连：重放开局参数，客机会重建镜像
    if (room.inMatch && room.match) c.send({ t: 'start', cfg: room.match });
    return;
  }

  const room = c.room;
  if (!room) {
    c.send({ t: 'error', code: 'no-room', msg: '尚未加入房间' });
    return;
  }
  room.lastAliveAt = Date.now();

  if (t === 'start' && c.seat === 0) {
    const fillAi = !room.seats[1].alive;
    room.match = {
      skill: m.skill || 'normal',
      seed: Number(m.seed) || 1,
      names: [room.seats[0].name, fillAi ? '' : room.seats[1].name],
      fillAi,
    };
    room.inMatch = true;
    for (const s of room.seats) if (s.alive && s.client) s.client.send({ t: 'start', cfg: room.match });
    log(`room ${room.id}: 开局 ${JSON.stringify(room.match)}`);
    return;
  }

  if (t === 'snap' && c.seat === 0) {
    room.snapCount++;
    if (rawBytes > room.maxSnapBytes) room.maxSnapBytes = rawBytes;
    if (room.snapCount % 300 === 1)
      log(`room ${room.id}: 已转发 ${room.snapCount} 份快照（单份最大 ${room.maxSnapBytes}B）`);
    const g = room.seats[1].client;
    if (g && g.alive) g.send({ t: 'snap', d: m.d });
    return;
  }

  if (t === 'in' && c.seat === 1) {
    const h = room.seats[0].client;
    if (h && h.alive) h.send({ t: 'input', d: m.d });
    return;
  }

  if (t === 'again' && c.seat === 1) {
    const h = room.seats[0].client;
    if (h && h.alive) h.send({ t: 'againReq' });
    return;
  }

  if (t === 'cancel') {
    room.seats[c.seat].alive = false;
    room.seats[c.seat].client = null;
    c.room = null;
    const peerSeat = room.seats[1 - c.seat];
    if (peerSeat.alive && peerSeat.client) {
      peerSeat.client.send({ t: 'peerLeft', reason: 'exit' });
    }
    if (!room.inMatch && !room.seats[0].alive && !room.seats[1].alive) {
      rooms.delete(room.id);
      log(`room ${room.id}: 已解散`);
    }
    log(`room ${room.id}: ${c.name} 主动退出`);
  }
}

function onData(c, chunk) {
  c.buf = Buffer.concat([c.buf, chunk]);
  for (;;) {
    const b = c.buf;
    if (b.length < 2) break;
    const op = b[0] & 0x0f;
    const masked = (b[1] & 0x80) !== 0;
    let len = b[1] & 0x7f;
    let off = 2;
    if (len === 126) {
      if (b.length < 4) break;
      len = b.readUInt16BE(2);
      off = 4;
    } else if (len === 127) {
      if (b.length < 10) break;
      len = Number(b.readBigUInt64BE(2));
      off = 10;
    }
    if (!masked || len > 1 << 20) {
      c.sock.destroy(); // 浏览器帧必带掩码；超大帧直接断开
      return;
    }
    if (b.length < off + 4 + len) break;
    const key = b.subarray(off, off + 4);
    const payload = Buffer.allocUnsafe(len);
    for (let i = 0; i < len; i++) payload[i] = b[off + 4 + i] ^ key[i & 3];
    c.buf = b.subarray(off + 4 + len);
    if (op === 8) {
      closeClient(c);
      return;
    }
    if (op === 9) {
      // 心跳帧回 pong（应用层另有 ping/pong 消息）
      continue;
    }
    if (op === 1) {
      c.lastMsg = Date.now();
      try {
        handleMessage(c, JSON.parse(payload.toString('utf8')), payload.length);
      } catch (err) {
        log('message error:', err.message);
      }
    }
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ rooms: rooms.size, clients: clients.size }));
    return;
  }
  res.writeHead(404).end();
});

server.on('upgrade', (req, sock) => {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    sock.destroy();
    return;
  }
  const accept = crypto.createHash('sha1').update(key + GUID).digest('base64');
  sock.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      `Sec-WebSocket-Accept: ${accept}\r\n\r\n`,
  );
  sock.setNoDelay(true);
  const c = new Client(sock);
  clients.add(c);
  sock.on('data', (chunk) => onData(c, chunk));
  sock.on('close', () => closeClient(c));
  sock.on('error', () => closeClient(c));
  log('ws: 客户端接入');
});

// GC + 静默超时
setInterval(() => {
  const now = Date.now();
  for (const c of clients) {
    if (now - c.lastMsg > 60000) {
      log('ws: 静默超时，断开');
      c.sock.destroy();
    }
  }
  for (const [id, room] of rooms) {
    const anyAlive = room.seats[0].alive || room.seats[1].alive;
    const ttl = room.inMatch ? RECONNECT_TTL_MS : WAITING_TTL_MS;
    if (!anyAlive && now - room.lastAliveAt > ttl) {
      rooms.delete(id);
      log(`room ${id}: GC 回收`);
    }
  }
}, 30000).unref();

server.listen(PORT, () => {
  log(`房间服务器已启动: ws://localhost:${PORT}`);
});
