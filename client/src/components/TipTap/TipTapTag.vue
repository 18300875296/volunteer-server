<!--
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-30 16:45:38
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-10 22:47:12
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\TipTap\TipTapTag.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <section class="tag-container">
    <CookieSelect v-model="createArticleDTO.category" :placeholder="placeholder">
      <template v-for="category of categories" :key="category.category_id">
        <CookieOption :label="category.displayName" :value="category.categoryName" />
      </template>
    </CookieSelect>
    <CookieCheckboxGroup v-model="createArticleDTO.tags">
      <template v-for="tag of tags" :key="tag.tag_id">
        <CookieCheckButton :label="tag.displayName" :value="tag.tagName" />
      </template>
    </CookieCheckboxGroup>
  </section>
</template>
<script setup lang="ts">
import { CookieOption, CookieSelect } from '@/components/cookie-select/index';
import { CookieCheckboxGroup, CookieCheckButton } from '@/components/cookie-checkbox/index';
import { useTipTapStore } from '@/store/tiptap';

const { tags, categories, createArticleDTO } = useTipTapStore();
const placeholder = '请选择文章分类';
</script>
<style scoped>
.tag-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  height: 60px;
  width: 100%;
  gap: 15px;
}
</style>
