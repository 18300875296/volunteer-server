<template>
  <div id="editor-container">
    <div class="title-container">
      <CookieInput v-model="title" class="title-inp" placeholder="请输入标题..." type="text" :is-border="false" />
      <div class="button-group-container">
        <!-- <span class="checkbox-container">
          <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
            <path
              d="M768 128 256 128C185.6 128 128 185.6 128 256l0 512c0 70.4 57.6 128 128 128l512 0c70.4 0 128-57.6 128-128L896 256C896 185.6 838.4 128 768 128zM832 768c0 35.2-28.8 64-64 64L256 832c-35.2 0-64-28.8-64-64L192 256c0-35.2 28.8-64 64-64l512 0c35.2 0 64 28.8 64 64L832 768z"
              fill="#2c2c2c"
            ></path>
          </svg>
          匿名
        </span> -->
        <cookie-button type="delete" style="margin-right: 18px" @click="handleCancel">取消</cookie-button>
        <cookie-button type="submit" @click="handleSubmit">发布</cookie-button>
      </div>
    </div>
    <div class="tag-container">
      <CookieSelect>
        <CookieOption></CookieOption>
      </CookieSelect>
    </div>
    <div class="tag-container">
      <MenuBar :editor="editor" />
    </div>
    <div class="content-container">
      <div class="editor-content-container-outer">
        <editor-content :editor="editor" class="editor-content-container-inner"></editor-content>
      </div>
      <div class="preView-container-outer">
        <preview />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, Editor } from '@tiptap/vue-3';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { defineEmits, onBeforeUnmount, ref } from 'vue';
import CookieButton from '../cookie-button/CookieButton.vue';
import useArticleStore from '../../store/article';
import MenuBar from './MenuBar.vue';
import preview from './preview.vue';
import { CookieInput } from '@/components/cookie-input/CookieInput';
import CookieSelect from '@/components/cookie-select/CookieSelect.vue';
import CookieOption from '@/components/cookie-select/CookieOption.vue';

const emits = defineEmits(['onClose', 'onSubmit']);
const title = ref();
const articleStore = useArticleStore();

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      // 添加新的属性
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

const editor = new Editor({
  content: '',
  // `<p>本报讯 (记者 安 娜) 为进一步动员志愿服务组织和志愿者科学有序参与社区疫情防控，北京市委社会工委市民政局日前会同首都文明办、团市委、市志愿服务联合会制定《北京市新冠肺炎疫情社区防控志愿服务工作指引》(以下简称《指引》)。

  // 《指引》指出，社区疫情防控志愿服务内容有核酸检测、社区值守、物资配送、信息管理等。依据志愿者参与流程，社区疫情防控志愿服务可分为三个阶段。首先，在志愿者上岗服务前做好志愿服务计划和动员工作。社区可以依据疫情防控要求进行志愿服务的总体规划，将具体工作任务进行细分，结合社区居民需求和工作要求开发志愿服务岗位，广泛动员社会力量和社区居民参与疫情防控。其次，在志愿服务开展过程中做好志愿者的服务管理工作。社区为志愿者开展岗前培训，提供志愿者安全防护和必要保障，做好志愿者的引导与管理。再次，在志愿服务活动结束后及时进行志愿服务成果转化，总结推广志愿服务成功经验，宣传志愿服务先进典型，营造良好社会氛围。

  // 根据疫情和防控形势，北京市划分了疫情防控封控区、管控区和防范区，《指引》建议，处于不同类型区域的社区在使用、安排志愿者工作时有所侧重。封控区实行“区域封闭、足不出户、服务上门”，建议根据社区需要调配志愿者参与物资配送、防疫消杀等工作，协助社区为老、弱、病、残、孕等群体提供帮助。管控区实行“人不出区、严禁聚集”，建议根据社区需要调配志愿者参与社区值守、核酸检测、协同流调和信息管理等服务，协助社区帮助困难群体开展邻里互助。防范区实行“强化社会面管控，严格限制人员聚集”，建议社区充分储备各类志愿者，建立联络机制，在情况紧急时能招募到足够的志愿者协助社区开展疫情防控工作。</p>
  // `,
  extensions: [
    StarterKit,
    Image,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    CustomTableCell,
    TextStyle,
    Color,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  onCreate({ editor }) {
    articleStore.createArticle.content = editor.getHTML();
  },
  onUpdate({ editor }) {
    articleStore.createArticle.content = editor.getHTML();
  },
});

// 获取TipTap的dom元素进行监听
const tipTapRoot = editor.view.dom;
const observer = new MutationObserver((mutations) => {
  // console.log('dom改变了', mutations[0].addedNodes, mutations[0].removedNodes)
  const deleteDOM = mutations[0].removedNodes;
  if (deleteDOM.length) {
    deleteDOM.forEach((item) => {
      if (item.nodeName === 'IMG') {
        const url: string = item.getAttribute('src');
        const imageUrl = url.split('/').find((char: string) => char.startsWith('image'));
        const filename = imageUrl.slice(0, imageUrl.indexOf('?'));
        articleStore.deleteFile(filename);
      }
    });
  }
});
// 监听的配置
const observerConfig = { childList: true };
// 开启监听
observer.observe(tipTapRoot, observerConfig);

const handleCancel = () => {
  emits('onClose');
};
const handleSubmit = async () => {
  // 校验数据
  emits('onSubmit');
};
// const handleInput = () => {
//   articleStore.createArticle.title = title.value;
// };

// onMounted(() => {
//   const articleStore = useArticleStore()
// })
onBeforeUnmount(() => {
  console.log('销毁了');
  articleStore.createArticle.title = '';
  articleStore.createArticle.content = '';
  editor.destroy();
  observer.disconnect();
});
</script>
<style>
#editor-container {
  width: 100%;
}

.title-container,
.tag-container {
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
