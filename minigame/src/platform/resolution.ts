/**
 * 分辨率/清晰度策略：集中决定主画布 DPR、2D 贴图烘焙倍率、全屏 2D 层倍率、
 * 以及大贴图（地板/名牌）的倍率，避免各模块各自写死。
 *
 * 分档依据：微信 Android 有 benchmarkLevel；iOS 没有，退化为按屏幕像素规模推断。
 * 运行时还允许按帧率再降一档（app.ts 里做），这里只负责启动期的静态档位。
 */

export type QualityTier = 'high' | 'mid' | 'low';

export interface RenderProfile {
  tier: QualityTier;
  /** 主画布缓冲倍率（受设备 DPR、档位上限、像素预算三者约束） */
  dpr: number;
  /** 2D UI 贴图烘焙倍率（3D 场景之外的 canvas 贴图，单位：贴图像素 / CSS 像素） */
  uiScale: number;
  /** 全屏 2D 层（首页静态层、暂停/结算遮罩）倍率 */
  layerScale: number;
  /** 地板烘焙贴图倍率（相对原 704×1104） */
  floorBoost: number;
  /** 角色名牌贴图倍率 */
  labelBoost: number;
}

interface TierRule {
  dprCap: number;
  /** 主画布缓冲像素预算，防止大屏 DPR3 把填充率拉爆 */
  budgetPx: number;
  floorBoost: number;
  labelBoost: number;
}

const RULES: Record<QualityTier, TierRule> = {
  // iPhone 14 级别 390×844@3 ≈ 2.96M 像素，正好卡在预算内
  high: { dprCap: 3, budgetPx: 3.0e6, floorBoost: 1.5, labelBoost: 1.25 },
  mid: { dprCap: 2.5, budgetPx: 2.2e6, floorBoost: 1.25, labelBoost: 1.1 },
  low: { dprCap: 2, budgetPx: 1.5e6, floorBoost: 1, labelBoost: 1 },
};

const FALLBACK: RenderProfile = {
  tier: 'mid',
  dpr: 2,
  uiScale: 2,
  layerScale: 2,
  floorBoost: 1,
  labelBoost: 1,
};

let current: RenderProfile | null = null;

export function setRenderProfile(profile: RenderProfile): RenderProfile {
  current = profile;
  return profile;
}

export function renderProfile(): RenderProfile {
  return current ?? FALLBACK;
}

export function uiTextureScale(): number {
  return renderProfile().uiScale;
}

export function layerTextureScale(): number {
  return renderProfile().layerScale;
}

export function floorTextureBoost(): number {
  return renderProfile().floorBoost;
}

export function labelTextureBoost(): number {
  return renderProfile().labelBoost;
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const round25 = (v: number): number => Math.round(v * 4) / 4;

function pickTier(width: number, height: number, deviceDpr: number, benchmark: number): QualityTier {
  if (benchmark > 0) {
    if (benchmark >= 30) return 'high';
    if (benchmark >= 15) return 'mid';
    return 'low';
  }
  // iOS 没有 benchmark：按"最高可能像素量"推断，避免小屏老机器被拉满
  const maxPx = width * height * Math.min(deviceDpr, 3) ** 2;
  if (maxPx >= 2.4e6) return 'high';
  if (maxPx >= 1.2e6) return 'mid';
  return 'low';
}

/**
 * 启动期解析一次，结果固定到整个会话（贴图都在启动期烘焙，运行期不再重烘焙）。
 * @param overrideQ   显式档位（?q=low|mid|high）
 * @param overrideDpr 显式 DPR（?dpr=2.5，仅浏览器压测用）
 */
export function resolveRenderProfile(
  width: number,
  height: number,
  deviceDpr: number,
  benchmark = -1,
  overrideQ?: string,
  overrideDpr?: number,
): RenderProfile {
  const forced = overrideQ === 'low' || overrideQ === 'mid' || overrideQ === 'high' ? overrideQ : null;
  const tier = forced ?? pickTier(width, height, deviceDpr, benchmark);
  const rule = RULES[tier];

  const cap = Math.min(rule.dprCap, clamp(deviceDpr || 2, 1, 4));
  const budgetDpr = Math.sqrt(rule.budgetPx / Math.max(1, width * height));
  let dpr = round25(Math.min(cap, budgetDpr));
  if (overrideDpr && overrideDpr > 0) dpr = clamp(round25(overrideDpr), 1, 4);
  dpr = clamp(dpr, 1, 3);

  // 2D 贴图密度跟着 DPR 走：1x 画布拉伸到 3x 设备是"糊"的主因之一
  const uiScale = clamp(dpr, 2, 3);
  // 全屏层像素量是单张画布的大头（390×844 下 3x ≈ 2.96M px ≈ 11.8MB），
  // 高端档 11.8MB、中端 8.2MB、低端 5.3MB，配合"整屏只保留一张静态层"使用
  const layerScale = uiScale;

  return { tier, dpr, uiScale, layerScale, floorBoost: rule.floorBoost, labelBoost: rule.labelBoost };
}

/** 运行时降档：3 → 2.5 → 2，返回 null 表示已到最低档 */
export function nextLowerDpr(dpr: number): number | null {
  if (dpr > 2.5) return 2.5;
  if (dpr > 2) return 2;
  return null;
}
