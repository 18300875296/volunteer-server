<template>
  <div class="bg">
    <div class="team-container">
      <div class="team_item-header">
        <section class="header-container">
          <!-- <img :src="team.logo" class="header-background" /> -->
          <div class="header_item-title">
            <section class="title_item-info">
              <div class="info_item-logo"><img :src="team.logo" /></div>
              <div class="info_item-block">
                <div class="content_item-name">{{ team.name }}</div>
                <div class="content_item-collect">
                  <span>关注者</span>
                  <span>1234</span>
                  <div>+关注</div>
                </div>
              </div>
            </section>
            <section>
              <cookie-button
                v-if="!currentUserJoin"
                type="submit"
                @click="router.push(`/team/${props.team_id}/member_application`)"
              >
                加入我们
              </cookie-button>
              <cookie-button v-if="currentUserJoin" type="collect"> 已加入</cookie-button>
            </section>
          </div>
          <div class="content_item-address">
            <span>地址</span>
            <span>{{ team.address }}</span>
          </div>
          <div class="title_item-description">
            {{ team.description }}
          </div>
        </section>
      </div>
      <section class="team_item-content">
        <div class="content_item-main">
          <div class="main_item-header">
            <router-link :to="`/team/${team.team_id}/team_elegant`" class="recommend" active-class="active">
              团队风采
            </router-link>
            <router-link :to="`/team/${team.team_id}/team_actives`" class="newest" active-class="active">
              团队活动
            </router-link>
            <router-link :to="`/team/${team.team_id}/team_members`" class="recommend" active-class="active">
              团队人员
            </router-link>
            <div class="search-container"><input placeholder="搜索" class="search-inp" /></div>
          </div>
          <section class="discuss-list-container">
            <router-view></router-view>
          </section>
        </div>

        <aside class="content_item-aside">
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
        </aside>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTeamInfoAPI } from '../api/team_control';
import { memberExistAPI } from '../api/team';
import { Team } from '../assets/interface';
import { getHottestAPI } from '../api/discuss';
import CookieEmpty from '../components/CookieEmpty/CookieEmpty.vue';
import CookieButton from '../components/cookie-button/CookieButton.vue';

const props = defineProps({
  team_id: {
    type: String,
    default: '',
  },
});
const route = useRoute();
const router = useRouter();
const currentUserJoin = ref(false);
const hottestList = ref();
const team = ref<Team>({
  team_id: '',
  name: '',
  manager_name: '',
  manager_passport: '',
  manager_phone: +'',
  manager_email: '',
  address: '',
  description: '',
  create_at: '',
  logo: '',
  peoples: +'',
});
// 获取最热文章
const getHotArticle = async () => {
  try {
    const { data } = await getHottestAPI();
    hottestList.value = data.articles;
  } catch (error) {
    console.log(error);
  }
};
const validateJoin = async () => {
  const res = await memberExistAPI(props.team_id);
  currentUserJoin.value = res.data.current_user_join;
};
onBeforeMount(async () => {
  await getHotArticle();
  const res = await getTeamInfoAPI(props.team_id);
  team.value = res.data;
  await validateJoin();
});
</script>
<style scoped>
.bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}
.team-container {
  display: flex;
  flex-flow: column nowrap;
}
.team_item-header {
  background-color: rgb(255, 255, 255);
  height: 245px;
}
.header-container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-flow: column;
  position: relative;
}
.header-background {
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.9) 58.85%,
    rgba(255, 255, 255, 0.65) 100%
  );
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 999px;
  filter: blur(48px);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
}
.title_item-info {
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
}

.team_item-content {
  max-width: 1000px;
  /* margin: 12px auto 0; */
  margin: 0 auto;
  min-height: 500px;
  display: flex;
  flex-flow: row nowrap;
}
.header_item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36px 0px 16px;
}
.info_item-logo {
  width: 50px;
  height: 50px;
  margin-right: 24px;
}
.info_item-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}
.title_item-description {
  width: 724px;
  text-align: justify;
  color: rgba(38, 38, 38, 0.75);
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
}
.info_item-block {
  display: flex;
  flex-flow: column nowrap;
}
.content_item-main {
  width: 724px;
  margin-right: 266px;
}
.content_item-aside {
  position: absolute;
  right: 180px;
  top: 193px;
  width: 256px;
  min-height: 300px;
  margin-left: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
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

.main_item-header {
  width: 100%;
  height: 32px;
  margin-bottom: 10px;
  display: flex;
}

.discuss-container {
  display: flex;
}

#main-container {
  flex: 1;
  height: 300px;
}

.gap-container {
}

.main-header-container {
  display: flex;
  justify-content: space-between;
}

#aside-right {
}

#discuss-container {
  margin-top: 10px;
  width: 100%;
  height: 800px;
}

.hottest,
.newest,
.recommend {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  transition: all 0.4s ease 0s;
}

.active {
  transition: all 0.4s ease 0s;
  color: rgba(45, 145, 255, 1);
  border-bottom: 2px solid rgba(45, 145, 255, 1);
}

.search-container {
  width: 250px;
  height: 100%;
  margin-left: 175px;
}

input:hover {
  border-color: rgba(45, 145, 255, 1);
}

.search-inp {
  border-radius: 5px;
  width: 100%;
  background: transparent;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(233, 233, 233, 1);
  transition: border-color 0.3s ease 0s;
  padding: 6px 34px 6px 8px;
  color: rgba(38, 38, 38, 1);
}

.publish-btn {
  width: 102px;
  height: 100%;
  background-color: rgba(45, 181, 93, 1);
  margin-left: 15px;
}

.discuss-list-container {
  padding: 16px 16px 0px 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  min-height: 300px;
  /* background: rgba(255, 255, 255, 1); */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.teamInfo {
  user-select: none;
  display: flex;
  flex-flow: column nowrap;
}

.teamInfo_item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 15px 0px 8px; */
  padding-top: 8px;
  margin: 0 24px;
}
.teamInfo_item-title {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 24px auto;
  border-radius: 13px;
  padding: 16px 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* .header_item-title {
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
.header_item-title svg {
  margin-left: 4px;
  transform: translateY(2px);
  cursor: pointer;
} */

.content_item-name {
  font-weight: 700;
  line-height: 26px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content_item-collect {
  display: flex;
  margin-top: 4px;
}
.content_item-collect > :not(:last-child) {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: rgba(38, 38, 38, 0.75);
  display: inline-block;
  margin-right: 7px;
}
.info_item-content {
  display: flex;
  flex-flow: column nowrap;
  margin-right: 8px;
  overflow: hidden;
}
.content_item-address {
  height: 26px;
  margin-bottom: 16px;
  /* margin: 8px 0px 16px; */
  display: inline-flex;
  align-items: center;
  color: rgba(52, 61, 73, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content_item-address > :first-child {
  margin-right: 14px;
}
.content_item-address > :last-child {
  background-color: rgba(0, 10, 32, 0.03);
  border-radius: 5px;
}

.title_item-other {
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 auto;
  width: 264px;
  justify-content: flex-end;
}
.other_item {
  display: flex;
  flex-flow: column nowrap;
  border-left: 1px solid rgba(0, 10, 32, 0.05);
  padding-left: 24px;
  overflow: hidden;
}
.other_item-time,
.other_item-peoples {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(52, 61, 73, 0.6);
  line-height: 26px;
}
.teamInfo_item-description,
.teamInfo_item-elegant {
  display: flex;
  flex-flow: column nowrap;
}
.description_item-content {
  letter-spacing: 1.1px;
  margin: 24px;
  line-height: 24px;
}
.elegant_item-content {
  margin: 24px;
}
.teamInfo_item-elegant .teamInfo_item-header > :last-child {
  margin-right: 12px;
}
</style>
