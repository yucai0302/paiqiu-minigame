# 微信端 `wx.createOffscreenCanvas` 兼容性修复说明

## 根因

真机/PC 微信报错 `TypeError: wx.createOffscreenCanvas is not a function`，游戏直接崩在启动阶段。

- `wx.createOffscreenCanvas` 是**基础库 2.16.1 才新增**的 API，且 **PC 微信（3.9.x）的小游戏 runtime 至今没有实现它**（报错环境正是 Windows 微信 3.9.x）——所以这不是"用户基础库太旧"能解释的，PC 端再新的基础库也会炸。
- 项目里所有 2D 贴图（角色名牌、球衣号码牌、手柄按键/摇杆贴图、HUD 文字与蓄力条、球场贴图）都经过垫片 [wx-shim.ts](../minigame/src/platform/wx-shim.ts) 的 `document.createElement('canvas')` → `makeCanvas()` 这一个漏斗，而它**无条件**调用 `wx.createOffscreenCanvas`；另一处相同写法在 [wx.ts](../minigame/src/platform/wx.ts) 的 `platform.createCanvas`。函数不存在 → 抛 TypeError → three.js 初始化和所有贴图生成全部失败 → 黑屏/崩溃。

## 回退方案

在 [wx-shim.ts](../minigame/src/platform/wx-shim.ts) 新增导出的 `create2dCanvas()`，两级回退：

1. **优先** `wx.createOffscreenCanvas({ type: '2d' })`（基础库 2.16.1+），`typeof` 检测 + `try/catch` 双保险（有些 runtime 函数存在但调用失败）；
2. **回退** `wx.createCanvas()` —— 微信官方约定：首次调用返回主屏画布，其后调用均返回离屏画布，2d 上下文自 1.x 起支持。`wx-shim.ts` 顶部已创建主屏画布，所以回退分支拿到的必是离屏实例，尺寸自行赋值 `width/height`；
3. 两层都不可用只剩"纯几何/无贴图"的极端降级，但 `wx.createCanvas` 是小游戏最古老的核心 API，实际不存在这种环境，未额外实现。

`wx.ts` 的 `platform.createCanvas` 同步改为调用 `create2dCanvas`，两处调用点收敛到同一实现。

**其他高版本 wx API 审计**（一并确认安全）：`wx.getWindowInfo`（2.25.1+）已有 `getSystemInfoSync` 回退；`wx.vibrateShort` 有 try/catch；`wx.createWebAudioContext` 有存在性判断；`wx.onTouch*` / `wx.createCanvas` 均为 1.x 核心 API。无其他隐患。

## 验证

- `npm run typecheck`、`npm run build` 通过；
- **旧环境模拟证据**：调试页 [wx-test.html](../minigame/web/wx-test.html) 新增 `?legacywx=1` 参数，加载前 `delete wx.createOffscreenCanvas` + `delete wx.getWindowInfo`，完整模拟 PC 微信/旧基础库环境。该模式下游戏正常启动进入比赛：人物、名牌、号码牌、手柄、蓄力条、记分板全部正常渲染，控制台无报错——证明回退分支真实可用；
- 不带参数的正常模式回归截图确认无劣化；
- 模拟页顺手修了两处保真问题：mock 的 `createCanvas` 改为"首次上屏、其后离屏"（与真机一致），`getSystemInfoSync` 不再内部依赖 `getWindowInfo`；
- 截图（docs/screenshots/）：
  - `wx-canvas-fallback-legacy.png` — 模拟无 `createOffscreenCanvas` 环境，回退分支渲染正常
  - `wx-canvas-normal.png` — 正常模式回归对照

## 最低基础库版本

已写入 [README.md](../README.md) 快速开始一节：

- **理论最低 1.9.94**（依赖 `wx.createCanvas` 的离屏行为 + 2d 上下文）；
- **建议 ≥ 2.16.1**（原生 `createOffscreenCanvas`，回退分支仅兜底）；
- PC 微信 3.9.x 通过回退分支直接支持。

## 遗留风险

- 回退分支已在浏览器模拟环境验证，**真机（尤其 PC 微信 3.9.x）未实跑**，建议开发者工具 + PC 微信各验证一次；
- 旧基础库上每个 2D 贴图都会真实创建一个离屏 canvas 实例（名牌/号码/按键等约几十个），内存占用略高于 `createOffscreenCanvas` 路径，但均为启动期一次性创建，无持续增长；
- 若微信未来废弃 `wx.createCanvas` 的离屏行为（目前无此计划），需要再评估。
