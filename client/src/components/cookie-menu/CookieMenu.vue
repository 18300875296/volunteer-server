<template>
  <ul :class="[props.mode === 'horizontal' ? 'menu-horizontal' : 'menu-vertical', 'menu']">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, watch, provide, ref, defineEmits } from 'vue';

import { useRouter } from 'vue-router';

const props = defineProps({
  defaultActive: {
    type: String,
    default: '',
  },
  router: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'horizontal',
  },
});
const emits = defineEmits(['select']);

const router = useRouter();
const handleRoute = (item: string) => {
  router.push(item);
};

const useState = () => {
  const activeIndex = ref(props.defaultActive);
  const items = new Map();
  const submenus = new Map();
  const updateActiveIndex = (val: string) => {
    activeIndex.value = val;
  };
  const addItem = (item: any) => items.set(item.index, item);
  const removeItem = (item: any) => items.delete(item.index);
  const addSubItem = (item: any) => submenus.set(item.index, item);
  const removeSubItem = (item: any) => submenus.delete(item);
  const handleClickItem = (item: any) => {
    const { index } = item.props;
    emits('select', index);
    if (props.router) {
      handleRoute(index);
    }
  };
  return {
    activeIndex,
    items,
    submenus,
    addItem,
    removeItem,
    addSubItem,
    removeSubItem,
    handleClickItem,
    updateActiveIndex,
  };
};

const { updateActiveIndex, activeIndex, items } = useState();
provide('rootMenu', { useState, activeIndex });

watch(
  () => props.defaultActive,
  (value) => {
    if (!items.has(value)) {
      activeIndex.value = '';
    }
    updateActiveIndex(value);
  },
  { immediate: true },
);
</script>

<style scoped>
*,
body,
ul {
  margin: 0;
  padding: 0;
}
.menu {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  user-select: none;
}

.menu-vertical {
  flex-flow: column;
  align-items: center;
  gap: 20px;
}
.menu-vertical :deep(.cookie-menu-item) {
  margin: 0;
}
.menu-horizontal {
  align-items: center;
  flex-flow: nowrap;
}
</style>
