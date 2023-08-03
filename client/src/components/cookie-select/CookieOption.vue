<template>
  <li class="li_item" :class="{ 'li_item-active': isSelect }" @mousedown="handleMouseDown()">
    {{ props.label }}
  </li>
</template>
<script setup lang="ts">
import { defineProps, inject, onMounted, onBeforeUnmount, getCurrentInstance, ref, defineExpose } from 'vue';

const props = defineProps({
  label: {
    type: [String, Number],
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
});

const instance = getCurrentInstance();
const select: any = inject('select');
const isSelect = ref(false);

const handleMouseDown = (): void => {
  select.selectItem(instance);
};

defineExpose({ isSelect });

onMounted(() => {
  select.addItem(instance);
});
onBeforeUnmount(() => {
  select.removeItem(instance);
});
</script>
<style scoped>
.li_item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.li_item:hover {
  background-color: var(--grey-background);
}
.li_item-active {
  color: rgba(10, 132, 255, 1);
}
</style>
