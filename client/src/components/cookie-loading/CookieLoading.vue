<template>
  <div v-show="props.visible" class="loading-mask">
    <div class="loading">
      <svg viewBox="25 25 50 50" class="circle">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
});
</script>
<style scoped>
.loading-mask {
  position: fixed;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.loading {
  width: 50px;
  height: 50px;
}
.circle {
  animation: rotate 2s linear infinite;
}
.circle .path {
  stroke: rgb(10, 132, 255);
  stroke-width: 2px;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
