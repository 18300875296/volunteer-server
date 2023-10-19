<template>
  <div id="content-container">
    <section class="article-content-container">{{ props.content }}</section>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});
</script>
<style scoped>
#editor-container {
  width: 100%;
}
.user_info_container {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  height: 32px;
  color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  object-fit: cover;
}
.title {
  color: rgba(0, 0, 0, 1);
  margin-right: 12px;
  max-width: 540px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
}
.article-content-container {
  line-height: 1.75;
  letter-spacing: 0.8px;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.1) 3%, transparent 0),
    linear-gradient(1turn, rgba(50, 0, 0, 0.1) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  overflow-x: hidden;
  padding: 10px;
}

.article-content-container >>> img {
  width: 400px;
  height: 230px;
}
</style>
