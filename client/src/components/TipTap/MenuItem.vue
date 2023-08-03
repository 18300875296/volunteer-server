<template>
  <template v-if="props.type == 'color'">
    <button :title="props.title" class="btn-item" @click="handleClickColor" v-html="props.svg"></button>
    <input v-show="false" ref="inputColor" :type="props.type" :value="color" @input="handleInputColor" />
  </template>
  <template v-if="props.type == 'file'">
    <button :title="props.title" class="btn-item" @click="handleClickImage" v-html="props.svg"></button>
    <input
      v-show="false"
      ref="inputImage"
      :type="props.type"
      :value="image"
      accept="image/*"
      multiple
      @change="handleInputImage"
    />
  </template>
  <button v-else :title="props.title" class="btn-item" @click="props.action" v-html="props.svg"></button>
</template>

<script setup lang="ts">
import { defineProps, inject, ref } from 'vue';
import useArticleStore from '../../store/article';

const editor: any = inject('editor');
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
  isActive: {
    type: Function,
    default: null,
  },
  svg: {
    type: String,
    default: '',
  },
  value: {
    type: Function,
    default: () => ({}),
  },
  type: {
    type: String,
    default: '',
  },
});
const image = ref();
const inputImage = ref();
const color = ref();
const inputColor = ref();
const articleStore = useArticleStore();

const handleClickColor = () => {
  inputColor.value.click();
};
const handleInputColor = (e: Event) => {
  props.action(e);
  color.value = editor.getAttributes('textStyle').color;
};
const handleClickImage = () => {
  inputImage.value.click();
};
// const handleImageURL = (imageItem: any) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => resolve(imageList.push(reader.result)))
//     reader.addEventListener('error', () => reject(new Error('could not load image')))
//     reader.readAsDataURL(imageItem) // 转化为base64
//   })
// }
const handleInputImage = async (e: any): Promise<void> => {
  const filesList = e.target.files;
  const form1 = new FormData();
  const form2 = new FormData();
  const { length } = filesList;
  if (length && length < 2) {
    form1.append('file', filesList[0]);
    const url = await articleStore.uploadFile(form1); // 单个文件
    props.action([url]);
  } else {
    [].slice
      .call(filesList)
      .filter(() => filesList.length >= 2)
      .map((item) => form2.append('files', item));
    const urlList = await articleStore.uploadFiles(form2); // 多个文件
    props.action(urlList);
  }
};
</script>

<style scoped>
.btn-item {
  border-radius: 3px;
  line-height: 20px;
  display: inline-flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: transparent;
  font-size: 12px;
  padding: 0;
  width: 20px;
  margin-right: 10px;
}
</style>
