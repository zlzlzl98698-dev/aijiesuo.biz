---
title: "Shadowrocket 小火箭下载解析：iOS 主流代理"
description: "全面介绍 iPhone / iPad 主流代理工具 Shadowrocket（小火箭）的功能定位、协议兼容、外区 App Store 购买注意事项以及导入与排查入口。"
date: "2026-11-23"
updated: "2026-11-23"
category: "客户端软件"
tags:
  - "Shadowrocket"
  - "小火箭"
  - "iOS 代理客户端"
  - "App Store"
keywords:
  - "Shadowrocket 小火箭"
  - "Shadowrocket 小火箭美区 Apple ID 购买注意什么"
  - "小火箭 App Store 下载"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "Shadowrocket"
intent: "navigational"
pillar: "clients"
related:
  - "/clients/ios/"
  - "/clients/stash/"
  - "/clients/quantumult-x/"
  - "/clients/surge/"
  - "/tutorials/ios/"
  - "/tutorials/subscription/"
  - "/risk/security/"
draft: false
answerFirst: "Shadowrocket（俗称小火箭）是 iOS 与 iPadOS 生态普及率最高的付费规则代理客户端，内置自研多协议内核，支持通用订阅、Clash 格式转换及单节点扫码导入。中国大陆区 App Store 已下架，须切换至美国等海外地区 App Store 购买下载（美区显示为付费应用，具体价格以商店为准），且切勿在系统 iCloud 中登录来源不明的共享账号。"
---

# Shadowrocket（小火箭）：iOS 主流规则代理工具解析

::: tip 核心结论（Answer-First）
**Shadowrocket（小火箭）** 是 iPhone 与 iPad 上生态最成熟、协议支持最全的商业规则代理工具，具备订阅管理、规则分流、本地延迟测试与实时网络请求查看能力。购买下载前需注意两点：**它并非免费软件**（美国 App Store 等海外区显示为付费买断应用），且**获取外区账号时只能登录 App Store 商店，绝对不要在手机“设置 → iCloud”登录他人共享账号**。
:::

## 一、软件属性与核心能力

| 属性项 | 核验信息 |
|---|---|
| **发布渠道** | 海外区 App Store（如美国、香港、台湾等地区商店） |
| **收费模式** | 付费应用（美区 App Store 显示为付费买断，具体售价与上架状态以所属地区商店为准） |
| **支持设备** | iPhone、iPad（以及部分兼容运行的 Apple Silicon Mac） |
| **底层内核** | 自研多协议引擎 |
| **核心特点** | 规则代理、订阅管理、扫码导入、流量与请求日志查看 |

## 二、外区 Apple ID 购买与下载避坑清单

1. **辨别官方正版应用**：App Store 搜索 `Shadowrocket` 时曾出现过名称极其相似的山寨仿冒软件，甚至诱导高价周订阅扣费。下单前务必认准正规开发者信息与老牌小火箭图标，切勿下载名字带多余后缀的“假火箭”。
2. **仅在 App Store 切换账号**：如果借用或使用独立注册的海外区 Apple ID，只在 App Store 右上角头像处退出并登录该账号；**千万不要在系统“设置”最顶部的 iCloud 账户处登录陌生共享账号**，否则存在设备被远程锁死（激活锁）或通讯录/相册被同步的高危风险。
3. **跨地区价格差异**：小火箭在中国大陆区 App Store 不提供上架；不同海外区 App Store 的实时价格与汇率换算会有差异，实际售价以点击购买时商店弹窗为准。

## 三、自研多协议内核与加密传输支持矩阵

Shadowrocket 之所以在 iOS 生态经久不衰，核心原因在于其作者对新兴抗封锁协议的跟进速度极快，且无需依赖复杂的 YAML 格式即可直接解析几乎所有机场节点与协议：

| 协议 / 机制 | 小火箭支持度 | 关键参数要求与 iOS 实现机制 |
|---|---|---|
| **VLESS Reality** | 原生完整支持 | 支持 `xtls-rprx-vision` 流控、Reality `publicKey`（公钥）、`shortId` 以及 uTLS 客户端指纹模拟（`chrome` / `ios` / `safari`），可直接扫二维码或由通用订阅自动拉取。 |
| **Hysteria 2 (UDP QUIC)** | 原生完整支持 | 完整支持 `hysteria2://` 节点、`obfs=salamander` 混淆密码、端口跳跃（Port Hopping，如 `20000-50000`）与上下行速率配置；使用前需确保小火箭“设置 → UDP → 开启转发”处于启用状态。 |
| **Shadowsocks-2022 / Trojan** | 原生完整支持 | 支持 `2022-blake3-aes-128-gcm` / `2022-blake3-aes-256-gcm` / `2022-blake3-chacha20-poly1305` 与 `UoT`（UDP over TCP）；Trojan 支持 `ws` / `grpc` 传输层与自定义 `peer`（SNI）。 |
| **TUIC v5 / AnyTLS / WireGuard** | 原生完整支持 | 支持 TUIC v5 的 UUID + 密码鉴权、WireGuard 端到端隧道及链式代理（`代理链 / Proxy Chain`，适合通过机场节点中转固定落地住宅 IP 解锁高风控 AI）。 |
| **Fake-IP 与域名嗅探** | 配置级支持 | 支持在“设置 → DNS / 虚拟网卡”或 `.conf` 配置文件中启用 Fake-IP 映射与 TLS SNI 嗅探，规避国内移动蜂窝网络下的 DNS 抢答污染。 |

## 四、针对 ChatGPT / Claude / Gemini 的 Conf 分流配置与 UDP 设置

在小火箭中访问 ChatGPT iOS 客户端、Claude 或 Google Gemini 时，最常犯的两个错误是**将全局路由错选为“直连/代理”**，或者**机场排在第一位的香港节点被默认选中导致 AI 报地区不支持**。建议按以下工程规范配置：

1. **锁定“配置（Config）”全局路由**：在首页“全局路由”中务必勾选**配置**（按规则分流），并手动点选一个明确标注为**美国、新加坡或日本**的节点（避开香港、澳门、俄罗斯等受限地区）。
2. **自定义 `.conf` 规则分流模板**：进入小火箭底部的“配置（Config）”标签页，点击当前生效的配置文件（或新建远程配置），在 `[General]` 与 `[Rule]` 段中加入 AI 核心域名规则，确保相关鉴权与静态资源全部强制走代理且禁用容易触发阻断的 QUIC 请求：

```ini
[General]
bypass-system = true
skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, localhost, *.local
tun-excluded-routes = 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.168.0.0/16, 224.0.0.0/4
dns-server = https://223.5.5.5/dns-query, https://1.12.12.12/dns-query
fallback-dns-server = https://1.1.1.1/dns-query, https://8.8.8.8/dns-query
ipv6 = false
prefer-ipv6 = false

[Rule]
# 阻断 AI 与流媒体常见 UDP 443 QUIC 探测，强制回退稳定 TCP TLS
AND,((PROTOCOL,UDP),(DEST-PORT,443)),REJECT-NO-DROP

# OpenAI / ChatGPT 全家桶分流
DOMAIN-SUFFIX,openai.com,PROXY
DOMAIN-SUFFIX,chatgpt.com,PROXY
DOMAIN-SUFFIX,oaistatic.com,PROXY
DOMAIN-SUFFIX,oaiusercontent.com,PROXY
DOMAIN-KEYWORD,openai,PROXY

# Anthropic / Claude 分流
DOMAIN-SUFFIX,anthropic.com,PROXY
DOMAIN-SUFFIX,claude.ai,PROXY

# Google Gemini / AI Studio 分流
DOMAIN-SUFFIX,gemini.google.com,PROXY
DOMAIN-SUFFIX,generativelanguage.googleapis.com,PROXY
DOMAIN-SUFFIX,makersuite.google.com,PROXY
DOMAIN-SUFFIX,aistudio.google.com,PROXY

# 国内直连与兜底规则
GEOIP,CN,DIRECT
FINAL,PROXY,dns-failed
```

3. **代理链（固定住宅 IP 进阶用法）**：若你购买了专门用于防封号的海外静态住宅 Socks5/HTTP 落地 IP，可在小火箭中添加该落地节点，并在“代理通过（Relay / Proxy Chain）”中指定由机场专线节点负责前置中转，从而兼顾国内高速入口与海外纯净住宅出口。

## 五、Shadowrocket 高频异常排查对照表

| 报错症状 / 异常现象 | 核心触发原因 | 核验与解决步骤 |
|---|---|---|
| **连通性测试全部显示绿色毫秒数，但网页与 App 完全打不开** | 测速默认只测 ICMP/TCP Ping，或者手机系统时间与标准时间误差超过 90 秒导致 TLS/VMess 握手失败 | 1. 进入小火箭“设置 → 延迟测试方法”，由 `TCP` 改为 **`CONNECT`**（真连接测试）；2. 检查 iPhone“设置 → 通用 → 日期与时间”是否开启了**自动设置**。 |
| **ChatGPT 官方 iOS App 无法登录，提示 `Something went wrong` 或 `Unsupported Country`** | 当前选中了香港节点、开启了 IPv6 泄漏真实位置，或节点 IP 被 Cloudflare 盾拦截 | 1. 切换至美国/日本/新加坡节点；2. 在配置中确认 `ipv6 = false`；3. 先用 Safari 无痕模式登录 `chatgpt.com` 测试节点是否通过 Cloudflare 验证。 |
| **刷国内抖音、微信图片或淘宝极慢，且机场流量消耗异常快** | 首页“全局路由”被误设为**代理（Proxy）**，导致国内流量全部绕行海外节点 | 回到小火箭首页，点击“全局路由”，将其从“代理”切回**配置（Config）**，并确认配置文件底部包含 `GEOIP,CN,DIRECT` 规则。 |
| **更新机场订阅时提示 `タイムアウト / Timed Out` 或 `SSL Error`** | 机场订阅域名被本地宽带 DNS 污染，或当前已开启着失效节点去拉取订阅 | 先断开小火箭 VPN 开关，切换手机至 5G 移动流量后下拉刷新订阅；若订阅域名本身被墙，则先连上一个可用备用节点再更新订阅。 |

## 六、安装与配置实操入口

本页聚焦小火箭选型、协议矩阵与分流排错；完整的**美区下载后首次导入机场订阅、延迟测试与开启分流模式步骤**，请直接按 [iOS 小火箭配置教程](/tutorials/ios/) 执行。

## 七、常见问题（FAQ）

### 为什么别人说用“共享账号”免费下小火箭很危险？
如果将他人共享账号登录进手机“设置 → iCloud”并开启“查找我的 iPhone”，账号控制者可以远程将你的手机设为丢失模式并锁死设备，进而实施勒索。安全做法是使用自己注册维护的独立海外区 Apple ID，且**只在 App Store 应用商店内登录下载**，绝不登录系统设置顶部的 iCloud。

### 苹果手机用小火箭好，还是用免费的 Hiddify / Karing 好？
如果预算允许且追求极低折腾成本，Shadowrocket 生态教程最丰富、长期稳定性与各类机场协议兼容度高；如果不想花钱买断或已有现成多端统一诉求，可先查看 [iOS 苹果代理客户端指南](/clients/ios/) 中的 [Hiddify](/clients/hiddify/)、[Karing](/clients/karing/) 或 [sing-box（SFI）](/clients/sing-box/)。

### 小火箭导入机场的“Clash 订阅”和“通用订阅”哪个更好？
小火箭最推荐导入机场后台的**“Shadowrocket 专用订阅”或“通用（V2Ray/Base64）订阅”**。虽然小火箭也具备一定程度解析 Clash YAML 节点列表的能力，但直接导入 Clash YAML 通常无法继承 YAML 里的策略组与分流规则，仍需配合小火箭自己的 `.conf` 配置文件实现分流。

### 为什么小火箭开启后耗电明显增加或手机发热？
常见原因有两个：一是开启了全局**HTTPS 解密（MitM）**与大量去广告重写脚本，导致每次网络请求都在手机 CPU 上做证书重签与正则匹配；二是开启了“日志记录”且未限制缓存。日常用于 AI 解锁与外网访问时，建议在“设置 → 日志”中关闭详细调试日志，并保持 HTTPS 解密关闭。

## 八、同类替代与相关链接

- **iOS 同类付费工具**：[Stash](/clients/stash/)（原生 Clash 规则生态） · [Quantumult X](/clients/quantumult-x/)（重写与脚本强项） · [Surge](/clients/surge/)（专业网络调试）
- **实操与风控**：[iOS 机场配置教程](/tutorials/ios/) · [代理客户端下载安全](/risk/security/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
