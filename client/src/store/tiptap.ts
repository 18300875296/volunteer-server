/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-09-30 12:36:44
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-09 23:39:14
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\store\tiptap.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ref } from 'vue';
import { Editor, AnyExtension } from '@tiptap/vue-3';
import { defineStore } from 'pinia';
import { getArticleCategoriesAPI } from '../api/article';
import { ArticleCategory } from '@/types/article';
import { getTagsAPI } from '@/api/tag';
import { Tag } from '@/types/tag';
import { createArticleAPI } from '@/api/article';

type createArticleDTO = {
  tags: string[];
  category: string;
  title: string;
  content: string;
};
const useTipTapStore = defineStore('tipTapStore', () => {
  const editor = ref<Editor>();
  const menuConfig = [];
  const content = ref<string>('');
  const showEditor = ref(false);
  const categories = ref<ArticleCategory[]>([]);
  const tags = ref<Tag[]>([]);
  const createArticleDTO = ref<createArticleDTO>({
    tags: [],
    category: '',
    title: '',
    content: content.value,
  });
  // 获取标签
  async function getTags(): Promise<Tag[] | []> {
    const result: Tag[] = [];
    const { data } = await getTagsAPI();
    if (data && data.length) result.push(...data);
    return result;
  }
  async function getArticleCategories(): Promise<ArticleCategory[]> {
    const result = [];
    const { data } = await getArticleCategoriesAPI();
    if (data && data.length) result.push(...data);
    return result;
  }
  async function submit(): Promise<{ article_id: string }> {
    for (const value of Object.values(createArticleDTO)) {
      if (!value) break;
    }
    const { data, code } = await createArticleAPI(createArticleDTO);
    const { article_id } = data;
    return { article_id: article_id ?? '' };
  }
  const main = async () => {
    const [tags, articleCategories] = await Promise.all([getTags(), getArticleCategories()]);
    return { tags, articleCategories };
  };

  main()
    .then((result) => {
      tags.value.push(...result.tags);
      categories.value.push(...result.articleCategories);
    })
    .catch((error) => {
      console.error('Main Error:', error);
    });
  return { tags, categories, createArticleDTO, showEditor, submit, content };
});
export { useTipTapStore };
