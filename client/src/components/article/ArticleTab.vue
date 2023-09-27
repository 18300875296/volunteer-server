<template>
  <section class="article_tab_container">
    <div v-if="currentMenuTabs.length" class="tab_container">
      <template v-for="tab of currentMenuTabs" :key="tab.name">
        <Tab :path="tab.path" :name="tab.name" :title="tab.meta.displayName" :default-active="defaultActive" />
      </template>
    </div>
    <Search class="search_container" placeholder="搜索志愿动态" />
    <cookie-button type="submit" @click="validLogin"> 发布文章</cookie-button>
  </section>
  <CookieModal :show-modal="showModal" teleport="body" @on-close="showModal = false">
    <template #header><h3>提示</h3></template>
    <template #body><span>您还没有登录，请先点击确认前往登录</span></template>
    <template #footer>
      <cookie-button type="delete" class="button_item" @click="showModal = false">取消</cookie-button>
      <cookie-button type="submit" class="button_item" @click="openLoginDialog">确定</cookie-button>
    </template>
  </CookieModal>
  <Login :show-modal="showLogin" @on-close="showLogin = false" @on-login="handleLogin" />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import useArticleStore from '@/store/article';
import useUserStore from '@/store/user';
import useRouteStore from '@/store/route';
import { ArticleHeader } from '@/types/article';
import { CookieModal } from '@/components/cookie-modal/CookieModal.tsx';
import useAsyncComputed from '@/utils/asyncComputed';
import CookieButton from '@/components/cookie-button/CookieButton.vue';
import { Login } from '@/components/common/login/Login.tsx';
import { Tab } from '@/components/common/tab/Tab.tsx';
import { Search } from '@/components/common/search/Search.tsx';

const currentMenuTabs = computed(() => useArticleStore().currentMenuTabs); // 当前栏目的菜单栏
const defaultActive = computed(() => useArticleStore().currentMenuTabName); // 当前激活项
const showModal = ref(false); // 控制模态框的显示
const showLogin = ref(false); // 控制登录框的显示

// 是否打开文章编辑页面
const validLogin = () => {
  const { token } = useUserStore();
  showModal.value = !token;
  const articleStore = useArticleStore();
  articleStore.openArticleEditor = !!token;
};
// 用户没有登录点击确定显示登录框
const openLoginDialog = () => {
  showModal.value = false; // 关闭模态框
  showLogin.value = true;
};
// 用户进行登录
const handleLogin = async (form: any) => {
  showLogin.value = false;
  await useUserStore().login(form);
};
</script>
<style scoped>
.article_tab_container {
  width: 100%;
  min-height: 32px;
  height: 32px;
  max-height: 40px;
  margin-bottom: 10px;
  display: flex;
}
.tab_container {
  white-space: nowrap;
  display: flex;
  flex-flow: row nowrap;
  flex: auto;
}
.search_container {
  height: 100%;
  width: 200px;
  margin: 0 15px;
}
.button_item {
  width: 102px;
  height: 100%;
}
</style>
