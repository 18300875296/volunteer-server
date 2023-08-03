<template>
  <div class="teamsInfo">
    <header class="header">
      <h1 class="header_item-title">志愿团队信息</h1>
    </header>
    <!-- <cookie-empty :visible="!members.length"></cookie-empty> -->

    <el-table :data="teams" stripe class="table">
      <el-table-column prop="name" label="团队名称" width="250px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="logo" label="团队logo" width="120px">
        <template #default="scope">
          <div class="row_item-text logo"><img :src="scope.row.logo" class="logo-img" /></div>
        </template>
      </el-table-column>
      <el-table-column prop="manager_name" label="管理员" width="80px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.manager_name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="manager_phone" label="联系方式" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.manager_phone }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="日期" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.status }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="active-group">
            <cookie-button type="collect" @click="handleClickLook(scope.row)">查看</cookie-button>
            <cookie-button type="delete" @click="handleClickDeleteTeam(scope.row.team_id)">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <header class="header">
      <h1 class="header_item-title">团队申请管理</h1>
    </header>
    <cookie-empty :visible="!isEmpty"></cookie-empty>

    <el-table v-if="isEmpty" :data="teamApplications" stripe class="table">
      <el-table-column prop="name" label="团队名称" width="200px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="团队地址" width="200px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.address }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="manager_name" label="管理员" width="80px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.manager_name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="manager_phone" label="联系方式" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.manager_phone }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="日期" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="申请状态" width="80px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.status }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="active-group">
            <cookie-button type="collect" @click="handleClickLook(scope.row)">查看</cookie-button>
            <cookie-button type="delete" @click="handleClickDelete(scope.row)">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <cookie-dialog :visible="visible" @close="handleClickCloseDialog">
    <template #body>
      <TeamInfo :team="application" @close="handleClickCloseDialog" />
    </template>
  </cookie-dialog>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CookieDialog from '../../components/cookie-dialog/CookieDialog.vue';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';
import CookieButton from '../../components/cookie-button/CookieButton.vue';
import TeamInfo from '../../components/TeamInfo.vue';

import { getApplicationsAPI, createTeamAPI, getAllTeamsAPI, deleteTeamAPI } from '../../api/admin';
import { TeamApplicationInfo } from '@/assets/interface';

const instance = getCurrentInstance();
const visible = ref(false);
const router = useRouter();
const teamApplications = ref<TeamApplicationInfo[]>([]);
const teamApplication = {
  logo: '',
  name: '',
  manager_name: '',
  manager_phone: '',
  manager_email: '',
  manager_passport: '',
  address: '',
  description: '',
  username: '',
  create_at: '',
  status: '',
  team_application_id: '',
};
const application = ref(teamApplication);
const team = {
  team_id: '',
  name: '',
  manager_name: '',
  manager_passport: '',
  manager_phone: '',
  manager_email: '',
  address: '',
  description: '',
  create_at: '',
  logo: '',
  peoples: '',
};
const teams = ref(team);
const isEmpty = computed(() => !!teamApplications.value.length);
// 获取所有的团队申请
const getApplications = async () => {
  try {
    const res = await getApplicationsAPI();
    teamApplications.value = res.data;
  } catch (error) {
    console.log(`获取用户申请出错${error}`);
  }
};
// 获取所有的团队
const getAllTeams = async () => {
  try {
    const res = await getAllTeamsAPI();
    teams.value = res.data;
  } catch (error: any) {
    instance?.appContext.config.globalProperties.$message.error(error);
  }
};
// 打开弹窗
const handleClickLook = (row: any) => {
  visible.value = true;
  application.value = row;
};
// 关闭弹窗
const handleClickCloseDialog = () => {
  visible.value = false;
  application.value = teamApplication; // 清空弹窗数据
};
// 删除团队
const handleClickDeleteTeam = async (team_id: string) => {
  try {
    await deleteTeamAPI(team_id);
    instance?.appContext.config.globalProperties.$message({ message: '删除成功', type: 'success' });
  } catch (error) {
    instance?.appContext.config.globalProperties.$message.error(error);
  }
};
await getApplications();
await getAllTeams();

// onBeforeMount(async () => {
//   await getApplications();
//   await getAllTeams();
// });
</script>
<style scoped>
.TeamsInfo {
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
  align-items: center;
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

.table_item-header {
  width: 100%;
  display: flex;
  height: 45px;
  line-height: 45px;
  flex-flow: nowrap;
  /* justify-content: space-around; */
  gap: 10px;
  color: #3c3c4399;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
}
.member_item-index,
.member_item-sex,
.member_item-age {
  width: 45px;
  text-align: center;
}
.member_item-name,
.member_item-duration {
  width: 60px;
  text-align: center;
}
.member_item-phone,
.member_item-create_time {
  text-align: center;
  width: 90px;
}
.member_item-operate {
  text-align: center;
  flex: 1;
}
.table_item-content {
}

.group_item {
  height: 45px;
  display: flex;
  flex-wrap: nowrap;
  /* justify-content: space-around; */
  align-items: center;
}
.group_item-grey {
  background-color: rgb(247, 248, 250);
}
.row_item-text {
  /* text-align: center; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: rgba(33, 40, 53, 0.75);
  font-size: 14px;
}
.active-group {
  display: flex;
  align-items: center;
}
.active-group > :not(:last-child) {
  margin-right: 15px;
}
.logo {
  width: 60px;
  height: 60px;
}
.logo-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
