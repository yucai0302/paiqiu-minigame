# 云开发部署清单（照着点就能通）

> 配套总方案见 [online-mode.md](online-mode.md)。本文只做一件事：从零到真机跑通，每一步在哪个界面点什么都写清楚。
>
> **当前已配置**：appid `wx9d00ff565d37bf6b`（project.config.json）；云环境 `cloud1-d6gnrnrmt9643a949`（minigame/src/config/cloud.ts 的 `CLOUD_ENV`，启动早期 `wx.cloud.init({ env, traceUser: true })`）。
> **本地无法替你做的**：开通环境、建集合、部署云函数（需微信开发者工具 / mp 后台登录态），按下面清单执行即可。

## 0. 前置条件

- 微信开发者工具（最新稳定版）已安装并登录
- 小游戏 appid `wx9d00ff565d37bf6b` 的管理员/开发者权限
- 基础库 ≥ 2.16.1（云开发与实时推送在此之上稳定；项目已配置 libVersion 3.9.0）

## 1. 开通云开发环境（如果还没有）

1. 打开 [mp.weixin.qq.com](https://mp.weixin.qq.com) → 用小游戏账号登录
2. 左侧菜单「开发管理」→「开发设置」→ 找到「微信云开发」→「开通」
3. 选择**按量付费**基础档（有免费额度，本项目用量远低于免费额度：一局 ≈1500 次库写 + 20 次函数调用）
4. 环境已存在的话跳过。确认环境 ID 是 `cloud1-d6gnrnrmt9643a949`（不是的话改 [cloud.ts](../minigame/src/config/cloud.ts) 的 `CLOUD_ENV` 保持一致）

## 2. 创建 4 个数据库集合

云开发控制台（mp 后台 → 微信云开发 → 控制台，或开发者工具顶部「云开发」按钮）→「数据库」→「+ 创建集合」，依次创建：

| 集合名 | 文档结构（字段说明） | 索引建议 |
| --- | --- | --- |
| `rooms` | `_id`=6位房间号；`members`=[房主openid, 好友openid]（空位为 `""`）；`names`=[房主名, 好友名]；`hostAlive`/`guestAlive`（布尔，席位在线状态）；`state`（`waiting`/`playing`/`result`/`closed`）；`matchCfg`（`{skill, seed, names, fillAi}`）；`createdAt`/`updatedAt`（毫秒时间戳） | `updatedAt` 升序（供定时清理任务扫描）；如做战绩页可加 `state+updatedAt` 组合 |
| `rooms_live` | `_id`=房间号；`members`（同上，行级授权用）；`q`（快照序号，单调递增）；`s`（快照 JSON 字符串）；`updatedAt` | 无需索引（全部按 `_id` 直查直写） |
| `rooms_inputs` | `_id`=`{房间号}-{pid}`（如 `483921-1`）；`members`；`d`（ControlInput JSON 字符串）；`at`（毫秒时间戳，房主判掉线用）；`again`（布尔，再战请求标记）；`updatedAt` | 无需索引 |
| `matches` | 自动 id；`roomId`；`names`；`skill`；`setsWon`=[a,b]；`winner`（0/1）；`mvp`（字符串）；`finishedAt`（毫秒） | `finishedAt` 降序（战绩列表）；`roomId`（按房查战绩） |

索引在集合页「索引管理」→「添加索引」里建。

## 3. 配置安全规则（逐集合复制粘贴）

控制台 → 数据库 → 选中集合 →「权限设置」→ 切到「自定义安全规则」→ 粘贴对应 JSON → 保存：

**rooms** —— 房内成员可读，写只留云函数：

```json
{
  "read": "auth.openid in doc.members",
  "write": false
}
```

**rooms_live** —— 成员可读；只有房主（`members[0]`，权威仿真端）可写：

```json
{
  "read": "auth.openid in doc.members",
  "write": "auth.openid in doc.members && doc.members[0] == auth.openid"
}
```

**rooms_inputs** —— 成员可读可写（好友写自己的输入，房主 watch 读）：

```json
{
  "read": "auth.openid in doc.members",
  "write": "auth.openid in doc.members"
}
```

**matches** —— 战绩敏感数据，客户端不可直读，仅云函数（服务端绕过规则）读写：

```json
{
  "read": false,
  "write": false
}
```

> 规则原理：安全规则是单集合、无跨表 join，所以每个集合都冗余 `members`（双方 openid）用 `auth.openid in doc.members` 做行级授权；快照写入权用 `doc.members[0] == auth.openid` 锁死在房主。

## 4. 部署 5 个云函数

每个函数目录已含 `index.js`（入口）、`package.json`（依赖 `wx-server-sdk ~2.6.3`）、`config.json`（超时 5s / 内存 256MB 建议）、`logic.js`（纯逻辑，部署时一并上传）。

**操作**（对以下 5 个目录各做一遍）：

1. 微信开发者工具打开 `minigame` 项目（appid 已配置，工具会识别 `cloudfunctionRoot`，资源管理器里 `cloudfunctions/` 目录带云图标）
2. 右键 `cloudfunctions/createRoom` → 「上传并部署：云端安装依赖」（**不要选**「不上传 node_modules」，云端会按 package.json 安装）
3. 等待上传完成提示；其余 4 个同理：
   - `cloudfunctions/joinRoom`
   - `cloudfunctions/startMatch`
   - `cloudfunctions/settleMatch`
   - `cloudfunctions/markDisconnect`

| 函数 | 职责 | 超时/内存建议 |
| --- | --- | --- |
| `createRoom` | 生成 6 位房间号（碰撞重试）+ 建房间文档 | 5s / 256MB（config.json 已带） |
| `joinRoom` | 座位状态机：入座/满员/对局中仅本人重连 | 同上 |
| `startMatch` | 写 `matchCfg` + 初始化 live/inputs 文档 | 同上（有 3 次串行写库，别低于 5s） |
| `settleMatch` | 结算写 `matches` + 房间置 `result` | 同上 |
| `markDisconnect` | 退出/断线标记；空房删文档（最多 4 次删除） | 同上 |

> 如果工具版本不识别 config.json 的 `memorySize` 字段：到控制台「云函数」→ 选中函数 →「配置」→ 手动改内存 256MB、超时 5 秒。
> 部署成功后控制台「云函数」列表应显示 5 个函数，状态正常。

## 5. 上传小游戏代码

1. 开发者工具 →「上传」→ 填版本号（如 0.3.0-online）→ 确认
2. mp 后台「版本管理」→ 把该版本设为**体验版**（两台真机都加体验权限）或直接提交审核发布

## 6. 真机跑通流程（两台手机）

1. **手机 A**：微信打开小游戏（体验版入口）→ 首页点「邀请好友 · 2人组队」
   - 成功标志：出现房间等待屏、金色房间号 —— 这一步通了 = `createRoom` 云函数 + 数据库写 + watch 全链路 OK
   - 失败标志：toast「云服务暂不可用」→ 去第 7 步查 `createRoom` 日志
2. 房间屏点「邀请微信好友」→ 微信分享面板选好友 B —— 这一步会发出 `wx.shareAppMessage`，卡片 query 带 `room=房间号`
3. **手机 B**：微信里点 A 发来的卡片 → 小游戏冷启动 → 自动进房 → 双方房间屏变满员 → **自动开局**（世界自带 3 秒倒计时）
4. 打一局：A 是绿队 01（发球位），B 是绿队 02；对面两个 AI
5. 结算屏显示双方昵称 + 局分；房主点「再来一局」可重开，好友点「申请再战」也会触发房主重开

**断线兜底自测**：对局中让 B 开飞行模式 6 秒再关——A 会播报「好友断线 · AI 队友接管」继续打，B 恢复网络后自动重连回场、播报「好友已回归」。

## 7. 真机排查要看哪些日志

| 问题 | 看哪里 |
| --- | --- |
| 点邀请没反应/toast 云服务暂不可用 | mp 后台 → 云开发 → 云函数 → `createRoom` → 日志（调用是否到达、报错内容）；注意日志里 OPENID 是否为空（空 = `traceUser` 没生效或 init 时机不对） |
| B 点卡片没进房 | 手机 B 真机 vConsole（微信里打开调试：小游戏右上角胶囊 → 打开调试，重启小游戏）看启动参数里有没有 `query.room`；有 room 但没进房 → 查 `joinRoom` 日志 |
| 房间屏卡住不动/没自动开局 | 控制台 → 数据库 → `rooms` 集合：看房间文档 `members`/`state`/`matchCfg` 变化；`startMatch` 云函数日志 |
| 开局后画面冻结 | `rooms_live` 集合：`q` 是否递增、`s` 是否更新；不更新 = 房主直写失败（大概率安全规则没配对，回第 3 步） |
| 好友输入无效 | `rooms_inputs` 集合：`at` 是否刷新；房主 `rooms_inputs` watch 是否建立 |
| 结算没写进历史 | `matches` 集合 + `settleMatch` 日志 |

## 8. 真机坑清单（已核对/已规避的 + 需留意的）

1. **`wx.cloud.init` 的 `traceUser`**：✅ 已带（[main.ts](../minigame/src/main.ts) 启动早期 + [cloud.ts](../minigame/src/net/cloud.ts) 幂等兜底，`{ env, traceUser: true }`）。云函数里 `getWXContext().OPENID` 依赖它做座位鉴权——漏了它整个座位状态机会失效。
2. **云函数返回体大小**：上限约 1MB，本项目所有返回 <1KB，无风险。
3. **数据库单文档大小上限**：快照实测单份最大 **947 字节**（本地 E2E 全量统计 600+ 份快照取最大值，含事件突发帧也远低于 8KB），且 8Hz 是**原地 update 单文档**不产生新记录，距离任何档位的单文档上限都有两个数量级余量。
4. **watch 断线重连**：弱网下云开发 watch 自身会重试；本项目额外兜了一层——`watch.onError` → 发 `down` → 走 joinRoom(resume) 重建全部 watch（[cloud.ts](../minigame/src/net/cloud.ts) 的 joinRoom 会先清旧 watcher，防重复订阅）。留意每端同时 watch 数量配额（本项目每端最多 2 个 watch，远低于上限）。
5. **`wx.shareAppMessage` 的 query 编码**：当前只传 `room=123456` 纯数字，**无需** URL 编码。⚠️ 以后若往 query 加中文名等非常规字符，必须 `encodeURIComponent`，否则真机冷启动解析 query 会失败。小游戏没有页面级 `onShareAppMessage` 回调，主动分享只能主动调这个接口（已按此实现）。
6. **冷启动 vs 热启动**：已实现冷启动（`getLaunchOptionsSync().query.room`）。「转发卡片二次拉起已打开的小游戏」走热启动，需 `wx.onShow` + `getEnterOptionsSync`，列入后续项——首次接入先让 B 关掉小游戏再点卡片即可稳定复现冷启动路径。
7. **基础库**：`getLaunchOptionsSync`/`watch`/云开发要求 ≥ 2.16.1，项目 libVersion 3.9.0 满足。

## 9. 验证记录（本地自动化，改配置后已跑）

- `npm run typecheck` / `npm run build` 通过（js/main.js 608.5kb）
- 降级路径（`tools/test-degrade.mjs`，CLOUD_ENV 置空时）：两个用例全过——①无 WebSocket 且无云接口；②有 wx.cloud 接口但 env 为空（真机未填 env 的形态）——均为：点「邀请好友」→ **不建任何网络连接、停留在首页、弹出可读提示**（`netCreated:false, screen:'start', toastActive:true`），随后「开始比赛」正常进入单人对局（`state:'playing', mode:'local'`），全程零 pageerror；截图 `home-degrade-nonet.png` / `home-degrade-fakecloud.png` / `home-degrade-single-*.png`
- 真实配置填回后，本地 WS 双端 E2E 回归（`tools/e2e-online.mjs`）：联机全流程 + 单人回归全绿（浏览器环境无 wx.cloud，自动走本地 WS 路径，与真机云路径协议同构）
