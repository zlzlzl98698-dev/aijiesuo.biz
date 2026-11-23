---
title: 光速云深度评测：6组三网实测与AI节点分化核查
description: 基于2026-08-11与08-19三网6组实测截图，拆解光速云7档套餐月耗成本、VLESS/SS/AnyTLS分流策略、Gemini节点分化及不退款边界。
date: 2026-11-23
updated: 2026-11-23
category: reviews
tags:
  - 光速云评测
  - 光速云测速
  - ChatGPT节点解锁
  - Gemini节点测试
  - IEPL专线
keywords:
  - 光速云评测
  - 光速云能稳定用 ChatGPT 和 Gemini 吗
  - 光速云测速实测怎么样
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/光速云品牌信息.txt
  - raw-data/speedtest-manifest.json
  - docs/public/images/guangsu/
verifiedAt: 2026-11-23
entity: review-guangsu
intent: commercial
pillar: brands
related:
  - /brands/guangsu/
  - /pricing/guangsu/
  - /tutorials/guangsu/
  - /compare/guangsu-vs-muguang/
  - /compare/guangsu-vs-feimao/
  - /compare/guangsu-vs-xingdaomeng/
draft: false
---

# 光速云深度评测：2020 年老牌 IEPL 机场的三网实测与 AI 边界核查

在 aijiesuo.biz 收录的 32 家机场中，**光速云（`guangsu`）** 是目前唯一同时具备 **2026-08-11 单次节点测速图** 与 **2026-08-19 电信/移动/联通三网 + 70 节点流媒体/OpenAI/Gemini 专项实测截图** 的品牌，研究评分 **`92/100`**，也是本站商业主推排位第一的品牌。以下结合全部实测记录与原始文本冲突，从工程分流、月度负载成本与同档位竞品对比三个维度给出不回避短板的核查结论。

<BrandSnapshot slug="guangsu" />

## 1. 核心判断（先看结论，再查证据）

- **老牌资质与双端自由度** `[品牌资料 Vendor Claimed]`：2020 年运营至今，定位 IEPL 专线 + 企业级内网专线（文档另述 IPLC 与隧道中转结合），支持支付宝、微信与 USDT，且保留官方自研客户端与第三方订阅导入（Clash / Shadowrocket）双通道。
- **三网吞吐与局部坏点并存** `[实测证据 Measured]`：`2026-08-19` 午间实测表明，长沙电信、广西移动、河北联通（6 线程 SS 62 节点）与珠海联通（单线程 Vless 70 节点）整体表现扎实，例如珠海联通香港 Vless 均速 `375–424MB/s`、广西移动新加坡均速 `50–53MB/s`；但同批实测亦记录到个别节点异常（`德国01` 43.08KB/s、`美国02` 1.60KB/s）。
- **AI 工具核心结论（能用，但必须精准分流）** `[实测证据 Measured]`：ChatGPT/OpenAI 在日/美/新/台多数 Vless/SS 节点可解锁，但**香港 SS 专线仅限 `APP(HK)`** 且 **10 个电信 AnyTLS 专线节点多项为 `N/A`**；**Gemini 仅在新加坡 01–10、马来西亚 01–02、土耳其 01 解锁**，港/日/美/台全数失败。
- **付款前硬性提示** `[品牌资料 Vendor Claimed]`：特殊商品**不支持退款**；“约 8 元/月”为轻量版年付 `¥99/年` 折算口径，纯按月付费最低为极速版 **¥25/月（168GB）**。

## 2. 运营资料、线路技术与多协议现状

- **运营与客服** `[品牌资料 Vendor Claimed]`：2020 年上线（站内与星岛梦同属最早批次），标明 `7×24` 运维支持，不限设备数量，极速版明示 `全节点 ×1` 流量倍率与单节点最高 `2.5Gbps`。
- **线路口径差异** `[历史/文档冲突]`：原始文档分别出现过 `IEPL专线 + 企业级内网专线`、`IPLC 专线和隧道中转结合` 与 `全球IPLC`。结合 `2026-08-19` 珠海联通 `FullCone` 实测与三网后端延迟表现，其跨境主干具备专线特征，具体原理可参见 [IEPL 与 IPLC 专线解析](/network/iepl/)。
- **地区与节点规模**：覆盖 **12 个已知国家/地区**（`香港×20、台湾×5、日本×10、新加坡×10、美国×10、马来西亚×2`，及英、法、德、土、泰、巴）。实测批次分别录得 **62/62 节点**（SS）与 **70/70 节点**（60 Vless + 10 AnyTLS）。
- **协议实测核对（重要）**：品牌文案仅写 `VLESS`，但 `2026-08-11` 与 `2026-08-19` 测速图实显 **Shadowsocks**，70 节点流媒体批次元数据还包含 **AnyTLS**。对客户端而言多协议更抗封锁，但写分流规则时须留意节点名称中的协议后缀。

<NetworkTopology slug="guangsu" />

## 3. 套餐定价体系与不同月度负载成本测算

<PlanComparison slug="guangsu" />

- **优惠码边界** `[商业资料 Commercial]`：新人优惠码 **`AMM`**（具体折扣比例原文未明示），**致敬斯诺克 147 永久套餐**与**轻量版（¥99/年）**明确**不打折**；极速版与定制版标注支持半年 9 折 / 年付 8 折 / 两年 75 折 / 三年 7 折。
- **冲突提示**：《光速云官方套餐与线路参数档案》 第 8 行记轻量版为 `59GB/月`，同文件第 26 行及 《32家机场品牌公开资料与历史台账》 记为 `69GB/月`，下单前请以结算面板实时显示为准。

下表按三类典型月度流量消耗，严格区分 **年付折算**、**月付** 与 **一次性永久包按实际消耗月数分摊**（未计入折扣率未明的 `AMM` 优惠码）：

| 月度流量场景 | 最匹配光速云方案 | 计费类型 | 月均支出 | 实际消耗单 GB 成本 | 工程与成本洞察 |
| --- | --- | --- | --- | --- | --- |
| **50GB/月**（轻度文本 AI） | 轻量版（¥99/年 · 69GB/月） | 年付折算 | **¥8.25/月** | **¥0.165/GB**（满额 ¥0.120/GB） | 50GB 恰好落在 69GB（或 59GB）安全线内，余量用于订阅更新；不打折且需一次性年付 |
| **50GB/月**（低频备用对比） | 致敬斯诺克 147（¥147 · 247GB） | 一次性（约可用 4.94 个月） | **约 ¥29.76/月** | **¥0.595/GB** | 单月高频用不如月付极速版，真正价值在“放 1–2 年不过期防主梯失联” |
| **150GB/月**（日常办公 + 1080P） | 极速版（¥25/月 · 168GB/月） | 月付（常规首单试错） | **¥25.00/月** | **¥0.167/GB**（满额 ¥0.149/GB） | 168GB 覆盖 150GB 且留 18GB 缓冲；若跑通本地晚高峰后转极速版年付 8 折，可降至 **年付折算 ¥20.00/月**（实耗 ¥0.133/GB） |
| **300GB/月**（重度开发 + 4K） | 量子版（¥68/月 · 568GB/月） | 月付 | **¥68.00/月** | **¥0.227/GB**（满额 ¥0.120/GB） | **关键断层提示**：流光版（¥34/月）仅给 268GB，距 300GB 差 32GB；若每月稳定跑满 300GB，需直上量子版，或“极速版 ¥25 + 147 永久包按需补 32GB”组合 |

## 4. 客户端与路由分流工程指南（Mihomo / Clash 配置）

光速云支持第三方通用订阅导入（[Clash Verge Rev](/clients/clash-verge-rev/)、[FlClash](/clients/flclash/)、[Shadowrocket](/clients/shadowrocket/)、[OpenClash](/clients/openclash/)），这是它能精准规避 `2026-08-19` 实测中 **Gemini 仅新/马/土可用**、**香港 SS OpenAI 仅 APP(HK)**、**Vless 新/台 YouTube 送中** 以及 **德01/美02 异常掉速** 的关键。

以下为可直接参考调整的 **Mihomo / Clash 策略组与分流片段**（节点正则请按订阅实际命名微调）：

```yaml
proxy-groups:
  - name: "日常高速-港台日"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 180
    tolerance: 40
    include-all: true
    filter: "(?i)(香港|HK|日本|JP|台湾|TW)"
    exclude-filter: "(?i)(AnyTLS|倍率|剩余|到期)"

  - name: "OpenAI-主力组"
    type: url-test
    url: "https://chat.openai.com/favicon.ico"
    interval: 300
    tolerance: 60
    include-all: true
    filter: "(?i)(新加坡|SG|日本|JP|美国|US|台湾|TW)"
    exclude-filter: "(?i)(AnyTLS|美国02|US02)"

  - name: "Gemini-专用组"
    type: select
    include-all: true
    # 严格依据 2026-08-19 三网实测：仅 SG 01-10 / MY 01-02 / TR 01 解锁 Gemini
    filter: "(?i)(新加坡|SG|马来|MY|土耳其|TR)"
    exclude-filter: "(?i)(AnyTLS)"

  - name: "YouTube-防送中组"
    type: url-test
    url: "https://www.youtube.com/generate_204"
    interval: 300
    include-all: true
    # 避开 2026-08-19 Vless 测速中出现 CN 送中的 SG/TW 节点
    filter: "(?i)(香港|HK|日本|JP|美国|US)"
    exclude-filter: "(?i)(AnyTLS|美国02)"

rules:
  # Gemini 与 Google AI Studio 强制走新/马/土节点
  - DOMAIN-SUFFIX,gemini.google.com,Gemini-专用组
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,Gemini-专用组
  - DOMAIN-SUFFIX,aistudio.google.com,Gemini-专用组
  - DOMAIN-SUFFIX,bard.google.com,Gemini-专用组
  # OpenAI / ChatGPT 避开香港节点与 AnyTLS 节点
  - DOMAIN-SUFFIX,openai.com,OpenAI-主力组
  - DOMAIN-SUFFIX,chatgpt.com,OpenAI-主力组
  - DOMAIN-SUFFIX,oaistatic.com,OpenAI-主力组
  - DOMAIN-SUFFIX,oaiusercontent.com,OpenAI-主力组
  # YouTube 优先日/美/港，降低送中概率
  - DOMAIN-SUFFIX,youtube.com,YouTube-防送中组
  - DOMAIN-SUFFIX,googlevideo.com,YouTube-防送中组
  - MATCH,日常高速-港台日
```

> [!TIP]
> 新手若不习惯手写 YAML，也可先看 [光速云使用教程](/tutorials/guangsu/) 在官方自研客户端内一键切换新加坡节点使用 Gemini，确认无误后再迁移至 Mihomo 覆写规则。

## 5. 速度、延迟与晚高峰边界实测

<SpeedTestReport slug="guangsu" />

- **历史非晚高峰参考表** `[历史参考 Historical]`：品牌资料附带 `2026-10-19` 非晚高峰数值：香港 `22ms / 529Mbps`、台湾 `41ms / 114Mbps`、新加坡 `46ms / 387Mbps`、日本 `57ms / 135Mbps`、美国 `143ms / 18Mbps`（非本站可控实测）。
- **晚高峰稳定性判断**：现有 6 张实测截图分别测试于 `14:32`（午后）与 `12:13–12:20`（午间），均未覆盖 20:00–22:30 晚高峰黄金拥堵时段；因此本站不将午间满速直接等同于晚高峰零波动，购买前务必先购极速版月付（¥25）在本地宽带晚高峰实测一周。

## 6. AI 工具与流媒体解锁实测矩阵

<UnlockMatrix slug="guangsu" />

- **OpenAI / ChatGPT** `[实测证据 Measured]`：SS 62 节点测速中新加坡、美国、日本、台湾、马来西亚、土耳其解锁，**香港专线仅限 APP(HK)**；70 节点 Vless/AnyTLS 测速中 JP/SG/US/TW/HK 多数 Vless 解锁，10 个电信 AnyTLS 节点多呈 `N/A`。
- **Gemini** `[实测证据 Measured]`：仅 **新加坡 01–10、马来西亚 01–02、土耳其 01** 成功解锁；港、日、美、台、英、法、德、泰全部失败。
- **Claude / HBO Max / Spotify** `[品牌资料 Vendor Claimed]`：品牌资料宣称支持，但 2026-08-19 截图未设独立检测列，实际风控排查可参阅 [Claude 访问与防封指南](/ai/claude/)。
- **Netflix / Disney+ / YouTube / TikTok** `[实测证据 Measured]`：Netflix 与 Disney+ 主力节点大多正常（Vless 台湾节点识别为 GB）；YouTube 在 `12-18-40` Vless 测试中出现 SG/TW 送中；TikTok 仅美国与部分日/新/台/港节点解锁，约十余节点失败。

## 7. 一对一同级竞品替代决策矩阵

| 对比品牌 | 关键指标差（基于已核查档案） | 什么时候留在光速云 | 什么时候改选该竞品 | 深度入口 |
| --- | --- | --- | --- | --- |
| **星岛梦（XDM）** | 同为 2020 老牌 + IEPL + 1× 倍率 + 不限设备；光速云有 6 组三网/AI 实测图（评分 92），星岛梦仅 1 组 01:48 凌晨 SS 图（评分 70） | 重视三网实测透明度、需要 SG/MY/TR 解锁 Gemini，或预算在 `¥147/247GB` 永久包 | 需要 **韩国或东南亚** 节点、300GB 刚需（星岛梦 ¥50/300G vs 光速云流光仅 268G），或要 **¥600/1TB 永久包 / ¥130/1TB 月付** | [对比详情](/compare/guangsu-vs-xingdaomeng/) · [星岛梦评测](/reviews/xingdaomeng/) · [品牌卡](/brands/xingdaomeng/) |
| **暮光加速** | 光速云有协议（VLESS/SS/AnyTLS）、倍率、设备与支付全字段；暮光无实测图（评分 48）、无协议标注、无支付说明 | 需要可验证的测速与 AI 节点矩阵、明确 `1×` 流量倍率与 Clash 分流自由度 | 想以 **¥20/120GB** 试错（低于光速云 ¥25 月付门槛）或需要 **1500GB/月** 超大月付档 | [对比详情](/compare/guangsu-vs-muguang/) · [暮光评测](/reviews/muguang/) · [品牌卡](/brands/muguang/) |
| **飞猫云（FlyCat）** | 同为 ¥25 月付起步（光速云 168GB IEPL vs 飞猫云 150GB 非顶级专线）；飞猫云强绑专属 App 免配置 | 需要 **Clash/小火箭规则分流**、多协议容灾与 IEPL 专线高带宽 | 完全不想学订阅导入，只想装一个官方 App 登录即用，或预算锁死 **¥84/年（50GB）** 学生版 | [对比详情](/compare/guangsu-vs-feimao/) · [飞猫评测](/reviews/feimao/) · [品牌卡](/brands/feimao/) |

## 8. 风险、退款政策与客观不足

1. **特殊商品不支持退款**：资料明示特殊商品无退款机制，加上个别节点掉速与 AI 解锁分区，务必先买 **¥25 极速版月付** 验证，避免直接年付。
2. **多处文本口径差异**：轻量版 `59GB vs 69GB`、套餐档位 `4 档 vs 7 档`、协议标签 `VLESS vs SS/AnyTLS` 等冲突已在本页公开留存，购买前以官网实时结算页为准。

## 9. 常见问题（FAQ）

### 光速云真的只需 8 元一个月吗？

不是按月单买 8 元。“约 8 元/月”指的是轻量版年付 `¥99/年`（折合约 `¥8.25/月`，每月 69GB 或 59GB），需一次性付清一年。纯月付最低门槛是极速版 `¥25/月`（168GB/月，全节点 1 倍率）。

### 用光速云上 ChatGPT 和 Gemini 应该怎么分流？

根据 `2026-08-19` 三网 MiaoKo 实测：使用 Gemini 请在 Clash/Shadowrocket 中固定分流至 **新加坡 01–10、马来西亚 01–02 或土耳其 01**（港/日/美/台均失败）；使用 ChatGPT 可选新/日/美/台 Vless 或 SS 节点，避开香港节点（SS 测速仅支持 APP(HK)）及 10 个电信 AnyTLS 节点。

### 147 元致敬斯诺克永久套餐和 99 元轻量版能用优惠码 AMM 吗？

不能。品牌资料明确标注“致敬斯诺克 147 永久套餐”与“轻量版（¥99/年）”均不打折；新人优惠码 `AMM` 仅适用于支持的常规弹性套餐，具体折扣比例需在官网结算页核验。

### 现有实测能否证明光速云晚高峰完全不卡？

不能直接画等号。现有 6 张实测截图分别测试于午后 `14:32` 与午间 `12:13–12:20`，且 `2026-10-19` 参考表标注为“非晚高峰”；虽然三网午间带宽亮眼，仍建议先月付极速版（¥25）在本地 20:00–22:30 晚高峰连续测一周后再决定长续。

<BrandCta slug="guangsu" />
