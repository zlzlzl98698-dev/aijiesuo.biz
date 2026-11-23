---
title: "Clash Verge Rev 桌面客户端指南"
description: "介绍开源跨平台客户端 Clash Verge Rev（基于 Mihomo 内核），涵盖支持系统、TUN 模式、规则覆写及与 Mihomo Party 选型边界。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "Clash Verge Rev"
  - "Mihomo"
  - "TUN 模式"
  - "跨平台客户端"
keywords:
  - "Clash Verge Rev"
  - "Clash Verge Rev 下载"
  - "Clash Verge Rev 和 Mihomo Party 怎么选"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "Clash Verge Rev"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/windows/"
  - "/clients/macos/"
  - "/clients/linux/"
  - "/clients/mihomo/"
  - "/clients/flclash/"
  - "/tutorials/clash/"
  - "/tutorials/windows/"
  - "/risk/alternatives/"
draft: false
answerFirst: "Clash Verge Rev 是目前 Windows、macOS 与 Linux 桌面端生态最成熟的开源 Mihomo（原 Clash.Meta）图形客户端，具备系统服务模式、TUN 虚拟网卡、全局合并覆写（Merge/Script）与多订阅管理能力，是原 Clash for Windows 停更后最推荐的桌面主力替代。"
---

# Clash Verge Rev：跨平台 Mihomo 桌面客户端解析

::: tip 核心结论（Answer-First）
**Clash Verge Rev** 是基于 **Mihomo 内核**构建的免费开源桌面客户端，原生覆盖 Windows、macOS（区分 Intel 与 Apple Silicon）及 Linux。它集成了订阅管理、规则分流、脚本覆写（Extend Script/Merge）与稳定可控的 TUN 服务模式；与历史项目 Mihomo Party 相比，选择桌面主力前务必自行核实 GitHub 仓库最新维护状态，避免使用维护停滞的分支。
:::

## 一、软件基础属性与项目归属

| 属性项 | 核验信息 |
|---|---|
| **官方定位** | 跨平台桌面级代理图形客户端（基于 Tauri + Mihomo 内核） |
| **开源/发布渠道** | GitHub 官方开源发布页（免费开源） |
| **支持操作系统** | Windows（x64 / arm64）、macOS（Apple Silicon `arm64` / Intel `x64`）、Linux（DEB / RPM / AppImage） |
| **底层核心** | [Mihomo 内核](/clients/mihomo/)（原 Clash.Meta） |
| **维护状态** | 社区活跃维护中；下载时须认准官方 GitHub 仓库 Release 页面，防范第三方打包镜像站 |

## 二、核心能力与适用人群

1. **完整订阅与策略组管理**：支持导入标准 Clash YAML 订阅并自动定时更新，内置延迟测速（URL-Test）与手动节点切换视图。
2. **服务模式（Service Mode）与 TUN**：可在 Windows/macOS/Linux 上安全安装系统辅助服务，从而在不始终以管理员权限运行主界面的前提下，稳定开启 [TUN 虚拟网卡模式](/tutorials/tun/)。
3. **规则与配置覆写（Profiles Enhancement）**：允许用户通过 `Merge`（YAML 合并）或 JavaScript 脚本为第三方机场订阅动态注入自定义规则（例如强制指定 OpenAI/Claude 走美国或新加坡节点），而不会在下次更新订阅时被覆盖。

## 三、安装与系统选择入口（不重复平台步骤）

不同操作系统在架构与包格式上存在严格区别，请在对应系统中心页确认架构后下载：
- **Windows 用户**：核对 `x64` 与 `arm64` 安装包，详见 [Windows 机场客户端指南](/clients/windows/) 与 [Windows 新手配置流程](/tutorials/windows/)。
- **macOS 用户**：务必区分 Apple Silicon（`aarch64`/`arm64`）与 Intel（`x64`）包，详见 [macOS 代理客户端指南](/clients/macos/)。
- **Linux 用户**：按发行版选用 `.deb`、`.rpm` 或 `.AppImage`，详见 [Linux 代理客户端指南](/clients/linux/)。

## 四、内置 Mihomo 协议栈与加密传输支持矩阵

Clash Verge Rev 默认捆绑最新稳定版（并支持一键切换 Alpha 预览版）**[Mihomo 内核](/clients/mihomo/)**，因此在传输协议、虚拟网卡栈与域名嗅探上具备完整的现代代理能力：

| 协议 / 机制 | Clash Verge Rev 支持度 | 关键参数要求与桌面端实现机制 |
|---|---|---|
| **VLESS Reality** | 原生完整支持 | 支持 `flow: xtls-rprx-vision`、`reality-opts`（`public-key` / `short-id`）与 `client-fingerprint`（如 `chrome` / `firefox`）；要求订阅链接拉取的是 Meta/Mihomo 格式 YAML。 |
| **Hysteria 2 (UDP QUIC)** | 原生完整支持 | 支持 `type: hysteria2`、`obfs: salamander`、多端口跳跃（`ports: 20000-50000`）与 `up` / `down` 带宽声明，适合跨洋高丢包晚高峰下的 AI 流式对话。 |
| **Shadowsocks-2022 / Trojan** | 原生完整支持 | 兼容 `2022-blake3-aes-128-gcm` / `2022-blake3-aes-256-gcm` 及 `udp-over-tcp`；Trojan 完整支持 WebSocket、gRPC 及 TLS ALPN / SNI 伪装。 |
| **TUIC v5 / AnyTLS / SSH** | 原生完整支持 | 支持 TUIC v5 的 `bbr` 拥塞控制、`AnyTLS` 新型抗特征传输以及 `dialer-proxy`（前置机场节点 + 后置静态住宅 Socks5 落地 IP 的链式代理）。 |
| **Fake-IP 与 Sniff 域名嗅探** | 核心默认机制 | 开启 **TUN（虚拟网卡）模式**后，可选择 `System`、`gVisor` 或 `Mixed` 协议栈，通过 `fake-ip`（`198.18.0.1/16`）与 `sniffer` 嗅探接管全系统所有命令行与桌面进程。 |

## 五、针对 ChatGPT / Claude / Gemini 的全局扩展覆写（Merge）模板

在桌面端使用 ChatGPT、Claude 或 Google Gemini（包括 Cursor、Claude Code 等开发工具）时，若直接编辑机场订阅文件，下次订阅自动更新时所有修改都会被冲掉。Clash Verge Rev 最强大的工程特性是**订阅 → 右键新建“全局扩展配置（Merge）”**，只需将以下 YAML 填入并右键“启用”，即可永久将 AI 规则置顶插入到所有机场订阅之前：

```yaml
# Clash Verge Rev 全局扩展配置 (Merge)：置于订阅规则最前方 (prepend)
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
  nameserver:
    - https://223.5.5.5/dns-query
    - https://1.12.12.12/dns-query

sniffer:
  enable: true
  force-dns-mapping: true
  parse-pure-ip: true
  override-destination: true
  sniff:
    TLS:
      ports: [443, 8443]
    HTTP:
      ports: [80, 8080-8880]

prepend-proxy-groups:
  - name: "AI-解锁专线"
    type: select
    include-all: true
    filter: "(?i)(美国|US|United States|新加坡|SG|Singapore|日本|JP|Japan)"
    exclude-filter: "(?i)(香港|HK|Hong Kong|俄罗斯|RU|倍率.*[5-9])"

prepend-rules:
  - AND,((NETWORK,udp),(DST-PORT,443),(DOMAIN-SUFFIX,chatgpt.com)),REJECT
  - AND,((NETWORK,udp),(DST-PORT,443),(DOMAIN-SUFFIX,claude.ai)),REJECT
  - DOMAIN-SUFFIX,openai.com,AI-解锁专线
  - DOMAIN-SUFFIX,chatgpt.com,AI-解锁专线
  - DOMAIN-SUFFIX,oaistatic.com,AI-解锁专线
  - DOMAIN-SUFFIX,oaiusercontent.com,AI-解锁专线
  - DOMAIN-SUFFIX,anthropic.com,AI-解锁专线
  - DOMAIN-SUFFIX,claude.ai,AI-解锁专线
  - DOMAIN-SUFFIX,gemini.google.com,AI-解锁专线
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-解锁专线
  - DOMAIN-SUFFIX,aistudio.google.com,AI-解锁专线
  - DOMAIN-SUFFIX,cursor.sh,AI-解锁专线
```

**验证步骤**：启用该全局 Merge 配置后，切到 Clash Verge Rev 左侧的“代理”页签，即可在最顶部看到自动筛选出美/日/新节点且剔除了香港节点的 **`AI-解锁专线`** 策略组；再切到“连接”页签访问 `chatgpt.com`，可实时看到流量命中了 `AI-解锁专线`。

## 六、Clash Verge Rev 高频异常排查对照表

| 报错症状 / 异常现象 | 核心触发原因 | 核验与解决步骤 |
|---|---|---|
| **打开 TUN（虚拟网卡）开关自动弹回，或报错 `Service Not Installed / Failed to start TUN`** | 未安装系统服务模式（Service Mode）且未以管理员/root 权限运行客户端 | 进入 Clash Verge Rev“设置 → 系统设置 → 服务模式”，点击盾牌图标执行 **`Install`（安装服务）**并重启客户端；若服务安装受杀毒软件拦截，可直接右键客户端“以管理员身份运行”。 |
| **导入机场订阅报错 `Network Error` 或 `YAML parse error`** | 当前开启了失效的本地系统代理导致拉取订阅死循环，或错把 Base64 通用链接当成 Clash YAML 导入 | 1. 先关闭“系统代理”与“TUN 模式”再点击刷新订阅；2. 确认复制的是机场的 **Clash Meta / Mihomo 订阅链接**；3. 在订阅编辑中将 `User-Agent` 设为 `clash-verge/v2.0.0`。 |
| **开启 TUN 模式后 WSL2、Docker 或公司内网 VPN 无法连接** | `gVisor` / `System` 虚拟网卡接管了内网私有网段路由，或 `fake-ip` 污染了内网域名解析 | 1. 在“设置 → Clash 字段 / Merge”的 `fake-ip-filter` 中加入公司内网域名后缀（如 `+.corp.internal`）；2. 将 TUN 堆栈切换为 **`Mixed`** 并配置 `route-exclude-address` 排除内网网段。 |
| **退出电脑或重启后浏览器提示“代理服务器拒绝连接”** | 异常断电或强杀进程导致操作系统残留了 `127.0.0.1:7897` 系统代理环境变量 | 重新启动一次 Clash Verge Rev，然后通过托盘菜单点击**“退出”**以触发自动清理；或手动在系统网络设置中关闭手动代理服务器（详见 [客户端无法启动排查](/troubleshooting/startup/)）。 |

## 七、常见问题（FAQ）

### Clash Verge Rev 和 Mihomo Party 怎么选？
两者均基于 Mihomo 内核，但生态维护节奏不同。根据本库资料核验提示，Mihomo Party 应单独关注当前项目维护状态，不宜未经核实就标为持续更新的首选客户端；对于追求长期稳定更新、安全补丁与桌面服务兼容的用户，Clash Verge Rev 通常是更稳妥的首选桌面端。

### 开启 Clash Verge Rev 后浏览器能上网，为什么终端 `curl` 或桌面 AI 客户端不行？
因为浏览器默认读取系统 HTTP/SOCKS 代理（如 `127.0.0.1:7897`），而许多命令行工具（PowerShell、CMD、`git`）、Node.js/Python 脚本或独立桌面软件默认忽略系统代理设置。解决方法是在 Clash Verge Rev 中安装服务模式并开启 **TUN（虚拟网卡）模式**，从底层网卡接管所有进程流量（详见 [TUN 模式开启教程](/tutorials/tun/)）。

### 为什么我的 Clash Verge Rev 导入订阅后没有显示 Hysteria 2 或 VLESS 节点？
这是因为部分机场后端会根据客户端发送的 `User-Agent` 判断是否下发新协议节点。如果机场没识别出你的 UA，就会默认返回兼容老旧 Clash for Windows 的阉割版节点列表。你可以在 Clash Verge Rev 的“设置 → Clash 设置 → User-Agent”或单个订阅右键“编辑信息”中，把 UA 显式改为 `clash.meta` 或 `mihomo`，然后重新更新订阅即可。

### Clash Verge Rev 里的 Merge（YAML 合并）和 Script（JS 脚本）覆写应该用哪个？
如果只是为了给所有订阅统一增加 `AI-解锁专线` 策略组、插入几条置顶分流规则或统一修改 `dns:` / `sniffer:` 参数，使用 **`Merge`（YAML 扩展配置）**最直观、最不易出错；只有当你需要对机场下发的几百个节点名称做复杂正则重命名、动态计算节点倍率或条件分支删除策略组时，才需要编写 JavaScript `Script` 覆写。

## 八、同类替代方案与相关链接

- **同内核轻量替代**：[FlClash](/clients/flclash/)（界面更简洁，跨桌面与安卓） · [Clash Nyanpasu](/clients/clash-nyanpasu/)（支持多内核切换）
- **多核心替代**：[v2rayN](/clients/v2rayn/)（支持 Xray 与 sing-box，适合单节点链接与多协议混用）
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
