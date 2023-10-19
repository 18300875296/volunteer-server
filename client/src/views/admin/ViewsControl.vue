<template>
  <div class="views-control">
    <header class="header">
      <h1 class="header_item-title">首页轮播图</h1>
      <cookie-button type="submit" background="rgba(86, 74, 190, 1)" @click="createSlide('首页')">
        新建轮播图
      </cookie-button>
    </header>
    <!-- <cookie-empty :visible="isEmpty"></cookie-empty> -->
    <el-table :data="homeSlide" stripe :border="true" class="table">
      <el-table-column type="index" width="45px" />
      <el-table-column prop="title" label="标题" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="图片" width="150px" header-align="center">
        <template #default="scope">
          <div class="slide-image">
            <img v-if="scope.row.url" :src="scope.row.url" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转路径" width="220px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="place" label="位置" width="100px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.place }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建日期" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template #default="scope">
          <div class="operation">
            <cookie-button type="collect" @click="handleClickOpenDialog(scope.row)">查看</cookie-button>
            <cookie-button type="delete" @click="handleDelete(scope.row.slide_id)">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <header class="header">
      <h1 class="header_item-title">活动轮播图</h1>
      <cookie-button type="submit" background="rgba(86, 74, 190, 1)" @click="createSlide('活动')">
        新建轮播图
      </cookie-button>
    </header>
    <!-- <cookie-empty :visible="isEmpty"></cookie-empty> -->
    <el-table :data="activeSlide" stripe :border="true" class="table">
      <el-table-column type="index" width="45px" />
      <el-table-column prop="title" label="标题" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="图片" width="150px" header-align="center">
        <template #default="scope">
          <div class="slide-image">
            <img v-if="scope.row.url" :src="scope.row.url" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转路径" width="220px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="place" label="位置" width="100px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.place }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建日期" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="operation">
            <cookie-button type="collect" @click="handleClickOpenDialog(scope.row)">查看</cookie-button>
            <cookie-button type="delete" @click="handleDelete(scope.row.slide_id)">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <header class="header">
      <h1 class="header_item-title">团队轮播图</h1>
      <cookie-button type="submit" background="rgba(86, 74, 190, 1)" @click="createSlide('团队')">
        新建轮播图
      </cookie-button>
    </header>
    <!-- <cookie-empty :visible="isEmpty"></cookie-empty> -->
    <el-table :data="teamSlide" stripe :border="true" class="table">
      <el-table-column type="index" width="45px" />
      <el-table-column prop="title" label="标题" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="图片" width="150px" header-align="center">
        <template #default="scope">
          <div class="slide-image">
            <img v-if="scope.row.url" :src="scope.row.url" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转路径" width="220px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="place" label="位置" width="100px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.place }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建日期" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="operation">
            <cookie-button type="collect" @click="handleClickOpenDialog(scope.row)">查看</cookie-button>
            <cookie-button type="delete" @click="handleDelete(scope.row.slide_id)">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <header class="header">
      <h1 class="header_item-title">学习轮播图</h1>
      <cookie-button type="submit" background="rgba(86, 74, 190, 1)" @click="createSlide('学习')">
        新建轮播图
      </cookie-button>
    </header>
    <!-- <cookie-empty :visible="isEmpty"></cookie-empty> -->
    <el-table :data="studySlide" stripe :border="true" class="table">
      <el-table-column type="index" width="45px" />
      <el-table-column prop="title" label="标题" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="图片" width="150px" header-align="center">
        <template #default="scope">
          <div class="slide-image">
            <img v-if="scope.row.url" :src="scope.row.url" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="跳转路径" width="220px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="place" label="位置" width="100px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.place }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建日期" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="operation">
            <cookie-button type="collect" @click="handleClickOpenDialog(scope.row)">查看</cookie-button>
            <cookie-button type="delete" @click="handleDelete(scope.row.slide_id)">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <cookie-dialog :visible="visible" @close="handleClose">
    <template #header>
      <section class="dialog_item-section">
        <span class="dialog__item-title">标题</span>
        <div class="dialog__item-content">
          <cookie-input
            v-if="!slide.title"
            v-model="title"
            placeholder="请输入标题"
            :border="false"
            :transparent="false"
          />
          <template v-else>
            <span v-if="!showTitleInput"> {{ slide.title }}</span>
            <svg v-if="!showTitleInput" viewBox="0 0 1024 1024" @click="openTitleInput">
              <path
                d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                fill="currentColor"
              ></path>
            </svg>
          </template>
          <div class="title-edit">
            <cookie-input v-if="showTitleInput" v-model="title" :border="false" :transparent="false" />
            <cookie-button v-if="showTitleInput" @click="handleConfirm(slide.slide_id, { title })">
              保存
            </cookie-button>
            <cookie-button v-if="showTitleInput" @click="showTitleInput = false"> 取消 </cookie-button>
          </div>
        </div>
      </section>
    </template>
    <template #body>
      <section class="dialog_item-section">
        <span class="dialog__item-title">描述</span>
        <div class="dialog__item-content">
          <cookie-input
            v-if="!slide.description"
            v-model="description"
            placeholder="请输入描述"
            :border="false"
            :transparent="false"
          />
          <template v-else>
            <span v-if="!showDescriptionInput"> {{ slide.description }}</span>
            <svg v-if="!showDescriptionInput" viewBox="0 0 1024 1024" @click="openDescriptionInput">
              <path
                d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                fill="currentColor"
              ></path>
            </svg>
          </template>
          <div class="title-edit">
            <cookie-input v-if="showDescriptionInput" v-model="description" :border="false" :transparent="false" />
            <cookie-button v-if="showDescriptionInput" @click="handleConfirm(slide.slide_id, { description })">
              保存
            </cookie-button>
            <cookie-button v-if="showDescriptionInput" @click="showDescriptionInput = false"> 取消 </cookie-button>
          </div>
        </div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">跳转路径</span>
        <div class="dialog__item-content">
          <cookie-input
            v-if="!slide.link"
            v-model="link"
            placeholder="请输入路径"
            :border="false"
            :transparent="false"
          />
          <template v-else>
            <span v-if="!showLinkInput"> {{ slide.link }}</span>
            <svg v-if="!showLinkInput" viewBox="0 0 1024 1024" @click="openLinkInput">
              <path
                d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                fill="currentColor"
              ></path>
            </svg>
          </template>
          <div class="title-edit">
            <cookie-input v-if="showLinkInput" v-model="link" :border="false" :transparent="false" />
            <cookie-button v-if="showLinkInput" @click=""> 保存 </cookie-button>
            <cookie-button v-if="showLinkInput" @click="showLinkInput = false"> 取消 </cookie-button>
          </div>
        </div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">位置</span>
        <div class="dialog__item-content">
          <span> {{ slide.place }}</span>
        </div>
      </section>
    </template>
    <template #footer>
      <section class="dialog_item-section">
        <span class="dialog__item-title">图片</span>
        <cookie-button v-if="showSave" @click="handleConfirm(slide.slide_id, { url })"> 保存 </cookie-button>
        <div class="dialog__item-content">
          <cookie-upload
            class="image_item-container"
            :upload-fn="updateImage"
            @change="showSubmit ? (showSave = false) : (showSave = true)"
          >
            <img v-if="slide.url" :src="slide.url" class="image_item-img" />
            <div class="image_item-editor">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                <path
                  d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </cookie-upload>
        </div>
        <cookie-button v-if="showSubmit" type="submit" @click="handleSubmit">提交</cookie-button>
      </section>
    </template>
  </cookie-dialog>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeMount, Ref } from 'vue';
import { useRouter } from 'vue-router';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';
import CookieDialog from '../../components/cookie-dialog/CookieDialog.vue';
import CookieInput from '../../components/cookie-input/CookieInput.vue';
import CookieUpload from '../../components/cookie-upload/CookieUpload.vue';
import { SlideData } from '../../assets/interface';
import { uploadFileAPI, deleteFileAPI } from '../../api/discuss';
import { createSlideAPI, getSlidesAPI, deleteSlideAPI, updateSlideAPI } from '../../api/admin';

const homeSlide = ref<SlideData[]>([]);
const activeSlide = ref<SlideData[]>([]);
const teamSlide = ref<SlideData[]>([]);
const studySlide = ref<SlideData[]>([]);
const Slide = {
  slide_id: '',
  title: '',
  description: '',
  url: '',
  place: '',
  link: '',
};
const slide = ref<SlideData>(Slide); // 当前行的数据
const showTitleInput = ref(false); // 控制标题输入框
const showDescriptionInput = ref(false); // 控制描述输入框
const showLinkInput = ref(false); // 控制路径输入框
const showSubmit = ref(false); // 控制提交按钮
const showSave = ref(false); // 图片上传时的保存按钮

const title = ref(''); // 当前标题
const description = ref('');
const url = ref('');
const link = ref('');
// const isEmpty = computed(() => !slideData.value.length);
const visible = ref(false);

const getSlides = async (keyword: string) => {
  const res = await getSlidesAPI(keyword);
  return res.data;
};
// 创建轮播图
const createSlide = (place: string) => {
  showSubmit.value = true;
  visible.value = true;
  slide.value.place = place;
};
// 提交
const handleSubmit = async () => {
  try {
    slide.value.title = title.value;
    slide.value.description = description.value;
    slide.value.link = link.value;
    await createSlideAPI(slide.value);
    visible.value = false;
  } catch (error) {}
};
const handleClickOpenDialog = (row?: any) => {
  visible.value = true;
  // 将数据存入临时变量中
  if (row) {
    slide.value = row;
  }
};
// 打开标题输入框
const openTitleInput = () => {
  showTitleInput.value = true;
  title.value = slide.value.title;
};
// 打开描述输入框
const openDescriptionInput = () => {
  showDescriptionInput.value = true;
  description.value = slide.value.description;
};
// 打开路径输入框
const openLinkInput = () => {
  showLinkInput.value = true;
  link.value = slide.value.url;
};
// 保存
const handleConfirm = async (slide_id: string, field) => {
  try {
    await updateSlideAPI(slide_id, field);
    const key = Object.keys(field)[0];
    if (key === 'title') {
      slide.value.title = title.value;
      showTitleInput.value = false;
      return;
    }
    if (key === 'description') {
      slide.value.description = description.value;
      showDescriptionInput.value = false;
      return;
    }
    if (key === 'url') {
      slide.value.url = url.value;

      return;
    }
  } catch (error) {
    console.log('保存标题失败');
  }
};
// 上传图片
const updateImage = async (file: any) => {
  try {
    const res = await uploadFileAPI(file); // 上传图片
    const image = res.data;
    url.value = image;
    slide.value.url = image;
  } catch (error) {
    console.log('上传图片失败');
  }
};
// 关闭
const handleClose = () => {
  visible.value = false;
  slide.value = Slide; // 重置临时变量
  title.value = ''; // 清除所有的input框中的内容
  description.value = '';
  link.value = '';
  showTitleInput.value = false;
  showLinkInput.value = false;
  showDescriptionInput.value = false;
  showSubmit.value = false;
  showSave.value = false;
};
const handleDelete = async (slide_id: string) => {
  await deleteSlideAPI(slide_id);
};
homeSlide.value = await getSlides('首页');
activeSlide.value = await getSlides('活动');
teamSlide.value = await getSlides('团队');
studySlide.value = await getSlides('学习');
</script>
<style scoped>
:deep(.dialog-title) {
  margin: 0;
}
:deep(.dialog_item-footer) {
  text-align: left;
}
.views-control {
  user-select: none;
  display: flex;
  flex-flow: column nowrap;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 15px 0px 8px; */
  padding-top: 8px;
  margin: 0 24px;
}
.header > :last-child {
  margin-right: 24px;
}
.header_item-title {
  color: rgba(86, 74, 190, 1);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 0;
  letter-spacing: 1.1px;
}
.table {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 24px auto;
  border-radius: 13px;
  padding: 16px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  min-height: 300px;
}
.dialog_item-section {
  display: flex;
  flex-flow: column nowrap;
  width: 450px;
}
.dialog__item-title {
  margin-bottom: 14px;
  user-select: none;
  font-weight: 600;
}
.dialog__item-content {
  margin-bottom: 24px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
}
.dialog__item-content span {
  margin-right: 12px;
  user-select: none;
}
.dialog__item-content svg {
  color: rgba(86, 74, 190, 1);
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.title-edit {
  display: flex;
  flex-flow: row nowrap;
}
.title-edit > :first-child {
  flex: 1;
}
.title-edit > :not(:first-child) {
  flex-shrink: 0;
  margin-left: 16px;
}
.image_item-container {
  width: 450px;
  height: 200px;
  position: relative;
}
.image_item-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.image_item-editor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  border-radius: 10px;
  background-color: rgb(193, 187, 246);
  cursor: pointer;
}

.title {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.slide-title {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  display: flex;
  line-height: 45px;
  min-height: 45px;
}
.row_item-text {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: rgba(33, 40, 53, 0.75);
  font-size: 14px;
  align-items: center;
}
.operation {
  display: flex;
  flex-flow: row nowrap;
}
.operation > :first-child {
  margin-right: 12px;
}
.slide-image {
  height: 50px;
  cursor: pointer;
}
.slide-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.logo-upload {
  width: 350px;
  height: 200px;
  cursor: pointer;
  background-color: rgba(0, 10, 32, 0.05);
}
.logo-upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dialog-title {
  color: #595959;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0.4em;
  padding: 0;
  word-wrap: break-word;
}
</style>
../../api/article
