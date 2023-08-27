import { ref } from 'vue';
import { defineStore } from 'pinia';
import { registerAPI, userInfoAPI, sendCodeAPI, loginAPI, getRoleMenuAPI } from '../api/user';
import { MenuItem } from '@/assets/interface';
import { router } from '../router/index';
import useRouteStore from './route';

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
  }),
  // 相当于计算属性
  getters: {
    // auth: (state) => !!state.token,
  },

  actions: {
    // 获取token
    getToken() {
      return !!this.token;
    },
    // 判断token
    async validToken(): Promise<boolean> {
      try {
        const res = await userInfoAPI();
        return res.data.status !== 401;
      } catch (error) {
        throw Error(`获取token出错,${error}`);
      }
    },
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
        router.push('/home');
        // const RoleResData = await getRoleMenuAPI();
        // if (RoleResData.data) {
        //   this.routes.push(...RoleResData.data);
        //   addRoute(RoleResData.data);
        // }
      } catch (error) {
        console.log(error);
      }
    },
    async login(form: any) {
      try {
        const res = await loginAPI(form);
        this.token = res.data.token;
        this.auth = true;
        await this.getUserInfo(); // 重新获取用户信息
        // const RoleResData = await getRoleMenuAPI();
        // if (RoleResData.data) {
        // this.routes.push(...RoleResData.data);
        // addRoute(RoleResData.data);
        // }
      } catch (error) {
        console.log(`登录失败${error}`);
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await userInfoAPI();
        const routeStore = useRouteStore();
        await routeStore.getPermissionRoute();
        if (res) {
          Object.assign(this.user, { ...res.data });
        }
      } catch (error) {
        console.log(`获取用户信息错误${error}`);
      }
    },
    logout() {
      this.token = '';
      this.user = User; // 初始化
      this.auth = false;
      const routeStore = useRouteStore();
      routeStore.menus = [];
      routeStore.permissionRoutes = [];
      routeStore.routes = [];
      routeStore.getBaseRoute();
      console.log(router.getRoutes());
      router.push('/home');
    },
  },
  persist: true,
});
export default useUserStore;
