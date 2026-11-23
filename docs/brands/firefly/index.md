---
title: "Firefly 萤火虫机场档案：IPLC 套餐与双码核对"
description: "Firefly 萤火虫档案：合并主清单 #8 与历史库条目，整理 IPLC + VLESS 原生 IP 参数、多周期套餐及客户端与优惠码冲突。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - Firefly萤火虫
  - IPLC专线
  - VLESS
  - 合并档案核查
keywords:
  - Firefly 萤火虫机场
  - Firefly 萤火虫 IPLC 套餐与资料版本核对
  - Firefly机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
verifiedAt: 2026-11-23
entity: brand-firefly
intent: navigational
pillar: brands
related:
  - /reviews/firefly/
  - /network/iplc/
  - /airport/easy-to-use/
  - /risk/buying-guide/
draft: false
---

# Firefly 萤火虫（`firefly`）品牌资料档案

**Firefly 萤火虫（`firefly`）** 在 《32家机场品牌公开资料与历史台账》 中曾先后以 `#8 Firefly`（正文主清单）与文末 `Firefly 萤火虫`（`2026-08-09` 历史库记录）两次出现。本站审计后已将其合并为单一品牌实体 **`firefly`**（商业顺位第 10，研究评分 **`52/100`**）。它定位 **IPLC 专线 + VLESS 协议 + 原生 IP + 不限速不限设备**，但在最新专属客户端限制、双推广码归属及实测证据空白上存在多处版本差异。

<BrandSnapshot slug="firefly" />

## 一、注册入口、优惠码与版本合并说明

- **官方注册入口**：主入口与备用入口已统一由 `data/links.ts` 集中维护（包含原文 `#8` 与文末历史记录两个不同推广标识版本），请通过下方 `<BrandCta />` 访问，不要在外部轻信未知短链。
- **优惠码与多周期折扣** `[商业资料 Commercial]`：优惠码 **`firefly`**，标注为 **新用户 8 折**；`#8` 条目写明“年付版不适用”，而文末 `2026-08-09` 历史资料另记录了季 9 / 半 85 / 年 8 折（最高约 64 折）的周期折扣梯度。
- **支付与团队背景** `[历史参考 + 品牌资料]`：文末历史记录注明支持 **支付宝 / USDT（无微信）**，并提及“8 年团队”及与微风、飞鸟、一云梯存在同系关系（`#8` 正文未重复提及这些背景）。

<BrandCta slug="firefly" />

## 二、6 档主套餐与历史多周期价格对照

从 `¥96/年` 年付版、`¥100/100GB` 不限时包，到 `Lite / Plus / Blaze / Nova`（150GB–1000GB/月），`2026-08-09` 历史记录还补充了季度到三年付的折算报价：

<PlanComparison slug="firefly" />

## 三、线路、客户端变动与未测边界

<NetworkTopology slug="firefly" />

<UnlockMatrix slug="firefly" />

## 四、合并后暴露的 5 项版本冲突与待核实任务

| 冲突类别 | 正文 `#8 Firefly` 口径 | 底部 `2026-08-09` 历史条目口径 | 核查处理 |
| --- | --- | --- | --- |
| **重复条目与链接标识** | 使用主推荐标识 | 使用另一组历史推荐标识 | 已合并至 `firefly`，主备入口由系统统一管理 |
| **客户端使用模式** | 称“**2026 年 10 月起使用官方专属客户端，下载登录即用（不提供订阅链接）**” | 未提及专属客户端限制 | **`待核实`**（若已强制专属端，Clash/小火箭将无法使用） |
| **多周期与支付渠道** | 仅列年付版、4 档月付起步价与不限时，未提支付方式 | 补充季/半年/年/两年/三年付价格及 **支付宝/USDT（无微信）** | 保留历史参考价并注明非实时报价 |
| **测速参考数据冲突** | 附带 2026-10-19 非晚高峰 5 地区参考测速 | 明确写明“**未提供可比的逐地区测速数据**” | 均非本站实测，独立测速目前仍为 **0 张** |
| **AI 声明范围** | 提 ChatGPT / Claude / Gemini（视节点） | 额外提及 **Meta AI**（未独立实测） | 全部标为未独立实测 |

### 待补充研究任务
- 核实当前官网主注册入口有效性与 `firefly` 优惠码是否仍可享 8 折或周期叠加。
- 核实 2026 年 10 月后是否彻底取消第三方通用订阅链接（Clash/Shadowrocket 能否继续导入）。
- 补充独立实测节点截图（含晚高峰）及 ChatGPT / Claude / Gemini / Netflix 解锁检测。

## 五、相关页面导航

- **22 维独立评测**：[Firefly 萤火虫深度评测与历史版本对照](/reviews/firefly/)
- **IPLC 原理参考**：[IPLC 国际专线特点与核查要点](/network/iplc/)
- **新手客户端权衡**：[专属客户端免配置 vs 第三方订阅选型](/airport/easy-to-use/)
