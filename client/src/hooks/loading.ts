import { createApp } from 'vue';
import CookieLoading from '../components/cookie-loading/CookieLoading.vue';
import { RequestConfig } from '@/assets/interface';

export default function useLoading() {
  const loadingDomMap = new WeakMap();

  // 添加loading
  const setLoading = (config: any) => {
    const loadingDom = config.dom;
    if (!loadingDom) {
      return false;
    }
    const loadingDomInfo = loadingDomMap.get(loadingDom); // 查看map中是否已经存在当前这个dom
    if (loadingDomInfo) {
      loadingDomInfo.count++;
    } else {
      // 创建一个loading
      const app = createApp(CookieLoading);
      const loadingInstance = app.mount(document.createElement('div'));
      loadingDom.appendChild(loadingInstance.$el);
      loadingInstance.show(loadingDom);
      loadingDomMap.set(loadingDom, { count: 1, app }); // 并记录当前的dom
    }
  };
  // 删除loading效果
  const deleteLoading = (config) => {
    const loadingDom = config.dom;
    if (!loadingDom) {
      return false;
    }
    const loadingDomInfo = loadingDomMap.get(loadingDom);
    if (loadingDomInfo) {
      if (loadingDomInfo.count === 0) {
        loadingDomMap.delete(loadingDom);
        loadingDomInfo.app.unmount();
      }
    }
  };
  return { setLoading, deleteLoading };
}
