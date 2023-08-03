<template>
  <Suspense>
    <div class="bg">
      <div class="admin_control">
        <div class="admin_control-aside">
          <cookie-menu class="menu" :default-active="defaultActive" :router="true" mode="vertical">
            <template v-for="item in menuData">
              <template v-if="!item.children">
                <cookie-menu-item :key="item.url" :index="`${prefix}${item.url}`" class="menu_item"
                  >{{ item.name }}
                </cookie-menu-item>
              </template>
            </template>
          </cookie-menu>
        </div>
        <main class="admin_control-content">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </Suspense>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CookieMenu from '../../components/cookie-menu/CookieMenu.vue';
import CookieMenuItem from '../../components/cookie-menu/CookieMenuItem.vue';
import { MenuItem } from '../../assets/interface';

const route = useRoute();

const prefix = `/admin`;
const defaultActive = ref();
const menuData: MenuItem[] = [
  {
    name: '系统管理',
    url: '/system_control',
  },
  {
    name: '用户管理',
    url: '/user_control',
  },
  {
    name: '团队管理',
    url: '/team_control',
  },
  {
    name: '页面设置模块',
    url: '/views_control',
  },

  {
    name: '志愿活动管理',
    url: '/actives_control',
  },
  {
    name: '文章管理',
    url: '/articles_control',
  },
  {
    name: '系统日志',
    url: '/system_log',
  },
  // {
  //   name: '权限管理',
  //   url: '/permission_control',
  // },
];

watch(
  () => route.path,
  (val) => {
    defaultActive.value = val;
  },
  { immediate: true },
);
</script>

<style scoped>
.bg {
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.admin_control {
  margin: 12px auto 0;
  min-height: 800px;
  display: flex;
}
.admin_control-aside {
  width: 200px;
  border-right: 1px solid rgba(240, 240, 240, 1);
}
.admin_control-content {
  flex: 1;
}
.menu :deep(.active) {
  color: rgba(86, 74, 190, 1);
  border: transparent;
}
.menu_item {
  height: 48px;
}
</style>
