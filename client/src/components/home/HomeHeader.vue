<!--
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-12 22:21:45
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:19:01
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\home\HomeHeader.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <section class="main_item-hot">
    <template v-for="article of hotArticles" :key="article.article_id">
      <cookie-card class="hot_item" @click="openArticle(article.article_id)">
        <template #title>
          <!-- <router-link :to="{ name: 'articleDetail' }" class="hot__item-title">{{ article.title }} </router-link> -->
          <span class="hot__item-tag">热议中</span>
        </template>
        {{ article.summary }}
        <template #footer>
          <span class="hot__item-icon">
            <div v-for="(icon, index) of icons" :key="index" class="icon_item">
              <img :src="icon" />
            </div>
          </span>
          <span class="hot__item-text">{{ article.readCount }}用户正在围观</span>
          <span class="hot__item-go">进入讨论</span>
          <!-- <svg
            id="mx_n_1682751513297"
            t="1682751513293"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6036"
            width="12"
            height="12"
          >
            <path
              d="M899.903689 478.177684L498.564974 76.711126c-16.975299-16.903995-44.421496-16.903995-61.397818 0-16.976322 16.974603-16.976322 44.558845 0 61.534472l373.471922 373.455597L437.167157 885.300055c-16.976322 16.975627-16.976322 44.420699 0 61.396325 16.976322 16.974603 44.422519 16.974603 61.397818 0l401.338715-401.326365c9.338052-9.267061 13.085553-21.573341 12.309855-33.668821C912.989242 499.680417 909.241741 487.441675 899.903689 478.177684zM597.730478 511.701195c0.850402-12.021801-2.96771-24.260543-12.164539-33.523511L184.224153 76.711126c-16.975299-16.903995-44.418425-16.903995-61.536993 0-16.975299 16.974603-16.833053 44.558845 0 61.534472l373.614168 373.455597-373.614168 373.59886c-16.833053 16.975627-16.975299 44.420699 0 61.396325 17.118567 16.974603 44.560671 16.974603 61.536993 0l401.341785-401.326365C594.762768 536.103978 598.58088 523.797697 597.730478 511.701195z"
              fill="#0a84ff"
              p-id="6037"
            ></path>
          </svg> -->
        </template>
      </cookie-card>
    </template>
  </section>
</template>
<script setup lang="ts">
import { useHomeHeader } from './main.ts';
import type { ArticleQuery } from '@/types/article';
import CookieCard from '@/components/cookie-card/CookieCard.vue';

const config: ArticleQuery = {
  page: 1,
  pagesize: 2,
  orderKey: 'create_at',
};
const { hotArticles, openArticle, icons } = await useHomeHeader(config);
</script>

<style scoped>
.main_item-hot {
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
  min-height: 150px;
  overflow: hidden;
  gap: 10px;
}
.hot_item {
  width: 362px;
}
.hot__item-title {
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  line-height: 20px;
  letter-spacing: 1.1px;
}
.hot__item-tag {
  flex: 0 0 auto;
  color: rgba(255, 161, 22, 1);
  font-size: 12px;
  line-height: 20px;
  background: rgba(255, 161, 22, 0.15);
  border-radius: 12px;
  padding: 2px 8px;
}
.hot__item-icon {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.hot__item-text {
  font-size: 14px;
  line-height: 18px;
  color: rgba(140, 140, 140, 1);
  text-indent: 6px;
}
.hot__item-go {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: absolute;
  gap: 2px;
  right: 0;
  color: var(--blue-color);
  font-size: 14px;
}
</style>
