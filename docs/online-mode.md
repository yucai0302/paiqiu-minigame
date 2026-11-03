# 好友组队联机模式（2 真人同队 vs 2 AI · 微信云开发方案）

> 增量改造：单人 2v2 模式及其全部入口（难度选择/触控/蓄力发球/结算）保持原样；联机与单人并存，首页两个入口清晰分离。**生产走微信云开发（云函数 + 云数据库），不自建服务器**；本地 WebSocket 仅保留给开发与自动化测试。

## 一、云开发这套的分工与取舍

### 1.1 实时性取舍（核心决策）

云数据库 `watch`（实时数据推送）**不适合 15~20Hz 的对局快照**——推送管线有合并/限流，且按读写量计费。两条路径对比：

| 路径 | 端到端延迟 | 成本 | 运维 | 结论 |
| --- | --- | --- | --- | --- |
| **A. 云函数 + 数据库降频直写（8Hz）+ watch 推送 + 客户端插值**（本方案） | 约 150~350ms（写库 ~50-100ms + watch 推送 ~100-250ms），休闲排球可接受 | 一局 3 分钟 ≈ 1500 次写 + 20 次函数调用，按量计费极低 | 零服务器，纯托管 | **选定**：与"不自建服务器"的约束一致，架构最简 |
| B. 云开发「云托管」容器内跑 WebSocket 服务 | 约 30~80ms | 容器按小时计费（常驻约 0.2~0.5 元/时） | 需要维护容器/镜像/伸缩 | **备选升级路径**：要打竞技级手感再切。客户端只需换 `NetClient` 实现（传输层换成 WS），协议不变 |

降频后的补偿手段：客户端已有**两帧快照插值**（`SnapshotMirror`），8Hz 时插值窗口约 125ms，视觉上依然是平滑连续的；watch 偶发合并推送导致更稀疏时，插值系数自动封顶在最新一帧，画面"短暂定格后跳转"，不会错乱。

### 1.2 控制流 vs 状态流的分工

- **低频控制流 → 云函数**（建房/进房/开局/结算/断线标记）：每次一调用，~100-300ms 延迟无感。
- **对局内状态流 → 数据库直写 + watch**：
  - 房主直写 `rooms_live` 文档广播快照（安全规则限定**仅房主可写**）；
  - 好友直写 `rooms_inputs` 文档上行输入（边沿立即刷、保持量 10Hz 节流）。
  - 不用 `callFunction` 传快照：8-10Hz 会同时拖垮延迟（每次都是完整 RPC）和函数调用量配额。
- **主机权威不变**：云侧只是"信使"，游戏逻辑全部在房主端（`World` 可整体搬迁，未来若要服务端权威仿真，云函数里可直接复用 `sim/` 目录）。

### 1.3 断线感知（无长连接时的兜底）

数据库方案没有 socket close 事件，用**双向静默超时**替代：

- 房主侧：好友输入静默 > 6s（`CLOUD_INPUT_DEAD_MS`）→ AI 接管其球员，对局不中断；输入恢复 → `peerBack` 切回真人。
- 客机侧：快照静默 > 8s（`CLOUD_SNAP_DEAD_MS`）→ 视为断链，自动重连 3 次（复用 `joinRoom resume`），失败出「网络断开」面板（重连/返回大厅）。
- 主动退出走 `markDisconnect` 云函数：等待房双方退出即删房；对局中好友退出只标记席位；对局中**房主退出直接关房**（权威端没了），客机收到明确提示。

### 1.4 微信侧限制与说明（不假设不存在）

1. **云开发要求**：小游戏 appid + 开通云开发 + 基础库 ≥ 2.16.1（README 已注明）；`wx.cloud` 在小游戏运行时可用。
2. **分享进房**：小游戏用 `wx.shareAppMessage({ title, query: 'room=xxxxxx' })`——注意小游戏**没有页面级 `onShareAppMessage` 回调**（那是小程序的 API），主动分享只能主动调用此接口；好友点卡片冷启动后在 `wx.getLaunchOptionsSync().query.room` 解析进房（`platform/wx.ts getLaunchQuery`）。这条链路已实现；「转发卡片二次拉起（热启动）」需 `wx.onShow` + `getEnterOptionsSync`，列入接入清单后续项。
3. **昵称/头像**：新版隐私协议下 `wx.getUserInfo` 常只返回匿名昵称。已做三级降级：query 调试覆盖 → `wx.getUserInfo` → 默认名「玩家」；头像用首字符占位（真实头像需 `wx.createOpenDataContext` 开放数据，见接入清单）。
4. **安全规则的能力边界**：规则是单集合、无跨表 join，所以所有集合都**冗余存 `members`（双方 openid）**，用 `auth.openid in doc.members` 做行级授权；"仅房主可写"用 `doc.members[0] == auth.openid` 表达。

## 二、改动清单

**新增（游戏侧）**
- `minigame/src/config/cloud.ts` — 云环境配置（`CLOUD_ENV` 占位为空串；缺配置时给可读提示并回落单人，不崩不白屏）+ 频率/超时常量
- `minigame/src/net/transport.ts` — 传输抽象 + 浏览器 WS / wx.connectSocket 双实现（本地测试与 WS 备选路径用）
- `minigame/src/net/mirror.ts` — 快照编码 / 两帧插值镜像回放 / 远程输入缓冲（边沿单次消费 + 1.5s 静默回退）
- `minigame/src/net/room.ts` — `NetClient` 统一接口 + 本地 WS 实现（`RoomClient`，开发/自动化测试用，连接 `tools/room-server.mjs`）
- `minigame/src/net/cloud.ts` — 云开发实现（`CloudRoomClient`）：云函数控制流 + live/inputs 文档直写与 watch + 静默超时断线感知 + 快照 q 单调去重
- `minigame/tools/room-server.mjs` — 本地 WS 房间服务器（手写 RFC6455，零依赖，仅测试用）
- `minigame/tools/e2e-online.mjs` — 双客户端自动化测试（两个独立无头浏览器跑完一整局）
- `minigame/tools/test-cloud-logic.mjs` — 云函数纯逻辑单元测试（16 项）

**新增（云开发侧）** — `minigame/cloudfunctions/`（5 个函数，每个含可测试的 `logic.js`）
- `createRoom` — 6 位房间号 + 房间文档初始化
- `joinRoom` — 座位状态机（入座/满员/对局中仅本人重连）
- `startMatch` — 房主校验 + `matchCfg` 下发 + live/inputs 文档初始化
- `settleMatch` — 结算写 `matches` 历史 + 房间置 `result`
- `markDisconnect` — 退出/断线标记（腾位/关房/删房）

**修改**
- `sim/world.ts` — `setHumanControl()` 运行时真人↔AI 切换（AI 接管兜底）；roster 空串回退默认名
- `platform/types.ts` / `web.ts` / `wx.ts` — `getLaunchQuery` / `getNickName` / `shareAppMessage`
- `app.ts` — 三模式状态机（local/host/guest）；`ensureNet()` 按能力自动选云/本地 WS/提示降级；快照频率取自 `net.snapHz`（本地 15Hz / 云 8Hz）；matchEnd 结算落库
- `ui/screens.ts` — 首页「邀请好友 · 2人组队」入口（单人 CTA 原样）；房间等待屏（房号/阵容位/分享/满员即开局/AI 补位开局）；断网面板；Toast；结算屏双方「头像位+昵称」行
- `web/wx-test.html` — mock 增加 `getLaunchOptionsSync`（解析 location.search）与 `shareAppMessage`

**未动**：比赛规则/物理/AI 策略、单人模式全部流程、手柄命中逻辑、safefx 安全模式、canvas 适配层（联机代码不引入任何新 DOM 依赖）。

## 三、云函数与数据库清单

### 3.1 数据库集合与索引

| 集合 | 文档结构 | 索引建议 | 用途 |
| --- | --- | --- | --- |
| `rooms` | `_id`=roomId；`members:[hostOpenid,guestOpenid]`；`names:[..]`；`hostAlive`；`guestAlive`；`state:waiting/playing/result/closed`；`matchCfg`；`createdAt`；`updatedAt` | `createdAt`（定时清理过期房）；`state` 复合 | 房间与撮合 |
| `rooms_live` | `_id`=roomId；`members`；`q`（快照序号）；`s`（快照 JSON 串）；`updatedAt` | 无需（按 _id 直查） | 对局内快照（房主直写） |
| `rooms_inputs` | `_id`=`{roomId}-{pid}`；`members`；`d`（输入 JSON 串）；`at`；`again` | 无需 | 好友输入上行 + 再战请求 |
| `matches` | 自动 id；`roomId`；`names`；`skill`；`setsWon`；`winner`；`mvp`；`finishedAt` | `finishedAt` 倒序（战绩页） | 结算历史 |

> 快照/输入存 JSON 字符串而非展开字段：文档形状稳定（watch 推送按变更字段计算，形状稳定推送更可靠），也避免每份快照几十个字段的写放大。

### 3.2 安全规则（云开发控制台 → 数据库 → 权限设置 → 自定义安全规则）

```jsonc
// rooms：房内成员可读，写仅云函数（服务端绕过规则）
{ "read": "auth.openid in doc.members", "write": false }

// rooms_live：房内成员可读；只有房主（members[0]，权威仿真端）可写
{ "read": "auth.openid in doc.members", "write": "auth.openid in doc.members && doc.members[0] == auth.openid" }

// rooms_inputs：房内成员可读可写（好友写自己的输入，房主读）
{ "read": "auth.openid in doc.members", "write": "auth.openid in doc.members" }

// matches：仅云函数读写（战绩敏感数据不给客户端直读）
{ "read": false, "write": false }
```

要点：所有可读集合冗余 `members`（双方 openid）用于行级授权；`doc.members[0] == auth.openid` 把快照写入权锁死在房主，好友即使被诱导执行任意代码也写不了权威状态。

### 3.3 云函数清单（全部含纯逻辑 `logic.js`，有单元测试）

| 函数 | 职责 | 关键校验 |
| --- | --- | --- |
| `createRoom` | 6 位房间号（碰撞重试）+ 房间文档 | 昵称净化（控制字符/12 字上限） |
| `joinRoom` | 入座/重连（座位状态机） | 满员、对局中仅本人重连、房间关闭 |
| `startMatch` | 写 `matchCfg`，初始化 live/inputs | 仅 `members[0]` 可开局；好友缺席自动 `fillAi` |
| `settleMatch` | 结算历史 + 房间置 `result` | 仅房内成员；比分净化（0-9 夹取） |
| `markDisconnect` | 退出/断线标记 | 等待房退出腾位/删房；对局中房主退出关房 |

> **为什么逻辑放每个函数目录里**：云函数按文件夹独立部署，跨目录 require 不会被打包；`logic.js` 无依赖（不 require wx-server-sdk），单元测试直接 `require` 真实函数逻辑，测的是上线运行的代码。

### 3.4 与现有构建的关系

- `cloudfunctions/` **不进** esbuild/tsc 流水线（纯 JS、独立 package.json，由开发者工具上传部署）；`minigame/src` 构建产物不含云函数。
- 游戏侧通过 `src/config/cloud.ts` 的 `CLOUD_ENV` 决定是否启用云实现；`ensureNet()` 优先级：**有 `CLOUD_ENV` 且 `wx.cloud` 可用 → 云；浏览器环境（`WebSocket` 存在）→ 本地 WS（开发/测试）；否则 → 可读提示 + 回落单人**。

## 四、同步协议速览

主机权威（与传输无关，云/WS 同构）：

```
房主(0) 跑完整仿真 ──15Hz(本地)/8Hz(云)──► 快照 {q, ph, 分数, 球/4人状态, 事件[]} ──► 客机镜像插值回灌
客机(1) 读手柄 ──60Hz(本地WS)/10Hz聚合(云)──► ControlInput ──► 房主 RemoteInputBuf(边沿单次消费)
开局：房主 sendStart(skill, seed) ──服务端──► 双方收到 StartCfg → 用同 seed 构造一致世界
```

- 快照 `q` 单调递增：watch 重推/乱序时客机只应用更新的（`isNewerSnapshot`）。
- 事件（击球/得分/播报/matchEnd）随快照携带、一次性重放，走 app 既有 `wire`，音效/特效/HUD 零改动。
- `RemoteInputBuf`：边沿位（击球/跳跃/拦网）只消费一次防多步重复触发；>1.5s 无包回退空输入防"幽灵移动"。

## 五、本地可验证的部分与证据

本地不依赖云环境（云实现本地无真实 env，验证方式=类型检查+单元测试；联机全链路用本地 WS 验证，协议与云同构）：

- `npm run typecheck` ✓ / `npm run build` ✓（js/main.js 608.3kb）
- 云函数纯逻辑单元测试：`node tools/test-cloud-logic.mjs` → **16 passed, 0 failed**（座位状态机 6、开局配置 3、快照合并 1、结算净化 1、退出状态机 5）
- 双端联机 E2E（`node tools/e2e-online.mjs`，两个独立无头浏览器）：建房 → 冷启动进房（模拟点分享卡片）→ 满员自动开局 → 双方摇杆移动+击球 → 比分变化两端一致 → 中途断线 AI 接管 → 自动重连 → 打满一局结算 → 单人模式回归，全程无 pageerror（A/B/C 三页 pageerror 计数均为 0）。关键数据（连续多轮一致）：
  - 位置同步：`host p0.pos = {"x":1.045,"y":0,"z":8.55} | guest mirror p0.pos = {"x":1.045,"y":0,"z":8.55}`（逐位一致）
  - 比分镜像：`scores host = [0,1] | guest = [0,1] → MATCH`；断线重连后客机追平 `[0,2]`
  - 断线重连：kill 客机 socket → 客机 ~800ms 内自动重连（服务器日志 `断线 → 重连 小红(seat 1)`），传输层 `readyState: 1` 恢复，快照续流
  - 结算一致：双端 `sets=[0,2]`、阵容 `["小明","小红","米娅","卡尔"]`，房主/客机各自模式正确
  - 调试过程中修掉的两个真 bug（已回归验证）：① 手写 WS 服务器未回 close 帧导致浏览器 `onclose` 永不触发（readyState 卡 CLOSING，客机感知不到断线）；② 房主 matchEnd 触发时事件收集器尚未入队，终局快照缺 matchEnd 事件
  - **终轮全绿输出**：`E2E PASS`，`page errors: NONE`；单人回归 `{"sets":[0,2],"mode":"local","players":["你","阿洛","米娅","卡尔"]}`；断线镜头脚本另取证了 rally 阶段 kill 的「好友断线 / AI 队友接管」播报（`tools/shot-disconnect.mjs`）
- 单人模式回归：新开干净客户端点「开始比赛」→ 正常开局、摇杆移动、击球、HUD 记分（`single-regression-match.png`）→ 打满一局出结算（`single-regression-result.png`），流程与改造前一致
- 截图（docs/screenshots/）：
  - 房间等待：`online-room-host-waiting.png`
  - 开局/对局：`online-match-kickoff-host.png` / `online-match-kickoff-guest.png` / `online-match-rally-host.png` / `online-match-rally-guest.png`
  - 比分同步：`online-match-score-host.png` / `online-match-score-guest.png`
  - 掉线兜底：`online-disconnect-ai-takeover-host.png` / `online-reconnected-guest.png`
  - 联机结算：`online-result-host.png` / `online-result-guest.png`
  - 单人回归：`single-regression-match.png` / `single-regression-result.png`
  - 降级路径（CLOUD_ENV 为空）：`home-degrade-nonet.png` / `home-degrade-fakecloud.png`（可读提示停留在首页）/ `home-degrade-single-*.png`（降级后单人正常开局）

## 六、真机接入清单

> **照着点就能通的完整部署清单（集合/索引/安全规则/云函数/真机排查日志）已独立成文档：[cloud-deploy.md](cloud-deploy.md)**，此处仅列决策点。当前已配置：appid `wx9d00ff565d37bf6b`、云环境 `cloud1-d6gnrnrmt9643a949`（`src/config/cloud.ts`，启动早期 `wx.cloud.init({ env, traceUser: true })`）。

1. **【已配置】** appid 与环境 ID 已接入 `project.config.json` / `src/config/cloud.ts`
2. **【需用户操作】** 按 [cloud-deploy.md](cloud-deploy.md)：建 4 个集合 + 粘贴安全规则 → 开发者工具部署 5 个云函数 → 上传小游戏版本
3. **【已验证】** 缺 env / 缺云能力的降级路径：回落单人模式 + 可读提示（`tools/test-degrade.mjs` 两用例全过，截图见第五节）
4. **（可选）** 开放数据域真实头像、`wx.onShow` 热启动进房、云托管 WebSocket 低延迟升级路径（见 1.1）

## 七、遗留风险

- **房主断线不可恢复**：权威仿真在房主端，对局中房主断线客机只做明确提示（云方案下 watch 静默超时 8s 触发）；彻底解决需服务端权威（`sim/` 目录已为搬迁做好准备，云函数可直接复用 `World`）。
- **watch 推送频率**：8Hz 直写下若实测被推送管线合并限流，可降到 6Hz（改 `CLOUD_SNAPSHOT_HZ`），或切备选的云托管 WebSocket 路径；客户端插值已兼容更低频率。
- **发球规则公平性**：现有仿真固定 0 号位（房主）发球，好友（1 号位）永远不会发球——单人模式本就如此，联机下两端体验略有不对称；调整需动玩法逻辑，按约束未改。
- **对局中加入受限**：开局后新加入被拒（仅允许原座重连），提示「房间正在对局中」。
- **云配额成本**：一局约 1500 次库写 + 20 次函数调用，按量计费极低但需留意免费额度耗尽后的账单告警。
- **分享卡片热启动**：本期只处理冷启动 query；「转发卡片再次拉起」依赖 `wx.onShow`，已列入接入清单第 9 条。
- **房间 GC**：等待房靠双方退出删除 + `createdAt` 索引供控制台定时任务清理；异常进程残留的房（双方都没走 markDisconnect）需要配置一个每日定时触发器清 `updatedAt` 超过 30 分钟的 `waiting` 房（云开发控制台可配，本期未加）。
