<template>
  <div class="bg">
    <main class="active">
      <div class="active_item-heading">
        <router-link class="active__item-back" to="/active">返回志愿活动</router-link>
        <div class="active__item-title title">
          <span>{{ activeInfo.active_name }}</span>
          <div>
            <span style="margin-right: 16px">活动时间</span>
            <span style="font-size: 14px">{{
              `${$formatTime(activeInfo.active_start_at)}-${$formatTime(activeInfo.active_end_at)}`
            }}</span>
          </div>
        </div>
      </div>
      <div class="active_item-countdown">
        <div v-if="stage() === '未开始'" class="countdown">
          距离报名开始还有<cookie-count-down :end-time="activeInfo.register_start_at" @time-end="timeEnd" />
        </div>
        <div v-if="stage() === '报名中'" class="countdown">
          距离报名结束还有<cookie-count-down :end-time="activeInfo.register_end_at" @time-end="timeEnd" />
        </div>
        <div v-if="stage() === '活动前'" class="countdown">
          距离活动开始还有<cookie-count-down :end-time="activeInfo.active_start_at" @time-end="timeEnd" />
        </div>
        <div v-if="stage() === '进行中'" class="countdown">
          距离活动结束还有<cookie-count-down :end-time="activeInfo.active_end_at" @time-end="timeEnd" />
        </div>
        <div v-if="stage() === '已结束'" class="countdown">活动已结束</div>
      </div>
      <div class="active_item-content">
        <div class="content">
          <p><strong>【通知】</strong></p>
          <p>您必须先 报名 后方能参加该场活动。我们祝愿您生活愉快！</p>
          <p><strong>【志愿服务地点】</strong></p>
          <p class="active__item-paragraph">
            {{ activeInfo.province }} - {{ activeInfo.city }} - {{ activeInfo.county }}
          </p>
          <p><strong>【工作时间】</strong></p>
          <p class="active__item-paragraph">{{ activeInfo.work_start_at }} - {{ activeInfo.work_end_at }}</p>
          <p><strong>【捐募要求】</strong></p>
          <p class="active__item-paragraph">{{ activeInfo.ability }}</p>
          <p><strong>【服务职责】</strong></p>
          <p class="active__item-paragraph">{{ activeInfo.responsibility }}</p>
          <p><strong>【福利待遇】</strong></p>
          <p class="active__item-paragraph">{{ activeInfo.welfare }}</p>
          <p><strong>【志愿团体介绍】</strong></p>
          <p class="active__item-paragraph">{{ activeStore.active.team }}</p>
          <p><strong>【其他特殊情况说明】</strong></p>
          <p class="active__item-paragraph">{{ activeInfo.exceptionInfo }}</p>
          <p><strong>重要提示</strong></p>
          <p class="active__item-paragraph">
            严禁志愿团体和志愿者用户做出任何损害志愿者合法权益的违法违规行为，包括但不限于扣押志愿者证件、收取志愿者财物、向志愿者集资、让志愿者入股、诱导志愿者异地参加活动、
            异地参加培训、违法违规使用志愿者信息等，您一旦发现此类行为，请立即举报
          </p>
        </div>
        <div class="aside">
          <section class="aside_item">
            <h3 class="reward-title">活动奖励</h3>
            <ul class="reward-list">
              <li class="list-item">
                <strong>第一名</strong>
                <span
                  >500
                  <img src="../assets/LeetCoin.png" class="coin" />
                </span>
              </li>
              <li class="list-item">
                <strong>第二名</strong>
                <span
                  >300
                  <img src="../assets/LeetCoin.png" class="coin" />
                </span>
              </li>
              <li class="list-item">
                <strong>第三名</strong>
                <span
                  >200
                  <img src="../assets/LeetCoin.png" class="coin" />
                </span>
              </li>
              <li class="list-item">
                <strong>4-10名</strong>
                <span
                  >100
                  <img src="../assets/LeetCoin.png" class="coin" />
                </span>
              </li>
              <li class="list-item">
                <strong>重在参与奖励</strong>
                <span
                  >50
                  <img src="../assets/LeetCoin.png" class="coin" />
                </span>
              </li>
              <li class="list-item">
                <strong>首次参与活动奖励</strong>
                <span>
                  200
                  <img src="../assets/LeetCoin.png" class="coin" />
                </span>
              </li>
            </ul>
          </section>
          <section class="aside_item">
            <h3 class="reward-title">报名情况</h3>
            <ul class="reward-list">
              <li class="list-item">
                <span>姓名</span>
                <span>手机号</span>
                <span>服务时长</span>
              </li>
              <li class="list-item">
                <template v-for="application in applicationData" :key="application.application_id">
                  <strong>{{ application.name }}</strong>
                  <span>{{ application.phone }}</span>
                  <span style="width: 60px; text-align: center">{{ application.serve_duration }} h</span>
                </template>
              </li>
            </ul>
          </section>
          <section class="aside_item">
            <h3 class="reward-title">我的报名</h3>
            <ul class="reward-list">
              <li class="list-item">
                <span>姓名</span>
                <span>手机号</span>
                <span>状态</span>
              </li>
              <li class="list-item">
                <span>{{ myApplication.name }}</span>
                <span>{{ myApplication.phone }}</span>
                <span>{{ myApplication.status }}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div class="active_item-footer">
        <div class="active__item-btn">
          <cookie-button type="collect">收藏</cookie-button>
          <cookie-button v-if="!myApplication.name && stage() === '报名中'" type="submit" @click="handleClickSubmit"
            >立即报名</cookie-button
          >
          <cookie-button v-if="myApplication.name" type="collect" @click="handleClickCancel">已报名</cookie-button>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, getCurrentInstance, computed, defineProps, Ref, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useActiveStore from '../store/active';
import CookieButton from '../components/cookie-button/CookieButton.vue';
import { getActiveAPI, getApplicationsAPI, getCurrentUserApplicationAPI } from '../api/active';
import { ActiveInfo } from '@/assets/interface';
import CookieCountDown from '../components/cookie-countdown/CookieCountDown.vue';

const props = defineProps({
  active_id: {
    type: String,
    default: '',
  },
});
const activeInfo = ref<ActiveInfo>({
  active_name: '',
  ability: '',
  active_end_at: '',
  active_start_at: '',
  active_type: '',
  city: '',
  county: '',
  exceptionInfo: '',
  peoples: 0,
  province: '',
  register_end_at: '',
  register_start_at: '',
  responsibility: '',
  service_type: '',
  welfare: '',
  application_count: 0,
  work_end_at: '',
  work_start_at: '',
  collect_by_current_user: false,
  register_by_current_user: false,
});
const instance = getCurrentInstance();
const stage = () => {
  const { register_start_at, register_end_at, active_start_at, active_end_at } = activeInfo.value;
  const now = new Date();
  const timestamp = instance?.appContext.config.globalProperties.$countdownTimestamp(register_start_at, now);
  if (timestamp <= 0) {
    return '未开始';
  }
  const timestamp2 = instance?.appContext.config.globalProperties.$countdownTimestamp(register_end_at, now);
  if (timestamp > 0 && timestamp2 <= 0) {
    return '报名中';
  }
  const timestamp3 = instance?.appContext.config.globalProperties.$countdownTimestamp(active_start_at, now);
  if (timestamp2 > 0 && timestamp3 <= 0) {
    return '活动前';
  }
  const timestamp4 = instance?.appContext.config.globalProperties.$countdownTimestamp(active_end_at, now);
  if (timestamp3 > 0 && timestamp4 <= 0) {
    return '进行中';
  }
  if (timestamp4 > 0) {
    return '已结束';
  }
};
const router = useRouter();
const activeStore = useActiveStore();
const myApplication = ref({
  name: '',
  phone: '',
  status: '',
});
const applicationData = ref<any[]>([]);
const getActive = async () => {
  try {
    const res = await getActiveAPI(props.active_id);
    activeInfo.value = res.data;
  } catch (error) {}
};
const timeEnd = (e: any) => {
  console.log(e);
};
const getApplications = async () => {
  try {
    const res = await getApplicationsAPI(props.active_id);
    applicationData.value = res.data;
  } catch (error) {}
};
const getCurrentUserApplication = async () => {
  try {
    const res = await getCurrentUserApplicationAPI(props.active_id);
    myApplication.value = res.data;
  } catch (error) {}
};
const handleClickSubmit = () => router.push(`/active/${props.active_id}/resume`);
const handleClickCancel = () => {};
onBeforeMount(async () => {
  await getActive();
  await getApplications();
  await getCurrentUserApplication();
});
</script>

<style scoped>
.bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
  /* height: 900px; */
  width: 100%;
  position: relative;
}
.active {
  width: 1170px;
  /* height: 800px; */
  margin: 0 auto;
  padding: 20px 10px;
}
.active_item-heading {
  margin-top: 20px;
}
.active__item-back {
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: #afafaf;
}
.active__item-title {
  margin-top: 5px;
}
.active__item-title > :first-child {
  font-size: 30px;
  font-weight: 600;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #595959;
}
.active_item-countdown {
  margin: 20px 0px;
  padding: 20px;
  border: 1px solid #eee;
  border-left-color: #5bc0de;
  background-color: var(--primary-background);
  opacity: 0.85;
  border-left-width: 5px;
  font-size: 18px;
  font-weight: 300;
  border-radius: 3px;
}
.countdown {
  display: flex;
  flex-flow: row nowrap;
}
.active_item-content {
  display: flex;
  flex-flow: row nowrap;
  margin: 40px 0px;
  line-height: 1.7;
}
.content {
  width: 75%;
}
.content p {
  margin-top: 0;
  margin-bottom: 1em;
}
.aside {
  width: 25%;
  display: flex;
  flex-flow: column nowrap;
  margin-left: 15px;
}
.aside_item {
  display: flex;
  flex-direction: column;
  /* background-color: rgb(255, 255, 255, 1); */
  /* min-height: 200px; */
  margin-bottom: 20px;
}
.reward-title {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 10px;
}
.list-item {
  border: none;
  margin-bottom: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #fff;
}
.list-item span {
  flex: 0 0 auto;
}
.coin {
  width: 15px;
  height: 15px;
}
.aside_item-application {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255, 1);
  min-height: 200px;
}
.active__item-paragraph {
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 28px;
  color: #333;
  font-size: 15px;
  text-align: left;
  letter-spacing: 0;
}
.active_item-footer {
  border: 0;
  /* border-top: 2px solid #eeeeeefa; */
  height: 120px;
  width: 100%;
  /* border-bottom: 2px solid #eeeeeefa; */
  /* background: var(--primary-background);
  box-shadow: var(--primary-shadow); */
  position: sticky;
  bottom: 0;
  /* display: flex;
  -webkit-box-align: center;
  align-items: center; */
  padding: 14px 16px;
  border-radius: 0px 0px 8px 8px;
  bottom: 0px;
}
.active__item-btn {
  display: flex;
  align-items: center;
}
.active__item-btn > :first-child {
  margin-right: 15px;
}
</style>
