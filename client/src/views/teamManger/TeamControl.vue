<template>
  <div class="bg">
    <div class="team_control">
      <div class="team_control-aside">
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
      <main class="team_control-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CookieMenu from '../../components/cookie-menu/CookieMenu.vue';
import CookieMenuItem from '../../components/cookie-menu/CookieMenuItem.vue';
import { MenuItem } from '../../assets/interface';

const route = useRoute();
const { team_id } = route.params;
const prefix = `/team_manager/${team_id}`;
const defaultActive = ref();
const menuData: MenuItem[] = [
  {
    name: '志愿团队',
    url: '/team_information',
  },
  {
    name: '团员管理',
    url: '/team_member',
  },

  {
    name: '志愿活动管理',
    url: '/team_active',
  },
  // {
  //   name: '活动报名管理',
  //   url: '/team_active_application',
  // },
  {
    name: '数据分析',
    url: '/team_stats',
  },
  {
    name: '日志管理',
    url: '/team_log',
  },
  // {
  //   name: '账号管理',
  //   url: '/team_admin_control',
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
.team_control {
  /* max-width: 1200px; */
  margin: 12px auto 0;
  min-height: 800px;
  display: flex;
}
.team_control-aside {
  width: 200px;
  border-right: 1px solid rgba(240, 240, 240, 1);
}
.team_control-content {
  flex: 1;
  /* padding: 8px 0 0 16px; */
  /* border-radius: 8px; */
  /* padding: 16px; */
  /* margin-left: 16px; */
}
.menu :deep(.active) {
  color: rgba(86, 74, 190, 1);
  border: transparent;
}
.menu_item {
  height: 48px;
}
</style>
