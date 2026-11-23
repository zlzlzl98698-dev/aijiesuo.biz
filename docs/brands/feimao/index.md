---
title: "飞猫云（FlyCat）档案：专属客户端、学生版与实测差异"
description: "飞猫云（feimao）档案：整理 2023 年运营资料、专属客户端免订阅模式、学生版 ¥84/年等 7 档套餐、flycat888 码与协议差异。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 飞猫云
  - FlyCat
  - 专属客户端机场
  - 新手机场
keywords:
  - 飞猫云
  - 飞猫云专属客户端与学生版套餐
  - 飞猫云机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-feimao
intent: navigational
pillar: brands
related:
  - /reviews/feimao/
  - /compare/guangsu-vs-feimao/
  - /airport/easy-to-use/
  - /tutorials/subscription/
draft: false
---

# 飞猫云（FlyCat / `feimao`）品牌资料档案

**飞猫云（`feimao`，英文名 FlyCat）** 成立于 **2023 年**，定位为面向新手的轻量日常机场，核心卖点是**专属客户端下载登录即用、无需查找订阅链接或配置 Clash/小火箭**。在站内商业排序第 3（`commercialRank: 3`），研究评分 **`65/100`**——因为它具备 `2026-08-11` 早间实测截图与完整的 7 档价格表，但在传输线路类型、设备并发限制和客户端订阅机制上仍有待核实与冲突之处。

<BrandSnapshot slug="feimao" />

## 一、核心定位与入口说明

- **官网与注册入口**：请通过下方 `<BrandCta />` 读取中央链接库访问官方注册页，防止误入仿冒客户端下载站。
- **优惠码信息** `[商业资料 Commercial]`：优惠码 **`flycat888`**，在原始完整数据表中标注为 **8 折**，但正文未说明是否适用于学生版年付或不限时套餐，使用前需在订单结算页核对。
- **核心使用门槛** `[品牌资料 Vendor Claimed]`：官方强调“不用自己挑客户端、不用配订阅”，适合完全不想接触规则分流配置的新手；但对习惯使用 Clash Verge Rev、OpenWrt 软路由的进阶用户来说，专属客户端模式会限制自定义分流自由度。

<BrandCta slug="feimao" />

## 二、7 档套餐结构（学生年付 + 4 档月付 + 不限时/定制）

飞猫云的套餐命名与梯队较规整，入门年付为 **飞猫·学生版 ¥84/年（50GB/月，折约 ¥7/月）**，常规月付从 **¥25/150GB** 起步：

<PlanComparison slug="feimao" />

## 三、线路、协议与实测特征

- **线路定位** `[品牌资料 Vendor Claimed]`：品牌资料明确自述“不是那种主打顶级专线体验的机场”，定位日常轻快连接，具体走公网中转、BGP 还是 IEPL 专线**并未明示**。
- **协议实测显示** `[实测证据 Measured]`：品牌文字未写协议名称，而 `2026-08-11 08:52:30 CST` 的 MAI-TEST-BOT 实测图显示测试节点使用 **`Shadowsocks`** 协议。

<NetworkTopology slug="feimao" />

<UnlockMatrix slug="feimao" />

## 四、资料冲突与待核实字段

| 核查项目 | 已知差异 / 缺口详情 | 数据状态 |
| --- | --- | --- |
| **客户端模式与测速冲突** | 品牌文案宣称专属客户端免订阅、不用第三方工具，但 `2026-08-11` 测速由 `MAI-TEST-BOT` 对 Shadowsocks 节点完成（说明后台仍存在节点订阅形式或内部测试订阅） | `待核实` |
| **协议标注缺失** | 品牌正文与参数表均未标明底层协议，仅从 `2026-08-11` 实测图确认为 Shadowsocks | `实测补充` |
| **传输线路与设备上限** | 未写明具体线路类型（中转/专线），也未写明同时在线设备数限制、流量倍率与支付方式 | `待核实` |
| **优惠码适用范围** | `flycat888` 完整数据表标 8 折，但未写明学生版年付及不限时套餐是否除外 | `待核实` |

### 待补充研究任务
- 核实飞猫云专属客户端是否完全禁止用户提取或转换第三方订阅链接。
- 核实具体线路类型、多设备登录上限及支付宝/微信/USDT 支付支持情况。
- 补充晚高峰（20:00–22:30）测速及 ChatGPT / Gemini / Netflix 独立解锁检验。

## 五、相关延伸页面

- **深度评测与实测截图**：[飞猫云 22 维深度评测（含 2026-08-11 测速图）](/reviews/feimao/)
- **同门横向对比**：[光速云 vs 飞猫云（灵活双端 vs 专属免配置）](/compare/guangsu-vs-feimao/)
- **新手向专题**：[不用配置 Clash 的新手机场汇总](/airport/easy-to-use/)
- **安全下载提醒**：[代理客户端下载防假冒指南](/risk/security/)
