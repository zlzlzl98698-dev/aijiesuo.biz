---
title: "Windows 科学上网设置：装端、导订阅与连通验证"
description: "面向零基础用户的 Windows 电脑代理配置完整流程：从校对系统时间、安装 Clash Verge Rev、导入机场订阅、开启系统代理到命令行与浏览器连通验证。"
date: "2026-11-23"
updated: "2026-11-23"
category: "使用教程"
tags:
  - "Windows 科学上网设置"
  - "Clash Verge Rev"
  - "PC 系统代理"
  - "新手教程"
keywords:
  - "Windows 科学上网设置"
  - "Windows 电脑导入机场订阅步骤"
  - "PC 端系统代理配置"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "Windows 代理教程"
intent: "informational"
pillar: "tutorials"
related:
  - "/clients/windows/"
  - "/clients/clash-verge-rev/"
  - "/tutorials/subscription/"
  - "/tutorials/tun/"
  - "/troubleshooting/timeout/"
  - "/troubleshooting/connection/"
draft: false
answerFirst: "Windows 新手配置科学上网最快路径是：校准系统自动时间 → 从官方 GitHub 安装 Clash Verge Rev（或使用机场专属客户端）→ 导入机场 Clash 订阅并刷新 → 在代理页面选中低延迟节点并保持“规则（Rule）”模式 → 开启“系统代理（System Proxy）”并用命令行或浏览器核对海外 IP 生效。"
---

# Windows 新手科学上网设置教程

::: tip 核心结论（Answer-First）
在原版 Clash for Windows 停更后，目前 Windows 电脑通用配置推荐以 **[Clash Verge Rev](/clients/clash-verge-rev/)**（或轻量端 [FlClash](/clients/flclash/)）作为标准入口。只要你的服务商支持 Clash 订阅，全流程大约 3–5 分钟即可跑通；若服务商采用纯专属客户端模式（无订阅链接），直接运行官方安装包登录即可。
:::

## 一、配置前准备与环境检查

1. **校准 Windows 系统时间（极易被忽视）**：现代代理协议（VMess、VLESS、Trojan、TLS）要求本机时间与标准 UTC 时间误差在 60 秒以内，否则节点会全部超时。右键任务栏右下角时间 → “调整日期和时间” → 确保开启**“自动设置时间”**并点击“立即同步”。
2. **确认杀毒软件与端口冲突**：暂时关闭多余的浏览器代理扩展（如 SwitchyOmega），避免接管冲突；如果下载 GitHub 安装包被 Windows Defender SmartScreen 拦截，在确认来自官方 Release 页后点击“更多信息 → 仍要运行”。

## 二、分步操作流程（以 Clash Verge Rev 为例）

### 第 1 步：下载并安装客户端
前往 [Windows 机场客户端指南](/clients/windows/) 核对本机架构（绝大多数台式机/笔记本为 `x64`，运行 Windows on ARM 选 `arm64`），安装后启动软件。首次启动如弹出防火墙权限提示，务必勾选允许专用与公用网络通信。

### 第 2 步：导入机场订阅
1. 登录你的机场用户后台，点击“一键订阅 → 复制 Clash 订阅地址”。（若在机场教程页点击“一键导入”未能自动拉起，请务必采用复制链接手动粘贴方式。）
2. 打开 Clash Verge Rev 左侧菜单 **“订阅（Profiles）”**，在顶部输入栏粘贴刚复制的 HTTPS 订阅 URL，点击右侧 **“导入（Import）”**。
3. 导入成功后，点击新出现的配置卡片使其**高亮激活**（若导入报错，请按 [订阅更新失败排查](/troubleshooting/subscription/) 处理）。

### 第 3 步：测试延迟并选定节点
1. 点击左侧 **“代理（Proxies）”**。
2. 保持顶部的代理模式为 **“规则（Rule）”**（切勿长期停留在 Global 全局模式）。
3. 展开主策略组，点击组名右侧的延迟测速小图标（闪电/Wi-Fi 图标），剔除显示 `Timeout` 的节点，选定一条绿色延迟的节点（如需访问 [ChatGPT](/ai/chatgpt/)、[Claude](/ai/claude/) 或 [Gemini](/ai/gemini/)，请勿盲目选香港，优先尝试新加坡或美国节点）。

### 第 4 步：开启“系统代理”开关
点击左侧 **“设置（Settings）”**，打开 **“系统代理（System Proxy）”** 开关。此时任务栏托盘区的客户端图标状态会发生变化，浏览器流量即刻受规则分流接管。
> 注：如果你还需要让 Windows 终端（PowerShell/CMD）、`git` 或不支持系统代理的桌面软件走代理，请继续按 [TUN 模式开启教程](/tutorials/tun/) 安装服务模式并打开 TUN 开关。

## 三、可执行验证：确认代理与国内外分流已生效

打开 Windows PowerShell，分别执行以下两条验证命令（假设混合端口为默认的 `7897` 或 `7890`，可在 Clash Verge Rev 设置里查看实际 `混合端口` 数字替换）：

```powershell
# 1. 验证系统代理端口是否正常监听且能够访问海外节点 IP（请将 7897 替换为你客户端显示的实际端口）
curl.exe -s -x http://127.0.0.1:7897 https://api.ip.sb/geoip

# 2. 验证 Google 204 连通状态（返回 HTTP/1.1 204 即通畅）
curl.exe -I -x http://127.0.0.1:7897 https://www.google.com/generate_204
```

- **预期结果**：第 1 条命令返回 JSON 数据且 `country` 字段与你所选节点国家一致；第 2 条返回 `204 No Content`；同时用浏览器打开百度应秒开（直连不走节点）。

## 四、常见问题（FAQ）

### 我关闭电脑前没退客户端，第二天开机后打不开任何网页怎么办？
如果直接关机或强杀进程，Windows 系统代理注册表里的 `127.0.0.1:7897` 可能没有被自动清理，导致系统把网页请求发向一个根本没启动的端口。打开 Windows “设置 → 网络和 Internet → 代理 → 手动设置代理”，关闭“使用代理服务器”即可瞬间恢复正常；或者重新启动一次代理客户端。详见 [连上代理无法上网排查](/troubleshooting/connection/)。

### 为什么浏览器打开没问题，但 Windows Terminal 里的 `pip` 或 `claude` 命令还是连不上？
因为 Windows “系统代理”默认不会接管所有控制台程序。需要打开客户端的 **TUN 虚拟网卡模式**，或在终端临时运行 `$env:HTTPS_PROXY="http://127.0.0.1:7897"`。

## 五、相关入口与信息来源

- **客户端参考**：[Windows 机场客户端](/clients/windows/) · [Clash Verge Rev](/clients/clash-verge-rev/) · [v2rayN](/clients/v2rayn/)
- **故障排除**：[节点超时排查](/troubleshooting/timeout/) · [客户端无法启动排查](/troubleshooting/startup/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
