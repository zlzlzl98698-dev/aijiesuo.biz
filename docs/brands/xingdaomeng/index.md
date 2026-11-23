---
title: "星岛梦档案：2020 老牌 IEPL 与 9 档套餐"
description: "星岛梦（XDM）档案：整理 2020 年运营记录、IEPL 1 倍流量不限设备、日韩东南亚节点、9 档套餐（含永久包）及 Trojan/SS 差异。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 星岛梦
  - XDM
  - IEPL专线
  - 不限时流量包
keywords:
  - 星岛梦
  - 星岛梦 IEPL 不限设备套餐档案
  - 星岛梦机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-xingdaomeng
intent: navigational
pillar: brands
related:
  - /reviews/xingdaomeng/
  - /compare/guangsu-vs-xingdaomeng/
  - /pricing/non-expiring/
  - /network/traffic-multiplier/
draft: false
---

# 星岛梦（XDM / `xingdaomeng`）品牌资料档案

**星岛梦（`xingdaomeng`，简称 XDM）** 创立于 **2020 年**，与光速云同属站内运营资历最深的老牌梯队（商业顺位第 6，研究评分 **`70/100`**）。品牌核心定位为 **IEPL 专线、1 倍流量计费、不限设备连接**，除港/台/日/美/新五大主流地区外，还明确延伸至**韩国与东南亚地区**，并提供 3 档梯度覆盖 100GB–1TB 的永久不限时流量包。

<BrandSnapshot slug="xingdaomeng" />

## 一、注册入口、优惠码与技术支持

- **官方注册入口**：统一通过下方 `<BrandCta />` 读取 `data/links.ts` 跳转，附带完整 `nofollow sponsored noopener` 合规标注。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`nmw888`**，原始资料未明确标出折扣比例与适用套餐限制，需在官网下单结算页核验实际减免。
- **运维与客户端** `[品牌资料 Vendor Claimed]`：宣称由海外技术团队与多人客服协同维护，支持通用订阅导入（`2026-08-11` 实测使用 MAI-TEST-BOT 直接测试节点，未限制仅用自研 App）；支付方式原文未详列。

<BrandCta slug="xingdaomeng" />

## 二、9 档套餐结构（年付小包 + 4 档月付 + 3 档永久包 + 定制）

星岛梦的套餐矩阵十分完整，尤其一次性永久不限时包同时覆盖 **¥100（100GB）**、**¥300（300GB）** 与 **¥600（1TB）** 三档，满足从轻度应急到长期大流量囤货的不同需求：

<PlanComparison slug="xingdaomeng" />

## 三、线路架构、地区覆盖与解锁声明

- **线路与倍率** `[品牌资料 Vendor Claimed]`：全线 **IEPL 专线**，全节点 **1 倍流量**计费，不限设备同时在线。
- **地区覆盖特色** `[品牌资料 Vendor Claimed]`：除香港、台湾、日本、美国、新加坡外，明确包含**韩国及东南亚等地区**，在同价位机场中对日韩游戏、韩区/东南亚跨境业务更友好。

<NetworkTopology slug="xingdaomeng" />

<UnlockMatrix slug="xingdaomeng" />

## 四、已知冲突与待核实记录

| 冲突项目 | 具体差异说明 | 当前状态 |
| --- | --- | --- |
| **协议标注 vs 实测** | 介绍说明第 218 行写“Trojan 协议”，但 `2026-08-11 01:48:13 CST` 测速截图实显 **`Shadowsocks`** | `待核实`（可能双协议并存或已切换） |
| **Gemini 文案微差** | 核心特色写“兼容 ChatGPT、Gemini”，但解锁列表将 Gemini 标为“视节点而定” | `以谨慎口径“视节点而定”为准` |
| **优惠码与基础缺口** | `nmw888` 缺少折扣比例说明；缺少具体节点总数、支付渠道及 AI/流媒体独立检测 | `待核实` |

### 待补充研究任务
- 核实星岛梦当前订阅链接下发的实际协议为 Trojan、Shadowsocks 还是混合协议。
- 核实优惠码 `nmw888` 折扣力度及支持的支付方式（支付宝/微信/USDT）。
- 补充白天及晚高峰时段的测速复测与 ChatGPT / Gemini / Netflix 独立解锁检测。

## 五、相关内容索引

- **22 维独立评测**：[星岛梦深度评测（含 2026-08-11 凌晨测速图）](/reviews/xingdaomeng/)
- **老牌双雄对比**：[光速云 vs 星岛梦（同为 2020 年老牌 IEPL 怎么选）](/compare/guangsu-vs-xingdaomeng/)
- **不限时套餐专题**：[永久不过期不限时流量包机场汇总](/pricing/non-expiring/)
