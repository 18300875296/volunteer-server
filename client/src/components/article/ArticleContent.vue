<template>
  <div id="content-container">
    <section class="user_info_container">
      <a href="#">
        <picture>
          <img :src="props.data?.user.avatar" alt="" class="avatar" />
        </picture>
      </a>
      <h3 class="title">{{ props.data?.title }}</h3>
      <button class="follow-btn"><span>关注TA</span></button>
    </section>
    <section class="publishInfo-container">
      <a href="#">
        <span>{{ props.data?.user.nickname }}</span>
      </a>
      <span>发起于 {{ $formatRelativeTime(props.data?.create_at) }}</span>
      <div></div>
      <span>来自于上海</span>
    </section>
    <section class="article-content-container" v-html="parseContent"></section>
  </div>
  <section class="interactive-container">
    <span v-if="props.data.like_by_current_user">点赞</span>
    <span v-else>已点赞</span>
    <span v-if="props.data.collect_by_current_user">收藏</span>
    <span v-else>已收藏</span>
    <button class="reply-btn"><span>回复评论</span></button>
  </section>
  <section class="comment-container">
    <span>暂无回复</span>
  </section>
</template>
<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ArticleDetail } from '@/types/article';

interface ArticleProps<T> {
  data: T;
}
const props = defineProps({
  data: {
    type: [],
    required: false,
    default: [],
  },
});
// 解码html
const parseContent = computed(() => JSON.parse(decodeURIComponent(props.data.content)));
</script>
<style scoped>
#content-container {
  width: 100%;
  padding-top: 8px;
}
.user_info_container {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  height: 32px;
  color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  object-fit: cover;
}
.title {
  color: rgba(0, 0, 0, 1);
  margin-right: 12px;
  max-width: 540px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
}
.follow-btn {
  margin-left: auto;
  width: 102px;
  height: 32px;
  background-color: transparent;
  font-size: 14px;
  border-radius: 8px;
  box-shadow: inset 0px 0px 0px 1px rgba(45, 181, 93, 1);
  padding: 5px 16px;
}

.follow-btn span {
  color: rgba(45, 181, 93, 1);
}

.follow-btn:hover {
  box-shadow: inset 0px 0px 0px 1px rgba(38.25, 153.85, 79.05, 1);
  background-color: rgba(45, 181, 93, 0.03);
  color: rgba(38.25, 153.85, 79.05, 1);
  transition: all 0.3s;
}

.publishInfo-container {
  margin-top: 10px;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.publishInfo-container > :not(:last-child) {
  margin-right: 10px;
}

.publishInfo-container > :nth-child(n) {
  white-space: nowrap;
  color: rgba(191, 191, 191, 1);
}

.publishInfo-container a > span {
  color: rgba(191, 191, 191, 1);
}
.interactive-container {
  border-top: 1px solid rgba(240, 240, 240, 1);
  margin: 0 -16px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  position: sticky;
  z-index: 999;
  bottom: 0;
  border-radius: 0px 0px 8px 8px;
  padding: 14px 16px;
}

.interactive-container > span {
  margin: 0 12px;
  color: rgba(0, 0, 0, 1);
}

.interactive-container > span:hover {
  color: rgba(45, 145, 255, 1);
  cursor: pointer;
}
.reply-btn {
  width: 102px;
  background-color: rgba(45, 181, 93, 1);
  font-size: 14px;
  margin-left: auto;
  margin-right: 16px;
  line-height: 22px;
  padding: 5px 16px;
}
.comment-container {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
}
.article-content-container {
  line-height: 1.75;
  letter-spacing: 0.8px;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.1) 3%, transparent 0),
    linear-gradient(1turn, rgba(50, 0, 0, 0.1) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  overflow-x: hidden;
  padding: 10px;
}

.article-content-container >>> img {
  width: 400px;
  height: 230px;
}

.comment-container > span {
  color: rgba(191, 191, 191, 1);
}
</style>
