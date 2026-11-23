---
title: "榴莲云档案：5.6 元档协议未明、链接异常与评分拆解"
description: "榴莲云（liulianyun）品牌档案：整理 5.6 元/月 IEPL 方案、ll88 优惠码、全库最低研究评分（28/100）背后的协议缺失与推广链接缺少斜杠格式异常。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["榴莲云", "品牌档案", "5.6元机场", "协议未明", "链接格式异常"]
keywords: ["榴莲云", "榴莲云 5.6元档协议未明档案", "liulianyun"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "liulianyun"
intent: "navigational"
pillar: "brands"
related: ["/reviews/liulianyun/", "/brands/shandianshu/", "/brands/dalaoyun/", "/pricing/cheap/"]
draft: false
---

# 榴莲云（liulianyun）品牌档案与缺失字段清单

榴莲云（`liulianyun`）在 本站品牌参数核验数据库 中商业顺位第 24 位，研究评分 **`28 / 100`**——在全部 32 个收录品牌中位居末位（资料完整度 8/30、协议与线路清晰度 8/20、实测证据可用性 0/25、套餐与定价弹性 6/15、风险与局限透明度 6/10）。核心原因在于它是 5.6 元档中**唯一未明确标注代理协议**的品牌，且推广链接域名与 `#` 之间缺少斜杠 `/`。

<BrandSnapshot slug="liulianyun" />

## 1. 已知信息与异常记录

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 成立年份 | 2024 年运营 | `[品牌资料 Vendor Claimed]` |
| 线路类型 | IEPL 专线 | `[品牌资料 Vendor Claimed]` |
| 代理协议 | **品牌资料未统一提供协议类型**（未知） | `[待核实 Pending Verification]` |
| 客户端模式 | 自研客户端 + 第三方订阅导入 | `[品牌资料 Vendor Claimed]` |
| 起步价格 | 年付折算约 ¥5.6/月（60GB/月） | `[品牌资料 Vendor Claimed]` |
| 优惠码 | `ll88`（季付及以上 7 折，叠加规则未明） | `[商业信息 Commercial]` |
| 推广入口状态 | `format_anomaly`（域名后紧跟 `#`，缺少斜杠 `/`） | `[异常记录 Anomaly]` |
| 其余关键字段 | 完整套餐表、节点列表、设备数、倍率、支付、测速与解锁全部缺失 | `[待核实 Pending Verification]` |

## 2. 两大核心异常项说明

1. **协议类型空白**：在 [大佬云](/brands/dalaoyun/)、[闪电鼠](/brands/shandianshu/)、[云界线](/brands/yunjiexian/)、[环球梯](/brands/huanqiuti/) 均明确写明 `VLESS` 协议的情况下，榴莲云在原始清单中明确标注「协议类型品牌资料未统一提供」。对于需要使用第三方客户端（如 Xray、Mihomo、sing-box）的用户，协议不明意味着购前无法预判内核与客户端兼容性。
2. **链接缺少 `/` 异常**：原始记录中其域名与哈希路由 `#` 之间缺少 `/` 分隔符（形如域名后直接衔接 `#/?...`），虽然多数现代浏览器会自动补全根路径斜杠，但在部分老旧内置浏览器或脚本解析中仍存在兼容性隐患。

## 3. 套餐、网络与解锁组件视图

<PlanComparison slug="liulianyun" />

<NetworkTopology slug="liulianyun" />

<UnlockMatrix slug="liulianyun" />

## 4. 延伸阅读与待补充研究任务

- **深度评测**：[榴莲云深度评测：协议空白、链接异常与 5.6 元档风险分析](/reviews/liulianyun/)
- **同档对照**：[闪电鼠档案](/brands/shandianshu/) · [大佬云档案](/brands/dalaoyun/) · [便宜机场汇总](/pricing/cheap/)
- **待补充研究任务**：核实榴莲云后台实际下发的代理协议（是否为 VLESS 或其他协议）；在浏览器中测试其推广入口自动补斜杠跳转表现；补齐官网完整套餐表、节点列表、设备限制及独立测速/解锁测试。
