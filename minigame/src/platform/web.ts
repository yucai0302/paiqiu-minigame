import type { CanvasLike, Platform, TouchPoint } from './types';

const toPoint = (e: PointerEvent | MouseEvent, id: number): TouchPoint => {
  const rect = canvas.getBoundingClientRect();
  return { id, x: e.clientX - rect.left, y: e.clientY - rect.top };
};

let canvas: HTMLCanvasElement;

export function createWebPlatform(): Platform {
  canvas = document.getElementById('scene') as HTMLCanvasElement;
  const width = canvas.clientWidth || 390;
  const height = canvas.clientHeight || 844;
  const active = new Map<number, TouchPoint>();

  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const changed = Array.from(e.changedTouches).map((t) => toDomPoint(t));
    changed.forEach((p) => active.set(p.id, p));
    handlers.start.forEach((fn) => fn(changed));
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    for (const t of Array.from(e.changedTouches)) {
      const p = toDomPoint(t);
      if (active.has(p.id)) active.set(p.id, p);
    }
    const all = Array.from(active.values());
    handlers.move.forEach((fn) => fn(all));
  });
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const changed = Array.from(e.changedTouches).map((t) => toDomPoint(t));
    changed.forEach((p) => active.delete(p.id));
    const all = Array.from(active.values());
    handlers.end.forEach((fn) => fn(changed, all));
  });
  canvas.addEventListener('touchcancel', () => {
    active.clear();
    handlers.cancel.forEach((fn) => fn([]));
  });

  // 桌面浏览器用鼠标模拟单指，方便调试
  let mouseId = -1;
  canvas.addEventListener('mousedown', (e) => {
    if (mouseId >= 0) return;
    mouseId = 100;
    const p = toPoint(e, mouseId);
    active.set(p.id, p);
    handlers.start.forEach((fn) => fn([p]));
  });
  window.addEventListener('mousemove', (e) => {
    if (mouseId < 0) return;
    const p = toPoint(e, mouseId);
    active.set(p.id, p);
    handlers.move.forEach((fn) => fn(Array.from(active.values())));
  });
  window.addEventListener('mouseup', (e) => {
    if (mouseId < 0) return;
    const p = toPoint(e, mouseId);
    active.delete(p.id);
    handlers.end.forEach((fn) => fn([p], Array.from(active.values())));
    mouseId = -1;
  });

  return {
    canvas: canvas as unknown as CanvasLike,
    width,
    height,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    safeTop: 0,
    safeBottom: 0,
    createCanvas(w: number, h: number): CanvasLike {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c as unknown as CanvasLike;
    },
    raf: (cb) => window.requestAnimationFrame(cb),
    cancelRaf: (id) => window.cancelAnimationFrame(id),
    now: () => performance.now(),
    createAudioContext(): AudioContext | null {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      return Ctor ? new Ctor() : null;
    },
    onTouchStart(cb): void {
      handlers.start.push(cb);
    },
    onTouchMove(cb): void {
      handlers.move.push(cb);
    },
    onTouchEnd(cb): void {
      handlers.end.push(cb);
    },
    onTouchCancel(cb): void {
      handlers.cancel.push(cb);
    },
    vibrateShort(): void {
      navigator.vibrate?.(10);
    },
  };
}

const handlers = {
  start: [] as ((p: TouchPoint[]) => void)[],
  move: [] as ((p: TouchPoint[]) => void)[],
  end: [] as ((c: TouchPoint[], a: TouchPoint[]) => void)[],
  cancel: [] as ((p: TouchPoint[]) => void)[],
};

const toDomPoint = (t: Touch): TouchPoint => {
  const rect = canvas.getBoundingClientRect();
  return { id: t.identifier, x: t.clientX - rect.left, y: t.clientY - rect.top };
};
