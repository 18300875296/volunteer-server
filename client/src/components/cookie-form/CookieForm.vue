<template>
  <form>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { defineProps, provide, defineExpose } from 'vue';

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
});

const fields = new Map(); // 存储item项实例

const addItem = (item: any) => {
  const value = item.props.prop;
  fields.set(item, value);
};

const removeItem = (item: any) => {
  fields.delete(item);
};
const validate = (fn: any) => {
  // 验证所有实例上的规则
  const children = [...fields.keys()].filter((item: any) => item.props).map((item: any) => item.exposed.validate());
  Promise.all(children)
    .then(() => fn(true))
    .catch(() => fn(false));
};

const validateEmail = (fn: any) => {
  const children = [...fields.keys()]
    .filter((item: any) => item.props && item.props.prop !== 'code')
    .map((item: any) => item.exposed.validate());
  Promise.all(children)
    .then(() => fn(true))
    .catch(() => fn(false));
};

// 提供者
provide('form', {
  handleValidate: validate,
  model: props.model,
  rules: props.rules,
  fields,
  addItem,
  removeItem,
});

defineExpose({ validate, validateEmail }); // 暴露给外部的方法
</script>

<style scoped>
*,
body,
ul {
  margin: 0;
  padding: 0;
}
</style>
