<div align="center">

<img src="docs/public/images/og-cover.png" alt="AI解锁 (aijiesuo.biz) 技术知识库封面" width="760" />

# AI解锁 · `aijiesuo.biz`

**AI 服务访问 · 开源代理客户端 · 网络故障排查 · 机场品牌实测研究知识库**

![VitePress](https://img.shields.io/badge/VitePress-1.6.4-0f2544?style=flat-square&logo=vitepress)
![Vue 3](https://img.shields.io/badge/Vue-3.x-0e7490?style=flat-square&logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-1e3a8a?style=flat-square&logo=typescript)
![Static Pages](https://img.shields.io/badge/Static%20HTML-164%20Pages-059669?style=flat-square)
![QA Status](https://img.shields.io/badge/QA%20Check-0%20Errors%20%2F%200%20Warnings-10b981?style=flat-square)

[在线架构规范](#-核心架构与设计理念) · [十大栏目矩阵](#-十大核心栏目矩阵) · [快速开始](#-快速开始) · [SEO 与 QA 引擎](#-seo--geo-与质量检查引擎) · [Apache 部署](#-apache-静态部署)

</div>

---

## 📌 项目简介

**AI解锁（[aijiesuo.biz](https://aijiesuo.biz/)）** 是一个面向中文用户、开发者、跨境办公人员与 AI 工具使用者的**静态技术文档与网络服务实证研究平台**。

项目采用 **VitePress + Vue 3 + TypeScript** 原创设计，基于 **AI Connectivity Documentation + Knowledge Graph + Network Diagnostic Lab** 理念构建，彻底分离**商业顺位**与**独立研究评分**，并在底层严格区分 **实测截图（`measured`）**、**品牌资料（`vendor`）**、**历史存档（`historical`）** 与 **待核实冲突（`unverified`）**。

### 核心亮点

- **100% 静态 HTML 预渲染**：全部 `164` 个页面（`155` 个可索引页面 + `8` 个历史/缺表 `noindex` 页面 + `404.html`）均输出完整语义化静态 HTML，无需依赖浏览器执行 JavaScript 即可被 Google、Bing、百度与神马（`yisouspider`）抓取。
- **单源统一导航真值表**：桌面端多级悬停菜单、移动端抽屉导航、多级侧边栏、面包屑与路由校验全部由 `data/navigation.ts` 单文件生成，零 URL 漂移。
- **5 大 Network Observatory 观测台组件**：
  - `BrandSnapshot.vue`：展示独立研究评分（0–100，支持 5 维权重展开）与商业参考顺位、资料冲突及待核实提示。
  - `SpeedTestReport.vue`：绑定原始测速截图（支持点击放大 Lightbox）、测试时间、工具/后端与局限说明，无图明确标 `Not Tested`。
  - `UnlockMatrix.vue`：分区呈现 AI 工具与流媒体可用性状态（`Verified` / `Vendor Claimed` / `Partial` / `Historical` / `Not Tested` / `Unavailable`）。
  - `NetworkTopology.vue`：按品牌协议、线路类型与覆盖地区生成 6 跳逻辑传输路径图，明确标注原理示意边界。
  - `PlanComparison.vue`：支持按月付、年付、一次性流量包与定制筛选，严格标注“年付折算月均价”，避免误导消费。
- **交互式诊断与选型工具**：
  - `DiagnosticLab.vue`：覆盖 ChatGPT 403/1020、Claude 封号、Gemini 地区受限、节点超时、订阅失败、TUN 断网 6 类高频症状的快速分流台。
  - `BrandDirectory.vue`：支持 32 家去重机场品牌的全文检索、多维筛选与排序。
  - `BrandRecommender.vue`：4 步交互式需求选型器，根据流量、客户端生态、计费周期与 AI/流媒体需求实时匹配方案。
  - `ClientMatrix.vue`：覆盖 Windows、Android、iOS、macOS、Linux 与 OpenWrt 共 50 条客户端条目及安全警告提示。
- **可持续 Keyword Discovery Engine**：内置 `158` 条 1:1 防关键词互抢映射表，支持导入 Google Search Console 与 Bing Webmaster Tools 真实 CSV/JSON 报表动态调整内容路线图权重。

---

## 🧭 十大核心栏目矩阵

| 一级栏目 | 路由前缀 | 核心覆盖内容 |
| --- | --- | --- |
| **机场推荐** | `/airport/` | 综合推荐、双轨制榜单、靠谱核查、稳定专线、新手易用指南 |
| **价格与套餐** | `/pricing/` | 平价入门、一元/一分风险解析、灵活月付、不限时流量包、光速云专页 |
| **机场品牌** | `/brands/` | 32 家去重品牌档案、`/reviews/` 22 维深度评测、`/compare/` 9 组横向对比 |
| **VPN 与加速器** | `/vpn/` | VPN 与代理架构区别、免费 VPN 风险、移动端与游戏 NAT 延迟分析 |
| **客户端软件** | `/clients/` | 6 大操作系统指南 + 18 个开源/主流客户端深度文档（Clash Verge Rev、v2rayN、FlClash、Shadowrocket、Mihomo、sing-box 等） |
| **AI 与流媒体** | `/ai/` | ChatGPT、Claude、Gemini、Netflix、YouTube、Disney+、TikTok 解锁原理与分流规则 |
| **线路与节点** | `/network/` | IEPL、IPLC、香港/日本节点特征、延迟测量方法论与流量倍率计算 |
| **使用教程** | `/tutorials/` | 订阅导入、Clash 进阶、规则分流、TUN 模式、DNS 防泄漏与各平台实操 |
| **故障排查** | `/troubleshooting/` | 连接超时、订阅更新失败、连上断网、DNS 污染、服务权限报错、TUN 冲突与 AI 拒访 |
| **风险与替代** | `/risk/` | 跑路前兆识别、购前避坑、停更客户端迁徙、退款边界、隐私日志与安全校验（含独立 `/about/` 方法论专页） |

---

## 📂 目录结构

```text
aijiesuo.biz/
├── data/                        # 结构化品牌、客户端、导航与关键词数据库
│   ├── brands.json              # 32 家去重品牌档案（含冲突与待核实标注）
│   ├── clients.json             # 6 大平台 50 条客户端兼容与安全告警数据
│   ├── links.ts                 # 全站推广链接与披露声明唯一出口
│   ├── navigation.ts            # 10 大栏目、多级侧边栏与面包屑唯一真值表
│   ├── types.ts                 # 全站严格 TypeScript 类型定义
│   ├── audit-report.md          # 第一阶段资料交叉审计与冲突汇总报告
│   ├── verification-queue.md    # 待人工浏览器/实测核验队列
│   └── keywords/                # Keyword Discovery Engine 数据集（seeds/longtails/clusters/roadmap）
├── docs/                        # VitePress 站点源码与 163 篇 Markdown 页面
│   ├── .vitepress/
│   │   ├── config.mts           # VitePress 配置、Local Search/Algolia、JSON-LD、OG/Canonical/Sitemap
│   │   └── theme/               # 原创 CSS 变量设计系统、自定义 Layout 与 Vue 3 组件
│   ├── public/images/           # 品牌 Logo、测速实测原图、光速云三网截图、OG 封面与站点头像
│   ├── airport/ ... risk/       # 十大一级专题、二级文档、品牌档案、评测与对比文章
│   └── about/                   # 独立 E-E-A-T 评测方法论、实验室标准与免责声明专页
├── deploy/                      # Apache 生产部署包
│   ├── .htaccess                # HTTPS 301、静态 HTML 解析（无 SPA 兜底）、404、压缩与安全头
│   ├── aijiesuo.biz.conf        # Apache VirtualHost 参考配置
│   └── DEPLOYMENT.md            # 部署与 curl 验收手册
├── scripts/                     # 自动化构建后处理、QA 与关键词评分脚本
│   ├── postbuild.mjs            # 校验 sitemap.xml、生成 robots.txt 与 rss.xml
│   ├── qa-check.mjs             # 全站链接、硬编码推广链接、重复标题/关键词、JSON-LD 与图片校验
│   ├── keyword-score.mjs        # 关键词优先级计算与 GSC/Bing CSV 导入工具
│   └── audit-queue.mjs          # 生成最新人工待核验队列清单
├── raw-data/                    # 原始输入资料与未启用孤儿资源归档（只读参考）
├── .env.example                 # 站长平台验证码与 Algolia 环境变量模板
├── QA-REPORT.md                 # 最近一次全站 QA 自动审计结果
├── package.json
└── tsconfig.json
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** `>= 20.x`（当前构建验证版本：`v24.19.0`）
- **npm** `>= 10.x`

### 本地开发与构建命令

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务器
npm run docs:dev

# 3. 执行 TypeScript 类型检查
npx tsc --noEmit

# 4. 构建生产静态 HTML + 生成 sitemap.xml / robots.txt / rss.xml
npm run docs:build

# 5. 启动生产构建产物本地预览 (http://localhost:4173/)
npm run docs:preview

# 6. 运行全站 SEO/链接/图片/合规 QA 校验（输出 QA-REPORT.md）
npm run qa
```

---

## 🔍 SEO / GEO 与质量检查引擎

### 1. 站长平台验证与 Algolia 搜索配置

复制 `.env.example` 为 `.env`（**请勿将真实密钥提交至仓库**），填入对应平台凭据后重新执行 `npm run docs:build`，构建脚本会自动将静态验证标签写入 HTML `<head>`（未配置时不会注入任何假凭据）：

```ini
VITE_VERIFY_GOOGLE=
VITE_VERIFY_BING=
VITE_VERIFY_SHENMA=
VITE_VERIFY_BAIDU=

# 可选：获批 Algolia DocSearch 后配置即可自动替代默认 Local Search
VITE_ALGOLIA_APP_ID=
VITE_ALGOLIA_API_KEY=
VITE_ALGOLIA_INDEX_NAME=
```

### 2. 关键词发现与待核验审计

```bash
# 严格校验 158 条 URL 与主/次关键词零碰撞并输出高优先级选题榜
node scripts/keyword-score.mjs --strict --limit 20

# 导入真实 Google Search Console 或 Bing Webmaster 报表更新优先级权重
node scripts/keyword-score.mjs --import-gsc path/to/gsc-queries.csv --record-history

# 重新生成待人工外网核验清单 (data/verification-queue.md)
node scripts/audit-queue.mjs
```

---

## 🌐 Apache 静态部署

1. 执行 `npm run docs:build` 生成完整静态站点目录 `docs/.vitepress/dist/`。
2. 将 `docs/.vitepress/dist/` 与 `deploy/.htaccess` 上传至服务器 Web 根目录（如 `/var/www/aijiesuo.biz/dist`）。
3. 参考 [deploy/aijiesuo.biz.conf](deploy/aijiesuo.biz.conf) 与 [deploy/DEPLOYMENT.md](deploy/DEPLOYMENT.md) 完成 HTTPS、HTTP/2、`HTTP/www -> https://aijiesuo.biz/` 301 重定向及 `curl` 状态码验收。

---

## ⚖️ 数据合规与内容边界

- 所有商业推广链接均集中托管于 `data/links.ts` 与 `data/brands.json`，经 `<BrandCta />` 组件统一输出 `target="_blank" rel="nofollow sponsored noopener"` 及联盟佣金透明披露，Markdown 正文中零硬编码推广链接。
- 测速截图作为只读原始证据保留测试时间、后端与样本局限；缺乏官方完整套餐或属于早期历史存档的条目自动输出 `noindex, follow` 并排除出 `sitemap.xml`。
