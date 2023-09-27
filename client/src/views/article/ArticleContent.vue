<template>
  <section class="article_list_container">
    <template v-for="articleData of currentData" :key="articleData.article_id">
      <ArticleRow :article="articleData" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import useArticleStore from '@/store/article';
import { ArticleRow } from '@/components/common/articleRow/ArticleRow.tsx';

const props = defineProps({
  menu: {
    type: String,
    required: false,
    default: '',
  },
  tab: {
    type: String,
    required: false,
    default: '',
  },
});
const menu = computed(() => {
  if (props.menu) return props.menu;
  return useArticleStore().currentMenuName;
});
const tab = computed(() => {
  if (props.tab) return props.tab;
  return useArticleStore().currentMenuTabName;
});
const currentData = computed(() => useArticleStore().currentData); // 不同栏目的数据
</script>
<style scoped>
.article_list_container {
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-flow: column;
}
</style>
