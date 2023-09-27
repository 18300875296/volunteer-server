<template>
  <div class="article_container">
    <main class="article_content">
      <ArticleHeader />
      <ArticleTab />
      <router-view />
    </main>
    <Aside />
  </div>
  <Teleport v-if="openEditor" to="#main">
    <tip-tap
      class="RichText_container"
      @on-close="useArticleStore().openArticleEditor = false"
      @on-submit="handleSubmit"
    />
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, watch, Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TipTap from '@/components/TipTap/TipTap.vue';
import Aside from '@/components/common/Aside.vue';
import ArticleHeader from '@/components/article/ArticleHeader.vue';
import useArticleStore from '@/store/article';
import ArticleTab from '@/components/article/ArticleTab.vue';

const route = useRoute();

watch(
  () => route.path as string,
  (path) => {
    const _path = path.split('/');
    _path.shift();
    const articleStore = useArticleStore();
    const menuName = _path[1] ? _path[1] : articleStore.articleMenus[0].name;
    const tabName = _path[2] ? _path[2] : '';
    articleStore.setCurrentMenu(menuName);
    articleStore.setCurrentTabs(menuName);
    articleStore.setCurrentTabName(tabName);
  },
  { immediate: true },
);
const openEditor = computed(() => useArticleStore().openArticleEditor);
// 创建文章
const handleSubmit = async () => {
  const router = useRouter();
  const article = await articleStore.createArticle();
  router.replace({ name: 'article_detail', params: { article_id: article.article_id } });
};
</script>

<style scoped>
.article_container {
  max-width: 1000px;
  display: flex;
  justify-content: center;
  margin: 15px auto 0;
}
.article_content {
  flex: 1;
  overflow: hidden;
}
.RichText_container {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8), 0px 2px 8px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 1);
  height: 100vh;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
