<!--
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-14 09:14:43
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:21:35
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\home\HomeBodyMain.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <template v-for="article in newestArticles" :key="article.article_id">
    <div class="article-divider"></div>
    <div class="article">
      <router-link v-if="article.images !== '[]'" class="article_item-cover" :to="`/discuss/${article.article_id}`">
        <img :src="article.images" />
      </router-link>
      <div class="article_item-content">
        <div class="article__item-title">
          <div class="title_item-content">
            <img
              src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp"
              class="title__item-icon"
            />
            <span class="title__item-span">发布了</span>
            <router-link :to="`/discuss/${article.article_id}`" class="title__item-text">{{
              article.title
            }}</router-link>
          </div>
          <div class="title_item-time">{{ $formatRelativeTime(article.create_at) }}</div>
        </div>
        <router-link :to="`/discuss/${article.article_id}`">
          <p class="article__item-content">{{ article.summary }}</p>
        </router-link>
        <div class="article__item-tags">
          <div class="tag_item">
            <svg
              t="1682830913221"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3700"
              width="14"
              height="14"
            >
              <path
                d="M822.72 415.424c0-175.296-164.032-317.952-365.44-317.952-201.536 0-365.44 142.656-365.44 317.952 0 105.152 59.008 202.368 158.336 261.824v102.528c0 6.272 3.456 12.032 8.96 14.912a16.448 16.448 0 0 0 17.344-0.832l46.656-30.72c0.768-0.512 1.408-1.088 2.176-1.728l53.504-35.712c26.624 5.056 52.928 7.68 78.464 7.68 201.472 0 365.44-142.656 365.44-317.952z m-365.504 284.032c-25.472 0-51.904-2.816-78.528-8.256a16.96 16.96 0 0 0-12.864 2.432l-61.632 41.216c-0.768 0.384-1.472 0.96-2.112 1.472l-18.048 12.032v-80.896a16.96 16.96 0 0 0-8.576-14.656c-93.76-52.928-149.76-141.632-149.76-237.376 0-156.672 148.672-284.032 331.584-284.032 182.784 0 331.648 127.424 331.648 284.032 0 156.672-148.864 284.032-331.712 284.032z m409.6-174.144a181.12 181.12 0 0 1 36.48 107.904c0 68.288-40.064 131.84-107.264 169.664a16.96 16.96 0 0 0-8.64 14.72v50.624l-5.824-3.776a9.088 9.088 0 0 0-1.792-1.408l-45.12-30.208c-3.776-2.432-8.448-3.456-12.8-2.432-79.296 16.448-156.096-1.536-213.312-44.48l-20.352 27.136c63.232 47.36 147.392 68.032 233.536 51.904l37.248 24.96c0.704 0.576 1.28 1.024 1.984 1.344l34.048 22.592a17.472 17.472 0 0 0 17.344 0.832 17.024 17.024 0 0 0 9.024-14.976V827.52c72.64-44.48 115.776-116.352 115.776-194.24 0-45.504-14.848-89.792-43.136-128l-27.2 20.032z"
                p-id="3701"
                fill="currentColor"
              ></path>
            </svg>
            文章
          </div>
          <template v-for="(tag, index) in JSON.parse(article.tags)" :key="index">
            <div class="tag_item">{{ tag }}</div>
          </template>
        </div>
      </div>
    </div>
  </template>
  <button class="more-loading-btn" @click="handleClick">加载更多</button>
</template>
