<template>
  <main class="application-wrapper">
    <header class="header">
      <h1 class="header_item-title">团员申请</h1>
    </header>
    <div class="application-content">
      <!-- <cookie-empty :visible="!isEmpty"></cookie-empty> -->
      <el-table :data="memberApplications">
        <el-table-column prop="active_name" label="姓名">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="active_name" label="手机号">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.phone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="active_name" label="状态">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.status }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <header class="header">
      <h1 class="header_item-title">团队申请</h1>
    </header>
    <div class="application-content">
      <cookie-empty :visible="!isEmpty"></cookie-empty>
      <template v-for="application in applications" :key="application.team_application_id">
        <cookie-card class="application">
          <template #title>
            <div class="application_item-info">
              <img :src="application.logo" />
              <div class="application_item-text">
                <h2 class="application-name">{{ application.name }}</h2>
                <div class="application-time">
                  申请时间
                  <span>{{ $formatTime(application.create_at) }}</span>
                </div>
              </div>
            </div>
          </template>
          <div>{{ application.description }}</div>
          <template #footer>
            <span class="application-status" :class="{ success: application.status === '已审核' }">{{
              application.status
            }}</span>
            <cookie-button
              v-if="application.status !== '已审核'"
              type="submit"
              class="editor-button"
              @click="handleClickEditor(application.team_application_id)"
              >编辑团队资料
            </cookie-button>
            <cookie-button v-else type="collect" class="editor-button">查看团队</cookie-button>
          </template>
        </cookie-card>
      </template>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';
import cookieButton from '../../components/cookie-button/CookieButton.vue';
import CookieCard from '../../components/cookie-card/CookieCard.vue';
import { getApplicationsAPI, getAllMemberApplicationsAPI } from '../../api/user';
import { MemberApplication, TeamApplication } from '../../assets/interface';

const applications = ref<TeamApplication[]>([]);
const memberApplications = ref<MemberApplication[]>([]);
const isEmpty = computed(() => !!applications.value.length);
const router = useRouter();
const getApplications = async () => {
  const res = await getApplicationsAPI();
  applications.value = res.data;
};
const getMemberApplications = async () => {
  const res = await getAllMemberApplicationsAPI();
  memberApplications.value = res.data;
};

const handleClickEditor = (team_application_id: string | undefined) => {
  if (team_application_id) {
    router.push(`/team/Application/${team_application_id}`);
  }
};
onBeforeMount(async () => {
  await getApplications();
  await getMemberApplications();
});
</script>
<style scoped>
.application-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 15px 0px 8px; */
  padding-top: 8px;
  margin: 0 24px;
}
.header_item-title {
  color: rgba(52, 61, 73, 0.6);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 0;
  letter-spacing: 1.1px;
  align-items: center;
}
.application-content {
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
.application-title {
  color: rgba(33, 40, 53, 1);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  /* margin: 16px 24px 0px; */
  white-space: nowrap;
}
.application {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: 100%;
  margin: 24px auto;
  border-radius: 13px;
  padding: 16px 24px;
  user-select: none;
}
.application img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  margin-right: 24px;
}
.application_item-info {
  display: flex;
  flex-flow: row nowrap;
}
.application_item-text {
  display: flex;
  flex-flow: column nowrap;
}
.application-name {
  font-weight: 700;
  line-height: 26px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}
.application-time {
  display: flex;
  margin-top: 6px;
  color: rgba(52, 61, 73, 0.6);
}
.application-time span {
  margin-left: 12px;
}
.application-status {
  border-radius: 5px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  padding: 0px 6px;
  color: rgba(52, 61, 73, 0.6);
  background-color: rgba(0, 10, 32, 0.03);
}
.application:deep(.card_item-body) {
  min-height: auto;
}
.editor-button {
  margin-left: auto;
}
.success {
  color: #5cb85c;
}
</style>
