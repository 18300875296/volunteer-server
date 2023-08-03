<template>
  <template v-for="article in hottestList" :key="article.article_id">
    <div class="discuss-item-container">
      <router-link :to="`/discuss/${article.article_id}`" class="item-title">{{ article.title }}</router-link>
      <router-link :to="`/discuss/${article.article_id}`">
        <p class="item-content">{{ article.summary }}</p>
      </router-link>
    </div>
    <div class="gap-line"></div>
  </template>
  <button class="more-loading-btn" @click="handleClick">加载更多</button>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Article } from '../../assets/interface';
import { getHottestAPI } from '../../api/discuss';

const hottestList = ref<Article[]>([]);
const page = ref(0);
const pageSize = ref(10);
const total = ref(0);

const useArticle = () => {
  // 获取最热文章
  const getHotArticle = async () => {
    page.value += 1;
    try {
      const { data } = await getHottestAPI(page.value, pageSize.value);
      hottestList.value = data.articles;
      total.value = data.last_page; // 记录最后的页数
      if (total.value === 0) {
        console.log('暂无数据');
      }
      if (total.value === 1) {
        console.log('暂时没有了');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 获取全部文章
  const getMoreArticle = async () => {
    page.value += 1;
    if (total.value >= page.value) {
      const { data } = await getHottestAPI(page.value, pageSize.value);
      data.articles.forEach((article: any) => hottestList.value.push(article));
    }
  };
  return {
    getHotArticle,
    getMoreArticle,
  };
};

const { getHotArticle, getMoreArticle } = useArticle();
const handleClick = async () => {
  await getMoreArticle();
};
onBeforeMount(async () => {
  await getHotArticle();
});
</script>

<style scoped>
#discuss-list-container {
  margin-top: 10px;
  padding: 16px 16px 0px 16px;
  width: 100%;
  /* min-height: 600px; */
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
}

.discuss-item-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 0;
}

.gap-line {
  width: 734px;
  margin-left: -16px;
  border-top: 1px solid rgba(240, 240, 240, 1);
}

.item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  transition: all 0.3s;
}

.item-title:hover {
  color: rgba(65, 145, 255, 1);
}

.item-content {
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  margin: 16px 0 18px;
  text-align: justify;
  color: rgba(38, 38, 38, 0.75);
  cursor: pointer;
}

.more-loading-btn {
  margin: 0 auto;
}
</style>
