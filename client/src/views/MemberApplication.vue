<template>
  <div class="application-bg">
    <div class="application">
      <cookie-form ref="formRef" :model="member" class="member">
        <div class="member-group">
          <cookie-form-item class="team_item-name" prop="name" label="姓名">
            <cookie-input
              v-model="member.name"
              placeholder="请输入姓名"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_name" prop="sex" label="性别">
            <cookie-input
              v-model="member.sex"
              placeholder="请输入性别"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_phone" prop="age" label="年龄">
            <cookie-input
              v-model="member.age"
              placeholder="请输入年龄"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_email" prop="email" label="邮箱">
            <cookie-input
              v-model="member.email"
              placeholder="请输入邮箱"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_passport" prop="passport" label="本人身份证">
            <cookie-input
              v-model="member.passport"
              placeholder="请输入身份证号"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-address" prop="phone" label="联系电话">
            <cookie-input
              v-model="member.phone"
              placeholder="请输入联系电话"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
        </div>
        <cookie-form-item class="team_item-description" prop="description" label="个人简介">
          <cookie-input
            v-model="member.description"
            class="description-input"
            placeholder="请输入个人简介"
            :height="120"
            :border="false"
            :transparent="false"
          ></cookie-input>
        </cookie-form-item>
      </cookie-form>
      <div class="application_item-submit">
        <cookie-button type="submit" @click="handleClickSubmit">提交</cookie-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import CookieForm from '../components/cookie-form/CookieForm.vue';
import CookieFormItem from '../components/cookie-form/CookieFormItem.vue';
import CookieInput from '../components/cookie-input/CookieInput.vue';
import CookieButton from '../components/cookie-button/CookieButton.vue';
import { uploadFileAPI, deleteFileAPI } from '../api/discuss';
import { createMemberApplicationAPI } from '../api/team';
import { MemberApplication } from '@/assets/interface';

const member = ref<MemberApplication>({
  name: '',
  age: +'',
  sex: '',
  phone: +'',
  email: '',
  passport: '',
  description: '',
});
const props = defineProps({
  team_id: {
    type: String,
    default: '',
  },
});
const router = useRouter();
const input = ref();
// const imageURL = ref<string>('');

// 修改时获取申请信息
// const  = async (): Promise<void> => {

//   // member.value = { ...Team.value, ...res.data };
// };
// 提交
const handleClickSubmit = async () => {
  await createMemberApplicationAPI(props.team_id, member.value);
  router.push('/user/my_application');
};
onBeforeMount(async () => {
  // if (props.team_application_id) {
  //   await getUserApplication();
  // }
});
</script>
<style scoped>
.application-bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
  width: 100%;
}
.application {
  width: 1048px;
  padding: 24px;
  border-radius: 8px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 1);
}
.team_item-logo {
  height: 100px;
  margin-bottom: 32px;
}
.logo {
  display: flex;
  flex-flow: nowrap;
  justify-content: flex-start;
  user-select: none;
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
.member-group {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
}
.logo-demand {
  /* user-select: none; */
  margin-left: 40px;
  width: 200px;
}

.description-input input {
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
</style>
