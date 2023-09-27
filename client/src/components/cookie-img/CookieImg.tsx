import { defineComponent, ref } from 'vue';
import CookieImgStyle from './CookieImg.module.css';
import { CookieIcon } from '@/components/cookie-icon/CookieIcon';

const CookieImg = defineComponent({
  props: {
    errorSrc: {
      type: String,
      required: false,
      default: '',
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['handleError'],
  setup(props, { emit }) {
    const imgLoadError = ref(false);
    const imgSource = ref(props.src);
    const defaultImgSource = '';
    const handleError = () => {
      if (!imgLoadError.value) {
        imgLoadError.value = true;
        imgSource.value = props.errorSrc ? props.errorSrc : defaultImgSource;
        emit('handleError');
        console.log('图片加载出错');
      }
    };
    console.log(props);
    return () => (
      <div>
        <img src={props.src} alt={props.alt} class={CookieImgStyle.cookie_img} onError={handleError} />
        {imgLoadError.value ? (
          <>
            <CookieIcon iconName={'icon-image_error'} color={'red'} class={CookieImgStyle['img_load-error']} />
            <span class={CookieImgStyle['title-error']}>{'图片加载失败'}</span>
          </>
        ) : null}
      </div>
    );
  },
});

export { CookieImg };
