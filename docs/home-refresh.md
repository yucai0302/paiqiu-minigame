# 首页 / 开始界面重做（Switch 标题画面风格）

## 问题诊断（改动前）

对照用户截图（[home-before.png](screenshots/home-before.png)），旧首页的具体问题：

1. **视觉重心偏上**：一张大白卡几乎占满屏，标题/难度/按钮/说明全堆在卡内上半部，卡底部大片空白，整屏看起来"不居中"。
2. **说明书式正文**：操作说明是左对齐灰色小字长段落（4 行规则描述），没有游戏感。
3. **主按钮没有层级**：淡薄荷绿、对比度低，和卡片背景拉不开差距，不像视觉焦点。
4. **难度选择像普通分段控件**：纯文字，选中态只是浅绿底，没有冲击力。
5. **浪费了场馆**：刚重做的 3D 球场被白卡完全压住，首页等于一块白板。
6. **没有人物、没有标题设计、没有动效**，所以"让人没有玩的欲望"。

## 设计思路（参考 Switch 游戏标题画面）

- **场馆即舞台**：白卡删除，改为 38% 暗化罩 + 上下渐晕，3D 球场与四名球员直接成为首页背景；另画两张 Q 版球员立绘（绿队/红队，风格对齐 3D 角色）站在网前做"对阵"构图，中间一个描边金色 VS。
- **标题 logo 化**：62px 粗体白字 + 深蓝描边 + 烘焙投影 + -2.4° 微倾斜，下方胶囊副标题「2v2 · 7 分制 · 三局两胜」。
- **主 CTA 一眼可辨**：队色草绿渐变（#34e187→#15b163）胶囊大按钮（280×92），白字带描边、顶部高光、底部烘焙投影；按下时换深色贴图 + 缩放 0.93，两段式（按下-松手）触发。
- **难度卡片化**：三张横向卡片各带图标（简单=带尾迹的慢球 / 普通=排球 / 困难=火焰）+ 名称 + 一句话副标；选中态绿色实心 + 发光外圈 + 放大 1.1，未选中半透明深色；卡片下方一行选中难度说明（AI 强度与适合人群）。
- **操作说明图标化**：长段落删除，改为底部"图标 + 短标签"提示条（移动 / 击球·发球 / 跳跃 / 拦网 / 冲刺），加一行规则短句「每队最多三次触球 · 先得 7 分 · 三局两胜」；压在场馆画面上的文字统一加深色描边保证可读。
- **动效克制**：只做 transform 动画（标题呼吸 ±1.4%、CTA 悬浮 ±1.8%、立绘上下浮动 4px、选中卡片轻微脉动），静态背景层只在进入/切难度时重绘一次 canvas；`SAFE_MODE`（`?safefx=1` / `GameGlobal.__SAFEFX__=1`）下全部静止。

## 主要改动

- `minigame/src/ui/screens.ts`：首页整体重写。
  - 静态层（`drawStatic`）与动效元素（独立 sprite）分离，逐帧只改 transform，不重绘 canvas。
  - 新贴图工厂：`titleTexture`（描边标题+副标题胶囊）、`chibiTexture`（Q 版立绘）、`ctaTexture`（常态/按下双贴图）、`diffCardTexture`（常态/选中双贴图，常驻显存直接换 `mat.map`，避免 `setSpriteTexture` dispose 旧贴图）。
  - 布局常量集中在 `layout()`，`panelTop = H*0.122`，各尺寸屏幕按比例整体居中。
  - 结算 / 暂停屏同步改成深色玻璃面板（`glassPanel`），主按钮复用 CTA 贴图，风格统一。
- `minigame/src/app.ts`：
  - 主循环每帧调用 `screens.update(dt)` 驱动动效。
  - `onTouchEnd` 在 screens 可见时派发给 `screens.touchEnd`（修复主按钮松手不触发的断链：`touchEnd` → `firePrimary` → `onStart/onAgain/onResume`）。
- 功能保留清单：难度三选一 ✓ 开始比赛 ✓ 操作说明（图标化）✓ 规则短句 ✓「微信小游戏 · 竖屏手柄版」版本行 ✓ 比赛逻辑零改动 ✓

## 验证结果

- `npm run typecheck` ✓、`npm run build` ✓（js/main.js 584.1kb）。
- 居中数值（420×860 视口像素级扫描，脚本 `$TEMP/pptr/measure.js`）：
  - 首内容行 y=**108**（标题字形顶），主内容块底 y≈**747**（提示条标签）
  - 内容块中心 ≈ **427.5**，屏幕中心 430，**偏差仅 ~3px**（旧版内容整体偏上约 1/4 屏）
  - 页脚：规则行 y=778、版本行 y=816，底部留白 ~36px，顶部留白 108px，上下视觉均衡
- 交互验证：
  - 点「困难」卡片 → 选中态绿色实心放大，说明行切换为「AI 全速反应，赢球要凭真本事」✓（home-after-hard.png）
  - 按住 CTA → 按钮区域平均色从 rgb(100,203,151) 降至 (70,165,116)，按下贴图+缩放生效 ✓（home-after-press.png）
  - 松手 → 正常进入对局，HUD/手柄正常显示 ✓（home-after-start-click.png）
  - `?safefx=1` → 所有动效静止、纯色地板，布局不变 ✓（home-after-safefx.png）

## 截图

| 状态 | 文件 |
| --- | --- |
| 改动前（用户反馈截图） | [home-before.png](screenshots/home-before.png) |
| 默认态 | [home-after-default.png](screenshots/home-after-default.png) |
| 难度·困难选中态 | [home-after-hard.png](screenshots/home-after-hard.png) |
| 主按钮按下态 | [home-after-press.png](screenshots/home-after-press.png) |
| 安全模式（关动效） | [home-after-safefx.png](screenshots/home-after-safefx.png) |
| 点击开始→进入对局 | [home-after-start-click.png](screenshots/home-after-start-click.png) |

## 遗留问题

- 提示条标签与身后 LED 广告板在个别帧略有视觉重叠，已用深色文字描边保证可读；如仍嫌乱，可给提示条加一条半透明底带。
- 详细规则（发球瞄准、蓄力等）目前只在开局播报中出现，未做可展开的「玩法说明」面板；如用户需要可后续加一个 ghost 按钮入口。
- Q 版立绘为 2D 手绘贴图，与 3D 角色的发型细节未逐一对应；如需完全一致可从 3D 角色离线渲染截取。
