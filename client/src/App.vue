<template>
  <!-- app -->
  <div class="app-wrapper">
    <!-- nav -->
    <nav id="nav-container">
      <div class="nav-content">
        <cookie-menu class="cookie-menu" :default-active="defaultActive" :router="true" @select="handleSelect">
          <template v-for="item in menuData">
            <template v-if="!item.children">
              <cookie-menu-item :key="item.url" :index="item.url">{{ item.name }} </cookie-menu-item>
            </template>
          </template>
        </cookie-menu>
        <div class="user-container">
          <div v-if="!userStore.auth" class="login-container" @click="userStore.showLoginDialog = true">
            <span>登录</span>
          </div>
          <div v-else class="avatar-container" @click="handleClickUserControl">
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
  <cookie-login v-if="userStore.showLoginDialog" @close="userStore.showLoginDialog = false" />
  <!-- user_control -->
  <div v-if="openUserControl" class="user-control">
    <div class="user-control_list">
      <li class="list_item">收藏夹</li>
      <li class="list_item" @click="router.push('/user/my_application')">我的团队</li>
      <li class="list_item">个人资料</li>
      <li class="list_item" @click="handleClickLogout">退出</li>
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
import { getAdminMenuAPI, getMenuAPI, getTeamMenuAPI } from './api/user';

const defaultActive = ref();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const avatar = computed(() => userStore.user.avatar);
const menuData = ref<MenuItem[]>([]);
const openUserControl = ref<boolean>(false);
const handleClickUserControl = () => {
  openUserControl.value = !openUserControl.value;
};
const handleClickLogout = () => {
  userStore.logout();
  router.go(0);
};
// --------获取导航栏数据---------------
const getMenu = async (): Promise<void> => {
  try {
    const res = await getMenuAPI();
    menuData.value = res.data;
  } catch (error) {
    console.log(`获取导航栏数据失败${error}`);
  }
};
getMenu();

const getRoleMenu = async () => {
  if (userStore.user.role === 'team_admin') {
    const res = await getTeamMenuAPI();
    menuData.value.push(...res.data);
  }
  if (userStore.user.role === 'super_admin') {
    const res = await getAdminMenuAPI();
    menuData.value.push(...res.data);
  }
};
getRoleMenu();
// 监听route.path的一级路由的变化
// 为什么不监听login和register的路由，因为点击login会跳转到home下，并不能监听
watch(
  () => route.path,
  (curPath): void => {
    const path = curPath.split('/');
    if (path.length !== 0) {
      if (path.length <= 2) {
        defaultActive.value = curPath;
      } else {
        defaultActive.value = `/${path[1]}`;
      }
    }
  },
  // { immediate: true }
);
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
