---
title: "TUN 模式开启教程：虚拟网卡接管终端与 Docker"
description: "讲解代理客户端 TUN 虚拟网卡模式原理，提供 Windows 服务模式安装、macOS/Linux 权限设置、Clash Verge Rev 开启与命令行验证。"
date: "2026-11-23"
updated: "2026-11-23"
category: "使用教程"
tags:
  - "TUN 模式开启教程"
  - "TUN 虚拟网卡"
  - "服务模式"
  - "终端代理"
keywords:
  - "TUN 模式开启教程"
  - "Clash TUN 虚拟网卡模式怎么开"
  - "终端和桌面应用接管代理"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "TUN 模式"
intent: "informational"
pillar: "tutorials"
related:
  - "/tutorials/windows/"
  - "/tutorials/dns/"
  - "/troubleshooting/tun/"
  - "/troubleshooting/startup/"
  - "/clients/clash-verge-rev/"
draft: false
answerFirst: "TUN 模式通过在操作系统内创建一块虚拟网卡（通常配合 gvisor 或 system 网络栈）在三层网络层截获几乎全部 TCP/UDP 流量，从而解决普通“系统代理”无法接管终端 curl、git、Python AI 脚本、游戏客户端或部分桌面应用（如 ChatGPT/Claude Desktop）的问题。开启 TUN 的核心前提是安装系统服务（Service Mode）或赋予管理员/root 权限，并在出现冲突时排查 WSL/Docker 路由碰撞。"
---

# TUN 虚拟网卡模式开启教程

::: tip 核心结论（Answer-First）
桌面系统默认的“系统代理（System Proxy）”本质上只是写了一个 HTTP/SOCKS 端口告知，**浏览器会遵守它，但大量终端命令行（`curl`、`git`、`npm`、`pip`）、桌面端软件和游戏并不会读取系统代理**。开启 **TUN 模式** 等于在系统底层插入一张虚拟网卡，把所有出口流量统一送进代理内核按规则分流，是开发调试、AI CLI 工具与桌面 App 必备的接管模式。
:::

## 一、系统代理 vs TUN 模式工程对比

| 特性维度 | 系统代理（System Proxy） | TUN 虚拟网卡模式 |
|---|---|---|
| **工作层级** | 应用层环境变量 / 系统注册表声明 | 操作系统网络栈三层（IP 包级）虚拟网卡接管 |
| **浏览器兼容性** | 完美支持 Chrome / Edge / Safari / Firefox | 完美支持 |
| **终端 / `git` / AI CLI / Docker** | 默认**不走代理**（必须手动 `export http_proxy`） | **原生全自动接管**，无需逐个配置环境变量 |
| **UDP 流量支持** | 普通 HTTP 系统代理不支持转发 UDP | 支持（配合 Mihomo/sing-box 可转发 UDP / DNS） |
| **系统权限要求** | 普通用户权限即可开启 | **必须安装服务模式（Service Mode）或管理员权限** |
| **潜在副作用** | 异常强退可能残留代理设置 | 可能与公司内网 VPN、Docker 网桥或 WSL2 发生路由冲突 |

## 二、Windows / macOS / Linux 开启 TUN 标准步骤（以 Clash Verge Rev 为例）

### 第 1 步：安装或授权服务模式（Service Mode）
直接打开未提权的客户端去拨动 TUN 开关，通常会灰掉或报错。
- **Windows**：打开 Clash Verge Rev → 左侧栏进入 **“设置（Settings）”** → 找到 **“服务模式（Service Mode）”** 旁的盾牌/管理按钮 → 点击 **Install** 并在弹出的 UAC 系统窗口允许管理员授权安装。看到图标变为绿色运行中状态即可。
- **macOS**：进入“设置”安装辅助授权服务，或确保主程序在“系统设置 → 隐私与安全性”已获允许创建系统网络扩展/虚拟网卡。
- **Linux**：运行安装脚本或按官方指引授予内核二进制文件 `CAP_NET_ADMIN` 权限（`sudo setcap cap_net_admin,cap_net_bind_service=+ep /path/to/verge-mihomo`）。

### 第 2 步：开启 DNS 配合（关键防坑）
在 Mihomo / Clash 架构中，**TUN 模式强依赖代理内核的内置 DNS 模块工作**。务必确认配置里已开启内置 DNS（推荐使用标准的 `Fake-IP` 模式；详细参数见[代理 DNS 设置教程](/tutorials/dns/)），否则开启 TUN 后会出现所有网页无法解析域名的“假断网”。

### 第 3 步：拨动 TUN 模式开关
回到 Clash Verge Rev 主界面或“设置”页面，打开 **TUN 模式（TUN Mode）** 开关；如果原本也开了“系统代理”，可保持系统代理关闭（纯 TUN 接管）或并存（注意少数客户端会建议只开其一减少环路）。

## 三、可执行验证：确认终端与直连路由无误

开启 TUN 后，请**不要在命令里加 `-x http://127.0.0.1:7890`**，直接运行原生网络命令来证明虚拟网卡接管成功：

```bash
# 1. 不带任何代理参数，直接验证终端出口 IP 是否已变成节点归属地
curl -s https://api.ip.sb/geoip

# 2. 验证系统是否已存在虚拟网卡（Windows PowerShell / Linux / macOS）
# Windows PowerShell:
# Get-NetAdapter | Where-Object {$_.InterfaceDescription -match "Wintun|Meta|Sing-box|Clash"}
# Linux / macOS:
ifconfig 2>/dev/null | grep -E "utun|tun|Meta" -A 2 || ip addr show | grep -E "tun|Meta"

# 3. 验证国内直连域名依然高速直达、未出现环路死锁
curl -I -s -o /dev/null -w "code=%{http_code} time=%{time_total}s\n" https://www.baidu.com
```

- **预期结果**：在未设置任何 `http_proxy` 环境变量的前提下，`curl -s https://api.ip.sb/geoip` 直接输出海外节点 IP 与国家代码，且 `baidu.com` 在半秒内返回 `200`。

## 四、边界情况与冲突预警

1. **同时使用公司内网 VPN（如 EasyConnect / Cisco AnyConnect / WireGuard）**：企业 VPN 同样会在系统中创建虚拟网卡并修改默认路由表，与代理客户端的 TUN 模式**极大概率发生路由争夺导致全网中断**。办公内网连入期间请临时关闭 TUN。
2. **Windows WSL2 / Docker Desktop**：部分情况下 `Fake-IP` 网段（默认 `198.18.0.0/16`）或网卡路由权重会与容器网络打架。若开 TUN 后发现整个电脑断网，请立即关闭 TUN 并按 [TUN 模式断网排查](/troubleshooting/tun/) 定位解决。

## 五、常见问题（FAQ）

### 为什么我点击“安装服务模式”失败或提示权限被拒绝？
常见原因包括：客户端安装在受保护路径或路径含中文空格、第三方安全管家/杀毒软件拦截了服务注册、或此前残留旧版本服务未卸载干净。排查步骤见[客户端无法启动或权限报错排查](/troubleshooting/startup/)。

### 开着 TUN 模式玩国内联机游戏会增加延迟或丢包吗？
虽然规则分流会让国内游戏 IP 走 `DIRECT`，但所有数据包仍需经过一层虚拟网卡内核转发与规则匹配，对延迟极度敏感的竞技网游或反作弊系统（部分内核级反作弊驱动对虚拟网卡敏感）玩家，打游戏时建议关闭 TUN 模式。

## 六、相关入口与信息来源

- **故障应急**：[开启 TUN 模式后断网排查](/troubleshooting/tun/) · [客户端无法启动排查](/troubleshooting/startup/)
- **配套教程**：[代理 DNS 设置教程](/tutorials/dns/) · [Windows 新手配置](/tutorials/windows/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
