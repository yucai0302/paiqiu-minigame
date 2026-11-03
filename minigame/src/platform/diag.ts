/**
 * 轻量诊断打点 + 错误收集。
 *
 * 默认静默（只保留最近 200 条记录，不打印、不上屏），打开方式：
 * 1. 浏览器调试页：URL 加 `?debug=1`
 * 2. 小游戏冷启动 query 带 `debug=1`（二维码/分享卡片链接里带上即可）
 * 3. game.js 最顶部（require 之前）写 `GameGlobal.__PAIQIU_DEBUG__ = 1`
 * 4. 真机无 query 时：首页底部"版本行"连点 5 下（App 里实现），临时打开调试面板
 *
 * 记录内容：启动/进场各阶段的耗时、渲染环境（WebGL 版本 / MAX_TEXTURE_SIZE /
 * 画布像素尺寸 / DPR）、以及被捕获的异常（阶段 + message + 栈片段）。
 */

type Any = Record<string, unknown>;

const g = globalThis as Any;

function queryDebug(): boolean {
  try {
    if (typeof location !== 'undefined' && location.search && /[?&]debug=1/.test(location.search)) {
      return true;
    }
  } catch {
    // 无 location 的环境忽略
  }
  try {
    const wxAny = (globalThis as Any).wx as
      | { getLaunchOptionsSync?: () => { query?: Record<string, string> } }
      | undefined;
    const q = wxAny?.getLaunchOptionsSync?.().query;
    if (q && (q.debug === '1' || q.debug === 'true')) return true;
  } catch {
    // 基础库不支持时忽略
  }
  return g.__PAIQIU_DEBUG__ === 1 || g.__PAIQIU_DEBUG__ === true;
}

export let DEBUG: boolean = queryDebug();

export function setDebug(v: boolean): void {
  DEBUG = v;
}

const now = (): number => {
  try {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      return performance.now();
    }
  } catch {
    // 忽略
  }
  return Date.now();
};

const T0 = now();
let lastAt = T0;

export interface Mark {
  name: string;
  /** 从进程启动算起的毫秒数 */
  at: number;
  /** 距离上一条打点的毫秒数 */
  dt: number;
  extra?: string;
}

export interface DiagError {
  stage: string;
  message: string;
  stack: string;
  at: number;
}

const marks: Mark[] = [];
const errors: DiagError[] = [];
const MAX = 200;

/** 记录一个阶段点（默认不打印，打开 debug 后由 dump 一次性输出） */
export function mark(name: string, extra?: string): number {
  const t = now();
  const entry: Mark = {
    name,
    at: Math.round((t - T0) * 10) / 10,
    dt: Math.round((t - lastAt) * 10) / 10,
    extra,
  };
  lastAt = t;
  marks.push(entry);
  if (marks.length > MAX) marks.shift();
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(`[paiqiu] ${name} +${entry.dt}ms (t=${entry.at}ms)${extra ? ' · ' + extra : ''}`);
  }
  return entry.dt;
}

export function trace(name: string, extra?: string): void {
  const t = now();
  const entry: Mark = {
    name,
    at: Math.round((t - T0) * 10) / 10,
    dt: Math.round((t - lastAt) * 10) / 10,
    extra,
  };
  marks.push(entry);
  if (marks.length > MAX) marks.shift();
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(`[paiqiu] ${name} +${entry.dt}ms${extra ? ' · ' + extra : ''}`);
  }
}

function toText(e: unknown): string {
  if (e instanceof Error) return e.message || e.name || 'Error';
  if (typeof e === 'string') return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

function stackOf(e: unknown): string {
  const s = (e as { stack?: unknown })?.stack;
  return typeof s === 'string' ? s.split('\n').slice(0, 4).join('\n') : '';
}

/** 捕获但不静默：记入本地面板 + console.error；返回可直接上屏的一条摘要 */
export function recordError(stage: string, e: unknown): DiagError {
  const entry: DiagError = {
    stage,
    message: toText(e).slice(0, 220),
    stack: stackOf(e).slice(0, 400),
    at: Math.round((now() - T0) * 10) / 10,
  };
  errors.push(entry);
  if (errors.length > 40) errors.shift();
  // eslint-disable-next-line no-console
  console.error(`[paiqiu][error] ${stage}: ${entry.message}`, e);
  return entry;
}

export function lastError(): DiagError | null {
  return errors.length ? errors[errors.length - 1] : null;
}

export function errorCount(): number {
  return errors.length;
}

export interface DiagDump {
  marks: Mark[];
  errors: DiagError[];
  env: Any;
}

const env: Any = {};
export function envInfo(patch: Any): void {
  for (const k of Object.keys(patch)) env[k] = patch[k];
}

export function dump(): DiagDump {
  return { marks: marks.slice(), errors: errors.slice(), env: { ...env } };
}

export function dumpText(): string {
  const d = dump();
  const head = `[paiqiu] env ${JSON.stringify(d.env)}`;
  const body = d.marks.map((m) => `  ${m.name} +${m.dt}ms @${m.at}ms${m.extra ? ' ' + m.extra : ''}`);
  const err = d.errors.map((e) => `  ! ${e.stage}: ${e.message}`);
  return [head, ...body, ...(err.length ? ['errors:', ...err] : [])].join('\n');
}

// 方便真机在没有控制台的场景下，用 vConsole/远程调试执行 dump() 取证据
(g as Any).__paiqiuDiag = { dump, dumpText, mark, recordError, lastError };
