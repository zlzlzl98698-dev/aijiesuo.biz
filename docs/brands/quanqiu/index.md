---
title: "全球云档案：60+ 节点套餐矩阵与四重口径冲突核查"
description: "全球云（quanqiu）档案：整理 2026 年品牌背景、60+ 节点与 9 档套餐（含不限时与定制），并核查双码、客户端与线路冲突。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["全球云", "品牌档案", "Trojan", "Shadowsocks", "不限时流量包"]
keywords: ["全球云", "全球云 60+ 节点 Trojan SS 套餐档案", "全球云机场"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "raw-data/speedtest-manifest.json", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "quanqiu"
intent: "navigational"
pillar: "brands"
related: ["/reviews/quanqiu/", "/brands/sogo/", "/pricing/non-expiring/", "/network/iepl/"]
draft: false
---

# 全球云（quanqiu）品牌档案与数据冲突核查

全球云（`quanqiu`）在 本站品牌参数核验数据库 中商业顺位第 21 位，研究评分 `65 / 100`（资料完整度 22/30、协议与线路清晰度 11/20、实测证据可用性 15/25、套餐与定价弹性 13/15、风险与局限透明度 4/10）。它与 SOGO 云同为「2026 年新品牌」，以「全球 60+ 节点 + 2Gbps+ 带宽资源」以及含不限时包与定制线路在内的 9 档完整定价矩阵为主要卖点，但档案内部存在四处显著的口径冲突。

<BrandSnapshot slug="quanqiu" />

## 1. 运营资料与核心参数总表

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 成立年份 | 2026 年新品牌（仅见于汇总表标注） | `[品牌资料 Vendor Claimed]` |
| 品牌视觉 | 已收录专属 Logo（`/images/logos/全球云主图.png`） | `[已核实 Verified Asset]` |
| 线路宣称 | 核心特色写「IPLC/IEPL 专线中转」，套餐名全标「BGP 智能优化」 | `[品牌资料 Vendor Claimed]` / 冲突 |
| 协议口径 | Trojan / Shadowsocks；2026-08-11 实测图显示 `Shadowsocks` | `[实测证据 Measured]` / `[品牌资料 Vendor Claimed]` |
| 客户端模式 | 正文称「专属客户端，不提供订阅链接」；2026-08-11 实测用 MAI-TEST-BOT 测速 | `[品牌资料 Vendor Claimed]` / 冲突 |
| 节点规模 | 香港、台湾、新加坡、日本、美国等共 60+ 节点，宣称 2Gbps+ 带宽 | `[品牌资料 Vendor Claimed]` |
| 起步价格 | 轻量版年付 ¥99/年（约 ¥8.25/月，59GB/月）；基础月付 ¥20/月起 | `[品牌资料 Vendor Claimed]` / 冲突 |
| 优惠码 | `qq88`（8 折）与 `qqy7777`（折扣未明示），存在双码记录 | `[商业信息 Commercial]` |
| 设备/倍率/支付 | 设备连接上限、流量倍率与支付方式均未标注 | `[待核实 Pending Verification]` |

## 2. 套餐价格结构与单价分析

<PlanComparison slug="quanqiu" />

全球云共列出 9 档方案，横跨一次性不限时、年付轻量版、常规月付与高价定制专线：
- **不限时轻量 / 标准 / 大容量包**：¥100 / 100GB（¥1.00/GB）、¥360 / 400GB（¥0.90/GB）、¥700 / 800GB（¥0.875/GB），单价略高于月付但无过期时间限制。
- **年付轻量版**：¥99/年，每月 59GB（全年 708GB 约 **¥0.140/GB**），折合约 ¥8.25/月。
- **BGP 智能优化月付四档**：¥20/120GB（约 ¥0.167/GB）至 ¥180/1500GB（¥0.120/GB）。
- **独享私人专线节点**：¥680/月（500GB/月），面向定制化独占带宽场景。

## 3. 节点规模、测速快照与解锁声明

<NetworkTopology slug="quanqiu" />

<UnlockMatrix slug="quanqiu" />

- **测速证据**：保留有 `2026-08-11 15:50:43 CST` 下午测速截图（`全球云-节点测速实测.png`，`MAI-TEST-BOT 2.0.0-dev`，协议实显 `Shadowsocks`），以及 2026-10-19 品牌资料附带的非晚高峰参考测速（香港 25ms / 489Mbps、台湾 37ms / 117Mbps、新加坡 45ms / 430Mbps、日本 55ms / 133Mbps、美国 138ms / 18Mbps）。
- **AI 与流媒体**：品牌资料声明支持 ChatGPT、Claude、Netflix、Disney+、YouTube、HBO Max、TikTok、Spotify，而 Gemini 标注为「视节点而定」，目前全部缺乏独立解锁实测。

## 4. 四项已记录口径冲突

1. **优惠码双码冲突**：正文基础信息第 699 行写 `qq88`（8 折），而第 941 行完整数据表写 `qqy7777`（未标折扣）。
2. **起步价口径冲突**：基础信息标注「¥20/月起」，但套餐表存在更低的「轻量版年付 ¥99/年」（59GB/月，折约 ¥8.25/月）。
3. **线路命名混用**：核心特色宣称 `IPLC/IEPL 专线中转`，但套餐表中全部常规方案名称却统一写作 `BGP 智能优化`。
4. **客户端锁定 vs 测速工具矛盾**：正文反复强调不提供订阅链接、仅专属客户端下载登录即用，但 2026-08-11 测速使用的是读取通用节点订阅的 `MAI-TEST-BOT`。

## 5. 官方入口与延伸阅读

- **深度评测报告**：[全球云深度评测：60+ 节点宣传与四重口径冲突解析](/reviews/quanqiu/)
- **关联页面**：[SOGO 云档案](/brands/sogo/) · [不限时流量包汇总](/pricing/non-expiring/) · [机场风险与合规边界](/risk/buying-guide/)

> **待补充研究任务**：核实 `qq88` 与 `qqy7777` 的当前有效性；确认是否提供第三方订阅链接以及「BGP 智能优化」背后真实的专线比例；开展独立 AI/流媒体节点测验与设备数上限核查。
