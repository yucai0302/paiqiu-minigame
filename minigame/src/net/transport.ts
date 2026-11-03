/**
 * 网络传输抽象：浏览器 WebSocket（开发/自动化测试）+ wx.connectSocket（生产）。
 * 不引入任何新的 DOM 依赖；两套实现共用同一接口，由 openTransport 按运行时能力挑选。
 */

export interface NetTransport {
  send(data: string): void;
  close(): void;
  onOpen(cb: () => void): void;
  onMessage(cb: (data: string) => void): void;
  onClose(cb: () => void): void;
  onError(cb: () => void): void;
}

/** 浏览器实现：开发调试与无头双端联机测试用 */
class BrowserSocket implements NetTransport {
  private readonly ws: WebSocket;
  private openCb: () => void = () => undefined;
  private msgCb: (data: string) => void = () => undefined;
  private closeCb: () => void = () => undefined;
  private closed = false;

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => this.openCb();
    this.ws.onmessage = (e) => this.msgCb(String(e.data));
    this.ws.onclose = () => {
      if (!this.closed) {
        this.closed = true;
        this.closeCb();
      }
    };
    this.ws.onerror = () => undefined;
  }

  send(data: string): void {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(data);
  }

  close(): void {
    this.closed = true;
    try {
      this.ws.close();
    } catch {
      // 已关闭时忽略
    }
  }

  onOpen(cb: () => void): void {
    this.openCb = cb;
  }

  onMessage(cb: (data: string) => void): void {
    this.msgCb = cb;
  }

  onClose(cb: () => void): void {
    this.closeCb = cb;
  }

  onError(cb: () => void): void {
    const prev = this.closeCb;
    this.ws.onerror = () => {
      cb();
      prev();
    };
  }
}

/** 生产实现：微信小游戏 wx.connectSocket（wss 合法域名） */
class WxSocket implements NetTransport {
  private readonly task: { send(o: { data: string }): void; close(o?: object): void } & Record<string, (cb: (e?: unknown) => void) => void>;

  constructor(url: string) {
    const g = globalThis as unknown as { wx: { connectSocket: (o: { url: string }) => never } };
    this.task = g.wx.connectSocket({ url }) as never;
  }

  send(data: string): void {
    try {
      this.task.send({ data });
    } catch {
      // 底层已断开时忽略，watchdog 会兜底触发重连
    }
  }

  close(): void {
    try {
      this.task.close({});
    } catch {
      // ignore
    }
  }

  onOpen(cb: () => void): void {
    this.task.onOpen(() => cb());
  }

  onMessage(cb: (data: string) => void): void {
    this.task.onMessage((e?: unknown) => cb(String((e as { data?: unknown })?.data)));
  }

  onClose(cb: () => void): void {
    let fired = false;
    this.task.onClose(() => {
      if (!fired) {
        fired = true;
        cb();
      }
    });
  }

  onError(cb: () => void): void {
    this.task.onError(() => cb());
  }
}

/** 按运行时能力挑选实现：有 wx.connectSocket 走生产，否则走浏览器 WS */
export function openTransport(url: string): NetTransport {
  const g = globalThis as unknown as { wx?: { connectSocket?: unknown } };
  if (g.wx && typeof g.wx.connectSocket === 'function') return new WxSocket(url);
  return new BrowserSocket(url);
}
