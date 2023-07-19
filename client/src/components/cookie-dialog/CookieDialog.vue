<template>
  <div v-if="props.visible" class="dialog-bg">
    <Transition name="fade" mode="out-in">
      <div class="dialog-container">
        <div class="dialog-content">
          <div class="dialog-title">
            <slot name="header"></slot>
          </div>
          <slot name="body"></slot>
          <div class="dialog_item-footer"><slot name="footer"></slot></div>
        </div>
        <div class="close-btn" @click="handleClose">
          <svg viewBox="0 0 1024 1024" width="24" height="24">
            <path
              d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
              fill="#e6e6e6"
            ></path>
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onBeforeUnmount } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['close', 'destroy']);
const handleClose = () => {
  emits('close');
};
onBeforeUnmount(() => {
  // 组件销毁时的逻辑
  console.log('组件销毁');
});
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
*,
body,
ul {
  margin: 0;
  padding: 0;
}
.dialog-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-container {
  display: flex;
  flex-direction: column;
  /* width: 384px;
  height: 537.81px; */
  min-width: 300px;
  /* min-height: 200px; */
  padding: 0px;
  position: relative;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 1);
}

.dialog-content {
  /* max-width: 384px; */
  padding: 1.5em 1em 1em;
  position: relative;
  z-index: 0;
  height: 100%;
  color: rgba(33, 40, 53, 0.75);
  font-size: 14px;
  font-weight: 500;
}

.dialog-title {
  width: 100%;
  /* height: 56px; */
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-start;
  /* justify-content: center; */
  align-items: center;
  user-select: none;
}

.close-btn {
  height: 24px;
  top: -8px;
  right: -26px;
  position: absolute;
  opacity: 0.5;
  cursor: pointer;
  user-select: none;
}
.dialog_item-footer {
  width: 100%;
  margin-top: 8px;
  text-align: right;
}
</style>
