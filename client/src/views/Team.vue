<template>
  <div class="team-bg">
    <main class="team">
      <section class="team_item-search">
        <div class="search">
          <cookie-input class="search_item-inp" placeholder="搜索志愿团体..." :border="false">
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
          <div class="search_item-other"></div>
        </div>
      </section>
      <div class="team_item-content">
        <div class="content_item-title">
          <div class="title">
            <router-link class="title_item-hot" to="#">热门团体</router-link>
            <div class="title_item-action">
              <!-- <router-link class="title_item-show" to="/team/Application">+展示我的团队</router-link> -->
              <cookie-button type="submit" @click="router.push('/team/Application')">展示我的团队</cookie-button>
              <cookie-button type="collect" @click="router.push('/user/my_application')">查看我的申请</cookie-button>
            </div>
          </div>
        </div>
        <div class="content_item-posts">
          <div class="content_item-swiper">
            <div class="swiper_item">
              <img src="../assets/天津.png" />
            </div>
            <div class="swiper_item">
              <img src="../assets/河北.png" />
            </div>
          </div>
          <div class="content_item-list">
            <template v-for="team in teamsData" :key="team.team_id">
              <cookie-card class="list_item team">
                <template #title>
                  <img :src="team.logo" />
                </template>
                <div class="team_item-name">{{ team.name }}</div>
                <div class="team_item-peoples">
                  <span>团队人数</span>
                  <span> {{ team.peoples }}人</span>
                </div>
                <template #footer>
                  <div class="team_item-action">
                    <cookie-button type="collect" @click="handleClickOpen(team.team_id)">查看</cookie-button>
                  </div>
                </template>
              </cookie-card>
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import CookieInput from '../components/cookie-input/CookieInput.vue';
import CookieButton from '../components/cookie-button/CookieButton.vue';
import CookieCard from '../components/cookie-card/CookieCard.vue';
import { getAllTeamsAPI } from '../api/team';
import { Team } from '@/assets/interface';

const teamsData = ref<Team[]>([]);
const router = useRouter();
const getTeams = async () => {
  const res = await getAllTeamsAPI();
  teamsData.value = res.data;
};
const handleClickOpenApplications = () => {};
const handleClickOpen = (team_id: string) => {
  router.push(`/team/${team_id}`);
};
onBeforeMount(async () => {
  await getTeams();
});
</script>

<style scoped>
.team-bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}
.team_item-search {
  height: 164px;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
}
.search {
  margin-top: 32px;
  user-select: none;
}
.search_item-inp {
  width: 780px;
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  align-items: center;
  border-radius: 8px;
  transition: all 0.2s ease 0s;
  user-select: none;
  cursor: pointer;
  color: rgba(191, 191, 191, 1);
}
/* .search_item-inp input {
  width: 100%;
  border-radius: 13px;
  height: 40px;
  border-width: 2px;
  font-size: 14px;
} */
.team_item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content_item-title {
  display: flex;
  height: 64px;
  padding: 0 10px;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  justify-content: center;
}
.title {
  min-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 10px 0px;
}
.title_item-hot {
  height: 100%;
  /* display: flex;
  align-items: center; */
  font-size: 16px;
  line-height: 30px;
  padding: 3px 0px;
  color: rgba(38, 38, 38, 1);
  border-bottom: 2px solid rgba(38, 38, 38, 1);
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1.5px;
  user-select: none;
}
.title_item-action {
  display: flex;
  flex-flow: row nowrap;
}
.title_item-action > :not(:last-child) {
  margin-right: 16px;
}
.title_item-show {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  margin-bottom: 6px;
}
.content_item-posts {
  margin: 9px;
  display: flex;
  flex-direction: column;
}
.content_item-swiper {
  height: 132px;
  margin: 9px;
  /* padding: 16px; */
  display: flex;
  justify-content: space-between;
}
.swiper_item {
  display: flex;
  width: 490px;
  /* margin: 9px; */
  align-items: center;
  /* border-radius: 13px; */
  height: 114px;
  /* padding: 15px 16px; */
  transition: box-shadow 0.3s ease 0s;
  position: relative;
  cursor: pointer;
  user-select: none;
}
.swiper_item > img {
  width: 100%;
  height: 100%;
  border-radius: 13px;
  object-fit: cover;
}
.content_item-list {
  width: 1016px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.list_item {
  width: 236px;
  min-height: 200px;
  margin: 9px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}
.list_item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.team :deep(.card_item-footer) {
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: flex-end;
}
.team_item-name {
  font-weight: 600;
  margin: 0 8px 8px 0;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.team_item-peoples {
  font-size: 14px;
  color: rgba(89, 89, 89, 1);
}
.team_item-peoples > :first-child {
  margin-right: 8px;
}
#hot-active-container {
  margin-top: 10px;
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#discuss-list {
  margin-top: 10px;
  width: 100%;
  min-height: 600px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
