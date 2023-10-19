import { PropType, defineComponent } from 'vue';
import CookieIconStyle from './CookieIcon.module.css';

const CookieIcon = defineComponent({
  props: {
    iconName: {
      type: String as PropType<string>,
      required: true,
    },
    color: {
      type: String as PropType<string>,
      required: false,
      default: 'CurrentColor',
    },
  },
  setup(props) {
    return () => (
      <svg class={CookieIconStyle.icon} fill={props.color} aria-hidden={'true'} alt>
        <use xlinkHref={`#${props.iconName}`} />
      </svg>
    );
  },
});
export { CookieIcon };
