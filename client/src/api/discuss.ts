import request from '../utils/request';
import { Posts, ResData } from '../assets/interface';

export const getNewestAPI = (page = 1, pagesize = 10): Promise<any> =>
  request({
    url: '/api/article/newest',
    method: 'GET',
    params: {
      page,
      pagesize,
    },
  });
export const getHottestAPI = (page = 1, pagesize = 6): Promise<any> =>
  request({
    url: '/api/article/hottest',
    method: 'GET',
    params: {
      page,
      pagesize,
    },
  });
// 获取最多点赞的文章
export const getLikesAPI = (page = 1, pagesize = 2) =>
  request({
    url: '/api/article/likes',
    method: 'GET',
    params: {
      page,
      pagesize,
    },
  });
// 获取热门活动
export const getHottestActivesAPI = (page = 1, pagesize = 6) =>
  request({
    url: '/api/team/hottest',
    method: 'GET',
    params: {
      page,
      pagesize,
    },
  });
// 上传单张图片
export const uploadFileAPI = (file: any): Promise<any> =>
  request({
    method: 'POST',
    url: '/api/file/uploadfile',
    data: file,
  });
// 上传多张图片
export const uploadFilesAPI = (files: any): Promise<any> =>
  request({
    method: 'POST',
    url: '/api/file/uploadfiles',
    data: files,
  });
export const deleteFileAPI = (filename: string): Promise<any> =>
  request({
    method: 'DELETE',
    url: '/api/file/deletefile',
    params: { filename },
  });

export const sendPostsAPI = (posts: any): Promise<any> =>
  request({
    method: 'POST',
    url: '/api/article/create',
    data: posts,
  });
// 获得文章内容
export const getPostsAPI = (article_id: string): Promise<any> =>
  request({
    method: 'GET',
    url: `/api/article/${article_id}`,
  });
// 获得文章的其他信息
// export const getOtherInfoAPI = (tid: number): Promise<ResData> =>
//   request({
//     method: "GET",
//     url: `/api/article/${tid}/other`,
//   });
// 对文章进行点赞
export const putLikeAPI = (article_id: string): Promise<any> =>
  request({
    method: 'Patch',
    url: `/api/article/${article_id}/like`,
  });
//  对文章取消点赞
export const deleteLikeAPI = (article_id: string): Promise<any> =>
  request({
    method: 'Patch',
    url: `/api/article/${article_id}/unlike`,
  });
// 收藏
export const putCollectAPI = (tid: string): Promise<ResData> =>
  request({
    method: 'Patch',
    url: `/api/article/${tid}/collect`,
  });
// 取消收藏
export const deleteCollectAPI = (tid: string): Promise<ResData> =>
  request({
    method: 'Patch',
    url: `/api/article/${tid}/uncollect`,
  });
// 删除文章
export const deleteArticleAPI = (id: string) =>
  request({
    method: 'Delete',
    url: `/api/article/${id}`,
  });
