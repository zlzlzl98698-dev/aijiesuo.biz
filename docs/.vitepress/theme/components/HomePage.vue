<script setup lang="ts">
import { computed } from 'vue'
import { AFFILIATE_DISCLOSURE, ALL_BRANDS, PRIMARY_BRAND_SLUG, getBrandBySlug } from '../../../../data/links'
import BrandCta from './BrandCta.vue'
import DiagnosticLab from './DiagnosticLab.vue'

const primaryBrand = computed(() => getBrandBySlug(PRIMARY_BRAND_SLUG))

const topResearchBrands = computed(() =>
  [...ALL_BRANDS]
    .sort((a, b) => b.researchScore - a.researchScore || b.completeness - a.completeness)
    .slice(0, 6)
)

const topCommercialBrands = computed(() =>
  ALL_BRANDS.filter((b) => b.commercialRank !== null)
    .sort((a, b) => (a.commercialRank ?? 999) - (b.commercialRank ?? 999))
    .slice(0, 6)
)

const measuredBrandCount = computed(
  () => ALL_BRANDS.filter((b) => b.speedTestEvidence.length > 0).length
)

const HOT_AI_LINKS = [
  { title: 'ChatGPT / OpenAI 解锁', desc: '403 / 1020 拦截与分流策略', link: '/ai/chatgpt/', badge: 'AI 专项' },
  { title: 'Claude 访问与防封号', desc: '低跳变固定出口与 IP 纯净度', link: '/ai/claude/', badge: '高风控' },
  { title: 'Gemini 节点兼容指南', desc: '地区白名单与部分节点失败排查', link: '/ai/gemini/', badge: '地区限制' },
  { title: 'AI 不可用故障总查', desc: '从 DNS 泄漏到 Cookie 清理', link: '/troubleshooting/ai-access/', badge: '排查' },
]

const STAGE2_PILLARS = [
  {
    title: '客户端软件大全',
    link: '/clients/',
    tag: '6 大操作系统',
    desc: '覆盖 Windows、Android、iOS、macOS、Linux 与 OpenWrt 第三方开源客户端及安全警告。',
  },
  {
    title: '线路与节点技术',
    link: '/network/',
    tag: 'IEPL / IPLC / BGP',
    desc: '拆解跨境专线与公网中转底层差异、晚高峰表现与流量倍率真实消耗计算。',
  },
  {
    title: '使用与分流教程',
    link: '/tutorials/',
    tag: '实操配置',
    desc: '订阅导入、Clash/Mihomo 规则覆写、TUN 虚拟网卡模式与 DNS 防泄漏设置。',
  },
  {
    title: '故障排查手册',
    link: '/troubleshooting/',
    tag: '根因定位',
    desc: '系统解决节点超时、订阅拉取失败、开启 TUN 后断网及本地服务权限报错。',
  },
]

const CORE_GUIDES = [
  { title: 'TUN 虚拟网卡模式教程', link: '/tutorials/tun/', tag: '进阶分流' },
  { title: 'DNS 防泄漏与 Fake-IP', link: '/tutorials/dns/', tag: '网络底层' },
  { title: 'IEPL 内网专线原理', link: '/network/iepl/', tag: '传输架构' },
  { title: 'Clash Verge Rev 指南', link: '/clients/clash-verge-rev/', tag: '桌面客户端' },
  { title: 'Shadowrocket 小火箭', link: '/clients/shadowrocket/', tag: 'iOS 客户端' },
  { title: '理性购买与跑路风控', link: '/risk/buying-guide/', tag: '风险提示' },
]

function triggerSiteSearch() {
  if (import.meta.env.SSR || typeof document === 'undefined') return
  const searchBtn = document.querySelector<HTMLButtonElement>(
    '.VPNavBarSearch button.DocSearch-Button, .VPNavBarSearch button'
  )
  if (searchBtn) {
    searchBtn.click()
  }
}
</script>

<template>
  <div class="hp-root">
    <!-- Stage 1: Solving AI Access -->
    <section class="hp-hero">
      <div class="aij-container">
        <div class="hp-hero-grid">
          <div class="hp-hero-main">
            <div class="hp-kicker-row">
              <span class="aij-badge aij-badge--navy aij-mono">AIJIESUO.BIZ</span>
              <span class="aij-badge aij-badge--cyan">
                AI 连接文档 · 知识图谱 · 网络诊断实验室
              </span>
            </div>
            <h1 class="hp-h1">AI 解锁与跨境网络技术知识库</h1>
            <p class="hp-subtitle">
              面向 ChatGPT、Claude、Gemini 等 AI 工具与海外流媒体访问需求，提供系统化的客户端配置指南、故障排查路径，以及区分“实测截图”与“厂商自述”的 {{ ALL_BRANDS.length }} 家机场独立研究档案。
            </p>

            <div class="hp-hero-actions">
              <button
                type="button"
                class="hp-search-trigger"
                @click="triggerSiteSearch"
              >
                <span class="hp-search-text">搜索错误码（403 / 1020）、客户端或品牌名称...</span>
                <kbd class="aij-mono">搜索</kbd>
              </button>
              <a href="/ai/" class="aij-btn aij-btn--primary">AI 解锁专项指南</a>
              <a href="/brands/" class="aij-btn aij-btn--outline">浏览 {{ ALL_BRANDS.length }} 家品牌库</a>
            </div>
          </div>

          <aside class="hp-metrics-card" aria-label="知识库实证概览">
            <div class="hp-metric-head aij-mono">KNOWLEDGE GRAPH SNAPSHOT</div>
            <dl class="hp-metrics-list">
              <div>
                <dt>收录机场档案</dt>
                <dd class="aij-mono">{{ ALL_BRANDS.length }} 家</dd>
              </div>
              <div>
                <dt>含实测截图品牌</dt>
                <dd class="aij-mono">{{ measuredBrandCount }} 家</dd>
              </div>
              <div>
                <dt>覆盖核心专题</dt>
                <dd class="aij-mono">10 大栏目</dd>
              </div>
              <div>
                <dt>评分机制</dt>
                <dd>研究分与商业顺位分离</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div class="hp-hot-grid">
          <a
            v-for="item in HOT_AI_LINKS"
            :key="item.link"
            :href="item.link"
            class="aij-card hp-hot-card"
          >
            <div class="hp-hot-top">
              <strong>{{ item.title }}</strong>
              <span class="aij-badge aij-badge--cyan">{{ item.badge }}</span>
            </div>
            <p>{{ item.desc }}</p>
          </a>
        </div>

        <DiagnosticLab />
      </div>
    </section>

    <!-- Stage 2: Technical Docs & Tools -->
    <section class="hp-stage hp-stage--alt">
      <div class="aij-container">
        <div class="hp-stage-head">
          <div>
            <span class="hp-stage-tag aij-mono">STAGE 02 · DOCUMENTATION &amp; TOOLING</span>
            <h2 class="hp-h2">客户端软件、传输线路与实操文档</h2>
          </div>
          <a href="/tutorials/" class="hp-more-link">查看全部使用教程 →</a>
        </div>

        <div class="hp-grid-4">
          <a
            v-for="pillar in STAGE2_PILLARS"
            :key="pillar.link"
            :href="pillar.link"
            class="aij-card hp-pillar-card"
          >
            <span class="aij-badge aij-badge--navy aij-mono">{{ pillar.tag }}</span>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.desc }}</p>
            <span class="hp-card-arrow aij-mono">进入专题 →</span>
          </a>
        </div>

        <div class="hp-guides-strip">
          <div class="hp-guides-label">高频技术文档直达</div>
          <div class="aij-grid-3">
            <a
              v-for="guide in CORE_GUIDES"
              :key="guide.link"
              :href="guide.link"
              class="hp-guide-link"
            >
              <div>
                <span class="hp-guide-tag aij-mono">{{ guide.tag }}</span>
                <strong>{{ guide.title }}</strong>
              </div>
              <span class="aij-mono" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stage 3: Independent Reviews & Commercial Decisions -->
    <section class="hp-stage">
      <div class="aij-container">
        <div class="hp-stage-head">
          <div>
            <span class="hp-stage-tag aij-mono">STAGE 03 · REVIEWS &amp; COMMERCIAL TRANSPARENCY</span>
            <h2 class="hp-h2">独立评测档案与透明选型对比</h2>
          </div>
          <div class="hp-stage-links">
            <a href="/reviews/" class="hp-more-link">实测评测汇总 →</a>
            <a href="/pricing/" class="hp-more-link">价格与套餐对比 →</a>
          </div>
        </div>

        <!-- Featured Brand Showcase (Guangsu) -->
        <div v-if="primaryBrand" class="obs-panel hp-featured-brand">
          <div class="hp-featured-grid">
            <div class="hp-featured-info">
              <div class="hp-featured-badges">
                <span class="obs-pill obs-pill--operational">
                  Measured · {{ primaryBrand.speedTestEvidence.length }} 份实测截图
                </span>
                <span class="obs-pill obs-pill--stable aij-mono">
                  研究评分 {{ primaryBrand.researchScore }}/100
                </span>
                <span class="obs-pill obs-pill--vendor aij-mono">
                  资料完整度 {{ primaryBrand.completeness }}%
                </span>
              </div>
              <h3 class="hp-featured-title">
                重点归档样本：{{ primaryBrand.name }}（{{ primaryBrand.aliases.join(' / ') }}）
              </h3>
              <p class="hp-featured-desc">{{ primaryBrand.positioning }}</p>
              <ul class="hp-featured-points">
                <li>支持协议：{{ primaryBrand.protocols.join(' / ') }} · {{ primaryBrand.deviceLimit }}</li>
                <li>起始参考：{{ primaryBrand.startingPriceLabel }}</li>
                <li>实测提醒：不同后端/协议下 OpenAI 与 Gemini 解锁存在节点差异，详见评测快照</li>
              </ul>
              <div class="hp-featured-links">
                <a :href="`/brands/${primaryBrand.slug}/`" class="hp-obs-link">
                  查看完整品牌档案 →
                </a>
                <a :href="`/reviews/${primaryBrand.slug}/`" class="hp-obs-link">
                  查看 6 张实测截图拆解 →
                </a>
              </div>
            </div>
            <div class="hp-featured-cta">
              <BrandCta :slug="primaryBrand.slug" compact />
            </div>
          </div>
        </div>

        <!-- Dual Ranking Preview: Research Score vs Commercial Picks -->
        <div class="aij-grid-2 hp-dual-rank">
          <div class="aij-card hp-rank-card">
            <div class="hp-rank-head">
              <h3>研究评分榜（按实测与资料完整度）</h3>
              <a href="/reviews/">完整评测 →</a>
            </div>
            <p class="hp-rank-note">
              依据资料完整度(30)、协议线路清晰度(20)、实测证据(25)、定价弹性(15)、风险透明度(10)计算。
            </p>
            <div class="hp-rank-list">
              <a
                v-for="(brand, idx) in topResearchBrands"
                :key="brand.slug"
                :href="`/reviews/${brand.slug}/`"
                class="hp-rank-row"
              >
                <span class="hp-rank-num aij-mono">{{ idx + 1 }}</span>
                <span class="hp-rank-name">{{ brand.name }}</span>
                <span class="hp-rank-sub">
                  {{ brand.speedTestEvidence.length > 0 ? `${brand.speedTestEvidence.length} 截图` : '无截图' }}
                </span>
                <strong class="hp-rank-score aij-mono">{{ brand.researchScore }}/100</strong>
              </a>
            </div>
          </div>

          <div class="aij-card hp-rank-card">
            <div class="hp-rank-head">
              <h3>商业参考顺位（原始清单排序）</h3>
              <a href="/brands/">全部品牌 →</a>
            </div>
            <p class="hp-rank-note">
              保留原始商业清单顺位以保证透明对照；顺位不代表本站对稳定性或永久解锁的担保。
            </p>
            <div class="hp-rank-list">
              <a
                v-for="brand in topCommercialBrands"
                :key="brand.slug"
                :href="`/brands/${brand.slug}/`"
                class="hp-rank-row"
              >
                <span class="hp-rank-num aij-mono">#{{ brand.commercialRank }}</span>
                <span class="hp-rank-name">{{ brand.name }}</span>
                <span class="hp-rank-sub">研究 {{ brand.researchScore }}分</span>
                <strong class="hp-rank-price aij-mono">
                  {{ brand.startingMonthlyCny !== null ? `¥${brand.startingMonthlyCny}/月起` : '待核实' }}
                </strong>
              </a>
            </div>
          </div>
        </div>

        <div class="hp-disclosure">
          <strong>商业披露与风险提醒：</strong>
          {{ AFFILIATE_DISCLOSURE }}。所有跨境代理服务均存在政策波动、线路调整与停运风险，购买前请先阅读
          <a href="/risk/buying-guide/">理性购买与避坑指南</a>、
          <a href="/risk/refunds/">退款边界说明</a> 与
          <a href="/about/">关于我们与评测方法论</a>，优先采用月付小额测试。
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hp-root {
  color: var(--aij-text);
}

.hp-hero {
  padding: 2.5rem 0 2rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-bottom: 1px solid var(--aij-border);
}

.hp-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(260px, 0.85fr);
  gap: 1.5rem;
  align-items: stretch;
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .hp-hero-grid {
    grid-template-columns: 1fr;
  }
}

.hp-kicker-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.hp-h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.75rem, 3.2vw, 2.4rem);
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--aij-navy);
}

.hp-subtitle {
  margin: 0 0 1.25rem;
  font-size: 1.02rem;
  line-height: 1.72;
  color: var(--aij-text-muted);
  max-width: 720px;
}

.hp-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.hp-search-trigger {
  flex: 1 1 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--aij-border-strong);
  background: var(--aij-bg);
  color: var(--aij-text-subtle);
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.16s ease;
}

.hp-search-trigger:hover {
  border-color: var(--aij-cyan);
  color: var(--aij-navy);
}

.hp-search-trigger kbd {
  padding: 0.15rem 0.45rem;
  border-radius: 5px;
  background: var(--aij-surface-alt);
  border: 1px solid var(--aij-border);
  font-size: 0.76rem;
  color: var(--aij-navy);
}

.hp-metrics-card {
  background: var(--obs-bg);
  color: var(--obs-text);
  border: 1px solid var(--obs-border);
  border-radius: 14px;
  padding: 1.2rem 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hp-metric-head {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--obs-accent);
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.hp-metrics-list {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.hp-metrics-list dt {
  font-size: 0.76rem;
  color: var(--obs-text-muted);
}

.hp-metrics-list dd {
  margin: 0.15rem 0 0;
  font-size: 0.96rem;
  font-weight: 700;
  color: #ffffff;
}

.hp-hot-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
  margin-bottom: 1rem;
}

@media (max-width: 960px) {
  .hp-hot-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .hp-hot-grid {
    grid-template-columns: 1fr;
  }
}

.hp-hot-card {
  text-decoration: none;
  color: inherit;
  padding: 0.95rem 1.05rem;
}

.hp-hot-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
}

.hp-hot-top strong {
  font-size: 0.94rem;
  color: var(--aij-navy);
}

.hp-hot-card p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--aij-text-muted);
}

.hp-stage {
  padding: 2.5rem 0;
}

.hp-stage--alt {
  background: var(--aij-surface);
  border-bottom: 1px solid var(--aij-border);
}

.hp-stage-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
}

.hp-stage-tag {
  display: block;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--aij-cyan);
}

.hp-h2 {
  margin: 0.2rem 0 0;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--aij-navy);
}

.hp-stage-links {
  display: flex;
  gap: 1rem;
}

.hp-more-link {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--aij-cyan);
  text-decoration: none;
}

.hp-more-link:hover {
  text-decoration: underline;
}

.hp-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 960px) {
  .hp-grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .hp-grid-4 {
    grid-template-columns: 1fr;
  }
}

.hp-pillar-card {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  text-decoration: none;
  color: inherit;
}

.hp-pillar-card h3 {
  margin: 0.15rem 0 0;
  font-size: 1.04rem;
  font-weight: 700;
  color: var(--aij-navy);
}

.hp-pillar-card p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.58;
  color: var(--aij-text-muted);
}

.hp-card-arrow {
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--aij-cyan);
}

.hp-guides-strip {
  margin-top: 1.5rem;
}

.hp-guides-label {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--aij-navy);
  margin-bottom: 0.65rem;
}

.hp-guide-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  background: var(--aij-bg);
  border: 1px solid var(--aij-border);
  border-radius: 10px;
  text-decoration: none;
  color: var(--aij-navy);
  transition: border-color 0.15s ease;
}

.hp-guide-link:hover {
  border-color: var(--aij-cyan);
}

.hp-guide-tag {
  display: block;
  font-size: 0.72rem;
  color: var(--aij-cyan);
  margin-bottom: 0.15rem;
}

.hp-guide-link strong {
  font-size: 0.92rem;
}

.hp-featured-brand {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.hp-featured-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 1fr);
  gap: 1.25rem;
  align-items: center;
}

@media (max-width: 860px) {
  .hp-featured-grid {
    grid-template-columns: 1fr;
  }
}

.hp-featured-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.65rem;
}

.hp-featured-title {
  margin: 0 0 0.45rem;
  font-size: 1.2rem;
  color: #ffffff;
}

.hp-featured-desc {
  margin: 0 0 0.65rem;
  font-size: 0.9rem;
  color: var(--obs-text-muted);
}

.hp-featured-points {
  margin: 0 0 0.9rem;
  padding-left: 1.15rem;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #cbd5e1;
}

.hp-featured-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hp-obs-link {
  font-size: 0.86rem;
  font-weight: 600;
  color: #7dd3fc;
  text-decoration: none;
}

.hp-obs-link:hover {
  text-decoration: underline;
}

.hp-featured-cta {
  color: var(--aij-text);
}

.hp-dual-rank {
  margin-bottom: 1.25rem;
}

.hp-rank-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.hp-rank-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.hp-rank-head h3 {
  margin: 0;
  font-size: 1.02rem;
  color: var(--aij-navy);
}

.hp-rank-head a {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--aij-cyan);
  text-decoration: none;
}

.hp-rank-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--aij-text-subtle);
  line-height: 1.5;
}

.hp-rank-list {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
}

.hp-rank-row {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.72rem;
  border-radius: 8px;
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease;
}

.hp-rank-row:hover {
  border-color: var(--aij-cyan);
}

.hp-rank-num {
  font-weight: 700;
  font-size: 0.84rem;
  color: var(--aij-cyan);
}

.hp-rank-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--aij-navy);
}

.hp-rank-sub {
  font-size: 0.78rem;
  color: var(--aij-text-subtle);
}

.hp-rank-score,
.hp-rank-price {
  font-size: 0.84rem;
  color: var(--aij-navy);
}

.hp-disclosure {
  padding: 0.95rem 1.15rem;
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  border-radius: 10px;
  font-size: 0.84rem;
  line-height: 1.65;
  color: var(--aij-text-muted);
}

.hp-disclosure a {
  color: var(--aij-cyan);
  font-weight: 600;
}
</style>
