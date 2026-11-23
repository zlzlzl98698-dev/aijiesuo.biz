---
title: "NekoBox 说明与 Google Play 仿冒警告"
description: "说明 sing-box 系安卓客户端 NekoBox 的当前维护状态，警示勿下载 Google Play 上的同名假冒应用，并给出安全替代建议。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "NekoBox"
  - "sing-box"
  - "安全警告"
  - "Android 客户端"
keywords:
  - "NekoBox"
  - "NekoBox 安卓版为什么不要在 Google Play 下载"
  - "NekoBox for Android 风险提示"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "NekoBox"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/android/"
  - "/clients/sing-box/"
  - "/clients/hiddify/"
  - "/clients/karing/"
  - "/clients/v2rayng/"
  - "/risk/security/"
draft: false
answerFirst: "NekoBox for Android 曾是知名的 sing-box 系安卓开源客户端，但根据官方项目说明，目前其维护资源有限；更重要的是，官方已特别警告用户切勿下载和使用 Google Play 商店上以 NekoBox 名义上架、实际已被第三方控制的商业/仿冒版本。安卓新用户建议优先选用持续活跃的 v2rayNG、FlClash、Hiddify 或 Karing。"
---

# NekoBox for Android：维护状态说明与下载安全警告

::: danger 安全警告：切勿在 Google Play 下载 NekoBox
根据 NekoBox 官方开源项目披露的维护公告：**该项目当前维护资源有限**，同时官方特别警告：**不要使用其名称下已被第三方控制的 Google Play 版本**。第三方控制的商店版本可能包含未开源的广告追踪、恶意模块或配置篡改风险。
:::

## 一、项目定位与当前状态核验

| 属性项 | 核验信息 |
|---|---|
| **原项目定位** | 基于 `sing-box` 内核的 Android 开源代理客户端（前身为 Matsuri 生态延伸），面向有一定协议基础的安卓用户 |
| **原始发布渠道** | GitHub 官方开源仓库（免费开源） |
| **当前维护状态** | **维护资源有限**，更新节奏放缓；部分早期功能与新协议跟进可能滞后 |
| **高危避坑项** | **严禁通过 Google Play 搜索下载同名 `NekoBox` 应用** |

## 二、为什么不建议安卓新用户首选 NekoBox？

1. **Google Play 渠道控制权风险**：很多用户出于习惯会在 Google Play 商店直接搜索客户端名称安装，但 NekoBox 恰恰出现了“官方开源项目仍在 GitHub、而 Google Play 同名商店条目已被第三方接管”的严重风险，普通用户极难第一时间分辨真伪。
2. **协议与系统适配维护速度**：随着 Android 系统版本迭代（Android 14/15/16 的 VPNService 与后台网络权限策略收紧）以及 `VLESS`、`Hysteria 2`、`AnyTLS` 等协议演进，维护资源受限的客户端更容易出现闪退或新机场订阅无法兼容的情况。
3. **可完全平替的活跃方案已非常成熟**：当前安卓平台无论是原生 `sing-box` 还是衍生端，都有维护更活跃、界面更友好的替代者。

## 三、协议与传输层兼容明细表（基于官方 GitHub 末期版本核验）

由于 NekoBox for Android 官方开源项目目前已处于**有限维护状态**，其内置的 `sing-box` 核心版本停留在较早分支（主に sing-box 1.8.x 时代架构），这导致它对老协议支持尚可，但对 2025–2026 年演进的新协议与新规则格式存在明显断层：

| 协议 / 传输层 | NekoBox 历史版本支持状态 | 兼容性风险与配置注意事项 | 推荐平替客户端 |
|---|---|---|---|
| **VLESS Reality / XTLS-RPRX-Vision** | 支持（基础版） | 支持解析 `vless://` 中的 `pbk`、`sid`、`fp` 与 `xtls-rprx-vision`，但对新版 Xray 的 `XHTTP (SplitHTTP)` 传输层完全不支持。 | [v2rayNG](/clients/v2rayng/) / [Karing](/clients/karing/) |
| **Hysteria 2** | 支持（需插件或末期版本） | 支持基础 `hy2://` 密码与带宽参数，但部分新版机场下发的动态多端口跳跃（Port Hopping 扩展语法）可能解析失败。 | [Karing](/clients/karing/) / [FlClash](/clients/flclash/) |
| **Trojan** | 完整支持 | 兼容标准 Trojan over TLS / WebSocket / gRPC，注意检查 `SNI` 与 `AllowInsecure` 开关。 | [v2rayNG](/clients/v2rayng/) / [FlClash](/clients/flclash/) |
| **Shadowsocks-2022** | 完整支持 | 基于内置 `sing-box` 支持 `2022-blake3-aes-128-gcm` 与 `2022-blake3-aes-256-gcm` 等 AEAD-2022 加密套件。 | [Karing](/clients/karing/) / [Hiddify](/clients/hiddify/) |
| **AnyTLS** | **不支持** | AnyTLS 诞生于 NekoBox 进入有限维护期之后，内置旧版 `sing-box` 核心无法识别该协议类型。 | [FlClash](/clients/flclash/) / [Karing](/clients/karing/) |
| **WireGuard** | 基础支持 | 支持手动填写本地私钥、Peer 公钥与 Endpoint，但旧版用户态网卡在 Android 14/15+ 下偶发休眠断流。 | [sing-box 官方端](/clients/sing-box/) |
| **TUIC v5** | 支持 | 内置支持 TUIC v5 的 UUID 与密码认证，但在高并发 UDP 场景下旧版核心内存回收效率不如新版 sing-box。 | [Karing](/clients/karing/) / [Hiddify](/clients/hiddify/) |

## 四、核心配置策略、AI 分流规则与安全迁移片段

对于仍在使用 GitHub 官方历史版 NekoBox、或正准备将 NekoBox 自定义路由迁移至新版 `sing-box` 客户端（如 SFA / Karing）的用户，需重点注意：**NekoBox 早期依赖 `geosite.db` / `geoip.db`，而现代 sing-box 1.10+ 已全面废弃 Legacy Geo 数据库并转向 `.srs`（Rule-Set）格式**。

### 1. NekoBox 内置路由（Routing）AI 与国内外分流配置要点
若短期内仍在旧设备上运行官方 NekoBox，可在「路由（Route）」面板新建一条置顶的 **AI 与流媒体代理规则**：
- **域名匹配（Domain）**：填入 `domain:chatgpt.com`、`domain:openai.com`、`domain:oaistatic.com`、`domain:oaiusercontent.com`、`domain:claude.ai`、`domain:anthropic.com`（由于旧版 `geosite.db` 停止自动更新，**强烈建议直接填写显式域名后缀**而非仅依赖过期的 `geosite:openai`）。
- **出站（Outbound）**：指向 `代理（Proxy）` 或特定的美国/新加坡固定节点。
- **DNS 防污染**：在「设置 → DNS」中将**远程 DNS** 设为 `https://1.1.1.1/dns-query`（走代理出站），**直连 DNS** 设为 `https://223.5.5.5/dns-query`，并勾选「启用 FakeDNS」。

### 2. 迁移至现代 sing-box 客户端的标准 Rule-Set（`.srs`）等效片段
当你从 NekoBox 迁移到官方 **sing-box for Android (SFA)** 或 **Karing** 时，请用以下现代 `.srs` 规则集结构替代已废弃的 `geosite.db` 调用：

```json
{
  "route": {
    "rule_set": [
      {
        "tag": "geosite-openai",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-openai.srs"
      },
      {
        "tag": "geosite-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-cn.srs"
      }
    ],
    "rules": [
      { "protocol": "dns", "action": "hijack-dns" },
      { "rule_set": ["geosite-openai"], "outbound": "proxy" },
      { "rule_set": ["geosite-cn"], "outbound": "direct" }
    ]
  }
}
```

## 五、高频故障诊断与安全排查速查表

| 故障 / 风险现象 | 核心根因分析 | 排查与迁移修复动作 |
|---|---|---|
| 手机上的 NekoBox 突然弹出全屏商业广告、要求绑定邮箱或来自 Google Play 自动更新 | **高危警报**：误安装了 Google Play 上已被第三方接管控制的同名仿冒 `NekoBox` 应用 | **立即卸载该应用**！切勿在其中保留任何机场订阅或开启 VPN 权限；随后登录机场官网后台点击**「重置订阅链接（Reset Subscription Token）」**防止节点被盗刷。 |
| 升级 Android 14 / 15 / 16 系统后，NekoBox 开启 VPN 数秒内闪退或通知栏无流量跳动 | 旧版 NekoBox 未适配新版 Android 对前台服务类型（`FOREGROUND_SERVICE_SPECIAL_USE`）及 VPNService 权限的强制校验 | 停止继续折腾旧版 APK，直接安装持续适配新版 Android SDK 的 **[v2rayNG](/clients/v2rayng/)**、**[FlClash](/clients/flclash/)** 或 **[Karing](/clients/karing/)**。 |
| 路由规则里写了 `geosite:openai` 却出现部分新域名（如 `chatgpt.com` / `oaiusercontent.com`）直连报错 `Access Denied` | NekoBox 本地打包的 `geosite.db` 为早期静态快照，未收录 OpenAI 后续启用的新主域名与静态资源 CDN 域名 | 在路由规则中手动追加 `domain:chatgpt.com`、`domain:oaistatic.com`、`domain:oaiusercontent.com`，或迁移至自动更新 `.srs` 规则集的新客户端。 |
| 导入机场最新订阅后，节点列表只显示部分节点或提示 `unknown outbound type` | 机场已启用 `AnyTLS` 或新版 `VLESS + XHTTP` 节点，超出了 NekoBox 旧内核解析范围 | 在机场后台复制标准 Clash Meta 订阅导入 **[FlClash](/clients/flclash/)**，或使用 **[Karing](/clients/karing/)** 解析新协议。 |

## 六、历史用户的迁移与安全核验建议

如果你当前设备上仍在使用 NekoBox，或是从旧教程中看到该名称：
- **核对下载来源**：务必卸载来历不明或从 Google Play 安装的同名 NekoBox，全面检查订阅链接与本地账号安全（下载校验常识见[代理客户端下载安全](/risk/security/)）。
- **备份导出节点**：迁移前先从机场重新复制最新订阅链接，不要只依赖旧客户端内的本地缓存文件。
- **根据自身习惯平滑替换**：
  - 习惯通用节点链接与极简操作 → 迁移至 **[v2rayNG](/clients/v2rayng/)**
  - 需要多订阅管理与 `sing-box` 内核 → 迁移至 **[Karing](/clients/karing/)** 或 **[Hiddify](/clients/hiddify/)**
  - 需要纯正 `sing-box` 原生 JSON 结构 → 迁移至官方 **[sing-box for Android（SFA）](/clients/sing-box/)**
  - 使用标准 Clash YAML 订阅 → 迁移至 **[FlClash](/clients/flclash/)**

## 七、常见问题（FAQ）

### 为什么 NekoBox 之前在很多老教程里被推荐，现在要谨慎提示？
早期在 `sing-box` 生态刚兴起、官方 SFA 尚不完善时，NekoBox 凭借多协议支持积累了较多教程；但随着项目进入有限维护阶段且 Google Play 上架条目出现第三方控制警告，继续按老教程去 Play 商店下载反而会把用户带入安全隐患中。

### 如果我必须运行一个老旧但只有 NekoBox 支持的配置格式怎么办？
建议先在机场后台确认是否已升级为标准 Clash YAML、sing-box JSON 或通用 Base64 订阅；绝大多数主流机场目前都已原生支持 [Hiddify](/clients/hiddify/) 与 [Karing](/clients/karing/)。

### 我怎么确认手机里已安装的 NekoBox 是 GitHub 原版还是 Google Play 风险版？
打开安卓「设置 → 应用管理 → NekoBox → 应用详情」，查看底部的**安装来源**以及是否有 Google Play 商店跳转入口、内置商业广告 SDK 或异常的内购权限；只要来源是 Google Play 或第三方下载站，请立即卸载并前往机场后台重置订阅地址。

### 桌面端 Windows 上的 NekoRay / NekoBox for PC 还能用吗？
桌面端的 NekoRay 项目同样在经历长期停更与维护断层。Windows 与 macOS 桌面用户目前强烈建议统一迁移至维护极其活跃的 **[Clash Verge Rev](/clients/clash-verge-rev/)**、**[FlClash](/clients/flclash/)**、**[v2rayN](/clients/v2rayn/)** 或 **[Karing](/clients/karing/)**。

## 八、同类安全替代与相关链接

- **安卓主力推荐**：[Android 安卓代理客户端指南](/clients/android/) · [v2rayNG](/clients/v2rayng/) · [Hiddify](/clients/hiddify/) · [Karing](/clients/karing/)
- **安全规范**：[代理客户端下载安全](/risk/security/) · [Clash 停更替代方案](/risk/alternatives/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
