import { defineComponent, computed } from 'vue';
import tabStyle from './Tab.module.css';

const Tab = defineComponent({
  props: {
    path: {
      type: String,
      required: false,
      default: '',
    },
    defaultActive: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: true,
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
      <router-link to={props.path} class={{ [tabStyle.tab_item]: true, [tabStyle.tab_active]: currentActive.value }}>
        {props.title}
      </router-link>
    );
  },
});
export { Tab };
