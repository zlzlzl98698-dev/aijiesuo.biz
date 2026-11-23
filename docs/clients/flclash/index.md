---
title: "FlClash 下载与特性：跨平台轻量 Mihomo 客户端"
description: "介绍基于 Flutter 与 Mihomo 内核的 FlClash 客户端，覆盖 Win/Android/Mac/Linux 界面特色、分流与选型差异。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "FlClash"
  - "Mihomo"
  - "跨平台客户端"
  - "Android 客户端"
keywords:
  - "FlClash"
  - "FlClash 下载"
  - "FlClash 跨平台 Mihomo 客户端"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "FlClash"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/clash-verge-rev/"
  - "/clients/clash-meta/"
  - "/clients/mihomo/"
  - "/clients/windows/"
  - "/clients/android/"
  - "/clients/macos/"
  - "/clients/linux/"
draft: false
answerFirst: "FlClash 是基于 Flutter 框架与 Mihomo 内核构建的免费开源多平台客户端，原生覆盖 Windows、Android、macOS 和 Linux。它的核心优势是界面极简直观、桌面端与安卓端操作逻辑高度统一，非常适合不希望研究复杂脚本覆写、只想稳定导入 Clash 订阅的新手与跨设备用户。"
---

# FlClash：跨桌面与安卓的轻量 Mihomo 客户端

::: tip 核心结论（Answer-First）
**FlClash** 在功能定位上走的是“轻量统一”路线：底层搭载成熟的 **[Mihomo 内核](/clients/mihomo/)**，前端采用跨平台 UI 实现 **Windows、Android、macOS（区分 Intel 与 Apple Silicon）与 Linux** 四端一致体验。如果你觉得桌面端 [Clash Verge Rev](/clients/clash-verge-rev/) 设置项偏多，或者希望手机安卓端与电脑端保持一模一样的配置操作，FlClash 是非常顺手的免费开源选择。
:::

## 一、软件属性与支持平台

| 属性项 | 核验信息 |
|---|---|
| **开源发布** | GitHub 官方开源仓库（免费开源） |
| **支持平台** | Windows、Android、macOS（提供 Intel 与 Apple Silicon 架构安装包）、Linux（多种打包格式） |
| **底层核心** | Mihomo（Clash.Meta） |
| **主要特点** | 界面简洁、标准 Clash 订阅直导、规则分流、支持 TUN/VPN 模式 |

## 二、核心优势与适用边界

1. **四端统一的交互体验**：在 Windows、macOS、Linux 和 Android 上共用同一套设计语言（支持仪表盘流量统计、延迟测试、配置导入与分流模式切换），换设备几乎零重新学习成本。
2. **完整的 Mihomo 协议兼容性**：无需转换即可直接导入主流机场的 Clash/Mihomo 订阅，支持 `VLESS Reality`、`Hysteria 2`、`Shadowsocks`、`VMess`、`Trojan` 等协议。
3. **边界与取舍**：相比 [Clash Verge Rev](/clients/clash-verge-rev/) 丰富的全局 JavaScript 脚本覆写（Script/Merge）或 [Clash Nyanpasu](/clients/clash-nyanpasu/) 的多核心切换面板，FlClash 刻意减少了高阶定制开关以换取轻量化，因此更适合依赖机场预设规则或简单规则模式的用户。

## 三、协议与传输层兼容明细表

FlClash 在 Windows、Android、macOS 与 Linux 四大平台统一内置主线 **Mihomo（Clash.Meta）内核**，无需用户单独下载内核二进制文件即可直接解析现代 Clash Meta YAML 配置：

| 协议 / 传输层 | FlClash (Mihomo 核心) 支持状态 | 四端运行与配置要点 |
|---|---|---|
| **VLESS Reality / XTLS-RPRX-Vision** | 完整原生支持 | 原生解析 `flow: xtls-rprx-vision`、`reality-opts` 与 `client-fingerprint`；桌面端与安卓端共享同一套 YAML 语法，零转换损耗。 |
| **Hysteria 2** | 完整原生支持 | 支持 QUIC 传输、端口跳跃（`ports: 20000-40000`）与 Brutal 带宽声明（`up` / `down`）；在 Android 移动蜂窝网络下抗丢包表现突出。 |
| **Trojan (TCP / WS / gRPC)** | 完整原生支持 | 完整支持 TLS 指纹伪装（`utls`）与 `smux` 多路复用，适合稳定的专线机场日常使用。 |
| **Shadowsocks-2022** | 完整原生支持 | 原生支持 `2022-blake3-aes-128-gcm`、`2022-blake3-aes-256-gcm`、`2022-blake3-chacha20-poly1305` 与 UDP 转发。 |
| **AnyTLS** | 完整原生支持（需新版 FlClash） | 跟随内置 Mihomo 核心升级支持 AnyTLS 协议；若旧版 FlClash 导入时报未知协议类型，直接升级客户端至最新 Release 即可。 |
| **WireGuard** | 完整原生支持 | 支持读取 Clash YAML 中的 `type: wireguard` 节点，并可在 TUN/VPN 模式下与其他协议节点无缝编组。 |
| **TUIC v5** | 完整原生支持 | 支持 `congestion-controller: bbr` 与 `udp-relay-mode: native/quic`，适合低延迟高并发请求。 |

## 四、核心配置策略与 AI/流媒体分流覆写片段

虽然 FlClash 主打极简交互，但它依然在「配置（Profiles）→ 覆写（Override）/ 自定义规则」以及内置的 DNS 面板中保留了关键的工程控制能力。通过配置覆写，可以在不破坏机场远程订阅定时更新的前提下，为桌面端和安卓手机统一注入 AI 专属分流规则与防 DNS 泄漏策略：

```yaml
# FlClash 跨平台配置覆写（Override）推荐片段：AI 分流与 Fake-IP 防泄漏
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "+.lan"
    - "+.local"
    - "+.msftconnecttest.com"
    - "localhost.ptlogin2.qq.com"
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  proxy-server-nameserver:
    - https://223.5.5.5/dns-query
  nameserver-policy:
    "geosite:cn,private":
      - https://dns.alidns.com/dns-query

# 置顶注入 AI 核心域名规则，确保命中纯净解锁策略组或指定节点
rules:
  - DOMAIN-SUFFIX,chatgpt.com,AI-解锁组
  - DOMAIN-SUFFIX,openai.com,AI-解锁组
  - DOMAIN-SUFFIX,oaistatic.com,AI-解锁组
  - DOMAIN-SUFFIX,oaiusercontent.com,AI-解锁组
  - DOMAIN-SUFFIX,claude.ai,AI-解锁组
  - DOMAIN-SUFFIX,anthropic.com,AI-解锁组
  - GEOSITE,openai,AI-解锁组
  - GEOSITE,anthropic,AI-解锁组
  - GEOSITE,google-gemini,AI-解锁组
```

**跨端 TUN / VPN 与分应用代理联动建议**：
- **桌面端（Win/Mac/Linux）**：在仪表盘直接开启 **TUN（虚拟网卡）** 开关，即可接管终端命令行（Claude Code / Cursor / Git）与非系统代理应用的全部流量，推荐将 `stack` 设为 `mixed`（兼顾 TCP 吞吐与 UDP 兼容性）。
- **安卓端（Android）**：在 FlClash「访问控制（Access Control）」中开启**分应用代理**，把国内银行、微信、支付宝及地图导航排除在 VPN 隧道之外，既防止国内 App 检测代理环境，又能避免 Fake-IP 影响局域网投屏。

## 五、高频故障诊断与排查速查表

| 故障报错现象 | 核心根因分析 | FlClash 针对性修复动作 |
|---|---|---|
| macOS 下载安装后双击提示 `“FlClash.app”已损坏，无法打开。你应该将它移到废纸篓` 或架构报错 | macOS Gatekeeper 拦截了未公证的开源应用，或 Apple Silicon（M1/M2/M3/M4）Mac 误下载了 `x64` 安装包 | 先确认芯片架构并下载对应的 `arm64.dmg`（M 系芯片）或 `x64.dmg`（Intel）；随后在终端执行 `sudo xattr -r -d com.apple.quarantine /Applications/FlClash.app` 解除隔离属性。 |
| Windows / Linux 开启 TUN 模式时开关无法打开，或报错 `TUN permission denied / Wintun failed` | 桌面端创建 TUN 虚拟网卡需要管理员（Administrator）或 `root / cap_net_admin` 权限 | Windows 端右键 FlClash 图标选择「以管理员身份运行」或在设置中开启管理员自启；Linux 端为内核二进制赋予权限 `sudo setcap cap_net_admin,cap_net_bind_service=+ep` 或启用服务模式。 |
| 导入机场链接时提示 `Failed to parse config: yaml: line 1: did not find expected key` | 导入的不是 Clash YAML 订阅，而是 Base64 编码的通用 V2Ray 节点列表，或机场返回了 Cloudflare 拦截 HTML 页面 | 登录机场面板复制明确标注为 **Clash / Clash Meta / Mihomo** 的订阅链接；若因网络阻断拉取失败，可先在浏览器下载 `.yaml` 配置文件再通过 FlClash「本地文件」导入。 |
| Android 端切到后台或锁屏几分钟后，再次打开 ChatGPT 提示网络中断，需切回 FlClash 界面才恢复 | 安卓系统省电策略限制了 Flutter 后台进程与 VPNService 的唤醒锁 | 在 FlClash 设置中开启「后台保活 / 静默通知栏常驻」，并进入手机系统「设置 → 电池 → FlClash」将其设为**「无限制（Unrestricted）」**。 |

## 六、各系统安装与架构提醒

- **macOS 注意区分芯片架构**：FlClash 的 GitHub Release 明确提供对应 **Apple Silicon（`arm64`）** 与 **Intel（`x64`）** 的独立安装包，下载前请先核实本机芯片型号（详见 [macOS 代理客户端指南](/clients/macos/)）。
- **Android 端替代地位**：在原版 Clash for Android 停更后，FlClash 与 [Clash Meta for Android](/clients/clash-meta/) 共同承担了安卓端 Clash YAML 订阅的主力入口（详见 [Android 安卓代理客户端指南](/clients/android/)）。
- **Windows / Linux 桌面端**：按需选择对应系统的安装包或便携包即可（详见 [Windows 客户端](/clients/windows/) 与 [Linux 客户端](/clients/linux/)）。

## 七、常见问题（FAQ）

### FlClash 和 Clash Verge Rev 在电脑上怎么选？
如果只是常规导入机场订阅、切换香港/新加坡/美国节点、偶尔开一下 TUN 模式访问终端或 AI 工具，FlClash 上手更轻快；如果你需要自己写复杂规则覆写脚本、管理多个本地配置合并，Clash Verge Rev 更强。

### FlClash 支持苹果 iPhone（iOS）吗？
根据本库整理资料，FlClash 的核心覆盖范围集中在 Windows、Android、macOS 与 Linux 四大平台；iOS 端用户建议从 [iOS 苹果代理客户端指南](/clients/ios/) 中选择 Shadowrocket、Stash、Hiddify 或 Karing。

### 如何在电脑端和安卓手机端之间快速同步 FlClash 的订阅与设置？
FlClash 内置了完整的 **WebDAV 云同步与本地备份恢复（Backup & Restore）** 功能。你可以在坚果云或自建 Nextcloud/Alist 上开启 WebDAV，在电脑端 FlClash「设置 → 备份与同步」中填入 WebDAV 地址并上传配置，随后在安卓手机端一键拉取恢复，即可让双端订阅、自定义规则与分流设置完全同步。

### FlClash 安卓版和 Clash Meta for Android（CMFA）有什么区别？
两者底层都运行 Mihomo 内核、对机场订阅的兼容性一致；区别在于 CMFA 采用传统 Android 原生界面且已进入维护收尾阶段，而 **FlClash** 采用现代化的 Material You 跨平台卡片设计，持续活跃迭代，并且支持仪表盘实时折线图、多列节点流式布局与桌面端无缝衔接。

## 八、同类替代与相关链接

- **同内核桌面首选**：[Clash Verge Rev](/clients/clash-verge-rev/) · [Clash Nyanpasu](/clients/clash-nyanpasu/)
- **同生态安卓工具**：[Clash Meta for Android](/clients/clash-meta/) · [Hiddify](/clients/hiddify/)
- **实操教程**：[机场订阅导入教程](/tutorials/subscription/) · [国内外规则分流设置](/tutorials/routing/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
