---
title: "隐形人机场档案：仅专属客户端、9 档套餐与冲突核查"
description: "隐形人机场档案：解答为何不支持 Clash 订阅，整理企业级 IPLC 9 档套餐、双优惠码与流量口径冲突及空白测速表。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["隐形人机场", "品牌档案", "IPLC专线", "专属客户端", "Invisible"]
keywords: ["隐形人机场", "隐形人机场为什么不能用 Clash 订阅", "隐形人 IPLC 专属客户端档案"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "yinxingren"
intent: "navigational"
pillar: "brands"
related: ["/reviews/yinxingren/", "/brands/tiziyun/", "/brands/shanyue/", "/network/iplc/"]
draft: false
---

# 隐形人（yinxingren / Invisible）品牌档案与数据冲突核查

隐形人（英文关联名 `Invisible`，slug `yinxingren`）在 本站品牌参数核验数据库 中商业顺位第 27 位，研究评分 `44 / 100`（资料完整度 19/30、协议与线路清晰度 8/20、实测证据可用性 0/25、套餐与定价弹性 13/15、风险与局限透明度 4/10）。它定位于「企业级 IPLC 专线直连」，定价在收录品牌中偏高，且在架构、优惠码、流量配额和卖点来源上存在多处明显冲突。

<BrandSnapshot slug="yinxingren" />

## 1. 运营资料与技术参数总表

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 成立年份 / 视觉 | 2024 年运营；Logo `/images/logos/隐形人256x256.png` | `[品牌资料 Vendor Claimed]` / `[已核实 Verified Asset]` |
| 线路架构 | 企业级 IPLC 专线直连 | `[品牌资料 Vendor Claimed]` |
| 协议类型 | 原文未标注 | `[待核实 Pending Verification]` |
| 客户端模式 | 自带专属客户端，不提供订阅链接（Clash/Shadowrocket 无法使用） | `[品牌资料 Vendor Claimed]` |
| 节点地区 | 正文列香港、台湾、新加坡、日本、美国；汇总表另有「60+节点详细清单」表述 | `[品牌资料 Vendor Claimed]` / 冲突 |
| 设备与倍率 | 设备数量以套餐而定；流量倍率与支付方式均未标注 | `[品牌资料 Vendor Claimed]` / `[待核实 Pending Verification]` |
| 优惠码 | `yxr888`（折扣未明示）与 `moon80`（8 折），存在双码冲突 | `[商业信息 Commercial]` |

## 2. 隐形人机场为什么不能用 Clash 订阅？ {#client-compatibility}

隐形人明确实行 **「自带客户端，不提供订阅链接」** 政策 `[品牌资料 Vendor Claimed]`，因此在第三方生态中：
- **无法导出标准 YAML 或通用 URI 订阅**：Clash（包含 Clash Verge Rev、FlClash、OpenClash）以及 Shadowrocket 小火箭、v2rayN、Karing 等工具都无法直接导入使用。
- **使用方式**：必须下载隐形人官方提供的全平台专属客户端，登录后一键连接，官网未提供免费试用。
- **替代对照**：如果你既想使用企业级专线、又必须保留 Clash/通用订阅自由度，可对比支持「自研客户端 + 通用订阅双模式」的 [梯子云](/brands/tiziyun/)。

## 3. 套餐定价矩阵（含一次性包与定制档）

<PlanComparison slug="yinxingren" />

隐形人提供 4 档月付、1 档年付小包（星耀风暴 ¥109/年，80GB/月，折约 ¥9.08/月）、3 档一次性流量包与 1 档 ¥680/月王者定制版。需特别留意其一次性流量包的单价明显偏高：`¥229/160GB`（约 **¥1.43/GB**）、`¥549/420GB`（约 **¥1.31/GB**）、`¥1199/1.0TB`（**¥1.20/GB**），高于 SOGO 云（¥0.85–¥1.00/GB）和全球云（¥0.875–¥1.00/GB）。

## 4. 线路、测速空白与解锁声明

<NetworkTopology slug="yinxingren" />

<UnlockMatrix slug="yinxingren" />

## 5. 四项已记录数据冲突

1. **双优惠码冲突**：基础数据第 850 行与文末汇总表第 948 行写 `yxr888`（未明示折扣），而基础信息第 855 行及介绍说明第 887 行写 `moon80`（8 折）。
2. **入门月付流量冲突**：第 850 行基础数据记录为「24元/月 100GB/月」，而第 864 行套餐表及第 887 行介绍说明均写为「隐形人 白银纪元 ¥24/月 **144GB/月**」。
3. **卖点来源冲突**：第 948 行汇总表突然写有「60+节点详细清单 + 1小时修复承诺」，但正文第 846–887 行的全部描述中**从未出现**「60+节点详细清单」或「1小时修复承诺」原文。
4. **协议缺失与测速表全为空白**：协议类型未标注，且第 875–881 行的五地参考测速表数值全部为占位符 `—`，无任何实测或参考数据。

## 6. 延伸阅读与待补充研究任务

- **深度评测**：[隐形人深度评测：无订阅限制、空白测速表与梯子云横向对比](/reviews/yinxingren/)
- **对比品牌**：[梯子云档案](/brands/tiziyun/) · [闪跃档案](/brands/shanyue/) · [IPLC 国际专线解析](/network/iplc/)
- **待补充研究任务**：核实 `yxr888` 与 `moon80` 的实际效力及白银纪元究竟为 100GB 还是 144GB；核查「1小时修复承诺」与 60+ 节点清单来源；补充专属客户端实测速度与 AI/流媒体验证。
