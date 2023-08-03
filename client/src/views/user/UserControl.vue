<template>
  <div class="control-wrapper">
    <div class="control">
      <div class="control-aside">
        <cookie-menu class="menu" :default-active="defaultActive" :router="true" mode="vertical">
          <template v-for="item in menuData">
            <template v-if="!item.children">
              <cookie-menu-item :key="item.url" :index="`${prefix}${item.url}`" class="menu_item"
                >{{ item.name }}
              </cookie-menu-item>
            </template>
            <!-- <template v-else>
          <cookie-sub-menu :key="item.url">
            <template #title>{{ item.name }}</template>
            <template v-for="child of item.children" :key="child.url">
              <cookie-menu-item class="sub-item">{{ child.name }}</cookie-menu-item>
            </template>
          </cookie-sub-menu>
        </template>
        </cookie-sub-menu> -->
          </template>
        </cookie-menu>
      </div>
      <main class="control-view">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CookieMenu from '../../components/cookie-menu/CookieMenu.vue';
import CookieMenuItem from '../../components/cookie-menu/CookieMenuItem.vue';
import { MenuItem } from '../../assets/interface';

const route = useRoute();

const prefix = `/user`;
const defaultActive = ref();
const menuData: MenuItem[] = [
  {
    name: '收藏夹',
    url: '/collect',
  },
  {
    name: '我的申请',
    url: '/my_application',
  },
  {
    name: '我的团队',
    url: '/my_team',
  },
  {
    name: '个人资料',
    url: '/personal_information',
  },
  {
    name: '设置',
    url: '/set',
  },
];
</script>

<style scoped>
.control-wrapper {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}
.control {
  max-width: 1000px;
  margin: 12px auto 0;
  min-height: 800px;
  display: flex;
}
.control-aside {
  width: 256px;
}
.control-view {
  flex: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
}
.menu {
}
.menu_item {
  height: 48px;
}

/* #hot-active-container {
  margin-top: 10px;
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#discuss-list {
  margin-top: 10px;
  width: 100%;
  min-height: 600px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
} */
</style>
