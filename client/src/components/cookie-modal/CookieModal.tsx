import { defineComponent, Transition, Teleport, PropType } from 'vue';
import { CookieIcon } from '@/components/cookie-icon/CookieIcon';
import './CookieModal.style.css';

const CookieModal = defineComponent({
  props: {
    showModal: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    teleport: {
      type: String as PropType<String>,
      required: false,
      default: 'body',
    },
  },
  emits: ['onClose', 'onShow'],
  setup(props, { slots, emit }) {
    const handleClose = () => emit('onClose'); // 关闭触发
    return () => (
      <Teleport to={props.teleport ? props.teleport : 'body'}>
        <Transition name={'modal'}>
          {props.showModal ? (
            <div class={'modal_mask'}>
              <div class={'modal_container'}>
                <div class={'modal_header'}>{slots.header ? slots.header() : 'Default Header'}</div>
                <div class={'modal_body'}>{slots.body ? slots.body() : 'Default Body'}</div>
                <div class={'modal_footer'}>{slots.footer ? slots.footer() : 'Default Footer'}</div>
                <div class={'modal_close'} onClick={handleClose}>
                  <CookieIcon iconName="icon-close" color="#7f7f7f" />
                </div>
              </div>
            </div>
          ) : null}
        </Transition>
      </Teleport>
    );
  },
});
export { CookieModal };
