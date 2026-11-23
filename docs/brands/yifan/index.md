---
title: "一翻云档案：IEPL 物理专线、三协议支持与双码核查"
description: "一翻云（1FLYYUN）档案：汇总 2025 年运营、IEPL+原生住宅 IP、Hy2/VLESS/SS 三协议、8 档套餐及双优惠码差异。"
date: 2026-11-23
updated: 2026-11-23
category: brands
tags:
  - 一翻云
  - 1FLYYUN
  - Hysteria2
  - VLESS-Reality
  - IEPL物理专线
keywords:
  - 一翻云
  - 一翻云 Hysteria2 Reality 三协议套餐档案
  - 一翻云机场档案
author: AI解锁网络服务研究组
sources:
  - data/brands.json
  - raw-data/32家机场品牌清单.txt
  - raw-data/speedtest-manifest.json
verifiedAt: 2026-11-23
entity: brand-yifan
intent: navigational
pillar: brands
related:
  - /reviews/yifan/
  - /network/iepl/
  - /clients/mihomo/
  - /pricing/non-expiring/
draft: false
---

# 一翻云（1FLYYUN / `yifan`）品牌资料档案

**一翻云（`yifan`，英文标识 `1flyun` / `1FLYYUN`）** 成立于 **2025 年**，是站内协议技术栈最丰富的新锐机场之一（商业顺位第 16，研究评分 **`72/100`**）。它主打 **全节点 IEPL 物理专线 + 原生住宅 IP**，同时提供 **Hysteria 2、VLESS-Reality、Shadowsocks 三种主流协议**，不限速不限设备，覆盖五地（包含台湾节点）并设 8 档套餐。购买前需特别注意：**官方明确没有免费试用**，且存在 `yfy6666` 与 `1FLYYUN` 两个优惠码冲突。

<BrandSnapshot slug="yifan" />

## 一、注册入口、双优惠码冲突与无试用边界

- **官方注册入口**：统一通过下方 `<BrandCta />` 读取 `data/links.ts` 解析，附带 `nofollow sponsored noopener` 合规标注。
- **双优惠码冲突** `[商业资料 Commercial]`：
  - 基础数据行与文末汇总表标注优惠码 **`yfy6666`**（未写明折扣幅度）；
  - 介绍说明第 560 行却明确标注优惠码 **`1FLYYUN`** 可享 **9 折**。购买时请在结算页面逐个验证。
- **无免费试用提示** `[品牌资料 Vendor Claimed]`：介绍说明明确提示“**官方没有提供试用，想先验证线路没有零成本的办法**”。

<BrandCta slug="yifan" />

## 二、8 档套餐结构（4 档月付 + ¥98 年付小包 + 3 档不限时包）

一翻云的月付档从 **¥20/150GB** 到 **¥95/1.2TB**，另有 **¥98/年（60GB/月）** 年付小包与 **100GB / 250GB / 500GB** 三档永久不过期不限时包：

<PlanComparison slug="yifan" />

## 三、三协议架构、线路与节点覆盖

- **多协议灵活性** `[品牌资料 Vendor Claimed]`：原生提供 **Hysteria 2 / VLESS-Reality / Shadowsocks** 三种协议，广泛兼容 [Mihomo 内核](/clients/mihomo/)、[Clash Verge Rev](/clients/clash-verge-rev/)、[sing-box](/clients/sing-box/)、[Shadowrocket](/clients/shadowrocket/) 与 [v2rayN](/clients/v2rayn/) 等第三方客户端。
- **节点地区**：覆盖 **香港、台湾、新加坡、日本、美国** 五地；`2026-08-11 00:21:30 CST` 测速图测试了其中的 `Shadowsocks` 节点（`Hy2` 与 `VLESS-Reality` 节点尚未有独立实测图）。

<NetworkTopology slug="yifan" />

<UnlockMatrix slug="yifan" />

## 四、已知冲突与待核实事项

| 核查项目 | 差异与缺口说明 | 当前状态 |
| --- | --- | --- |
| **优惠码双码冲突** | `yfy6666`（折扣未明） vs `1FLYYUN`（介绍说明标 9 折） | `待核实`（结账页验证） |
| **起步价口径差异** | 基础数据写 `20 元/月 150GB/月`；另有 `¥98/年` 年付小包（折约 ¥8.17/月 60GB） | `已归纳`（月付 ¥20 / 年付 ¥98） |
| **协议实测覆盖不全** | 2026-08-11 凌晨图仅测 Shadowsocks；Hysteria 2 与 VLESS-Reality 节点尚无实测图 | `待补充实测` |
| **缺失参数与宣传口径** | 交通倍率、节点总数、支付渠道与客服时段未明；“晚高峰 0 丢包 / 2Gbps”属官方单方宣称 | `待核实` |

### 待补充研究任务
- 核实优惠码 `yfy6666` 与 `1FLYYUN`（9 折）当前有效性及适用套餐范围（年付/不限时是否可用）。
- 核实流量倍率规则（是否全节点 1×）、节点总数、支付方式与客服响应方式。
- 补充 **Hysteria 2 / VLESS-Reality** 节点晚高峰实测及 ChatGPT / Claude / Gemini / Netflix 独立解锁检测。

## 五、相关内容索引

- **22 维深度评测**：[一翻云深度评测（三协议成本与凌晨测速分析）](/reviews/yifan/)
- **客户端与协议**：[Mihomo 内核与 Hy2/Reality 支持](/clients/mihomo/) · [IEPL 专线技术解析](/network/iepl/)
- **不限时套餐比较**：[永久不限时流量包汇总](/pricing/non-expiring/)
