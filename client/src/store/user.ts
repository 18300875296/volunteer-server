import { ref } from 'vue';
import { defineStore } from 'pinia';
import { loginAPI, registerAPI, userInfoAPI, sendCodeAPI, getTeamMenuAPI } from '../api/user';
import { MenuItem } from '@/assets/interface';

const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoading: ref(false),
    token: '',
    user: ref({
      user_id: '',
      username: '',
      avatar: '',
      nickname: '',
      role: '',
    }),
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
    logout() {
      this.$reset();
    },
    async getTeamRoutes() {
      const res = await getTeamMenuAPI();
      Object.assign(this.routes, [...res.data]);
    },
  },
  persist: true,
});
export default useUserStore;
