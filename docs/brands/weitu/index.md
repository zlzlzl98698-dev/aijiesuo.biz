---
title: "唯兔云（V2云）档案：IPLC 专线、10 档套餐与协议核查"
description: "唯兔云（V2云）品牌档案：汇总 2023 年运营、IPLC 1 倍流量不限速、10 档套餐、14.9 元限时款及 Trojan/SS 协议差异。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 唯兔云
  - V2云
  - IPLC专线
  - 不限时流量包
keywords:
  - 唯兔云
  - 唯兔云 IPLC 套餐与优惠码 weitu666
  - V2云机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-weitu
intent: navigational
pillar: brands
related:
  - /reviews/weitu/
  - /network/iplc/
  - /pricing/non-expiring/
  - /risk/buying-guide/
draft: false
---

# 唯兔云（V2 云 / `weitu`）品牌资料档案

**唯兔云（`weitu`，别名 V2 云）** 成立于 **2023 年**，主推 **IPLC 国际专线、1 倍流量、不限速、不限设备连接**（商业顺位第 9，研究评分 **`69/100`**）。品牌一共提供多达 **10 个价格档位**（含 2 档年付、1 档节假日限时月付、4 档常规月付以及 3 档永久不限时包），并具备 `2026-08-11 13:55:08 CST` 实测截图。但在起步月付价格口径与协议标注上存在明显细节差异，需要重点标注。

<BrandSnapshot slug="weitu" />

## 一、注册入口、优惠码与技术运维

- **官方注册入口**：统一通过下方 `<BrandCta />` 由 `data/links.ts` 提供，确保链接指向最新域并遵守商业披露规范。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`weitu666`**（原始资料未标明具体折扣比例与适用套餐限制，需下单时核实）。
- **运营背景** `[品牌资料 Vendor Claimed]`：2023 年运营，宣称提供“海外技术团队与多人客服支持”；支持通用客户端测试（`2026-08-11` 通过 MAI-TEST-BOT 测试 Shadowsocks 节点）；支付渠道原文未详列。

<BrandCta slug="weitu" />

## 二、10 档完整套餐矩阵（注意限时款 vs 常规月付）

唯兔云的套餐非常细分化，尤其是区分了 **¥79.90 年付限量款（45GB/月）**、**¥120 年付加强专线（75GB/月）**、**¥14.9 节假日限时开启款（100GB/月）** 与 **¥19.90 普通版起常规月付**，外加 100G / 200G / 500G 三档永久不限时包：

<PlanComparison slug="weitu" />

## 三、线路架构、节点规模与解锁声明

- **传输线路** `[品牌资料 Vendor Claimed]`：全线 **IPLC 专线**，全节点 **1 倍流量**、不限速不限设备。
- **节点地区**：覆盖香港、台湾、新加坡、日本、美国；文末汇总表另提及“60+ 节点 + 三网优化 + 智能负载均衡”。

<NetworkTopology slug="weitu" />

<UnlockMatrix slug="weitu" />

## 四、已知冲突与待核实清单

| 冲突类别 | 核查发现 | 档案处理与提示 |
| --- | --- | --- |
| **常规月付起步价差异** | 基础数据行写 `14.9 元/月 100GB/月`，但套餐表写明 `¥14.9` 为**节假日限时开启款**，日常在售的常规月付普通版实际为 **`¥19.90/月（150GB/月）`** | 明确区分日常起步价与节假日限时档，避免价格误导 |
| **Trojan vs Shadowsocks** | 介绍说明第 333 行标明 `Trojan 协议`，而 `2026-08-11 13:55:08 CST` 实测截图实显 **`Shadowsocks`** | 同时标注 `Trojan / Shadowsocks`，以官网订阅下发为准 |
| **卖点来源不对称** | 汇总表写“60+节点 + 三网优化 + 智能负载均衡”，正文第 296–333 行未出现该表述 | 标注来源仅为汇总表 |
| **待补信息** | `weitu666` 具体折扣率、支付方式、限量款/限时款当前可买状态、AI 与流媒体独立测试 | 列入待补充研究任务 |

### 待补充研究任务
- 核实当前唯兔云面板中 **¥14.9 节假日限时款** 与 **¥79.9 年付限量款** 是否开放购买。
- 核实实际订阅中 Trojan 与 Shadowsocks 节点比例、节点总数以及 `weitu666` 折扣幅度。
- 补充晚高峰时段测速及 ChatGPT / Claude / Gemini / Netflix 独立解锁检测。

## 五、相关内部链接

- **22 维深度评测**：[唯兔云评测报告（含 2026-08-11 测速与单价对比）](/reviews/weitu/)
- **IPLC 原理科普**：[IPLC 国际专线与宣传口径核查](/network/iplc/)
- **不限时包横评**：[不限时不过期流量包机场推荐](/pricing/non-expiring/)
