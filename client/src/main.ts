import { createApp } from 'vue';
import './style.css';
import './styles/index.css';
import './assets/iconfont/iconfont.js';
// import './styles/variables.less';
import 'animate.css/animate.min.css';
import ElementPlus, { ElMessage } from 'element-plus';
import pinia from './store/index';
import App from './App.vue';
import { router } from './router/index';
import 'swiper/css';

const app = createApp(App);

app.use(pinia).use(router).use(ElementPlus);
app.config.globalProperties.$message = ElMessage;
app.mount('#app');
