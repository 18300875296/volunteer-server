import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
console.log(9);
pinia.use(piniaPluginPersistedstate);
export default pinia;
