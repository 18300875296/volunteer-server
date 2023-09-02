<template>
  <header class="header_container">
    <template v-for="menu of props.data" :key="menu.name">
      <div class="select_item">
        <router-link :to="{ name: menu.name }" @click="handleSwitchTab(menu)">{{ menu.meta?.title }}</router-link>
      </div>
    </template>
  </header>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import useArticleStore from '@/store/article';

const props = defineProps({
  data: {
    type: Array,
    default: () => ref<RouteRecordRaw[]>([]),
  },
});
const handleSwitchTab = (route: RouteRecordRaw): void => useArticleStore().getCurrentTab(route);
</script>
<style scoped>
.header_container {
  display: flex;
  flex-flow: row nowrap;
  height: 100px;
  margin-bottom: 14px;
}
.header_container > :not(:last-child) {
  margin-right: 8px;
}
.select_item {
  flex: 1 1 auto;
  display: flex;
  padding: 12px 0px 0px 16px;
  flex-direction: column;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  background: linear-gradient(rgb(56, 152, 255), rgb(20, 125, 255));
}
.select_item a {
  height: 100%;
  color: rgba(255, 255, 255, 1);
}
</style>
