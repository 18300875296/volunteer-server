<template>
  <div class="form-item-container">
    <label :for="props.prop" class="block-label-title">
      {{ props.label }}
    </label>
    <slot></slot>
    <!-- 用户名校验失败提示 -->
    <p v-if="errMessage" class="error-container">{{ errMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, inject, defineExpose, onMounted, provide, getCurrentInstance, onBeforeUnmount } from 'vue';
import Schema from 'async-validator';

const props = defineProps({
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
  },
});

const instance = getCurrentInstance();
const errMessage = ref();
const form: any = inject('form'); // 注入父组件中提供的数据

// item上的验证规则
const validate = () => {
  const key = props.prop;
  const value = form.model[key]; // 获得item上的prop属性的值
  const rules = form.rules[key]; // 获得对应的prop的验证规则
  if (!rules) {
    errMessage.value = '';
    return Promise.resolve(true);
  }
  const param = { key: rules };
  const validator = new Schema(param);
  return validator.validate({ key: value }, (error) => {
    if (error) {
      errMessage.value = error[0].message;
    } else {
      errMessage.value = '';
    }
  });
};

// 清除之前的错误信息
const resetErrMessage = () => {
  errMessage.value = '';
};

onMounted(() => {
  form.addItem(instance);
});

onBeforeUnmount(() => {
  form.removeItem(instance);
});

defineExpose({ validate });

provide('formItem', { validate, resetErrMessage });
</script>

<style scoped>
*,
body,
ul,
input {
  margin: 0;
  padding: 0;
}

span {
  color: inherit;
  font-size: inherit;
}

.block-label-title {
  font-size: 15px;
  line-height: 20px;
  display: block;
  font-weight: 500;
  color: rgba(33, 40, 53, 1);
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.form-item-container {
  margin-bottom: 16px;
}

.error-container {
  color: rgba(239, 71, 67, 1);
  font-size: 12px;
  line-height: 18px;
  word-break: break-word;
  margin-top: 5px;
  text-align: justify;
  margin-bottom: 12px;
  padding-left: 5px;
}

.cookie-input-container {
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: nowrap;
  position: relative;
}

.cookie-input {
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  font-size: 14px;
  /* border-image: initial; */
  border-color: rgba(229, 229, 229, 1);
  /* color: rgba(var(--dsw-label-primary-rgb), 1);
  background: rgba(var(--dsw-overlay-3-rgb), 1); */
  outline: none;
  transition: all 0.3s ease 0s;
  line-height: 22px;
  border-radius: 8px;
  text-align: justify;
  padding: 8px 12px 8px 8px;
}

.phone-input {
  padding-left: 82px;
}

.cookie-input:hover {
  border-color: rgba(0, 122, 255, 0.3);
}

.cookie-input:focus {
  border-color: rgba(0, 122, 255, 1);
  box-shadow: rgba(0, 122, 255, 0.3) 0px 0px 0px 2px;
}

.phone-label {
  width: 100%;
  height: 100%;
}

.select-container {
  width: 76px;
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* -webkit-box-pack: justify; */
  justify-content: space-between;
  cursor: pointer;
  transition: color 10s ease;
}

.select-container:hover > span {
  color: rgba(10, 132, 255, 1);
}

.select-container:hover > svg {
  color: rgba(10, 132, 255, 1);
}

.select-svg {
  color: rgba(140, 140, 140, 1);
}

.change-select-svg {
  transform: rotate(180deg);
}

.select-container > span {
  padding: 0 0 0 12px;
  color: rgba(140, 140, 140, 1);
}

.pop-select-container {
  opacity: 1;
  /* position: absolute;
    inset: 0px auto auto 0px; */
  z-index: 1000;
  width: 320px;
  margin: 0px;
  height: 280px;
  top: 50px;
  /* transform: translate3d(524px, 302.5px, 0px); */
  display: flex;
  flex-direction: column;
  padding: 0px;
  position: absolute;
  border-radius: 8px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.12) 0px 6px 16px;
  background: rgba(255, 255, 255, 1);
}

.gap-line {
  width: 1px;
  height: 16px;
  background-color: rgba(140, 140, 140, 1);
  margin-left: 8px;
  margin-right: 2px;
}

.code-container {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.3s ease 0s, opacity 0.3s ease 0s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(140, 140, 140, 1);
  font-size: 14px;
  cursor: pointer;
}

.code-input {
  padding-right: 110px;
}

.disabled {
  pointer-events: none;
}
</style>
