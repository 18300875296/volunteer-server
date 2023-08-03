<template>
  <div class="list-bg">
    <div class="list">
      <template v-for="team of teams" :key="team.team_id">
        <section class="list_item" @click="handleClick(team.team_id)">
          <img src="../../assets/10.3c6d274.png" class="list__item-image" />
          <div class="list__item-text">
            <h2>{{ team.name }}</h2>
            <p>{{ team.description }}</p>
            <p>创建时间:{{ team.create_time }}</p>
            <p>管理员:{{ team.manager_name }}</p>
            <p>联系方式:{{ team.manager_phone }}</p>
            <!-- <div class="text_item-info"></div> -->
          </div>
        </section>
      </template>
      <section class="list_item"></section>
      <section class="list_item"></section>
      <section class="list_item"></section>
      <section class="list_item"></section>
      <section class="list_item"></section>
      <section class="list_item"></section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Team } from '../../assets/interface';
import { getTeamAllAPI } from '../../api/team_control';

const teams = ref<Team[]>([]);
onBeforeMount(async () => {
  const res = await getTeamAllAPI();
  teams.value = res.data;
});
const route = useRoute();
const router = useRouter();
const prefix = '/team_manager';
const handleClick = (team_id: string) => {
  router.push(`${prefix}/${team_id}`);
};
</script>
<style scoped>
.list-bg {
  background-color: rgba(247, 248, 250, 1);
  overflow: hidden;
}
.list {
  max-width: 1200px;
  margin: 30px auto 0;
  min-height: 800px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
}
.list_item {
  width: 380px;
  height: 150px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  margin-bottom: 28px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) 0s;
  overflow: hidden;
}
.list_item:hover {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 2px 4px, rgba(0, 0, 0, 0.02) 0px 4px 8px, rgba(0, 0, 0, 0.02) 0px 6px 12px;
  transform: translateY(-4px);
}
.list__item-image {
  width: 130px;
  height: 140px;
  border-radius: 4px;
  margin: 5px;
  float: left;
  object-fit: unset;
}
.list__item-text {
  overflow: hidden;
  padding-left: 10px;
  margin-right: 10px;
}
.list__item-text > :not(:last-child) {
  margin-bottom: 5px;
}
.list__item-text h2 {
  padding: 0;
  margin: 0;
  margin-top: 5px;
  line-height: 28px;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list__item-text p {
  text-indent: 0;
  padding: 0;
  margin: 0;
  line-height: 20px;
  font-size: 14px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(38, 38, 38, 0.75);
}
/* .text_item-info {
  display: flex;
  justify-content: flex-start;
}
.text_item-info > :first-child {
  margin-right: 20px;
} */
</style>
