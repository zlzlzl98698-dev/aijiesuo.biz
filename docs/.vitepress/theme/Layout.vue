<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import DocHeaderMeta from './components/DocHeaderMeta.vue'
import DocFooterRelated from './components/DocFooterRelated.vue'
import NotFoundPage from './components/NotFoundPage.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <DocHeaderMeta />
    </template>
    <template #doc-after>
      <DocFooterRelated />
    </template>
    <template #not-found>
      <NotFoundPage />
    </template>
  </Layout>
</template>
