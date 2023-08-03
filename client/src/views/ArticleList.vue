<template>
  <main id="discuss-container">
    <section id="discuss-tab-container">
      <router-link to="/discuss/interact/hottest" :class="[defaultActive ? 'active' : '', 'hottest']">
        最热
      </router-link>
      <router-link to="/discuss/interact/newest" class="newest">最新</router-link>
      <router-link to="/discuss/interact/recommend" class="recommend">推荐</router-link>
      <div class="search-container"><input placeholder="搜索" /></div>
      <cookie-button type="submit" class="publish-btn" @click="handleClickPublish"> 发布文章</cookie-button>
    </section>
    <section class="discuss-list-container">
      <router-view></router-view>
    </section>
  </main>
  <tip-tap v-if="isEditor" class="RichText-container" @handleClose="isEditor = false" @submit="handleSubmit"></tip-tap>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TipTap from '../components/TipTap/TipTap.vue';
import CookieButton from '../components/cookie-button/CookieButton.vue';
import useUserStore from '../store/user';
import useArticleStore from '../store/article';

const router = useRouter();

const articleStore = useArticleStore();
const userStore = useUserStore();
const isEditor = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});
const handleSubmit = async () => {
  const res = await articleStore.sendPosts();
  const param = res.data.article_id;
  router.push(`/discuss/${param}`);
};
const defaultActive = ref<boolean | null>(null);
const handleClickPublish = () => {
  if (userStore.auth) {
    isEditor.value = true;
  } else {
    userStore.auth = false;
  }
};
const route = useRoute();
watch(
  () => route.path,
  (path) => {
    console.log(path);
    if (path !== '/discuss') {
      defaultActive.value = false;
    } else {
      defaultActive.value = true;
    }
  },
  { immediate: true },
);
</script>
<style scoped>
#discuss-tab-container {
  width: 100%;
  height: 32px;
  margin-bottom: 10px;
  display: flex;
}
.active {
  transition: all 0.4s ease 0s;
  color: rgba(45, 145, 255, 1);
  border-bottom: 2px solid rgba(45, 145, 255, 1);
}
.hottest,
.newest,
.recommend {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  transition: all 0.4s ease 0s;
}
.publish-btn {
  width: 102px;
  height: 100%;
  background-color: rgba(45, 181, 93, 1);
  margin-left: 15px;
}
.discuss-list-container {
  padding: 16px 16px 0px 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  /* min-height: 600px; */
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.RichText-container {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8), 0px 2px 8px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 1);
  height: 80vh;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
