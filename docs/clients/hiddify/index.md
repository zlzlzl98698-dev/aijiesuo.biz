---
title: "Hiddify 下载与功能介绍：新手友好的全平台多协议客户端"
description: "介绍基于 sing-box 内核的开源跨平台客户端 Hiddify，支持 Win/Android/iOS/Mac/Linux，解析多协议与自动选点特点。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "Hiddify"
  - "sing-box"
  - "跨平台客户端"
  - "多协议代理"
keywords:
  - "Hiddify"
  - "Hiddify 多协议客户端下载"
  - "Hiddify 自动节点选择"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "Hiddify"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/karing/"
  - "/clients/sing-box/"
  - "/clients/windows/"
  - "/clients/android/"
  - "/clients/ios/"
  - "/clients/macos/"
  - "/clients/linux/"
draft: false
answerFirst: "Hiddify 是基于 sing-box 内核打造的免费开源全平台客户端（覆盖 Windows、Android、iOS、macOS、Linux），核心特点是几乎兼容所有常见订阅格式（Clash YAML、sing-box JSON、Base64 及单节点链接）与多协议，并提供自动节点选择与面向新手的一键式开关。"
---

# Hiddify：新手友好的全平台多协议代理客户端

::: tip 核心结论（Answer-First）
**Hiddify**（Hiddify-app / Hiddify Next）是一款真正意义上覆盖 **Windows、Android、iOS、macOS、Linux** 五大系统的开源免费客户端。它以 **[sing-box](/clients/sing-box/)** 为底层引擎，屏蔽了原生 JSON 配置的复杂度，支持直接导入机场的 Clash 订阅、通用订阅甚至单条分享链接，非常适合**不想折腾订阅格式转换的新手与跨设备用户**。
:::

## 一、软件属性与支持平台

| 属性项 | 核验信息 |
|---|---|
| **项目属性** | GitHub 官方开源项目（免费开源） |
| **支持平台** | Windows、Android、iOS（部分地区 App Store 或 GitHub 源码生态）、macOS、Linux |
| **底层内核** | sing-box |
| **核心特性** | 多协议兼容、自动识别多种订阅格式、自动节点选择、远程配置、极简一键连接 |

## 二、为什么新手适合用 Hiddify？

1. **订阅格式宽容度高**：很多新手分不清机场后台给的“Clash 订阅”和“V2Ray/通用订阅”有何区别。Hiddify 对这两种主流格式以及单条 `vless://`、`vmess://`、`hy2://`、`ss://` 链接都能直接导入解析，显著降低了因选错客户端导致无法导入的概率。
2. **自动测速与选点**：支持“自动（Auto）”节点模式，在导入订阅后能够自动测速并选择当前延迟较低的可用节点，省去在几十个节点里逐个排查的麻烦。
3. **跨全平台免费开源**：在 Android、Windows、macOS、Linux 之外，也面向 iOS 提供了跨端方案；在不愿购买付费 iOS 客户端时，可以作为 [iOS 苹果代理客户端](/clients/ios/) 中的重要免费备选（上架情况以各地区商店实际为准）。

## 三、底层 sing-box 协议栈与加密传输支持矩阵

Hiddify 之所以能够兼容绝大多数机场订阅，核心在于其底层封装了经过定制的 **[sing-box](/clients/sing-box/)** 引擎，并在前端内置了多格式订阅解析转换层（Subscription Parser）。其对现代加密传输协议与网络栈的参数处理机制如下：

| 协议 / 机制 | Hiddify 支持度 | 关键参数要求与客户端实现机制 |
|---|---|---|
| **VLESS Reality** | 原生完整支持 | 自动识别 URI 或 YAML 中的 `pbk`（Public Key）、`sid`（Short ID）、`spx` 与 `fp`（uTLS 指纹，如 `chrome` / `safari`），支持 `xtls-rprx-vision` 流控以规避 TLS-in-TLS 特征。 |
| **Hysteria 2 (UDP QUIC)** | 原生完整支持 | 基于 UDP/QUIC 拥塞控制，解析 `obfs`（`salamander` 混淆密码）与上下行带宽声明；在晚高峰跨网丢包场景下可显著降低 AI 流式响应首字延迟，但需注意运营商 UDP QoS 限速。 |
| **Shadowsocks-2022 / Trojan** | 原生完整支持 | 兼容 `2022-blake3-aes-128-gcm` / `2022-blake3-aes-256-gcm` 等 AEAD-2022 规范及 Multi-PSK；Trojan 支持 WebSocket / gRPC 传输层复用与 ALPN 协商。 |
| **TUIC v5 / AnyTLS** | 随内核版本支持 | 支持 TUIC v5 的 `bbr` 拥塞控制与 UDP 转发模式（`native` / `quic`）；新型伪装协议需将 Hiddify 升级至包含新版 sing-box 核心的 Release 版本。 |
| **Fake-IP 与 Sniff 域名嗅探** | 默认托管启用 | 在开启 VPN（移动端）或 TUN（桌面端）时，默认通过 `sniff` 嗅探 TLS ClientHello 中的 SNI 与 HTTP Host，结合远程/本地 DNS 分流防止国内解析污染影响 ChatGPT 与 Claude 连通性。 |

## 四、针对 ChatGPT / Claude / Gemini 的分流配置与路由调优

虽然 Hiddify 主打一键连接，但直接用默认设置访问 OpenAI、Anthropic（Claude）或 Google Gemini 时，若机场把香港或俄罗斯节点排在延迟最低位置，自动选点（Auto）会把流量切到不支持 AI 的地区，触发 `Unsupported Country/Region` 拦截。建议在 Hiddify 的**配置选项（Config Options）与远程路由**中按以下结构调优：

1. **锁定地区与路由区域（Region & Routing）**：在设置中将区域设为 `cn`（中国大陆绕过），确保 `geosite:cn` 与 `geoip:cn` 直连，海外流量默认进入代理通道。
2. **自定义远程配置 / JSON 路由覆写**：若使用自定义 sing-box 扩展规则或高级配置文件，可通过 `route.rules` 与 `dns.rules` 强制将 AI 域名绑定至美、日、新等干净出口组，并阻断极易暴露真实位置或引发 QUIC 降级的异常请求：

```json
{
  "dns": {
    "rules": [
      {
        "domain_suffix": [
          "openai.com",
          "chatgpt.com",
          "oaistatic.com",
          "oaiusercontent.com",
          "anthropic.com",
          "claude.ai",
          "gemini.google.com",
          "googleapis.com"
        ],
        "server": "dns-remote",
        "rewrite_ttl": 60
      }
    ]
  },
  "route": {
    "rules": [
      {
        "protocol": "dns",
        "action": "hijack-dns"
      },
      {
        "domain_suffix": [
          "openai.com",
          "chatgpt.com",
          "anthropic.com",
          "claude.ai",
          "gemini.google.com",
          "makersuite.google.com"
        ],
        "outbound": "AI-Dedicated-US-SG"
      }
    ]
  }
}
```

3. **手动固定优质节点代替全盲选**：在不编写自定义 JSON 的日常场景下，连接成功后点击代理标签页（Proxies），将出站组从 `Auto` 手动点选为机场标明的 `美国`、`日本` 或 `新加坡 AI 专线` 节点，即可规避自动测速误选香港节点的问题。

## 五、进阶用户的局限性提示

虽然上手门槛极低，但 Hiddify 的自动化封装也带来一定取舍：
- **细粒度策略组控制有限**：如果你习惯 Clash 系（如 [Clash Verge Rev](/clients/clash-verge-rev/) 或 [Stash](/clients/stash/)）里把“AI 服务”、“Netflix”、“YouTube”拆分成几十个独立手动策略组，并配合复杂本地 JavaScript 脚本覆写，Hiddify 的交互方式会显得不够精细。
- **排错日志深度**：对于需要逐条抓取 HTTP 请求或排查特定规则命中的网络工程师，[Surge](/clients/surge/)、[Quantumult X](/clients/quantumult-x/) 或 Clash 系控制台更为直观。

## 六、Hiddify 高频异常排查对照表

| 报错症状 / 异常现象 | 核心触发原因 | 核验与解决步骤 |
|---|---|---|
| **导入 Clash 订阅后只显示单条“流量剩余/到期时间”伪节点** | 机场下发的订阅链接带 UA 校验，返回了普通提示文本或加密私有格式 | 在 Hiddify 添加配置时展开高级选项，将 `User-Agent` 修改为 `clash.meta` 或 `sing-box` 后重新拉取订阅；或改用机场后台的“通用 / V2Ray 订阅链接”。 |
| **桌面端开启 TUN 模式报错 `Failed to start TUN` 或闪退** | Windows/macOS 未授予管理员/系统网络扩展权限，或与残留虚拟网卡冲突 | Windows 端右键“以管理员身份运行” Hiddify；macOS 端前往“系统设置 → 隐私与安全性 / 网络”批准 Hiddify 系统扩展，并关闭其他正在运行的代理软件。 |
| **节点测速全部绿色有数值，但打开 ChatGPT 提示 `Access Denied` 或无限转圈** | 自动选点命中了高延迟波动节点、香港不支持地区节点，或本地 DNS 缓存污染 | 1. 在节点列表手动切换至美国/新加坡节点；2. 在设置中开启 `Strict Route`（严格路由）与远程 DNS 解析；3. 使用浏览器无痕窗口访问 `chatgpt.com` 验证。 |
| **使用 Hysteria 2 节点刚开始极快，几分钟后断流 timeout** | 本地宽带运营商对高频 UDP 流量触发了 QoS 阻断或 NAT 会话超时 | 在节点列表切换至基于 TCP 的 `VLESS Reality` 或 `Trojan` 节点进行对比验证；若 TCP 节点稳定，则确认为本地网络 UDP 限流。 |

## 七、各平台入口与实操关联

- 按设备下载与核对安装包：请前往 [Windows 指南](/clients/windows/)、[Android 指南](/clients/android/)、[iOS 指南](/clients/ios/)、[macOS 指南](/clients/macos/) 或 [Linux 指南](/clients/linux/)。
- 导入订阅与分流验证：参见 [机场订阅导入教程](/tutorials/subscription/) 与 [AI 与流媒体解锁总览](/ai/)。

## 八、常见问题（FAQ）

### Hiddify 导入 Clash 订阅后，原配置里的地区分流规则还生效吗？
Hiddify 会解析并提取订阅中的节点列表，但通常使用自身内置的 sing-box 路由模板（依据你在设置中选定的国家/地区绕过规则，如中国大陆直连）来接管分流。如果你依赖机场下发的高度定制化策略组图标、多级 `url-test` 嵌套和复杂脚本覆写，建议优先使用原生 Mihomo 内核客户端（如 [FlClash](/clients/flclash/) 或 [Clash Verge Rev](/clients/clash-verge-rev/)）。

### Hiddify 和 Karing 都是 sing-box 内核，核心差别在哪？
两者均适合跨平台与多格式导入，但 Hiddify 更偏向“单一订阅、全自动选点、极简大按钮”；而 [Karing](/clients/karing/) 的强项在于同时合并管理**多份机场订阅**与自定义路由组（比如同时买了一家主力专线机场和一家备用按量机场时，Karing 可以将两家节点混编进同一个 AI 分流组）。

### 为什么 Hiddify 的延迟测速数值比 Clash 客户端显示得偏高？
Hiddify 默认采用贴近真实浏览体验的 URL 真连接测试（包含建立加密握手与 HTTP 响应往返耗时），而非单纯的 TCP Ping 握手时间。数值在 `150ms ~ 400ms` 之间均属正常的加密链路延迟，只要无丢包即可流畅使用 ChatGPT 与流媒体。

### Hiddify 在 Windows 或手机上开启“系统代理”和“VPN/TUN 模式”有什么区别？
“系统代理（System Proxy）”仅接管遵循操作系统 HTTP/SOCKS 代理环境变量的浏览器和常规应用；而“VPN / TUN 模式”通过创建虚拟网卡在网络层（L3）接管全设备所有 TCP/UDP 流量。若你需要使用 Claude Code、终端命令行 `curl` 或独立桌面 AI 客户端，必须开启 TUN 模式。

## 九、同类替代与相关链接

- **同内核多订阅替代**：[Karing](/clients/karing/) · [sing-box 官方端](/clients/sing-box/)
- **Mihomo 系轻量替代**：[FlClash](/clients/flclash/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
