---
title: "闪电鼠机场评测：5.6 元档对比与待测缺口"
description: "闪电鼠机场评测：评估年付约 5.6 元/月 IEPL+VLESS 方案已知优势、与大佬云/云界线等四家同档差异、零实测风险及待补清单。"
date: "2026-11-23"
updated: "2026-11-23"
category: "深度评测"
tags: ["闪电鼠机场评测", "5.6元机场", "便宜机场", "VLESS", "大佬云对比"]
keywords: ["闪电鼠机场评测", "闪电鼠极限平价档差异与待测说明", "闪电鼠机场好用吗"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "shandianshu"
intent: "commercial"
pillar: "brands"
related: ["/brands/shandianshu/", "/reviews/dalaoyun/", "/reviews/yunjiexian/", "/pricing/cheap/", "/risk/buying-guide/"]
draft: false
---

# 闪电鼠深度评测：5.6 元平价档中的「规范参数样本」，但仍零实测

## 核心结论

- **已知事实**：闪电鼠（`shandianshu`）是 2024 年起运营的平价品牌，标称 `IEPL 专线` + `VLESS` 协议，支持自研客户端与第三方订阅，年付折算约 **¥5.6/月（60GB/月）**，优惠码 `sd88` 与季付及以上 7 折说明存在 `[品牌资料 Vendor Claimed]`。
- **在 5.6 元档中的相对位置**：与规格几乎复制粘贴的 [大佬云](/reviews/dalaoyun/) 齐平（研究评分同为 `35 / 100`），且没有 [云界线](/reviews/yunjiexian/)、[环球梯](/reviews/huanqiuti/) 的链接格式异常，也不像 [榴莲云](/reviews/liulianyun/) 那样协议未明。
- **最大缺口**：`measuredEvidence: 0 / 25`——**无测速图、无节点清单、无完整多档月付价格表、无 AI/流媒体验证**。按本站评测标准，目前仅能作为「低门槛待核查备选」，不能给出稳定性或解锁结论。

<BrandSnapshot slug="shandianshu" />

---

## 一、运营资料与定位拆解

在 《32家机场品牌公开资料与历史台账》 中，闪电鼠与大佬云、云界线、榴莲云、环球梯（以及同系的 14 元档神行加速）共享高度相似的基础模板：2024 年运营、IEPL 专线、自研客户端 + 第三方订阅导入、季付及以上 7 折。如果折算 ¥5.6/月（60GB/月），单 GB 成本约 **¥0.093/GB**，属于收录库中价格门槛最低的梯队（详见 [便宜机场专题](/pricing/cheap/)）。

---

## 二、5.6 元档五家横向对比（闪电鼠 vs 大佬云等）

| 对比维度 | 闪电鼠 (`shandianshu`) | 大佬云 (`dalaoyun`) | 云界线 (`yunjiexian`) | 榴莲云 (`liulianyun`) | 环球梯 (`huanqiuti`) |
|---|---|---|---|---|---|
| 研究评分 | **35 / 100** | **35 / 100** | 31 / 100 | 28 / 100 | 32 / 100 |
| 协议明确度 | VLESS（明确） | VLESS（明确） | VLESS（明确） | **未统一提供** | VLESS（明确） |
| 推广链接格式 | 正常 (`active`) | 正常 (`active`) | **异常（缺 `#` + 双邀请参数冲突）** | **异常（缺 `/`）** | **异常（缺 `#`）** |
| 优惠码 | `sd88` | `dly888` | `yjx888` | `ll88` | `HQ66` |
| 已知年付折算 | 约 ¥5.6/月 (60GB) | 约 ¥5.6/月 (60GB) | 约 ¥5.6/月 (60GB) | 约 ¥5.6/月 (60GB) | 约 ¥5.6/月 (60GB) |
| 独立测速 / 解锁 | 无 / 未测 | 无 / 未测 | 无 / 未测 | 无 / 未测 | 无 / 未测 |

**横向结论**：如果用户单纯想从这 5 家 5.6 元同质化品牌中挑一家进入官网核实套餐，闪电鼠和 [大佬云](/reviews/dalaoyun/) 是唯二同时满足「协议明确（VLESS）+ 推广链接格式正常」的选项。

---

## 三、线路技术、协议、节点与客户端

<NetworkTopology slug="shandianshu" />

<PlanComparison slug="shandianshu" />

1. **线路与协议**：标称 `IEPL 专线` 与 `VLESS` `[品牌资料 Vendor Claimed]`。VLESS 协议在主流现代内核（Xray、Mihomo、sing-box）中均有成熟支持，兼容性良好。
2. **客户端支持**：支持自研客户端与第三方订阅导入，意味着你可以用 [Clash Verge Rev](/clients/clash-verge-rev/)、[v2rayNG](/clients/v2rayng/) 或 [Shadowrocket](/clients/shadowrocket/) 管理节点，不被单一客户端锁死。
3. **节点与流量计算缺口**：节点地区清单、节点数量、设备连接上限、流量倍率（是否 1x 扣费）均处于 `[待核实 Pending Verification]` 状态。

---

## 四、速度、晚高峰、AI 与流媒体支持现状

<SpeedTestReport slug="shandianshu" />

<UnlockMatrix slug="shandianshu" />

- **测速与晚高峰稳定性**：无 `2026-08-11` 实测截图，也无品牌方附带的参考测速表，晚高峰带宽表现完全 `[待核实 Pending Verification]`。
- **AI 与流媒体**：品牌资料未提及 ChatGPT、Claude、Gemini 或 Netflix 等解锁情况，严格标记为 `untested`。千万不要默认 5.6 元档 IEPL 就能解锁非香港区域的 AI 服务。

---

## 五、价格核算、风险与购买建议

1. **折扣叠加未明**：资料同时列出优惠码 `sd88` 和「季付及以上 7 折」，但未明确年付折算 ¥5.6/月是否已经计入 7 折、还是可在此基础上二次折抵，需进官网确认原价表。
2. **低价年付风控**：按照 [理性购买与避坑指南](/risk/buying-guide/)，极低价套餐若未提供月付验证通道、且无公开测速与退款条款，直接年付面临「线路超售拥堵」或「小站停运」风险。
3. **适用与购买建议**：仅建议将其定位为「极低预算下的待验证备选」。打开官网后，**先核实是否支持月付或季付试错、查看节点国家列表与流量倍率**，确认满足需求后再考虑年付。

---

## 六、数据来源与待补充研究任务

- **数据来源**：《32家机场品牌公开资料与历史台账》、本站品牌参数核验数据库（推广链接核实日期：`2026-10-19`）。
- **待补充研究任务（Research Backlog）**：
  1. 抓取并核实闪电鼠官网完整套餐表（月付/季付/年付原价及 `sd88` 结算逻辑）。
  2. 核实实际节点地区清单、是否包含美/日/新非香港落地及设备数上限。
  3. 使用统一测速与解锁脚本采集单日及晚高峰测速截图，并完成 ChatGPT / Claude / Netflix 基础检测。

<BrandCta slug="shandianshu" />
