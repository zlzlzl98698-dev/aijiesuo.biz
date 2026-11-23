---
title: "Stash 客户端介绍：苹果生态 Clash 规则与策略组"
description: "介绍苹果生态代理客户端 Stash（iOS/iPadOS/macOS），解析其 Clash/Mihomo 规则兼容、策略组可视化与覆写（Override）能力。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "Stash"
  - "iOS 客户端"
  - "macOS 客户端"
  - "Clash 规则"
keywords:
  - "Stash 客户端"
  - "Stash iOS macOS 下载"
  - "Stash 规则覆写与策略组"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "Stash"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/ios/"
  - "/clients/macos/"
  - "/clients/shadowrocket/"
  - "/clients/quantumult-x/"
  - "/clients/surge/"
  - "/tutorials/clash/"
draft: false
answerFirst: "Stash 是面向 iOS、iPadOS、macOS 及 Apple TV 的商业规则代理客户端，核心定位是把 Clash / Mihomo 生态的 YAML 配置、策略组与覆写（Override）能力原生带到苹果生态中。它在美区等海外 App Store 显示为付费应用，适合桌面端已经熟悉 Clash 规则体系的苹果用户。"
---

# Stash：苹果生态 Clash 风格规则代理客户端

::: tip 核心结论（Answer-First）
如果你在 Windows 或 Mac 电脑端习惯使用 [Clash Verge Rev](/clients/clash-verge-rev/) 的 YAML 策略组、自动测速与脚本覆写，但在 iPhone 上觉得小火箭的配置文件格式与电脑端不统一，**Stash** 就是专门解决这一痛点的苹果生态工具。它在海外区 App Store 属于付费应用（具体价格与内购项以所属地区商店为准），原生支持 Clash 风格配置与覆写规则。
:::

## 一、软件属性与平台信息

| 属性项 | 核验信息 |
|---|---|
| **发布渠道** | 海外区 App Store（及对应 macOS/官网分发渠道，视平台而定） |
| **收费模式** | 付费应用（美区 App Store 显示为付费应用，具体售价与上架状态以所属地区为准） |
| **支持生态** | iOS / iPadOS / macOS（Apple 生态设备） |
| **规则兼容** | Clash / Mihomo 兼容规则体系 |
| **核心能力** | Clash 风格配置、策略组、配置覆写（Overrides）、请求面板与流量统计 |

## 二、核心特点与适用场景

1. **无缝承接机场 Clash 订阅**：绝大多数机场的“Clash 订阅链接”下发的就是带图标、分流组（如 AI 服务、流媒体、国内直连）的 YAML 文件。Stash 导入后可直接保留这些策略组结构，无需像其他软件那样重新做一次规则转换。
2. **强大的覆写（Override）功能**：允许在不改动机场远程订阅地址的情况下，在本地叠加覆写文件——例如强制把 `anthropic.com` 或 `openai.com` 插入到“美国节点”策略组最前方，防止订阅更新时自定义规则丢失。
3. **精致的苹果原生界面与网络视图**：支持查看实时连接数、DNS 解析记录、流量消耗统计与 Rule 命中详情，排错效率高于简易开关型客户端。

## 三、与其他 iOS 付费客户端对比

| 客户端 | 生态语法 | 强项定位 | 适合人群 |
|---|---|---|---|
| **Stash** | **Clash / Mihomo YAML** | 策略组、配置覆写、苹果全家桶 Clash 一致性 | 桌面端用 Clash、希望苹果设备沿用同一套规则的用户 |
| **[Shadowrocket](/clients/shadowrocket/)** | 自研多协议配置 | 价格相对亲民、单节点扫码快、中文教程最多 | 大众入门与日常稳定使用 |
| **[Quantumult X](/clients/quantumult-x/)** | 圈 X 专用配置 | HTTP 重写（Rewrite）、JS 脚本、极细粒度自定义 | 喜欢折腾重写脚本与去广告插件的玩家 |
| **[Surge](/clients/surge/)** | Surge 配置体系 | 行业标杆级网络调试、HTTPS 抓包、网关增强 | 工程师与重度调试需求 |

## 四、内核协议栈与加密传输支持矩阵

Stash 虽然是独立维护的 Apple 生态商业客户端，但在配置语法与协议栈上深度对齐 **[Mihomo（Clash.Meta）](/clients/mihomo/)** 规范，并针对 iOS Network Extension 的严格内存上限（通常为 50MB）做了专门的底层优化：

| 协议 / 机制 | Stash 支持状态 | 关键参数要求与 iOS/macOS 实现机制 |
|---|---|---|
| **VLESS Reality** | 原生支持 | 兼容 `flow: xtls-rprx-vision`、`reality-opts`（`public-key`、`short-id`）及 `client-fingerprint`（如 `chrome` / `ios`），无需转换即可直接读取机场 Meta 订阅。 |
| **Hysteria 2 (UDP QUIC)** | 原生支持 | 支持基于 QUIC 的 `hysteria2` 出站、`obfs: salamander` 混淆密码以及 `up` / `down` 带宽协商；在蜂窝移动网络（5G/4G）切换 Wi-Fi 时具备快速连接迁移能力。 |
| **Shadowsocks-2022 / Trojan** | 原生支持 | 完整支持 `2022-blake3-aes-128-gcm`、`2022-blake3-aes-256-gcm`、`2022-blake3-chacha20-poly1305` 与 UDP over TCP；Trojan 支持 `ws` / `grpc` 传输层与 TLS SNI 自定义。 |
| **TUIC v5 / WireGuard / Snell** | 原生支持 | 除支持 TUIC 与 WireGuard 链式出站外，还兼容苹果生态常见的私有协议与 HTTP/SOCKS5 代理链（`dialer-proxy`）。 |
| **Fake-IP 与 Sniff 域名嗅探** | 核心默认机制 | 基于 `enhanced-mode: fake-ip` 构建本地 `198.18.0.1/16` 映射池，并配合 TLS SNI / HTTP Host 嗅探，解决 iOS App 硬编码 IP 访问导致的分流失效与 DNS 污染问题。 |

## 五、针对 ChatGPT / Claude / Gemini 的 Stash 覆写（Override）模板

在 iPhone、iPad 或 Mac 上使用 ChatGPT 官方 App、Claude iOS 客户端及 Google Gemini 时，最常见的问题是机场默认订阅将 `openai.com` 归入包含香港节点的“自动测速组”，或者 iOS 系统的 Apple 私有中继 / QUIC 连接导致分流漏网。在 Stash 中，推荐通过**本地覆写（`.stoverride` 或 YAML Override）**固定 AI 专属策略组与防泄漏 DNS：

```yaml
name: "AI 解锁与防 DNS 泄漏覆写"
desc: "强制 ChatGPT / Claude / Gemini 走专属纯净节点并启用 Fake-IP 嗅探"

dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "+.apple.com"
    - "+.icloud.com"
    - "time.apple.com"
  nameserver:
    - https://223.5.5.5/dns-query
    - https://1.12.12.12/dns-query

sniffer:
  enable: true
  override-destination: true
  sniff:
    TLS:
      ports: [443, 8443]
    HTTP:
      ports: [80, 8080]

proxy-groups:
  - name: "AI-解锁专用"
    type: select
    proxies:
      - "美国专线-01"
      - "新加坡原生-01"
      - "日本原生-01"

rules:
  - DOMAIN-SUFFIX,openai.com,AI-解锁专用
  - DOMAIN-SUFFIX,chatgpt.com,AI-解锁专用
  - DOMAIN-SUFFIX,oaistatic.com,AI-解锁专用
  - DOMAIN-SUFFIX,oaiusercontent.com,AI-解锁专用
  - DOMAIN-SUFFIX,anthropic.com,AI-解锁专用
  - DOMAIN-SUFFIX,claude.ai,AI-解锁专用
  - DOMAIN-SUFFIX,gemini.google.com,AI-解锁专用
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-解锁专用
  - DOMAIN-KEYWORD,openai,AI-解锁专用
```

**验证步骤**：启用该覆写后，进入 Stash 底部的“日志 / 连接（Connections）”面板，打开 ChatGPT App 发送一条消息，确认 `ios.chat.openai.com` 或 `ab.chatgpt.com` 的命中规则显示为 `DOMAIN-SUFFIX,chatgpt.com` 且出站策略为 `AI-解锁专用`。

## 六、Stash 高频异常排查对照表

| 报错症状 / 异常现象 | 核心触发原因 | 核验与解决步骤 |
|---|---|---|
| **导入订阅后 VLESS Reality / Hysteria 2 节点不显示或提示 `Unsupported proxy type`** | 机场面板根据默认 UA 下发了剔除新协议的旧版原版 Clash 配置 | 在 Stash 订阅设置中修改请求 `User-Agent` 为 `Clash.Meta` 或 `Stash`，或在机场订阅链接末尾追加 `&flag=meta` 后点击手动更新。 |
| **iOS 端运行一段时间后 VPN 图标自动断开，需重新进入 App 启动** | 加载了超大体积的 `rule-providers` 或过多远程脚本，触发 iOS Network Extension 50MB 内存硬限制被系统强杀 | 精简外部规则集数量，优先使用 Stash 原生精简规则集（`domain` / `ipcidr` 行为模式），并关闭非必要的全量 MitM HTTPS 解密抓包。 |
| **ChatGPT 网页版正常，但 iOS ChatGPT 官方 App 提示 `Something went wrong` 或无法登录** | Apple 登录验证域名或 Firebase 鉴权域名被误分流至直连/污染 DNS，或节点 IP 被 Cloudflare 标记 | 1. 确认 `auth0.openai.com`、`appleid.apple.com` 及 `gstatic.com` 连通性正常；2. 切换至机场提供的住宅/原生解锁节点；3. 在覆写中开启 `sniffer` 防止纯 IP 请求漏出。 |
| **Apple TV 或 Mac 开启局域网透明网关后，部分国内智能家居断网** | Fake-IP 接管了不支持虚拟 IP 映射的物联网设备固定连接 | 在 Stash 的 `fake-ip-filter` 中加入对应智能家居域名后缀，或利用设备管理将物联网设备 MAC/IP 设为直连绕过（Bypass）。 |

## 七、下载与配置注意事项

- 购买前请先在海外区 App Store 确认设备支持范围及当地货币售价（部分平台版可能单独计费或包含内购，详见 [iOS 苹果代理客户端指南](/clients/ios/)）。
- 订阅导入与策略组、覆写通用思路可参考 [Clash 系配置进阶](/tutorials/clash/) 与 [国内外规则分流设置](/tutorials/routing/)。

## 八、常见问题（FAQ）

### 已经买了 Shadowrocket，还有必要再买 Stash 吗？
如果小火箭已经能正常导入你的机场订阅并稳定分流，日常完全没有必要重复消费购买 Stash；只有在你明确需要与桌面 [Clash Verge Rev](/clients/clash-verge-rev/) 维持相同 YAML 覆写逻辑、依赖多级策略组自动容灾，或需要在 Apple TV / Mac / iPhone 上同步同一套 Clash 配置文件时才值得增购。

### Stash 支持 Mihomo 的 VLESS Reality 和 Hysteria 2 吗？
是的，Stash 持续跟进 Mihomo（Clash.Meta）现代协议栈，原生支持 `VLESS Reality`（含 `xtls-rprx-vision`）、`Hysteria 2`、`TUIC` 以及 `Shadowsocks-2022`。导入订阅时请确保使用的是机场的“Clash Meta / Mihomo / Stash”订阅链接，而非仅包含旧版 SS/SSR 的传统链接。

### 如何在 Stash 中保证机场订阅更新时不覆盖我自己加的 AI 规则？
切勿直接编辑下载下来的远程订阅主文件。正确做法是使用 Stash 的**覆写（Overrides）**功能：新建一个本地覆写配置，通过 `rules:` 或脚本将 `chatgpt.com`、`claude.ai` 等规则追加到规则列表最前端，并挂载到对应的远程订阅上，这样每次自动更新订阅都会自动重新合并。

### Stash 开启 MitM（HTTPS 解密）后部分银行或 Google 服务报证书错误怎么办？
HTTPS 解密仅在需要运行去广告重写（Rewrite）或网络抓包调试时才需开启。日常仅用于访问 AI 工具与海外流媒体时，建议保持 **MitM 关闭**；若确需开启，请仅在 `MitM Hostname` 白名单中填入目标重写域名，切勿配置通配符 `*` 解密所有流量。

## 九、同类替代与相关链接

- **iOS 生态**：[Shadowrocket](/clients/shadowrocket/) · [Quantumult X](/clients/quantumult-x/) · [Surge](/clients/surge/) · [Hiddify](/clients/hiddify/)
- **实操教程**：[Clash 系配置进阶](/tutorials/clash/) · [iOS 机场配置教程](/tutorials/ios/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
