---
title: "闪跃机场档案：纯 IPLC 专线套餐、8 折与未实测缺口"
description: "闪跃机场（shanyue / FlashLeap）品牌档案：整理纯 IPLC 专线架构、5档套餐定价、shanyue 8折优惠码适用边界、专属客户端模式及零独立测速提示。"
date: "2026-11-23"
updated: "2026-11-23"
category: "品牌档案"
tags: ["闪跃机场", "品牌档案", "IPLC专线", "专属客户端", "FlashLeap"]
keywords: ["闪跃机场", "闪跃 IPLC 专线套餐与优惠码 shanyue", "FlashLeap机场"]
author: "AI解锁网络服务研究组"
sources: ["raw-data/32家机场品牌清单.txt", "data/brands.json"]
verifiedAt: "2026-10-19"
entity: "shanyue"
intent: "navigational"
pillar: "brands"
related: ["/reviews/shanyue/", "/brands/yinxingren/", "/network/iplc/", "/airport/easy-to-use/"]
draft: false
---

# 闪跃（shanyue / FlashLeap）品牌档案与核心参数

闪跃（英文名 `FlashLeap`，slug `shanyue`）在 本站品牌参数核验数据库 中商业顺位第 20 位，研究评分 `44 / 100`（资料完整度 18/30、协议与线路清晰度 8/20、实测证据可用性 0/25、套餐与定价弹性 12/15、风险与局限透明度 6/10）。其主打定位是偏高端的「纯 IPLC 专线 + 专属客户端免订阅」，但因为缺乏独立测速截图且底层协议未标注，研究评分显著低于具备 2026-08-11 实测图的品牌。

<BrandSnapshot slug="shanyue" />

## 1. 运营资料与技术规格总表

| 评估维度 | 记录内容 | 数据状态 |
|---|---|---|
| 英文关联名 / 成立年份 | FlashLeap；成立年份未收录 | `[品牌资料 Vendor Claimed]` / `[待核实 Pending Verification]` |
| 线路架构 | 纯 IPLC 专线、骨干网接入 | `[品牌资料 Vendor Claimed]` |
| 协议类型 | 原文未标注 | `[待核实 Pending Verification]` |
| 客户端模式 | 专属客户端，下载登录即用（不提供订阅链接） | `[品牌资料 Vendor Claimed]` |
| 节点地区 | 香港、台湾、新加坡、日本、美国 | `[品牌资料 Vendor Claimed]` |
| 设备限制与倍率 | 设备数量限制、流量倍率与支付方式均未标注 | `[待核实 Pending Verification]` |
| 起步价格 | 年付版 ¥96/年（¥8/月，60GB/月）；月付闪动 ¥24/月起 | `[品牌资料 Vendor Claimed]` |
| 优惠码 | `shanyue`（8 折，**仅限闪动/飞跃/瞬移/跃迁，年付版不适用**） | `[商业信息 Commercial]` |

## 2. 套餐定价与 8 折实际成本核算

<PlanComparison slug="shanyue" />

闪跃的优惠码 `shanyue` 限制规则在 32 家品牌中写得相当明确：`8 折` 仅适用于月付四档，**年付版（¥96/年）不参与折扣** `[商业信息 Commercial]`。按 8 折折算后的月付真实成本如下：
- **闪跃年付版**：¥96/年（折合 ¥8.00/月，60GB/月，无折扣，约 **¥0.133/GB**）。
- **闪动 (Flicker)**：原价 ¥24/月，8 折后 **¥19.20/月**（150GB/月，折后约 **¥0.128/GB**——单 GB 成本反而低于年付版）。
- **飞跃 (Leap)**：原价 ¥44/月，8 折后 **¥35.20/月**（300GB/月，折后约 **¥0.117/GB**）。
- **瞬移 (Teleport)**：原价 ¥84/月，8 折后 **¥67.20/月**（600GB/月，折后约 **¥0.112/GB**）。
- **跃迁 (Warp)**：原价 ¥134/月，8 折后 **¥107.20/月**（1000GB/月，折后约 **¥0.107/GB**）。

## 3. 线路网络与 AI/流媒体声明

<NetworkTopology slug="shanyue" />

<UnlockMatrix slug="shanyue" />

关于解锁与测速，需严格区分来源性质：
- **厂商解锁口径** `[品牌资料 Vendor Claimed]`：宣称原生 IP 解锁 Netflix、Disney+、HBO Max、YouTube、TikTok、Spotify，并支持 ChatGPT 与 Claude；但 **Gemini 存在口径冲突**——核心特色写「支持 ChatGPT、Claude、Gemini」，而解锁列表把 Gemini 归为「视节点而定」。
- **实测证据缺口** `[待核实 Pending Verification]`：闪跃**没有** 2026-08-11 批次的独立测速截图，仅有 2026-10-19 品牌资料附带的非晚高峰参考测速（香港 23ms / 548Mbps、台湾 38ms / 110Mbps、新加坡 44ms / 383Mbps、日本 53ms / 144Mbps、美国 143ms / 18Mbps），属于厂商参考数据，不可当作本站实测。

## 4. 关键风险与待核实项

1. **零独立实测证据**：未纳入 《2026-08-11 节点测速原始图像校验清单》 实测批，晚高峰实际稳定性与原生 IP 真伪尚待独立检验。
2. **协议与设备数未披露**：未说明自研客户端底层使用的代理协议，也未明示设备同时在线数量上限。
3. **无第三方订阅链接**：无法导入 Clash 或 Shadowrocket。

## 5. 官方入口与延伸阅读

- **深度评测报告**：[闪跃深度评测：纯 IPLC 专线与专属客户端体验评估](/reviews/shanyue/)
- **关联对比与专题**：[隐形人档案](/brands/yinxingren/) · [IPLC 国际专线解析](/network/iplc/) · [免配置新手机场汇总](/airport/easy-to-use/)

> **待补充研究任务**：核实闪跃开业年份、客户端支持系统清单、设备在线数限制及底层协议；补充晚高峰独立测速与 AI/流媒体逐项验证。
