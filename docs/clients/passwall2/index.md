---
title: "PassWall2 插件解析：OpenWrt 多核心轻量代理"
description: "介绍 OpenWrt 软路由透明代理插件 PassWall2，解析其 Xray 与 sing-box 多核心支持、节点分组分流、访问控制特点以及安装前的固件和依赖核对要求。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "PassWall2"
  - "OpenWrt"
  - "Xray"
  - "sing-box"
keywords:
  - "PassWall2"
  - "OpenWrt PassWall2 节点分流"
  - "PassWall2 Xray sing-box"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "PassWall2"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/openwrt/"
  - "/clients/openclash/"
  - "/clients/nikki/"
  - "/clients/sing-box/"
  - "/tutorials/routing/"
  - "/tutorials/dns/"
draft: false
answerFirst: "PassWall2 是 OpenWrt 环境下基于 Xray 与 sing-box 等多核心的透明代理插件，主打清晰的节点级分流（如按节点分别负责 OpenAI、流媒体与日常浏览）、按局域网设备进行访问控制，以及相对轻量的系统开销。安装前需核对 OpenWrt 架构、防火墙后端（iptables/nftables）与所需核心二进制组件。"
---

# PassWall2：OpenWrt 轻量分流与多核心透明网关插件

::: tip 核心结论（Answer-First）
如果说 [OpenClash](/clients/openclash/) 是把 Clash 生态整套搬进路由器，那么 **PassWall2** 则是更贴近传统路由器思维的多核心网关方案。它原生支持 **Xray 与 sing-box** 核心，支持直接导入机场通用节点订阅、针对单个设备（按 IP/MAC）限制是否走代理，并把不同业务（如 AI、流媒体、直连）通过路由规则绑定到指定节点，适合注重资源占用与节点级细粒度分流的 OpenWrt 用户。
:::

## 一、插件定位与核心特性

| 属性项 | 核验信息 |
|---|---|
| **开源发布** | GitHub 官方开源项目（免费开源） |
| **运行平台** | OpenWrt 软路由及兼容嵌入式系统 |
| **底层内核** | Xray、sing-box 等多核心协同 |
| **主要特点** | 节点管理直观、Xray/sing-box 规则分流、局域网设备访问控制、通用订阅支持 |

## 二、PassWall2 与 OpenClash 的使用差异

1. **订阅类型偏好不同**：PassWall2 擅长直接拉取机场提供的通用节点订阅（Base64 节点列表）或手动添加单条节点，再由用户在路由器后台自行编排“分流规则集（如 geosite:openai 走美国节点）”；而 OpenClash 更依赖机场本身下发完整的 Clash YAML 策略组配置。
2. **访问控制（设备级开关）**：PassWall2 在 LuCI 界面里针对局域网内部设备的开关控制非常直观——例如可以轻松设置“只让某台电视盒子和电脑走全局代理，其他智能家电全部不经过代理核心”。
3. **资源开销对比**：在不开启极大规模内存规则集的前提下，PassWall2 配合 Xray 或 sing-box 核心的日常内存占用通常较为克制，适合中等配置的 ARM 或 x86 路由器。

## 三、协议与传输层兼容明细表

PassWall2 本身是 OpenWrt 上的 LuCI 编排与透明代理调度框架，其具体协议支持取决于你在软路由内实际安装的底层核心二进制包（**`xray-core`** 与 **`sing-box`**）。当配置“分流总节点”时，需确保总节点所选的内核能完整兼容各个分流子节点的协议：

| 协议 / 传输层 | `xray-core` 后端支持 | `sing-box` 后端支持 | PassWall2 节点与分流总节点配置要点 |
|---|---|---|---|
| **VLESS Reality / XTLS-RPRX-Vision** | 完整原生支持 | 完整原生支持 | 双核心均完美支持；在 PassWall2 节点编辑页需确认勾选 `XTLS-RPRX-Vision` 流控，并准确填入 `PublicKey`、`ShortId` 与 `uTLS 指纹（chrome）`。 |
| **Hysteria 2** | 支持（新版 Xray）或独立插件 | 完整原生支持 | 若节点列表包含 Hysteria 2 且希望纳入同一个“分流总节点”统一调度，强烈建议将分流总节点类型设为 **sing-box**（并确保 `kmod-nft-tproxy` UDP 转发正常）。 |
| **Trojan (TCP / WS / gRPC)** | 完整原生支持 | 完整原生支持 | 双核心无缝兼容，通用订阅可直接批量解析 `sni`、`alpn` 与 `allowInsecure` 参数。 |
| **Shadowsocks-2022** | 完整原生支持 | 完整原生支持 | 均原生支持 `2022-blake3-aes-128-gcm` 与 `2022-blake3-aes-256-gcm` 等 AEAD-2022 套件。 |
| **AnyTLS** | 不支持 | 完整支持（需新版 `sing-box`） | Xray 核心未内置 AnyTLS；运行 AnyTLS 节点时必须在软路由安装新版 `sing-box` 二进制包并将节点类型指定为 sing-box。 |
| **WireGuard** | 基础支持（用户态出站） | 完整支持（用户态/端点） | 可在 PassWall2 内创建 WireGuard 节点作为链式前置或落地出站，注意避开与 OpenWrt `wan` 口同网段 IP。 |
| **TUIC v5** | 不支持 | 完整原生支持 | 使用 TUIC v5 节点时，必须在节点配置中将运行核心切换为 **sing-box**，并开启 UDP TPROXY 透明代理。 |

## 四、核心配置策略：Xray/sing-box 分流总节点与防 DNS 环路

PassWall2 最核心的设计哲学是**“创建单一 Xray/sing-box 分流总节点（Shunt Node），在内核内部按业务规则分发到不同国家的落地节点”**。相比在防火墙层跑多个进程，单进程多出站的架构内存占用极低且不会出现规则打架。

### 1. AI / 流媒体 / 日常浏览三路分流编排配置（LuCI 规则列表）
在 PassWall2「节点列表 → 添加 → 类型选择 **Xray 分流** 或 **sing-box 分流**」后，按以下优先级绑定分流规则（进入「规则管理」可自定义规则项）：

```text
# PassWall2「规则管理」推荐自定义分流项与节点绑定策略
[1. 广告拦截 (Ads)]
domain_list: geosite:category-ads-all
绑定出站: 阻塞 (Blackhole / Block)

[2. AI 解锁专区 (OpenAI / Claude / Gemini)]
domain_list:
  geosite:openai
  geosite:anthropic
  geosite:google-gemini
  domain:chatgpt.com
  domain:oaistatic.com
  domain:oaiusercontent.com
  domain:claude.ai
绑定出站: 美国-原生解锁节点（或 新加坡-纯净商宽节点）

[3. 流媒体专线 (Netflix / YouTube / Disney+)]
domain_list:
  geosite:netflix
  geosite:youtube
  geosite:disney
绑定出站: 香港/新加坡-高速流媒体节点

[4. 中国大陆与私有局域网 (Direct)]
domain_list: geosite:cn, geosite:private
ip_list: geoip:cn, geoip:private
绑定出站: 直连 (Direct)

[5. 默认兜底策略 (Default)]
绑定出站: 日常主力低延迟节点（香港/日本）
```

### 2. OpenWrt `nftables` 透明代理与防 DNS 环路配置
在 PassWall2「基本设置 → DNS」与「访问控制」中，务必遵循以下工程规范以杜绝 DNS 污染与本地回环死锁：
- **远程 DNS 模式**：选择 **通过 TCP / DoH 请求（走代理核心内部 DNS）**，填入 `https://1.1.1.1/dns-query` 或 `8.8.8.8`，并开启 **FakeDNS**（仅在 Xray/sing-box 分流总节点模式下生效，能显著消除 DNS 抢答泄漏并加速分流匹配）。
- **防 DNS 环路铁律**：`dnsmasq` 默认监听 `53` 端口并将海外域名转发给 PassWall2 内核的监听端口；因此**严禁将 PassWall2 的直连/远程 DNS 设为软路由自身的 `127.0.0.1:53` 或 `192.168.1.1`**。同时，在「节点订阅」的节点服务器域名解析中应固定使用公共直连 DNS（如 `223.5.5.5`）。

## 五、高频故障诊断与排查速查表

| 故障报错现象 | 核心根因分析 | PassWall2 针对性修复动作 |
|---|---|---|
| 保存并应用后顶部一直显示 `TCP 节点：未运行`，查看日志提示 `xray / sing-box not found` | 仅安装了 `luci-app-passwall2` 前端界面包，未安装底层核心二进制包，或路由器 `/overlay` 闪存空间已满导致二进制损坏 | SSH 登录路由器执行 `df -h` 检查剩余空间；按架构安装 `xray-core` 或 `sing-box` 软件包，或在 PassWall2「组件更新」中指定正确二进制路径。 |
| 电脑访问 Google 正常，但打开 ChatGPT 网页卡在白屏或报错，且分流规则中 `geosite:openai` 未命中 | 本地 `/usr/share/v2ray/` 下的 `geosite.dat` 与 `geoip.dat` 版本过旧，或者总节点使用的是 `sing-box` 但缺少对应的规则集资源 | 进入 PassWall2「规则管理 → 规则更新」，勾选 `geoip` 与 `geosite` 点击「立即更新」；同时在 AI 分流规则框内手动补充显式域名 `domain:chatgpt.com` 与 `domain:claude.ai`。 |
| OpenWrt 22.03 / 23.05 / 24.10 固件下节点显示运行中，但局域网所有设备完全无法翻墙 | 新版 OpenWrt 采用 `fw4 (nftables)`，但系统缺失 `kmod-nft-tproxy` / `kmod-nft-socket` 内核模块，导致透明代理防火墙规则创建失败 | 在 SSH 运行 `nft list table inet passwall2` 检查表是否存在；安装缺失的 `kmod-nft-tproxy`、`kmod-nft-socket` 并重启防火墙 `/etc/init.d/firewall restart`。 |
| 开启 FakeDNS 后，切换节点或关闭 PassWall2 时国内电脑仍然打不开刚才访问过的网页 | 电脑操作系统与浏览器缓存了 `198.18.0.0/15` 网段的 Fake-IP 映射，当代理关闭后该虚拟 IP 无法路由 | 在 PassWall2「基本设置」中点击「清理 DNS 缓存」，并在客户端电脑终端执行 `ipconfig /flushdns`（Windows）或断开重连一次 Wi-Fi。 |

## 六、安装与防火墙依赖核对

在部署 PassWall2 前，请先依据 [OpenWrt 软路由代理插件指南](/clients/openwrt/) 核对三点：
- **核心二进制文件是否分离**：部分安装包只含 LuCI 前端，需同步安装对应的 `xray-core` 或 `sing-box` 软件包，否则节点列表中即使有协议也无法启动。
- **防火墙匹配**：OpenWrt 22.03 及以上版本使用 `nftables (fw4)`，需确保配套的是 `nftables` 版本的透明代理依赖（如 `kmod-nft-tproxy` / `kmod-nft-socket`），而非旧版 `iptables` 依赖。
- **避免与其它插件冲突**：启用 PassWall2 时需确认 OpenClash、Nikki 或其他 DNS 转发插件处于完全关闭状态。

## 七、常见问题（FAQ）

### 机场只给了我 Clash 订阅链接，PassWall2 能直接用吗？
PassWall2 原生主要识别通用节点订阅格式，无法直接原生解析复杂的 Clash YAML 策略组语法。如果机场面板同时提供了“通用订阅 / V2Ray 订阅”，请复制通用订阅地址给 PassWall2；若只有 Clash 订阅，使用 [OpenClash](/clients/openclash/) 或 [Nikki](/clients/nikki/) 更省心。

### PassWall2 和原本的 PassWall（1 代）有什么区别？
PassWall2 重构了分流架构，全面拥抱基于 Xray/sing-box 内核内部的路由规则分流（支持为不同服务指派不同出站节点，且内置分流规则更现代），而不仅是单一主副节点切换。

### 在 PassWall2 中，分流总节点选 `Xray 分流` 还是 `sing-box 分流` 更好？
如果你的节点以 **VLESS Reality / XTLS-RPRX-Vision、Trojan、VMess** 为主，选 **`Xray 分流`** 最成熟稳定，且直接读取标准的 `geosite.dat / geoip.dat`；如果你的订阅中包含 **Hysteria 2、TUIC v5 或 AnyTLS** 等协议并希望在一个分流总节点里混合调度，则应选择 **`sing-box 分流`**。

### 如何让家里的智能电视、监控摄像头或国产网银电脑完全不经过 PassWall2？
进入 PassWall2「访问控制（Access Control）」，添加对应设备的 MAC 地址或固定局域网 IP，将「TCP 转发模式」与「UDP 转发模式」均设为**「不转发（No Forwarding）」**，并将该设备的 DNS 请求设为直连，即可在防火墙最前端直接放行，完全不经过 Xray/sing-box 核心。

## 八、同类替代与相关链接

- **OpenWrt 同类方案**：[OpenWrt 软路由代理插件总览](/clients/openwrt/) · [OpenClash](/clients/openclash/) · [Nikki](/clients/nikki/)
- **内核参考**：[sing-box 核心与官方端](/clients/sing-box/) · [国内外规则分流设置](/tutorials/routing/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
