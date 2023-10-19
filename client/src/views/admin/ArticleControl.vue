<template>
  <div class="articlesControl">
    <header class="header">
      <h1 class="header_item-title">文章管理</h1>
    </header>
    <section class="table">
      <el-table :data="articlesData" stripe :border="true">
        <el-table-column prop="title" label="标题" width="200px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="summary" label="摘要" width="200px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.summary }}</div>
          </template>
        </el-table-column> -->
        <el-table-column prop="author" label="作者" width="150px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.user.username }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_at" label="发布时间" width="120px">
          <template #default="scope">
            <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签">
          <template #default="scope">
            <div class="tags">
              <template v-for="(tag, index) in scope.row.tags" :key="index">
                <div class="tag-item">{{ tag }}</div>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="发布状态" width="90px">
          <template #default="scope">
            <div class="row_item-text">{{ scope.row.status }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template #default="scope">
            <div class="button-group">
              <cookie-button type="collect">查看</cookie-button>
              <cookie-button type="delete" @click="deleteArticle(scope.row.article_id)">删除</cookie-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Article } from '../../assets/interface';
import { getArticlesAPI } from '../../api/admin';
import { deleteArticleAPI } from '../../api/discuss';
import CookieButton from '../../components/cookie-button/CookieButton.vue';

const articlesData = ref<Article[]>([]);
const page = ref(1);
const pagesize = ref(10);
const total = ref(0);
const getArticles = async () => {
  const res = await getArticlesAPI(page.value, pagesize.value);
  articlesData.value = res.data.articles;
  total.value = res.data.total;
};
const deleteArticle = async (id: string) => {
  await deleteArticleAPI(id);
};
onBeforeMount(async () => {
  await getArticles();
});
</script>
<style scoped>
.articlesControl {
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
  padding: 16px 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
../../api/article
