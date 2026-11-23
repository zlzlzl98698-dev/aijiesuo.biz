<script setup lang="ts">
import { computed, ref } from 'vue'
import { ALL_BRANDS } from '../../../../data/links'
import type { BrandRecord } from '../../../../data/types'
import { CLIENT_MODE_LABELS, formatSourceLabel } from '../utils/brandHelpers'
import BrandCta from './BrandCta.vue'

type TrafficNeed = 'light' | 'medium' | 'heavy' | 'flexible'
type ClientPref = 'third_party' | 'proprietary_ok'
type UnlockNeed = 'ai' | 'streaming' | 'general'
type BillingPref = 'monthly' | 'annual' | 'one_time' | 'all'

const trafficNeed = ref<TrafficNeed>('medium')
const clientPref = ref<ClientPref>('third_party')
const unlockNeed = ref<UnlockNeed>('ai')
const billingPref = ref<BillingPref>('monthly')
const includeAnomalous = ref(false)

interface MatchedBrand {
  brand: BrandRecord
  matchedPlans: string[]
  fitNotes: string[]
  caution: string | null
}

const results = computed<MatchedBrand[]>(() => {
  const candidates = ALL_BRANDS.filter((b) => {
    if (b.isHistoricalOnly || b.plans.length === 0) return false
    if (!includeAnomalous.value && b.affiliate.linkStatus === 'format_anomaly') {
      return false
    }

    if (clientPref.value === 'third_party') {
      if (b.clientMode === 'proprietary_only' || b.clientMode === 'unverified') {
        return false
      }
    }

    if (billingPref.value === 'monthly') {
      if (!b.plans.some((p) => p.billingCycle === 'monthly')) return false
    } else if (billingPref.value === 'annual') {
      if (!b.plans.some((p) => p.billingCycle === 'annual')) return false
    } else if (billingPref.value === 'one_time') {
      if (!b.plans.some((p) => p.billingCycle === 'one_time')) return false
    }

    if (trafficNeed.value === 'heavy') {
      const hasHeavy = b.plans.some((p) => (p.trafficGb ?? 0) >= 300)
      if (!hasHeavy) return false
    }

    return true
  })

  const scored = candidates.map((brand): MatchedBrand => {
    const fitNotes: string[] = []
    if (brand.speedTestEvidence.length > 0) {
      fitNotes.push(`含 ${brand.speedTestEvidence.length} 份实测截图`)
    }
    if (unlockNeed.value === 'ai') {
      const verifiedAi = brand.aiSupport.filter((a) => a.status === 'verified')
      if (verifiedAi.length > 0) {
        fitNotes.push(`含实测 AI 检测 (${verifiedAi.map((a) => a.service).join('/')})`)
      } else if (brand.aiSupport.some((a) => a.status === 'vendor_claimed' || a.status === 'conditional')) {
        fitNotes.push('品牌资料声明支持主流 AI（仍需节点实测）')
      }
    } else if (unlockNeed.value === 'streaming') {
      const verifiedStream = brand.streamingSupport.filter((s) => s.status === 'verified')
      if (verifiedStream.length > 0) {
        fitNotes.push(`含实测流媒体检测 (${verifiedStream.length} 项)`)
      }
    }

    const matchedPlans = brand.plans
      .filter((p) => {
        if (billingPref.value === 'monthly') return p.billingCycle === 'monthly'
        if (billingPref.value === 'annual') return p.billingCycle === 'annual'
        if (billingPref.value === 'one_time') return p.billingCycle === 'one_time'
        return true
      })
      .filter((p) => {
        if (trafficNeed.value === 'light') return (p.trafficGb ?? 999) <= 150
        if (trafficNeed.value === 'heavy') return (p.trafficGb ?? 0) >= 300
        return true
      })
      .slice(0, 2)
      .map((p) =>
        p.priceCny !== null
          ? `${p.name}（${p.billingLabel} ¥${p.priceCny} · ${p.trafficLabel}）`
          : `${p.name}（${p.billingLabel} · ${p.trafficLabel}）`
      )

    let caution: string | null = null
    if (brand.affiliate.linkStatus === 'format_anomaly') {
      caution = '原始资料中推广链接存在格式异常，注册前请核对浏览器跳转。'
    } else if (brand.conflicts.length > 0) {
      caution = formatSourceLabel(brand.conflicts[0])
    }

    return {
      brand,
      matchedPlans,
      fitNotes,
      caution,
    }
  })

  return scored
    .sort((a, b) => {
      const aAi = unlockNeed.value === 'ai' && a.brand.aiSupport.some((x) => x.status === 'verified') ? 1 : 0
      const bAi = unlockNeed.value === 'ai' && b.brand.aiSupport.some((x) => x.status === 'verified') ? 1 : 0
      if (bAi !== aAi) return bAi - aAi
      if (b.brand.researchScore !== a.brand.researchScore) {
        return b.brand.researchScore - a.brand.researchScore
      }
      return (a.brand.commercialRank ?? 999) - (b.brand.commercialRank ?? 999)
    })
    .slice(0, 6)
})

function resetAll() {
  trafficNeed.value = 'medium'
  clientPref.value = 'third_party'
  unlockNeed.value = 'ai'
  billingPref.value = 'monthly'
  includeAnomalous.value = false
}
</script>

<template>
  <section class="rec-widget" aria-label="交互式机场选型计算器">
    <div class="rec-header">
      <div>
        <span class="rec-kicker aij-mono">INTERACTIVE DECISION MATRIX</span>
        <h3 class="rec-title">4 步交互式机场需求选型器</h3>
      </div>
      <span class="aij-badge aij-badge--cyan">
        基于品牌核验数据库实时筛选 · 自动排除历史失效归档
      </span>
    </div>

    <div class="rec-questions">
      <div class="rec-q">
        <label class="rec-q-label">1. 每月预估流量需求</label>
        <div class="rec-chips">
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': trafficNeed === 'light' }"
            @click="trafficNeed = 'light'"
          >
            ≤ 100GB 轻度办公
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': trafficNeed === 'medium' }"
            @click="trafficNeed = 'medium'"
          >
            100–300GB 日常主力
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': trafficNeed === 'heavy' }"
            @click="trafficNeed = 'heavy'"
          >
            300GB+ 重度影音/团队
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': trafficNeed === 'flexible' }"
            @click="trafficNeed = 'flexible'"
          >
            不限用量区间
          </button>
        </div>
      </div>

      <div class="rec-q">
        <label class="rec-q-label">2. 客户端与设备生态</label>
        <div class="rec-chips">
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': clientPref === 'third_party' }"
            @click="clientPref = 'third_party'"
          >
            必须支持第三方订阅 (Clash/小火箭/软路由)
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': clientPref === 'proprietary_ok' }"
            @click="clientPref = 'proprietary_ok'"
          >
            接受纯专属一键客户端 (新手免配置)
          </button>
        </div>
      </div>

      <div class="rec-q">
        <label class="rec-q-label">3. 计费周期偏好</label>
        <div class="rec-chips">
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': billingPref === 'monthly' }"
            @click="billingPref = 'monthly'"
          >
            灵活月付试错 (推荐)
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': billingPref === 'annual' }"
            @click="billingPref = 'annual'"
          >
            百元轻量年付
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': billingPref === 'one_time' }"
            @click="billingPref = 'one_time'"
          >
            一次性不限时流量包
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': billingPref === 'all' }"
            @click="billingPref = 'all'"
          >
            全部计费方式
          </button>
        </div>
      </div>

      <div class="rec-q">
        <label class="rec-q-label">4. 核心应用场景</label>
        <div class="rec-chips">
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': unlockNeed === 'ai' }"
            @click="unlockNeed = 'ai'"
          >
            ChatGPT / Claude / Gemini
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': unlockNeed === 'streaming' }"
            @click="unlockNeed = 'streaming'"
          >
            Netflix / Disney+ / YouTube
          </button>
          <button
            type="button"
            class="aij-filter-chip"
            :class="{ 'is-active': unlockNeed === 'general' }"
            @click="unlockNeed = 'general'"
          >
            常规查阅与开发资料
          </button>
        </div>
      </div>
    </div>

    <div class="rec-toolbar">
      <span class="rec-count">
        当前匹配 <strong>{{ results.length }}</strong> 个优先方案（按研究评分与实测完整度排序）
      </span>
      <label class="rec-toggle">
        <input v-model="includeAnomalous" type="checkbox" />
        <span>包含存在链接格式异常提示的条目</span>
      </label>
    </div>

    <div v-if="results.length > 0" class="aij-grid-2 rec-results">
      <article
        v-for="item in results"
        :key="item.brand.slug"
        class="aij-card rec-card"
        :style="{ borderTopColor: item.brand.accentColor || 'var(--aij-cyan)', borderTopWidth: '3px' }"
      >
        <div class="rec-card-head">
          <div>
            <h4 class="rec-brand-name">
              <a :href="`/brands/${item.brand.slug}/`">{{ item.brand.name }}</a>
            </h4>
            <span class="aij-mono rec-meta">
              研究评分 {{ item.brand.researchScore }}/100 · 起价 {{ item.brand.startingPriceLabel }}
            </span>
          </div>
          <a :href="`/reviews/${item.brand.slug}/`" class="aij-badge aij-badge--navy">
            深度评测 →
          </a>
        </div>

        <p class="rec-client-mode">{{ CLIENT_MODE_LABELS[item.brand.clientMode] }}</p>

        <div v-if="item.matchedPlans.length > 0" class="rec-plans">
          <strong>匹配参考档位：</strong>
          <ul>
            <li v-for="planText in item.matchedPlans" :key="planText" class="aij-mono">
              {{ planText }}
            </li>
          </ul>
        </div>

        <div v-if="item.fitNotes.length > 0" class="rec-fit-tags">
          <span
            v-for="note in item.fitNotes"
            :key="note"
            class="aij-badge aij-badge--ok"
          >
            {{ note }}
          </span>
        </div>

        <p v-if="item.caution" class="rec-caution">
          <strong>核查提醒：</strong>{{ item.caution }}
        </p>

        <div class="rec-cta-wrap">
          <BrandCta :slug="item.brand.slug" compact />
        </div>
      </article>
    </div>

    <div v-else class="rec-empty">
      <p>当前组合条件较为严格，未匹配到完全符合的品牌。</p>
      <button type="button" class="aij-btn aij-btn--outline" @click="resetAll">
        恢复默认选型条件
      </button>
    </div>
  </section>
</template>

<style scoped>
.rec-widget {
  margin: 1.5rem 0;
  padding: 1.35rem;
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.rec-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.rec-kicker {
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--aij-cyan);
  letter-spacing: 0.05em;
}

.rec-title {
  margin: 0.15rem 0 0;
  font-size: 1.18rem;
  color: var(--aij-navy);
}

.rec-questions {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1rem;
  background: var(--aij-bg);
  border: 1px solid var(--aij-border);
  border-radius: 10px;
}

.rec-q {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.rec-q-label {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--aij-navy);
}

.rec-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.rec-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  font-size: 0.85rem;
  color: var(--aij-text-muted);
}

.rec-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}

.rec-card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.rec-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
}

.rec-brand-name {
  margin: 0;
  font-size: 1.04rem;
}

.rec-brand-name a {
  color: var(--aij-navy);
  text-decoration: none;
}

.rec-brand-name a:hover {
  color: var(--aij-cyan);
}

.rec-meta {
  font-size: 0.76rem;
  color: var(--aij-text-subtle);
}

.rec-client-mode {
  margin: 0;
  font-size: 0.84rem;
  color: var(--aij-text-muted);
}

.rec-plans {
  font-size: 0.82rem;
  color: var(--aij-text);
}

.rec-plans ul {
  margin: 0.25rem 0 0;
  padding-left: 1.1rem;
  font-size: 0.78rem;
  line-height: 1.55;
}

.rec-fit-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.rec-caution {
  margin: 0;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  background: var(--light-warn-bg);
  border: 1px solid var(--light-warn-border);
  color: var(--light-warn-text);
  font-size: 0.78rem;
  line-height: 1.5;
}

.rec-cta-wrap {
  margin-top: auto;
  padding-top: 0.35rem;
}

.rec-empty {
  padding: 1.5rem;
  text-align: center;
  background: var(--aij-bg);
  border: 1px dashed var(--aij-border-strong);
  border-radius: 10px;
}
</style>
