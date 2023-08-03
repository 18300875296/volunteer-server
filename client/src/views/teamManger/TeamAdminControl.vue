<template>
  <div class="membersInfo">
    <header class="teamInfo_item-header">
      <h1 class="header_item-title">账号管理</h1>
    </header>
    <!-- <cookie-empty :visible="!members.length"></cookie-empty> -->
    <el-table :data="members" stripe class="table">
      <el-table-column type="index" />
      <el-table-column prop="name" label="姓名">
        <template #default="scope">
          <div class="member_item-name">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          <div class="member_item-sex">{{ scope.row.sex }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄">
        <template #default="scope">
          <div class="member_item-age">{{ scope.row.age }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式">
        <template #default="scope">
          <div class="member_item-phone">{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="服务时长">
        <template #default="scope">
          <div class="member_item-duration">{{ scope.row.duration }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="日期">
        <template #default="scope">
          <div class="member_item-create">{{ scope.row.create_time }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="member_item-operate">
            <button>删除</button>
            <button>查看</button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { getTeamMemberAllAPI } from '../../api/team_control';
import { Member } from '../../assets/interface';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';

const members = ref<Member[]>([]);
const route = useRoute();
const { team_id } = route.params;
onBeforeMount(async () => {
  const res = await getTeamMemberAllAPI(team_id);
  members.value = res.data;
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
