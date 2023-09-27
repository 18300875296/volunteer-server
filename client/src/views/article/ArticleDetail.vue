<template>
  <div class="main_article_container">
    <div class="article_container">
      <main class="article_detail_container">
        <CookieCrumb />
        <ArticleContent :data="articleDetail" />
      </main>
    </div>
    <aside id="aside-container">
      <div class="other-info-container">
        <div class="other-item">
          <span>浏览人数</span>
          <span>{{ articleDetail?.readCount }}</span>
        </div>
        <div class="other-item">
          <span>收藏人数</span>
          <span>{{ articleDetail?.collectCount }}</span>
        </div>
        <div class="other-item">
          <span>点赞人数</span>
          <span>{{ articleDetail?.likeCount }}</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import useArticleStore from '../../store/article';
import ArticleContent from '@/components/article/ArticleContent.vue';
import { CookieCrumb } from '@/components/cookie-crumb/CookieCrumb.tsx';

const props = defineProps({
  article_id: { type: String as PropType<string>, required: true },
});
const articleStore = useArticleStore();
const articleDetail = await articleStore.getArticleContent(props.article_id);

// const handleLike = async () => {
//   await articleStore.putLike();
// };
// const handleCancelLike = async () => {
//   await articleStore.deleteLike();
// };
// const handleCollect = async () => {
//   await articleStore.putCollect();
// };
// const handleCancelCollect = async () => {
//   await articleStore.deleteCollect();
// };
</script>

<style scoped>
.main_article_container {
  max-width: 1000px;
  min-height: 500px;
  display: flex;
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}

.article_container {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
.article_container > p {
  margin: 8px 0;
  text-align: justify;
}
.article_detail_container {
  flex: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px 12px 0 12px;
  position: relative;
  margin-bottom: 10px;
}

.article-cover {
  width: 400px;
  height: 230px;
}

#aside-container {
  margin-left: 10px;
  width: 256px;
  height: 800px;
}

.other-info-container {
  padding: 20px 15px;
  font-size: 14px;
  border-radius: 8px;
  width: 100%;
  height: 235px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.other-item {
  display: flex;
  justify-content: space-between;
  line-height: 22px;
}

.other-info-container > :not(:last-child) {
  margin-bottom: 15px;
}

.other-item > span:first-child {
  color: rgba(191, 191, 191, 1);
}

.other-item > span:last-child {
  font-family: FetteMittelschrift;
  background: rgba(247, 247, 247, 1);
  color: rgba(38, 38, 38, 1);
  border-radius: 3px;
  padding: 0px 8px;
}
</style>
