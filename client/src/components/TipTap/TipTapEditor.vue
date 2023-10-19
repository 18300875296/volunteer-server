<!--
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-09-29 21:18:01
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-09 23:40:29
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\TipTap\TipTapEditor.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<script setup lang="ts">
import { watch } from 'vue';
import { EditorContent } from '@tiptap/vue-3';
import { EDITOR_SYMBOL, injectConfig } from './main';
import { useTipTapStore } from '@/store/tiptap';

const editor = injectConfig(EDITOR_SYMBOL);
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
editor.on('update', ({ editor }) => {
  useTipTapStore().content = editor.getHTML();
  emits('update:modelValue', editor.getHTML());
});

// 开启监听
watch(
  () => props.modelValue,
  (value) => {
    if (!editor) return;
    const isSame = editor.getHTML() === value;
    if (!isSame) editor.commands.setContent(value, false);
  },
);
</script>
<template>
  <EditorContent :editor="editor" class="editor-content-container-inner" />
</template>
<style scoped>
.editor-content-container-inner {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  overflow: auto;
  padding: 0 10px;
  user-select: none;
}
</style>
