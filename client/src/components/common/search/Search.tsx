import { defineComponent } from 'vue';
import searchInputStyle from './Search.module.css';
import { CookieInput } from '@/components/cookie-input/CookieInput.tsx';
import { CookieIcon } from '@/components/cookie-icon/CookieIcon.tsx';

const Search = defineComponent({
  props: {
    searchValue: {
      type: [String, Number],
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <CookieInput
        placeholder={props.placeholder}
        isBorder={false}
        class={searchInputStyle.search}
        v-model={props.searchValue}
        name={'search'}
      >
        {{
          icon: () => (
            <CookieIcon iconName={'icon-search'} color={'currentColor'} class={searchInputStyle.search_icon} />
          ),
        }}
      </CookieInput>
    );
  },
});
export { Search };
