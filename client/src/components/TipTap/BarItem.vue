<template>
  <div :class="['btn-item', _isActive ? 'bar-item-selected' : null]">
    <CookieIcon :icon-name="props.iconName" />
    <input
      v-if="!!props.inputType"
      :type="props.inputType"
      class="bar-input-origin"
      :accept="props.accept"
      :multiple="props.multiple"
      @input="executeCommand"
    />
    <span v-else :title="props.title" class="bar-label" @click="executeCommand" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { CookieIcon } from '@/components/cookie-icon/CookieIcon.tsx';
import { injectConfig, COMMAND_CONFIG_SYMBOL, CustomCommandType } from './main';

type InputType = 'color' | 'file' | '';
interface BarPropsType {
  title: string;
  command: CustomCommandType[];
  iconName: string;
  inputType?: InputType;
  mark?: string;
  attributes?: {} | undefined;
  accept?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<BarPropsType>(), {
  inputType: '',
  mark: '',
  attributes: undefined,
  accept: '',
  multiple: false,
});
const _isActive = ref(false);
const { generateCommand, isActive } = injectConfig(COMMAND_CONFIG_SYMBOL);
const executeCommand = (e: Event) => {
  let inputValue = null;
  if (props.inputType !== '') {
    inputValue = e && e.target ? e.target.value : null;
  }
  generateCommand(props.command, inputValue);
  if (props.mark) {
    _isActive.value = isActive(props.mark, props.attributes);
  }
};

// const image = ref();
// const inputImage = ref();
// const color = ref();
// const inputColor = ref();
// const articleStore = useArticleStore();

// const handleClickColor = () => {
//   inputColor.value.click();
// };
// const handleInputColor = (e: Event) => {
//   props.action(e);
//   color.value = editor.getAttributes('textStyle').color;
// };
// const handleClickImage = () => {
//   inputImage.value.click();
// };
// const handleImageURL = (imageItem: any) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => resolve(imageList.push(reader.result)))
//     reader.addEventListener('error', () => reject(new Error('could not load image')))
//     reader.readAsDataURL(imageItem) // 转化为base64
//   })
// }
// const handleInputImage = async (e: any): Promise<void> => {
//   const filesList = e.target.files;
//   const form1 = new FormData();
//   const form2 = new FormData();
//   const { length } = filesList;
//   if (length && length < 2) {
//     form1.append('file', filesList[0]);
//     const url = await articleStore.uploadFile(form1); // 单个文件
//     props.action([url]);
//   } else {
//     [].slice
//       .call(filesList)
//       .filter(() => filesList.length >= 2)
//       .map((item) => form2.append('files', item));
//     const urlList = await articleStore.uploadFiles(form2); // 多个文件
//     props.action(urlList);
//   }
// };
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
  position: relative;
  cursor: pointer;
}
.bar-input-origin,
.bar-label {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
}
.bar-item-selected {
  background-color: aqua;
}
</style>
