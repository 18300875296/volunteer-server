<template>
  <div class="bg">
    <div class="error">
      <img
        src="https://static.leetcode.cn/cn-mono-assets/production/assets/404_face.f3f9717f.png"
        class="error_item-image"
      />
      <div class="error_item">
        <div class="error__item-text">
          <h2>页面不存在</h2>
          <p>抱歉！我们找不到您想访问的页面...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.bg {
  background-color: rgba(247, 248, 250, 1);
  height: 595px;
  width: 100%;
  overflow: hidden;
}
.error {
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
  max-width: 1220px;
  margin: 200px auto;
}
.error_item-image {
  width: 270px;
  height: auto;
  display: block;
  margin-right: 20px;
  align-self: center;
}
.error_item {
  display: flex;
  align-items: center;
}
.error__item-text {
}
</style>
