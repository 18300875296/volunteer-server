<!--
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-30 16:46:12
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-04 23:27:51
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\TipTap\TipTapBar.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <section class="tag-container">
    <template v-for="(bar, index) in BAR_CONFIG" :key="index">
      <BarItem
        :icon-name="bar.iconName"
        :command="bar.command"
        :title="bar.title"
        :input-type="bar.inputType"
        :mark="bar.mark"
        :attributes="bar.attributes"
        :accept="bar.accept"
        :multiple="bar.multiple"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import BarItem from './BarItem.vue';
import { BAR_CONFIG } from './constant';
</script>
<style scoped>
.tag-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  height: 60px;
}
</style>
