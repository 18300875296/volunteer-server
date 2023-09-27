import { defineComponent, PropType } from 'vue';
import ArticleRowStyle from './ArticleRow.module.css';
import { CookieImg } from '@/components/cookie-img/CookieImg.tsx';
import { CookieIcon } from '@/components/cookie-icon/CookieIcon.tsx';
import { timeFormat } from '@/utils/dayjs';
import { ArticleData } from '@/types/article';

const ArticleRow = defineComponent({
  props: {
    article: {
      type: Object as PropType<ArticleData>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <section class={ArticleRowStyle.article_item_container}>
        {props.article.images ? (
          <CookieImg src={props.article.images} class={ArticleRowStyle['article_item-cover']} />
        ) : null}
        <div class={ArticleRowStyle['article_item-content']}>
          <div class={ArticleRowStyle['article__item-title']}>
            <div class={ArticleRowStyle['title_item-content']}>
              {/* <CookieImg src={props.article.user.avatar} class={ArticleRowStyle['title__item-icon']} /> */}
              <span class={ArticleRowStyle['title__item-text']}> {props.article.title}</span>
            </div>
            <div class="title_item-time">{timeFormat.formatRelativeTime(props.article.create_at)}</div>
          </div>
          <p class="article__item-content">{props.article.summary}</p>
          <div class="article__item-tags">
            <div class="tag_item">{/* <CookieIcon /> */}</div>
            {/* <template v-for="(tag, index) in JSON.parse(data.tags)" :key="index">
            <div class="tag_item">{{ tag }}</div>
          </template> */}
          </div>
        </div>
        <router-link to={'/article'} class={ArticleRowStyle['article_item-link']} />
      </section>
    );
  },
});
export { ArticleRow };
