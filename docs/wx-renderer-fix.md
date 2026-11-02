# 真机/IDE 渲染兼容性修复说明（addEventListener 崩溃 + 画面发白人物消失）

## 根因与证据

### 现象 A：`canvas2.addEventListener is not a function`，白屏崩溃

- three.js r162 的 `WebGLRenderer` 构造时会对传入 canvas 调 `addEventListener`（监听 `webglcontextlost` / `webglcontextrestored`），`setSize` 还会碰 `style`；PC 微信（3.9.x）小游戏 runtime 的 canvas 是原生对象，**没有任何 DOM 接口**。
- 我们的渲染主画布来自 `wx.createCanvas()`（上次离屏 canvas 回退后，旧基础库/PC 端都走这条路径），裸对象直接交给 three → 构造即抛错 → 白屏。
- 证据：VConsole 报错栈指向 `THREE.WebGLRenderer` 初始化；PC 微信官方文档也说明小游戏 canvas 非 DOM 对象。

### 现象 B：IDE 里人物全部消失 + 画面白到发亮

- IDE 截图里：**无光照材质全部正常**——名牌、号码牌、脚下接触阴影、蓝色球线（MeshBasicMaterial/LineBasic）、HUD 都清晰；**所有受光材质（MeshStandardMaterial）异常**：地板（standard+贴图）渲染成近纯白，人物的身体/球衣/头发全是受光材质 → 直接不可见，只剩无光照的五官小点。
- 结论：开发者工具的 WebGL 实现对 lit shader 的光照/色彩管线处理与浏览器不一致（光照强度累积过曝 → 输出被顶到白色），贴图与 canvas 路径本身没问题（HUD、名牌都是 canvas 贴图且显示正常）。
- 另外 IDE 截图跑的是旧构建（旧记分牌+旧地板），但同一 lit 材质问题在两个版本里表现一致。

## 改法

### 1. 统一 canvas 适配层（[wx-shim.ts](../minigame/src/platform/wx-shim.ts)）

新增 `patchCanvasDom()`：给 wx canvas 补齐 three 需要的全部 DOM 式接口——`addEventListener` / `removeEventListener` / `dispatchEvent` / `setAttribute`（空操作）、`style`（空对象）、`clientWidth` / `clientHeight`、`getBoundingClientRect`、`ownerDocument`。主屏画布和所有离屏 2d 画布（`create2dCanvas` 两个分支）一律经过它，不只补报错的那一个方法。

### 2. 全场景改无光照管线（核心，三端一致的根本保证）

- **角色/球/场馆所有 MeshStandardMaterial → MeshBasicMaterial**（[character.ts](../minigame/src/render/character.ts)、[ball-view.ts](../minigame/src/render/ball-view.ts)、[arena.ts](../minigame/src/render/arena.ts)），场景里不再有任何受光材质；
- 删除全部 4 盏灯光（[scene.ts](../minigame/src/render/scene.ts)），显式固定 `toneMapping = NoToneMapping` + `outputColorSpace = SRGBColorSpace`；
- 明暗层次由贴图烘焙承担（地板噪点/高光/暗角、按键投影都是烘焙的），卡通平涂风格反而与糖果手柄更统一；
- 附带收益：无光照 shader 更简单，低端机更省。

### 3. 安全渲染模式（[flags.ts](../minigame/src/platform/flags.ts)）

一键排查开关 `SAFE_MODE`：纯色地板、关闭体积光束、隐藏名牌/号码贴图。开启后恢复 → 问题在贴图/混合路径；仍异常 → 更底层渲染环境。

- 浏览器调试页：URL 加 `?safefx=1`
- 开发者工具/真机：`game.js` 入口最顶部（require 之前）加 `GameGlobal.__SAFEFX__ = 1;`

### 4. 可复现的模拟环境（[wx-test.html](../minigame/web/wx-test.html)）

- `?rawcanvas=1`：把 mock canvas 的 DOM 接口全部置为 `undefined`，精确复现 PC 微信的 canvas 对象形态（无适配层时必然复现 `addEventListener is not a function`）；
- `?legacywx=1`：无 `createOffscreenCanvas` / `getWindowInfo`（旧基础库）；
- 三个参数可任意组合。

## 验证

`npm run typecheck`、`npm run build` 通过。四组竖屏截图（docs/screenshots/）：

| 截图 | 环境 | 结果 |
|---|---|---|
| `wx-fix-browser.png` | 纯浏览器入口 index.html | 正常，与垫片模式一致 |
| `wx-fix-normal.png` | wx 垫片模拟 | 正常 |
| `wx-fix-rawcanvas.png` | **rawcanvas：无 DOM 接口 canvas**（复现 PC 微信崩溃条件） | 正常，与 normal 逐像素一致——适配层生效 |
| `wx-fix-safefx.png` | rawcanvas+legacywx+safefx 三开关叠加 | 正常降级（纯色地板、无光束、无名牌），用于 IDE 自检 |

四张图人物、号码牌、地板颜色、明暗完全一致，无白屏无过曝。

## 兼容性

- 最低基础库要求不变（理论 1.9.94 / 建议 ≥2.16.1，见 [README](../README.md)）；本次改动只减不增 wx API 依赖；
- 灯光删除后渲染负载下降，无新增性能风险；贴图仍全部启动期烘焙。

## 遗留风险

- `patchCanvasDom` 覆盖的是 three r162 已知的 canvas 触点；若未来升级 three 大版本，需在 rawcanvas 模式下回归验证一次；
- 无光照平涂是风格取向的决定：角色失去了方向光带来的体积感，若之后想恢复光影，应改用「贴图烘焙 + 单方向光」而非恢复完整光照管线；
- PC 微信/IDE 真机请再跑一遍确认（模拟环境与真机的 WebGL 实现仍可能有差异，安全模式可兜底定位）。
