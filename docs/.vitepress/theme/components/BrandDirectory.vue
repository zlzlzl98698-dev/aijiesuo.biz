<script setup lang="ts">
import { computed, ref } from 'vue'
import { ALL_BRANDS } from '../../../../data/links'
import type { BrandRecord, ClientMode } from '../../../../data/types'
import {
  CLIENT_MODE_LABELS,
  getBrandInitials,
  getBrandLineSummary,
} from '../utils/brandHelpers'

const props = withDefaults(
  defineProps<{
    mode?: 'brands' | 'reviews'
  }>(),
  {
    mode: 'brands',
  }
)

type LineFilter = 'all' | 'dedicated' | 'transit' | 'other'
type EvidenceFilter = 'all' | 'measured' | 'vendor_bench'
type PriceFilter = 'all' | 'under_15' | '15_to_30' | 'over_30' | 'unpriced'
type SortKey = 'commercialRank' | 'researchScore' | 'completeness' | 'startingMonthlyCny'

const searchQuery = ref('')
const lineFilter = ref<LineFilter>('all')
const protocolFilter = ref<string>('all')
const clientModeFilter = ref<'all' | ClientMode>('all')
const evidenceFilter = ref<EvidenceFilter>('all')
const priceFilter = ref<PriceFilter>('all')
const sortBy = ref<SortKey>(props.mode === 'reviews' ? 'researchScore' : 'commercialRank')

const PROTOCOL_OPTIONS = ['all', 'Shadowsocks', 'VLESS', 'Trojan', 'Hysteria 2', 'AnyTLS']

function matchesLine(brand: BrandRecord, filter: LineFilter): boolean {
  if (filter === 'all') return true
  const summary = getBrandLineSummary(brand)
  if (filter === 'dedicated') return summary === '专线架构'
  if (filter === 'transit') return summary === '中转优化'
  return summary === '待核实/常规'
}

function matchesProtocol(brand: BrandRecord, proto: string): boolean {
  if (proto === 'all') return true
  return brand.protocols.some((p) => p.toLowerCase().includes(proto.toLowerCase()))
}

function matchesPrice(brand: BrandRecord, filter: PriceFilter): boolean {
  if (filter === 'all') return true
  const price = brand.startingMonthlyCny
  if (filter === 'unpriced') return price === null
  if (price === null) return false
  if (filter === 'under_15') return price < 15
  if (filter === '15_to_30') return price >= 15 && price <= 30
  if (filter === 'over_30') return price > 30
  return true
}

const filteredBrands = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  const list = ALL_BRANDS.filter((brand) => {
    if (q) {
      const haystack = [
        brand.name,
        brand.slug,
        ...brand.aliases,
        brand.positioning,
        ...brand.lineTypes,
        ...brand.protocols,
        ...brand.nodeCoverage,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }

    if (!matchesLine(brand, lineFilter.value)) return false
    if (!matchesProtocol(brand, protocolFilter.value)) return false
    if (clientModeFilter.value !== 'all' && brand.clientMode !== clientModeFilter.value) {
      return false
    }
    if (evidenceFilter.value === 'measured' && brand.speedTestEvidence.length === 0) {
      return false
    }
    if (evidenceFilter.value === 'vendor_bench' && !brand.vendorBenchmark) {
      return false
    }
    if (!matchesPrice(brand, priceFilter.value)) return false
    return true
  })

  return [...list].sort((a, b) => {
    if (sortBy.value === 'commercialRank') {
      const ra = a.commercialRank ?? 9999
      const rb = b.commercialRank ?? 9999
      if (ra !== rb) return ra - rb
      return b.researchScore - a.researchScore
    }
    if (sortBy.value === 'researchScore') {
      if (b.researchScore !== a.researchScore) return b.researchScore - a.researchScore
      return b.completeness - a.completeness
    }
    if (sortBy.value === 'completeness') {
      if (b.completeness !== a.completeness) return b.completeness - a.completeness
      return b.researchScore - a.researchScore
    }
    const pa = a.startingMonthlyCny ?? 99999
    const pb = b.startingMonthlyCny ?? 99999
    if (pa !== pb) return pa - pb
    return b.researchScore - a.researchScore
  })
})

const measuredCount = computed(
  () => ALL_BRANDS.filter((b) => b.speedTestEvidence.length > 0).length
)

function resetFilters() {
  searchQuery.value = ''
  lineFilter.value = 'all'
  protocolFilter.value = 'all'
  clientModeFilter.value = 'all'
  evidenceFilter.value = 'all'
  priceFilter.value = 'all'
}
</script>

<template>
  <section class="brand-dir" aria-label="机场品牌筛选目录">
    <div class="dir-summary-bar">
      <div class="dir-stats">
        <span>共收录 <strong>{{ ALL_BRANDS.length }}</strong> 个品牌档案</span>
        <span>·</span>
        <span>含实测截图 <strong>{{ measuredCount }}</strong> 家</span>
        <span>·</span>
        <span>当前匹配 <strong>{{ filteredBrands.length }}</strong> 家</span>
      </div>
      <span class="aij-badge aij-badge--cyan">
        研究评分与商业顺位独立展示
      </span>
    </div>

    <div class="dir-controls">
      <div class="dir-search-row">
        <input
          v-model="searchQuery"
          type="search"
          class="dir-search-input"
          placeholder="搜索品牌名称、别名、协议（VLESS/SS）、专线（IEPL/IPLC）或地区..."
          aria-label="搜索机场品牌"
        />
        <select v-model="sortBy" class="dir-select" aria-label="排序方式">
          <option value="commercialRank">按商业参考顺位</option>
          <option value="researchScore">按研究评分 (0-100)</option>
          <option value="completeness">按资料完整度 (%)</option>
          <option value="startingMonthlyCny">按月均参考起价 (低→高)</option>
        </select>
      </div>

      <div class="dir-filter-rows">
        <div class="dir-filter-item">
          <label for="bd-line">线路类型</label>
          <select id="bd-line" v-model="lineFilter" class="dir-select">
            <option value="all">全部线路</option>
            <option value="dedicated">IEPL / IPLC 专线</option>
            <option value="transit">BGP / 隧道中转</option>
            <option value="other">其他或待核实</option>
          </select>
        </div>

        <div class="dir-filter-item">
          <label for="bd-proto">传输协议</label>
          <select id="bd-proto" v-model="protocolFilter" class="dir-select">
            <option v-for="p in PROTOCOL_OPTIONS" :key="p" :value="p">
              {{ p === 'all' ? '全部协议' : p }}
            </option>
          </select>
        </div>

        <div class="dir-filter-item">
          <label for="bd-client">客户端模式</label>
          <select id="bd-client" v-model="clientModeFilter" class="dir-select">
            <option value="all">全部客户端模式</option>
            <option value="proprietary_plus_third_party">自研 + 第三方订阅</option>
            <option value="third_party_supported">仅第三方订阅</option>
            <option value="proprietary_only">仅官方自研客户端</option>
          </select>
        </div>

        <div class="dir-filter-item">
          <label for="bd-ev">实测证据</label>
          <select id="bd-ev" v-model="evidenceFilter" class="dir-select">
            <option value="all">全部状态</option>
            <option value="measured">仅看含实测截图</option>
            <option value="vendor_bench">含参考测速表</option>
          </select>
        </div>

        <div class="dir-filter-item">
          <label for="bd-price">月均起价档位</label>
          <select id="bd-price" v-model="priceFilter" class="dir-select">
            <option value="all">全部价位</option>
            <option value="under_15">¥15/月 以下</option>
            <option value="15_to_30">¥15 - ¥30/月</option>
            <option value="over_30">¥30/月 以上</option>
            <option value="unpriced">价格待核实</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="filteredBrands.length > 0" class="aij-grid-2 dir-grid">
      <article
        v-for="brand in filteredBrands"
        :key="brand.slug"
        class="aij-card dir-card"
        :style="{ borderTopColor: brand.accentColor || 'var(--aij-border)', borderTopWidth: '3px' }"
      >
        <div class="dir-card-head">
          <div class="dir-brand-id">
            <div class="dir-avatar">
              <img
                v-if="brand.logo"
                :src="brand.logo"
                :alt="`${brand.name} 图标`"
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
              />
              <span v-else>{{ getBrandInitials(brand) }}</span>
            </div>
            <div>
              <h4 class="dir-brand-name">
                <a :href="mode === 'reviews' ? `/reviews/${brand.slug}/` : `/brands/${brand.slug}/`">
                  {{ brand.name }}
                </a>
              </h4>
              <span class="dir-rank-line aij-mono">
                {{ brand.commercialRank ? `商业顺位 #${brand.commercialRank}` : '未入商业顺位' }}
                · 研究评分 {{ brand.researchScore }}/100
              </span>
            </div>
          </div>

          <div class="dir-badges">
            <span
              v-if="brand.isHistoricalOnly"
              class="aij-badge aij-badge--muted"
            >
              历史存档
            </span>
            <span
              v-else-if="brand.speedTestEvidence.length > 0"
              class="aij-badge aij-badge--ok"
            >
              含实测截图 ({{ brand.speedTestEvidence.length }})
            </span>
            <span v-else class="aij-badge aij-badge--warn">
              暂无实测截图
            </span>
          </div>
        </div>

        <p class="dir-pos">{{ brand.positioning }}</p>

        <div class="dir-meta-pills">
          <span class="aij-badge aij-badge--navy">{{ getBrandLineSummary(brand) }}</span>
          <span
            v-for="proto in brand.protocols.slice(0, 3)"
            :key="proto"
            class="aij-badge aij-badge--muted aij-mono"
          >
            {{ proto }}
          </span>
          <span class="aij-badge aij-badge--cyan aij-mono">
            完整度 {{ brand.completeness }}%
          </span>
        </div>

        <div class="dir-info-rows">
          <div>
            <span class="info-k">起价参考：</span>
            <span class="info-v">{{ brand.startingPriceLabel }}</span>
          </div>
          <div>
            <span class="info-k">客户端：</span>
            <span class="info-v">{{ CLIENT_MODE_LABELS[brand.clientMode] }}</span>
          </div>
        </div>

        <div class="dir-card-actions">
          <a :href="`/brands/${brand.slug}/`" class="dir-action-link">
            品牌档案与套餐 →
          </a>
          <a :href="`/reviews/${brand.slug}/`" class="dir-action-link dir-action-link--sub">
            实测评测报告 →
          </a>
        </div>
      </article>
    </div>

    <div v-else class="dir-empty">
      <p>当前筛选条件下未找到匹配品牌。</p>
      <button type="button" class="aij-btn aij-btn--outline" @click="resetFilters">
        重置全部筛选条件
      </button>
    </div>
  </section>
</template>

<style scoped>
.brand-dir {
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dir-summary-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--aij-text-muted);
}

.dir-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.dir-controls {
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.dir-search-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 0.65rem;
}

@media (max-width: 680px) {
  .dir-search-row {
    grid-template-columns: 1fr;
  }
}

.dir-search-input,
.dir-select {
  width: 100%;
  padding: 0.52rem 0.78rem;
  border-radius: 8px;
  border: 1px solid var(--aij-border-strong);
  background: var(--aij-bg);
  color: var(--aij-text);
  font-size: 0.88rem;
}

.dir-filter-rows {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.65rem;
}

@media (max-width: 960px) {
  .dir-filter-rows {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 540px) {
  .dir-filter-rows {
    grid-template-columns: 1fr;
  }
}

.dir-filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dir-filter-item label {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--aij-text-subtle);
}

.dir-card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.dir-card-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
}

.dir-brand-id {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.dir-avatar {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid var(--aij-border);
  background: var(--aij-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--aij-navy);
  overflow: hidden;
  flex-shrink: 0;
}

.dir-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dir-brand-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}

.dir-brand-name a {
  color: var(--aij-navy);
  text-decoration: none;
}

.dir-brand-name a:hover {
  color: var(--aij-cyan);
  text-decoration: underline;
}

.dir-rank-line {
  font-size: 0.76rem;
  color: var(--aij-text-subtle);
}

.dir-pos {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--aij-text-muted);
}

.dir-meta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.dir-info-rows {
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--aij-text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-k {
  font-weight: 600;
  color: var(--aij-navy);
}

.dir-card-actions {
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px solid var(--aij-border);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

.dir-action-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--aij-navy);
  text-decoration: none;
}

.dir-action-link:hover {
  color: var(--aij-cyan);
  text-decoration: underline;
}

.dir-action-link--sub {
  color: var(--aij-cyan);
}

.dir-empty {
  text-align: center;
  padding: 2rem 1rem;
  background: var(--aij-surface);
  border: 1px dashed var(--aij-border-strong);
  border-radius: 12px;
  color: var(--aij-text-muted);
}
</style>
