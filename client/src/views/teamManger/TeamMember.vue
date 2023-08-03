<template>
  <div class="membersInfo">
    <header class="teamInfo_item-header">
      <h1 class="header_item-title">成员信息</h1>
    </header>

    <!-- <cookie-empty :visible="!members.length"></cookie-empty> -->
    <el-table :data="members" stripe class="table">
      <el-table-column prop="name" label="姓名" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.sex }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.age }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="服务时长" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.serve_duration }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="日期" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.role }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="action-group">
            <cookie-button type="collect">查看</cookie-button>
            <cookie-button v-if="scope.row.role === 'user'" type="delete">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <header class="teamInfo_item-header">
      <h1 class="header_item-title">成员申请</h1>
    </header>
    <el-table :data="membersApplications" stripe class="table">
      <!-- <el-table-column type="index" /> -->
      <el-table-column prop="name" label="姓名" width="100px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.sex }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.age }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="日期" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.status }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="action-group">
            <cookie-button type="collect">查看</cookie-button>
            <cookie-button v-if="scope.row.status === '已审核'" type="delete">删除</cookie-button>
            <cookie-button
              v-if="scope.row.status === '未审核'"
              type="submit"
              @click="handleClickCheck(scope.row.team_member_application_id)"
            >
              审核
            </cookie-button>
            <cookie-button v-if="scope.row.status === '未审核'" type="delete">驳回</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTeamMemberAllAPI, getTeamMemberApplicationAllAPI, createTeamMemberAPI } from '../../api/team_control';
import { Member, MemberApplication } from '../../assets/interface';
import CookieButton from '../../components/cookie-button/CookieButton.vue';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';

const members = ref<Member[]>([]);
const membersApplications = ref<MemberApplication[]>([]);
const props = defineProps({
  team_id: {
    type: String,
    default: '',
  },
});
const router = useRouter();
const getMemberApplication = async () => {
  const res = await getTeamMemberApplicationAllAPI(props.team_id);
  membersApplications.value = res.data;
};
const handleClickCheck = async (team_member_application_id: string) => {
  await createTeamMemberAPI(team_member_application_id);
  router.go(0);
};
onBeforeMount(async () => {
  const res = await getTeamMemberAllAPI(props.team_id);
  members.value = res.data;
  await getMemberApplication();
});
</script>
<style scoped>
.membersInfo {
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
.row_item-text {
  /* text-align: center; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: rgba(33, 40, 53, 0.75);
  font-size: 14px;
}
.action-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.action-group > :not(:last-child) {
  margin-right: 10px;
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
</style>
