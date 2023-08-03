<template>
  <div class="group-radio-container">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, provide } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']); // 触发group上的model
const radioGroup = new Map(); // 存radio实例

const addItem = (item: any) => {
  radioGroup.set(item.props.label, item); //  挂载时将radio存入map中
  item.props.isButton = props.button;
};
const removeItem = (item: any) => {
  radioGroup.delete(item.props.label);
};
const selectItem = (item: any) => {
  //  选中时触发事件更新group上的model
  emits('update:modelValue', item.props.label);

  // if (item.props.modelValue === item.props.label) {
  //   item.props.isSelect= true
  // }
  radioGroup.forEach((radio) => {
    radio.exposed.isSelect.value = radio.props.label === item.props.label;
    radio.props.modelValue = item.props.label;
  }); // 更新radio上的modelValue 保持同步
};

provide('radioGroup', {
  addItem,
  removeItem,
  selectItem,
});
</script>
<style scoped>
.group-radio-container {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>
