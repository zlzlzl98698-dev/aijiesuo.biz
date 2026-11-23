---
title: "U1S1 机场档案：IPLC 方案与 5 档套餐"
description: "U1S1 品牌档案：汇总 2025 年上线背景、IPLC 专线与 2000Mbps 宣称、5 档套餐、akaka 优惠码及 1000GB 包缺失冲突。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - U1S1机场
  - IPLC专线
  - 新机场观察
  - Shadowsocks
keywords:
  - U1S1 机场
  - U1S1 IPLC 套餐表与优惠码 akaka
  - U1S1机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-u1s1
intent: navigational
pillar: brands
related:
  - /reviews/u1s1/
  - /network/iplc/
  - /risk/buying-guide/
  - /risk/shutdown/
draft: false
---

# U1S1（`u1s1`）品牌资料档案

**U1S1（`u1s1`）** 于 **2025 年** 上线运营，定位为 IPLC 专线机场（商业顺位第 12，研究评分 **`61/100`**）。品牌资料中以“**官方宣称 2000Mbps 高速带宽、晚高峰不限速、不限设备同时连接**”为主要宣传口径，并且拥有 `2026-08-11 22:33:29 CST` 晚间实测截图。但由于运营时间较短，且文本介绍里提及的“1000GB 一次性大流量包”并未出现在价格表中，本档案将已入表套餐与待核实缺口分开呈现。

<BrandSnapshot slug="u1s1" />

## 一、注册入口、优惠码与技术特征

- **官方注册入口**：统一通过下方 `<BrandCta />` 由 `data/links.ts` 解析，附带 `nofollow sponsored noopener` 合规标注。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`akaka`**；原始资料未明示具体折扣力度，介绍说明亦提示“官方公开的优惠信息比较有限”。
- **客户端与协议** `[实测补充 + 品牌资料]`：原文未写明协议名称与专属客户端限制；`2026-08-11 22:33:29 CST` 的 `MAI-TEST-BOT` 实测截图显示其测试节点协议为 **`Shadowsocks`**。

<BrandCta slug="u1s1" />

## 二、5 档已记录套餐结构（从 ¥96/年 到 ¥180/1500GB）

U1S1 套餐命名偏口语化，涵盖 1 档年付（就是好用包 ¥96/年 60GB/月）与 4 档月付（120GB–1500GB/月）：

<PlanComparison slug="u1s1" />

## 三、线路架构与能力边界

<NetworkTopology slug="u1s1" />

<UnlockMatrix slug="u1s1" />

## 四、已知冲突与待核实清单

| 核查项目 | 具体差异或缺失描述 | 当前状态 |
| --- | --- | --- |
| **1000GB 一次性包未入表** | 第 438 行介绍说明提到“还有 1000GB 的一次性大流量包”，但第 418–423 行价格表中只有年付 + 4 档月付，**无该一次性套餐报价** | `待核实` |
| **协议文本缺失** | 品牌资料未写明代理协议；仅从 `2026-08-11` 测速截图确认测试了 `Shadowsocks` | `实测补充` |
| **带宽宣称未量化复测** | 官方宣称“2000Mbps 带宽”与“晚高峰不限速”，属单方宣传口径 | `待核实`（不可视为实测承诺） |
| **缺失基础参数** | 优惠码 `akaka` 折扣率、节点总数、流量倍率（是否 1×）、支付渠道与客服方式均未写明 | `待核实` |

### 待补充研究任务
- 核实官网后台当前是否在售 `1000GB 一次性流量包` 及其准确标价。
- 核实优惠码 `akaka` 折扣比例、流量倍率、节点总数与支付渠道（支付宝/微信/USDT）。
- 持续跟踪 2025 年新品牌的稳定性表现，并补充 ChatGPT / Claude / Gemini / Netflix 独立解锁检验。

## 五、相关延伸页面

- **22 维深度评测与晚间测速分析**：[U1S1 机场深度评测报告](/reviews/u1s1/)
- **新品牌风险评估**：[机场跑路风险识别与新机场观察原则](/risk/shutdown/) · [先月付再年付避坑指南](/risk/buying-guide/)
