<template>
  <!-- app -->
  <div class="app-wrapper">
    <!-- nav -->
    <nav id="nav-container">
      <div class="nav-content">
        <cookie-menu class="cookie-menu" :default-active="defaultActive" :router="true">
          <template v-for="item in menuData">
            <template v-if="!item.children">
              <cookie-menu-item :key="item.url" :index="item.url">{{ item.name }} </cookie-menu-item>
            </template>
          </template>
        </cookie-menu>
        <div class="user-container">
          <div v-if="!userStore.auth" class="login-container" @click="showLoginDialog = true">
            <span>登录</span>
          </div>
          <div v-else class="avatar-container" @click="openUserControl = !openUserControl">
            <picture>
              <img :src="avatar" alt="" srcset="" class="img-container" />
            </picture>
          </div>
        </div>
      </div>
    </nav>
    <!-- main -->
    <div style="min-height: 1000px">
      <router-view />
    </div>
    <!-- footer-->
    <footer class="footer"></footer>
  </div>
  <!--login-->
  <cookie-login v-if="showLoginDialog" @close="showLoginDialog = false" />
  <!-- user_control -->
  <div v-if="openUserControl" class="user-control">
    <div class="user-control_list">
      <li class="list_item">收藏夹</li>
      <li class="list_item" @click="router.push('/user/my_application')">我的团队</li>
      <li class="list_item">个人资料</li>
      <li class="list_item" @click="logout">退出</li>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { watch, ref, computed } from 'vue';
import CookieMenu from './components/cookie-menu/CookieMenu.vue';
import CookieMenuItem from './components/cookie-menu/CookieMenuItem.vue';
import CookieLogin from './components/CookieLogin.vue';
import useUserStore from './store/user';
import { MenuItem } from './assets/interface';
import { getMenuAPI, getRoleMenuAPI } from './api/user';

const defaultActive = ref('');
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const avatar = computed(() => userStore.user.avatar);
const menuData = ref<MenuItem[]>([]);
const openUserControl = ref(false); // 显示用户部分信息
const showLoginDialog = ref(true); // 默认进入首页展示

/** *初始化数据 渲染导航栏 获取用户信息 */
const init = async () => {
  try {
    const [menuRes, roleMenuRes] = await Promise.all([getMenuAPI(), getRoleMenuAPI()]);
    menuData.value = menuRes.data;
    if (userStore.user.role === 'team_admin' || userStore.user.role === 'super_admin') {
      menuData.value.push(...roleMenuRes.data);
    }
  } catch (error) {
    console.log(`初始化数据出错${error}`);
  }
};
// 监听route.path的一级路由的变化
// 为什么不监听login和register的路由，因为点击login会跳转到home下，并不能监听
watch(
  () => route.path,
  (curPath): void => {
    const path = curPath.split('/');
    defaultActive.value = path.length <= 2 ? curPath : `/${path[1]}`;
  },
);
// 监听token用于显示登录弹框
watch(
  () => userStore.token,
  (token): void => {
    showLoginDialog.value = !token;
  },
  { immediate: true },
);
// 初始化
init();
// 退出登录
function logout(): void {
  router.go(0);
  userStore.logout();
}
</script>
<style scoped>
.app-wrapper {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}
.user-control {
  right: 0;
  position: absolute;
  top: 60px;
  margin-right: 40px;
  z-index: 999;
  padding: 15px;
  width: 150px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.user-control_list {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}
.list_item {
  width: 100%;
  padding: 0 15px;
  height: 45px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list_item:hover {
  background-color: rgb(247, 248, 250);
}
#nav-container {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 999;
}

.nav-content {
  height: 50px;
  width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-flow: nowrap;
  justify-content: space-around;
  align-items: center;
}

.cookie-menu {
  height: 100%;
}

.sub-item {
  font-size: 14px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-left: 0;
  margin-bottom: 5px;
}

.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  color: rgba(89, 89, 89, 1);
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
}

.avatar-container {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.img-container {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

#main {
  max-width: 1000px;
  margin: 12px auto 0;
  min-height: 500px;
}

#home-container {
  display: flex;
}
.footer {
  position: relative;
  z-index: 0;
  min-width: 320px;
  background: #1a1a1a;
  height: 400px;
}
</style>
