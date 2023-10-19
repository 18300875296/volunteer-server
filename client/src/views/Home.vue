<template>
  <div class="home-wrapper">
    <main class="home-main">
      <HomeHeader />
      <HomeBody />
    </main>
    <aside class="home-aside">
      <Search v-model="searchValue" :placeholder="'搜索志愿活动、志愿团体、用户...'" />
      <section class="aside_item-slide">
        <swiper :slides-per-view="1" :space-between="50" :modules="modules" :speed="1000" :autoplay="{ delay: 3000 }">
          <template v-for="slide of slidesData" :key="slide.slide_id">
            <swiper-slide><img :src="slide.url" /></swiper-slide>
          </template>
        </swiper>
      </section>
      <section class="aside_item-active">
        <img src="http://127.0.0.1:9000/article/image_1682686732281_518.jpg" alt="" />
      </section>
      <cookie-card class="aside_item-action">
        <template #title>
          <router-link to="#" class="action_item">
            <svg
              t="1682838799604"
              class="action_item-icon1"
              viewBox="0 0 1041 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5878"
              width="1em"
              height="1em"
            >
              <path
                d="M813.124267 211.968c0-41.5232-30.498133-75.434667-68.096-75.434667h-529.408c-37.546667 0-68.096 33.7408-68.096 75.349334v600.234666c0 41.745067 30.481067 75.349333 68.096 75.349334h529.408c37.546667 0 68.096-33.774933 68.096-75.434667v-99.0208a51.2 51.2 0 0 0-51.2 51.2v47.837867c0 14.4384-8.823467 24.2176-16.896 24.2176h-529.408c-8.157867 0-16.896-9.659733-16.896-24.149334v-600.234666c0-14.404267 8.823467-24.149333 16.896-24.149334h529.408c8.021333 0 16.896 9.8304 16.896 24.234667v121.856a51.2 51.2 0 0 0 51.2 51.2V211.968z"
                fill="#ffffff"
                p-id="5879"
              ></path>
              <path d="M284.0576 324.266667l375.466667 0 0 51.2-375.466667 0 0-51.2Z" fill="#ffffff" p-id="5880"></path>
              <path d="M284.0576 477.866667l238.933333 0 0 51.2-238.933333 0 0-51.2Z" fill="#ffffff" p-id="5881"></path>
              <path d="M284.0576 631.466667l238.933333 0 0 51.2-238.933333 0 0-51.2Z" fill="#ffffff" p-id="5882"></path>
              <path
                d="M955.665067 425.147733L708.317867 632.712533l-46.813867 5.7344 13.8752-44.936533 247.381333-207.581867 32.904534 39.2192z m-10.1376-91.733333a25.6 25.6 0 0 0-36.061867-3.157333l-272.776533 228.864a25.6 25.6 0 0 0-8.004267 12.066133l-17.749333 57.463467c-11.042133 35.771733 14.250667 65.8432 51.336533 61.2864l59.818667-7.338667a25.6 25.6 0 0 0 13.329066-5.802667l272.776534-228.864a25.6 25.6 0 0 0 3.157333-36.078933l-65.826133-78.4384z"
                fill="#ffffff"
                p-id="5883"
              ></path>
            </svg>
            发布文章</router-link
          >
          <router-link to="#" class="action_item">
            <svg
              t="1682840942904"
              class="action_item-icon2"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11190"
              width="1em"
              height="1em"
            >
              <path
                d="M924.3 245s12.5 139.2-95.7 274c-49.7 62-109.7 89.8-152.9 106.5 0 0 155.6 37.4 236.5-131S924.3 245 924.3 245z"
                fill="#ffffff"
                p-id="11191"
              ></path>
              <path
                d="M690.6 958.7c-2.6 0-5.3-0.9-7.5-2.6-5.2-4.1-6.1-11.7-1.9-16.9 0.7-0.9 68.1-87.5 29.4-150.8-37.3-61.1-12-86.9-9-89.6l16.2 17.8 0.4-0.4c-0.1 0.2-13.7 16 12.9 59.6 19.9 32.6 20.7 74 2.1 119.9-13.5 33.4-32.4 57.5-33.2 58.5-2.3 3-5.8 4.5-9.4 4.5zM333.4 982.1c-2.5 0-5-0.8-7.1-2.3-5.4-3.9-6.5-11.5-2.6-16.8 0.7-0.9 66.3-92.3 29.3-161.8-33.1-62.3-11.7-98.6-10.8-100.2 3.5-5.7 10.9-7.5 16.6-4 5.6 3.4 7.4 10.7 4.1 16.4-0.8 1.4-14.6 27.6 11.4 76.5 18.4 34.7 18.8 78.3 0.9 126.1-13.1 35.2-31.3 60.2-32.1 61.2-2.4 3.2-6 4.9-9.7 4.9zM827.3 607c-2.1 0-4.1-0.8-5.7-2.4l-25.4-25.4c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l25.4 25.4c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM786.5 625c-2.1 0-4.1-0.8-5.7-2.4l-18.5-18.5c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l18.5 18.5c3.1 3.1 3.1 8.2 0 11.4-1.6 1.7-3.7 2.4-5.7 2.4zM751.1 647.1c-2.1 0-4.1-0.8-5.7-2.4l-23.2-23.3c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l23.2 23.3c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM859.4 582.2c-2.1 0-4.1-0.8-5.7-2.4l-29.6-29.6c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l29.6 29.6c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.6 2.4-5.7 2.4zM882.2 546.8c-2.1 0-4.1-0.8-5.7-2.4L849 516.9c-3.1-3.1-3.1-8.2 0-11.4s8.2-3.1 11.4 0l27.5 27.5c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM908 516.4c-2.1 0-4.1-0.8-5.7-2.4l-27.9-27.9c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l27.9 27.9c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.6 2.4-5.7 2.4zM924 472.8c-2.1 0-4.1-0.8-5.7-2.4L894.8 447c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l23.5 23.5c3.1 3.1 3.1 8.2 0 11.4-1.6 1.5-3.7 2.3-5.7 2.3zM938.9 429.2c-2.1 0-4.1-0.8-5.7-2.4l-22-22c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l22 22c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM947.9 387.3c-2.1 0-4.1-0.8-5.7-2.4L920 362.7c-3.1-3.1-3.1-8.2 0-11.4s8.2-3.1 11.4 0l22.3 22.3c3.1 3.1 3.1 8.2 0 11.4-1.7 1.6-3.7 2.3-5.8 2.3z"
                fill="#ffffff"
                p-id="11192"
              ></path>
              <path
                d="M762.6 647.9c-1.7-5.2-3.4-10.3-4.9-14.4-7.4 3.4-15.2 7.7-24.2 3.9 4.6 12.4 14.8 41.2 11.3 47.1-2.6 4.4-26.9 8.8-47.4 8.8-15 0-28-2.3-28.9-8.8-1.3-8.9 8.1-30.7 17.6-47.8-7.5-2.6-13.6-7.6-21.3-11.2-1.4 2.5-2.8 5.1-4.2 8-18.5 36.4-16.6 49.6-15.8 54.5 0.9 6.1 5.3 20.8 26.9 26.5 7 1.8 15.7 2.8 25.9 2.8 11.2 0 23.9-1.1 34.8-3.1 18.4-3.4 28-8.4 33.4-17.4 5.7-10.4 5-23.2-3.2-48.9zM407 643.9c-1-3-2-5.8-3-8.6-7.7 2.9-15 5.8-23.2 6.7 5.5 15.3 12.3 36.5 9.1 41.7-3 4.8-30.8 9.6-54.3 9.6-17.2 0-32.1-2.6-33.1-9.6-1.1-7.3 4.6-22.4 12-37.5-8.5-0.4-16.7-1.8-23.9-5.8-14.4 30.5-12.6 42.3-11.9 47 4.6 30.1 44 30.1 57 30.1 12.6 0 26.8-1.2 39-3.4 20.1-3.5 30.1-8.5 35.8-17.7 6.7-10.9 5.8-24.7-3.5-52.5z"
                fill="#ffffff"
                p-id="11193"
              ></path>
              <path
                d="M437.5 611.5c-33.6 14.4-67.3 21.1-99.9 21.1-117 0-218.9-86.4-243.8-213.9-20.8-107.1 12.3-214.6 81.8-282.6C225.1 87.8 285.1 66 344.4 66c81.4 0 161.5 41.1 211.1 110.8 5.4-7.1 9.3-14.5 14.3-21.3-14.3-18.8-31-35.9-49.9-51.1-50.5-40.3-112.8-62.5-175.5-62.5V66 41.9c-69.9 0-134.1 26.6-185.6 77-76.6 74.9-110.6 191.6-88.5 304.4 13.2 67.5 46.1 125.7 95.2 168.4 48.3 41.9 109.4 65 172.2 65 36.9 0 73.7-7.8 109.4-23 37.3-16 70.1-39.9 97.2-69.2-4.2-7-7.6-15.1-11.6-23.2-26.1 30-58.2 54.4-95.2 70.2z"
                fill="#ffffff"
                p-id="11194"
              ></path>
              <path
                d="M701.1 128.3c98.9 0 200.3 65.9 226.9 163.6 24.7 91-7.2 197.6-73.5 265.8-38.1 39.2-89.6 64.9-145.8 64.9-3.3 0-6.7-0.1-10.1-0.3-88.4-4.8-152.2-58.6-178.1-138.3-23.5-72.1-25.2-153.4-2.8-226.1 7.5-24.5 18.8-45 33.4-62 40.2-47 94.7-67.6 150-67.6m0-24v24.1-24.1c-66.6 0-126.4 27-168.4 76.1-17 19.9-29.8 43.6-38.1 70.6-23.6 76.7-22.6 162.2 2.9 240.6 29.8 91.8 104.5 149.7 199.7 154.9 3.8 0.2 7.6 0.3 11.4 0.3 59.9 0 117.8-25.7 163.1-72.2 73.9-76 105.8-192.1 79.5-288.9-14.1-51.7-48.1-98.5-95.8-131.9-45.6-32-100.4-49.5-154.3-49.5zM154.1 262.2c-0.8 0-1.7-0.1-2.5-0.3-6.5-1.4-10.6-7.8-9.3-14.3 8.6-40.1 54-91.7 56-93.9 4.4-5 12-5.4 17-1s5.4 12 1 17c-0.4 0.5-43.2 49-50.4 82.9-1.3 5.7-6.3 9.6-11.8 9.6z"
                fill="#ffffff"
                p-id="11195"
              ></path>
              <path
                d="M138.5 309.4c-0.7 0-1.3-0.1-2-0.2-6.6-1.1-11-7.3-9.9-13.9l2.5-14.8c1.1-6.6 7.3-11 13.9-9.9 6.6 1.1 11 7.3 9.9 13.9l-2.5 14.8c-1 6-6.1 10.1-11.9 10.1z"
                fill="#ffffff"
                p-id="11196"
              ></path>
            </svg>
            参与活动</router-link
          >
        </template>
      </cookie-card>
      <cookie-card class="aside_item-article-hot">
        <template #title>
          <div class="article-hot-title">热门文章</div>
        </template>
        <template v-for="(article, index) of hottestList" :key="article.article_id">
          <div class="article-hot-li">
            <div class="li_item-index">{{ index + 1 }}</div>
            <div class="li_item-content">
              <router-link :to="`/discuss/${article.article_id}`" class="li__item-paragraph">
                <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                <span class="">{{ article.title }}</span>
                <img src="../assets/new.77389df8.png" />
              </router-link>
              <div class="li__item-summary">{{ article.summary }}</div>
            </div>
          </div>
        </template>
      </cookie-card>
      <cookie-card class="aside_item-article-hot">
        <template #title>
          <div class="article-hot-title">热门活动</div>
          <template v-for="(article, index) of hottestList" :key="article.article_id">
            <div class="article-hot-li">
              <div class="li_item-index">{{ index }}</div>
              <div class="li_item-content">
                <router-link :to="`/discuss/${article.article_id}`" class="li__item-paragraph">
                  <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                  <span class="">{{ article.content }}</span>
                  <img src="../assets/new.77389df8.png" />
                </router-link>
                <div class="li__item-summary">{{ article.summary }}</div>
              </div>
            </div>
          </template>
        </template>
      </cookie-card>
    </aside>
    <teleport to="body">
      <transition>
        <Login :show-login-dialog="showLoginDialog" @close="showLoginDialog = false" />
      </transition>
    </teleport>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, onMounted, nextTick, computed } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import { Article, SlideData, Team } from '../assets/interface';

import CookieCard from '../components/cookie-card/CookieCard.vue';
import { Search } from '@/components/common/search/Search.tsx';
import Login from '@/components/common/Login.vue';
import { getSlidesAPI } from '../api/home';
import HomeHeader from '@/components/home/HomeHeader.vue';
import HomeBody from '@/components/home/HomeBody.vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import useUserStore from '@/store/user';
// 从app页面传入
const props = defineProps({
  showLogin: {
    type: Boolean,
    default: false,
  },
});
const showLoginDialog = computed(() => {
  if (useUserStore().showLoginDialog || props.showLogin) return true;
  return false;
});
const searchValue = ref();
// watch(
//   () => props.showLogin,
//   (payload) => {
//     showLoginDialog.value = !payload[0];
//     if (payload[1] === true) showLoginDialog.value = true;
//   },
//   { immediate: true },
// );
const slidesData = ref<SlideData[]>([]);
const modules = [Autoplay];
// const onSwiper = (swiper) => {
//   console.log(swiper);
// };
// const onSlideChange = () => {
//   console.log('slide change');
// };
const getSLides = async () => {
  const res = await getSlidesAPI('首页', 5);
  slidesData.value = res.data;
};

// --------获取用户数据---------------
const getUserInfo = async () => {
  const userStore = useUserStore();
  await userStore.getUserInfo();
};

onMounted(async () => {
  await nextTick();
  await getUserInfo();
});
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
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
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/**------------------------------------------------------------------------- */

.home-wrapper {
  max-width: 1000px;
  display: flex;
  justify-content: center;
  margin: 15px auto 0;
}
.home-main {
  display: flex;
  flex-flow: column wrap;
  flex: 1;
}
.home-aside {
  width: 256px;
  min-height: 400px;
  margin-left: 10px;
  user-select: none;
}
.home-aside > :not(:last-child) {
  margin-bottom: 12px;
}
/**------------------------------------------------------------------------- */

.icon_item {
  width: 16px;
  height: 16px;
}
.icon_item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* ************************************************* */
.main_item-content {
  margin: 15px 0;
  width: 750px;
  min-height: 600px;
  position: relative;
}

.content_item-title {
  display: flex;
  align-items: center;
  height: 22px;
}
.title-icon {
  margin-right: 8px;
}
.title-text {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 1);
  letter-spacing: 1.1px;
}
.title-more {
  font-size: 12px;
  line-height: 17px;
  color: rgba(60, 60, 67, 0.6);
  position: absolute;
  right: 0;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
}
.content_item-team {
  display: flex;
  justify-content: space-around;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 16px 0;
}

.team_item-image {
  width: 42px;
  height: 42px;
  margin-bottom: 8px;
  min-height: 42px;
  border-radius: 5px;
  object-fit: contain;
}
.team_item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team_item {
  width: 160px;
  height: 166px;
}
.team_item :deep(.card_item-footer) {
  margin-top: 16px;
  height: 28px;
}
.main_item-content :deep(.paragraph) {
  margin: 0;
}
/* .main_item-content :deep(.card_item-footer) {
  height: 0;
} */
.team_item-title {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-height: 24px;
  position: relative;
}
.team_item-name {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 1);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.team_item-hot {
  font-size: 12px;
  line-height: 18px;
  color: rgba(60, 60, 67, 0.6);
}
.team_item-application {
  font-size: 12px;
  line-height: 18px;
  width: 136px;
  padding: 4px 11px;
  /* margin-top: 16px; */
  color: rgba(10, 132, 255, 1);
  background: rgba(0, 122, 255, 0.08);
  border-radius: 7px;
  transition: all 0.4s ease 0s;
  display: flex;
  align-items: center;
  user-select: none;
}
.team_item-application:hover {
  background-color: rgba(0, 122, 255, 0.3);
}
.team_item-application > svg {
  margin-right: 6px;
}
/* ******************************************************* */
.article {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.article_item-cover {
  width: 200px;
  height: 120px;
  margin-right: 16px;
}
.article_item-cover img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 13px;
}
.article_item-content {
  display: flex;
  flex-flow: nowrap;
  padding: 16px 0;
  flex-direction: column;
  overflow: hidden;
}
.article-divider {
  border-top: solid 1px rgba(0, 10, 32, 0.08);
  width: 734px;
  margin-left: -16px;
}
.article__item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}
.title_item-content {
  height: 22px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.title__item-icon {
  height: 22px;
  width: 22px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
}
.title__item-span {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 0.75);
  margin-right: 5px;
}
.title__item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  transition: all 0.3s;
  display: block;
}
.title_item-time {
  font-size: 12px;
  line-height: 18px;
  color: rgba(223, 223, 223, 1);
  flex: 0 0 auto;
  margin-left: 25px;
}
.article__item-content {
  margin: 16px 0 18px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-align: left;
  color: rgba(60, 60, 67, 0.6);
  cursor: pointer;
}
.article__item-tags {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
}
.tag_item {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 161, 22, 1);
  background: rgba(255, 161, 22, 0.15);
  height: 24px;
  line-height: 20px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 10px;
  white-space: nowrap;
  max-width: 120px;
  display: flex;
  align-items: center;
}
.tag_item > svg {
  margin-right: 5px;
}
/***************************************************** */

.aside_item-slide {
  height: 128px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
  border-radius: 8px;
}
.aside_item-slide img,
.aside_item-active img {
  width: 256px;
  height: 128px;
  object-fit: cover;
  border-radius: 8px;
}
.aside_item-action {
  height: 68px;
}

.aside_item-action :deep(.card_item-footer) {
  display: none;
}
.aside_item-action :deep(.card_item-body) {
  display: none;
}
.action_item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.action_item:hover {
  color: transparent;
}
.action_item:first-child {
  color: rgba(10, 132, 255, 0.8);
}

.action_item:last-child {
  color: rgba(255, 161, 22, 0.8);
}
.action_item svg {
  font-size: 36px;
  border-radius: 50%;
  margin-right: 5px;
  padding: 8px;
}
.action_item-icon1 {
  background-color: rgba(10, 132, 255, 0.8);
}
.action_item-icon2 {
  background-color: rgba(255, 161, 22, 0.8);
}
/* *************************************** */
.aside_item-article-hot :deep(.paragraph) {
  margin: 10px 0 0 0;
}
.aside_item-article-hot :deep(.card_item-footer) {
  display: none;
}
.article-hot-title {
  font-size: 14px;
  color: rgba(38, 38, 38, 0.75);
  line-height: 20px;
}
.article-hot-li {
  margin-bottom: 4px;
  display: flex;
  padding: 6px 0px;
  transition: all 0.3s ease 0s;
  /* align-items: center; */
}
.article-hot-li:hover {
  background-color: rgba(247, 247, 248, 1);
}
.li_item-index {
  color: rgba(255, 161, 22, 1);
  color: rgba(60, 60, 67, 0.3);
  font-size: 14px;
  line-height: 20px;
  min-width: 10px;
  font-weight: 700;
  margin-right: 8px;
  font-style: italic;
}
.li_item-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  overflow: hidden;
}
.li__item-summary {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  color: rgba(60, 60, 67, 0.3);
  margin-top: 2px;
  text-indent: 4px;
}
.li__item-paragraph {
  line-height: 22px;
  height: 22px;
  display: flex;
  align-items: center;
}
.li__item-paragraph > :first-child {
  width: 22px;
  height: 22px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
.li__item-paragraph span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.li__item-paragraph > :last-child {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
}

.more-loading-btn {
  margin: 20px auto;
  border: none;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  font-size: 14px;
  padding: 6px 12px;
  width: 208px;
  border-radius: 5px;
  background: rgba(0, 10, 32, 0.05);
  color: rgba(38, 38, 38, 0.75);
}
.more-loading-btn:hover {
  background-color: rgba(0, 10, 32, 0.1);
}
</style>
../api/article
