# 人工核验与上线前补齐清单 (`data/verification-queue.md`)

- **生成时间：** 2026-11-23
- **品牌总数：** 32

## 1. P0 — 推广链接格式异常核验（需真机浏览器确认跳转）

| 品牌 | Slug | 原始推广链接 | 状态 | 建议动作 |
| --- | --- | --- | --- | --- |
| 云界线 | `yunjiexian` | `https://qwerty.yunjiexianaff.com/?code=aycnwNUi` | `format_anomaly` | 浏览器打开验证跳转是否正常，确认后更新 `data/brands.json` |
| 榴莲云 | `liulianyun` | `https://qwerty.liulianyunaff.com#/?code=hS5pvbfE` | `format_anomaly` | 浏览器打开验证跳转是否正常，确认后更新 `data/brands.json` |
| 环球梯 | `huanqiuti` | `https://qwerty.huanqiutiaff.com/?code=9I4KRNPH` | `format_anomaly` | 浏览器打开验证跳转是否正常，确认后更新 `data/brands.json` |

## 2. P0 — 双优惠码 / 优惠口径冲突核验

| 品牌 | Slug | 冲突优惠码列表 | 待确认点 |
| --- | --- | --- | --- |
| 灵猫网络 | `lingmao` | `lmao888` (折扣未明示（基础数据与完整数据表记录）) vs `lingmao` (8折) | 下单页验证当期有效优惠码并删除失效项 |
| 一翻云 | `yifan` | `yfy6666` (折扣未明示（基础数据与完整数据表记录）) vs `1FLYYUN` (9折) | 下单页验证当期有效优惠码并删除失效项 |
| SOGO 云 | `sogo` | `SOGO10000` (9折) vs `sss777` (折扣未明示) | 下单页验证当期有效优惠码并删除失效项 |
| 全球云 | `quanqiu` | `qq88` (8折) vs `qqy7777` (折扣未明示) | 下单页验证当期有效优惠码并删除失效项 |
| 隐形人 | `yinxingren` | `yxr888` (折扣未明示（第850行基础数据与第948行汇总表）) vs `moon80` (8折) | 下单页验证当期有效优惠码并删除失效项 |

## 3. P1 — 已自动设置 `noindex, follow` 的不完整/历史品牌（8 页）

以下品牌因属于 `2026-08-09` 历史存档或缺失官方套餐表，已在 `docs/.vitepress/config.mts` 自动输出 `noindex, follow` 并从 `sitemap.xml` 与 `rss.xml` 排除；待核实最新官网数据后即可放开索引：

| 品牌 | Slug | 原因 | 当前状态 |
| --- | --- | --- | --- |
| 灵动云 | `lingdong` | 2026-08-09 历史存档（含遮挡/旧链接） | `noindex, follow` |
| 浪网 | `langwang` | 2026-08-09 历史存档（含遮挡/旧链接） | `noindex, follow` |
| 边缘节点 EdgeNova | `edgenova` | 2026-08-09 历史存档（含遮挡/旧链接） | `noindex, follow` |
| 快狸 | `kuaili` | 缺失官方套餐价格表与官网入口 | `noindex, follow` |

## 4. P1 — 优先补充晚高峰（20:30–22:30）三网及 AI 解锁实测品牌

当前仅 **光速云 (`guangsu`)** 具备 2026-08-19 三网与流媒体/OpenAI/Gemini 完整实测图；建议按商业顺位优先补充以下主力品牌：

- **#2 暮光加速 (`muguang`)**：研究评分 48/100 · 暂无任何测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#3 飞猫云 (`feimao`)**：研究评分 65/100 · 已有 1 张单次测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#4 微风网络 (`weifeng`)**：研究评分 69/100 · 已有 1 张单次测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#5 大佬云 (`dalaoyun`)**：研究评分 35/100 · 暂无任何测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#6 星岛梦 (`xingdaomeng`)**：研究评分 70/100 · 已有 1 张单次测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#7 二猫云 (`ermao`)**：研究评分 62/100 · 已有 1 张单次测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#8 无忧链接 (`wuyou`)**：研究评分 72/100 · 已有 2 张单次测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#9 唯兔云 (`weitu`)**：研究评分 69/100 · 已有 1 张单次测速图 · 需补充三网晚高峰 + AI 逐项实测
- **#10 Firefly 萤火虫 (`firefly`)**：研究评分 52/100 · 暂无任何测速图 · 需补充三网晚高峰 + AI 逐项实测

## 5. P2 — 上线后接入真实 GSC / Bing 搜索数据闭环

```bash
# 从 Google Search Console 或 Bing Webmaster Tools 导出查询报表 CSV 后运行：
node scripts/keyword-score.mjs --import-gsc path/to/gsc-queries.csv --record-history
node scripts/keyword-score.mjs --import-bing path/to/bing-queries.csv --record-history
```
