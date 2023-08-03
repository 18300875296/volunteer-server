<template>
  <div class="application-bg">
    <div class="application">
      <cookie-form ref="formRef" :model="Team">
        <cookie-form-item class="team_item-logo" prop="logo" label="志愿团队Logo">
          <div class="logo">
            <div class="logo-upload" @click="handleClickUpload">
              <cookie-input
                ref="input"
                type="file"
                style="display: none"
                accept="image/*"
                @change="handleChangeFile"
              ></cookie-input>
              <img v-if="Team.logo" :src="Team.logo" alt="" />
              <div v-if="Team.logo" class="upload-bg">
                <div class="upload-action">
                  <div class="btn-delete" @click.stop="handleClickDelete">
                    <svg
                      t="1682503302236"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2644"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M106.666667 213.333333h810.666666v42.666667H106.666667z"
                        fill="#e6e6e6"
                        p-id="2645"
                      ></path>
                      <path
                        d="M640 128v42.666667h42.666667V128c0-23.573333-19.093333-42.666667-42.538667-42.666667H383.872A42.496 42.496 0 0 0 341.333333 128v42.666667h42.666667V128h256z"
                        fill="#e6e6e6"
                        p-id="2646"
                      ></path>
                      <path
                        d="M213.333333 896V256H170.666667v639.957333C170.666667 919.552 189.653333 938.666667 213.376 938.666667h597.248C834.218667 938.666667 853.333333 919.68 853.333333 895.957333V256h-42.666666v640H213.333333z"
                        fill="#e6e6e6"
                        p-id="2647"
                      ></path>
                      <path
                        d="M320 341.333333h42.666667v384h-42.666667zM490.666667 341.333333h42.666666v384h-42.666666zM661.333333 341.333333h42.666667v384h-42.666667z"
                        fill="#e6e6e6"
                        p-id="2648"
                      ></path>
                    </svg>
                  </div>
                  <div class="btn-look">
                    <svg
                      t="1682503378205"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3845"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M928.842245 512.091074c0-5.006014-0.846274-9.193383-1.086751-9.691733-0.182149-2.480494-1.028423-7.001461-1.815345-9.374508-0.210801-0.590448-0.484024-1.209548-0.724501-1.799996-0.424672-1.360997-0.876973-2.691295-1.390673-3.749394-76.871785-168.137395-242.376213-281.144168-411.782507-281.144168-169.375595 0-334.865697 112.902396-411.388535 280.130072-0.921999 1.815345-1.572822 3.553942-1.981121 5.066389-0.181125 0.49835-0.39295 0.967024-0.558725 1.406023-1.512447 4.430916-1.542122 7.514137-1.421372 6.712889-0.710175 3.251044-1.360997 9.722432-1.360997 9.722432-0.181125 1.949398-0.181125 3.50687 0.030699 5.442966 0 0 0.649799 5.65479 0.968048 6.80294 0.090051 1.602498 0.483001 3.931542 0.951675 6.048763l-0.030699 0c0.408299 1.814322 0.968048 3.568269 1.738597 5.291516 0.393973 1.330298 0.862647 2.570545 1.270946 3.507894 76.976162 168.166047 242.436588 281.20352 411.781484 281.20352 169.436994 0 334.941422-112.945375 410.936233-279.328823 1.177825-2.177596 1.935072-4.233418 2.448772-6.018064 0.2415-0.543376 0.454348-1.027399 0.604774-1.511423 1.331321-3.872191 1.602498-7.227612 1.481747-7.227612l-0.028653 0.029676C928.027693 520.921183 928.842245 516.89959 928.842245 512.091074zM872.717993 514.146896c-0.029676 0.121773-0.091074 0.272199-0.151449 0.393973-0.090051 0.36225-0.240477 0.785899-0.332575 1.209548-68.403926 147.420561-212.830293 246.337431-360.191502 246.337431-146.997935 0-291.168476-98.642624-360.252901-246.578931-0.166799-0.5137-0.287549-0.998747-0.468674-1.481747-0.030699-0.484024-0.12075-0.876973-0.150426-1.150196-0.060375-0.300852-0.12075-0.724501-0.166799-1.088798l0-0.3776c0.166799-0.620124 0.286526-1.239224 0.347924-1.919722 0.12075-0.36225 0.211824-0.710175 0.347924-1.103124C220.132094 360.89042 364.680235 261.928524 512.041444 261.928524c147.420561 0 291.940049 99.051947 360.161826 246.322082 0.060375 0.287549 0.121773 0.530073 0.212848 0.726547 0.060375 0.2415 0.119727 0.484024 0.240477 0.740874 0.151449 1.104147 0.272199 2.192945 0.423649 2.736321C872.899118 513.028423 872.809067 513.572822 872.717993 514.146896z"
                        fill="#e6e6e6"
                        p-id="3846"
                      ></path>
                      <path
                        d="M512.041444 373.060601c-76.598562 0-138.954749 62.325487-138.954749 138.939399 0 76.598562 62.356187 138.954749 138.954749 138.954749 76.598562 0 138.954749-62.356187 138.954749-138.954749C650.996193 435.386088 588.640006 373.060601 512.041444 373.060601zM512.041444 595.372849c-45.935192 0-83.371826-37.406958-83.371826-83.371826 0-45.950542 37.436634-83.356476 83.371826-83.356476 45.964868 0 83.373873 37.406958 83.373873 83.356476C595.414293 557.965891 558.006312 595.372849 512.041444 595.372849z"
                        fill="#e6e6e6"
                        p-id="3847"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="logo-demand"></div>
          </div>
        </cookie-form-item>
        <div class="team-group">
          <cookie-form-item class="team_item-name" prop="name" label="志愿团队名称">
            <cookie-input
              v-model="Team.name"
              placeholder="请输入志愿团队名称"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_name" prop="manager_name" label="负责人姓名">
            <cookie-input
              v-model="Team.manager_name"
              placeholder="请输入负责人姓名"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_phone" prop="manager_phone" label="负责人手机号">
            <cookie-input
              v-model="Team.manager_phone"
              placeholder="请输入联系方式"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_email" prop="manager_email" label="负责人邮箱">
            <cookie-input
              v-model="Team.manager_email"
              placeholder="请输入团队邮箱"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-manager_passport" prop="manager_passport" label="负责人身份证">
            <cookie-input
              v-model="Team.manager_passport"
              placeholder="请输入负责人身份证号"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="team_item-address" prop="address" label="团队地址">
            <cookie-input
              v-model="Team.address"
              placeholder="请输入团队地址"
              :border="false"
              :transparent="false"
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
import { createTeamAPI, getUserApplicationAPI, updateUserApplicationAPI } from '../api/team';
import { TeamApplicationInfo } from '@/assets/interface';

const teamInfo = {
  logo: '',
  name: '',
  manager_name: '',
  manager_phone: '',
  manager_email: '',
  manager_passport: '',
  address: '',
  description: '',
};

const props = defineProps({
  team_application_id: {
    type: String,
    default: '',
  },
  team: {
    type: Object as () => TeamApplicationInfo,
    default: () => {},
  },
});

const Team = ref<TeamApplicationInfo>(props.team || teamInfo);
const router = useRouter();
const input = ref();
const handleChangeFile = async (event: any) => {
  const formData = new FormData();
  const file = event.target.files[0];
  if (!file) {
    return false;
  }
  formData.append('file', event.target.files[0]);
  const res = await uploadFileAPI(formData);
  Team.value.logo = res.data;
};
// 上传图片
const handleClickUpload = () => {
  input.value.inputRef.click();

  // uploadInputRef.value.click(); // 触发点击事件
};
// 删除图片
const handleClickDelete = async () => {
  const filename = imageURL.value.split('/').pop();
  if (!filename) {
    return false;
  }
  console.log('1');
  imageURL.value = '';
  await deleteFileAPI(filename);
};
// 修改时获取申请信息
const getUserApplication = async (): Promise<void> => {
  const res = await getUserApplicationAPI(props.team_application_id);
  Team.value = { ...Team.value, ...res.data };
};
// 提交
const handleClickSubmit = async () => {
  if (props.team_application_id) {
    await updateUserApplicationAPI(props.team_application_id, Team.value);
  } else {
    await createTeamAPI(Team.value);
  }
  router.push('/user/my_application');
};
onBeforeMount(async () => {
  if (props.team_application_id) {
    await getUserApplication();
  }
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
</style>
