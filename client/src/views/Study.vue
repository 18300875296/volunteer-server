<template>
  <div class="study">
    <!-- swiper -->
    <section class="study-swiper-container">
      <swiper
        :slides-per-view="1"
        :space-between="25"
        :modules="modules"
        :speed="1000"
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }"
      >
        <!-- <template v-for="slide of slidesData" :key="slide.slide_id"> -->
        <swiper-slide>
          <section class="slide_item">
            <div class="slide-content">
              <div class="title">跟着总书记感受雷锋精神的时代内涵与力量</div>
              <div class="description">
                近日，习近平总书记对深入开展学雷锋活动作出重要指示指出，今年是毛泽东等老一辈革命家为雷锋同志题词60周年。
              </div>
              <cookie-button>查看详情</cookie-button>
            </div>
            <img src="../assets/Snipaste_2023-05-19_16-15-57.png" alt="" />
          </section>
        </swiper-slide>
        <swiper-slide
          ><div class="slide_item">
            <img src="../assets/Snipaste_2023-05-19_15-55-35.png" /></div
        ></swiper-slide>
        <swiper-slide
          ><div class="slide_item">
            <img src="../assets/Snipaste_2023-05-19_15-54-09.png" /></div
        ></swiper-slide>
        <!-- </template> -->
      </swiper>
    </section>
    <!-- 内容 -->
    <main class="study-content-container">
      <header class="header">
        <h1 class="header_item-title">学习推荐</h1>
      </header>
      <section class="section-common new">
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
      </section>
      <header class="header">
        <h1 class="header_item-title">培训精选</h1>
      </header>
      <section class="section-common">
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
        <a href="https://study.163.com/course/introduction/1209323832.htm?inLoc=ss_ssjg_qblb_%E5%85%AC%E7%9B%8A">
          <cookie-card class="list_item">
            <template #title>
              <img src="../assets/4b84624d31504778bd1447f091e01c47.png" class="list_item-img" />
            </template>
            <div class="list_item-content">
              <div class="content_item-title">[动“援”武汉]公益线上运动课堂</div>
              <div class="content_item-summary">
                #动“援”武汉，公益线上运动课堂#
                从2月2日开始，大王老师将会开启运动课堂在线教学，和其他老师、热心同学一起成立【爱心动“援”小组】，以此方式为武汉重灾区发起一次特别的援助武汉，公益募捐接力！
                【什么线上运动课堂？】
              </div>
              <div class="content_item-icon">
                <span><img class="icon" src="../assets/views.59a85890.png" />234</span>
              </div>
            </div>
          </cookie-card>
        </a>
      </section>
      <header class="header">
        <h1 class="header_item-title">综合提升</h1>
      </header>
      <section class="section-common">
        <cookie-card class="list_item"></cookie-card>
        <cookie-card class="list_item"></cookie-card>
        <cookie-card class="list_item"></cookie-card>
        <cookie-card class="list_item"></cookie-card>
        <cookie-card class="list_item"></cookie-card>
        <cookie-card class="list_item"></cookie-card>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper';
import { RouterLink } from 'vue-router';
import { SlideData } from '../assets/interface';
import { getSlidesAPI } from '../api/home';
import CookieCard from '../components/cookie-card/CookieCard.vue';
import CookieButton from '../components/cookie-button/CookieButton.vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Autoplay, Pagination];
const slidesData = ref<SlideData[]>([]);
const getSLides = async () => {
  const res = await getSlidesAPI('首页', 5);
  slidesData.value = res.data;
};
onBeforeMount(async () => {
  await getSLides();
});
</script>
<style scoped>
.study {
  height: fit-content;
}
.study-swiper-container {
  min-height: 200px;
  max-height: 280px;
  width: 100%;
  user-select: none;
  overflow: hidden;
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  /* width: 270px;
  height: 135px; */
  object-fit: cover;
}
.slide_item {
  height: 280px;
  width: 100%;
  position: relative;
  background: linear-gradient(198.66deg, rgb(247, 165, 44) 9.99%, rgb(238, 90, 41) 102.35%);
}
.slide_item img {
  height: 280px;
  object-fit: cover;
  transition: all 0.3s ease 0s;
  position: absolute;
  right: 0;
  opacity: 0.7;
}
.slide-content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 66px;
  max-width: 1200px;
  width: 100%;
  padding-left: 15px;
  z-index: 2;
}
.title {
  font-weight: 500;
  font-size: 32px;
  width: 379px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.description {
  width: 379px;
  font-weight: 400;
  font-size: 20px;
  color: rgba(26, 26, 26, 0.75);
  margin: 10px 0px 38px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.study-content-container {
  margin: 0px auto;
  max-width: 1200px;
  min-width: 390px;
  user-select: none;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  margin-top: 24px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header_item-title {
  color: rgba(38, 38, 38, 1);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 0;
  letter-spacing: 1.1px;
}
.section-common {
  margin: 24px auto;
  display: flex;
  flex-flow: row wrap;
}
.section-common:deep(.paragraph) {
  margin: 5px 0 5px 0;
  margin-left: auto;
}
.section-common:deep(.card_item-footer) {
  display: none;
}
.list_item {
  padding: 4px;
  display: flex;
  flex-flow: row nowrap;
  width: 379px;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) 0s;
  margin-right: 16px;
}
.list_item-img {
  width: 68px;
  height: 92px;
  border-radius: 4px;
  margin: 4px;
}
.list_item-content {
  display: flex;
  flex-flow: column nowrap;
  width: 283px;
}
.list_item-content > :not(:last-child) {
  margin-bottom: 4px;
}
.content_item-title {
  line-height: 20px;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content_item-summary {
  line-height: 18px;
  font-size: 12px;
  width: 100%;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(38, 38, 38, 0.75);
}
.content_item-icon {
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(38, 38, 38, 0.75);
}
.content_item-icon .icon {
  height: 14px;
  width: 14px;
  margin-right: 4px;
  vertical-align: text-bottom;
}
</style>
