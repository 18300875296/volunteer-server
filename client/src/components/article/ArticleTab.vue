<template>
  <section id="article_tab_container">
    <router-link to="/discuss/interact/hottest" :class="[defaultActive ? 'active' : '', 'hottest']"> 最热 </router-link>
    <router-link to="/discuss/interact/newest" class="newest">最新</router-link>
    <router-link to="/discuss/interact/recommend" class="recommend">推荐</router-link>
    <div class="search-container"><input placeholder="搜索" /></div>
    <cookie-button type="submit" class="publish_btn" @click="handleClickPublish"> 发布文章</cookie-button>
  </section>
</template>
<script setup></script>
<style scoped>
#article_tab_container {
  width: 100%;
  height: 32px;
  margin-bottom: 10px;
  display: flex;
}
.active {
  transition: all 0.4s ease 0s;
  color: rgba(45, 145, 255, 1);
  border-bottom: 2px solid rgba(45, 145, 255, 1);
}
.hottest,
.newest,
.recommend {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  transition: all 0.4s ease 0s;
}
.publish_btn {
  width: 102px;
  height: 100%;
  background-color: rgba(45, 181, 93, 1);
  margin-left: 15px;
}
</style>
