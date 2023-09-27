<template>
  <aside class="aside">
    <!-- <cookie-card class="aside_item-article-hot">
      <template #title>
        <div class="article-hot-title">热读榜</div>
      </template>
      <template v-for="(article, index) of hottestReadList" :key="article.article_id">
        <div class="article-hot-li">
          <div class="li_item-index">{{ index + 1 }}</div>
          <div class="li_item-content">
            <router-link
              :to="{ name: 'article_detail', params: { article_id: article.article_id } }"
              class="li__item-paragraph"
            >
              <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
              <span class="">{{ article.title }}</span>
              <img src="../../assets/new.77389df8.png" />
            </router-link>
            <div class="li__item-summary">{{ article.summary }}</div>
          </div>
        </div>
      </template>
    </cookie-card> -->
  </aside>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import CookieCard from '@/components/cookie-card/CookieCard.vue';
import useArticleStore from '@/store/article';

const hottestReadList = computed(() => useArticleStore().hottestReadList); // 右侧热读数据
</script>
<style scoped>
.aside {
  width: 256px;
  /* min-height: 400px; */
  margin-left: 10px;
  user-select: none;
}
.aside_item-article-hot :deep(.paragraph) {
  margin: 10px 0 0 0;
}
.aside_item-article-hot :deep(.card_item-footer) {
  display: none;
}
.article-hot-title {
  font-size: 14px;
  color: rgba(38, 38, 38, 0.75);
  line-height: 20px;
}
.article-hot-li {
  margin-bottom: 4px;
  display: flex;
  padding: 6px 0px;
  transition: all 0.3s ease 0s;
  /* align-items: center; */
}
.article-hot-li:hover {
  background-color: rgba(247, 247, 248, 1);
}
.li_item-index {
  color: rgba(255, 161, 22, 1);
  color: rgba(60, 60, 67, 0.3);
  font-size: 14px;
  line-height: 20px;
  min-width: 10px;
  font-weight: 700;
  margin-right: 8px;
  font-style: italic;
}
.li_item-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  overflow: hidden;
}
.li__item-summary {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  color: rgba(60, 60, 67, 0.3);
  margin-top: 2px;
  text-indent: 4px;
}
.li__item-paragraph {
  line-height: 22px;
  height: 22px;
  display: flex;
  align-items: center;
}
.li__item-paragraph > :first-child {
  width: 22px;
  height: 22px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
.li__item-paragraph span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.li__item-paragraph > :last-child {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
}
#main-discuss {
  max-width: 1000px;
  margin: 12px auto 0;
  min-height: 500px;
}

#main-container {
  flex: 1;
  /* height: 300px; */
}

.gap-container {
}

.one {
  width: 362px;
  height: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  /* padding: 16px; */
}

.two {
  width: 362px;
  height: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  /* padding: 16px; */
}
.one img,
.two img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
#aside-right {
  width: 256px;
  height: 800px;
  margin-left: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#discuss-container {
  margin-top: 10px;
  width: 100%;
  /* height: 800px; */
}

.search-container {
  width: 250px;
  height: 100%;
  margin-left: 175px;
}

input:hover {
  border-color: rgba(45, 145, 255, 1);
}

.search-inp {
  border-radius: 5px;
  width: 100%;
  background: transparent;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(233, 233, 233, 1);
  transition: border-color 0.3s ease 0s;
  padding: 6px 34px 6px 8px;
  color: rgba(38, 38, 38, 1);
}
</style>
