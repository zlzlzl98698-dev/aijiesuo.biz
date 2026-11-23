---
title: "机场使用教程中心：订阅导入、分平台配置与 TUN/DNS"
description: "系统化机场使用教程索引，涵盖通用订阅导入、Win/Android/iOS 新手设置、Clash 策略组进阶、TUN 虚拟网卡、DNS 防泄漏与实操指南。"
date: "2026-11-23"
updated: "2026-11-23"
category: "使用教程"
tags:
  - "机场使用教程"
  - "订阅导入"
  - "Clash 配置"
  - "TUN 模式"
keywords:
  - "机场使用教程"
  - "新手入门代理配置路径"
  - "机场与客户端搭配教程索引"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/navigation.ts"
verifiedAt: "2026-11-23"
entity: "机场使用教程"
intent: "informational"
pillar: "tutorials"
related:
  - "/tutorials/subscription/"
  - "/tutorials/windows/"
  - "/tutorials/android/"
  - "/tutorials/ios/"
  - "/tutorials/clash/"
  - "/tutorials/routing/"
  - "/tutorials/tun/"
  - "/tutorials/dns/"
  - "/tutorials/guangsu/"
draft: false
answerFirst: "新手首次使用机场只需按四步走：先确认服务商提供的是专属客户端还是第三方通用订阅链接；其次按设备系统安装对应开源或商店客户端；第三步完成订阅导入与测速；最后通过命令或浏览器验证出口 IP 与规则分流是否生效，再按需开启 TUN 或 AI 定向分流。"
---

# 机场使用教程中心

::: tip 核心结论（Answer-First）
无论使用哪家服务商与设备，代理配置的工程逻辑高度一致：**获取订阅/账号 → 安装客户端 → 拉取配置并开启分流 → 验证出口 IP 与 DNS 连通性**。如果是刚购入套餐的新手，先确认服务商支持第三方订阅还是仅提供专属端；随后直接进入对应操作系统教程，最后再通过终端命令与核验清单确认配置真正生效。
:::

<PillarIndex pillar="tutorials" />

## 一、推荐学习与配置路径

| 阶段 | 目标任务 | 对应实操页面 |
|---|---|---|
| **第 1 步：确认接入形态** | 分清一键导入、通用订阅转换与仅专属客户端区别 | [机场订阅导入教程](/tutorials/subscription/) |
| **第 2 步：按设备上手** | 在主力设备上完成软件安装、导入、选点与系统代理开启 | [Windows 教程](/tutorials/windows/) · [Android 教程](/tutorials/android/) · [iOS 小火箭教程](/tutorials/ios/) |
| **第 3 步：针对品牌配置** | 查看光速云自研客户端与 Clash/小火箭双轨导入及节点选路 | [光速云接入与使用教程](/tutorials/guangsu/) |
| **第 4 步：进阶分流与排错预防** | 配置 AI 专用节点、开启 TUN 接管终端并防止 DNS 泄漏 | [Clash 进阶](/tutorials/clash/) · [规则分流](/tutorials/routing/) · [TUN 模式](/tutorials/tun/) · [DNS 设置](/tutorials/dns/) |

## 二、全平台通用配置完成验证清单

不管你按照哪一篇教程完成配置，都建议在本地执行以下三项基础核验（不要只看客户端图标是否变绿）：

```bash
# 1. 验证本地代理端口连通性与海外出口 IP（以默认混合端口 7890 为例，请按客户端实际端口替换）
curl -I -x http://127.0.0.1:7890 https://www.google.com/generate_204
curl -s -x http://127.0.0.1:7890 https://api.ip.sb/geoip

# 2. 若已开启 TUN 虚拟网卡，无需指定 -x 参数也应直接返回海外出口归属地
curl -s https://api.ip.sb/geoip

# 3. 验证国内网站直连是否正常（应返回 200/302 且延迟极低，未绕远海外）
curl -I -s -o /dev/null -w "http_code=%{http_code} time_total=%{time_total}s\n" https://www.baidu.com
```

- **预期结果**：代理测试返回 `HTTP/1.1 204 No Content`（或 `HTTP/2 204`）且 `geoip` 返回目标节点国家信息；百度直连耗时通常在 `0.05s–0.3s` 之间。
- **若验证失败**：不要反复重启软件，请直接对照[代理故障排查总览](/troubleshooting/)定位超时、端口占用或 DNS 异常。

## 三、跨平台配置参数与内核排错速查表

在完成基础导入后，桌面端（Windows / macOS / Linux）与移动端（Android / iOS）常因底层网络接管接口、DNS 增强模式或系统级省电策略不同而出现“能连上但部分应用断网”的故障。下表汇总了 Mihomo（Clash.Meta）与 sing-box 两大主流内核在跨平台部署时的关键参数与排错基线：

| 核心配置维度 | 推荐工程参数 / 模式 | 对比方案与机制差异 | 常见异常现象与排错指令 |
|---|---|---|---|
| **DNS 解析增强模式（Fake-IP vs Redir-Host）** | 优先启用 **`fake-ip`**（虚拟 IP 池 `198.18.0.1/16`），配合 `fake-ip-filter` 豁免国内局域网与 NTP 域名 | **Fake-IP**：客户端收到 DNS 请求立即返回虚拟 IP，省去本地等待解析耗时，彻底阻断 DNS 抢答污染；**Redir-Host**：需先并发请求真实 IP 再匹配规则，延迟高且易受本地运营商劫持 | 若开启 Fake-IP 后某游戏或内网系统无法登录，将该域名加入 `fake-ip-filter` 并执行 `ipconfig /flushdns`（Win）或切换飞行模式（移动端）刷新缓存 |
| **Android `VpnService` 后台保活与省电白名单** | 系统电池管理设为 **“无限制（Unrestricted）”**；最近任务卡片加锁；开启客户端“常驻通知栏”与“自启动”权限 | Android 系统通过唯一 `VpnService` 虚拟网卡句柄接管流量；国产 ROM（HyperOS/ColorOS/OriginOS）熄屏 5 分钟后会强杀未加白名单的高耗电网络守护进程 | 锁屏后微信收不到推送或代理钥匙图标消失：进入系统“应用管理 → 耗电管理”关闭省电优化，并确认未同时开启企业微信 VPN 或抓包软件抢占 `VpnService` |
| **Android 分应用代理（Per-App Package 规则）** | **绕过模式（Bypass / 黑名单）**：将国内网银、政务、地图与高频通讯包名排除在 VPN 隧道之外 | 若全量接管所有 App，国内银行与支付软件检测到海外 IP 或虚拟网卡特征会触发风控弹窗；而浏览器、ChatGPT、Telegram 则必须走 VPN 隧道 | 建议在分应用列表勾选绕过：`com.eg.android.AlipayGphone`（支付宝）、`com.unionpay`（云闪付）、各大手机银行包名；若需微信语音稳定，可一并勾选 `com.tencent.mm` |
| **桌面端接管层级（系统代理 vs TUN 虚拟网卡）** | 日常网页浏览开启 **System Proxy（系统代理）**；终端开发、AI 桌面端与游戏开启 **TUN 模式（`stack: mixed`）** | 系统代理仅修改操作系统的 HTTP/SOCKS 环境变量，对不遵循系统代理的命令行程序（`git`、`pip`、`curl`）无效；TUN 在三层网络层创建虚拟网卡拦截全机 IP 数据包 | 终端或 IDE 插件报 `Connection timed out`：以管理员/Root 权限重启客户端并开启 TUN，勾选 `auto-route` 与 `auto-detect-interface` |
| **本地连通性与端口占用诊断** | 桌面混合端口建议设为 `7890` 或 `7897`，开启 `allow-lan: false`（仅本机使用）保障安全 | 若本机同时残留旧版 Clash、v2rayN 或游戏加速器，会导致本地监听端口冲突或系统代理注册表被反复篡改 | Win 执行 `netstat -ano \| findstr 7890`（macOS/Linux 执行 `lsof -i :7890`）检查监听进程；用 `curl -v -x http://127.0.0.1:7890 https://cp.cloudflare.com/generate_204` 验证握手全链路 |

## 四、常见问题（FAQ）

### 我买完机场后在官网找不到订阅链接，只看到下载客户端的按钮，是怎么回事？
部分机场（如[飞猫云](/brands/feimao/)、[无忧链接](/brands/wuyou/)、[SOGO 云](/brands/sogo/)等）采用“仅专属客户端”模式，不开放 Clash 或 Shadowrocket 第三方订阅链接；此时直接下载官网客户端登录账号即可，无需参考通用第三方导入步骤。

### 为什么连上以后浏览器能上 Google，终端里的 `git`、`pip` 或 AI 脚本依然超时？
绝大多数桌面客户端默认只设置“系统 HTTP/SOCKS 代理”，而命令行终端通常不自动读取系统代理。需要进入客户端开启 **[TUN 模式](/tutorials/tun/)**，或在终端会话中手动设置代理环境变量。

## 五、相关入口与信息来源

- **选型前置**：[代理客户端下载总览](/clients/) · [AI 与流媒体解锁总览](/ai/)
- **异常诊断**：[代理故障排查总览](/troubleshooting/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站全站教程导航架构索引
- **核验与更新日期**：2026-11-23
