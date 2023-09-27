<template>
  <div class="article_item_container">
    <div class="article-divider"></div>
    <div class="article">
      <router-link v-if="data.images !== '[]'" class="article_item-cover" :to="`/article/${data.article_id}`">
        <img :src="data.images" />
      </router-link>
      <div class="article_item-content">
        <div class="article__item-title">
          <div class="title_item-content">
            <img
              src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp"
              class="title__item-icon"
            />
            <span class="title__item-span">发布了</span>
            <router-link :to="`/article/${data.article_id}`" class="title__item-text">{{ data.title }}</router-link>
          </div>
          <div class="title_item-time">{{ $formatRelativeTime(data.create_at) }}</div>
        </div>
        <router-link :to="`/article/${data.article_id}`">
          <p class="article__item-content">{{ data.summary }}</p>
        </router-link>
        <div class="article__item-tags">
          <div class="tag_item">
            <svg t="1682830913221" viewBox="0 0 1024 1024" width="14" height="14">
              <path
                d="M822.72 415.424c0-175.296-164.032-317.952-365.44-317.952-201.536 0-365.44 142.656-365.44 317.952 0 105.152 59.008 202.368 158.336 261.824v102.528c0 6.272 3.456 12.032 8.96 14.912a16.448 16.448 0 0 0 17.344-0.832l46.656-30.72c0.768-0.512 1.408-1.088 2.176-1.728l53.504-35.712c26.624 5.056 52.928 7.68 78.464 7.68 201.472 0 365.44-142.656 365.44-317.952z m-365.504 284.032c-25.472 0-51.904-2.816-78.528-8.256a16.96 16.96 0 0 0-12.864 2.432l-61.632 41.216c-0.768 0.384-1.472 0.96-2.112 1.472l-18.048 12.032v-80.896a16.96 16.96 0 0 0-8.576-14.656c-93.76-52.928-149.76-141.632-149.76-237.376 0-156.672 148.672-284.032 331.584-284.032 182.784 0 331.648 127.424 331.648 284.032 0 156.672-148.864 284.032-331.712 284.032z m409.6-174.144a181.12 181.12 0 0 1 36.48 107.904c0 68.288-40.064 131.84-107.264 169.664a16.96 16.96 0 0 0-8.64 14.72v50.624l-5.824-3.776a9.088 9.088 0 0 0-1.792-1.408l-45.12-30.208c-3.776-2.432-8.448-3.456-12.8-2.432-79.296 16.448-156.096-1.536-213.312-44.48l-20.352 27.136c63.232 47.36 147.392 68.032 233.536 51.904l37.248 24.96c0.704 0.576 1.28 1.024 1.984 1.344l34.048 22.592a17.472 17.472 0 0 0 17.344 0.832 17.024 17.024 0 0 0 9.024-14.976V827.52c72.64-44.48 115.776-116.352 115.776-194.24 0-45.504-14.848-89.792-43.136-128l-27.2 20.032z"
                fill="currentColor"
              ></path>
            </svg>
            文章
          </div>
          <template v-for="(tag, index) in JSON.parse(data.tags)" :key="index">
            <div class="tag_item">{{ tag }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticleData } from '@/types/article';
import { ListProps } from '@/types/common';

const props = withDefaults(defineProps<{ data: ArticleData }>(), {
  data: {},
});
</script>
<style scoped>
.article_item_container {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 0;
}
.article {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.article_item-cover {
  width: 200px;
  height: 120px;
  margin-right: 16px;
}
.article_item-cover img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 13px;
}
.article_item-content {
  display: flex;
  flex-flow: nowrap;
  padding: 16px 0;
  flex-direction: column;
  overflow: hidden;
}
.article-divider {
  border-top: solid 1px rgba(0, 10, 32, 0.08);
  width: 734px;
  margin-left: -16px;
}
.article__item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}
.title_item-content {
  height: 22px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.title__item-icon {
  height: 22px;
  width: 22px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
}
.title__item-span {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 0.75);
  margin-right: 5px;
}
.title__item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  transition: all 0.3s;
  display: block;
}
.title_item-time {
  font-size: 12px;
  line-height: 18px;
  color: rgba(223, 223, 223, 1);
  flex: 0 0 auto;
  margin-left: 25px;
}
.article__item-content {
  margin: 16px 0 18px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-align: left;
  color: rgba(60, 60, 67, 0.6);
  cursor: pointer;
}
.article__item-tags {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
}
.tag_item {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 161, 22, 1);
  background: rgba(255, 161, 22, 0.15);
  height: 24px;
  line-height: 20px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 10px;
  white-space: nowrap;
  max-width: 120px;
  display: flex;
  align-items: center;
}
.tag_item > svg {
  margin-right: 5px;
}
</style>
