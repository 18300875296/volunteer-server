<template>
  <div class="activesControl">
    <header class="header">
      <h1 class="header_item-title">志愿活动管理</h1>
      <!-- <cookie-button type="submit" background="rgba(86, 74, 190, 1)" @click="handleClickPublish">
        发布活动
      </cookie-button> -->
    </header>
    <section class="table">
      <el-table :data="activesData" stripe :border="true">
        <el-table-column prop="active_name" label="活动名称" width="200px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.active_name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="team_name" label="负责团队" width="180px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.team.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="active_type" label="活动类型" width="120px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.active_type }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="peoples" label="捐募人数" width="90px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.peoples }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="application_count" label="报名人数" width="90px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.application_count }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="create_at" label="创建时间" width="100px">
          <template #default="scope">
            <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="活动状态" width="90px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.status }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="button-group">
              <cookie-button type="collect">查看</cookie-button>
              <cookie-button type="delete">删除</cookie-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { getActivesListAPI } from '../../api/admin';
import CookieButton from '../../components/cookie-button/CookieButton.vue';

const props = defineProps({
  team_id: {
    type: String,
    default: '',
  },
});
const activesData = ref([]);
// const page = ref(1);
// const pagesize = ref(10);
// const total = ref(0);
const router = useRouter();
const getActives = async () => {
  const res = await getActivesListAPI();
  activesData.value = res.data;
};
const handleClickPublish = () => {
  router.push(`/active/${props.team_id}/publish`);
};
await getActives();
</script>
<style scoped>
.activesControl {
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
  justify-content: space-around;
  align-items: center;
}
.button-group svg {
  cursor: pointer;
  color: rgba(86, 74, 190, 1);
}

.table {
  /* box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px; */
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
