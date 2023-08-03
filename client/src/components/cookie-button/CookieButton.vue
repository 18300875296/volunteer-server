<template>
  <button
    class="cookie-button"
    :style="{ backgroundColor: props.background }"
    type="button"
    :class="{
      submit: props.type === 'submit',
      button: props.type === 'button',
      collect: props.type === 'collect',
      delete: props.type === 'delete',
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  background: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.cookie-button {
  border: none;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  font-size: 14px;
  padding: 6px 12px;
  min-width: 80px;
  border-radius: 5px;
}
/* .cookie-button:hover {
} */
.collect {
  background: rgba(0, 122, 255, 0.75);
  color: #ffff;
}
.collect:hover {
  background: rgb(0, 122, 255, 1);
}
.button {
  background: rgba(0, 10, 32, 0.05);
  color: rgba(38, 38, 38, 0.75);
}
.button:hover {
  background-color: rgba(0, 10, 32, 0.1);
}
.submit {
  background-color: #5cb85c;
  color: rgba(255, 255, 255, 1);
}
.submit:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.delete {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
.delete:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.delete:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
}
</style>
