---
title: "代理 DNS 设置教程：Fake-IP 与防泄漏配置"
description: "解析代理环境 DNS 污染与泄漏原理，对比 Mihomo/Clash 的 Fake-IP 与 Redir-Host 模式优劣，附防泄漏 YAML 配置与终端验证命令。"
date: "2026-11-23"
updated: "2026-11-23"
category: "使用教程"
tags:
  - "代理 DNS 设置教程"
  - "Fake-IP"
  - "Redir-Host"
  - "DNS 防泄漏"
keywords:
  - "代理 DNS 设置教程"
  - "Fake-IP 与 Redir-Host 区别"
  - "代理防 DNS 泄漏配置"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "代理 DNS"
intent: "informational"
pillar: "tutorials"
related:
  - "/tutorials/tun/"
  - "/tutorials/routing/"
  - "/troubleshooting/dns/"
  - "/ai/youtube/"
  - "/ai/disney/"
draft: false
answerFirst: "在开启 TUN 或透明代理时，仅代理 TCP 连接而不接管 DNS 会导致域名在本地运营商网络就被污染或把真实位置暴露给海外平台（DNS 泄漏）。Fake-IP 模式直接返回 198.18.0.0/16 保留段虚构 IP 给本机、将域名交由远端节点解析，防泄漏与响应速度最优；Redir-Host 返回真实解析 IP，兼容性更高但需要严格拆分国内外域名解析器防止污染。"
---

# 代理 DNS 设置教程：Fake-IP vs Redir-Host 与防泄漏配置

::: tip 核心结论（Answer-First）
很多用户遇到“节点延迟明明很低，但打开海外网站先卡 5 秒、国内网站打不开，或者 YouTube/Netflix 判定位置异常”，根源往往不在节点本身，而在 **DNS 解析走错了路径**。在 Mihomo/Clash 等现代内核中，日常与 TUN 模式首选 **`Fake-IP` 模式**配合国内直连 `nameserver` 分流；仅在部分企业内网软件、局域网穿透或游戏反作弊与虚构 IP 冲突时才回退至 **`Redir-Host` 模式**。
:::

## 一、Fake-IP 与 Redir-Host 核心机制对比

| 对比维度 | `fake-ip` 模式 | `redir-host` 模式 |
|---|---|---|
| **本地返回给浏览器的 IP** | 瞬间分配一个保留网段虚构 IP（通常为 `198.18.0.1/16`） | 等待上游 DNS 返回真实的公网 IP |
| **海外解析速度** | **极快（0ms 本地假地址返回）**，真实解析交由远端落地机执行 | 需先完成 DNS 查询再建立代理连接，略多一轮往返耗时 |
| **防 DNS 泄漏与防污染能力** | **极强**，海外域名绝不在本地先发真实明文请求 | 依赖分流策略（`nameserver-policy` / `fallback`），配置不当易泄漏 |
| **流媒体/AI 兼容性** | 兼容机场的 DNS 流媒体解锁劫持，减少本地定位偏差 | 若本地解析错误 IP，可能导致解锁机失效或 CDN 调度绕远 |
| **局限与冲突场景** | 极少数需要客户端本机先拿到真实 IP 才能校验的软件（如部分银行控件、P2P/BT、企业 VPN）可能报错 | 正常返回真实 IP，与绝大多数本地网络工具兼容较好 |

## 二、Mihomo 典型防泄漏 DNS 参考配置（可通过覆写注入）

在 [Clash Verge Rev](/clients/clash-verge-rev/) 等支持配置覆写（Merge）的客户端中，核心思路是：**用国内 DoH/UDP 解析 `geosite:cn` 国内域名（保证淘宝/微信走本地最近 CDN），用远端安全 DNS + `respect-rules` 处理海外域名（防止 DNS 泄漏）**，同时把局域网与部分敏感应用列入 `fake-ip-filter`：

```yaml
dns:
  enable: true
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  respect-rules: true
  # 用于解析 DNS 服务器域名本身（如 doh.pub）的引导 DNS
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  # 默认海外主解析器（由代理节点转发或通过 DoH 加密查询）
  nameserver:
    - https://dns.google/dns-query
    - https://cloudflare-dns.com/dns-query
  # 代理节点域名本身必须走国内安全 DNS，否则会陷入死循环！
  proxy-server-nameserver:
    - https://doh.pub/dns-query
    - 223.5.5.5
  # 国内域名精准走国内 DNS，避免百度/阿里云盘被解析到海外 CDN
  nameserver-policy:
    "geosite:cn,private":
      - https://doh.pub/dns-query
      - 223.5.5.5
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "time.*.com"
    - "ntp.*.com"
    - "+.stun.*.*"
```

> 关键注意点：一定记得配置 `proxy-server-nameserver`（指向国内快速 DNS），否则内核尝试解析机场节点域名本身时如果也去等代理通道，会陷入“鸡生蛋蛋生鸡”的死锁断网！

## 三、禁用浏览器自带“安全 DNS”防旁路

Chrome、Edge 和 Firefox 默认经常开启“使用安全 DNS（DoH）”。如果你在浏览器里设置了第三方 DoH，而它又绕过了系统或规则分流，会导致客户端分流规则失去域名上下文或直接暴露真实 IP。建议在浏览器设置中**关闭浏览器级自定义安全 DNS（改回跟随系统默认）**，把加密 DNS 统一交由代理客户端内核接管。

## 四、可执行验证：检查本机 DNS 状态与是否泄漏

完成配置并开启代理/TUN 后，请按以下两步验证解析逻辑：

```bash
# 1. 在开启 Fake-IP 与 TUN 模式下解析海外域名，应立即返回 198.18.x.x 虚构段（而非被污染的随机公网 IP）
nslookup openai.com

# 2. 解析国内典型域名，若在 fake-ip-filter 中或走直连 DNS，查看国内 CDN 连通与耗时是否正常
curl -I -s -o /dev/null -w "code=%{http_code} time_total=%{time_total}s\n" https://www.taobao.com
```

- **在线核验辅助**：开启代理后访问主流的 DNS 泄漏检测页（例如 `browserleaks.com/dns` 或 `ipleak.net`），观察检测结果中出现的 DNS 服务器列表：**如果里面出现了你本地国内宽带运营商的省市 DNS IP，说明存在 DNS 泄漏**；正常情况下应只显示海外公共 DNS（如 Google / Cloudflare）或与你节点所在国一致的解析节点。

## 五、常见问题（FAQ）

### 为什么开了 Fake-IP 后，国内网盘下载或视频网站速度变慢了？
很可能是配置里缺少 `nameserver-policy` 对 `geosite:cn` 的国内 DNS 分流，或者 `fake-ip` 将国内域名也用海外 DNS 解析，返回了海外 CDN 节点 IP。补全国内域名走 `223.5.5.5` / `doh.pub` 即可恢复满速直连。

### 既然 Fake-IP 这么好，为什么有人还要用 Redir-Host？
如果你经常在电脑上运行复杂的内网穿透、局域网设备直连调试、或部分对 `198.18.0.0/16` 虚构网段敏感的网银与游戏安全模块，切回 `Redir-Host` 配合完整的分流 DNS 可以获得更好的底层应用兼容性。

## 六、相关入口与信息来源

- **故障排查**：[代理 DNS 泄漏与解析失败排查](/troubleshooting/dns/) · [开启 TUN 后断网排查](/troubleshooting/tun/)
- **配套教程**：[TUN 模式开启教程](/tutorials/tun/) · [国内外规则分流设置](/tutorials/routing/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
