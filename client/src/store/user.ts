import { ref } from 'vue';
import { defineStore } from 'pinia';
import { registerAPI, userInfoAPI, sendCodeAPI } from '../api/user';
import { MenuItem } from '@/assets/interface';

const User = {
  user_id: '',
  username: '',
  avatar: '',
  nickname: '',
  role: '',
};
const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoading: ref(false),
    token: ref(''),
    user: ref(User),
    routes: ref<MenuItem[]>([]),
    auth: ref(false),
    showLoginDialog: ref(false),
  }),
  // 相当于计算属性
  getters: {
    // auth: (state) => !!state.token,
  },

  actions: {
    // 获取导航栏数据

    async sendCode(email: string) {
      try {
        await sendCodeAPI(email);
      } catch (error) {
        console.log(error);
      }
    },

    async register(form: any) {
      try {
        const res = await registerAPI(form);
        this.token = res.data.token;
        this.auth = true;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await userInfoAPI();
        if (res) {
          Object.assign(this.user, { ...res.data });
        }
      } catch (error) {
        console.log(`获取用户信息错误${error}`);
      }
    },
    // 退出登录
    async logout() {
      this.token = '';
      this.user = User;
      this.auth = false;
    },
  },
  persist: true,
});
export default useUserStore;
