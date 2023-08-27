import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

import {
  sendPostsAPI,
  uploadFileAPI,
  uploadFilesAPI,
  // getOtherInfoAPI,
  deleteFileAPI,
  getPostsAPI,
  putLikeAPI,
  deleteLikeAPI,
  deleteCollectAPI,
  putCollectAPI,
} from '../api/discuss';
import { Article } from '@/assets/interface';

const useArticleStore = defineStore('articleStore', {
  state: () => ({
    createArticle: ref<Article>({
      title: '',
      content: '',
      images: [],
      tags: ['志愿服务', '社区志愿', '公益性志愿'],
    }),

    articleContent: reactive({
      article_id: '',
      content: '',
      cover_url: '',
      createAt: '',
      likeCount: '',
      readCount: '',
      collectCount: '',
      title: '',
      updateAt: '',
      collect_by_current_user: '',
      like_by_current_user: '',
    }),
    articleAuthor: reactive({
      avatar: '',
      nickname: '',
      user_id: '',
      username: '',
    }),
  }),
  // 相当于计算属性
  getters: {
    parseContent: (state) => JSON.parse(decodeURIComponent(state.articleContent.content)),
    likes: (state) => state.articleContent.likeCount,
    collects: (state) => state.articleContent.collectCount,
    reads: (state) => state.articleContent.readCount,
    isLike: (state) => !!state.articleContent.like_by_current_user,
    isCollect: (state) => !!state.articleContent.collect_by_current_user,
  },

  actions: {
    // 上传单个文件
    async uploadFile(file: any) {
      try {
        const res = await uploadFileAPI(file);
        this.createArticle.images.push(res.data);
        return res.data;
      } catch (error) {
        return console.log(error);
      }
    },
    // 删除文件
    async deleteFile(filename: string): Promise<boolean> {
      try {
        const index = this.createArticle.images.findIndex((item) => item === filename); // 找到图片中的url
        this.createArticle.images.splice(index, 1);
        await deleteFileAPI(filename);
        return true;
      } catch (error) {
        throw new Error('删除文件出错');
      }
    },
    // 上传多个文件
    async uploadFiles(files: any) {
      try {
        const res = await uploadFilesAPI(files);
        this.createArticle.images.push(...res.data);
        return res.data;
      } catch (error) {
        return console.log(error);
      }
    },

    // 上传文章内容
    async sendPosts() {
      try {
        const form = new FormData();
        form.append('title', this.createArticle.title);
        form.append('content', encodeURIComponent(JSON.stringify(this.createArticle.content)));
        form.append('tags', JSON.stringify(this.createArticle.tags));
        form.append('images', JSON.stringify(this.createArticle.images));
        return await sendPostsAPI(form);
      } catch (error) {
        return error;
      } finally {
        this.$reset();
      }
    },

    // 获取文章内容
    async getPosts(article_id: string): Promise<void> {
      try {
        const res = await getPostsAPI(article_id);
        const { user, ...article } = res.data;
        this.articleContent = article;
        this.articleAuthor = user;
      } catch (error) {
        console.log(error);
      }
    },
    // 文章点赞
    async putLike(): Promise<any> {
      try {
        const res = await putLikeAPI(this.articleContent.article_id);
        this.articleContent.likeCount = res.data.like_count;
        this.articleContent.like_by_current_user = res.data.like_by_current_user;
      } catch (error) {
        console.log(error);
      }
    },
    // 取消对文章的点赞
    async deleteLike(): Promise<any> {
      try {
        const res = await deleteLikeAPI(this.articleContent.article_id);
        this.articleContent.likeCount = res.data.like_count;
        this.articleContent.like_by_current_user = res.data.like_by_current_user;
      } catch (error) {
        console.log(error);
      }
    },
    // 对文章进行收藏
    async putCollect(): Promise<any> {
      try {
        const res = await putCollectAPI(this.articleContent.article_id);
        this.articleContent.collectCount = res.data.collect_count;
        this.articleContent.collect_by_current_user = res.data.collect_by_current_user;
      } catch (error) {
        console.log(error);
      }
    },
    // 取消对文章的收藏
    async deleteCollect(): Promise<any> {
      try {
        const res = await deleteCollectAPI(this.articleContent.article_id);
        this.articleContent.collectCount = res.data.collect_count;
        this.articleContent.collect_by_current_user = res.data.collect_by_current_user;
      } catch (error) {
        console.log(error);
      }
    },
  },

  // persist: [
  //   {
  //     paths: ["createArticle"],
  //     storage: localStorage,
  //   },
  // ],
});

export default useArticleStore;
