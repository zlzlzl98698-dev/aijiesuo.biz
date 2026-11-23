---
title: "光年梯档案：18 元 IEPL 与 VLESS/SS 差异"
description: "光年梯（guangnian）档案：整理 2025 年品牌背景、18 元/110GB IEPL 规格、gnt6666 码、2026-08-11 实测 SS 冲突与缺口。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 光年梯
  - 18元机场
  - IEPL专线
  - 2025新品牌
keywords:
  - 光年梯
  - 光年梯 18元 110GB VLESS 档案
  - 光年梯机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-guangnian
intent: navigational
pillar: brands
related:
  - /reviews/guangnian/
  - /compare/jilian-vs-guangnian/
  - /pricing/monthly/
  - /risk/shutdown/
draft: false
---

# 光年梯（`guangnian`）品牌资料档案

**光年梯（`guangnian`）** 成立于 **2025 年**，定位“介于低价套餐和综合型专线套餐之间”，提供 **¥18/月（110GB/月）IEPL 专线**方案（商业顺位第 15，研究评分 **`50/100`**）。它与极连云同处 18 元价位带，优势在于流量多出 10GB 且同时提及 AI 与主流流媒体场景，但也存在 **VLESS 文本标注与实测 Shadowsocks 截图冲突**，以及完整套餐表、节点列表缺失等问题。

<BrandSnapshot slug="guangnian" />

## 一、注册入口、优惠码与客户端支持

- **官方注册入口**：统一通过下方 `<BrandCta />` 读取 `data/links.ts` 解析，附带 `nofollow sponsored noopener` 合规标注。
- **核心规格摘要** `[品牌资料 Vendor Claimed]`：2025 年运营、**IEPL 专线**、月付基础档 **`¥18/月（110GB/月）`**、**自研客户端 + 第三方订阅导入**。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`gnt6666`**（折扣力度与适用限制原文未标明）。

<BrandCta slug="guangnian" />

## 二、已知参考套餐、拓扑与解锁状态

目前仅记录 `¥18/月（110GB）` 基础月付档，其余周期与高阶档位尚待补充：

<PlanComparison slug="guangnian" />

<NetworkTopology slug="guangnian" />

<UnlockMatrix slug="guangnian" />

## 三、已知冲突与待核实清单

| 核查项目 | 冲突或缺失详情 | 当前状态 |
| --- | --- | --- |
| **协议标注 vs 实测冲突** | 品牌资料写明 **`VLESS` 协议**，但 `2026-08-11 14:38:04 CST` 实测截图实显 **`Shadowsocks`** | `以实测 Shadowsocks 与文案 VLESS 并记` |
| **完整套餐与节点明细缺失** | 缺少季/年付及大流量月付套餐表、节点国家/地区清单、设备上限、流量倍率与支付渠道 | `待核实` |
| **优惠码与长期稳定性** | `gnt6666` 折扣幅度未明；2025 年新成立品牌，长期稳定性仍需时间观察 | `待核实 / 观察期` |

### 待补充研究任务
- 登录光年梯官网后台补充完整多档套餐价格表、节点覆盖地区清单、设备限制、倍率与支付方式。
- 核实当前订阅节点究竟以 VLESS 为主还是 Shadowsocks 为主，以及优惠码 `gnt6666` 实际折扣。
- 补充晚高峰（20:00–22:30）复测及 ChatGPT / Claude / Gemini / Netflix 独立解锁检测。

## 四、相关内容入口

- **22 维独立评测**：[光年梯深度评测（与极连云对照分析）](/reviews/guangnian/)
- **同价位直接对比**：[极连云 vs 光年梯（18 元档 100GB vs 110GB 核查）](/compare/jilian-vs-guangnian/)
- **新品牌风险提示**：[新机场观察期与先月付避坑指南](/risk/buying-guide/)
