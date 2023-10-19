import { PropType, computed, defineComponent, ref } from 'vue';
import CookieInputStyle from './CookieInput.module.css';

const CookieInput = defineComponent({
  props: {
    type: {
      type: String as PropType<string>,
      required: false,
      default: 'text',
    },
    placeholder: {
      type: String as PropType<string>,
      required: false,
      default: '请输入内容',
    },
    name: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    accept: {
      type: String as PropType<string>,
      required: false,
      default: 'none',
    },
    modelValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    height: {
      type: Number as PropType<number>,
      required: false,
      default: 40,
    },
    isBorder: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
    isTransparent: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue', 'focus', 'change', 'blur', 'click', 'mousedown'],
  setup(props, { emit, slots }) {
    const isFocus = ref(false); // 聚焦时的样式
    const inputRef = ref<HTMLInputElement | null>(null); // 输入框引用
    // const height = computed(() => `${props.height}px`); // 计算输入框的高度
    const handleFocus = () => {
      isFocus.value = true;
      emit('focus');
    };
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const { value } = target;
      emit('update:modelValue', value);
    };
    const handleChange = async (event: any) => {
      emit('change', event);
    };
    const handleBlur = () => {
      isFocus.value = false;
      emit('blur');
    };
    const handleClick = () => {
      emit('click');
    };
    const handleMouseDown = () => {
      emit('mousedown');
    };
    return () => (
      <div class={{ [CookieInputStyle.input_wrapper]: true, [CookieInputStyle.wrapper_focus]: isFocus.value }}>
        <input
          ref={inputRef}
          value={props.modelValue}
          // style={{ height: height.value }}
          class={{
            [CookieInputStyle.cookie_input]: true,
            [CookieInputStyle.input_border]: props.isBorder,
            [CookieInputStyle.input_background]: props.isTransparent,
            [CookieInputStyle.disabled]: props.disabled,
          }}
          type={props.type}
          placeholder={props.placeholder}
          accept={props.accept}
          onInput={handleInput}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onClick={handleClick}
          onMousedown={handleMouseDown}
        />
        {slots && slots.icon ? slots.icon() : null}
      </div>
    );
  },
});
export { CookieInput };
