---
title: "代理 DNS 泄漏排查：国内变慢与 Fake-IP 修复"
description: "系统排查开启代理后国内网站变慢打不开、域名解析超时（NXDOMAIN/DNS_PROBE_FINISHED）以及 Fake-IP 缓存异常导致的 DNS 泄漏问题。"
date: "2026-11-23"
updated: "2026-11-23"
category: "故障排查"
tags:
  - "DNS 泄漏"
  - "DNS 污染"
  - "Fake-IP"
  - "国内网站变慢"
keywords:
  - "代理 DNS 泄漏与解析失败"
  - "开启代理后国内网站变慢或打不开"
  - "Fake-IP 缓存异常清理"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "代理 DNS 故障"
intent: "troubleshooting"
pillar: "troubleshooting"
related:
  - "/troubleshooting/"
  - "/tutorials/dns/"
  - "/troubleshooting/tun/"
  - "/ai/youtube/"
  - "/ai/gemini/"
draft: false
answerFirst: "开启代理后国内网站变慢、海外网站报 DNS_PROBE_FINISHED_NXDOMAIN 或流媒体定位异常，九成是因为 DNS 分流失效或 Fake-IP 缓存污染：例如客户端未配置国内 DNS 分流政策把淘宝解析去了海外节点、关闭 TUN 后本机网卡依然残留 198.18.x.x 虚构 IP 缓存，或浏览器自带的“安全 DNS”绕过了代理内核。"
---

# 代理 DNS 泄漏与解析失败排查与修复

::: tip 核心结论（Answer-First）
DNS 问题最典型的特征是**“能通但特别慢”，或“关了代理以后反而电脑连国内网也断了”**。解决 DNS 异常的核心抓三点：**清除系统与浏览器残留的旧 `198.18.x.x` Fake-IP 缓存**、**关闭浏览器自带加密 DNS 旁路**、以及**在配置中分离国内外 DNS 解析器（`geosite:cn` 走国内 DoH，代理域名走海外加密解析）**。
:::

## 1. 故障表现

- 开启代理后，打开微博、淘宝、国内网盘或公司内网明显变卡，图片半天加载不出来。
- 浏览器频繁报错 `DNS_PROBE_FINISHED_NXDOMAIN`、`DNS_PROBE_FINISHED_BAD_CONFIG`，刷新几次才出来。
- 已经关闭代理客户端并断开 TUN 模式，但打开特定网站仍卡死不动（实际解析到了残留的 `198.18.x.x` Fake-IP）。
- 海外服务（如 YouTube、Gemini、Disney+）显示定位“送中”或地区异常，且 `ipleak.net` 测出国内宽带运营商 DNS IP。

## 2. 可能原因

1. **Fake-IP 缓存未刷新（极高频）**：在运行 TUN 模式或增强型 Clash 后，操作系统或 Chrome 浏览器缓存了 `198.18.x.x` 虚构 IP；当停用代理、退出软件或切换至其他无 Fake-IP 的客户端后，浏览器仍把域名往虚构内网段发包导致无响应。
2. **缺少国内 DNS 分流策略（`nameserver-policy`）**：配置里所有域名统统拿去问海外 DNS（如 `8.8.8.8` 或 `1.1.1.1`），导致腾讯/阿里等国内服务的就近 CDN 调度失效，把你分配到海外甚至绕美绕欧的边缘服务器上。
3. **缺失 `proxy-server-nameserver` 造成自锁**：解析机场中转节点域名本身走了代理 DNS，导致核心启动初期连节点服务器域名都查不到 IP。
4. **浏览器自带“安全 DNS（DoH）”绕行**：Chrome/Edge 默认启用自有安全 DNS 后，部分解析请求不经过系统/代理内核拦截，直接泄漏真实位置或导致部分内网/规则分流失效。
5. **开启了 IPv6 但规则/DNS 未接管 IPv6**：本地宽带返回了 AAAA（IPv6）污染记录或直连泄漏，导致目标平台判定地理位置冲突。

## 3. 诊断顺序

1. **查 `nslookup` 返回 IP**：看当前报错的域名解析出来的到底是不是 `198.18.x.x`、正常公网 IP，还是根本超时的污染假 IP。
2. **查浏览器安全 DNS 开关**：确认是否被浏览器自有 DoH 劫持。
3. **查客户端 DNS 配置与 Fake-IP 缓存**：确认国内域名是否走国内 DNS，以及停用/重启代理时是否清理了缓存。

## 4. 修复步骤

### 步骤 1：清理系统与浏览器 Fake-IP 残留缓存
- **Windows**：打开管理员 CMD 或 PowerShell 运行：
  ```powershell
  ipconfig /flushdns
  ```
- **macOS**：打开终端运行：
  ```bash
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
  ```
- **Chrome / Edge 浏览器内部缓存清理**：在地址栏访问 `chrome://net-internals/#dns`（Edge 访问 `edge://net-internals/#dns`），点击 **Clear host cache**；随后切到侧边 `Sockets` 点击 **Flush socket pools**。
- **在客户端内清理 Fake-IP 数据库**：在 Clash Verge Rev / OpenClash 设置中找到“清空 Fake-IP 缓存”按钮点击一次并重启核心。

### 步骤 2：关闭浏览器自带“安全 DNS”
- 打开 Chrome/Edge 设置 → “隐私和安全” → “安全” → 将 **“使用安全 DNS”关闭**（或设为跟随系统默认），把解析权完全统一交还给代理客户端。

### 步骤 3：配置严格的国内外 DNS 分流（Mihomo 参考）
按照 [代理 DNS 设置教程](/tutorials/dns/) 的标准结构，通过客户端配置覆写（Merge）明确写入三层 DNS 规则：
- `proxy-server-nameserver`: 设为国内快速 DNS（如 `223.5.5.5`、`https://doh.pub/dns-query`），保障节点域名随时能解开。
- `nameserver-policy`: 为 `"geosite:cn,private"` 单独指定国内 DNS，保障淘宝/网盘恢复本地极速节点调度。
- `nameserver`: 设为海外加密 DNS（配合 `respect-rules: true`），保障海外域名绝不在本地运营商明文泄漏。

### 步骤 4：将冲突域名加入 `fake-ip-filter` 或尝试切回 `redir-host`
- 若某个国内特定网银、公司内网域名或 NAS 域名在 Fake-IP 下始终异常，将其加入客户端 DNS 的 `fake-ip-filter` 白名单（例如 `"+.company.internal"`）；如大量软件不兼容，可临时将 `enhanced-mode` 切换为 `redir-host`。

## 5. 验证结果

```bash
# 1. 验证开启 TUN/Fake-IP 时海外域名是否正常由内核接管，关闭代理刷新缓存后是否恢复真实解析
nslookup www.google.com

# 2. 测试国内主要网站直连延迟，应恢复至几十毫秒水平而非数秒
curl -I -s -o /dev/null -w "code=%{http_code} time_total=%{time_total}s\n" https://www.taobao.com
```

同时打开在线 DNS 泄漏测试网站（如 `ipleak.net` 或 `browserleaks.com/dns`），确认列表中不再暴露本地省市国内运营商 DNS IP。

## 6. 进一步处理

- 若问题只发生在开启 TUN 模式的一瞬间，且所有国内/外网络同步瘫痪，请重点排查 [开启 TUN 模式后断网](/troubleshooting/tun/) 中的多网卡与 Docker/WSL 冲突。
- 若怀疑是特定流媒体送中问题，可配合查看 [YouTube 防送中与 4K 节点指南](/ai/youtube/)。
- 若本地配置已完全按标准完成、但仍频繁遭遇海外域名解析漂移或流媒体/AI 地区误判，往往与上游节点出口 IP 质量有关，可对照 [光速云评测（含多地区与三网实测样本）](/reviews/guangsu/)、在 [2026 机场推荐](/airport/recommend/) 或 [高性价比专线评估](/pricing/value/) 中核查更稳妥的线路架构。
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
