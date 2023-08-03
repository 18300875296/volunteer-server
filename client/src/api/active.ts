import request from '../utils/request';
import { CreateActive, CustomResponse, ActiveApplication } from '../assets/interface';

// 创建一个活动
export const createActiveAPI = (activeForm: CreateActive, team_id: string): Promise<any> =>
  request({
    url: `/api/active/create/${team_id}`,
    method: 'POST',
    data: activeForm,
  });
// 获取所有的活动
export const getActivesAPI = (page: number, pagesize: number): Promise<CustomResponse> =>
  request({
    url: `/api/active/all`,
    method: 'GET',
    params: { page, pagesize },
  });
// 获得活动信息
export const getActiveAPI = (active_id: string): Promise<any> =>
  request({
    url: `/api/active/${active_id}`,
    method: 'GET',
  });
// 获取时间戳
export const getTimestampAPI = () => request({ url: '/api/active/timestamp', method: 'GET' });
// 收藏活动
export const activeCollectAPI = (active_id: string) =>
  request({ url: `/api/active/${active_id}/collect`, method: 'Patch' });
// 取消收藏
export const cancelCollectAPI = (active_id: string) =>
  request({ url: `/api/active/${active_id}/cancelcollect`, method: 'Delete' });
// 活动报名
export const activeRegisterAPI = (active_id: string, applyForm: ActiveApplication) =>
  request({ url: `/api/application/create/${active_id}`, method: 'POST', data: applyForm });
// 取消活动报名
export const cancelRegisterAPI = (active_id: string) =>
  request({ url: `/api/active/${active_id}/cancelregister`, method: 'Delete' });
// 获取当前已审核的报名信息
export const getApplicationsAPI = (active_id: string) =>
  request({
    url: `/api/application/${active_id}/all/check`,
    method: 'GET',
  });
// 获取当前用户是否已经报名
export const getCurrentUserApplicationAPI = (active_id: string) =>
  request({
    url: `/api/application/current_user/${active_id}`,
    method: 'GET',
  });
// 获取点赞最多的活动
