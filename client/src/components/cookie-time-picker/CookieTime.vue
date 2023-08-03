<template>
  <div class="list"></div>
</template>
<script setup lang="ts"></script>
<style scoped>
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
