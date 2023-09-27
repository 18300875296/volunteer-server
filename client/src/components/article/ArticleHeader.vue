<template>
  <header class="header_container">
    <template v-for="menu of menus" :key="menu.menu_id">
      <Banner :name="menu.name" :path="menu.path" :title="menu.meta.displayName" :default-active="defaultActive" />
    </template>
  </header>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import useArticleStore from '@/store/article';
import { Banner } from '@/components/common/banner/Banner';

const menus = computed(() => useArticleStore().articleMenus);
const defaultActive = computed(() => useArticleStore().currentMenuName); // 根据当前的栏目渲染样式
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
/* .select_item {
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
.active {
  background: linear-gradient(rgb(67, 212, 117), rgb(43, 213, 93));
} */
</style>
