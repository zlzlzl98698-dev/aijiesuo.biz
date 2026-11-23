<script setup lang="ts">
import { computed, ref } from 'vue'
import { AFFILIATE_DISCLOSURE, getBrandAffiliateInfo } from '../../../../data/links'
import { LINK_STATUS_META } from '../utils/brandHelpers'

const props = defineProps<{
  slug: string
  label?: string
  compact?: boolean
}>()

const info = computed(() => getBrandAffiliateInfo(props.slug))
const copiedCode = ref<string | null>(null)

const linkStatusInfo = computed(() => {
  if (!info.value) return null
  return LINK_STATUS_META[info.value.linkStatus]
})

const buttonLabel = computed(() => {
  if (props.label) return props.label
  if (!info.value) return '暂无可用链接'
  if (info.value.linkStatus === 'historical') {
    return `查看 ${info.value.name} 历史记录链接`
  }
  return `访问 ${info.value.name} 官网`
})

async function copyCoupon(code: string) {
  if (import.meta.env.SSR) return
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(code)
      copiedCode.value = code
      setTimeout(() => {
        if (copiedCode.value === code) copiedCode.value = null
      }, 2200)
    }
  } catch {
    copiedCode.value = code
  }
}
</script>

<template>
  <div v-if="info" class="brand-cta-box" :class="{ 'is-compact': compact }">
    <div class="brand-cta-main">
      <div class="brand-cta-actions">
        <a
          v-if="info.url"
          :href="info.url"
          :target="info.target || '_blank'"
          :rel="info.rel || 'nofollow sponsored noopener'"
          class="brand-cta-btn brand-cta"
        >
          <span>{{ buttonLabel }}</span>
          <span class="aij-mono" aria-hidden="true">↗</span>
        </a>
        <span v-else class="brand-cta-disabled">
          暂无可用官网链接（待核实）
        </span>

        <span
          v-if="linkStatusInfo"
          class="aij-badge"
          :class="{
            'aij-badge--ok': linkStatusInfo.tone === 'operational',
            'aij-badge--warn': linkStatusInfo.tone === 'partial',
            'aij-badge--muted': linkStatusInfo.tone === 'historical',
            'aij-badge--danger': linkStatusInfo.tone === 'unavailable',
          }"
        >
          {{ linkStatusInfo.label }}
        </span>
      </div>

      <div v-if="info.coupons.length > 0" class="brand-cta-coupons">
        <button
          v-for="coupon in info.coupons"
          :key="coupon.code"
          type="button"
          class="coupon-pill"
          :title="coupon.discountLabel || '点击复制优惠码'"
          @click="copyCoupon(coupon.code)"
        >
          <span class="coupon-tag">优惠码</span>
          <code class="coupon-code">{{ coupon.code }}</code>
          <span v-if="coupon.discountLabel" class="coupon-desc">
            {{ coupon.discountLabel }}
          </span>
          <span class="coupon-copy-state">
            {{ copiedCode === coupon.code ? '已复制' : '复制' }}
          </span>
        </button>
      </div>
    </div>

    <div
      v-if="info.linkStatus === 'format_anomaly'"
      class="brand-cta-warning"
      role="alert"
    >
      链接格式异常提示：原始资料记录的域名/协议前缀存在格式异常，跳转前请核对浏览器地址栏并注意安全边界。
    </div>

    <div
      v-else-if="info.linkStatus === 'historical'"
      class="brand-cta-warning"
      role="note"
    >
      历史存档提示：该链接来自历史资料整理，品牌当前可用性或域名可能已发生变化，请勿直接大额预付。
    </div>

    <div v-if="info.alternateUrls.length > 0 && !compact" class="brand-cta-alts">
      <span class="alt-label">备用入口：</span>
      <a
        v-for="(altUrl, idx) in info.alternateUrls"
        :key="altUrl"
        :href="altUrl"
        target="_blank"
        rel="nofollow sponsored noopener"
        class="alt-link brand-cta"
      >
        备用线路 {{ idx + 1 }} ↗
      </a>
    </div>

    <p class="brand-cta-disclosure">
      {{ info.disclosure || AFFILIATE_DISCLOSURE }}
    </p>
  </div>
</template>

<style scoped>
.brand-cta-box {
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  border-radius: 12px;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.brand-cta-box.is-compact {
  padding: 0.8rem 0.95rem;
}

.brand-cta-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.brand-cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.brand-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.15rem;
  background: var(--aij-navy);
  color: #ffffff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  transition: background-color 0.16s ease;
}

.brand-cta-btn:hover {
  background: var(--aij-cyan);
  color: #ffffff;
}

.brand-cta-disabled {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.95rem;
  background: var(--aij-surface-alt);
  color: var(--aij-text-muted);
  border: 1px solid var(--aij-border);
  border-radius: 8px;
  font-size: 0.88rem;
}

.brand-cta-coupons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.coupon-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  border: 1px dashed var(--aij-cyan);
  background: var(--light-info-bg);
  color: var(--aij-navy);
  font-size: 0.82rem;
  cursor: pointer;
}

.coupon-pill:hover {
  background: #e0f2fe;
}

.coupon-tag {
  font-weight: 600;
  color: var(--aij-cyan);
}

.coupon-code {
  font-family: var(--aij-mono);
  font-weight: 700;
  background: #ffffff;
  padding: 0.08rem 0.36rem;
  border-radius: 4px;
  border: 1px solid var(--light-info-border);
}

.coupon-desc {
  color: var(--aij-text-muted);
  font-size: 0.78rem;
}

.coupon-copy-state {
  font-family: var(--aij-mono);
  font-size: 0.74rem;
  color: var(--aij-cyan);
  font-weight: 600;
}

.brand-cta-warning {
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  background: var(--light-warn-bg);
  border: 1px solid var(--light-warn-border);
  color: var(--light-warn-text);
  font-size: 0.82rem;
  line-height: 1.5;
}

.brand-cta-alts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.82rem;
}

.alt-label {
  color: var(--aij-text-muted);
}

.alt-link {
  color: var(--aij-cyan);
  text-decoration: none;
  font-weight: 500;
}

.alt-link:hover {
  text-decoration: underline;
}

.brand-cta-disclosure {
  margin: 0;
  font-size: 0.76rem;
  line-height: 1.5;
  color: var(--aij-text-subtle);
}
</style>
