import { defineComponent } from 'vue';
import './CookieCrumb.style.css';

const CookieCrumb = defineComponent({
  setup() {
    return () => <div class={'crumbs_container'}>面包屑</div>;
  },
});
export { CookieCrumb };
