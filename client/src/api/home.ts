import request from '../utils/request';

// 获取首页轮播图
export const getSlidesAPI = (keyword: string, limit: number) =>
  request({
    url: `/api/slide/`,
    method: 'GET',
    params: { keyword, limit },
  });
