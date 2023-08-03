<template>
  <header class="header">
    <h1 class="header_item-title">活动申请管理</h1>
  </header>
  <section class="table">
    <el-table :data="applicationData" stripe :border="true">
      <el-table-column prop="active_name" label="姓名" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120px">
        <template #default="scope">
          <div v-if="scope.row.sex === 'man'" class="row_item-text">男</div>
          <div v-else class="row_item-text">女</div>
        </template>
      </el-table-column>
      <el-table-column prop="record" label="学历" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.record }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="serve_duration " label="服务时长" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.serve_duration }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="申请时间" width="90px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.create_at }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="申请状态" width="90px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.status }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <div class="button-group">
            <cookie-button type="collect">查看</cookie-button>
            <cookie-button type="submit" @click="handleClickUpdate(scope.row.application_id)">审核</cookie-button>
            <cookie-button type="delete">删除</cookie-button>
            <cookie-button>驳回</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Article } from '../../assets/interface';
import { getTeamActiveApplicationsAPI, updateApplicationsAPI } from '../../api/team_control';
import CookieButton from '../../components/cookie-button/CookieButton.vue';

const props = defineProps({
  active_id: {
    type: String,
    default: '',
  },
});
const applicationData = ref([]);
const page = ref(1);
const pagesize = ref(10);
const total = ref(0);
const router = useRouter();
const getTeamApplications = async () => {
  const res = await getTeamActiveApplicationsAPI(props.active_id);
  applicationData.value = res.data;
};
// const handleClickPublish = () => {
//   router.push(`/active/${props.team_id}/publish`);
// };
const handleClickUpdate = async (application_id: string) => {
  const res = await updateApplicationsAPI(application_id);
};
onBeforeMount(async () => {
  await getTeamApplications();
});
</script>
<style scoped>
.activeApplicationControl {
  user-select: none;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
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
}
/* ****************************************** */
.row_item-text {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: rgba(33, 40, 53, 0.75);
  font-size: 14px;
  align-items: center;
}
.tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
}
.tag-item {
  padding: 4px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(86, 74, 190, 1);
  background: rgba(86, 74, 190, 0.15);
  height: 24px;
  line-height: 20px;
  border-radius: 8px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.button-group {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
}
.button-group > :not(:last-child) {
  margin-right: 15px;
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
</style>
