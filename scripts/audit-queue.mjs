import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const BRANDS_PATH = path.join(ROOT_DIR, 'data', 'brands.json');
const OUT_MD_PATH = path.join(ROOT_DIR, 'data', 'verification-queue.md');

function main() {
  const db = JSON.parse(fs.readFileSync(BRANDS_PATH, 'utf8'));
  const brands = db.brands || [];

  const anomalousLinks = brands.filter((b) => b.affiliate?.linkStatus === 'format_anomaly');
  const dualCouponBrands = brands.filter((b) => (b.coupons || []).length > 1);
  const noindexBrands = brands.filter((b) => b.isHistoricalOnly || (b.plans || []).length === 0);
  const needLatePeakAiTests = brands
    .filter(
      (b) =>
        !b.isHistoricalOnly &&
        (b.plans || []).length > 0 &&
        b.slug !== 'guangsu' &&
        (b.commercialRank ?? 999) <= 10
    )
    .sort((a, b) => (a.commercialRank ?? 999) - (b.commercialRank ?? 999));

  const lines = [
    '# 人工核验与上线前补齐清单 (`data/verification-queue.md`)',
    '',
    `- **生成时间：** ${new Date().toISOString().slice(0, 10)}`,
    `- **品牌总数：** ${brands.length}`,
    '',
    '## 1. P0 — 推广链接格式异常核验（需真机浏览器确认跳转）',
    '',
    '| 品牌 | Slug | 原始推广链接 | 状态 | 建议动作 |',
    '| --- | --- | --- | --- | --- |',
  ];

  for (const b of anomalousLinks) {
    lines.push(`| ${b.name} | \`${b.slug}\` | \`${b.affiliate.url}\` | \`${b.affiliate.linkStatus}\` | 浏览器打开验证跳转是否正常，确认后更新 \`data/brands.json\` |`);
  }

  lines.push(
    '',
    '## 2. P0 — 双优惠码 / 优惠口径冲突核验',
    '',
    '| 品牌 | Slug | 冲突优惠码列表 | 待确认点 |',
    '| --- | --- | --- | --- |'
  );

  for (const b of dualCouponBrands) {
    const codes = b.coupons.map((c) => `\`${c.code}\`${c.discountLabel ? ` (${c.discountLabel})` : ''}`).join(' vs ');
    lines.push(`| ${b.name} | \`${b.slug}\` | ${codes} | 下单页验证当期有效优惠码并删除失效项 |`);
  }

  lines.push(
    '',
    '## 3. P1 — 已自动设置 `noindex, follow` 的不完整/历史品牌（8 页）',
    '',
    '以下品牌因属于 `2026-08-09` 历史存档或缺失官方套餐表，已在 `docs/.vitepress/config.mts` 自动输出 `noindex, follow` 并从 `sitemap.xml` 与 `rss.xml` 排除；待核实最新官网数据后即可放开索引：',
    '',
    '| 品牌 | Slug | 原因 | 当前状态 |',
    '| --- | --- | --- | --- |'
  );

  for (const b of noindexBrands) {
    const reason = b.isHistoricalOnly ? '2026-08-09 历史存档（含遮挡/旧链接）' : '缺失官方套餐价格表与官网入口';
    lines.push(`| ${b.name} | \`${b.slug}\` | ${reason} | \`noindex, follow\` |`);
  }

  lines.push(
    '',
    '## 4. P1 — 优先补充晚高峰（20:30–22:30）三网及 AI 解锁实测品牌',
    '',
    '当前仅 **光速云 (`guangsu`)** 具备 2026-08-19 三网与流媒体/OpenAI/Gemini 完整实测图；建议按商业顺位优先补充以下主力品牌：',
    ''
  );

  for (const b of needLatePeakAiTests) {
    const hasAug11 = (b.speedTestEvidence || []).length > 0 ? `已有 ${b.speedTestEvidence.length} 张单次测速图` : '暂无任何测速图';
    lines.push(`- **#${b.commercialRank} ${b.name} (\`${b.slug}\`)**：研究评分 ${b.researchScore}/100 · ${hasAug11} · 需补充三网晚高峰 + AI 逐项实测`);
  }

  lines.push(
    '',
    '## 5. P2 — 上线后接入真实 GSC / Bing 搜索数据闭环',
    '',
    '```bash',
    '# 从 Google Search Console 或 Bing Webmaster Tools 导出查询报表 CSV 后运行：',
    'node scripts/keyword-score.mjs --import-gsc path/to/gsc-queries.csv --record-history',
    'node scripts/keyword-score.mjs --import-bing path/to/bing-queries.csv --record-history',
    '```',
    ''
  );

  fs.writeFileSync(OUT_MD_PATH, lines.join('\n'), 'utf8');
  console.log(`[audit-queue] Wrote ${path.relative(ROOT_DIR, OUT_MD_PATH)} (anomalous=${anomalousLinks.length}, dualCoupons=${dualCouponBrands.length}, noindex=${noindexBrands.length}, priorityTest=${needLatePeakAiTests.length})`);
}

main();
