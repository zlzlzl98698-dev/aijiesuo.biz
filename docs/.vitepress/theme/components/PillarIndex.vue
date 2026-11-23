<script setup lang="ts">
import { computed } from 'vue'
import { getPillarById, type PillarId } from '../../../../data/navigation'

const props = defineProps<{
  pillar: PillarId
}>()

const pillarDef = computed(() => getPillarById(props.pillar))
</script>

<template>
  <section class="pillar-index" :aria-label="pillarDef.overviewTitle">
    <div v-for="group in pillarDef.groups" :key="group.text" class="pillar-group">
      <h2 class="pillar-group-title">{{ group.text }}</h2>
      <div class="aij-grid-3">
        <a
          v-for="item in group.items"
          :key="item.link"
          :href="item.link"
          class="aij-card pillar-item-card"
        >
          <div class="pillar-item-top">
            <strong class="pillar-item-title">{{ item.text }}</strong>
            <span v-if="item.badge" class="aij-badge aij-badge--cyan">
              {{ item.badge }}
            </span>
          </div>
          <p v-if="item.description" class="pillar-item-desc">
            {{ item.description }}
          </p>
          <span class="pillar-item-arrow aij-mono">阅读详情 →</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillar-index {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pillar-group-title {
  margin-top: 0;
  margin-bottom: 0.9rem;
  font-size: 1.15rem;
  color: var(--aij-navy);
}

.pillar-item-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
}

.pillar-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.pillar-item-title {
  font-size: 0.98rem;
  color: var(--aij-navy);
}

.pillar-item-desc {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--aij-text-muted);
}

.pillar-item-arrow {
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--aij-cyan);
}
</style>
