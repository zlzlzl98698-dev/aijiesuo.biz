---
title: "iOS 机场配置教程：小火箭外区下载、导入与模式切换"
description: "详解 iPhone/iPad 使用 Shadowrocket（小火箭）配置机场订阅完整流程：外区 App Store 切换、导入订阅、连通测试与规则模式验证。"
date: "2026-11-23"
updated: "2026-11-23"
category: "使用教程"
tags:
  - "iOS 机场配置教程"
  - "Shadowrocket"
  - "小火箭"
  - "iPhone 代理"
keywords:
  - "iOS 机场配置教程"
  - "iPhone 小火箭扫码导入教程"
  - "iOS 代理模式切换步骤"
author: "AI解锁技术编辑部"
sources:
  - "raw-data/第三方代理客户端.txt"
  - "data/clients.json"
verifiedAt: "2026-11-23"
entity: "iOS 代理教程"
intent: "informational"
pillar: "tutorials"
related:
  - "/clients/ios/"
  - "/clients/shadowrocket/"
  - "/clients/stash/"
  - "/tutorials/subscription/"
  - "/troubleshooting/subscription/"
draft: false
answerFirst: "iPhone 配置机场标准流程为：仅在 App Store（切勿在系统 iCloud）登录海外区 Apple ID 下载 Shadowrocket 等合规应用 → 复制机场订阅链接或扫码导入节点 → 将全局路由保持在“配置（Config）”模式而非“代理” → 点击连通性测试选中可用节点并开启顶部开关允许添加 VPN 配置，最后通过浏览器验证海外与国内分流。"
---

# iOS 小火箭（Shadowrocket）配置教程

::: tip 核心结论（Answer-First）
在 iPhone 和 iPad 上，**[Shadowrocket（小火箭）](/clients/shadowrocket/)** 是上手最稳、对各类订阅兼容性最强的商业工具（美区等海外 App Store 为付费应用；若寻求免费开源替代可查看 [Hiddify](/clients/hiddify/) 或 [Karing](/clients/karing/)）。配置中最关键的两个安全与分流习惯是：**外区账号只登录 App Store 商店**，以及**日常使用必须设为“配置（Config）”规则分流模式**。
:::

## 一、第一步：安全获取正版客户端

1. 打开 iPhone 桌面上的 **App Store** 应用（蓝色图标），点击右上角头像，拉到最底部退出当前大陆区账号，登录你自己的美国区（或其他海外地区）Apple ID。
   > **高危红线**：绝对不要打开系统“设置”最上方的 Apple ID / iCloud 去登录别人分享的公共账号，避免设备被远程锁定或隐私同步。
2. 在海外区 App Store 搜索 `Shadowrocket`，核对正版图标与开发者信息后购买下载（若下载免费的 Hiddify/Karing/SFI 同理，参见 [iOS 苹果代理客户端指南](/clients/ios/)）。下载完成后即可随时在 App Store 切回你日常使用的 Apple ID，不影响已装软件的运行。

## 二、第二步：导入机场订阅（两种最稳方法）

### 方法 A：一键导入 / 网页复制链接导入（推荐）
1. 在 iPhone 的 Safari 浏览器登录机场官网后台，点击“复制订阅链接”（如机场有单独的“Shadowrocket 订阅”或“通用订阅”，优先选对应项；若无，一般通用订阅链接小火箭也能直接识别）。
2. 打开 Shadowrocket → 点击右上角 **`+` 号** → 类型选择 **`Subscribe`（订阅）**。
3. 在 `URL` 栏粘贴订阅链接，备注填机场名称，点击右上角“完成/保存”，小火箭会自动拉取全部节点列表。

### 方法 B：电脑端展示二维码扫码导入
如果是在电脑浏览器登录的机场后台：点击网站上的“订阅二维码”弹窗 → 打开手机上的 Shadowrocket → 点击**左上角扫一扫图标**对准屏幕二维码 → 扫描后即自动导入服务器组。

## 三、第三步：设置规则分流与节点连通测试

1. **设置全局路由模式（必看）**：
   - 在小火箭主界面找到 **“全局路由（Global Routing）”** 一行。
   - **日常强烈建议选 `配置（Config）`**：即国内网站直连、海外网站走节点分流。
   - 仅在临时排错时切为 `代理（Proxy）`（全部强行走节点）；不需要代理时可直接关掉顶部总开关或切为 `直连`。
2. **开启自动更新订阅（可选建议）**：进入底部“设置 → 订阅”，开启“打开时更新”或“后台自动更新”，避免机场更换服务器 IP 后本地依然连着旧节点。
3. **测试真连接延迟与选点**：
   - 回到首页，点击 **“连通性测试（Connectivity Test）”**（可在“设置 → 延迟测试方法”选择 `CONNECT` 或 `ICMP`，建议设为 **`CONNECT`** 以测试真端口连通性）。
   - 等待节点右侧出现绿色数字（如 `125ms`），点选你需要的地区节点（例如用 ChatGPT 选新加坡/美国，看港台流媒体选对应低延迟节点）。
4. **开启总开关**：打开最上方灰色开关。首次启动时 iOS 会弹窗提示 **`“Shadowrocket”想要添加 VPN 配置`**，点击**允许**并输入锁屏密码/Face ID 验证，屏幕右上角（或控制中心）出现 `VPN` 标识即开启成功。

## 四、可执行验证：确认 iPhone 分流与出口归属

1. **Safari 访问归属地核验**：
   - 打开 Safari 无痕浏览模式，访问 `https://api.ip.sb/geoip`（或 `ipinfo.io`），确认返回的是你选中节点的海外地区 IP。
   - 再新开标签页访问 `https://myip.ipip.net`，若“全局路由”处于 `配置（Config）` 模式，此处应依然显示你本地宽带/蜂窝网络的国内 IP 与城市，说明**国内外规则分流已经生效**。
2. **小火箭内置日志检查**：点击首页底部的 **“数据 / 代理日志”**，打开任意海外网页后可在请求日志里直接看到具体域名走了 `PROXY` 还是 `DIRECT`，清晰排查是否命中规则。

## 五、常见问题（FAQ）

### 为什么小火箭导入订阅后一片空白，一个节点都没有？
常见原因有三点：一是复制了带多余中文汉字的分享文本而非纯 `https://` 订阅链接；二是机场后台订阅域名在本地运营商网络下被污染，可先在“设置 → 订阅”检查是否需要借助备用地址拉取（见[订阅更新失败排查](/troubleshooting/subscription/)）；三是服务商属于纯专属客户端模式，需使用其官方提供的 TestFlight 或官网安装包。

### 为什么手机锁屏放一会儿，再次点亮屏幕要重新等两秒才能刷出消息？
iOS 系统为保护续航，在设备息屏无活跃网络请求后会休眠后台连接；点亮屏幕并触发网络请求时，System Network Extension 会自动在毫秒至 1 秒级内恢复隧道，属 iOS 系统正常省电机制。如需减少切换卡顿，可在小火箭“设置 → 按需连接”按个人需要配置规则。

## 六、相关入口与信息来源

- **iOS 选型参考**：[iOS 苹果代理客户端](/clients/ios/) · [Shadowrocket 详情](/clients/shadowrocket/) · [Stash 详情](/clients/stash/)
- **实操与排错**：[机场订阅导入教程](/tutorials/subscription/) · [节点超时排查](/troubleshooting/timeout/)
- **信息来源**：《2026 第三方代理客户端开源项目台账》、本站跨平台代理客户端兼容数据库
- **核验与更新日期**：2026-11-23
