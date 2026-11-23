---
title: "TUN 模式断网排查：多网卡与 Docker/WSL 冲突"
description: "排查开启 Clash/sing-box TUN 虚拟网卡模式后全机断网、局域网失效或 WSL2/Docker 容器无法通信的问题，提供多网卡优先级、路由排除与防火墙修复步骤。"
date: "2026-11-23"
updated: "2026-11-23"
category: "故障排查"
tags:
  - "TUN 模式断网"
  - "Docker 冲突"
  - "WSL2"
  - "虚拟网卡"
keywords:
  - "TUN 模式断网排查"
  - "开启 TUN 模式后整个电脑断网"
  - "Docker WSL 虚拟网卡冲突"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "TUN 模式断网"
intent: "troubleshooting"
pillar: "troubleshooting"
related:
  - "/troubleshooting/"
  - "/tutorials/tun/"
  - "/troubleshooting/dns/"
  - "/troubleshooting/startup/"
  - "/tutorials/dns/"
draft: false
answerFirst: "开启 TUN 虚拟网卡模式后电脑立刻彻底断网，绝不是节点问题，而是虚拟网卡接管了三层流量后出现路由或 DNS 闭环断裂：最常见于未开启客户端内置 DNS 模块（导致 TUN 有路无解析）、同时运行企业 VPN/加速器产生多虚拟网卡争夺默认网关，或 Windows WSL2 / Docker Desktop 的虚拟网桥与 TUN 路由或 Fake-IP 网段发生碰撞。"
---

# 开启 TUN 模式后断网（多网卡 / WSL / Docker 冲突）排查与修复

::: tip 核心结论（Answer-First）
**“平时开系统代理一切正常，唯独一点 TUN 模式开关，全电脑瞬间断网”** 是最典型的三层虚拟网卡路由碰撞故障。紧急恢复只需先关掉 TUN 开关；长远修复则围绕三处排查：**确认核心内置 DNS 已启用且存在国内直连引导 DNS**、**退出并存的企业 VPN 或游戏加速器**，以及**在配置中排除 Docker / WSL2 虚拟网段与本地物理网卡绑定冲突**。
:::

## 1. 故障表现

- 打开 Clash Verge Rev、v2rayN 或 sing-box 的 **TUN 模式**后几秒内，所有国内外网页（包括百度、微信、局域网路由器后台）全部断连或超时。
- 电脑上正在运行的 **WSL2（Ubuntu 子系统）、Docker 容器或公司内网 VPN** 在开启 TUN 后突然无法互联，甚至整个宿主机失联。
- 关掉 TUN 开关后，网络立刻恢复正常。

## 2. 可能原因

1. **未启用客户端内置 DNS 模块（最常见新手误区）**：TUN 模式在网络三层劫持流量，如果配置文件里 `dns.enable` 为 `false`，操作系统发往外部的 53 端口 DNS 查询请求会被虚拟网卡拦截或丢弃，表现出来就是“全机假断网”。
2. **多虚拟网卡冲突（VPN / 加速器并存）**：电脑同时开着公司内网 VPN（Cisco AnyConnect、EasyConnect、WireGuard 等）、游戏加速器或虚拟局域网（ZeroTier/Tailscale），多个虚拟网卡同时争抢默认路由表 `0.0.0.0/0` 导致流量打转死循环。
3. **WSL2 / Docker / Hyper-V 路由与网段碰撞**：Docker 默认网桥（`172.17.0.0/16`）或 WSL2 虚拟交换机开启后，如果代理客户端的 `auto-route` 把内网流量吸进 TUN、或者 Windows 防火墙拒绝了来自 WSL2 子网的跨网卡转发，会导致宿主机与子系统双双断联。
4. **未设置出站网卡绑定或 `auto-detect-interface` 异常**：代理内核自己发往海外机场服务器的加密流量，如果不小心又被写进了它自己创建的 TUN 虚拟网卡里，就会立刻形成**“自己代理自己”的死循环**（路由环路）。
5. **macOS / Windows 残余异常防火墙规则或 `wintun.dll` 异常**。

## 3. 诊断顺序

1. **先关闭 TUN 验证基础网络**：关掉 TUN 开关切回普通系统代理，确认节点和物理网卡本身没问题。
2. **查后台其他虚拟网卡**：检查系统网络适配器列表里是否有除物理网卡外的公司 VPN、ZeroTier、加速器或多余的旧版 Clash 网卡。
3. **核对 YAML 里的 `dns` 与 `tun` 关键字段**：确认 `dns.enable: true`、`auto-detect-interface: true` 与 `proxy-server-nameserver` 是否配置到位。
4. **隔离测试 Docker/WSL2**：若你是开发者，排查是全机断网还是仅容器/WSL 内断网。

## 4. 修复步骤

### 步骤 1：关闭其他冲突的虚拟网卡软件
- 退出所有其他 VPN、远程组网工具（ZeroTier/Tailscale）与网游加速器；打开 Windows“控制面板 → 网络连接”或 PowerShell 检查并清理旧版代理留下的残余虚拟网卡适配器。

### 步骤 2：补全 TUN 必备的防环路与 DNS 覆写配置（Mihomo 示例）
在 Clash Verge Rev 的“全局扩展配置（Merge）”中核对并确保包含以下安全参数（尤其注意 `auto-detect-interface` 与 `route-exclude-address`）：

```yaml
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  proxy-server-nameserver:
    - 223.5.5.5
    - https://doh.pub/dns-query
  nameserver:
    - https://dns.google/dns-query

tun:
  enable: true
  stack: system # 若部分 Windows 环境蓝屏或卡死，可改为 gvisor 或 mixed
  auto-route: true
  auto-detect-interface: true # 必须开启！确保代理出站走真实物理网卡，防止自循环
  dns-hijack:
    - any:53
  # 排除局域网与常见 Docker/WSL 网段，防止容器与内网路由碰撞
  route-exclude-address:
    - 192.168.0.0/16
    - 10.0.0.0/8
    - 172.16.0.0/12
```

### 步骤 3：针对 Windows WSL2 / Docker 用户的专项微调
- **调整网段避让**：如果上述配置开启后，WSL2 内依然无法访问外网或 Docker 拉镜像卡住，在客户端尝试切换 TUN 协议栈（`stack: mixed` 或 `gvisor`）。
- **WSL2 网络模式**：Windows 11 用户可在 `%UserProfile%\.wslconfig` 中尝试启用 `networkingMode=mirrored` 配合 `dnsTunneling=true`（具体取决于当前 Windows Build 支持情况），并在代理客户端开启“允许局域网连接（Allow LAN）”及防火墙放行，大幅减少跨虚拟交换机冲突。

## 5. 验证结果

重新开启 TUN 后，分别验证**宿主机直连**、**宿主机走代理**以及**路由/网卡信息**是否全部正常：

```powershell
# Windows PowerShell 验证（不带 -x 代理参数）
# 1. 确认存在 TUN 虚拟网卡且状态为 Up
Get-NetAdapter | Where-Object {$_.InterfaceDescription -match "Wintun|Meta|Sing-box|Clash"}

# 2. 确认国内直连与海外代理双通，无断网死循环
curl.exe -I -s -o /dev/null -w "cn_code=%{http_code}\n" https://www.baidu.com
curl.exe -s https://api.ip.sb/geoip
```

`baidu.com` 迅速返回 `200`，且 `api.ip.sb/geoip` 直接输出海外节点信息，即说明 TUN 虚拟网卡与真实物理网卡分工已恢复健康。

## 6. 进一步处理

- 若仅在使用公司内网 VPN 期间冲突，最稳妥的工程习惯是：**办公连内网时使用普通系统代理或暂时关闭 TUN**，下班断开公司 VPN 后再开启 TUN。
- 若开启 TUN 后表现为“能解析部分站点但国内网站非常慢”，请接续检查 [代理 DNS 泄漏与解析失败排查](/troubleshooting/dns/)。
- 若本地多设备办公需要稳定的第三方 Clash/sing-box 订阅兼容或备用通道，可参考不限设备且具备多协议实测记录的 [光速云评测](/reviews/guangsu/) 与 [唯兔云品牌档案](/brands/weitu/)，或在 [2026 机场推荐](/airport/recommend/) 与 [高性价比专线评估](/pricing/value/) 中挑选支持双端切换的方案。
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
