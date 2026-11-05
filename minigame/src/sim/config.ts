/**
 * 全部手感 / 规则数值集中于此，方便调参。
 * 模拟层不依赖渲染，后续联机时这份配置可直接在服务端复用。
 */

export const COURT = {
  /** 半场宽度（x 方向） */
  halfWidth: 4,
  /** 半场长度（z 方向） */
  halfLength: 8,
  /** 网高 */
  netHeight: 2.0,
  /** 网的有效宽度（天线之间） */
  netHalfWidth: 3.95,
  antennaX: 4.12,
} as const;

export const BALL = {
  radius: 0.2,
  gravity: 18,
  drag: 0.05,
} as const;

export const PLAYER = {
  radius: 0.42,
  moveSpeed: 6,
  sprintSpeed: 11,
  sprintDuration: 0.4,
  sprintCooldown: 3,
  jumpVelocity: 8,
  gravity: 22,
  /**
   * 触球判定：胸口到球心的最大距离。
   * 真人触屏有 150~300ms 按键延迟，1.4m 只够“零延迟”的理想操作；放宽到 1.75m 让慢半拍也能碰到球。
   */
  reach: 1.75,
  chestHeight: 1.0,
  /** 空中扣球判定：与球心的最大水平距离（比常规触球更宽松，保证跳起来能打到） */
  spikeReachXZ: 1.65,
  /**
   * 空中扣球判定：球心的绝对高度带（米）。
   * 之前用“球相对胸口的高度差”，人一跳起来胸口升高，窗口跟着升高，
   * 结果“跳得越高反而越打不到球”——真人实测就是这个坑。改成相对地面的固定高度带。
   */
  spikeMinY: 2.25,
  spikeMaxY: 4.3,
  hitCooldown: 0.28,
  /** 两次触球之间的全局最小间隔，避免同帧双击 */
  hitGap: 0.1,
  diveStun: 0.8,
  serveMaxCharge: 0.9,
} as const;

export const MATCH = {
  pointsToWinSet: 7,
  setsToWin: 2,
  /** 单局计时（秒）。PRD 写 40s 但 7 分制 40s 过短，这里放宽为软性上限 */
  setSeconds: 120,
  kickoffSeconds: 3,
  pointSeconds: 2.0,
  setEndSeconds: 2.4,
} as const;

export const DEFAULT_TEAM_SIZE = 2;
