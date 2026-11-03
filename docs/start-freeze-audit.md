# 真机点「开始比赛」无反应 / 首页定格 · 排查与修复报告

> 现象（用户确认）：微信体验版，**安卓与 iPhone 完全一致**。进首页后动效是死的（标题不呼吸、立绘不浮动），点「开始比赛」没有任何反应，界面停在首页，3D 不推进。
>
> 结论先说：**不是触摸没命中，也不是材质/重活，而是主循环在一次调度之后就再也没被调度回来**；另外进场链路里任何一步抛错都会被运行时吞掉，玩家看到的都是"没反应"。两处都已改成"出错不静默 + 有兜底 + 可自愈"。

## 一、现象归属判定

| 判断项 | 旧构建（体验版） | 依据 |
| --- | --- | --- |
| 首页是否渲染出来了 | 是 | 截图里标题/立绘/难度卡/按钮齐全 |
| 主循环是否在推进 | **否** | 首页动画由 `Screens.update(dt)` 驱动（`ui/screens.ts:419`），它不跑 = 标题不呼吸、立绘不浮动 |
| 点开始是否触发了 handler | **是**（内部状态变了） | 复现时点击后 `__paiqiu.state` 已变为 `playing`，但画面仍是首页；两张截图字节数完全相同（266375 = 266375） |
| 是否初始化抛错 | 视机型而定（见根因 2） | `audiofail` 组合下 `state` 停在 `start` |

所以：**handler 触发了、初始化在部分机型上会中断、但决定性的第一因是"循环没启动起来/启动后失联"**——因为循环不跑，点击造成的任何状态变化都不会被画出来，看起来就是"点了没反应"。

## 二、最可能的三条根因（按可能性排序）

### 根因 1（决定性）：帧调度只有一条腿，且没有任何兜底

- 旧代码：`app.ts` 只有 `this.rafId = this.platform.raf(this.loop)`（构造函数里注册一次），`loop` 内部第一行再 `this.rafId = this.platform.raf(this.loop)` 续约。
- `platform/wx.ts:24-27` 的 `raf()` 是 `typeof wxCanvas.requestAnimationFrame === 'function' ? wxCanvas.requestAnimationFrame(cb) : setTimeout(...)`：**只有"方法不存在"才退回 setTimeout；调用抛错、或注册成功但不再回调（静默失联），都不会退回，也没有其它兜底**。
- 同时 `platform/wx.ts:32` 的 `now()` 用 `Date.now()`，而 rAF 回调入参是相对时间戳；旧 `loop` 直接用 `(now - this.last)/1000` 算 dt，两套时钟不同源（`rafnots` 时甚至直接是 `undefined` → `NaN`）。

**复现证据（决定性）**：垫片新增 `?canvasraf=1&rafonce=1`（rAF 只回调一次后静默失联、不抛错）。

| 组合 | 旧构建（体验版） | 新构建 |
| --- | --- | --- |
| `rafonce` | 首页画出 1 帧后定格，`screens.t` 恒为 `0.029`，点击后 `state=playing` 但画面不变（两张截图字节数完全相同） | `driver=timer`，帧号 `24→30` 持续增长，点击后进入对局 |

截图：`docs/screenshots/start-rafonce-home-shipped.png`、`start-rafonce-shipped.png`（两张完全相同）、`start-rafonce-fixed.png`（已进入对局）。

> 说明：本地无法在微信运行时里直接启动，所以"真机上具体哪一次 `canvas.requestAnimationFrame` 回调停止"需要真机日志确认。真机上打开调试面板后，如果 `f=` 不增长且 `driver=raf` 就是这一条；新版会在 320ms 内自动切成 `timer` 并继续推进。

### 根因 2：进场第一步（音频解锁）抛错，start 被中断

- 旧 `GameAudio.unlock()` 没有任何 try/catch（iOS/部分安卓的 `wx.createWebAudioContext` 会抛错或返回不完整对象），而它排在 `createWorld()/startMatch()` 之前；
- 触控回调里抛出，微信运行时只记日志，玩家侧表现 = **点了完全没反应，界面继续留在首页**。
- 复现组合 `audiofail`：旧构建点击后 `state=start/start`；新构建 `state=playing`（音频失败被吞，不影响进场）。

代码位置：`audio/audio.ts:19-63`（已全链路兜底）、`app.ts:start()`。

### 根因 3：首帧/每帧异常被吞，画面停在最后一帧

- 旧 `loop` 没有 try/catch，任何一帧里 `scene.sync / hud.update / screens.update / scene.render / ui.render` 抛错都会让该帧的绘制停在最后一步；因为"续约"在帧首，循环还在转，但画面永远停在上一张，同样表现为"定格 + 点了没反应"。
- 新版：整帧包 try/catch，错误写进左上角面板；连续 3 帧报错弹系统弹窗；1.2 秒无成功渲染自动降级安全渲染，3 秒仍失败进入致命面板（可重试/回首页）。

## 三、真机差异模拟矩阵（旧构建 vs 新构建）

脚本：`minigame/tools/diag-start.mjs`（内置静态服务 + 无头 Chrome + SwiftShader）。结果 JSON：`docs/start-diag-shipped.json`、`docs/start-diag-fixed.json`。

| 组合 | 模拟的真机差异 | 旧构建 | 新构建 |
| --- | --- | --- | --- |
| `base` | 常规 | 循环活，点开始→playing | 循环活，点开始→playing |
| `noraf` | 全局 rAF 不存在 | 活（走 canvas.rAF） | 活 |
| `noraf+canvasraf` | 只有 canvas.rAF | **死**（垫片包装自递归，一帧不跑） | 活（`driver=timer`） |
| `canvasraf` | 同上 | **死** | 活（`driver=timer`） |
| `rafonce` | **rAF 只回调一次后静默失联** | **死（首页定格 + 点击无反应，完全复现）** | 活（watchdog 320ms 接管） |
| `noraf+rafonce` | 双重缺失 | **死** | 活 |
| `rafnots` | rAF 回调不传时间戳（dt=NaN） | **死** | 活（dt 改用 `platform.now()`） |
| `audiofail` | `createWebAudioContext` 抛错 | 循环活但**点击无效**（`state=start`） | 活，点击正常进场 |
| `nocloud` | `wx.cloud` 缺失（但配了 CLOUD_ENV） | 正常 | 正常（`cloud-init` 失败被捕获） |
| `dpr3` | pixelRatio=3 | 正常 | 正常 |
| `nocanvas2d` | 离屏 canvas 拿不到 2d | 启动即崩（白屏） | 同样无法绘制（已记录+真机会弹窗），属不可恢复路径 |
| `safefx+rafonce` | 安全渲染 + rAF 失联 | **死** | 活 |

**结论 D**：安全模式（`?safefx=1`）**不能**绕开定格 → 说明不是材质/大贴图/重活问题，而是调度与异常处理问题。

## 四、工作量与性能数字（本地实测）

- 画布像素：390×844 CSS，DPR 钳制为 2（`platform/wx-shim.ts:55` `Math.min(pixelRatio,2)`）→ 绘制缓冲 **780×1688 = 1,316,640 px**（面板 `buf` 行可见）。
  - 若去掉钳制，iPhone DPR=3 会是 1170×2532 = **2,963,820 px（约 2.25 倍，不是 9 倍——因为 CSS 尺寸不变）**；`?dpr=3` 组合实测 `buf` 仍是 780×1688，耗时与 `base` 同一量级，没有爆炸。
- 地板烘焙（`render/arena.ts:99` `floorTexture()`）：画布 704×1104 = **777,216 px**；噪点是 `step=4` 抽样（`render/arena.ts:26-39`），每遍 176×276 = **48,576 次 `fillRect`**，全图 2 遍 ≈ **9.7 万次**——**没有 `getImageData` 全像素读写、没有 O(n²) 双重循环**。这一步只在构造期发生一次，实测包含它的 `scene-ctor` = 116ms。
- 角色贴图：8 个角色各 1 张 canvas 贴图，在 `createWorld → scene.build()` 时生成；同类阵容重开已复用（`scene.ts build()` 阵容签名）。
- 启动阶段耗时（`?debug=1` 真实打点，无头 Chrome + SwiftShader 软件渲染，真机 CPU/GPU 会不同但量级一致）：

```
base : cloud-init +8ms · boot +1ms · scene-ctor +116ms(dpr=2 390x844) ·
       world-ready +25ms · screens-ready +19ms · schedule +2ms driver=raf ·
       first-frame +133ms dt=57ms          → 到首帧累计 304ms
dpr3 : cloud-init +12ms · scene-ctor +193ms · world-ready +32ms ·
       screens-ready +23ms · first-frame +206ms dt=87ms  → 到首帧累计 469ms
```

- 点「开始比赛」→ 进入对局（已拆成 3 帧，每帧一步）：

```
base : audio-ok +0ms → start:world +68ms → start:match +85ms → start:play +23ms   （合计 176ms）
dpr3 : audio-ok +1ms → start:world +79ms → start:match +79ms → start:play +93ms   （合计 252ms）
```

单帧最大仍 ~90ms（软件渲染），在真机上主要是建世界与 8 张角色贴图的首次生成；同阵容重开已复用，不再重复烘焙。

## 五、改了什么

1. **调度兜底**（`src/app.ts` `schedule()/startDriver()/armWatchdog()`）
   - 优先全局 `requestAnimationFrame`，其次 `platform.raf`；任何异常立刻切 `setTimeout(16ms)`；
   - 独立 `setInterval(250ms)` watchdog：`lastFrameWall` 超过 320ms 无帧 → 作废旧回调（`seq`）→ 永久切 `timer` 并继续推进；
   - 帧时间统一用 `platform.now()`，`dt` 做 `isFinite / 非负 / ≤0.1s` 保护。
2. **出错不静默**：整帧 try/catch + `platform/diag.ts` 打点 + `ui/debug.ts` 左上角面板（`?debug=1` 或首页底部连点 5 下开启）；连续 3 帧报错弹 `wx.showModal`；`wx.onError` / `window.error` 也接进面板。
3. **进场分帧 + 兜底**：`start()` 只在手势内做音频解锁，`pumpStart()` 每帧一步（建世界 → `startMatch` → 切 playing）；4 秒未进对局 → 致命面板（重试 / 回首页）。
4. **自愈**：1.2s 无成功渲染 → `applySafeFallback()`（纯色地板、无光束、隐藏名牌/号码）；3s 仍无 → 致命面板；WebGL 上下文每 800ms 轮询 `gl.isContextLost()`，丢失 3s → 致命面板 + `rebuildRenderer()` 重试。
5. **音频全兜底**：`createAudioContext` 包 try/catch，`unlock/startBgm/tone/noiseBurst/update` 全部 try/catch，BGM 调度加 `guard` 上限。
6. **启动兜底**：`src/main.ts` 的 `boot()` 整体 try/catch，构造期失败用 `wx.showModal` 弹出可读错误，不再白屏；`wx.cloud.init` 打点并记录异常。
7. **消除点击重活**：`SceneView.build()` 按阵容签名复用角色视图（同阵容重开不再重烘焙 8 张 canvas 贴图）；`CharacterView.dispose` 不再误释放共享影子贴图。
8. **模拟开关**（`web/wx-test.html`）：`canvasraf / rafonce / rafnots / noraf / audiofail / nocloud / nocanvas2d / dpr=3`。
9. **自检脚本**：`tools/diag-start.mjs`（`--old` 测体验版旧包、默认测新包、`--only=` 过滤）。

## 六、真机怎么验证（下次给证据）

1. **打开调试**：体验版页面路径/二维码 query 加 `?debug=1`（冷启动参数会被 `diag.ts` 读到）；**或者**在首页最底部「微信小游戏 · 竖屏手游玩法」那一行 **2 秒内连点 5 下**。
   - 打开后左上角出现 5 行半透明面板（`docs/screenshots/start-base-home-fixed.png` 就是它的样子）。
2. **看这 5 行**：
   - 第 1 行 `st=<屏> play=<状态> <fps>fps f=<帧号>`：**`f` 每秒应在涨 ~60**，不涨就是循环没跑；
   - 第 4 行 `driver=raf|timer lost=... err=...`：出现 `timer` 表示 watchdog 已接管（即真机 rAF 确实失联）；
   - 第 5 行 `!<最后一条错误>`：`!none` 表示无错误。
3. **取完整日志**：真机 vConsole/远程调试控制台执行 `__paiqiuDiag.dumpText()`，会输出 env + 全部阶段耗时 + 错误列表，直接回传即可定位"挂在哪一行"。
4. **验证上下文丢失链路**：控制台执行 `__paiqiuLoseCtx()`（主动丢上下文），应在 3 秒内出现"显卡上下文丢失"面板，点「重试」会重建渲染器。
5. **复验点开始**：面板里 `play` 应从 `start` → `playing`，`f` 继续增长。

## 七、还没排除的风险 / 待办

- **真机 rAF 为什么静默失联**：本地只能复现形态，无法确定机型/基础库原因（猜测：主屏 canvas 在启动期被同步长任务（首帧 100ms+ 烘焙）挤掉、或切后台后 rAF 链断）。现在有 watchdog 兜底，但根因还需真机 `driver=timer` 日志确认。
- `webglcontextlost` 事件在 wx canvas 上**收不到**（垫片 `addEventListener` 是空函数），只能 800ms 轮询；`rebuildRenderer()` 的恢复成功率未在真机验证。
- `wx.cloud.init` 提前到 boot 的耗时（`traceUser` 可能走网络）未在真机测量，若阻塞会让首帧更晚。
- 分享卡片冷启动自动进房（`?room=`）仍未在真机验证。
- **产品问题（按用户要求先记不改）**：首页两张 Q 版立绘与 3D 角色和难度卡片存在层叠遮挡，挡住了卡片的一半、影响交互层级；建议下一轮把立绘下移/压到卡片之上或缩小，并把 `layout()` 计算纳入安全区（`safeTop` 目前只影响 HUD）。
