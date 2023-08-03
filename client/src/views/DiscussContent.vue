<template>
  <div class="bg">
    <main id="main-discuss-content">
      <div class="discuss-content-container">
        <div class="discuss-detail-container">
          <div class="bread-crumbs-container">面包屑</div>
          <div id="content-container">
            <div class="user-info-container">
              <a href="#" class="avatar-container">
                <picture>
                  <img :src="author.avatar" alt="" class="avatar" />
                </picture>
              </a>
              <span class="title">{{ article.title }}</span>
              <button class="follow-btn"><span>关注TA</span></button>
            </div>
            <div class="publishInfo-container">
              <a href="#"
                ><span>{{ author.nickname }}</span></a
              >
              <span>发起于 {{ $formatRelativeTime(article.create_at) }}</span>
              <div></div>
              <span>来自于上海</span>
            </div>
            <div class="article-content-container" v-html="articleStore.parseContent"></div>
          </div>
          <div class="interactive-container">
            <span v-if="!articleStore.isLike" @click="handleLike">点赞</span>
            <span v-else @click="handleCancelLike">已点赞</span>
            <span v-if="!articleStore.isCollect" @click="handleCollect">收藏</span>
            <span v-else @click="handleCancelCollect">已收藏</span>
            <button class="reply-btn"><span>回复评论</span></button>
          </div>
        </div>
        <div class="comment-container">
          <span>暂无回复</span>
        </div>
      </div>
      <aside id="aside-container">
        <div class="other-info-container">
          <div class="other-item">
            <span>浏览人数</span>
            <span>{{ articleStore.reads }}</span>
          </div>
          <div class="other-item">
            <span>收藏人数</span>
            <span>{{ articleStore.collects }}</span>
          </div>
          <div class="other-item">
            <span>点赞人数</span>
            <span>{{ articleStore.likes }}</span>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import useArticleStore from '../store/article';

const props = defineProps({
  article_id: {
    type: String,
    default: '',
  },
});

const articleStore = useArticleStore();
articleStore.getPosts(props.article_id);
// articleStore.getOtherInfo(tid)
const article: any = computed(() => articleStore.articleContent);
const author: any = computed(() => articleStore.articleAuthor);

const handleLike = async () => {
  await articleStore.putLike();
};
const handleCancelLike = async () => {
  await articleStore.deleteLike();
};
const handleCollect = async () => {
  await articleStore.putCollect();
};
const handleCancelCollect = async () => {
  await articleStore.deleteCollect();
};
</script>

<style scoped>
.bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}

#main-discuss-content {
  max-width: 1000px;
  margin: 12px auto 0;
  min-height: 500px;
  display: flex;
}

.discuss-content-container {
  flex: 1;
}

/* .discuss-content-container img {
  width: 400px;
  height: 230px;
} */

#discuss-container {
  flex: 1;

  /* background: rgba(255, 255, 255, 1); */
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px; */
  /* padding: 16px; */
  position: relative;
}

.discuss-detail-container {
  flex: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px 16px 0 16px;
  position: relative;
  margin-bottom: 10px;
}

.bread-crumbs-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  padding: 0;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  font-size: 14px;
}

#content-container {
  width: 100%;
  padding-top: 8px;
  /* position: relative; */
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

.user-info-container {
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
  /* background-color: aqua; */
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

.discuss-content-container {
  width: 100%;
  margin-top: 6px;
  overflow: hidden;
}

.discuss-content-container > p {
  margin: 8px 0;
  text-align: justify;
}

.article-cover {
  width: 400px;
  height: 230px;
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

.comment-container > span {
  color: rgba(191, 191, 191, 1);
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
