<template>
  <!-- app -->
  <div class="app-wrapper">
    <!-- nav -->
    <nav id="nav-container">
      <div class="nav-content">
        <cookie-menu class="cookie-menu" :default-active="defaultActive" :router="true">
          <template v-for="item in menuData" :key="item.path">
            <cookie-menu-item :index="item.path">{{ item.meta.displayName }} </cookie-menu-item>
          </template>
        </cookie-menu>
        <div class="user-container">
          <div v-if="!userStore.auth" class="login-container" @click="showLoginDialog = true">
            <span>登录</span>
          </div>
          <div v-else class="avatar-container" @click="showUserDialog = !showUserDialog">
            <picture>
              <img :src="avatar" alt="" srcset="" class="img-container" />
            </picture>
          </div>
        </div>
      </div>
    </nav>
    <Suspense>
      <!-- main -->
      <div id="main" style="min-height: 1000px">
        <!-- <router-view :show-login="showLoginDialog" /> -->
        <router-view />
      </div>
    </Suspense>
    <!-- footer-->
    <footer class="footer"></footer>
  </div>
  <!-- user_control -->
  <transition>
    <div v-if="showUserDialog" class="user-control">
      <div class="user-control_list">
        <li class="list_item">收藏夹</li>
        <li class="list_item" @click="router.push('/user/my_application')">我的团队</li>
        <li class="list_item">个人资料</li>
        <li class="list_item" @click="logout">退出</li>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { watch, ref, computed } from 'vue';
import CookieMenu from './components/cookie-menu/CookieMenu.vue';
import CookieMenuItem from './components/cookie-menu/CookieMenuItem.vue';
import useUserStore from './store/user';
import useRouteStore from './store/route';

const defaultActive = ref();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const routeStore = useRouteStore();
const avatar = computed(() => userStore.user.avatar);
const showUserDialog = ref(false);
const showLoginDialog = ref(false); // 控制用户点击登录按钮显示登录弹框
const menuData = computed(() => routeStore.firstMenus);

const logout = () => {
  userStore.logout();
  showUserDialog.value = false;
};
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
