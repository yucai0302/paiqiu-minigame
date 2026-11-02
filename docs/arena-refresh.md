# 场馆场景与记分牌重做说明

## 参考调研（先调研后动手）

| 真实球场特征 | 来源 | 旧版现状 | 新版做法 |
|---|---|---|---|
| 比赛区与无障碍区**必须不同颜色**，界线白色 5cm，前/后场区可不同色；无障碍区边线外 ≥3m（FIVB 大赛 5m/6.5m） | [FIVB 官方规则 2025–2028](https://www.volleybelgium.be/wp-content/uploads/2025/08/250820-FIVB-VOLLEYBALREGELS-2025-2028.pdf)、[FIVB Rules EN](https://www.fivb.com/wp-content/uploads/2024/03/FIVB_Volleyball_Rules_2015-2016_EN_V3_20150205.pdf) | 白色棋盘格"雪地"，蓝色平面线条，无无障碍区概念 | 东京蓝比赛区（`#3a76d8`）+ 灰蓝无障碍区（`#46587a`，外扩 3m）+ 白色界线 + 前场区加深 |
| 塑胶/木地板带光泽反射，非纯色 | 职业联赛转播画面 | 纯色贴图无质感 | 噪点 + 柔和高光条带 + 边缘暗角，烘焙进一张 704×1104 贴图，`roughness 0.5` |
| 深色观众席 + 四周 LED 广告板 + 顶部聚光 | 东京 2020 有明体育馆（蓝区+浅蓝环绕）、巴黎 2024（紫区） | 天蓝渐变背景 + 雪堆冰块（露天雪地） | 深色看台（观众色点贴图 ×4 面）、环形 LED 广告板、顶部发光灯板 + 体积光束 |
| 球网白标志带、深蓝网柱保护垫、红白天线 | FIVB 器材规范 | 白色素杆 | 白色加宽网带、深蓝网柱垫、底座、天线保留 |

旧版根本问题：它是"雪地公园"而不是"排球馆"——无分区、无围合、无灯光氛围，所以"不运动"。

## 具体改动

**[arena.ts](../minigame/src/render/arena.ts) 重写：**
- 地板：比赛区+无障碍区+界线+质感**烘焙成一张贴图**，整片地板只有 1 个 mesh（旧版是 1 场地 + 7 线条 mesh）
- 外圈深色木纹地板、四块 LED 广告板（贴图按 256px 单元无缝平铺）、四面看台、四组顶灯（发光板 + additive 光束）
- 删除雪地/雪堆/冰岩装饰

**[scene.ts](../minigame/src/render/scene.ts)：**
- 背景改场馆深色渐变，雾色 `0x141f33` 与之衔接，远景看台自然没入暗部
- 灯光改室内馆方案：冷色半球光 0.95 + 暖白主光 1.7 + 补光 + 顶部中央 PointLight（共 4 盏，旧版 3 盏）
- 机位微调（抬高 0.7、后移 1.2、look 上移），让远端看台与灯光入画，球场仍占画面主体约 5/6

**[hud.ts](../minigame/src/ui/hud.ts) 记分牌：**
- 深色电子屏面板（`rgba(10,17,30,0.94)` + 描边 + 顶部高光线）
- 信息层级：顶行 SET/计时（mm:ss，最后 5 秒变红）/目标分 → 中间队色胶囊（HOME 绿/AWAY 红，与球衣同色）+ 发光大比分 → 底行局分点 + BO3
- 新增**发球方指示**：发球方队名上方黄色亮点（`world.serverId` 驱动，原有数据，未改逻辑）

## 性能影响（数据依据）

| 指标 | 旧版 | 新版 | 说明 |
|---|---|---|---|
| 场景 mesh 数 | ~38（雪堆 10 + 线条 7 + 岩石 5…） | ~35（地板 2 + 网 17 + LED 4 + 看台 4 + 灯 8） | 持平略降 |
| 场景材质数 | ~12 | ~14（多为共享贴图材质） | 持平 |
| 灯光数 | 3 | 4 | +1 盏 PointLight，无阴影贴图（shadowMap 仍关闭） |
| 贴图 | 多张重复小贴图 | 地板 1 张 704×1104 + 共享小贴图 | 全部启动期一次性烘焙，运行时零 canvas 重绘 |
| 玩法/触控 | — | — | 一行未改 |

## 验证

- `npm run typecheck`、`npm run build` 通过
- 浏览器调试包竖屏（390×844）截图（docs/screenshots/）：
  - `arena-before.png` — 改动前（雪地+白棋盘格+旧记分牌）
  - `arena-after-overview.png` — 开局全景：球场分区、LED 板、看台、灯光
  - `arena-after-closeup.png` — 近景：地板质感、白线、球网、网柱垫、天线
  - `arena-after-midmatch.png` — 比赛中：比分 0:2、发球指示在 AWAY 侧、计时 1:33、触球 2/3 警示态

## 遗留问题

- 光束为 additive 半透明锥体，低端机上 4 条光束每帧参与混合，若实测掉帧可把 `buildLights` 里的 beam 减半（2 条）；
- 看台是单面贴图墙，拉远/极端角度下略显平——竖屏固定机位下不可见该问题；
- 真机/微信开发者工具未实测，建议在真机确认深色背景下的整体亮度（必要时把 hemi 光从 0.95 提到 1.1）。

Sources:
- [FIVB Official Volleyball Rules 2015-2016 (EN)](https://www.fivb.com/wp-content/uploads/2024/03/FIVB_Volleyball_Rules_2015-2016_EN_V3_20150205.pdf)
- [FIVB 排球比赛规则 2025–2028（中文版）](https://www.vbahk.org.hk/items/media/Refereeing/202528_Volleyball_Rules/VB/20252028vbrules_chineseversion.pdf)
- [FIVB Volleybal Spelregels 2025–2028](https://www.volleybelgium.be/wp-content/uploads/2025/08/250820-FIVB-VOLLEYBALREGELS-2025-2028.pdf)
- [Volleyball Court Colour and Design – ChampCourts](https://champcourts.com/collections/volleyball-courts)
- [CSD NIDE 排球场地规范](https://www.csd.gob.es/es/csd/instalaciones/politica-publica-de-ordenacion/normativa-tecnica-de-instalaciones-deportivas/normas-nide/nide-1-20)
