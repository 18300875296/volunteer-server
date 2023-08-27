import axios, { AxiosInstance, AxiosError } from 'axios';
import { createApp } from 'vue';
import useUserStore from '../store/user';
import CookieLoading from '../components/cookie-loading/CookieLoading.vue';

// console.log("import.meta.env", import.meta.env);

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 请求的默认前缀，可根据环境变量自行配置
  // timeout: 60000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  const userStore = useUserStore();
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 登录过期错误处理
        // userStore.user = {}; // 初始化
        userStore.auth = false;
        userStore.token = '';
        // userStore.showLoginDialog = true;
        break;
      case 500:
        // 服务器错误处理
        break;
      default:
      // ElMessage.error(`${error}`)
    }
  }
  return Promise.reject(error);
};
let apiCount = 0; // 请求计数器
let isLoading = false; // 标记Loading组件是否已经添加到DOM中
const appInstance = createApp(CookieLoading);
const loadingInstance = appInstance.mount(document.createElement('div'));

// 前置拦截器（发起请求之前的拦截）
request.interceptors.request.use((config) => {
  apiCount++;
  if (apiCount === 1 && !isLoading) {
    const app = document.body.querySelector('.app-wrapper');
    app?.appendChild(loadingInstance.$el); // 开启loading
    isLoading = true;
  }
  const userStore = useUserStore();
  const { token } = userStore; // 如果token 存在，则给请求头加token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.url === '/api/file/uploadfile' || config.url === '/api/file/uploadfiles') {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = `application/json`;
  }
  // console.log(Config);
  // Config.headers["HD-VID"] = `1.0.0`;

  return config;
}, errorHandler);

// 后置拦截器（获取到响应时的拦截）
request.interceptors.response.use(
  (response) => {
    apiCount--;
    if (apiCount === 0 && isLoading) {
      const app = document.body.querySelector('.app-wrapper');
      app?.removeChild(loadingInstance.$el); // 关闭loading
      isLoading = false;
    }
    // const userStore = useUserStore();
    // userStore.isLoading = false;
    return response.data;
  },
  (error) => {
    apiCount--;
    if (apiCount === 0 && isLoading) {
      const app = document.body.querySelector('.app-wrapper');
      app?.removeChild(loadingInstance.$el); // 关闭loading
      isLoading = false;
    }
    errorHandler(error);
    // const userStore = useUserStore();
    // userStore.isLoading = false;
  },
);

export default request;
