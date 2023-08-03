<template>
  <div class="usersControl">
    <header class="header">
      <h1 class="header_item-title">用户管理</h1>
    </header>
    <el-table :data="users" stripe class="table">
      <!-- <el-table-column type="index" class="table_item-index" /> -->
      <el-table-column prop="username" label="用户名" width="200px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.username }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="用户头像" width="100px">
        <template #default="scope">
          <div class="row_item-avatar">
            <img :src="scope.row.avatar" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.role }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" width="150px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.nickname }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="create_at" label="注册时间" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ $formatTime(scope.row.create_at) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="用户状态" width="120px">
        <template #default="scope">
          <div class="row_item-text">{{ scope.row.status }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="button-group">
            <cookie-button type="submit" @click="handleClickOpenDialog(scope.row)">编辑</cookie-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 编辑弹框 -->
  <cookie-dialog :visible="visible" @close="handleClickCloseDialog">
    <template #header>
      <section class="dialog_item-section">
        <span class="dialog__item-title">头像</span>
        <div class="dialog__item-content">
          <cookie-upload class="avatar_item-container" :upload-fn="updateAvatar">
            <img :src="currentUserInfo.avatar" class="dialog-avatar-img" />
            <div class="avatar_item-editor">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                <path
                  d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </cookie-upload>
        </div>
      </section>
    </template>
    <template #body>
      <section class="dialog_item-section">
        <span class="dialog__item-title">用户名</span>
        <div class="dialog__item-content" style="user-select: none">{{ currentUserInfo.username }}</div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">昵称</span>
        <div class="dialog__item-content nickname">
          <span v-show="!showInput"> {{ currentUserInfo.nickname }}</span>
          <svg v-show="!showInput" viewBox="0 0 1024 1024" @click="handleClickOpenInput">
            <path
              d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
              fill="currentColor"
            ></path>
          </svg>
          <cookie-input v-if="showInput" v-model="nickname" :border="false" :transparent="false" class="input" />
          <cookie-button v-if="showInput" class="save" @click="handleClickSaveInfo"> 保存 </cookie-button>
          <cookie-button v-if="showInput" class="cancel" @click="handleClickCancelEdit"> 取消 </cookie-button>
        </div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">姓名(绑定之后不能修改)</span>
        <div class="dialog__item-content">
          <template v-if="!showInput2">
            <span v-if="!currentUserInfo.real_name" class="name_item-bind" @click="handleClickShowInput">绑定</span>
            <template v-else>
              <span>{{ currentUserInfo.real_name }}</span>
            </template>
          </template>
          <template v-else>
            <cookie-input v-if="showInput2" v-model="name" :border="false" :transparent="false" class="input" />
            <cookie-button v-if="showInput2" class="save" @click="handleClickSave2"> 保存 </cookie-button>
            <cookie-button v-if="showInput2" class="cancel" @click="handleClickCancel2"> 取消 </cookie-button>
          </template>
        </div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">邮箱</span>
        <div class="email dialog__item-content">
          <template v-if="!showInput3">
            <span v-if="!currentUserInfo.email" class="name_item-bind" @click="handleClickShowEmailInput">绑定</span>
            <template v-else>
              <span>{{ currentUserInfo.email }}</span>
              <svg v-show="!showInput3" viewBox="0 0 1024 1024" @click="handleClickShowEmailInput">
                <path
                  d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                  fill="currentColor"
                ></path>
              </svg>
            </template>
          </template>
          <template v-else>
            <cookie-input v-model="email" :border="false" :transparent="false" class="input" />
            <cookie-button class="save" @click="handleClickSave3"> 保存 </cookie-button>
            <cookie-button class="cancel" @click="handleClickCancel3"> 取消 </cookie-button>
          </template>
        </div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">角色</span>
        <div class="dialog__item-content">{{ currentUserInfo.role }}</div>
      </section>
      <section class="dialog_item-section">
        <span class="dialog__item-title">状态</span>
        <div class="dialog__item-content status">
          <template v-if="!showInput4">
            <span v-if="!currentUserInfo.status" class="name_item-bind" @click="handleClickShowStatusInput">绑定</span>
            <template v-else>
              <span>{{ currentUserInfo.status }}</span>
              <svg v-show="!showInput4" viewBox="0 0 1024 1024" @click="handleClickShowStatusInput">
                <path
                  d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                  fill="currentColor"
                ></path>
              </svg>
            </template>
          </template>
          <template v-else>
            <cookie-input v-model="status" :border="false" :transparent="false" class="input" />
            <cookie-button class="save" @click="handleClickSave4"> 保存 </cookie-button>
            <cookie-button class="cancel" @click="handleClickCancel4"> 取消 </cookie-button>
          </template>
        </div>
      </section>
    </template>
  </cookie-dialog>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, getCurrentInstance, computed } from 'vue';
import CookieDialog from '../../components/cookie-dialog/CookieDialog.vue';
import CookieInput from '../../components/cookie-input/CookieInput.vue';
import CookieButton from '../../components/cookie-button/CookieButton.vue';
import CookieUpload from '../../components/cookie-upload/CookieUpload.vue';
import {
  getUsersAPI,
  updateUserAvatarAPI,
  updateUserNicknameAPI,
  updateUserNameAPI,
  updateUserEmailAPI,
  updateUserStatusAPI,
} from '../../api/admin';
import { uploadFileAPI } from '../../api/discuss';
import { UserInfo } from '@/assets/interface';

const users = ref<UserInfo[]>([]);
const visible = ref(false);
const showInput = ref(false); // 控制昵称输入框
const showInput2 = ref(false); // 控制姓名输入框l
const showInput3 = ref(false); // 控制邮箱输入框
const showInput4 = ref(false); // 控制角色输入框
const showInput5 = ref(false); // 控制状态输入框
const userInfo = {
  user_id: '',
  username: '',
  status: '',
  create_at: '',
  avatar: '',
  nickname: '',
  role: '',
  real_name: '',
  email: '',
}; // 默认数据
const currentUserInfo = ref<UserInfo>(userInfo);
const nickname = ref<string>('');
const name = ref<string>('');
const email = ref<string>('');
const status = ref<string>('');

// 更新用户头像url
const updateAvatar = async (file: any) => {
  try {
    const res = await uploadFileAPI(file); // 上传图片
    const avatar = res.data;
    const { user_id } = currentUserInfo.value;
    await updateUserAvatarAPI(avatar, user_id);
    currentUserInfo.value.avatar = avatar;
  } catch (error) {}
};
// 打开弹窗
const handleClickOpenDialog = (row: UserInfo) => {
  visible.value = true;
  currentUserInfo.value = row; // 当前行的数据存全局
};
// 关闭弹窗
const handleClickCloseDialog = () => {
  visible.value = false;
  currentUserInfo.value = userInfo; // 重置
};
// 修改昵称
const handleClickOpenInput = () => {
  nickname.value = currentUserInfo.value.nickname; // 展示默认状态
  showInput.value = true;
};

// 显示邮箱input框
const handleClickShowEmailInput = () => {
  email.value = currentUserInfo.value.email; // 展示默认状态
  showInput3.value = true;
};
// 显示状态input框
const handleClickShowStatusInput = () => {
  status.value = currentUserInfo.value.status; // 展示默认状态
  showInput4.value = true;
};

// 修改状态
// const handleClickOpenInput4 = () => {
//   nickname.value = currentUserInfo.value.nickname; // 展示默认状态
//   showInput4.value = true;
// };
// 修改角色
// const handleClickOpenInput4 = () => {
//   nickname.value = currentUserInfo.value.nickname; // 展示默认状态
//   showInput5.value = true;
// };
// 取消对昵称的修改
const handleClickCancelEdit = () => {
  nickname.value = currentUserInfo.value.nickname; // 恢复为默认状态
  showInput.value = false;
};
// 保存修改并更新
const handleClickSaveInfo = async () => {
  currentUserInfo.value.nickname = nickname.value;
  const { user_id } = currentUserInfo.value;
  await updateUserNicknameAPI(nickname.value, user_id);
  showInput.value = false;
};
// 显示姓名input框
const handleClickShowInput = () => {
  showInput2.value = true;
};

// 保存姓名
const handleClickSave2 = async () => {
  currentUserInfo.value.real_name = name.value; // 展示默认状态
  const { user_id } = currentUserInfo.value;
  try {
    await updateUserNameAPI(name.value, user_id);
  } catch (error) {}
  showInput2.value = false;
};
// 保存邮箱
const handleClickSave3 = async () => {
  currentUserInfo.value.email = email.value; // 展示默认状态
  const { user_id } = currentUserInfo.value;
  try {
    await updateUserEmailAPI(email.value, user_id);
  } catch (error) {}
  showInput3.value = false;
};
// 保存状态
const handleClickSave4 = async () => {
  currentUserInfo.value.status = status.value; // 展示默认状态
  const { user_id } = currentUserInfo.value;
  try {
    await updateUserStatusAPI(status.value, user_id);
  } catch (error) {}
  showInput4.value = false;
};
// 取消保存邮箱
const handleClickCancel3 = () => {
  email.value = currentUserInfo.value.email; // 恢复为默认状态
  showInput3.value = false;
};
// 取消保存状态
const handleClickCancel4 = () => {
  status.value = currentUserInfo.value.status; // 恢复为默认状态
  showInput4.value = false;
};

// 取消保存
const handleClickCancel2 = () => {
  name.value = currentUserInfo.value.real_name; // 恢复为默认状态
  showInput2.value = false;
};

// 获取用户数据
const getUsers = async () => {
  try {
    const res = await getUsersAPI();
    users.value = res.data;
  } catch (error) {
    console.log(`获取用户列表出错${error}`);
  }
};

onBeforeMount(async () => {
  await getUsers();
});
</script>
<style scoped>
:deep(.dialog-title) {
  margin-bottom: 0;
}
.usersControl {
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
.dialog-avatar-img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
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
.avatar_item-editor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  border-radius: 10px;
  background-color: rgb(193, 187, 246);
  cursor: pointer;
}
.table {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 24px auto;
  border-radius: 13px;
  padding: 16px 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* .dialog-container {
  width: 450px;
} */
.row_item-avatar {
  width: 60px;
  height: 60px;
}
.row_item-avatar img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
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

.dialog__item-content {
  margin-bottom: 24px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.dialog__item-content span {
  margin-right: 12px;
  user-select: none;
}

.dialog_item-section {
  display: flex;
  flex-flow: column nowrap;
  width: 450px;
}
.dialog__item-title {
  margin-bottom: 14px;
  user-select: none;
  font-weight: 600;
}
.avatar_item-container {
  width: 60px;
  height: 60px;
  position: relative;
}
/* .nickname {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
} */

.nickname svg,
.email svg,
.status svg {
  color: rgba(86, 74, 190, 1);
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.input,
.save,
.cancel {
  margin-right: 24px;
}
.save {
  background-color: rgba(86, 74, 190, 1);
  color: rgba(255, 255, 255, 1);
}
.save:hover {
  background-color: rgba(73.1, 62.9, 161.5);
}
.nickname_item-button {
}
.name {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.name_item-bind {
  color: rgba(86, 74, 190, 1);
  cursor: pointer;
}
</style>
