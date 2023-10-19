import { getArticleCategoriesAPI } from '@/api/article';
import { ArticleCategory } from '@/types/article';
import { getTagsAPI } from '@/api/tag';
import { Tag } from '@/types/tag';

const getTags = async (): Promise<Tag[]> => {
  const { data } = await getTagsAPI();
  return data;
};
// 获取文章分类
const getArticleCategories = async (): Promise<ArticleCategory[]> => {
  const { data } = await getArticleCategoriesAPI();
  return data;
};
export { getTags, getArticleCategories };
