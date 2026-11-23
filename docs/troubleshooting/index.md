---
title: "代理故障排查手册总览：节点超时、订阅失败与断网诊断"
description: "系统化机场与代理故障排查总指南，按症状快速定位客户端权限、本地网络、DNS 污染、TUN 路由冲突或 AI 地区封禁问题，并内置交互式诊断工具。"
date: "2026-11-23"
updated: "2026-11-23"
category: "故障排查"
tags:
  - "代理故障排查"
  - "节点超时"
  - "订阅失败"
  - "TUN 断网"
keywords:
  - "代理故障排查"
  - "机场连不上排错总表"
  - "常见代理报错快速诊断"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/navigation.ts"
verifiedAt: "2026-11-23"
entity: "代理故障排查"
intent: "troubleshooting"
pillar: "troubleshooting"
related:
  - "/troubleshooting/timeout/"
  - "/troubleshooting/subscription/"
  - "/troubleshooting/connection/"
  - "/troubleshooting/dns/"
  - "/troubleshooting/startup/"
  - "/troubleshooting/tun/"
  - "/troubleshooting/ai-access/"
  - "/ai/"
draft: false
answerFirst: "代理断连或打不开网站时切勿盲目卸载重装，应遵循“客户端状态 -> 本地系统时间与端口 -> DNS 解析 -> 远端节点可达性 -> 目标平台风控”的五步排查顺序。本手册按具体报错拆分为 7 大专项排错页，可配合下方交互诊断工具快速锁定故障层。"
---

# 代理故障排查手册总览

::: tip 核心结论（Answer-First）
绝大多数“机场突然不能用了”的问题并非服务商跑路，而是由**系统时间偏差、订阅域名被本地污染、浏览器扩展抢占代理端口、TUN 虚拟网卡与企业 VPN/Docker 冲突，或 AI 服务自身的地区/IP 风控**引起。按“先本地、再链路、后目标站点”的顺序诊断，90% 以上问题可在 5 分钟内定位。
:::

<PillarIndex pillar="troubleshooting" />

## 1. 故障表现（按症状快速跳转）

| 你看到的报错或现象 | 极大概率所属问题层 | 直接进入专项排错 |
|---|---|---|
| 所有节点测速全部显示 `Timeout` / `-1`，但本地国内网页正常 | 系统时间偏差、本地防火墙拦截、端口封锁或机场入口波动 | [节点连接超时 (Timeout)](/troubleshooting/timeout/) |
| 点击更新配置提示 `403`、`Timeout`、`EOF` 或节点列表变空 | 订阅域名变更、机场屏蔽 User-Agent、或走代理更新死循环 | [订阅拉取与更新失败](/troubleshooting/subscription/) |
| 客户端显示绿色已连接、延迟正常，但浏览器就是打不开网页 | 系统代理设置未生效、浏览器扩展抢占端口或端口占用冲突 | [连上节点但无法上网](/troubleshooting/connection/) |
| 开代理后百度/淘宝变慢打不开，或海外网站先转圈很久 | DNS 泄漏、国内域名未分流、Fake-IP 缓存异常 | [DNS 解析异常与污染](/troubleshooting/dns/) |
| 双击打不开、服务模式（Service Mode）装不上或报错内核缺失 | 安装路径权限不足、杀软误删核心文件或端口已被占用 | [客户端无法启动或权限报错](/troubleshooting/startup/) |
| 一打开 TUN 虚拟网卡模式整个电脑瞬间彻底断网 | 与企业 VPN、Docker、WSL2 或多网卡路由优先级冲突 | [开启 TUN 模式后断网](/troubleshooting/tun/) |
| Google/YouTube 正常，唯独 ChatGPT 提示 `1020`/`403` 或 Claude 提示受限 | 节点地区不在白名单（如香港）、共享 IP 声誉过低或浏览器指纹缓存 | [AI 工具提示不可用或封禁](/troubleshooting/ai-access/) |

## 2. 可能原因（六大故障层级划分）

1. **客户端与权限层**：系统服务未安装、核心二进制被杀毒软件误隔离、本地监听端口被其他程序占满。
2. **本地网络与路由层**：电脑系统时间误差超过 60 秒、企业/校园网拦截代理协议端口、TUN 虚拟网卡与 WSL/Docker 发生默认网关抢占。
3. **DNS 与解析层**：本地运营商 DNS 抢答污染、代理内核未配置 `proxy-server-nameserver` 导致解析循环、浏览器安全 DNS 旁路。
4. **订阅与传输链路层**：机场中转域名到期或被屏蔽、客户端内置老内核不兼容 `VLESS Reality` / `AnyTLS` 等新协议。
5. **目标站点策略层**：目标平台本身封锁地区（如香港访问 ChatGPT 网页/Claude/Gemini）或对高并发数据中心 IP 实施 WAF 拦截。
6. **服务商运营层**：流量套餐耗尽、账户到期，或服务商突发停运跑路（甄别方式参见[跑路与停运风险识别](/risk/shutdown/)）。

## 3. 诊断顺序（交互式诊断面板）

你可以先在下方诊断实验室勾选你的具体环境与症状，快速生成排查顺序：

<DiagnosticLab />

## 4. 修复步骤（通用急救五步法）

在深入各专项指南前，可先按以下最小化步骤快速排除常见低级故障：

1. **校准系统时间**：Windows/macOS/Android 全部开启“自动设置时间与时区”并立即同步一次 NTP 时间。
2. **核查订阅套餐余量**：登录机场面板确认账户未过期、剩余流量未耗尽、同时在线设备数未超上限。
3. **测试真连接延迟**：切换 2–3 个不同国家节点（如新加坡、日本、美国）对比测试 HTTP `generate_204`，排查是否仅单一节点临时维护。
4. **临时关闭冲突软件**：退出公司内网 VPN、浏览器多余代理插件（SwitchyOmega 等）及抓包软件，再重测。
5. **切换基础系统代理与无痕窗口**：排查时暂时关闭 TUN 模式，仅用普通系统代理搭配 Chrome/Edge 无痕窗口测试，隔离旧 Cookie 与容器网络干扰。

## 5. 验证结果

使用终端命令直接绕过浏览器缓存，验证本地端口连通与实际出口（将 `7897` 替换为你的客户端实际混合端口）：

```bash
# 1. 验证本地端口是否在监听
curl -I -s -o /dev/null -w "http_code=%{http_code}\n" -x http://127.0.0.1:7897 https://www.google.com/generate_204

# 2. 验证出口 IP 归属
curl -s -x http://127.0.0.1:7897 https://api.ip.sb/geoip
```

返回 `http_code=204` 且 `geoip` 返回正常海外节点信息，即说明本地至节点出站链路已完全打通。

## 6. 进一步处理

- 若本地所有排查通过但怀疑服务商本身已失联或长期跑路，请对照[跑路与停运风险识别](/risk/shutdown/)及[机场停服替代方案](/risk/alternatives/)启用备用订阅或切换服务商。
- 若明确锁定了某个专项症状，请直接点击上方表格对应专项排查页按 6 步指南修复。
- **信息来源**：《2026 第三方代理客户端开源项目台账》、`data/navigation.ts`
- **核验与更新日期**：2026-11-23
