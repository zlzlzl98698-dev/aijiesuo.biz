<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { getBreadcrumbsForPath } from '../../../../data/navigation'
import { formatDateYmd, resolveEntityDisplay } from '../utils/brandHelpers'

const { frontmatter, page } = useData()
const route = useRoute()

const shouldShow = computed(() => {
  if (page.value.isNotFound) return false
  if (frontmatter.value.layout === 'page' || frontmatter.value.layout === 'home') {
    return false
  }
  return route.path !== '/'
})

const breadcrumbs = computed(() => {
  const title =
    typeof frontmatter.value.title === 'string'
      ? frontmatter.value.title
      : page.value.title
  return getBreadcrumbsForPath(route.path, title)
})

const updatedText = computed(() => {
  const fromFm = formatDateYmd(frontmatter.value.updated)
  if (fromFm) return fromFm
  if (page.value.lastUpdated) {
    return formatDateYmd(new Date(page.value.lastUpdated))
  }
  return ''
})

const entityBadge = computed(() =>
  resolveEntityDisplay(
    frontmatter.value.entity,
    frontmatter.value.intent,
    frontmatter.value.category
  )
)

const scopeText = computed(() => {
  return (
    frontmatter.value.applicableVersion ||
    frontmatter.value.scope ||
    frontmatter.value.platform ||
    ''
  )
})
</script>

<template>
  <div v-if="shouldShow" class="aij-doc-header">
    <nav class="aij-breadcrumbs" aria-label="面包屑导航">
      <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.link">
        <span v-if="idx > 0" aria-hidden="true">/</span>
        <a v-if="idx < breadcrumbs.length - 1" :href="crumb.link">
          {{ crumb.text }}
        </a>
        <span v-else aria-current="page">{{ crumb.text }}</span>
      </template>
    </nav>

    <div class="aij-doc-meta-row">
      <span v-if="updatedText" class="aij-badge aij-badge--muted aij-mono">
        更新：{{ updatedText }}
      </span>
      <span v-if="entityBadge" class="aij-badge aij-badge--navy">
        {{ entityBadge }}
      </span>
      <span v-if="scopeText" class="aij-badge aij-badge--cyan">
        适用范围：{{ scopeText }}
      </span>
    </div>
  </div>
</template>
