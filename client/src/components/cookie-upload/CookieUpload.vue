<template>
  <div @click="handleClickUpload">
    <input ref="input" type="file" style="display: none" accept="image/*" @change="handleChangeUploadFile" />
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  uploadFn: {
    type: Function,
    default: () => {},
  },
  image: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['change']);
const input = ref();

// 点击触发input 点击事件
const handleClickUpload = () => input.value.click();

// 选择时上传文件
const handleChangeUploadFile = async (event: any) => {
  const formData = new FormData();
  const file = event.target.files[0];
  if (!file) {
    return false;
  }
  formData.append('file', file);
  await props.uploadFn(formData);
  emits('change');
};
</script>
<style scoped></style>
