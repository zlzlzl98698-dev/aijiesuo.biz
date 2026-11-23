<script setup lang="ts">
import { PILLAR_TAXONOMY } from '../../../../data/navigation'

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
  <section class="nf-wrap">
    <div class="nf-hero">
      <span class="aij-badge aij-badge--warn aij-mono">HTTP 404 · PAGE NOT FOUND</span>
      <h1 class="nf-title">未能找到该知识库页面</h1>
      <p class="nf-desc">
        您访问的路径可能已调整或尚未收录。可通过全站检索直接查找报错代码、客户端名称或机场品牌档案，或从下方 10 大核心专题入口继续浏览。
      </p>
      <div class="nf-actions">
        <button type="button" class="aij-btn aij-btn--primary" @click="triggerSiteSearch">
          打开站内搜索
        </button>
        <a href="/" class="aij-btn aij-btn--outline">返回首页</a>
        <a href="/troubleshooting/" class="aij-btn aij-btn--outline">故障排查中心</a>
      </div>
    </div>

    <div class="nf-pillars">
      <h2 class="nf-subhead">10 大核心栏目导航</h2>
      <div class="aij-grid-3">
        <a
          v-for="pillar in PILLAR_TAXONOMY"
          :key="pillar.id"
          :href="pillar.basePath"
          class="aij-card nf-pillar-card"
        >
          <strong class="nf-pillar-title">{{ pillar.text }}</strong>
          <p class="nf-pillar-desc">{{ pillar.description }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nf-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

.nf-hero {
  background: var(--aij-surface);
  border: 1px solid var(--aij-border);
  border-radius: 16px;
  padding: 2rem 1.75rem;
  margin-bottom: 2rem;
}

.nf-title {
  margin: 0.75rem 0 0.6rem;
  font-size: 1.9rem;
  color: var(--aij-navy);
}

.nf-desc {
  margin: 0 0 1.25rem;
  max-width: 680px;
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--aij-text-muted);
}

.nf-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.nf-subhead {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--aij-navy);
}

.nf-pillar-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.nf-pillar-title {
  font-size: 1rem;
  color: var(--aij-navy);
}

.nf-pillar-desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--aij-text-muted);
}
</style>
