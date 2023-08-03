<template>
  <div class="systemLog">
    <header class="header">
      <h1 class="header_item-title">团队日志</h1>
    </header>

    <el-table :data="logData" stripe class="table">
      <!-- <el-table-column type="index" class="table_item-index" /> -->
      <el-table-column prop="username" label="用户名" width="150px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.username }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.role }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="url" label="资源地址">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.url }}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="method" label="方法" width="60px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.method }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="params" label="参数">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.params }}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="operation" label="事件" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.operation }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.ip }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="持续时间" width="100px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.time }}ms</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.status }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="create_at" label="创建时间" width="120px" header-align="center">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center">
        <template #default="scope">
          <div class="operation">
            <cookie-button type="collect">查看</cookie-button>
            <cookie-button type="delete">删除</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <cookie-empty :visible="logData === initLog"></cookie-empty> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CookieEmpty from '../../components/CookieEmpty/CookieEmpty.vue';
import { getLogsAPI } from '../../api/admin';

interface Log {
  create_at: string;
  ip: string;
  log_id: string;
  method: string;
  operation: string;
  params: string;
  role: string;
  status: string;
  time: string;
  username: string;
}
const initLog = [
  {
    create_at: '',
    ip: '',
    log_id: '',
    method: '',
    operation: '',
    params: '',
    role: '',
    status: '',
    time: '',
    username: '',
  },
];
const logData = ref<Log[]>();
// const getLogs = async () => {
//   try {
//     const res = await getLogsAPI();
//     logData.value = res.data;
//   } catch (error) {
//     console.log('获取日志失败');
//   }
// };
// getLogs();
</script>
<style scoped>
.systemLog {
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
.table {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 24px auto;
  border-radius: 5px;
  padding: 8px 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  min-height: 400px;
}
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
.operation {
  display: flex;
  flex-flow: row nowrap;
}
.operation > :first-child {
  margin-right: 12px;
}
</style>
