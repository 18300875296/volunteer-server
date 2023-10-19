import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import useRouteStore from './route';
import { ArticleCategory, ArticleData, ArticleDetail, ArticleHeader } from '@/types/article';
import {
  createArticleAPI,
  uploadFileAPI,
  uploadFilesAPI,
  deleteFileAPI,
  getArticleContentAPI,
  putLikeAPI,
  deleteLikeAPI,
  deleteCollectAPI,
  putCollectAPI,
  getHottestAPI,
  getArticleCategoriesAPI,
} from '../api/article';
import { Article } from '@/assets/interface';
import { MenuItem, MenuTab } from '@/types/menu';
import { flatData } from '@/utils/flatData';
import { router } from '@/router';

const useArticleStore = defineStore('articleStore', {
  state: () => ({
    routerTree: ref({
      root: 'article',
      children: [''],
    }), // 存放文章模块的路由层级
    articleMenus: ref<MenuItem[]>([]), // 文章页面的菜单栏数据
    currentMenuTabs: ref<MenuItem[]>([]), // 当前栏目的菜单栏数据
    currentData: ref<ArticleData[]>([]), // 当前栏目的文章数据
    hottestReadList: ref<ArticleData[]>([]), // 文章页面右侧热读榜数据
    isInitial: ref(false), // 是否初始化
    currentMenuName: ref<string>(''), // 当前栏目的名称
    currentMenuTabName: ref<string | undefined>(''), // 当前栏目下菜单栏名称
    openArticleEditor: ref(false), // 是否打开文章编辑器
  }),
  // 相当于计算属性
  getters: {},

  actions: {
    // 文章模块初始化
    async initArticleModule(): Promise<void> {
      try {
        const promises = [
          await this.getArticleMenus(),
          await this.setCurrentMenu(this.articleMenus[0].name),
          await this.getHottestReadList(),
          // this.getCurrentMenuTabs(),
          await this.getCurrentData(),
        ];
        await Promise.all(promises);
        this.isInitial = true;
      } catch (error) {
        console.log('文章模块初始化失败', error);
      }
    },
    // 获取文章详情页菜单栏
    async getArticleMenus() {
      const routeStore = useRouteStore();
      const articleMenus = await routeStore.getCurrentMenuChildren('article', 0);
      if (articleMenus && articleMenus.length) {
        this.articleMenus.length = 0;
        const menus = articleMenus.filter((item) => item.meta.menu && !item.meta.hidden);
        this.articleMenus.push(...menus);
      }
    },
    // 获取右侧热读数据
    async getHottestReadList(): Promise<void> {
      const { data } = await getHottestAPI();
      this.hottestReadList = data.articles;
    },
    // 设置当前栏目名
    async setCurrentMenu(name?: string | undefined | null): Promise<void> {
      if (!name) this.currentMenuName = this.articleMenus[0].name;
      const filterMenu = this.articleMenus.filter((menu) => menu.name === name);
      if (filterMenu && filterMenu.length) {
        console.log(name);
        this.currentMenuName = name as string;
        console.log(this.currentMenuName);
      } else {
        // 路径不对跳转404
        router.push({ name: '404' });
      }
    },
    // 获取当前栏目的tabs
    async setCurrentTabs(name?: string): Promise<void> {
      const _name = name || this.articleMenus[0].name;
      this.currentMenuTabs.length = 0; // 清空 currentMenuTabs 数组
      const selectedMenu = this.articleMenus.find((menu) => menu.name === _name);
      if (selectedMenu && selectedMenu.children && selectedMenu.children.length) {
        this.currentMenuTabs.push(...selectedMenu.children); // 将 tabs 合并到 currentMenuTabs
      }
    },
    // 设置当前的栏目名
    async setCurrentTabName(name?: string): Promise<void> {
      this.currentMenuTabName = '';
      if (!name) {
        if (!this.currentMenuTabs.length) {
          this.currentMenuTabName = '';
        } else {
          this.currentMenuTabName = this.currentMenuTabs[0].name;
        }
      } else if (this.currentMenuTabs && this.currentMenuTabs.length) {
        const selectedTab = this.currentMenuTabs.find((tab) => tab.name === name);
        if (selectedTab) {
          this.currentMenuTabName = selectedTab.name;
        } else {
          router.push({ name: '404' });
        }
      } else {
        router.push({ name: '404' });
      }
    },
    // 用户点击触发routeAfterEach数据动态切换,用户点击栏目下的菜单栏触发
    // getCurrentTabAndTabMenu(): void {
    //   // 设置articleMenus中第一个元素为重定向元素
    //   this.currentMenuName = this.articleMenus[3].name;
    //   this.getCurrentMenuTabs();
    //   this.currentMenuTabName = this.currentMenuTabs[0].name;
    //   // const route = useRouteStore().currentRoute;
    //   // if (!(route && route.name && route.matched.length)) {
    //   //   this.currentMenuName = '';
    //   // } else {
    //   //   // 由于路由配置中有重定向，要获得文章页面的栏目需要获得重定向之前的路由信息,获取最后一个有重定向值的routeName
    //   //   const tabRoute = route.matched.findLast((item) => item.name && item.redirect);
    //   //   this.currentMenuTabName = tabRoute?.name as string;
    //   //   const tabMenuRoute = route.matched.findLast((item) => item.name && !item.redirect);
    //   //   this.currentMenuName = tabMenuRoute?.name as string; // 最新最热推荐....
    //   // }
    // },

    // 当栏目变化时请求不同的数据
    async getCurrentData(): Promise<void> {
      if (this.currentData && this.currentData.length) this.currentData = [];
      const { data } = await getHottestAPI(); // 传入currentTab
      this.currentData = data.articles;
    },
    // 获取文章内容
    async getArticleContent(article_id: string): Promise<ArticleDetail | undefined> {
      try {
        const result = await getArticleContentAPI(article_id);
        return result.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    // 上传文章内容
    async createArticle(): Promise<ArticleDetail> {
      try {
        const form = new FormData();
        form.append('title', this.createArticle.title);
        form.append('content', encodeURIComponent(JSON.stringify(this.createArticle.content)));
        form.append('tags', JSON.stringify(this.createArticle.tags));
        form.append('images', JSON.stringify(this.createArticle.images));
        return (await createArticleAPI(form)).data;
      } catch (error: any) {
        throw new Error(error);
      } finally {
        this.$reset();
      }
    },
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

  persist: {
    paths: ['articleMenus', 'currentMenuTabs', 'currentMenuName', 'currentMenuTabName'],
  },
});

export default useArticleStore;
