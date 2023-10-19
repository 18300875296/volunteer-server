<template>
  <div class="select" :class="{ 'select-disabled': isDisable }">
    <cookie-input
      ref="input"
      :placeholder="props.placeholder"
      :border="false"
      :transparent="false"
      class="select_item-inp"
      :model-value="props.modelValue"
      @click="handleClick"
      @blur="handleBlur_select"
    ></cookie-input>
    <div class="select_item-btn" @click="openSelect">
      <svg
        t="1680578905441"
        :class="{ 'select_item-btn-active': isSelect }"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2280"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path
          d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z"
          p-id="2281"
        ></path>
      </svg>
    </div>
    <div v-show="isSelect" class="list">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, provide, watch, computed } from 'vue';
import CookieInput from '../cookie-input/CookieInput.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '选择框',
  },
  disabled: {
    type: [String, Boolean, Number],
    default: false,
  },
});
const isSelect = ref(false);
const isDisable = computed(() => props.disabled);
const input = ref();

const emits = defineEmits(['update:modelValue', 'change']);
const options = new Map();
watch(
  () => props.modelValue,
  function () {
    emits('change'); //  触发外部change事件
    input.value.handleValidate(); // 检验input框数据
  },
);

const selectItem = (item: any) => {
  emits('update:modelValue', item.props.label);
  options.forEach((option) => {
    option.exposed.isSelect.value = item.props.value === option.props.value;
  });
  input.value.inputFocus(); // 触发input框focus
  isSelect.value = false;
};
// const handleClick_item = () => {};
// 打开选择框
const openSelect = (): void => {
  isSelect.value = !isSelect.value;
};
// 点击input框
const handleClick = () => {
  isSelect.value = !isSelect.value;
  // temp = true;
};
const handleBlur_select = () => {
  isSelect.value = false;
};

provide('select', {
  addItem,
  removeItem,
  selectItem,
});
</script>
<style scoped lang="css">
/**************************************************整个容器********************* */
.select {
  min-width: 180px;

  min-height: 40px;

  position: relative;
}
.select-disabled {
  pointer-events: none;
}

/**************************************************input框********************* */
.select_item-inp {
  height: 40px;
}
/**************************************************button********************* */
.select_item-btn {
  height: 16px;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  margin-right: 10px;
  top: 50%;
  cursor: pointer;
}
.select_item-btn:hover {
  color: rgb(0 122 255);
}
.select_item-btn-active {
  transform: rotate(180deg);
}

/**************************************************下拉展示列表样式********************* */
.list {
  overflow: auto;
  min-width: 200px;
  max-height: 250px;
  opacity: 1;
  z-index: 1000;
  margin-top: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 8px;
  border: none;
  box-shadow: var(--primary-shadow);
  background: var(--primary-background);
}
</style>
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
  margin-bottom: 8px;
  font-weight: 400;
  display: block;
}

.cookie-input {
  position: relative;
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
</style>
