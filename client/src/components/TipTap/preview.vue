<template>
  <div class="editor-content-container-inner">
    <h1>{{ title }}</h1>
    <div class="preview-content-container" v-html="content"></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import useArticleStore from '../../store/article';

const articleStore = useArticleStore();
// 解构赋值会导致pinia响应式失效使用计算属性
const title = computed(() => articleStore.createArticle.title);
const content = computed(() => articleStore.createArticle.content);
</script>
<style scoped>
.preView-container-inner {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  overflow: auto;
}

.preview-content-container {
  line-height: 1.75;
  letter-spacing: 0.8px;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.15) 3%, transparent 0),
    linear-gradient(1turn, rgba(50, 0, 0, 0.15) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  overflow-x: hidden;
  padding: 10px;
}

.preview-content-container p {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  word-break: break-word;
}

.preview-content-container img {
  width: 270px;
  height: 135px;
}
</style>
