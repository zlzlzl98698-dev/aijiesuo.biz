---
title: "二猫云（2mao）档案：全线 IEPL、猫系套餐与协议核查"
description: 二猫云（ermao / 2mao）品牌参数档案：汇总 2023 年运营资料、不限设备、独家定制客户端、6 档猫系套餐及新加坡节点与 VLESS/SS 协议矛盾核查。
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 二猫云
  - 2mao
  - IEPL专线
  - 节点冲突核查
keywords:
  - 二猫云
  - 二猫云定制客户端与白猫黑猫套餐
  - 二猫云机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-ermao
intent: navigational
pillar: brands
related:
  - /reviews/ermao/
  - /network/iepl/
  - /ai/claude/
  - /risk/buying-guide/
draft: false
---

# 二猫云（2mao / `ermao`）品牌资料档案

**二猫云（`ermao`，别称 2mao）** 成立于 **2023 年**，主打“全线 IEPL 专线、不做低价跑路盘、不限设备连接数”，并配备独家定制客户端（研究评分 **`62/100`**）。该品牌在站内档案中最突出的特点是**对 Claude/Gemini 保持谨慎声明（坦承官方没给出确定说法，建议先测）**，但同时原始文本自身在**是否包含新加坡节点、协议是 VLESS 还是 Shadowsocks、以及是否提供三年付**三处存在内部矛盾。

<BrandSnapshot slug="ermao" />

## 一、入口、优惠码与客户端形态

- **官方注册入口**：由下方 `<BrandCta />` 统一读取 `data/links.ts` 提供，已附加 `nofollow sponsored noopener`。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`ermao5555`**，具体折扣幅度与限制范围原文未写明。
- **客户端架构** `[品牌资料 + 实测]`：品牌文案称配备**独家定制客户端**；但 `2026-08-11 10:45:27 CST` 实测由 `MAI-TEST-BOT` 直接测试 `Shadowsocks` 节点完成，说明并非完全封闭第三方节点体系，具体第三方订阅导出权限可在注册面板核对。

<BrandCta slug="ermao" />

## 二、6 档套餐矩阵（不限时 + 年付小包 + 4 档猫系月付）

二猫云已公开的套餐表包含 1 档 ¥99/100GB 不限时包、1 档 ¥89/年年付小包（60GB/月）以及白猫/橘猫/牛奶猫/黑猫 4 档月付方案：

<PlanComparison slug="ermao" />

## 三、线路、解锁边界与内部文本冲突

<NetworkTopology slug="ermao" />

<UnlockMatrix slug="ermao" />

在核对 《32家机场品牌公开资料与历史台账》（第 221–255 行）与实测截图后，以下 **4 处冲突** 必须列为购买前核验清单：

| 冲突项 | 冲突详情 | 当前核查态度 |
| --- | --- | --- |
| **新加坡节点有或无** | 第 246 行参考测速表列有 `新加坡 46ms / 407Mbps`，但第 254 行介绍说明却写“比不少同类机场少了新加坡这一站” | `待核实`（对新加坡刚需用户影响较大，需进面板实看节点列表） |
| **VLESS vs Shadowsocks** | 第 254 行文案标注 `VLESS 协议`，而 `2026-08-11 10:45:27 CST` 实测图实显 **`Shadowsocks`** | `以实测可见 Shadowsocks 与文案 VLESS 并记` |
| **多周期定价缺失** | 介绍称“套餐从月付到三年付都有”，但价格表仅给出月付、年付小包与一次性包，未列出季付/半年付/两年付/三年付价格 | `待核实` |
| **原始文档编号重复** | 在 《32家机场品牌公开资料与历史台账》 中，二猫云、无忧链接与唯兔云三节均误标为 `## 7.` | `已在 本站品牌参数核验数据库 归一化` |

### 待补充研究任务
- 登录二猫云后台核对当前真实节点列表是否包含新加坡与台湾站。
- 核实实际订阅协议（SS/VLESS）、流量倍率、支付方式与多周期（季/半年/两三年付）具体报价。
- 核实优惠码 `ermao5555` 折扣率，并补充晚高峰测速与 Claude / Gemini 实测。

## 四、延伸导航

- **完整评测与上午测速分析**：[二猫云深度评测报告](/reviews/ermao/)
- **AI 风控对比参考**：[Claude 解锁与防封号建议](/ai/claude/) · [Gemini 节点兼容说明](/ai/gemini/)
- **理性购买建议**：[购买避坑指南：为什么先月付测试？](/risk/buying-guide/)
