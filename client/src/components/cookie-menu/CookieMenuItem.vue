<template>
  <li
    class="cookie-menu-item"
    :class="{ active: active }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <router-link :to="index">
      <slot></slot>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, computed, inject, onMounted, onUnmounted, getCurrentInstance } from 'vue';

const rootMenu: any = inject('rootMenu');

/** props*******start***************** */
const props = defineProps({
  index: {
    type: String,
    default: '',
  },
});
/** props*******end***************** */

const active = computed(() => props.index === rootMenu.activeIndex.value);
const { addItem, removeItem, handleClickItem } = rootMenu.useState();
const instance = getCurrentInstance();
onMounted(() => {
  addItem(instance);
});
onUnmounted(() => {
  removeItem(instance);
});

const onMouseEnter = () => {
  //   if ( !this.rootMenu.backgroundColor) return;
  //   this.$el.style.backgroundColor = this.hoverBackground;
};
const onMouseLeave = () => {
  // if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
  // this.$el.style.backgroundColor = this.backgroundColor;
};
const handleClick = () => {
  handleClickItem(instance);
};
</script>

<style scoped>
a {
  color: inherit;
}

.cookie-menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'PingFang SC';
  height: 100%;
  font-weight: 400;
  font-size: 16px;
  margin-left: 31.5px;
  color: rgba(38, 38, 38, 0.75);
  cursor: pointer;
  list-style: none;
  text-align: center;
  padding: 0 5px;
}
.active {
  color: rgba(0, 0, 0, 1);
  border-bottom: 2px solid rgba(0, 122, 255, 1);
  border-radius: 0.5px;
  transition: border 0.2s;
}
.cookie-menu-item:hover {
  color: rgba(0, 0, 0, 1);
}
</style>
