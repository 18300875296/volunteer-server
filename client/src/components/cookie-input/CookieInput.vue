<template>
  <div class="input-wrapper" :class="[isFocus ? 'wrapper-focus' : '']">
    <input
      ref="inputRef"
      :value="props.modelValue"
      :style="{ height: props.height + 'px' }"
      :class="[
        'cookie-input',
        { 'input-border': isBorder },
        { 'input-background': isTransparent },
        { disabled: props.disabled },
      ]"
      :type="props.type"
      :placeholder="placeholder"
      :accept="props.accept"
      :disabled="props.disabled"
      @input="handleInput"
      @blur="handleBlur"
      @change="handleChange"
      @focus="handleFocus"
      @click="handleClick"
      @mousedown="handleMouseDown"
    />
    <slot name="icon"></slot>

    <slot name="code"></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, inject, defineEmits, defineExpose, ref } from 'vue';

interface FormItem {
  validate: Function;
  resetErrMessage: Function;
}
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  border: {
    type: Boolean,
    default: true,
  },
  transparent: {
    type: Boolean,
    default: true,
  },
  accept: {
    type: String,
  },
  height: {
    type: Number,
    default: 40,
  },
});

const isFocus = ref(false);
const formItem = inject<FormItem>('formItem');
const inputRef = ref();
const isBorder = computed(() => props.border);
const isTransparent = computed(() => !props.transparent);

const emits = defineEmits(['update:modelValue', 'blur', 'focus', 'change', 'input', 'click', 'mousedown']);
// 让input重新聚焦
const inputFocus = () => {
  if (props.disabled) {
    return false;
  }
  inputRef.value.focus();
};
const handleInput = (e: any) => {
  if (props.disabled) {
    return false;
  }
  if (formItem) {
    const { resetErrMessage } = formItem;
    resetErrMessage(); // 用户输入时不进行验证
  }
  emits('update:modelValue', e.target.value);
};
const handleChange = async (event: any) => {
  if (props.disabled) {
    return false;
  }
  if (formItem) {
    const { validate, resetErrMessage } = formItem;
    resetErrMessage();
    await validate();
  }
  emits('change', event);
};
const handleBlur = async () => {
  if (props.disabled) {
    return false;
  }
  isFocus.value = false;
  if (formItem) {
    const { validate } = formItem;
    await validate();
  }
  emits('blur');
};
const handleFocus = () => {
  if (props.disabled) {
    return false;
  }
  isFocus.value = true;
  emits('focus');
};
const handleClick = () => {
  if (props.disabled) {
    return false;
  }

  emits('click');
  inputRef.value.focus();
};
const handleMouseDown = () => {
  if (props.disabled) {
    return false;
  }
  emits('mousedown');
};

const handleValidate = async () => {
  if (formItem) {
    const { validate } = formItem;
    await validate();
  }
};
defineExpose({ inputFocus, handleValidate, inputRef });
</script>

<style scoped>
.input-wrapper {
  width: 100%;
  min-height: 40px;
  /* margin-bottom: 16px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: nowrap;
  position: relative;
  border: 1px solid transparent;
}
.input-wrapper:hover {
  border-color: rgba(0, 122, 255, 0.3);
}
.input-wrapper:focus-visible {
  border: transparent;
}

.wrapper-focus {
  border-color: rgba(0, 122, 255, 1);
  box-shadow: rgba(0, 122, 255, 0.3) 0px 0px 0px 2px !important;
}

.cookie-input {
  width: 100%;
  flex: 1 0 0px;
  font-size: 14px;
  border: none;
  background: transparent;
  outline: none;
  transition: all 0.3s ease 0s;
  line-height: 22px;
  text-align: justify;
  padding: 8px 12px 8px 8px;
  border-radius: 8px;
  cursor: pointer;
}
input::-webkit-input-placeholder {
  color: rgba(191, 191, 191, 1);
}

.input-border {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(229, 229, 229, 1);
}

.input-background {
  background-color: #00000008;
}
.disabled {
  cursor: not-allowed;
  user-select: none;
  border: none;
  outline: none;
  /* caret-color: transparent; */
}
</style>
