<template>
  <div class="teamInfo">
    <header class="teamInfo_item-header">
      <h1 class="header_item-title">团队信息</h1>
    </header>
    <section class="teamInfo_item-title">
      <section class="title_item-info">
        <div class="info_item-logo"><img :src="team.logo" /></div>
        <div class="content_item-name">{{ team.name }}</div>
        <div class="content_item-address">
          <span>地址</span>
          <span>{{ team.address }}</span>
        </div>
        <cookie-button type="submit" background="rgba(86, 74, 190, 1)">编辑团队信息</cookie-button>
      </section>
      <section class="title_item-other">
        <div class="other_item">
          <div class="other_item-time">
            <span>创建时间</span>
            <span>{{ $formatTime(team.create_at) }}</span>
          </div>
          <div class="other_item-peoples">
            <span>团队人数</span>
            <span>{{ team.peoples }}人</span>
          </div>
        </div>
      </section>
    </section>
    <section class="teamInfo_item-description">
      <header class="teamInfo_item-header">
        <h1 class="header_item-title">
          团队简介
          <svg viewBox="0 0 1024 1024" width="18" height="18">
            <path
              d="M358.165868 554.624796c-0.533143 0.680499-1.066285 1.391696-1.303692 2.251274l-41.104163 150.700257c-2.400676 8.772804 0.059352 18.226107 6.550183 24.892947 4.860704 4.742001 11.261485 7.350408 18.077727 7.350408 2.252297 0 4.504594-0.267083 6.727215-0.860601l149.630902-40.808428c0.23843 0 0.357134 0.207731 0.534166 0.207731 1.718131 0 3.408633-0.62217 4.683672-1.927909l400.113747-400.054395c11.883655-11.897981 18.404162-28.109198 18.404162-45.74281 0-19.989263-8.476045-39.963177-23.324218-54.767348l-37.786605-37.844933c-14.81645-14.848173-34.822087-23.338544-54.797024-23.338544-17.631566 0-33.842783 6.520507-45.75816 18.388812L358.758362 553.232077C358.344946 553.615816 358.462626 554.179658 358.165868 554.624796M862.924953 257.19778l-39.742143 39.71349-64.428382-65.451688 39.180348-39.179324c6.193049-6.222725 18.194384-5.318122 25.308409 1.822508l37.813211 37.845956c3.943822 3.941775 6.195096 9.18622 6.195096 14.372336C867.223862 250.574942 865.710392 254.42769 862.924953 257.19778M429.322487 560.907896l288.712541-288.728914 64.459081 65.49569L494.314711 625.838721 429.322487 560.907896zM376.718409 677.970032l20.863167-76.580143 55.656601 55.657624L376.718409 677.970032z"
              fill="currentColor"
            ></path>
            <path
              d="M888.265084 415.735539c-15.144932 0-27.562752 12.313443-27.620058 27.665083l0 372.98283c0 19.559475-15.885805 35.444257-35.475979 35.444257L194.220958 851.827709c-19.559475 0-35.504632-15.883759-35.504632-35.444257L158.716326 207.602222c0-19.575848 15.945157-35.474956 35.504632-35.474956l406.367171 0c15.231913 0 27.592428-12.371772 27.592428-27.606755 0-15.202237-12.360516-27.590382-27.592428-27.590382L190.013123 116.930129c-47.684022 0-86.49291 38.779212-86.49291 86.49291L103.520213 820.59231c0 47.713698 38.808888 86.47756 86.49291 86.47756l639.334083 0c47.715745 0 86.509283-38.763862 86.509283-86.47756L915.856489 443.222567C915.794068 428.048983 903.408993 415.735539 888.265084 415.735539"
              fill="currentColor"
            ></path>
          </svg>
        </h1>
      </header>
      <p class="description_item-content">{{ team.description }}</p>
    </section>
    <section class="teamInfo_item-elegant">
      <header class="teamInfo_item-header">
        <h1 class="header_item-title">团队风采</h1>
        <cookie-button type="submit" background="rgba(86, 74, 190, 1)" @click="visible = true">发布风采</cookie-button>
      </header>
      <div class="elegant_item-content">
        <cookie-empty :visible="true"></cookie-empty>
      </div>
    </section>
  </div>
  <tip-tap v-if="visible" class="tip-tap-container" @handleClose="visible = false" @submit="handleSubmit" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import useArticleStore from '../../store/article';
import { getTeamInfoAPI } from '../../api/team_control';
import { createElegantAPI } from '../../api/team';
import { Team } from '../../assets/interface';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';
import CookieButton from '../../components/cookie-button/CookieButton.vue';
import TipTap from '../../components/TipTap/TipTap.vue';

const elegant = {
  title: '',
  content: '',
  images: '',
  team_id: '',
};
const visible = ref(false);
const route = useRoute();
const { team_id } = route.params;

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
// 上传风采文章
const handleSubmit = async () => {
  const articleStore = useArticleStore();
  const form = new FormData();
  const { title, images, content } = articleStore.createArticle;
  form.append('title', title);
  form.append('content', encodeURIComponent(JSON.stringify(content)));
  form.append('images', JSON.stringify(images));
  form.append('team_id', team_id);
  await createElegantAPI(form);
  visible.value = false;
};
// 
onBeforeMount(async () => {
  const res = await getTeamInfoAPI(team_id);
  team.value = res.data;
});
</script>
<style scoped>
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
.header_item-title svg {
  margin-left: 4px;
  transform: translateY(2px);
  cursor: pointer;
}
.title_item-info {
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
}
.info_item-logo {
  width: 50px;
  height: 50px;
}
.info_item-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}
.content_item-name {
  margin-top: 8px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info_item-content {
  display: flex;
  flex-flow: column nowrap;
  margin-right: 8px;
  overflow: hidden;
}
.content_item-address {
  height: 26px;
  margin: 8px 0px 16px;
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
.tip-tap-container {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8), 0px 2px 8px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 1);
  height: 75vh;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
