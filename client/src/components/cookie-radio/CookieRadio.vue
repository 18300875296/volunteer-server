<template>
  <label
    class="radio-normal"
    :class="{
      'radio-select': isSelect,
      'radio-disabled': props.disabled,
      'radio-button': isButton,
      'radio-button-select': isSelect && isButton,
    }"
  >
    <input
      v-model="selectValue"
      type="radio"
      :value="props.label"
      :disabled="props.disabled"
      class="radio-input"
      @click="handleClick"
      @input="handleInput"
    />
    <span class="radio-label">
      <!-- <slot></slot> -->
      {{ props.value }}
    </span>
  </label>
  <!-- <span class="radio-icon"></span> -->
</template>
<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
  inject,
  getCurrentInstance,
  computed,
  defineExpose,
} from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
  value: {
    type: [String, Number, Boolean],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const instance = getCurrentInstance();
const emits = defineEmits(['update:modelValue']);
const radioGroup: any = inject('radioGroup');
const isButton = ref(false); // 控制是否使用按钮样式
const isSelect = ref(false); // 控制选中状态

// 判断radio是否有group包裹
const isGroup = () => {
  return !!radioGroup;
};

const selectValue = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emits('update:modelValue', props.label);
  },
});

const handleClick = (e: any) => {
  isSelect.value = true;
  radioGroup.selectItem(instance);
  console.log('触发点击事件');
};

onMounted(() => {
  const groupExists = isGroup();
  if (groupExists) {
    radioGroup.addItem(instance);
  }
});
onBeforeUnmount(() => {
  const groupExists = isGroup();
  if (groupExists) {
    radioGroup.removeItem(instance);
  }
});
defineExpose({ isSelect });
</script>
<style scoped>
.radio-normal {
  cursor: pointer;
  height: 100%;
  width: 100%;
  background-color: #00000008;
  border-radius: 8px;
}

.radio-label {
  display: flex;
  color: inherit;
  line-height: 40px;
  padding: 0 18px;
  color: inherit;
}

.radio-select {
  color: rgb(0 122 255);
  background-color: #007aff14;
}

.radio-button {
  /* background-color: #fff;
  height: 40px;
  line-height: 38px;
  padding: 0 15px 0 12px;
  margin: 0; */
}

.radio-input {
  display: none;
}
</style>
