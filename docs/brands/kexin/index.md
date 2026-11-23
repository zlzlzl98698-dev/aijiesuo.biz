---
title: "可信云档案：25 元 IEPL、透明度披露与截图日期复核"
description: "可信云（kexin）品牌档案：整理 2024 年运营、¥25/150GB IEPL 方案、第三方客户端支持、AI/流媒体缺口声明及截图复核项。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["可信云", "品牌档案", "IEPL专线", "第三方订阅", "透明披露"]
keywords: ["可信云", "可信云 25元档 IEPL VLESS 套餐档案", "kexin Kosing"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "raw-data/speedtest-manifest.json", "raw-data/README_16个机场测速实测资料_最新版.txt", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "kexin"
intent: "navigational"
pillar: "brands"
related: ["/reviews/kexin/", "/brands/sujie/", "/brands/sogo/", "/risk/buying-guide/"]
draft: false
---

# 可信云（kexin）品牌档案与数据透明度核查

可信云（别名 `kexin`、`Kosing`）在 本站品牌参数核验数据库 中商业顺位第 18 位，研究评分 `52 / 100`。它的评分结构在 32 家品牌中颇具特点：资料完整度仅有 `9 / 30`（缺少完整套餐表与节点列表），但**风险与局限透明度拿到了满分 `10 / 10`**——因为其品牌资料罕见地直接声明「AI 与流媒体目前缺乏统一实测数据，应保持中性描述」，不夸大未验证能力。

<BrandSnapshot slug="kexin" />

## 1. 基础档案与信息透明边界

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 成立年份 | 2024 年运营 | `[品牌资料 Vendor Claimed]` |
| 线路架构 | IEPL 专线 | `[品牌资料 Vendor Claimed]` |
| 协议口径 | 资料标明 `VLESS`；2026-08-11 批次测速截图实显 `Shadowsocks` | `[实测证据 Measured]` / 冲突 |
| 客户端支持 | 支持第三方客户端（Clash、Shadowrocket 等通用生态） | `[品牌资料 Vendor Claimed]` |
| 套餐价格 | 文本记为 ¥25/月（150GB/月），缺完整多档位价格表 | `[品牌资料 Vendor Claimed]` / `[待核实 Pending Verification]` |
| 优惠码 | `kkk333`（具体折扣比例及限制范围未明示） | `[商业信息 Commercial]` |
| 节点与设备 | 节点地区列表、节点数量、设备上限、流量倍率与支付方式均未标注 | `[待核实 Pending Verification]` |

## 2. 套餐与计费记录

<PlanComparison slug="kexin" />

目前可信云仅在文本描述中披露了 **¥25/月（150GB/月）** 这一基础月付规格（折合约 **¥0.167/GB**），与同为 25 元档的 [速界](/brands/sujie/) 和 [SOGO 云](/brands/sogo/) 基础版定价一致。但是否提供年付小包、季付折扣或一次性不限时流量包，现有档案均未记录，需等待补充官网完整套餐表。

## 3. 线路与解锁实情（零夸大声明）

<NetworkTopology slug="kexin" />

<UnlockMatrix slug="kexin" />

在常见机场宣传普遍将 ChatGPT、Claude、Netflix 写为「全解锁」的环境下，可信云原始资料主动注明 **「AI 与流媒体目前缺乏统一实测数据，应保持中性描述」**。因此在本站数据库中，其 AI 与流媒体矩阵全部诚实标记为 `untested`（`[待核实 Pending Verification]`），既不虚构解锁能力，也不把单次测速图外推为解锁证明。

## 4. 数据冲突与待复核异常项

1. **测速截图日期置信度复核项**：《2026-08-11 节点测速原始图像校验清单》 明确记录 `可信云-节点测速实测.png` 底部清晰可见时间为 `15:32:35 CST`，但**完整日历日期未在图片底部清晰显示**，当前的 `2026-08-11` 日期系根据压缩包批次时间推断（`dateConfidence: date-inferred-from-batch-time-visible-in-image`），正式发布与后续汇总前应核对原始测试日志。
2. **协议口径冲突**：品牌资料标明 `VLESS`，而实测截图 `可信云-节点测速实测.png` 中节点协议列实显为 `Shadowsocks`。
3. **商业资料薄弱**：缺少完整套餐价格表、节点区域清单、设备同时在线上限及优惠码 `kkk333` 的具体折扣比例。

## 5. 官方入口与延伸阅读

- **深度评测报告**：[可信云深度评测：2026-08-11 测速复核与 25 元档诚实度评估](/reviews/kexin/)
- **同价位品牌对照**：[速界档案](/brands/sujie/) · [SOGO 云档案](/brands/sogo/) · [第三方客户端选型](/clients/) · [购买前避坑指南](/risk/buying-guide/)

> **待补充研究任务**：复核 `可信云-节点测速实测.png` 的原始测试日历日期；补采官网完整多档套餐表、节点区域列表、设备限制及 `kkk333` 优惠码折扣比例；开展独立的 ChatGPT / Claude / Gemini 及主流流媒体解锁测验。
