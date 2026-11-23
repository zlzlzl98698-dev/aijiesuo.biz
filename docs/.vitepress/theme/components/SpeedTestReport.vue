<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getBrandBySlug } from '../../../../data/links'
import { formatTestedAt, translateLimitation } from '../utils/brandHelpers'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const zoomedImage = ref<{ src: string; alt: string } | null>(null)

const hasScreenshots = computed(
  () => Boolean(brand.value && brand.value.speedTestEvidence.length > 0)
)
const hasVendorBenchmark = computed(
  () => Boolean(brand.value && brand.value.vendorBenchmark && brand.value.vendorBenchmark.rows.length > 0)
)

function openZoom(src: string, alt: string) {
  zoomedImage.value = { src, alt }
}

function closeZoom() {
  zoomedImage.value = null
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && zoomedImage.value) {
    closeZoom()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeyDown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeyDown)
  }
})
</script>

<template>
  <section
    v-if="brand"
    class="obs-panel"
    :style="{ '--brand-accent': brand.accentColor || '#38bdf8' }"
    aria-label="节点测速与吞吐观测报告"
  >
    <header class="obs-panel-header">
      <div>
        <h3 class="obs-panel-title">
          {{ brand.name }} · 测速实测与参考快照观测台
        </h3>
        <p class="obs-panel-subtitle">
          严格区分可核验测速截图与品牌资料附带参考测速，不虚构未采集数据
        </p>
      </div>
      <div class="obs-header-pills">
        <span
          v-if="hasScreenshots"
          class="obs-pill obs-pill--operational"
        >
          Measured · {{ brand.speedTestEvidence.length }} 份实测截图
        </span>
        <span
          v-else
          class="obs-pill obs-pill--untested"
        >
          Not Tested · 暂无可核实实测截图
        </span>
        <span
          v-if="hasVendorBenchmark"
          class="obs-pill obs-pill--vendor"
        >
          Vendor Claimed · 历史参考数据
        </span>
      </div>
    </header>

    <!-- 1. Measured Speedtest Screenshots -->
    <div v-if="hasScreenshots" class="speed-evidence-list">
      <article
        v-for="item in brand.speedTestEvidence"
        :key="item.id"
        class="obs-card speed-record"
      >
        <div class="speed-record-meta">
          <div class="speed-record-badges">
            <span class="obs-pill obs-pill--operational">Measured</span>
            <span class="obs-pill obs-pill--stable">
              {{ item.protocolDisplayed || '协议未明示' }}
            </span>
            <span class="aij-mono speed-time">
              {{ formatTestedAt(item.testedAt) }}
            </span>
          </div>
          <div class="speed-tool-line">
            <span>测速工具：<strong>{{ item.toolFamily }}</strong></span>
            <span v-if="item.backendNode"> · 后端：<code>{{ item.backendNode }}</code></span>
            <span v-if="item.nodeCount"> · 节点：<code>{{ item.nodeCount }}</code></span>
            <span v-if="item.threads"> · 线程：<code class="aij-mono">{{ item.threads }}</code></span>
          </div>
        </div>

        <figure class="speed-figure">
          <button
            type="button"
            class="speed-img-btn"
            :aria-label="`点击放大查看 ${brand.name} 测速截图`"
            @click="openZoom(item.imagePath, `${brand.name} ${item.testedAt.slice(0, 10)} ${item.toolFamily} 实测截图`)"
          >
            <img
              :src="item.imagePath"
              :alt="`${brand.name} ${item.testedAt.slice(0, 10)} ${item.toolFamily} 实测截图`"
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
              class="speed-img"
            />
            <span class="speed-zoom-hint aij-mono">点击放大查看原图 ↗</span>
          </button>
          <figcaption class="speed-caption">
            <p class="speed-summary">{{ item.observedSummary }}</p>
            <p v-if="item.testMode" class="speed-mode">
              测试模式：<span class="aij-mono">{{ item.testMode }}</span>
            </p>
            <div v-if="item.limitations.length > 0" class="speed-limits">
              <span class="limits-title">样本局限：</span>
              <span
                v-for="lim in item.limitations"
                :key="lim"
                class="limit-chip"
              >
                {{ translateLimitation(lim) }}
              </span>
            </div>
          </figcaption>
        </figure>
      </article>
    </div>

    <div v-else class="obs-card speed-empty">
      <div class="speed-empty-head">
        <span class="obs-pill obs-pill--untested">Not Tested</span>
        <strong>暂无可核实实测截图</strong>
      </div>
      <p>
        当前知识库尚未归档 {{ brand.name }} 的实测测速截图（如 MAI-TEST-BOT 或 MiaoKo 单日快照）。本站在未取得可复核图片证据前，不对该品牌的实际带宽与晚高峰丢包作数值推断。
      </p>
    </div>

    <!-- 2. Vendor Benchmark Historical Reference -->
    <div v-if="hasVendorBenchmark && brand.vendorBenchmark" class="obs-card vendor-bench">
      <div class="vendor-bench-head">
        <div>
          <span class="obs-pill obs-pill--historical">历史参考 / 非晚高峰</span>
          <strong class="vendor-bench-title">
            品牌资料附带参考测速（{{ brand.vendorBenchmark.snapshotDate }}）
          </strong>
        </div>
        <span class="vendor-bench-cond">{{ brand.vendorBenchmark.condition }}</span>
      </div>

      <div class="vendor-table-wrap">
        <table class="vendor-table">
          <thead>
            <tr>
              <th>测试区域</th>
              <th>参考延迟 (ms)</th>
              <th>参考下行 (Mbps)</th>
              <th>补充说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in brand.vendorBenchmark.rows" :key="row.region">
              <td>{{ row.region }}</td>
              <td class="aij-mono">
                {{ row.latencyMs !== null ? `${row.latencyMs} ms` : '未记录' }}
              </td>
              <td class="aij-mono">
                {{ row.downloadMbps !== null ? `${row.downloadMbps} Mbps` : '未记录' }}
              </td>
              <td>{{ row.note || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="vendor-source-note">{{ brand.vendorBenchmark.sourceNote }}</p>
    </div>

    <footer class="obs-footer">
      <strong>数据边界说明：</strong>
      以上测速截图均属于特定日期、特定后端与特定测试线程下的单日观测快照，不同品牌测速时间与测试环境并不一致，不能直接作为跨品牌横向排名依据，亦不能保证长期晚高峰稳定表现。
    </footer>

    <div
      v-if="zoomedImage"
      class="speed-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="实测截图大图预览"
      @click.self="closeZoom"
    >
      <div class="speed-lightbox-inner">
        <button
          type="button"
          class="speed-lightbox-close aij-mono"
          aria-label="关闭大图"
          @click="closeZoom"
        >
          关闭 [ESC] ✕
        </button>
        <img :src="zoomedImage.src" :alt="zoomedImage.alt" class="speed-lightbox-img" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.obs-header-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.speed-evidence-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.speed-record-meta {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 0.85rem;
}

.speed-record-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.speed-time {
  font-size: 0.8rem;
  color: var(--obs-text-muted);
}

.speed-tool-line {
  font-size: 0.82rem;
  color: var(--obs-text-muted);
  line-height: 1.5;
}

.speed-tool-line strong {
  color: #ffffff;
}

.speed-tool-line code {
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  border-color: var(--obs-border);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.speed-figure {
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

@media (max-width: 820px) {
  .speed-figure {
    grid-template-columns: 1fr;
  }
}

.speed-img-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
  text-align: left;
}

.speed-zoom-hint {
  display: inline-block;
  margin-top: 0.4rem;
  font-size: 0.74rem;
  color: var(--obs-accent);
}

.speed-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--obs-border);
  background: #060b16;
  display: block;
}

.speed-lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(6, 11, 22, 0.88);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.speed-lightbox-inner {
  position: relative;
  max-width: min(94vw, 1200px);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.speed-lightbox-close {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--obs-border);
  background: var(--obs-card);
  color: #ffffff;
  font-size: 0.78rem;
  cursor: pointer;
}

.speed-lightbox-img {
  max-width: 100%;
  max-height: calc(92vh - 3rem);
  border-radius: 8px;
  border: 1px solid var(--obs-border);
  object-fit: contain;
}

.speed-caption {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.speed-summary {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--obs-text);
}

.speed-mode {
  margin: 0;
  font-size: 0.79rem;
  color: var(--obs-text-muted);
}

.speed-limits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
  align-items: center;
}

.limits-title {
  font-size: 0.78rem;
  color: var(--obs-text-muted);
}

.limit-chip {
  font-family: var(--aij-mono);
  font-size: 0.72rem;
  padding: 0.14rem 0.48rem;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid var(--obs-border);
  color: #cbd5e1;
}

.speed-empty {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.speed-empty-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.speed-empty p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--obs-text-muted);
  line-height: 1.65;
}

.vendor-bench {
  margin-top: 1rem;
}

.vendor-bench-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.vendor-bench-head > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.vendor-bench-title {
  font-size: 0.92rem;
  color: #ffffff;
}

.vendor-bench-cond {
  font-size: 0.8rem;
  color: var(--status-partial-text);
  font-family: var(--aij-mono);
}

.vendor-table-wrap {
  overflow-x: auto;
}

.vendor-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin: 0;
}

.vendor-table th,
.vendor-table td {
  text-align: left;
  padding: 0.55rem 0.7rem;
  border-bottom: 1px solid var(--obs-border);
  color: var(--obs-text);
  background: transparent;
}

.vendor-table th {
  color: var(--obs-text-muted);
  font-weight: 600;
  font-size: 0.78rem;
}

.vendor-source-note {
  margin: 0.65rem 0 0;
  font-size: 0.78rem;
  color: var(--obs-text-muted);
}
</style>
