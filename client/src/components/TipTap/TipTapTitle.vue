<!--
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-09-30 16:45:22
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-09 23:36:10
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\TipTap\TipTapTitle.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <section class="title-container">
    <CookieInput
      v-model="createArticleDTO.title"
      class="title-inp"
      placeholder="请输入标题..."
      type="text"
      :is-border="false"
    />
    <div class="button-group-container">
      <CookieButton type="delete" style="margin-right: 18px" label="取消" @click="showEditor = false" />
      <CookieButton type="submit" label="发布" @click="handleSubmit" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { CookieInput } from '@/components/cookie-input/CookieInput';
import CookieButton from '../cookie-button/CookieButton.vue';
import { useTipTapStore } from '@/store/tiptap';

const { createArticleDTO, submit, showEditor } = useTipTapStore();

const handleSubmit = async () => {
  const { article_id } = await submit();
  if (article_id) useRouter().push({ name: 'article_detail', params: { article_id } });
};
</script>
<style scoped>
.title-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  height: 60px;
}
.title-inp {
  font-size: 16px;
  padding: 10px 0px;
  font-weight: bold;
  border: none;
  background: transparent;
  height: 100%;
  width: 100%;
  margin-right: 10px;
}
.button-group-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-size: 12px;
  height: 20px;
}
</style>
