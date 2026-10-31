# Q 版排球 · 线上化 v0.3 进度记录

| 项 | 内容 |
| --- | --- |
| 记录日期 | 2026-10-30 |
| 妙搭应用 | `app_17h1nabva0z`（full_stack，Q版排球 Online） |
| 本地仓库 | `d:\Project\paiqiu-online`（分支 `sprint/default`，改动尚未提交） |
| 本地入口 | http://localhost:8080/app/app_17h1nabva0z/ |
| 对局服 | `ws://localhost:8081/ws` |

---

## 一、架构结论

- 妙搭运行时只支持标准 HTTP（POST/GET/PUT/PATCH/DELETE），**不支持 SSE / WebSocket**，不能承载 60Hz 权威对局循环。
- 因此拆成两层：
  - **控制面**：妙搭 full_stack，负责飞书免登、大厅、房间、后续战绩。
  - **数据面**：独立 Node WS 服务，负责房间管理与双端输入转发。
- 对局同步采用**双人锁步（lockstep）**：两端跑同一份确定性模拟，只交换输入；AI 也使用同一随机序列，保证逐帧一致。
- 服务端不下发快照，不做回滚；出现输入缺口时两端一起等待。

---

## 二、已完成

### 1. 妙搭应用与工程

- 新建 full_stack 应用并拉到本地，脚手架为 NestJS + React 19 + Vite + PostgreSQL。
- 原 Three.js 游戏整体迁入 [client/src/game](../client/src/game)，单机模式保留。
- 游戏页面：[GamePage.tsx](../client/src/pages/Game/GamePage.tsx)（原 index.html 的 HUD 结构转成 React）。
- 新增依赖：`three`、`@types/three`、`ws`、`@types/ws`、`tsx`。

### 2. 飞书身份

- 后端接口 `POST /api/play/token`：[play.controller.ts](../server/modules/play/play.controller.ts)
- 用 `req.userContext` 取当前登录用户，HMAC-SHA256 签发 5 分钟有效的对局 token。
- 对局服连接时校验 token，防止匿名混入；前端在进房前自动取 token。

### 3. 大厅与房间

- [LobbyPage.tsx](../client/src/pages/Lobby/LobbyPage.tsx)
  - 创建房间、6 位房间码加入、复制邀请文案
  - 房主/队友两个槽位、准备与开赛
  - 房主开赛、队友等待、离开房间
  - 单机练习入口
- 房间逻辑全部在 [game-server/src/index.ts](../game-server/src/index.ts) 内存中完成，暂无数据库。

### 4. 实时对局

- 对局服：建房、加入、开赛、输入转发、断线通知、30s 心跳。
- 客户端：[play-client.ts](../client/src/net/play-client.ts)，负责连接、房间消息、输入收发与 tick 缓冲。
- [game.ts](../client/src/game/game.ts) 新增联机模式：
  - 跳过开始界面，自动开局
  - 按 `playerId` 取输入，支持同队两名真人
  - 等待远端输入时暂停推进，并提示“等待队友…”
- 模拟层改造：
  - `World` 支持 `humanCount` / `names` / `localPlayerId` / `seed`
  - 随机数改为每个 World 独立的 `createRng(seed)`，AI 与发球落点都走同一条序列
  - HUD、镜头、可击球提示改用 `world.localPlayerId`

### 5. Windows 开发环境

- 脚手架自带的 `npm run dev` 依赖 bash 与 POSIX 环境变量语法，Windows 下起不来。
- 已改为手动启动（见第六节），不改平台受控脚本。

---

## 三、已验证

| 验证项 | 结果 |
| --- | --- |
| 单机模式渲染与开局 | 通过（浏览器截图确认球场、角色、HUD） |
| 建房 / 加入 / 开赛 | 通过（房间码加入，房主开赛后两端进入 3D 对局） |
| 锁步确定性 | 通过（两个 World 同种子同输入跑 7200 tick，位置与球误差 0，比分/阶段零差异） |
| 真实联机推进 | 通过（脚本对手 + 浏览器实测：计时 120→111，比分 0–0→0–4） |
| 双端状态一致 | 通过（比分、计时、球员站位一致） |
| 生产构建 | 通过（`vite build`，产物约 1.76MB / gzip 520KB） |

---

## 四、待做

### P1 · 快速匹配

- 匹配队列：单人进队、两人成房、超时提示。
- 队列状态需要落到妙搭数据库或对局服内存，并处理取消匹配。
- 现有房间码邀请保留，作为好友开黑入口。

### P1 · 对局收尾

- 断线重连：重连后恢复房间与进度（锁步需要补发输入或直接重开）。
- 掉线接管：队友掉线后由本地 AI 接管其角色，或整局判负。
- 再来一局：保留房间、重新发种子，而不是回到大厅。
- 结算页在联机模式下的按钮行为对齐（当前“再来一局/返回大厅”都会退出对局）。

### P2 · 战绩与数据

- 建 `players` / `matches` / `match_players` 表（妙搭 PostgreSQL）。
- 对局结束由房主或服务端上报比分、MVP、时长。
- 大厅展示个人战绩，后续做排行榜。

### P2 · 生产部署

- 一台云主机部署 `game-server`，配 `wss://` 域名与证书。
- 前端构建时注入 `VITE_GAME_WS_URL`。
- 妙搭环境变量配置 `PLAY_TOKEN_SECRET`，与对局服保持一致（当前两端默认值仅用于本地）。
- 妙搭发布：先 commit + push `sprint/default`，再 `+release-create`，最后放开可见范围。

### P2 · 房间服务健壮性

- 房间与玩家状态目前在内存，服务重启即丢；后续可落库或做优雅重启。
- 增加连接超时、重连窗口、房间 TTL 清理。
- 输入消息做频率限制，防脚本高频。

### P3 · 体验

- 发球人固定为 slot 1（索引 1 的真人），后续可按局轮换。
- 等待队友时目前只有文字提示，可以加半透明遮罩。
- 移动端触屏操作未做。

---

## 五、已知限制与风险

1. **后台标签会拖停对局**：浏览器会限制后台标签的 `requestAnimationFrame`，锁步下另一端会一起等待。当前已加“等待队友…”提示；正式上线建议引导玩家保持标签页在前台，或改服务端定帧广播。
2. **锁步依赖两端同引擎**：同浏览器内核（Chrome/Edge）已实测一致；跨 Firefox/Safari 存在浮点差异导致分叉的风险，后续可加每 60 tick 的状态校验和。
3. **对局服无权威校验**：当前只转发输入，防作弊弱；后续可让服务端也跑一份模拟做校验。
4. **token secret 是本地默认值**：生产必须显式配置，否则存在伪造风险。
5. **改动未提交**：所有代码仍在工作区，妙搭发布前需要 commit + push。

---

## 六、本地怎么跑（Windows）

三个进程分别启动，缺一不可。

### 1. 后端（NestJS，端口 3000）

```powershell
# 在 d:\Project\paiqiu-online 下
# 先加载 .env / .env.local（注意还原 SUDA_WEBUSER 里的 \" 转义）
$files = @('.env','.env.local')
foreach ($f in $files) { if (Test-Path $f) { foreach ($l in Get-Content $f) {
  if ($l -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$') {
    $v = $matches[2].Trim()
    if ($v.StartsWith('"') -and $v.EndsWith('"')) { $v = $v.Substring(1, $v.Length - 2) }
    $v = $v -replace '\\"','"'
    [Environment]::SetEnvironmentVariable($matches[1], $v, 'Process')
  } } } }
$env:NODE_ENV='development'
.\node_modules\.bin\nest.cmd start --watch
```

### 2. 前端（Vite，端口 8080）

同上加载环境变量后，额外设置本地开发标记，否则拿不到登录态：

```powershell
$env:NODE_ENV='development'
$env:MIAODA_LOCAL_DEV='1'
.\node_modules\.bin\vite.cmd --config vite.config.ts
```

### 3. 对局服（WS，端口 8081）

```powershell
.\node_modules\.bin\tsx.cmd game-server/src/index.ts
```

> 日志分别写到 `logs/agent-server.out`、`logs/client.log`。不要重定向到 `logs/server.log`，那是平台 logger 自己在写的文件，会冲突。

### 联机自测

两个标签页打开 http://localhost:8080/app/app_17h1nabva0z/ ，一个建房、一个输码加入，房主点“开始比赛”。两个标签都保持前台。

---

## 七、下一步建议

1. 先把当前改动提交并推 `sprint/default`，避免工作区丢失。
2. 二选一继续：
   - 快速匹配：让“一个人来也能找到队友”成立，链路最短。
   - 断线/接管：让一局能完整打完，体验闭环更完整。
3. 之后再上战绩与生产 `wss`，最后做妙搭发布。
