---
title: "微风网络档案：IEPL+VLESS 参数、6 档套餐与实测"
description: "微风网络（BreezeNet）档案：整理 2023 年运营、IEPL+VLESS 一致性、6 档套餐、flat888 九折码、7 月实测与起步价冲突。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 微风网络
  - BreezeNet
  - IEPL专线
  - VLESS机场
keywords:
  - 微风网络
  - 微风网络 IEPL 套餐与优惠码 flat888
  - 微风网络机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - docs/public/images/speedtests/2026-08-11/微风-节点测速实测.png
verifiedAt: 2026-11-23
entity: brand-weifeng
intent: navigational
pillar: brands
related:
  - /reviews/weifeng/
  - /network/iepl/
  - /clients/clash-verge-rev/
  - /risk/buying-guide/
draft: false
---

# 微风网络（BreezeNet / `weifeng`）品牌资料档案

**微风网络（`weifeng`，英文名 BreezeNet）** 创立于 **2023 年**，定位入门级高性价比 **IEPL 专线 + VLESS 协议** 机场（商业顺位第 4，研究评分 **`69/100`**）。在站内众多存在“文案标 VLESS、截图却显 Shadowsocks”冲突的品牌中，微风网络是少数**实测截图协议（`Vless`）与品牌资料完全吻合**的案例。不过，其入门价格存在 7 元 / 11 元 / 137 元三重文本差异，且实测图归档目录与图内时间戳并不一致。

<BrandSnapshot slug="weifeng" />

## 一、注册入口、优惠码与客服支持

- **官方注册入口**：统一通过下方 `<BrandCta />` 调用中央链接配置访问，确保使用最新可用面板域与合规 `nofollow sponsored noopener` 标注。
- **优惠码与折扣** `[商业资料 Commercial]`：优惠码 **`flat888`**，在完整数据表中标注为 **9 折**，但未写明是否限制年付或一次性不限时套餐。
- **客服体系** `[品牌资料 Vendor Claimed]`：宣称提供 **7×24 小时在线客服（夜间由 AI 客服值守）**；具体支付方式（支付宝/微信/USDT）及设备同时在线上限原文未明确标注。

<BrandCta slug="weifeng" />

## 二、6 档套餐价格表（年付 + 月付 + 不限时）

微风网络提供 1 档年付（清风）、3 档月付（乘风/破风/御风，200GB–1200GB）与 2 档永久不限时包（信风 270GB / 长风 570GB）：

<PlanComparison slug="weifeng" />

## 三、线路架构、节点规模与协议一致性

- **传输线路与协议**：明确标注 **IEPL 专线** 与 **VLESS 协议**；`2026-07-19` MiaoKo 实测显示共有 **50/50 节点**（`Vless`），未出现协议混标问题。
- **客户端使用边界**：文字资料未明确写死“必须使用专属客户端”，实测工具通过 `Vless` 订阅直接完成测试，大概率支持主流 VLESS 兼容客户端（如 Clash Verge Rev / v2rayN / Shadowrocket），但仍建议下单前在面板核实订阅导入方式。

<NetworkTopology slug="weifeng" />

<UnlockMatrix slug="weifeng" />

## 四、已知冲突与待核实事项

| 冲突类别 | 核查发现 | 档案处理与核实方向 |
| --- | --- | --- |
| **入门价格三重表述** | 基础数据写“年付约 7 元/月 50GB/月”；套餐表最低为 **清风年付 ¥137/年（100GB/月，折约 ¥11.42/月）**；介绍说明写“11 元/月起” | 完整套餐表未见 ¥84/年 50GB 档，暂按 `¥137/年` 作最低可验证价格并加注冲突提示 |
| **测速图归档日期错位** | `微风-节点测速实测.png` 存放在 `2026-08-11/` 目录下且未收入 《2026-08-11 节点测速原始图像校验清单》，但图内底部明确写明 **`2026-07-19 18:38:20 CST`** | 本站严格按图内真实时间 `2026-07-19` 标注，不冒充 8 月批次 |
| **缺失参数** | 设备同时在线数量限制、流量倍率（是否全节点 1×）及支付渠道均未在文档列出 | 列入待补充研究任务 |

### 待补充研究任务
- 核实微风网络官网当前是否还有 `¥84/年（50GB/月）` 隐藏入门档，或已统一升级为清风 `¥137/年（100GB/月）`。
- 核实 `flat888` 九折码适用套餐范围、设备并发数、流量倍率与支付渠道。
- 补充 8 月份之后的近 30 日复测及 ChatGPT / Claude / Gemini / Netflix 独立解锁检测。

## 五、相关内部链接

- **深度评测与 50 节点测速分析**：[微风网络深度评测报告](/reviews/weifeng/)
- **VLESS 与 IEPL 技术背景**：[IEPL 专线技术解析](/network/iepl/)
- **适用客户端指南**：[v2rayN 多核心客户端](/clients/v2rayn/) · [Clash Verge Rev 配置](/clients/clash-verge-rev/)
