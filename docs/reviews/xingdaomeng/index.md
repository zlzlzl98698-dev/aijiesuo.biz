---
title: 星岛梦评测：2020老牌IEPL与1TB永久包核查
description: 星岛梦(XDM)评测：拆解2020老牌1倍流量不限设备机制、1TB永久包及各负载月成本、2026-08-11凌晨SS实测与Trojan协议差异。
date: 2026-11-23
updated: 2026-11-23
category: reviews
tags:
  - 星岛梦评测
  - 星岛梦测速
  - 2020老牌机场
  - 1TB不限时套餐
keywords:
  - 星岛梦评测
  - 星岛梦 2026-08-11 测速与流媒体解锁表现
  - 星岛梦好用吗
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: review-xingdaomeng
intent: commercial
pillar: brands
related:
  - /brands/xingdaomeng/
  - /compare/guangsu-vs-xingdaomeng/
  - /pricing/non-expiring/
  - /network/traffic-multiplier/
draft: false
---

# 星岛梦（XDM）深度评测：老牌 1 倍流量方案、韩国东南亚覆盖与 1TB 永久包拆解

在 2020 年开业的老牌 IEPL 机场里，**星岛梦（`xingdaomeng`，缩写 XDM）** 是少数能与光速云在**运营年限（6 年老牌）**、**1 倍流量**、**不限设备数量**以及**永久不限时套餐**四个硬指标上正面对照的品牌，研究评分 **`70/100`**。它独有的吸引力在于把节点延伸至**韩国与东南亚**、且给出 **¥600/1TB 永久包与 ¥130/1TB 月付**；但评测也必须点明两处硬边界：一是文案写 Trojan 而实测图显示 Shadowsocks，二是唯一入库测速拍于凌晨 01:48。

<BrandSnapshot slug="xingdaomeng" />

## 1. 核心判断（结构优势与实测边界）

- **老牌透明底盘** `[品牌资料 Vendor Claimed]`：2020 年上线，海外技术团队与多人客服运维；明确承诺 **IEPL 专线**、**1 倍流量（无高倍率暗扣）** 与 **不限设备同时在线**，且支持第三方通用订阅。
- **地区与大容量定价亮眼** `[品牌资料 Vendor Claimed]`：除常规港/台/日/新/美外，明确覆盖 **韩国及东南亚**，适合东亚跨境电商或日韩游戏/社媒分流；旗舰 1T 月付（`¥130/1000GB`）与永久不限时 1TB（`¥600/1000GB`）单价具备明显规模优势。
- **凌晨实测与协议差异提示** `[实测证据 Measured]`：`2026-08-11` 原始截图测试时间为 **`01:48:13 CST`**（凌晨空闲时段），协议实显 **`Shadowsocks`**（与介绍说明里的 `Trojan` 不一致），且未附带 AI 或流媒体检测列。
- **待补充字段**：支付渠道（支付宝/微信/USDT）、总节点数量与优惠码 `nmw888` 折扣幅度原文均未明示。

## 2. 运营资料、地区覆盖与 Trojan/SS 协议核对

- **7 大已知覆盖区域**：香港、台湾、日本、美国、新加坡、**韩国、东南亚**（具体单区节点数未公开）。在 20–25 元主推梯队中，韩国与东南亚并非标配，这是星岛梦区别于唯兔云、微风、一翻云（仅 5 区）的结构化差异。
- **Trojan vs Shadowsocks 协议核查**：品牌介绍第 218 行写“Trojan 协议”，但 `2026-08-11` `MAI-TEST-BOT` 拉取到的节点显示为 **`Shadowsocks`**。在实际工程中，主流客户端（Mihomo / Clash Verge Rev / Shadowrocket）均原生兼容这两种协议；不过如果您有特定网络环境对某类加密特征敏感，建议购入 ¥25 月付后先检查订阅节点列表中的真实协议分布。

<NetworkTopology slug="xingdaomeng" />

## 3. 9 档套餐定价结构与月度负载成本测算

<PlanComparison slug="xingdaomeng" />

- **倍率与优惠码**：明确标明 **1 倍流量**（详见 [流量倍率规则解析](/network/traffic-multiplier/)）；优惠码 **`nmw888`** 折扣比例未公布，下文成本表均按原价严密测算。

下表针对三类典型月度流量消耗，严格区分 **年付折算**、**月付** 与 **一次性永久包分摊**：

| 月度流量场景 | 最匹配星岛梦方案 | 计费类型 | 月均支出 | 实际消耗单 GB 成本 | 成本梯度与断层分析 |
| --- | --- | --- | --- | --- | --- |
| **50GB/月**（轻度文本 AI） | 贴心小包（¥96/年 · 60GB/月） | 年付折算 | **¥8.00/月** | **¥0.160/GB**（满额 ¥0.133/GB） | 年付折算 ¥8/月，含 10GB 缓冲；相比光速云轻量版 ¥99/年便宜 ¥3/年 |
| **50GB/月**（低频备份对比） | 永久不限时 1TB（¥600 · 1000GB） | 一次性（可用 20 个月） | **¥30.00/月** | **¥0.600/GB** | **反常识发现**：永久 100G（¥100）和永久 300G（¥300）单价高达 ¥1.00/GB，唯独 **1TB 永久包单价压到 ¥0.60/GB**，适合多设备长周期冷备 |
| **150GB/月**（日常办公 + 1080P） | 超量 150G（¥25/月 · 150GB/月） | 月付 | **¥25.00/月** | **¥0.167/GB** | 150GB 刚好踩线，零冗余；同价位比光速云极速版（168GB）少 18GB，但明确写全站 1× 且含韩/东南亚 |
| **300GB/月**（重度开发 + 4K） | 进阶 300G（¥50/月 · 300GB/月） | 月付 | **¥50.00/月** | **¥0.167/GB** | **无阶梯折扣**：300G 档单价依然是 ¥0.167/GB，未给规模让利；若每月会超 300GB，直接看闪光 500G（¥70/月，满额 ¥0.140/GB）或旗舰 1T（¥130/月，¥0.130/GB）更合理 |

## 4. 客户端与路由分流工程指南（Mihomo / Clash 配置）

星岛梦支持第三方通用客户端（[Clash Verge Rev](/clients/clash-verge-rev/)、[FlClash](/clients/flclash/)、[Shadowrocket](/clients/shadowrocket/)、[OpenClash](/clients/openclash/)），且由于明确 **1 倍流量** 与 **韩国/东南亚覆盖**，在 Mihomo 中非常值得把 **韩/东南亚跨境与游戏业务**、**新加坡/日本/美国 AI 分流** 与 **香港高速日常** 拆成三条独立链路：

```yaml
proxy-groups:
  - name: "星岛梦-港台高速"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 180
    tolerance: 40
    include-all: true
    filter: "(?i)(香港|HK|台湾|TW)"

  - name: "星岛梦-韩东南亚专线"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 240
    tolerance: 60
    include-all: true
    # 针对星岛梦独有的韩国及东南亚节点池，用于韩区服务/跨境电商/亚服联机
    filter: "(?i)(韩国|KR|马来|MY|泰国|TH|越南|VN|印尼|ID|菲律宾|PH|新加坡|SG)"

  - name: "星岛梦-AI工具(新日美)"
    type: select
    include-all: true
    # 依据文档“Gemini视节点而定”，AI工具避开香港，优先新/日/美节点手动或url-test锁定
    filter: "(?i)(新加坡|SG|日本|JP|美国|US)"

rules:
  - DOMAIN-SUFFIX,openai.com,星岛梦-AI工具(新日美)
  - DOMAIN-SUFFIX,chatgpt.com,星岛梦-AI工具(新日美)
  - DOMAIN-SUFFIX,claude.ai,星岛梦-AI工具(新日美)
  - DOMAIN-SUFFIX,gemini.google.com,星岛梦-AI工具(新日美)
  - DOMAIN-SUFFIX,naver.com,星岛梦-韩东南亚专线
  - DOMAIN-SUFFIX,coupang.com,星岛梦-韩东南亚专线
  - DOMAIN-SUFFIX,shopee.com,星岛梦-韩东南亚专线
  - MATCH,星岛梦-港台高速
```

> [!TIP]
> 若需要在多台手机、电脑和 OpenWrt 路由器上同时接入，星岛梦的 **不限设备 + 1× 倍率** 特性非常适合家庭网关场景；软路由部署方法可参考 [OpenWrt 透明代理方案](/clients/openwrt/)。

## 5. 速度、延迟与凌晨 01:48 实测边界

<SpeedTestReport slug="xingdaomeng" />

<UnlockMatrix slug="xingdaomeng" />

- **凌晨时段局限** `[实测证据 Measured]`：`2026-08-11` 的 `MAI-TEST-BOT` 截图摄于 **`01:48:13 CST`**，属于跨境网络负载最低的凌晨档位，仅能证明该节点包在深夜可用与 SS 协议连通性，**无法推导出 20:00–22:30 晚高峰不丢包**。
- **厂商非晚高峰参考** `[历史参考 Vendor Benchmark]`：`2026-10-19` 参考表数值为香港 `27ms / 504Mbps`、台湾 `41ms / 103Mbps`、新加坡 `44ms / 411Mbps`、日本 `57ms / 136Mbps`、美国 `177ms / 18Mbps`（非本站实测）。
- **AI 与流媒体状态**：资料声明支持 ChatGPT、Claude、Netflix、Disney+、YouTube、HBO Max、TikTok 与 Spotify，但对 Gemini 存在前后写法细微差异（核心特色称“兼容 ChatGPT、Gemini”，解锁列表标“Gemini 视节点而定”）。因缺乏独立解锁截图，全项记为 `vendor_claimed / conditional`。

## 6. 一对一同级竞品替代决策矩阵

| 对比品牌 | 关键指标差（基于已核查档案） | 什么时候留在星岛梦 | 什么时候改选该竞品 | 深度入口 |
| --- | --- | --- | --- | --- |
| **光速云** | 同为 2020 老牌 + IEPL + 1× + 不限设备；光速云有 6 组三网/AI 实测图（评分 92），星岛梦仅 1 组 01:48 凌晨图（评分 70） | 需要 **韩国/东南亚节点**、**¥600/1TB 永久包** 或 **¥130/1TB 月付**（比光速云 ¥138/900G 更便宜且多 100G） | 重视三网与 Gemini 分节点实测透明度、或需要 **¥147/247GB** 低门槛永久包与 **¥34/268GB** 中档月付 | [对比详情](/compare/guangsu-vs-xingdaomeng/) · [光速云评测](/reviews/guangsu/) · [品牌卡](/brands/guangsu/) |
| **唯兔云（V2云）** | 同为 **Trojan/SS 协议冲突 + 1× 倍率 + 不限设备 + 多档永久包**；唯兔云常规月付 ¥19.9/150G、永久 500G ¥340（评分 69） | 需要 **2020 年 6 年老牌资历**、**韩国/东南亚地区** 或 **1TB 级别大容量月付/永久包** | 预算聚焦在 **150G（¥19.9 vs ¥25）** 或 **500G（¥59.9 vs ¥70 / 永久 ¥340）**，且只需港/台/新/日/美 5 区 | [唯兔云评测](/reviews/weitu/) · [品牌卡](/brands/weitu/) |
| **一翻云** | 同为 IEPL + 不限设备 + 通用订阅；一翻云月付 ¥20/150G、¥35/350G 且支持 **Hy2/VLESS-Reality/SS** 三协议（评分 72） | 优先信任 **2020 老牌资历**（一翻云 2025 年上线），或需要韩国/东南亚与 1TB 永久包 | 追求极致的 **300–350GB 月付性价比（¥35 vs ¥50）**，或本地移动/校园网环境急需 Hy2/Reality 协议 | [一翻云评测](/reviews/yifan/) · [品牌卡](/brands/yifan/) |

## 7. 常见问题（FAQ）

### 星岛梦到底支持 Trojan 还是 Shadowsocks？

品牌介绍文档注明 Trojan 协议，而 `2026-08-11 01:48:13 CST` 的 `MAI-TEST-BOT` 实测截图实显 Shadowsocks。对日常使用而言，Clash Verge Rev、FlClash 和 Shadowrocket 均可同时兼容两种协议；如需确认当前节点协议比例，建议先购买一个月 `超量150G（¥25）` 查看订阅内容。

### 星岛梦的三个永久不限时包怎么选最划算？

按单 GB 成本计算差距非常悬殊：`永久不限时 100（¥100/100GB）` 与 `永久不限时 300（¥300/300GB）` 均折合 **¥1.000/GB**；唯有 `永久不限时 1TB（¥600/1000GB）` 降至 **¥0.600/GB**。如果只是轻度备用，¥147/247GB（光速云）或 ¥100 起步体验更灵活；只有明确要长期囤积 1TB 备用流量时，星岛梦 ¥600 档才最有性价比。

### 星岛梦支持支付方式有哪些、能退款吗？

原始资料尚未列明具体的支付方式（支付宝/微信/USDT 待核实），也未给出明确无条件退款承诺。根据机场行业惯例（参考 [机场退款边界说明](/risk/refunds/)），虚拟流量产品下单后默认不易退款，务必先月付 ¥25 实测本地晚高峰。

## 8. 待补充研究任务

- [ ] 核实星岛梦当前订阅内 Trojan 与 Shadowsocks 节点的实际占比。
- [ ] 核实优惠码 `nmw888` 具体折扣率与适用套餐范围，以及支持的支付渠道。
- [ ] 在晚高峰 20:00–22:30 补充三网速度实测，并完成 ChatGPT / Gemini / Claude / Netflix 独立解锁检测。

## 9. 购买建议

- **建议操作**：先花 **¥25 购买一个月「超量150G」**（结算页尝试填写 `nmw888`），在晚高峰验证本地宽带吞吐、实际协议与韩国/东南亚/AI 解锁可用性；确认满意后，低用量用户可转 **¥96/年贴心小包**，长期多设备防失联冷备或大流量用户再考虑 **¥600/1TB 永久包** 或 **¥130/1TB 月付**。

<BrandCta slug="xingdaomeng" />
