import { ref } from 'vue';
import { defineStore } from 'pinia';
import { registerAPI, userInfoAPI, sendCodeAPI, loginAPI } from '../api/user';
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
    token: ref<string | undefined>(),
    user: ref(User),
    routes: ref<MenuItem[]>([]),
    auth: ref(false),
  }),
  // 相当于计算属性
  getters: {
    showLoginDialog: (state) => !state.token, // 用户没有用户信息时显示登录弹框
  },

  actions: {
    // 验证token
    async validToken(): Promise<boolean> {
      try {
        if (!this.token) return false;
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
    async login(form: any): Promise<void> {
      try {
        const { data } = await loginAPI(form);
        this.token = data.token;
        this.auth = true;
        await this.getUserInfo(); // 重新获取用户信息
      } catch (error) {
        console.log(`登录失败${error}`);
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const { code, status, data } = await userInfoAPI(); // 获取用户信息
        if (code !== 0 || status !== 200) console.log('获取用户数据失败');
        Object.assign(this.user, { ...data });
        await useRouteStore().getRoutes(true); // 获取权限路由
      } catch (error) {
        return error;
      }
    },
    logout() {
      this.token = '';
      this.user = User; // 初始化
      this.auth = false;
      const routeStore = useRouteStore();
      routeStore.removePermissionRoutes(routeStore.routes); // 删除权限路由
      console.log(routeStore.menus, routeStore.routes, router.getRoutes());
      router.push('/home'); // 跳转又会触发守卫获取普通路由
    },
  },
  persist: true,
});
export default useUserStore;
