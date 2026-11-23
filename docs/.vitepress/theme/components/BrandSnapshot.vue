<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBrandBySlug } from '../../../../data/links'
import {
  CLIENT_MODE_LABELS,
  DATA_STATUS_META,
  formatSourceLabel,
  getBrandInitials,
} from '../utils/brandHelpers'
import BrandCta from './BrandCta.vue'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const showBreakdown = ref(false)

const dataStatusInfo = computed(() => {
  if (!brand.value) return null
  return DATA_STATUS_META[brand.value.dataStatus]
})

const breakdownRows = computed(() => {
  if (!brand.value) return []
  const b = brand.value.researchScoreBreakdown
  return [
    { label: '资料完整度', score: b.completeness, max: 30 },
    { label: '协议与线路清晰度', score: b.protocolLineClarity, max: 20 },
    { label: '实测证据可用性', score: b.measuredEvidence, max: 25 },
    { label: '套餐与定价弹性', score: b.pricingFlexibility, max: 15 },
    { label: '风险与局限透明度', score: b.riskTransparency, max: 10 },
  ]
})
</script>

<template>
  <section
    v-if="brand"
    class="obs-panel snapshot-panel"
    :style="{ '--brand-accent': brand.accentColor || '#38bdf8' }"
    aria-label="品牌基础设施与研究评分快照"
  >
    <header class="snapshot-header">
      <div class="snapshot-identity">
        <div
          class="snapshot-avatar"
          :style="{ borderColor: brand.accentColor || '#38bdf8' }"
        >
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="`${brand.name} 品牌标识`"
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
            class="snapshot-logo"
          />
          <span v-else class="snapshot-monogram">
            {{ getBrandInitials(brand) }}
          </span>
        </div>

        <div>
          <div class="snapshot-title-row">
            <h3 class="obs-panel-title">{{ brand.name }}</h3>
            <span v-if="brand.aliases.length > 0" class="snapshot-alias aij-mono">
              {{ brand.aliases.join(' / ') }}
            </span>
          </div>
          <p class="obs-panel-subtitle">{{ brand.positioning }}</p>
        </div>
      </div>

      <div class="snapshot-pills">
        <span
          v-if="brand.isHistoricalOnly"
          class="obs-pill obs-pill--historical"
        >
          Historical · 历史存档品牌
        </span>
        <span
          v-else-if="brand.speedTestEvidence.length > 0"
          class="obs-pill obs-pill--operational"
        >
          Measured · 含实测截图
        </span>
        <span
          v-else
          class="obs-pill obs-pill--untested"
        >
          Not Tested · 暂无实测截图
        </span>
        <span
          v-if="dataStatusInfo"
          class="obs-pill obs-pill--stable"
        >
          {{ dataStatusInfo.label }}
        </span>
      </div>
    </header>

    <!-- Dual Score System: Commercial Rank vs Independent Research Score -->
    <div class="score-grid">
      <div class="obs-card score-card">
        <span class="score-kicker">研究评分（独立透明评估）</span>
        <div class="score-value-row">
          <strong class="score-big aij-mono">{{ brand.researchScore }}</strong>
          <span class="score-denom aij-mono">/ 100</span>
          <button
            type="button"
            class="score-toggle"
            @click="showBreakdown = !showBreakdown"
          >
            {{ showBreakdown ? '收起 5 维拆解 ▲' : '查看 5 维拆解 ▼' }}
          </button>
        </div>
        <p class="score-note">
          与商业推广顺位完全独立，依据资料完整度与实测证据计算。
        </p>
      </div>

      <div class="obs-card score-card">
        <span class="score-kicker">资料完整度与商业参考顺位</span>
        <div class="score-value-row">
          <strong class="score-big aij-mono">{{ brand.completeness }}%</strong>
          <span class="score-meta-pill aij-mono">
            {{ brand.commercialRank ? `商业清单顺位 #${brand.commercialRank}` : '未列入商业清单顺位' }}
          </span>
        </div>
        <p class="score-note">
          起始参考价：{{ brand.startingPriceLabel }}
        </p>
      </div>
    </div>

    <!-- Expandable 5-Dimension Breakdown -->
    <div v-if="showBreakdown" class="obs-card breakdown-box">
      <div class="breakdown-head">
        <strong>研究评分 5 维明细（{{ brand.researchScoreBreakdown.rubricVersion }}）</strong>
        <span class="aij-mono">总分 {{ brand.researchScoreBreakdown.total }} / 100</span>
      </div>
      <div class="breakdown-bars">
        <div v-for="row in breakdownRows" :key="row.label" class="breakdown-row">
          <div class="breakdown-label-row">
            <span>{{ row.label }}</span>
            <span class="aij-mono">{{ row.score }} / {{ row.max }}</span>
          </div>
          <div class="breakdown-track">
            <div
              class="breakdown-fill"
              :style="{
                width: `${Math.min(100, (row.score / row.max) * 100)}%`,
                backgroundColor: brand.accentColor || '#38bdf8',
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Key Infrastructure Specs -->
    <div class="spec-grid">
      <div class="obs-card spec-item">
        <span class="spec-label">支持协议</span>
        <div class="spec-tags">
          <span
            v-for="proto in brand.protocols"
            :key="proto"
            class="spec-tag aij-mono"
          >
            {{ proto }}
          </span>
          <span v-if="brand.protocols.length === 0" class="spec-muted">未明确标注</span>
        </div>
      </div>

      <div class="obs-card spec-item">
        <span class="spec-label">客户端模式</span>
        <p class="spec-val">{{ CLIENT_MODE_LABELS[brand.clientMode] }}</p>
        <p v-if="brand.clientNotes" class="spec-sub">{{ brand.clientNotes }}</p>
      </div>

      <div class="obs-card spec-item">
        <span class="spec-label">设备限制与倍率</span>
        <p class="spec-val">{{ brand.deviceLimit }}</p>
        <p class="spec-sub">流量倍率：{{ brand.trafficMultiplier }}</p>
      </div>

      <div class="obs-card spec-item">
        <span class="spec-label">节点与成立年份</span>
        <p class="spec-val">{{ brand.nodeCountLabel || '节点数待核实' }}</p>
        <p class="spec-sub">
          {{ brand.foundedYear ? `资料记录始于 ${brand.foundedYear} 年` : '成立年份未明示' }}
          <span v-if="brand.paymentMethods.length > 0">
            · 支付：{{ brand.paymentMethods.join(' / ') }}
          </span>
        </p>
      </div>
    </div>

    <!-- Conflicts & Pending Verification Alerts -->
    <div
      v-if="brand.conflicts.length > 0 || brand.pendingVerification.length > 0"
      class="alerts-wrap"
    >
      <div v-if="brand.conflicts.length > 0" class="obs-alert obs-alert--warn">
        <strong>资料冲突提示：</strong>
        <ul>
          <li v-for="c in brand.conflicts" :key="c">{{ formatSourceLabel(c) }}</li>
        </ul>
      </div>
      <div v-if="brand.pendingVerification.length > 0" class="obs-alert obs-alert--info">
        <strong>待核实事项：</strong>
        <ul>
          <li v-for="p in brand.pendingVerification" :key="p">{{ formatSourceLabel(p) }}</li>
        </ul>
      </div>
    </div>

    <div class="snapshot-cta-wrap">
      <BrandCta :slug="slug" />
    </div>
  </section>
</template>

<style scoped>
.snapshot-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--obs-border);
}

.snapshot-identity {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.snapshot-avatar {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 2px solid var(--brand-accent, #38bdf8);
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.snapshot-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.snapshot-monogram {
  font-weight: 700;
  font-size: 1.05rem;
  color: #ffffff;
}

.snapshot-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
}

.snapshot-alias {
  font-size: 0.78rem;
  color: var(--obs-text-muted);
}

.snapshot-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

@media (max-width: 720px) {
  .score-grid {
    grid-template-columns: 1fr;
  }
}

.score-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.score-kicker {
  font-size: 0.78rem;
  color: var(--obs-text-muted);
}

.score-value-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.45rem;
}

.score-big {
  font-size: 1.75rem;
  line-height: 1.1;
  color: #ffffff;
}

.score-denom {
  font-size: 0.86rem;
  color: var(--obs-text-muted);
}

.score-toggle {
  margin-left: auto;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.32);
  color: #7dd3fc;
  font-size: 0.76rem;
  padding: 0.24rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
}

.score-meta-pill {
  font-size: 0.78rem;
  padding: 0.16rem 0.52rem;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.14);
  color: #e2e8f0;
}

.score-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--obs-text-muted);
}

.breakdown-box {
  margin-bottom: 0.85rem;
}

.breakdown-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.86rem;
  color: #ffffff;
}

.breakdown-bars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.75rem;
}

.breakdown-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--obs-text-muted);
  margin-bottom: 0.25rem;
}

.breakdown-track {
  height: 7px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.16);
  overflow: hidden;
}

.breakdown-fill {
  height: 100%;
  border-radius: 999px;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

@media (max-width: 720px) {
  .spec-grid {
    grid-template-columns: 1fr;
  }
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.spec-label {
  font-size: 0.76rem;
  color: var(--obs-text-muted);
}

.spec-val {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
}

.spec-sub {
  margin: 0;
  font-size: 0.79rem;
  line-height: 1.5;
  color: var(--obs-text-muted);
}

.spec-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
  margin-top: 0.15rem;
}

.spec-tag {
  font-size: 0.75rem;
  padding: 0.16rem 0.5rem;
  border-radius: 6px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.26);
  color: #e0f2fe;
}

.spec-muted {
  font-size: 0.82rem;
  color: var(--obs-text-muted);
}

.alerts-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.85rem;
}

.obs-alert {
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  font-size: 0.82rem;
  line-height: 1.55;
}

.obs-alert ul {
  margin: 0.35rem 0 0;
  padding-left: 1.2rem;
}

.obs-alert--warn {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.32);
  color: #fde68a;
}

.obs-alert--info {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.28);
  color: #bae6fd;
}

.snapshot-cta-wrap {
  margin-top: 1rem;
  color: var(--aij-text);
}
</style>
