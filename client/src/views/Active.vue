<template>
  <div class="active-container">
    <main class="active-main">
      <div class="main_item-slide">
        <header class="header">
          <h1 class="header_item-title">活动推荐</h1>
          <div class="btn-group">
            <button class="slide_btn-left">
              <svg viewBox="0 0 1024 1024" width="16" height="16">
                <path
                  d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button class="slide_btn-right">
              <svg viewBox="0 0 1024 1024" width="16" height="16">
                <path
                  d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </header>

        <section class="slide_item-content">
          <swiper
            :slides-per-view="3"
            :space-between="25"
            :modules="modules"
            :speed="1000"
            :autoplay="{ delay: 3000 }"
            :pagination="{ clickable: true }"
            :navigation="{
              nextEl: '.slide_btn-right',
              preEl: '.slide_btn-left',
            }"
          >
            <template v-for="slide of slidesData" :key="slide.slide_id">
              <swiper-slide><img :src="slide.url" /></swiper-slide>
            </template>
          </swiper>
        </section>
      </div>
      <div class="main_item-study">
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
              </div>
            </cookie-card>
          </a>
        </section>
      </div>
      <div class="gap-line"></div>
      <div class="main_item-nav">
        <cookie-button>项目区域</cookie-button>
        <cookie-button>服务类别</cookie-button>
        <cookie-button>服务状态</cookie-button>
        <cookie-button>服务对象</cookie-button>
        <cookie-button>项目人数</cookie-button>
        <cookie-button type="submit" @click="handlePublish">发布活动</cookie-button>
      </div>
      <div class="main_item-actives">
        <template v-for="active in activesData" :key="active.active_id">
          <cookie-card class="card-active" @click="openActiveDetail(active.active_id)">
            <template #title>
              <img src="../assets/0004.4cf6001.png" class="active_item-cover" />
              <div class="active_item-tag">{{ active.status }}</div>
            </template>
            <template #default>
              <h2 class="active_item-name">{{ active.active_name }}</h2>
              <div class="active_item-tags">
                <div class="tag_item">天津</div>
              </div>
              <div class="active_item-info">
                <div class="info_item">
                  捐募人数<span>{{ active.peoples }} </span> 人
                </div>
                <div class="info_item">
                  报名人数<span>{{ active.application_count }}</span> 人
                </div>
              </div>
              <div class="active_item-action">
                <cookie-button type="collect">收藏</cookie-button>
                <cookie-button type="submit">查看</cookie-button>
              </div>
            </template>
            <template #footer>
              <div class="active_item-progressbar"></div>
              <div class="active_item-footer">
                <div>项目进度:<span>0%</span></div>
                <div>报名时间:<span>21天</span></div>
              </div>
            </template>
          </cookie-card>
        </template>
      </div>
    </main>
    <!-- 侧边栏 -->
    <aside class="active-aside">
      <cookie-card class="aside_item calendar">
        <template #title>
          <div class="article-hot-title">每日活动</div>
        </template>
        <cookie-calendar :show-last-year="false" :show-year="false" :show-next-year="false"></cookie-calendar>
      </cookie-card>
      <cookie-card class="aside_item">
        <template #title>
          <div class="article-hot-title">热门活动</div>
        </template>
        <template v-for="(article, index) of hottestList" :key="article.article_id">
          <div class="article-hot-li">
            <div class="li_item-index">{{ index }}</div>
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
      <cookie-card class="aside_item hot-team-active">
        <template #title>
          <div class="article-hot-title">热门团队活动</div>
        </template>
        <cookie-input placeholder="请输入团队名称..." :border="false" class="aside_item-input">
          <template #icon>
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path
                d="M912.072815 946.738335c-4.78498 0-9.56996-1.824555-13.220093-5.475711L650.662083 693.076078c-0.285502-0.285502-0.561795-0.579191-0.827855-0.883113l-6.979972-7.948019c-6.671956-7.594979-6.096858-19.11843 1.297552-26.012444 32.130791-29.958312 57.424874-65.413825 75.181283-105.379049 18.374486-41.35692 27.691689-85.472674 27.691689-131.122363 0-86.355787-33.628912-167.542854-94.691639-228.604558-61.062727-61.062727-142.249795-94.691639-228.604558-94.691639s-167.541831 33.628912-228.604558 94.691639c-61.062727 61.062727-94.691639 142.249795-94.691639 228.604558s33.628912 167.542854 94.691639 228.604558c61.062727 61.062727 142.249795 94.691639 228.604558 94.691639 26.15059 0 52.16508-3.130294 77.326133-9.301853 5.090948-1.353834 73.4038-19.189038 120.842229-14.809287 10.282181 0.948605 17.847483 10.05296 16.899902 20.335141s-10.047844 17.853623-20.335141 16.899902c-41.659819-3.845585-107.272165 13.571087-107.930151 13.747095-0.125867 0.033769-0.251733 0.065492-0.3776 0.097214-28.132734 6.91755-57.20998 10.425444-86.425372 10.425444-48.684816 0-95.922676-9.538237-140.402727-28.352745-42.953278-18.166755-81.523735-44.172035-114.644063-77.290317-33.119305-33.119305-59.123562-71.691809-77.29134-114.644063-18.813484-44.479027-28.352745-91.716888-28.352745-140.401704s9.53926-95.922676 28.352745-140.402727c18.167778-42.953278 44.172035-81.524758 77.29134-114.644063 33.119305-33.119305 71.690786-59.123562 114.644063-77.29134 44.480051-18.813484 91.717911-28.352745 140.402727-28.352745s95.922676 9.53926 140.401704 28.352745c42.953278 18.167778 81.524758 44.173059 114.644063 77.29134 33.118282 33.119305 59.123562 71.690786 77.29134 114.644063 18.813484 44.480051 28.351722 91.717911 28.351722 140.402727 0 50.912553-10.399861 100.136651-30.91101 146.305157-17.285688 38.906102-40.96704 73.973782-70.526263 104.47547l242.313791 242.310721c7.302313 7.30129 7.302313 19.138896 0.001023 26.440186C921.642774 944.912757 916.857794 946.738335 912.072815 946.738335z"
                fill="currentColor"
              ></path>
              <path
                d="M165.576059 421.887656c-0.696872 0-1.400906-0.038886-2.110057-0.118704-10.260691-1.152243-17.645892-10.404977-16.493649-20.666692 4.838192-43.080168 17.974373-83.934644 39.046295-121.429607 5.058203-9.002025 16.457834-12.19781 25.458835-7.139607 9.002025 5.058203 12.19781 16.45681 7.139607 25.458835-18.605753 33.108049-30.207999 69.202105-34.484396 107.282399C183.060269 414.827867 174.967964 421.887656 165.576059 421.887656z"
                fill="currentColor"
              ></path>
            </svg>
          </template>
        </cookie-input>
        <section class="hot-team-active-content">
          <div class="hot-team-active_item"><span>天津商业大学</span><span class="tag_item-count">213</span></div>
          <div class="hot-team-active_item"><span>天津</span><span class="tag_item-count">213</span></div>
          <div class="hot-team-active_item"><span>天津</span><span class="tag_item-count">213</span></div>
          <div class="hot-team-active_item"><span>商业大学</span><span class="tag_item-count">213</span></div>
          <div class="hot-team-active_item"><span>天津</span><span class="tag_item-count">213</span></div>
          <div class="hot-team-active_item"><span>商业</span><span class="tag_item-count">213</span></div>
          <div class="hot-team-active_item"><span>天津商业大学</span><span class="tag_item-count">213</span></div>
        </section>
      </cookie-card>
    </aside>
    <cookie-dialog :visible="visible" @close="handleDialogClose">
      <template #title><h2 class="dialog_item-title">您当前没有团队还不能发布活动,请注册一个团队</h2> </template>
      <template #footer>
        <button class="button cancel" @click="visible = false">取消</button>
        <button class="button confirm" @click="handleClickConfirm">确认</button>
      </template>
    </cookie-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper';
import CookieButton from '../components/cookie-button/CookieButton.vue';
import CookieDialog from '../components/cookie-dialog/CookieDialog.vue';
import CookieCard from '../components/cookie-card/CookieCard.vue';
import CookieCalendar from '../components/cookie-date-picker/cookieCalendar.vue';
import CookieInput from '../components/cookie-input/CookieInput.vue';
import useUserStore from '../store/user';
import { Active, SlideData } from '../assets/interface';
import { getSlidesAPI } from '../api/home';
import { getActivesAPI } from '../api/active';
import { getHottestAPI } from '../api/discuss';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slidesData = ref<SlideData[]>([]);
const activesData = ref<Active[]>([]);
const modules = [Autoplay, Navigation, Pagination];
const router = useRouter();
const userStore = useUserStore();
const visible = ref(false); // 控制弹窗
const hottestList = ref();
const openActiveDetail = (active_id: string) => {
  router.push(`/active/${active_id}`);
};
const getSLides = async () => {
  const res = await getSlidesAPI('首页', 5);
  slidesData.value = res.data;
};
const getActives = async () => {
  const res = await getActivesAPI(1, 10);
  activesData.value = res.data.actives;
};
// 获取最热文章
const getHotArticle = async () => {
  try {
    const { data } = await getHottestAPI();
    hottestList.value = data.articles;
  } catch (error) {
    console.log(error);
  }
};
const handleClickNext = () => {};

const handlePublish = () => {
  // 判断用户是否是团队管理员
  if (userStore.user.role !== 'team_admin') {
    visible.value = true;
  } else {
    router.push('/team_manager');
  }
};
const handleClickConfirm = () => {
  router.push('/team/Application');
};
const handleDialogClose = () => {
  visible.value = false;
};
onBeforeMount(async () => {
  await getSLides();
  await getActives();
  await getHotArticle();
});
</script>

<style scoped>
.active-container {
  max-width: 1200px;
  padding: 24px;
  margin: 0 auto;
  min-height: 500px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 25px;
}
.active-main {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
}
.slide_item-title {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 40px;
  padding-bottom: 12px;
  justify-content: space-between;
}
.title_item-text {
  color: #262626bf;
  font-size: 18px;
  font-weight: 500;
}
.slide_item-content {
  width: 857px;
  padding: 8px 0;
  height: 150px;
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
  width: 270px;
  height: 135px;
  object-fit: cover;
  border-radius: 8px;
}
.main_item-study {
  margin-top: 24px;
  display: flex;
  flex-flow: column wrap;
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
  margin: 24px auto auto 0;
  display: flex;
  flex-flow: row wrap;
  align-items: space-around;
}
.section-common > :not(:nth-child(3n)) {
  margin-right: 16px;
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
  width: 275px;
  height: 88px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) 0s;
  /* margin-right: 16px; */
}
.list_item-img {
  width: 72px;
  height: 72px;
  border-radius: 4px;
  margin: 4px;
}
.list_item-content {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: 8px;
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

.gap-line {
  margin: 32px 0;
  width: 100%;
  border-top: 1px solid rgba(0, 10, 32, 0.08);
}
.main_item-nav {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
  height: 32px;
  margin-bottom: 12px;
  align-items: center;
}
.main_item-nav > :not(:last-child) {
  margin-right: 15px;
}
.main_item-nav > :last-child {
  margin-left: auto;
}
.main_item-actives {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.main_item-actives :deep(.card-wrapper) {
  padding: 10px;
}
.main_item-actives :deep(.card_item-footer) {
  height: auto;
  flex-flow: column nowrap;
  flex-direction: column;
  cursor: default;
}
.main_item-actives :deep(.paragraph) {
  margin: 16px 0 10px 0;
}
.main_item-actives::after {
  flex: 0 0 auto;
  display: block;
  content: '';
  width: 260px;
}
.card-active {
  width: 260px;
  min-height: 300px;
  margin-bottom: 12px;
}

.active_item-cover {
  width: 100%;
  height: 135px;
  position: relative;
  object-fit: cover;
}
.active_item-tag {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 2px 8px;
  text-align: center;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(255, 161, 22, 1);
  display: flex;
  align-items: center;
}
.active_item-name {
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
}
.active_item-tags {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 4px 0px 6px 0px;
}
.tag_item {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(238, 119, 103, 0.15);
  color: rgba(238, 119, 103);
  height: 24px;
  line-height: 24px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 10px;
  white-space: nowrap;
  max-width: 120px;
  display: flex;
  align-items: center;
}
.active_item-info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 2px 4px;
  cursor: default;
}
.info_item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(191, 191, 191, 1);
  height: 20px;
}
.info_item span {
  margin: 0 5px;
  font-weight: 700;
  color: rgba(38, 38, 38, 0.75);
}
.active_item-action {
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 0 4px 0;
  justify-content: space-around;
}
.active_item-progressbar {
  width: 100%;
  height: 6px;
  background-color: rgba(238, 119, 103);
  border-radius: 4px;
}
.active_item-footer {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20px;
  color: rgba(191, 191, 191, 1);
}
.active_item-footer span {
  font-weight: 700;
  color: rgba(38, 38, 38, 0.75);
  margin-left: 5px;
}

.active-aside {
  width: 270px;
}
.aside_item:not(:last-child) {
  margin-bottom: 16px;
}
.aside_item :deep(.paragraph) {
  margin: 10px 0 0 0;
}
.aside_item :deep(.card_item-footer) {
  display: none;
}
.article-hot-title {
  font-size: 14px;
  color: rgba(38, 38, 38, 0.75);
  line-height: 20px;
}
.calendar {
  position: relative;
}
.calendar :deep(.block-calendar-container) {
  padding: 0;
  position: static;
  border-radius: 0;
  border: none;
  box-shadow: none;
  background: transparent;
}
.calendar:deep(.block-calendar-select) {
  width: fit-content;
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px 16px 0 0;
}
.hot-team-active .aside_item-input {
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 0.2s ease 0s;
  user-select: none;
  cursor: pointer;
  color: rgba(191, 191, 191, 1);
  background-color: #000a200d;
}
.hot-team-active-content {
  margin-top: 16px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.hot-team-active_item {
  margin: 0 12px 16px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  background-color: #000a200d;
  line-height: 24px;
  border-radius: 999px;
}
.tag_item-count {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 161, 22, 1);
  height: 16px;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
  max-width: 120px;
  display: flex;
  align-items: center;
  margin-left: 4px;
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
.dialog_item-title {
  color: #595959;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0.4em;
  padding: 0;
  word-wrap: break-word;
}
.button {
  /* height: 38px;
  width: 80px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  border-radius: 4px;
  background-color: transparent;
  padding: 8px 15px;
  user-select: none;
  letter-spacing: 1.5px; */
}
.cancel {
  margin-right: 15px;
  background-color: rgb(136, 136, 136);
}
.confirm {
  background-color: rgb(38, 106, 171);
}

.slide_btn-right {
  text-align: center;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background-color: #000a2008 !important;
  cursor: pointer;
  padding: 0;
  color: red;
}
.slide_btn-left {
  text-align: center;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background-color: #000a2008 !important;
  cursor: pointer;
  padding: 0;
  color: red;
  margin-right: 8px;
}

.btn-group-item svg {
  vertical-align: middle;
}

.btn-group-item:hover {
  background-color: #000a200d;
}

.btn-group-item:last-child {
  margin-left: 6px;
}
</style>
