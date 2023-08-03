<template>
  <div class="application">
    <cookie-form :model="Team">
      <cookie-form-item class="team_item-logo" prop="logo" label="志愿团队Logo">
        <div class="logo">
          <div class="logo-upload" @click="handleClickOpenDialog">
            <img v-if="Team.logo" :src="Team.logo" alt="" />
          </div>
          <cookie-button v-if="Team.status === '已驳回'" type="delete">{{ Team.status }}</cookie-button>
          <cookie-button v-if="Team.status === '已审核'" type="collect">{{ Team.status }}</cookie-button>
          <cookie-button v-else type="submit">{{ Team.status }}</cookie-button>
        </div>
      </cookie-form-item>
      <div class="team-group">
        <cookie-form-item class="team_item-name" label="志愿团队名称">
          <cookie-input
            v-model="Team.name"
            placeholder="请输入志愿团队名称"
            :border="false"
            :transparent="false"
            :disabled="true"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item class="team_item-manager_name" prop="manager_name" label="负责人姓名">
          <cookie-input
            v-model="Team.manager_name"
            placeholder="请输入负责人姓名"
            :border="false"
            :transparent="false"
            :disabled="true"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item class="team_item-manager_phone" prop="manager_phone" label="负责人手机号">
          <cookie-input
            v-model="Team.manager_phone"
            placeholder="请输入联系方式"
            :border="false"
            :transparent="false"
            :disabled="true"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item class="team_item-manager_email" prop="manager_email" label="负责人邮箱">
          <cookie-input
            v-model="Team.manager_email"
            placeholder="请输入团队邮箱"
            :border="false"
            :transparent="false"
            :disabled="true"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item class="team_item-manager_passport" prop="manager_passport" label="负责人身份证">
          <cookie-input
            v-model="Team.manager_passport"
            placeholder="请输入负责人身份证号"
            :border="false"
            :transparent="false"
            :disabled="true"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item class="team_item-address" prop="address" label="团队地址">
          <cookie-input
            v-model="Team.address"
            placeholder="请输入团队地址"
            :border="false"
            :transparent="false"
            :disabled="true"
          ></cookie-input>
        </cookie-form-item>
      </div>
      <cookie-form-item class="team_item-description" prop="description" label="团队简介">
        <cookie-input
          v-model="Team.description"
          class="description-input"
          placeholder="请输入团队简介"
          :height="120"
          :border="false"
          :transparent="false"
          :disabled="true"
        ></cookie-input>
      </cookie-form-item>
    </cookie-form>
    <div v-if="Team.status === '审核中'" class="application_item-submit">
      <cookie-button type="submit" @click="handleClickResolve(Team.team_application_id)">审核</cookie-button>
      <cookie-button @click="handleClickReject(Team.team_application_id)">驳回</cookie-button>
    </div>
  </div>

  <cookie-dialog :visible="visible" @close="visible = false">
    <template #body>
      <img :src="img" />
    </template>
  </cookie-dialog>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import CookieForm from './cookie-form/CookieForm.vue';
import CookieFormItem from './cookie-form/CookieFormItem.vue';
import CookieInput from './cookie-input/CookieInput.vue';
import CookieButton from './cookie-button/CookieButton.vue';
import CookieDialog from './cookie-dialog/CookieDialog.vue';
import { TeamApplicationInfo } from '@/assets/interface';
import { createTeamAPI } from '../api/admin.ts';

const props = defineProps({
  team_application_id: {
    type: String,
    default: '',
  },
  team: {
    type: Object as () => TeamApplicationInfo,
    require: true,
    default: () => {},
  },
});
const emits = defineEmits(['close']);

const Team = ref<TeamApplicationInfo>(props.team);
const visible = ref(false);
const img = ref();
// 打开图片预览弹框
const handleClickOpenDialog = () => {
  visible.value = true;
  img.value = Team.value.logo;
};
// 审核通过
const handleClickResolve = async (team_application_id: string) => {
  try {
    await createTeamAPI(team_application_id);
    ElMessage({
      message: '审核通过',
      type: 'success',
    });
  } catch (error: any) {
    ElMessage.error(error);
  } finally {
    emits('close'); // 关闭弹窗
  }
};
</script>
<style scoped>
:deep(.dialog-title) {
  display: none;
}
:deep(.dialog-footer) {
  display: none;
}

.application {
  width: 1048px;
  padding: 24px;
  border-radius: 8px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  border: none;
}
.team_item-logo {
  height: 100px;
  margin-bottom: 32px;
}
.logo {
  overflow: hidden;
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  user-select: none;
}
.logo > :last-child {
  margin-left: auto;
  height: 32px;
}
.logo-upload {
  width: 72px;
  height: 72px;
  background: rgba(0, 10, 32, 0.05);
  cursor: pointer;
  position: relative;
}
.logo-upload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.upload-action {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s;
  display: flex;
  justify-content: space-around;
}
.upload-bg {
  width: 72px;
  height: 72px;
  background-color: transparent;
  position: absolute;
  top: 0;
  z-index: 99;
}
.upload-bg:hover {
  background-color: #7a7a7b;
  opacity: 0.8;
}
.team-group {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
}
.logo-demand {
  /* user-select: none; */
  margin-left: 40px;
  width: 200px;
}

.userInfo {
  display: flex;
  flex-flow: column;
  /* justify-content: space-between; */
  gap: 10;
  align-items: start;
}
.userInfo_item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.application_item-submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
.application_item-submit > :first-child {
  margin-right: 15px;
}
</style>
