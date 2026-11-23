---
title: "代理分流规则教程：国内外流量分流与 AI 服务指定节点"
description: "讲解代理分流规则（Rule Mode）工作原理，对比全局代理与规则分流的利弊，提供国内外分流、AI 独立分流规则顺序写法及命令行验证方法。"
date: "2026-11-23"
updated: "2026-11-23"
category: "使用教程"
tags:
  - "代理分流规则教程"
  - "Rule 分流"
  - "AI 分流"
  - "国内外分流"
keywords:
  - "代理分流规则教程"
  - "国内外流量规则分流"
  - "AI 服务指定节点分流设置"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "代理分流规则"
intent: "informational"
pillar: "tutorials"
related:
  - "/tutorials/clash/"
  - "/tutorials/dns/"
  - "/tutorials/tun/"
  - "/ai/chatgpt/"
  - "/ai/claude/"
  - "/ai/gemini/"
draft: false
answerFirst: "代理客户端日常必须运行在“规则（Rule）”模式而非“全局（Global）”模式：全局模式会让淘宝、微信、网银等国内流量全部绕道海外节点再回国，导致延迟飙升、耗尽套餐流量甚至触发国内 App 异地风控。科学的规则顺序应遵守“本地局域网直连 -> AI 与流媒体精准指定地区节点 -> 国内域名/IP 直连 -> 兜底（MATCH）走代理”。"
---

# 代理分流规则教程：国内外分流与 AI 定向出站

::: tip 核心结论（Answer-First）
**规则分流（Rule Mode）是代理客户端最核心的工程机制。** 它按“从上到下、首次命中即停止”的匹配原则处理每一个网络请求：把国内服务留在本地宽带直连（`DIRECT`），把普通海外网页交给低延迟主力节点，同时把 **ChatGPT、Claude、Gemini、Netflix 等地区敏感服务精准定向到对应支持地区的固定策略组**。
:::

## 一、三种代理运行模式核心差异

| 模式 | 流量流向 | 适用时机 | 常见误区 |
|---|---|---|---|
| **规则（Rule）** | 按规则列表逐条匹配，国内直连、海外走对应策略组 | **99% 的日常办公与学习场景首选** | 误以为全局更快，实际上规则分流兼顾国内外双速 |
| **全局（Global）** | 几乎全部请求强行送入 `GLOBAL` 指定节点（仅极少数保留局域网地址例外） | 临时测试某个特定网页是不是因为规则漏配才打不开 | 长期开启会让国内软件变卡、甚至触发支付宝/微信风控与快速消耗机场流量 |
| **直连（Direct）** | 全部流量不经代理服务器直接走本地网络 | 临时停用代理但又不想退出客户端时 | 忘记切回规则模式导致误以为节点全挂 |

## 二、分流规则从上到下的黄金匹配顺序

无论是 Mihomo/Clash 的 YAML 还是 Shadowrocket/Stash/sing-box，规则匹配都遵循 **“先匹配先生效（Top-Down First Match）”**。如果把泛域名或兜底规则放在最上面，下面的精准 AI 规则将永远不会被执行。

标准且不易冲突的规则优先级如下：

```yaml
rules:
  # 1. 最高优先级：常见国内/局域网私有 IP 与服务直连（防止内网设备断联）
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve

  # 2. 高优先级：生成式 AI 服务精准指定至非香港专用节点组（例如命名 AI-Node）
  - DOMAIN-SUFFIX,openai.com,AI-Node
  - DOMAIN-SUFFIX,chatgpt.com,AI-Node
  - DOMAIN-SUFFIX,oaistatic.com,AI-Node
  - DOMAIN-SUFFIX,oaiusercontent.com,AI-Node
  - DOMAIN-SUFFIX,anthropic.com,AI-Node
  - DOMAIN-SUFFIX,claude.ai,AI-Node
  - DOMAIN-SUFFIX,gemini.google.com,AI-Node
  - DOMAIN-SUFFIX,aistudio.google.com,AI-Node
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-Node

  # 3. 中优先级：流媒体平台指向已验证解锁节点组（如 Streaming-Node）
  - DOMAIN-SUFFIX,netflix.com,Streaming-Node
  - DOMAIN-SUFFIX,nflxvideo.net,Streaming-Node
  - DOMAIN-SUFFIX,disneyplus.com,Streaming-Node

  # 4. 常规国内外分流（通常由机场订阅或 Rule-Provider 自动提供）
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT

  # 5. 最终兜底规则（未匹配上面任何条目的海外冷门域名全部走主代理）
  - MATCH,Proxy
```

> 关键参数提示：对私有 IP 段或特定 IP 规则添加 `no-resolve` 参数，可以防止客户端在匹配规则时就提前向本地或远端发起不必要的 DNS 查询，减少延迟和 DNS 泄漏风险。

## 三、实操步骤：给 AI 服务配置“低延迟香港日常 + 新/美 AI 分流”

很多用户喜欢用香港节点刷 YouTube、查资料（延迟仅 20–40ms，网页秒开），但香港节点经常无法访问 ChatGPT网页端、Claude 或 Gemini。按以下三步即可鱼与熊掌兼得：

1. 在客户端中把主日常策略组（如 `Proxy`）选为**香港节点**。
2. 新建或利用机场自带的**AI 专用策略组**（如 `AI-Node`），将其手动固定在**新加坡或美国节点**（注：若主要用 Gemini，结合[Gemini 节点兼容指南](/ai/gemini/)实测观察，可重点尝试新加坡或马来西亚节点）。
3. 通过客户端覆写功能（如 Clash Verge Rev 的 `prepend-rules`）把上述第 2 步的 AI 域名规则插入规则列表最顶部，保存并重载配置。

## 四、可执行验证：核对国内外流量的真实出口分流

配置完毕后，分别测试一个国内地址与两个海外地址，验证“国内走本地宽带、AI 走指定节点”是否真正生效：

```bash
# 1. 验证国内 IP 查询接口应返回你的真实国内宽带 IP 与归属城市（走 DIRECT）
curl -s -x http://127.0.0.1:7890 https://myip.ipip.net

# 2. 验证海外通用 IP 接口应返回你主力节点（如 HK）IP
curl -s -x http://127.0.0.1:7890 https://api.ip.sb/geoip

# 3. 验证特定 AI 域名 TLS 连通性，并同步在客户端「连接(Connections)」界面观察其是否命中 AI-Node
curl -I -x http://127.0.0.1:7890 https://chatgpt.com
```

- **预期结果**：`myip.ipip.net` 显示国内本地运营商地址；`api.ip.sb/geoip` 显示主力代理地区（如 HK）；同时客户端“连接”日志中 `chatgpt.com` 明确标注走了你设定的 `AI-Node`（如 SG/US），而不是跟着主力组误走 HK。

## 五、常见问题（FAQ）

### 为什么我明明把某域名写进了直连规则，它还是走了代理节点？
排查两个常见点：一是规则位置被放在了更宽泛的 `MATCH` 或某个大范围 `RULE-SET` 之后（规则顺序错误）；二是浏览器启用了自带的“安全 DNS（DoH）”，或者没有加 `no-resolve` 导致 `GEOIP,CN` 匹配阶段已经出了偏差。

### 普通新手需要自己从零手写几千条分流规则吗？
不需要。目前主流机场提供的 Clash YAML 订阅与客户端（如 Hiddify、Karing、Shadowrocket）内置规则已经覆盖了常规国内外分流。你只需要在现有基础上额外覆写微调十来条关键的 AI 或办公工作域名即可。

## 六、相关入口与信息来源

- **配套教程**：[Clash 系配置进阶](/tutorials/clash/) · [DNS 防泄漏配置](/tutorials/dns/) · [TUN 模式开启教程](/tutorials/tun/)
- **AI 选路指南**：[ChatGPT 节点解锁](/ai/chatgpt/) · [Claude 节点选择](/ai/claude/) · [Gemini 节点兼容](/ai/gemini/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
