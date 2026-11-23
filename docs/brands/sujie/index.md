---
title: "速界机场档案：25 元 AI 向 IEPL 套餐与双端支持"
description: "速界机场（sujie）档案：整理 2024 年运营、¥25/150GB IEPL 方案、双端支持、AI 访问免责边界及 2026-08-11 协议差异。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["速界机场", "品牌档案", "IEPL专线", "AI工具访问", "双端支持"]
keywords: ["速界机场", "速界 AI 生产力定位与 150GB 套餐档案", "SpeedWorld机场"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "raw-data/speedtest-manifest.json", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "sujie"
intent: "navigational"
pillar: "brands"
related: ["/reviews/sujie/", "/brands/kexin/", "/ai/chatgpt/", "/clients/"]
draft: false
---

# 速界（sujie）品牌档案与核心参数

速界（英文关联名 `SpeedWorld`，slug `sujie`）在 本站品牌参数核验数据库 中商业顺位第 19 位，研究评分 `51 / 100`（资料完整度 9/30、协议与线路清晰度 12/20、实测证据可用性 15/25、套餐与定价弹性 6/15、风险与局限透明度 9/10）。在同为 25 元/150GB 的起步档位中，速界是唯一明确把核心定位指向 **ChatGPT、Claude、Gemini 等 AI 工具使用场景** 的品牌，且保留了较为理性的 IP/地区限制说明。

<BrandSnapshot slug="sujie" />

## 1. 品牌基础资料总表

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 成立年份 | 2024 年运营 | `[品牌资料 Vendor Claimed]` |
| 品牌视觉 | 已收录专属 Logo（`/images/logos/sujie_logo.webp`） | `[已核实 Verified Asset]` |
| 线路架构 | IEPL 专线 | `[品牌资料 Vendor Claimed]` |
| 协议口径 | 资料标明 `VLESS`；2026-08-11 测速截图实显 `Shadowsocks` | `[实测证据 Measured]` / 冲突 |
| 客户端模式 | 自研客户端 + 第三方订阅导入（双模式兼容） | `[品牌资料 Vendor Claimed]` |
| 起步定价 | 月付 ¥25/月（150GB/月），缺完整多档位价格表 | `[品牌资料 Vendor Claimed]` / `[待核实 Pending Verification]` |
| 优惠码 | `sss1111`（具体折扣与适用限制未明示） | `[商业信息 Commercial]` |
| 节点/设备/支付 | 节点地区、数量、设备限制、流量倍率与支付方式均未标注 | `[待核实 Pending Verification]` |

## 2. 套餐与计费信息

<PlanComparison slug="sujie" />

速界在现存文字档案中仅披露了 **¥25/月（150GB/月）** 基础档位，折合约 **¥0.167/GB** `[品牌资料 Vendor Claimed]`。与同价位的 [SOGO 云](/brands/sogo/) 相比，速界尚未披露年付小包、大流量月付或一次性不限时流量包；与同为 2024 年运营的 [可信云](/brands/kexin/) 相比，速界的额外优势在于同时提供了自研客户端与第三方订阅双路径。

## 3. 线路说明与 AI/流媒体边界

<NetworkTopology slug="sujie" />

<UnlockMatrix slug="sujie" />

需注意速界在 AI 与流媒体两端的显著差异：
- **AI 工具（ChatGPT / Claude / Gemini）**：品牌资料明确主打 AI 生产力场景，但同时注明 **「AI 可用性受 IP、地区和平台规则影响，不应承诺永久稳定支持所有 AI 平台」** `[品牌资料 Vendor Claimed]`。因此在数据库内标记为 `conditional`。目前仍缺少独立 AI 解锁实测截图。
- **流媒体**：原始清单未提供速界的流媒体解锁声明，2026-08-11 测速截图亦不涉及流媒体检测，故标记为 `untested`（`[待核实 Pending Verification]`）。

## 4. 已记录冲突与待核实项

1. **协议声明与实测不一致**：品牌资料注明使用 `VLESS`，而 `2026-08-11 15:39:36 CST` 的 `速界-节点测速实测.png`（`MAI-TEST-BOT 2.0.0-dev`）图内显示协议为 `Shadowsocks`。
2. **商业资料字段缺口**：缺少完整多档套餐价格表、节点覆盖地区清单、同时在线设备数上限及优惠码 `sss1111` 实际折扣幅度。

## 5. 官方入口与延伸阅读

- **深度评测报告**：[速界深度评测：25 元 AI 生产力方案实测边界与同档横评](/reviews/sujie/)
- **关联对比与专题**：[可信云档案](/brands/kexin/) · [ChatGPT 节点解锁原理](/ai/chatgpt/) · [Claude 防封号与纯净 IP 选择](/ai/claude/) · [Gemini 兼容指南](/ai/gemini/)

> **待补充研究任务**：补齐速界官网完整套餐表、节点列表、设备限制与 `sss1111` 折扣规则；针对 ChatGPT、Claude、Gemini 开展跨地区节点的独立解锁测验。
