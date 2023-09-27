import { defineComponent, computed } from 'vue';
import bannerStyle from './Banner.module.css';

const Banner = defineComponent({
  props: {
    defaultActive: {
      type: String,
      required: false,
      default: '',
    },
    path: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    const currentActive = computed(() => props.defaultActive === props.name);
    return () => (
      <div class={{ [bannerStyle.banner_select_item]: true, [bannerStyle.banner_active]: currentActive.value }}>
        <router-link to={props.path}> {props.title}</router-link>
      </div>
    );
  },
});
export { Banner };
