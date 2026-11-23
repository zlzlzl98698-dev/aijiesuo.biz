<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../../../data/links'
import { formatSourceLabel, UNLOCK_STATUS_META } from '../utils/brandHelpers'
import type { UnlockEntry } from '../../../../data/types'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))

function getPillClass(entry: UnlockEntry): string {
  const tone = UNLOCK_STATUS_META[entry.status]?.tone || 'untested'
  if (tone === 'operational') return 'obs-pill--operational'
  if (tone === 'stable') return 'obs-pill--stable'
  if (tone === 'partial' || tone === 'vendor') return 'obs-pill--partial'
  if (tone === 'unavailable') return 'obs-pill--unavailable'
  return 'obs-pill--untested'
}

function getStatusLabel(entry: UnlockEntry): string {
  return UNLOCK_STATUS_META[entry.status]?.pillText || 'Not Tested'
}

function getStatusZh(entry: UnlockEntry): string {
  return UNLOCK_STATUS_META[entry.status]?.label || '待核实'
}
</script>

<template>
  <section
    v-if="brand"
    class="obs-panel"
    :style="{ '--brand-accent': brand.accentColor || '#38bdf8' }"
    aria-label="AI 工具与流媒体解锁矩阵"
  >
    <header class="obs-panel-header">
      <div>
        <h3 class="obs-panel-title">
          {{ brand.name }} · AI 与流媒体服务可用性矩阵
        </h3>
        <p class="obs-panel-subtitle">
          逐项标注信息来源（实测截图 / 厂商自述 / 历史资料），不把厂商宣称当成已验证结果
        </p>
      </div>
      <div class="matrix-legend">
        <span class="obs-pill obs-pill--operational">Verified</span>
        <span class="obs-pill obs-pill--vendor">Vendor Claimed</span>
        <span class="obs-pill obs-pill--partial">Partial</span>
        <span class="obs-pill obs-pill--untested">Not Tested</span>
      </div>
    </header>

    <div class="matrix-sections">
      <!-- AI Tools Section -->
      <div class="obs-card matrix-section">
        <div class="section-head">
          <h4>AI 工具访问可用性</h4>
          <span class="aij-mono section-count">{{ brand.aiSupport.length }} 项记录</span>
        </div>

        <div v-if="brand.aiSupport.length > 0" class="unlock-list">
          <div
            v-for="entry in brand.aiSupport"
            :key="entry.service"
            class="unlock-row"
          >
            <div class="unlock-row-top">
              <div class="unlock-service-wrap">
                <strong class="unlock-service">{{ entry.service }}</strong>
                <span class="unlock-zh">{{ getStatusZh(entry) }}</span>
              </div>
              <span class="obs-pill" :class="getPillClass(entry)">
                {{ getStatusLabel(entry) }}
              </span>
            </div>
            <p v-if="entry.note" class="unlock-note">{{ formatSourceLabel(entry.note) }}</p>
            <div class="unlock-source">
              来源：<span class="aij-mono">{{ formatSourceLabel(entry.source) }}</span>
            </div>
          </div>
        </div>
        <p v-else class="matrix-empty">暂无 AI 工具专项解锁记录。</p>
      </div>

      <!-- Streaming Section -->
      <div class="obs-card matrix-section">
        <div class="section-head">
          <h4>海外流媒体跨区可用性</h4>
          <span class="aij-mono section-count">{{ brand.streamingSupport.length }} 项记录</span>
        </div>

        <div v-if="brand.streamingSupport.length > 0" class="unlock-list">
          <div
            v-for="entry in brand.streamingSupport"
            :key="entry.service"
            class="unlock-row"
          >
            <div class="unlock-row-top">
              <div class="unlock-service-wrap">
                <strong class="unlock-service">{{ entry.service }}</strong>
                <span class="unlock-zh">{{ getStatusZh(entry) }}</span>
              </div>
              <span class="obs-pill" :class="getPillClass(entry)">
                {{ getStatusLabel(entry) }}
              </span>
            </div>
            <p v-if="entry.note" class="unlock-note">{{ formatSourceLabel(entry.note) }}</p>
            <div class="unlock-source">
              来源：<span class="aij-mono">{{ formatSourceLabel(entry.source) }}</span>
            </div>
          </div>
        </div>
        <p v-else class="matrix-empty">暂无海外流媒体解锁记录。</p>
      </div>
    </div>

    <footer class="obs-footer">
      <strong>解锁状态说明：</strong>
      AI 平台与流媒体 IP 风控策略会随时间动态调整。即便是标为 Verified 的节点，也仅代表对应截图测试时间点可用，不构成永久解锁承诺；若需稳定使用 ChatGPT/Claude/Gemini，建议优先核对节点地区与独立出口策略。
    </footer>
  </section>
</template>

<style scoped>
.matrix-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
}

.matrix-sections {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 820px) {
  .matrix-sections {
    grid-template-columns: 1fr;
  }
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.65rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--obs-border);
}

.section-head h4 {
  margin: 0;
  font-size: 0.96rem;
  font-weight: 700;
  color: #ffffff;
}

.section-count {
  font-size: 0.75rem;
  color: var(--obs-text-muted);
}

.unlock-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unlock-row {
  padding: 0.75rem 0.85rem;
  background: rgba(11, 19, 36, 0.55);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
}

.unlock-row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.unlock-service-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.45rem;
}

.unlock-service {
  color: #ffffff;
  font-size: 0.92rem;
}

.unlock-zh {
  font-size: 0.76rem;
  color: var(--obs-text-muted);
}

.unlock-note {
  margin: 0.45rem 0 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: #cbd5e1;
}

.unlock-source {
  margin-top: 0.4rem;
  font-size: 0.74rem;
  color: var(--obs-text-muted);
  word-break: break-word;
}

.matrix-empty {
  margin: 0;
  font-size: 0.85rem;
  color: var(--obs-text-muted);
}
</style>
