<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBrandBySlug } from '../../../../data/links'
import {
  BILLING_FILTER_OPTIONS,
  getPlanMonthlyEquivalentNote,
  matchesBillingFilter,
  type BillingFilterKey,
} from '../utils/brandHelpers'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const activeFilter = ref<BillingFilterKey>('all')

const filteredPlans = computed(() => {
  if (!brand.value) return []
  return brand.value.plans.filter((plan) => matchesBillingFilter(plan, activeFilter.value))
})

const availableFilterOptions = computed(() => {
  if (!brand.value) return BILLING_FILTER_OPTIONS
  return BILLING_FILTER_OPTIONS.filter(
    (opt) =>
      opt.key === 'all' ||
      brand.value!.plans.some((plan) => matchesBillingFilter(plan, opt.key))
  )
})
</script>

<template>
  <section
    v-if="brand"
    class="obs-panel"
    :style="{ '--brand-accent': brand.accentColor || '#38bdf8' }"
    aria-label="套餐档位与计费周期对比"
  >
    <header class="obs-panel-header">
      <div>
        <h3 class="obs-panel-title">
          {{ brand.name }} · 套餐档位与计费周期拆解
        </h3>
        <p class="obs-panel-subtitle">
          明确区分月付、年付折算与一次性永久流量包，避免混淆一次性支出与按月费用
        </p>
      </div>

      <div v-if="brand.plans.length > 0" class="plan-filters" role="group" aria-label="计费周期筛选">
        <button
          v-for="opt in availableFilterOptions"
          :key="opt.key"
          type="button"
          class="plan-filter-btn"
          :class="{ 'is-active': activeFilter === opt.key }"
          @click="activeFilter = opt.key"
        >
          {{ opt.label }}
        </button>
      </div>
    </header>

    <div v-if="filteredPlans.length > 0" class="plan-cards-grid">
      <article
        v-for="plan in filteredPlans"
        :key="`${plan.name}-${plan.billingCycle}`"
        class="obs-card plan-card"
      >
        <div class="plan-card-top">
          <h4 class="plan-name">{{ plan.name }}</h4>
          <span class="obs-pill obs-pill--stable">{{ plan.billingLabel }}</span>
        </div>

        <div class="plan-price-row">
          <span v-if="plan.priceCny !== null" class="plan-price aij-mono">
            ¥{{ plan.priceCny }}
          </span>
          <span v-else class="plan-price aij-mono">价格待核实</span>
          <span class="plan-cycle">/ {{ plan.billingLabel }}</span>
        </div>

        <p
          v-if="getPlanMonthlyEquivalentNote(plan)"
          class="plan-equiv"
        >
          {{ getPlanMonthlyEquivalentNote(plan) }}
        </p>

        <dl class="plan-specs">
          <div>
            <dt>可用流量</dt>
            <dd class="aij-mono">{{ plan.trafficLabel }}</dd>
          </div>
          <div>
            <dt>重置周期</dt>
            <dd>{{ plan.trafficCycle }}</dd>
          </div>
        </dl>

        <p v-if="plan.notes" class="plan-notes">
          {{ plan.notes }}
        </p>
      </article>
    </div>

    <div v-else class="obs-card plan-empty">
      <span class="obs-pill obs-pill--untested">Not Verified</span>
      <p v-if="brand.plans.length === 0">
        当前未收录 {{ brand.name }} 的可核实分档套餐价格表，请以其官网最新页面为准（不建议在价格未明时直接购买长期套餐）。
      </p>
      <p v-else>
        当前筛选条件下暂无匹配套餐，请切换计费周期查看全部档位。
      </p>
    </div>

    <footer class="obs-footer">
      <strong>计费透明度说明：</strong>
      年付/季付套餐需一次性支付完整周期费用，实际使用中如遇线路波动或停运风险，未消费周期通常难以退费；首次尝试建议优先选择月付档位验证本地宽带兼容性。
    </footer>
  </section>
</template>

<style scoped>
.plan-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.plan-filter-btn {
  padding: 0.32rem 0.72rem;
  border-radius: 999px;
  border: 1px solid var(--obs-border);
  background: var(--obs-card);
  color: var(--obs-text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.plan-filter-btn:hover {
  border-color: var(--brand-accent, var(--obs-accent));
  color: #ffffff;
}

.plan-filter-btn.is-active {
  background: var(--brand-accent, var(--obs-accent));
  border-color: var(--brand-accent, var(--obs-accent));
  color: #0b1324;
}

.plan-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.85rem;
}

.plan-card {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.plan-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.plan-name {
  margin: 0;
  font-size: 0.94rem;
  font-weight: 700;
  color: #ffffff;
}

.plan-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.plan-price {
  font-size: 1.45rem;
  font-weight: 700;
  color: #ffffff;
}

.plan-cycle {
  font-size: 0.82rem;
  color: var(--obs-text-muted);
}

.plan-equiv {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: #fbbf24;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 6px;
  padding: 0.32rem 0.55rem;
}

.plan-specs {
  margin: 0.2rem 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--obs-border);
}

.plan-specs dt {
  font-size: 0.72rem;
  color: var(--obs-text-muted);
}

.plan-specs dd {
  margin: 0.12rem 0 0;
  font-size: 0.83rem;
  font-weight: 600;
  color: #e2e8f0;
}

.plan-notes {
  margin: auto 0 0;
  padding-top: 0.45rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--obs-text-muted);
}

.plan-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.plan-empty p {
  margin: 0;
  font-size: 0.86rem;
  color: var(--obs-text-muted);
}
</style>
