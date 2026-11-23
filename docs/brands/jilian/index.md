---
title: "极连云档案：18 元 IEPL、实测与缺口清单"
description: "极连云（jilian）档案：汇总 2024 年运营资料、18 元/100GB IEPL 专线、双端支持、ji8888 优惠码，并列出套餐与节点缺口。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 极连云
  - 18元机场
  - IEPL专线
  - AI工具场景
keywords:
  - 极连云
  - 极连云 18元 100GB IEPL 档案
  - 极连云机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-jilian
intent: navigational
pillar: brands
related:
  - /reviews/jilian/
  - /compare/jilian-vs-guangnian/
  - /pricing/monthly/
  - /risk/buying-guide/
draft: false
---

# 极连云（`jilian`）品牌资料档案

**极连云（`jilian`）** 运营于 **2024 年**，定位为 **18 元/月（100GB）IEPL 专线** 方案（商业顺位第 14，研究评分 **`50/100`**）。它虽然在原始清单中只保留了精简文本摘要、缺乏完整多档套餐表与节点国家明细，但拥有一张拍摄于 **`2026-08-11 22:46:50 CST`（晚间时段）** 的实测节点截图，且明确标注同时支持自研客户端与第三方通用客户端。

<BrandSnapshot slug="jilian" />

## 一、基础入口、优惠码与已确认规格

- **官方注册入口**：统一通过下方 `<BrandCta />` 由 `data/links.ts` 解析，附带 `nofollow sponsored noopener` 合规披露。
- **已确认核心规格** `[品牌资料 Vendor Claimed]`：2024 年运营、**IEPL 专线**、月付基础档 **`¥18/月（100GB/月）`**、支持**自研客户端 + 第三方客户端**、文案明确称“覆盖常见 AI 工具使用场景”。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`ji8888`**（具体折扣比例与适用限制未在原文标明）。
- **协议实测补充** `[实测证据 Measured]`：品牌文字未写明具体协议；`2026-08-11 22:46:50 CST` 实测截图显示其节点采用 **`Shadowsocks`** 协议。

<BrandCta slug="jilian" />

## 二、已知参考套餐、拓扑与解锁状态

极连云在原文中没有给出其他计费周期（季付/年付/不限时）与更高流量档位价格表，当前仅确认 `¥18/月（100GB）` 基础月付档：

<PlanComparison slug="jilian" />

<NetworkTopology slug="jilian" />

<UnlockMatrix slug="jilian" />

## 三、数据缺口与待核实清单

| 核查项目 | 缺失或差异详情 | 当前状态 |
| --- | --- | --- |
| **完整套餐价格表** | 缺少年付、季付、不限时流量包及 200GB 以上高阶月付价格 | `待核实` |
| **节点地区与数量** | 未列出覆盖香港/台湾/日本/新加坡/美国等具体地区及节点数目 | `待核实` |
| **设备限制与流量倍率** | 未注明同时在线设备数上限、节点倍率（是否 1×）与支付方式 | `待核实` |
| **协议与 AI/流媒体边界** | 协议靠实测图补确认为 Shadowsocks；“覆盖常见 AI 场景”未分平台说明，流媒体支持完全未提及，且均无独立解锁测试图 | `待核实 / 未实测` |

### 待补充研究任务
- 注册登录极连云官网面板，补充完整多档套餐价格表、节点地区列表、设备并发上限、流量倍率与支付渠道。
- 核实优惠码 `ji8888` 的实际折扣幅度及使用限制。
- 补充 ChatGPT / Claude / Gemini 与主流流媒体的独立节点解锁测试。

## 四、相关内部链接

- **22 维独立评测**：[极连云深度评测（含 22:46 晚间实测分析）](/reviews/jilian/)
- **18 元同价位正面对照**：[极连云 vs 光年梯（100GB vs 110GB 详细对比）](/compare/jilian-vs-guangnian/)
- **月付试错筛选**：[按月付费机场套餐专题](/pricing/monthly/)
