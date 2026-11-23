<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { AFFILIATE_DISCLOSURE } from '../../../../data/links'
import { formatSourceLabel, resolveRouteTitle } from '../utils/brandHelpers'

const { frontmatter, page } = useData()
const route = useRoute()

interface RelatedItem {
  text: string
  link: string
}

const shouldShow = computed(() => {
  if (page.value.isNotFound) return false
  if (frontmatter.value.layout === 'page' || frontmatter.value.layout === 'home') {
    return false
  }
  return route.path !== '/'
})

const relatedItems = computed<RelatedItem[]>(() => {
  const raw = frontmatter.value.related
  if (!Array.isArray(raw)) return []
  return raw
    .map((entry): RelatedItem | null => {
      if (typeof entry === 'string') {
        const clean = entry.trim()
        if (!clean) return null
        return { text: resolveRouteTitle(clean), link: clean }
      }
      if (entry && typeof entry === 'object' && typeof entry.link === 'string') {
        return {
          text: typeof entry.text === 'string' && entry.text ? entry.text : entry.link,
          link: entry.link,
        }
      }
      return null
    })
    .filter((item): item is RelatedItem => item !== null)
})

const sourceItems = computed<string[]>(() => {
  const raw = frontmatter.value.sources
  if (!Array.isArray(raw)) return []
  const mapped = raw.map((s) => formatSourceLabel(String(s).trim())).filter(Boolean)
  return Array.from(new Set(mapped))
})
</script>

<template>
  <aside v-if="shouldShow" class="aij-doc-footer-extra" aria-label="延伸阅读与透明披露">
    <div v-if="relatedItems.length > 0" class="aij-doc-footer-box">
      <h4 class="aij-doc-footer-title">相关技术文档与关联页面</h4>
      <div class="aij-related-grid">
        <a
          v-for="item in relatedItems"
          :key="item.link"
          :href="item.link"
          class="aij-related-link"
        >
          <div class="related-link-copy">
            <span>{{ item.text }}</span>
            <span v-if="item.text !== item.link" class="related-link-path aij-mono">{{ item.link }}</span>
          </div>
          <span class="aij-mono" aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <div v-if="sourceItems.length > 0" class="aij-doc-footer-box">
      <h4 class="aij-doc-footer-title">参考资料与核验依据</h4>
      <ul class="sources-list">
        <li v-for="src in sourceItems" :key="src" class="aij-mono">{{ src }}</li>
      </ul>
    </div>

    <div class="transparency-bar">
      <strong>商业透明度说明：</strong>
      {{ AFFILIATE_DISCLOSURE }}。本站研究评分（0–100）仅依据资料完整度、协议线路清晰度、实测截图可用性与风险透明度独立计算，与商业推荐顺位完全分离。
      <a href="/about/" class="about-link">查看独立评测方法论、实验室标准与免责声明 →</a>
    </div>
  </aside>
</template>

<style scoped>
.related-link-copy {
  display: flex;
  flex-direction: column;
  gap: 0.14rem;
  min-width: 0;
}

.related-link-path {
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--aij-text-subtle);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sources-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--aij-text-muted);
}

.transparency-bar {
  padding: 0.9rem 1.1rem;
  border-radius: 10px;
  background: var(--aij-surface-alt);
  border: 1px solid var(--aij-border);
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--aij-text-muted);
}

.transparency-bar strong {
  color: var(--aij-navy);
}

.about-link {
  display: inline-block;
  margin-left: 0.35rem;
  color: var(--aij-cyan);
  font-weight: 600;
  text-decoration: none;
}

.about-link:hover {
  text-decoration: underline;
}
</style>
