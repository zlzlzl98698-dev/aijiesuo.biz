---
title: "Quantumult X 圈X 介绍：iOS 规则分流与重写"
description: "解析 iOS 经典高级代理工具 Quantumult X（圈 X）核心功能：规则分流、HTTP 请求重写、脚本扩展、自定义 DNS 与商店购买提醒。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "Quantumult X"
  - "圈X"
  - "iOS 客户端"
  - "请求重写"
keywords:
  - "Quantumult X 圈X"
  - "圈X 规则分流与重写脚本"
  - "Quantumult X 购买说明"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "Quantumult X"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/ios/"
  - "/clients/shadowrocket/"
  - "/clients/stash/"
  - "/clients/surge/"
  - "/tutorials/routing/"
  - "/tutorials/dns/"
draft: false
answerFirst: "Quantumult X（俗称圈 X）是 iOS / iPadOS 平台面向进阶用户的经典付费代理客户端，搭载自研规则引擎，核心特长是精细化规则分流、HTTP 请求重写（Rewrite）、Task 定时脚本与深度自定义 DNS。美区 App Store 显示为付费应用，学习门槛高于小火箭，适合喜欢动手定制分流与重写规则的用户。"
---

# Quantumult X（圈 X）：iOS 高级分流与重写客户端

::: tip 核心结论（Answer-First）
**Quantumult X（简称 QX / 圈 X）** 并不是单纯“导入订阅点开关”的傻瓜客户端，而是一款高度可编程的 iOS 网络工具。它以自研规则引擎为核心，强项在于 **远程分流规则（Filter）、HTTP 重写（Rewrite）与 JavaScript 脚本扩展、以及自定义 DNS**。在美区等海外 App Store 为付费应用（售价与上架状态以所属地区商店为准），更适合愿意花时间配置规则的高阶用户。
:::

## 一、软件属性与基础定位

| 属性项 | 核验信息 |
|---|---|
| **发布渠道** | 海外区 App Store |
| **收费模式** | 付费应用（美国 App Store 显示为付费应用，实际售价以所属地区为准） |
| **底层内核** | 自研规则与网络引擎 |
| **功能标签** | 规则分流、HTTP 请求重写、JavaScript 脚本、自定义 DNS、多策略组 |

## 二、圈 X 的核心差异化能力

1. **请求重写（Rewrite）与 MITM 解密**：可以在符合规则的 HTTPS 请求发出或返回时对请求头、重定向路径或响应体进行修改，常用于接口调试、屏蔽特定弹窗或网页排版微调（需信任本地自签 CA 证书）。
2. **强大的规则与节点资源解析**：虽然机场订阅本身往往包含节点列表，但圈 X 允许用户挂载“资源解析器（Resource Parser）”，把原始机场节点自动转换为适配圈 X 的格式并套用自己的分流列表，而不被机场预设规则绑死。
3. **精细 DNS 控制**：支持针对不同域名后缀分别指定本地运营商 DNS、DoH 或代理远端解析，在排查流媒体解锁与 [防止 YouTube 送中](/ai/youtube/) 时控制粒度极细。

## 三、协议与传输层兼容明细表

Quantumult X（圈 X）采用完全独立自研的闭源网络核心，其在**规则分流、HTTP 重写与 JS 脚本执行效率**上处于 iOS 顶尖水准，但在**新兴基于 QUIC (UDP) 的抗封锁传输协议**跟进上相对保守。在购买圈 X 或挑选机场订阅前，请务必核对以下协议支持边界：

| 协议 / 传输层 | Quantumult X 支持状态 | `[server_local]` 协议声明与关键参数 | 选型与配置注意事项 |
|---|---|---|---|
| **VLESS Reality / XTLS-RPRX-Vision** | 部分支持（需较新版本且语法严格） | `vless=example.com:443, method=none, password=uuid, obfs=over-tls, reality-base64-pubkey=..., reality-shortid=...` | 仅较新版本支持 VLESS over TLS / Reality，且不支持直接解析通用 `vless://` 链接中的部分 Xray 专有扩展（如 `XHTTP`）；需配合最新版 Resource Parser 脚本转换。 |
| **Hysteria 2** | **不支持** | 无（不支持） | 圈 X 核心未合入基于 QUIC 的 Hysteria / Hysteria 2 协议栈；若你的主力机场全线采用 Hysteria 2，请改用 [Shadowrocket](/clients/shadowrocket/)、[Stash](/clients/stash/) 或 [Surge](/clients/surge/)。 |
| **Trojan (TLS / WS)** | 完整原生支持 | `trojan=example.com:443, password=pwd, over-tls=true, tls-host=example.com, fast-open=false, udp-relay=true` | 圈 X 下最稳健的主力协议之一，完整支持 Trojan over TLS 及 WebSocket（`obfs=wss`），兼容绝大多数主流专线机场。 |
| **Shadowsocks / SS-2022** | 支持（传统 AEAD 完整 / 2022 视版本） | `shadowsocks=example.com:8388, method=aes-128-gcm, password=pwd, obfs=http, udp-relay=true` | 完美支持 `aes-128-gcm`、`chacha20-ietf-poly1305` 及 `simple-obfs / v2ray-plugin`；对 SS-2022 扩展特性的支持不如 Mihomo/sing-box 全面。 |
| **AnyTLS** | **不支持** | 无（不支持） | 自研核心尚未内置 AnyTLS 协议支持。 |
| **WireGuard** | **不支持** | 无（不支持） | 不支持在配置文件内直接运行 WireGuard 出站节点。 |
| **TUIC v5** | **不支持** | 无（不支持） | 未内置 TUIC v5 的 QUIC 协议栈支持。 |

## 四、核心配置策略与 AI/流媒体分流片段（`[policy]` / `[filter_remote]`）

圈 X 的配置文件由严格划分的 INI 段落组成（`[general]`、`[dns]`、`[policy]`、`[server_remote]`、`[filter_remote]`、`[rewrite_remote]`、`[mitm]`）。以下是一份高可靠性的 **AI 解锁 + 流媒体分流 + 防 DNS 泄漏** 核心配置片段：

```ini
[general]
server_check_url = http://www.gstatic.com/generate_204
geo_location_checker = http://ip-api.com/json/?lang=zh-CN, https://github.com/KOP-XIAO/QuantumultX/raw/master/Scripts/IP_API.js
 resource_parser_url = https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js

[dns]
# 禁用系统 DNS 兜底抢答，严格使用国内 DoH + 并发分流
no-system
server = 223.5.5.5
server = 119.29.29.29
doh-server = https://dns.alidns.com/dns-query, https://doh.pub/dns-query

[policy]
# 定义策略组：AI 专属手动/静态组、流媒体组与日常自动测速组
static=AI-解锁专线, 美国-原生节点, 新加坡-纯净节点, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Bot.png
static=国际流媒体, 香港-高速节点, 新加坡-纯净节点, 美国-原生节点
url-latency-benchmark=自动最低延迟, server-tag-regex=^(香港|日本|新加坡), check-interval=600, tolerance=50

[filter_local]
# 置顶高优先级 AI 域名规则（强制 no-resolve 防止本地 DNS 解析泄漏真实归属地）
host-suffix, chatgpt.com, AI-解锁专线
host-suffix, openai.com, AI-解锁专线
host-suffix, oaistatic.com, AI-解锁专线
host-suffix, oaiusercontent.com, AI-解锁专线
host-suffix, claude.ai, AI-解锁专线
host-suffix, anthropic.com, AI-解锁专线

[filter_remote]
# 远程分流规则集：按从上到下的顺序严格匹配
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/OpenAI/OpenAI.list, tag=OpenAI分流, force-policy=AI-解锁专线, update-interval=86400, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Claude/Claude.list, tag=Claude分流, force-policy=AI-解锁专线, update-interval=86400, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Netflix/Netflix.list, tag=Netflix流媒体, force-policy=国际流媒体, update-interval=86400, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/ChinaMax/ChinaMax.list, tag=大陆直连, force-policy=direct, update-interval=86400, opt-parser=true, enabled=true

# 最终兜底规则（置于 [filter_local] 末尾）
# final, 自动最低延迟
```

## 五、高频故障诊断与排查速查表

| 故障报错现象 | 核心根因分析 | Quantumult X 针对性修复动作 |
|---|---|---|
| 在「节点 → 引用 (订阅)」中粘贴机场链接后下拉刷新，提示 `解析失败 / 0 个可用节点` | 机场链接下发的是 Clash YAML 或包含未知协议的 Base64 订阅，而圈 X 未配置 `resource_parser_url` 或未开启资源解析器开关 | 在 `[general]` 段落配置权威的 `resource_parser_url`（资源解析器脚本），并在添加该节点订阅条目时打开**「使用资源解析器（opt-parser=true）」**开关。 |
| 规则分流列表明明有 `OpenAI.list`，但访问 ChatGPT 仍走了默认香港节点被拒访 | `[filter_remote]` 远程规则顺序排在了广泛匹配的 `Global / Proxy` 规则之后，或策略组中引用的 `server-tag-regex` 正则未匹配到任何有效节点导致回退 | 长按「分流（Filter）」列表中的 `OpenAI` 与 `Claude` 规则集并**拖动置顶到最上方**；点开 `AI-解锁专线` 策略组确认其选中的是美国/新加坡等受支持地区节点。 |
| 开启「MitM」与「重写（Rewrite）」去广告后，部分 App 图片加载不出、HTTPS 报错或手机发烫掉电快 | 盲目导入了包含上百个域名的通配符 MitM `hostname = *` 配置，导致 iOS Network Extension 对海量并发 HTTPS 流量做 CPU 密集型加解密并超出 50MB 内存限制被系统强杀 | 进入 `[mitm]` 列表，**立即删掉 `*` 或过大范围的通配符域名**，仅保留明确需要重写脚本生效的少量特定域名；若无需去广告脚本，日常建议直接关闭 MitM 总开关。 |
| 切换到蜂窝移动数据（5G/4G）后圈 X 显示 VPN 在线，但所有网页均无法打开 | 运营商移动网分配了 IPv6 环境或启用了 DNS 抢答，而 `[dns]` 中未配置可靠的加密 DoH 服务器 | 在圈 X「设置 → DNS」或配置文件 `[dns]` 段中加入 `doh-server = https://223.5.5.5/dns-query`，如节点不支持 IPv6 可在 `[dns]` 中添加 `no-ipv6` 强制走 IPv4 栈。 |

## 六、配置兼容性与使用门槛提醒

- **独立配置语法**：圈 X 使用自己特有的 `[server_local]`、`[filter_remote]`、`[rewrite_remote]` 分段式 INI 配置文件，**无法直接原封不动粘贴 Clash YAML**。导入机场时需使用服务商提供的“Quantumult X 专用订阅”或借助安全的资源解析脚本。
- **新手慎用过载懒人包**：网上流传大量所谓“全能懒人配置”，往往塞入几百条未知来源的远端 JS 脚本与 MITM 域名。出于隐私与稳定性考虑，**切勿盲目导入来历不明的远端重写脚本和 CA 证书规则**（特别是涉及银行、支付、个人登录态的域名绝对不要开启 MITM 解密）。

## 七、选型对比与购买提示

- 若只希望“导入订阅直接用”，操作最轻松的付费端是 [Shadowrocket（小火箭）](/clients/shadowrocket/)，Clash 生态无缝衔接可选 [Stash](/clients/stash/)，而追求专业抓包与 Mac 联动则是 [Surge](/clients/surge/)。
- 购买与苹果账号切换安全规范，请参阅 [iOS 苹果代理客户端指南](/clients/ios/)。

## 八、常见问题（FAQ）

### 为什么圈 X 导入机场订阅后，节点有了但打开网页没走规则？
常见原因是只导入了节点服务器订阅（`server_remote`），却没有启用或配置对应的分流规则（`filter_remote`）及默认策略（`final`）。同时需确认顶部运行模式切换在“规则分流”而非“全部直连”。

### 圈 X 能够支持最新的 VLESS Reality 或 Hysteria 2 吗？
不同协议在 iOS 商业闭源客户端中的跟进节奏不一：圈 X 虽在后期版本通过特定参数支持了基础 VLESS Reality，但**完全不支持基于 QUIC 的 Hysteria 2 与 TUIC v5**。购买和部署前务必对照当前机场实际节点协议（确认服务商是否提供 Trojan / Shadowsocks / VMess 节点作为主力兼容保障）。

### 什么是圈 X 的“资源解析器（Resource Parser）”，为什么大家都在装？
因为圈 X 原生只认识自己独特的 INI 节点与规则语法（例如 `shadowsocks=...`、`host-suffix,...`），当你拿到机场的 Clash YAML 订阅、V2Ray Base64 订阅或 Surge 规则集时，圈 X 原生无法直接读取。挂载 `resource-parser.js` 脚本后，圈 X 会在拉取远程订阅的瞬间在本地用 JS 自动将 Clash/Surge/V2Ray 格式实时翻译成圈 X 标准语法，极大拓宽了订阅兼容性。

### 在圈 X 里开启 MitM（HTTPS 解密）安全吗？为什么安装证书后还要多一步设置？
本地自签 CA 证书的私钥仅生成并保存在你自己的 iPhone 本地沙盒内，只要**不导入他人生成的外部私钥证书、不把网银/支付/核心账号域名加入 MitM 列表**就是安全的。在 iOS 上下载安装完圈 X 生成的描述文件后，还必须前往 iPhone「设置 → 通用 → 关于本机 → 证书信任设置」中手动开启对该根证书的完全信任，否则所有命中 MitM 的 HTTPS 请求都会报错中断。

## 九、同类替代与相关链接

- **iOS 生态**：[Shadowrocket](/clients/shadowrocket/) · [Stash](/clients/stash/) · [Surge](/clients/surge/)
- **原理拓展**：[国内外规则分流设置](/tutorials/routing/) · [DNS 防泄漏与分流配置](/tutorials/dns/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
