<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import clientsData from '../../../../data/clients.json'
import type { ClientAppRecord, ClientPlatform, ClientsDatabase } from '../../../../data/types'
import {
  PLATFORM_LABELS,
  resolveClientDocPath,
} from '../utils/brandHelpers'

const props = defineProps<{
  platform?: ClientPlatform | 'all'
}>()

const db = clientsData as ClientsDatabase
const platformKeys: ClientPlatform[] = ['windows', 'android', 'ios', 'macos', 'linux', 'openwrt']

const selectedPlatform = ref<ClientPlatform | 'all'>(props.platform ?? 'all')
const selectedKernel = ref<string>('all')

watch(
  () => props.platform,
  (val) => {
    selectedPlatform.value = val ?? 'all'
  }
)

const isPlatformLocked = computed(
  () => Boolean(props.platform && props.platform !== 'all')
)

const allRecords = computed<ClientAppRecord[]>(() =>
  platformKeys.flatMap((key) => db.platforms[key] || [])
)

const availableKernels = computed<string[]>(() => {
  const source =
    selectedPlatform.value === 'all'
      ? allRecords.value
      : db.platforms[selectedPlatform.value] || []
  const set = new Set<string>()
  for (const app of source) {
    for (const k of app.kernels) set.add(k)
  }
  return Array.from(set)
})

const filteredApps = computed<ClientAppRecord[]>(() => {
  const base =
    selectedPlatform.value === 'all'
      ? allRecords.value
      : db.platforms[selectedPlatform.value] || []

  if (selectedKernel.value === 'all') return base
  return base.filter((app) => app.kernels.includes(selectedKernel.value))
})

const activePlatformNote = computed<string | null>(() => {
  if (selectedPlatform.value === 'all') return db.clientCategoriesNote
  return db.platformNotes[selectedPlatform.value] || null
})

function pricingLabel(pricingType: ClientAppRecord['pricingType']): string {
  if (pricingType === 'free_open_source') return '开源免费'
  if (pricingType === 'paid_or_iap') return '付费 / 含内购'
  return '待核实'
}
</script>

<template>
  <section class="client-matrix" aria-label="代理客户端支持矩阵">
    <div class="cm-toolbar">
      <div v-if="!isPlatformLocked" class="cm-filter-group" role="group" aria-label="操作系统筛选">
        <button
          type="button"
          class="aij-filter-chip"
          :class="{ 'is-active': selectedPlatform === 'all' }"
          @click="selectedPlatform = 'all'; selectedKernel = 'all'"
        >
          全部平台 ({{ allRecords.length }})
        </button>
        <button
          v-for="key in platformKeys"
          :key="key"
          type="button"
          class="aij-filter-chip"
          :class="{ 'is-active': selectedPlatform === key }"
          @click="selectedPlatform = key; selectedKernel = 'all'"
        >
          {{ PLATFORM_LABELS[key] }} ({{ (db.platforms[key] || []).length }})
        </button>
      </div>

      <div class="cm-filter-group" role="group" aria-label="核心引擎筛选">
        <button
          type="button"
          class="aij-filter-chip"
          :class="{ 'is-active': selectedKernel === 'all' }"
          @click="selectedKernel = 'all'"
        >
          全部内核
        </button>
        <button
          v-for="kernel in availableKernels"
          :key="kernel"
          type="button"
          class="aij-filter-chip aij-mono"
          :class="{ 'is-active': selectedKernel === kernel }"
          @click="selectedKernel = kernel"
        >
          {{ kernel }}
        </button>
      </div>
    </div>

    <div v-if="activePlatformNote" class="cm-platform-note">
      <strong>平台选型提示：</strong>{{ activePlatformNote }}
    </div>

    <div class="aij-grid-3 cm-grid">
      <article
        v-for="app in filteredApps"
        :key="`${app.platform}-${app.slug}`"
        class="aij-card cm-card"
      >
        <div class="cm-card-head">
          <div>
            <h4 class="cm-app-name">{{ app.displayName }}</h4>
            <span class="cm-platform-tag">{{ PLATFORM_LABELS[app.platform] }}</span>
          </div>
          <span
            class="aij-badge"
            :class="app.pricingType === 'paid_or_iap' ? 'aij-badge--warn' : 'aij-badge--ok'"
          >
            {{ pricingLabel(app.pricingType) }}
          </span>
        </div>

        <div class="cm-kernels">
          <span
            v-for="k in app.kernels"
            :key="k"
            class="aij-badge aij-badge--navy aij-mono"
          >
            {{ k }}
          </span>
          <span class="aij-badge aij-badge--muted">
            {{ app.projectPlatform }}
          </span>
        </div>

        <ul class="cm-features">
          <li v-for="feat in app.features" :key="feat">{{ feat }}</li>
        </ul>

        <div v-if="app.maintenanceWarning" class="cm-warning" role="alert">
          <strong>维护/安全提醒：</strong>{{ app.maintenanceWarning }}
        </div>

        <p v-if="app.platformNotes" class="cm-note">
          {{ app.platformNotes }}
        </p>

        <div class="cm-card-foot">
          <a :href="resolveClientDocPath(app)" class="cm-doc-link">
            查看配置与核验指南 →
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.client-matrix {
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cm-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.cm-filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.cm-platform-note {
  padding: 0.85rem 1rem;
  background: var(--light-info-bg);
  border: 1px solid var(--light-info-border);
  border-radius: 10px;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--aij-navy);
}

.cm-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.cm-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.cm-app-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--aij-navy);
}

.cm-platform-tag {
  font-size: 0.78rem;
  color: var(--aij-text-subtle);
}

.cm-kernels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.cm-features {
  margin: 0;
  padding-left: 1.15rem;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--aij-text-muted);
}

.cm-warning {
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  background: var(--light-danger-bg);
  border: 1px solid var(--light-danger-border);
  color: var(--light-danger-text);
  font-size: 0.8rem;
  line-height: 1.5;
}

.cm-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--aij-text-subtle);
  line-height: 1.5;
}

.cm-card-foot {
  margin-top: auto;
  padding-top: 0.55rem;
  border-top: 1px solid var(--aij-border);
}

.cm-doc-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--aij-cyan);
  text-decoration: none;
}

.cm-doc-link:hover {
  color: var(--aij-navy);
  text-decoration: underline;
}
</style>
