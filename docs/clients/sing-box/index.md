---
title: "sing-box 客户端：核心与 SFA/SFI/SFM"
description: "解析 sing-box 内核与官方端（Android SFA、iOS SFI、macOS SFM），对比 Hiddify、Karing、NekoBox 等衍生端差异。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "sing-box"
  - "SFA"
  - "SFI"
  - "SFM"
  - "代理内核"
keywords:
  - "sing-box 客户端"
  - "sing-box SFA SFI SFM 官方端"
  - "sing-box 原生配置定位"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "sing-box"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/mihomo/"
  - "/clients/hiddify/"
  - "/clients/karing/"
  - "/clients/nekobox/"
  - "/clients/android/"
  - "/clients/ios/"
  - "/clients/macos/"
  - "/clients/openwrt/"
draft: false
answerFirst: "sing-box 是开源通用网络代理平台内核，并由官方直接维护覆盖 Android（SFA）、iOS/tvOS（SFI）、macOS（SFM）及桌面环境的原生图形客户端。官方端主要面向原生 sing-box JSON 配置文件，界面极简且功能贴合底层；普通机场新手若只有传统 Clash 或 Base64 订阅，往往更适合使用基于 sing-box 封装的 Hiddify 或 Karing。"
---

# sing-box 核心与官方原生客户端（SFA / SFI / SFM）解析

::: tip 核心结论（Answer-First）
**sing-box** 既是与 [Mihomo](/clients/mihomo/) 并列的现代开源代理内核，也拥有官方亲自开发的原生图形应用矩阵：**SFA**（sing-box for Android）、**SFI**（sing-box for iOS）和 **SFM**（sing-box for macOS）以及桌面端方向。官方客户端设计克制、协议规范严格，**最适合直接使用原生 sing-box JSON 配置文件的进阶用户**；普通用户若追求一键导入多种第三方机场订阅，可选用同样基于 sing-box 内核的 [Hiddify](/clients/hiddify/) 或 [Karing](/clients/karing/)。
:::

## 一、sing-box 官方客户端家族清单

| 官方端简称 | 适用平台 | 获取渠道（依据资料标注） | 核心定位 |
|---|---|---|---|
| **SFA**（sing-box for Android） | Android | 官方文档 / GitHub / Google Play | 官方安卓客户端，加载原生 sing-box JSON 与远程 Profile |
| **SFI**（sing-box for iOS） | iOS / iPadOS / tvOS | App Store / 官方文档（免费开源） | iOS 生态少有的免费开源原生客户端，支持系统级 TUN 接管 |
| **SFM**（sing-box for macOS） | macOS | 官方文档 / App Store | macOS 原生客户端，贴合苹果系统网络扩展机制 |
| **sing-box for Desktop** | Linux / 桌面方向 | 官方文档 | 面向桌面与服务端统一生态的原生客户端方向 |

## 二、原生配置结构与机场订阅兼容性

新手最常踩的坑，是把机场给的“Clash YAML 订阅链接”或“通用 Base64 节点链接”直接粘贴进官方 SFA/SFI 客户端并提示解析失败：

1. **只认原生 sing-box JSON（Profile）**：官方 SFA/SFI/SFM 客户端直接读取 JSON 格式的 `inbound / outbound / route / dns` 配置结构，不像 Hiddify 或 Karing 那样在前端内置了多种第三方订阅格式的自动转换器。
2. **何时能直接用官方端**：当你订阅的机场面板本身就提供了“sing-box 订阅链接”，或者你通过可信订阅转换后端将节点生成了标准 sing-box JSON 配置时，即可在官方客户端中导入远程配置文件 URL（Remote Profile）并定时更新。
3. **协议前瞻性**：sing-box 对 `VLESS Reality`、`Hysteria 2`、`TUIC`、`NaiveProxy`、`ShadowTLS` 与 `WireGuard` 出站链式代理等新协议支持非常迅速，内存控制表现优异。

## 三、sing-box 内核协议栈与加密传输支持矩阵

作为用 Go 语言从零设计的现代化通用代理平台，sing-box 在协议规范性、内存控制（尤其适配 iOS SFI 的 50MB Network Extension 限制）与路由动作（Rule Actions）上具有极高的工程标准：

| 协议 / 核心机制 | sing-box 支持状态 | 关键 JSON 字段要求与内核实现机制 |
|---|---|---|
| **VLESS Reality** | 原生完整支持 | 出站 `"type": "vless"`，支持 `"flow": "xtls-rprx-vision"`，并在 `"tls"` 对象中配置 `"reality": { "enabled": true, "public_key": "...", "short_id": "..." }` 与 `"utls": { "enabled": true, "fingerprint": "chrome" }`。 |
| **Hysteria 2 (UDP QUIC)** | 原生完整支持 | 出站 `"type": "hysteria2"`，支持 `"up_mbps"` / `"down_mbps"` 速率协商、`"obfs": { "type": "salamander", "password": "..." }` 以及 `"server_ports"` 端口跳跃范围。 |
| **Shadowsocks-2022 / Trojan** | 原生完整支持 | 完整实现 SIP022 AEAD-2022（`2022-blake3-aes-128-gcm` 等）、Multi-PSK 与 `udp_over_tcp`；Trojan 与 VMess 均支持 `"multiplex"`（`h2mux` / `smux` / `yamux`）多路复用与 `v2ray-plugin` / `ws` / `grpc` 传输层。 |
| **TUIC v5 / AnyTLS / ShadowTLS v3** | 原生完整支持 | 原生内置 `tuic`、`anytls`、`shadowtls`（v1/v2/v3）、`naive`（仅特定构建）与 `wireguard` Endpoint，并支持通过 `"detour"` 字段将任意出站节点串联为链式代理。 |
| **Fake-IP 与 Route Action 嗅探** | 现代动作化架构 | 在 sing-box 1.11+ 中，传统入站嗅探与 DNS 劫持统一收敛为 `route.rules` 中的规则动作：`"action": "sniff"` 与 `"action": "hijack-dns"`，配合 `fakeip` DNS 服务器实现零泄漏分流。 |
| **SRS 二进制规则集** | 独占高压缩规则集 | 弃用庞大的旧版 `geoip.db` / `geosite.db`，全面转向按需加载的 `.srs`（sing-box rule-set）二进制流格式，在 iOS SFI 与 OpenWrt 上内存峰值可控制在 25MB~40MB 以内。 |

## 四、针对 ChatGPT / Claude / Gemini 的 sing-box JSON 分流配置模板

在 SFA / SFI / SFM 官方客户端或服务端使用 sing-box 时，推荐采用符合 **sing-box 1.11+ 现代规范（Rule Actions + SRS 规则集）** 的 JSON 结构，将 OpenAI、Claude 与 Gemini 流量强制绑定到非香港的纯净节点组，并在路由层阻断容易引发连接重置的 UDP 443（QUIC）请求：

```json
{
  "log": {
    "level": "warn",
    "timestamp": true
  },
  "dns": {
    "servers": [
      {
        "tag": "dns-remote",
        "address": "https://1.1.1.1/dns-query",
        "address_resolver": "dns-direct",
        "detour": "AI-Proxy"
      },
      {
        "tag": "dns-direct",
        "address": "https://223.5.5.5/dns-query",
        "detour": "direct"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns-direct"
      },
      {
        "rule_set": ["geosite-openai", "geosite-anthropic", "geosite-google-gemini"],
        "server": "dns-remote"
      },
      {
        "rule_set": "geosite-cn",
        "server": "dns-direct"
      }
    ],
    "final": "dns-remote",
    "strategy": "ipv4_only"
  },
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "address": ["172.19.0.1/30"],
      "auto_route": true,
      "strict_route": true,
      "stack": "mixed"
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "AI-Proxy",
      "outbounds": ["US-Node-01", "SG-Node-01", "JP-Node-01"],
      "default": "US-Node-01"
    },
    {
      "type": "direct",
      "tag": "direct"
    }
  ],
  "route": {
    "rules": [
      {
        "action": "sniff"
      },
      {
        "protocol": "dns",
        "action": "hijack-dns"
      },
      {
        "network": "udp",
        "port": 443,
        "rule_set": ["geosite-openai", "geosite-anthropic"],
        "action": "reject"
      },
      {
        "rule_set": ["geosite-openai", "geosite-anthropic", "geosite-google-gemini"],
        "outbound": "AI-Proxy"
      },
      {
        "rule_set": ["geosite-cn", "geoip-cn"],
        "outbound": "direct"
      }
    ],
    "rule_set": [
      {
        "tag": "geosite-openai",
        "type": "remote",
        "format": "binary",
        "url": "https://testingcf.jsdelivr.net/gh/SagerNet/sing-geosite@rule-set/geosite-openai.srs",
        "download_detour": "AI-Proxy"
      },
      {
        "tag": "geosite-anthropic",
        "type": "remote",
        "format": "binary",
        "url": "https://testingcf.jsdelivr.net/gh/SagerNet/sing-geosite@rule-set/geosite-anthropic.srs",
        "download_detour": "AI-Proxy"
      },
      {
        "tag": "geosite-google-gemini",
        "type": "remote",
        "format": "binary",
        "url": "https://testingcf.jsdelivr.net/gh/SagerNet/sing-geosite@rule-set/geosite-google-gemini.srs",
        "download_detour": "AI-Proxy"
      },
      {
        "tag": "geosite-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://testingcf.jsdelivr.net/gh/SagerNet/sing-geosite@rule-set/geosite-cn.srs",
        "download_detour": "AI-Proxy"
      },
      {
        "tag": "geoip-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://testingcf.jsdelivr.net/gh/SagerNet/sing-geoip@rule-set/geoip-cn.srs",
        "download_detour": "AI-Proxy"
      }
    ],
    "final": "AI-Proxy",
    "auto_detect_interface": true
  }
}
```

**验证步骤**：将配置保存并通过 `sing-box check -c config.json` 校验无语法报错后，在 SFA / SFI / SFM 的 **Dashboard（仪表盘）→ Groups** 中展开 `AI-Proxy`，手动确认当前选中的节点为美国或新加坡节点；随后在 `Connections` 页签查看 `chatgpt.com` 或 `claude.ai` 请求是否命中 `AI-Proxy` 出站。

## 五、官方原生端 vs 衍生客户端（Hiddify / Karing / NekoBox）

| 对比维度 | sing-box 官方端（SFA/SFI/SFM） | 衍生第三方客户端（Hiddify / Karing 等） |
|---|---|---|
| **订阅格式包容度** | 仅限原生 sing-box JSON 配置 | 支持 Clash YAML、Base64、单节点链接及 sing-box JSON 自动兼容 |
| **界面与上手难度** | 极简工程化界面，需理解 Profile 与出站规则 | 面向大众用户的图形向导与一键测速开关 |
| **新版本内核跟进** | 与 sing-box 主线版本同步最快 | 依赖衍生客户端作者适配升级内核版本 |
| **安全与维护风险** | 官方团队直接维护，纯净无多余商业封装 | 需留意各衍生项目维护状况（如 [NekoBox](/clients/nekobox/) 维护资源有限且需防范假冒包） |

## 六、sing-box 高频异常排查对照表

| 报错日志 / 异常现象 | 核心触发原因 | 核验与解决步骤 |
|---|---|---|
| **`geoip database is deprecated` 或 `inbound sniff is deprecated in 1.11+`** | 导入的机场 sing-box 订阅模板仍在使用已被官方废弃的旧版 `geoip` / `geosite` 字段与入站 `sniff` 语法 | 在机场后台切换支持 `sing-box 1.11 / 1.12+`（基于 `.srs` rule_set 与 route action）的新版订阅链接；或改用对旧格式容错率更高的 [Karing](/clients/karing/) / [Hiddify](/clients/hiddify/)。 |
| **`initialize rule-set [...]: context deadline exceeded` 启动卡死** | 首次启动下载 GitHub 上的 `.srs` 远程规则集时，因 `raw.githubusercontent.com` 被阻断且 `download_detour` 指向了直连或不可用节点 | 将 `rule_set` 中的 `url` 替换为国内可访问的 CDN 镜像地址，或确保 `download_detour` 指向一个默认可用的代理出站组。 |
| **`missing address_resolver in dns server` 或无限 DNS 解析循环** | 在 `dns.servers` 中使用了域名形式的 DoH（如 `https://dns.google/dns-query`），但未指定用哪个纯 IP DNS 去解析 `dns.google` 本身 | 将 DoH 地址直接改为纯 IP 形式（如 `https://1.1.1.1/dns-query` 和 `https://223.5.5.5/dns-query`），或显式添加 `"address_resolver": "dns-direct"`。 |
| **iOS 端 SFI 开启后无法打开 ChatGPT App，提示网络断开** | 配置文件开启了 IPv6 策略（如 `prefer_ipv6`），而机场节点不支持 IPv6 出站导致请求黑洞 | 在 JSON 配置的 `"dns"` 段显式设置 `"strategy": "ipv4_only"`，并在 `"inbounds"` 的 `tun` 配置中仅保留 IPv4 网段 `["172.19.0.1/30"]`。 |

## 七、跨平台安装与路由扩展

- **移动端与桌面入口**：各系统适配细节请参考 [Android 指南](/clients/android/)、[iOS 指南](/clients/ios/)、[macOS 指南](/clients/macos/) 与 [Linux 指南](/clients/linux/)。
- **OpenWrt 软路由生态**：在路由器侧，官方生态推崇的 **HomeProxy** 与主流插件 **[PassWall2](/clients/passwall2/)** 均内置或支持调用 sing-box 作为透明代理核心，详见 [OpenWrt 软路由代理插件对比](/clients/openwrt/)。

## 八、常见问题（FAQ）

### 我在 iPhone 上不想花钱买小火箭，能直接用免费的 sing-box（SFI）吗？
可以，SFI 是 iOS App Store 上极少数由核心官方团队直接维护、完全免费且无广告的原生开源客户端。但前提是你的机场后台直接提供 **sing-box 专用订阅链接**（或你会使用 Sub-Store / 订阅转换生成 sing-box JSON）。如果机场只提供 Clash YAML 或通用 Base64 链接，iOS 端更省心的免费选择是同为 sing-box 内核但自带格式转换的 [Hiddify](/clients/hiddify/) 或 [Karing](/clients/karing/)。

### 为什么我从机场复制的节点链接放进 sing-box 官方端无法导入？
sing-box 官方端（SFA/SFI/SFM）把自身严格定位为“配置文件执行引擎”，不内置单条 `ss://`、`vless://`、`hy2://` 分享链接解析器，也不直接读取 Clash YAML。它只接受完整的 sing-box JSON 配置文件（Local / Remote Profile）。若手头只有单条节点链接，请改用 [v2rayN](/clients/v2rayn/)、[v2rayNG](/clients/v2rayng/) 或 [Hiddify](/clients/hiddify/)。

### 为什么升级到新版 sing-box 后原来的 JSON 配置文件突然报错无法启动？
sing-box 对废弃语法的清理周期非常严格（通常历经 1~2 个大版本警告后即彻底移除旧字段，例如从 `geoip.db` 迁移至 `.srs` 规则集，以及在 1.11+ 将入站 `sniff`、特殊 `block/dns` 出站迁移至 `route.rules` 的 `action` 和 `endpoints`）。升级客户端前建议先阅读官方 Migration 迁移文档，或通知机场更新后端的 sing-box 订阅模板。

### sing-box 和 Mihomo（Clash.Meta）在底层性能与选型上有什么区别？
两者在吞吐性能、协议覆盖（VLESS Reality / Hysteria 2 / TUIC / AnyTLS）与抗封锁能力上处于同一梯队。核心区别在于生态习惯：如果你依赖成熟的机场图形化策略组、YAML 覆写与海量现成 Clash 教程，选 **Mihomo 系客户端**；如果你偏好严谨的 JSON 结构化编程、跨 iOS/Android/macOS/Linux 官方原生客户端一致性以及极致的内存占用控制，选 **sing-box**。

## 九、相关入口与信息来源

- **同内核生态**：[Hiddify](/clients/hiddify/) · [Karing](/clients/karing/) · [NekoBox](/clients/nekobox/) · [PassWall2](/clients/passwall2/)
- **实操教程**：[机场订阅导入教程](/tutorials/subscription/) · [DNS 防泄漏与分流配置](/tutorials/dns/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
