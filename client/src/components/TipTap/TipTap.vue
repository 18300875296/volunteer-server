<template>
  <div class="editor-container">
    <TipTapTitle />
    <TipTapTag />
    <TipTapBar />
    <div class="content-container">
      <div class="editor-content-container-outer">
        <TipTapEditor v-model="content" />
      </div>
      <div class="preView-container-outer">
        <TipTapPreview :content="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, onBeforeUnmount, provide } from 'vue';
import { createTipTap } from './main.ts';
import TipTapTitle from './TipTapTitle.vue';
import TipTapTag from './TipTapTag.vue';
import TipTapEditor from './TipTapEditor.vue';
import TipTapPreview from './TipTapPreview.vue';
import TipTapBar from './TipTapBar.vue';

const content = ref('');
createTipTap();

// const emits = defineEmits(['onClose', 'onSubmit']);
// provide('emits', emits);

// const tipTapStore = useTipTapStore();

// await tipTapStore.getArticleCategories();
// await tipTapStore.getTags();
// const CustomTableCell = TableCell.extend({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       // 添加新的属性
//       backgroundColor: {
//         default: null,
//         parseHTML: (element) => element.getAttribute('data-background-color'),
//         renderHTML: (attributes) => {
//           return {
//             'data-background-color': attributes.backgroundColor,
//             style: `background-color: ${attributes.backgroundColor}`,
//           };
//         },
//       },
//     };
//   },
// });

// 获取TipTap的dom元素进行监听
// const tipTapRoot = editor.view.dom;
// const observer = new MutationObserver((mutations) => {
//   // console.log('dom改变了', mutations[0].addedNodes, mutations[0].removedNodes)
//   const deleteDOM = mutations[0].removedNodes;
//   if (deleteDOM.length) {
//     deleteDOM.forEach((item) => {
//       if (item.nodeName === 'IMG') {
//         const url: string = item.getAttribute('src');
//         const imageUrl = url.split('/').find((char: string) => char.startsWith('image'));
//         const filename = imageUrl.slice(0, imageUrl.indexOf('?'));
//         articleStore.deleteFile(filename);
//       }
//     });
//   }
// });
// // 监听的配置
// const observerConfig = { childList: true };
// // 开启监听
// observer.observe(tipTapRoot, observerConfig);

// onBeforeUnmount(() => {
//   tipTapStore.content = content.value;
//   if (tipTapStore.editor) tipTapStore.editor.destroy();
// });
// const handleInput = () => {
//   articleStore.createArticle.title = title.value;
// };

// onMounted(() => {
//   const articleStore = useArticleStore()
// })
// onBeforeUnmount(() => {
//   console.log('销毁了');
//   articleStore.createArticle.title = '';
//   articleStore.createArticle.content = '';
//   editor.destroy();
//   observer.disconnect();
// });
</script>
<style>
.editor-container {
  width: 100%;
}

.checkbox-container {
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  line-height: 20px;
  cursor: pointer;
  color: rgba(38, 38, 38, 1);
  margin-right: 15px;
}

.checkbox-container:hover {
  border-color: rgba(45, 145, 255, 1);
}

.cancel-btn {
  margin-right: 15px;
  line-height: 20px;
}

.cancel-btn span {
  color: rgba(38, 38, 38, 1);
}

.submit-btn {
  background-color: rgba(45, 181, 93, 1);
  line-height: 20px;
}

.checkbox-container svg {
  margin-right: 8px;
}

.tag-container {
  display: flex;
  flex-flow: row nowrap;
  height: 40px;
  width: 100%;
  padding: 4px 6px;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
}

.content-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: nowrap;
}

.editor-content-container-outer {
  flex: 1;
  border-right: 2px solid rgba(240, 240, 240, 1);
  min-height: 450px;
  position: relative;
}

.editor-content-container-inner {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  overflow: auto;
  padding: 0 10px;
}

.preView-container-outer {
  min-height: 450px;
  position: relative;
  flex: 1;
}

.ProseMirror {
  outline: none;
}

.ProseMirror h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
  margin: 20px 0;
  padding: 0;
}

.ProseMirror p {
  font-size: 16px;
  margin: 8px 0;
  padding: 0;
  text-indent: 4px;
  font-family: Helvetica, arial, sans-serif;
  word-break: break-word;
  text-align: justify;
}

.ProseMirror img {
  width: 270px;
  height: 135px;
}

.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.ProseMirror td,
.ProseMirror th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}

th {
  font-weight: bold;
  text-align: left;
  background-color: #f1f3f5;
}

.selectedCell:after {
  z-index: 2;
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

.column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: -2px;
  width: 4px;
  background-color: #adf;
  pointer-events: none;
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
