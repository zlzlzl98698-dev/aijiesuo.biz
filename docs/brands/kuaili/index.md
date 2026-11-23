---
title: "快狸机场档案：VLESS 实测孤本与商业字段待核实"
description: "快狸机场（kuaili）档案：仅收录于 2026-08-11 实测资料包与 Logo 库的 VLESS 实体，套餐、官网入口与解锁字段均标为待核实。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["快狸机场", "品牌档案", "VLESS实测", "2026-08-11测速", "待核实"]
keywords: ["快狸机场", "快狸机场档案与待补充套餐信息", "kuaili"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/speedtest-manifest.json", "raw-data/README_16个机场测速实测资料_最新版.txt", "data/brands.json"]
verifiedAt: "2026-08-11"
entity: "kuaili"
intent: "navigational"
pillar: "brands"
related: ["/reviews/kuaili/", "/brands/yuzhou/", "/reviews/", "/brands/"]
draft: false
---

# 快狸（kuaili）品牌档案：纯实测孤本实体与待核实清单

快狸（`kuaili`）在 本站品牌参数核验数据库 中商业顺位第 32 位，研究评分 `35 / 100`（资料完整度 5/30、协议与线路清晰度 10/20、实测证据可用性 15/25、套餐与定价弹性 0/15、风险与局限透明度 5/10）。它在全部 32 家品牌中具有独一无二的档案形态：**未收录于 《32家机场品牌公开资料与历史台账》 商业清单**，仅存在于 `2026-08-11` 节点测速实测资料包与品牌 Logo 库中。

<BrandSnapshot slug="kuaili" />

## 1. 已核实证据 vs 全商业字段待核实表

本站严禁编造任何未见于原始档案的售价、套餐或推广入口，因此快狸的全部商业字段均如实留空或标注 `待核实`：

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 实测截图资产 | `/images/speedtests/2026-08-11/快狸-节点测速实测.png`（`1122 × 1402 px`） | `[实测证据 Measured]` |
| 测试时间与工具 | `2026-08-11 19:52:22 CST`（晚间），主端 `4.3.3 (696)` / 喵速 `4.7.0 (A11-32)` | `[实测证据 Measured]` |
| 图中实显协议 | `VLESS` | `[实测证据 Measured]` |
| 品牌视觉资产 | `/images/logos/kuaili_logo.png` | `[已核实 Verified Asset]` |
| 官网与推广入口 | 未收录（`affiliate.linkStatus: unavailable`，无商业推广链接） | `[待核实 Pending Verification]` |
| 开业年份与线路类型 | 未知（`foundedYear: null`，`lineTypes: []`） | `[待核实 Pending Verification]` |
| 套餐价格与优惠码 | 暂无套餐与价格资料，无优惠码记录（`plans: []`） | `[待核实 Pending Verification]` |
| 设备数、倍率与支付 | 设备限制：待核实；流量倍率：待核实；支付方式：未收录 | `[待核实 Pending Verification]` |
| 节点列表与客户端说明 | 官网及客户端支持资料未收录（仅知测试时使用 9Gbps/miaosu 界面测得 VLESS 节点） | `[待核实 Pending Verification]` |

## 2. 套餐、网络与解锁组件视图

<PlanComparison slug="kuaili" />

<NetworkTopology slug="kuaili" />

<UnlockMatrix slug="kuaili" />

## 3. 延伸阅读与待补充研究任务

- **深度评测**：[快狸深度评测：2026-08-11 晚间 VLESS 实测记录与资料缺口说明](/reviews/kuaili/)
- **同界面测速对照**：[宇宙云档案](/brands/yuzhou/)（同批次使用 `main 4.3.3 (696) / miaosu 4.7.0` 界面的 VLESS 实测品牌） · [实测评测汇总](/reviews/)

## 4. 待补充研究任务（Research Backlog）

1. 核实快狸的官方网站地址、运营主体与开业年份。
2. 补采完整套餐价目表（月付/年付/流量配额）、设备在线限制、流量倍率及支持的支付方式。
3. 核实客户端兼容性（是否提供第三方通用订阅还是专属客户端）与线路架构（IEPL/IPLC 还是公网中转）。
4. 在明确官网并复核当前运营状态后，开展独立的 ChatGPT / Claude / Gemini 及主流流媒体解锁测验。
