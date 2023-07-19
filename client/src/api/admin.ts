import { CustomResponse, SlideData } from '@/assets/interface';
import request from '../utils/request';

// 获取所有的用户信息
export const getUsersAPI = (): Promise<CustomResponse> =>
  request({
    url: '/api/user/all',
    method: 'GET',
  });
// 注销用户
export const deleteUserAPI = (user_id: string): Promise<CustomResponse> =>
  request({
    url: `/api/user/update/${user_id}`,
    method: 'PATCH',
  });
// 获取所有的团队报名信息
export const getApplicationsAPI = (): Promise<CustomResponse> =>
  request({
    url: `/api/team_application/admin/all`,
    method: 'GET',
  });

// 新增轮播图
export const createSlideAPI = (form: SlideData) =>
  request({
    url: '/api/slide/create',
    method: 'POST',
    data: form,
  });
// 获取所有轮播图
export const getSlidesAPI = (place: string) =>
  request({
    url: '/api/slide/list',
    method: 'GET',
    params: { place },
  });
// 删除轮播图
export const deleteSlideAPI = (slide_id: string) =>
  request({
    url: `/api/slide/delete/${slide_id}`,
    method: 'DELETE',
  });
// 管理获得所有文章
export const getArticlesAPI = (page: number, pagesize: number) =>
  request({
    url: `/api/article/all`,
    method: 'GET',
    params: { page, pagesize },
  });
// 管理员获取所有的活动
export const getActivesListAPI = () => request({ url: `/api/active/list`, method: 'GET' });
// 更新用户头像(管理员设置)
export const updateUserAvatarAPI = (avatar: string, user_id: string) =>
  request({
    url: `/api/user/admin/avatar`,
    method: 'PATCH',
    data: { avatar, user_id },
  });
// 更新用户昵称(管理员设置)
export const updateUserNicknameAPI = (nickname: string, user_id: string) =>
  request({
    url: `/api/user/admin/nickname`,
    method: 'PATCH',
    data: { nickname, user_id },
  });
// 更新用户姓名(管理员设置)
export const updateUserNameAPI = (name: string, user_id: string) =>
  request({
    url: `/api/user/admin/name`,
    method: 'PATCH',
    data: { name, user_id },
  });
// 更新用户邮箱(管理员设置)
export const updateUserEmailAPI = (email: string, user_id: string) =>
  request({
    url: `/api/user/admin/email`,
    method: 'PATCH',
    data: { email, user_id },
  });
// 更新用户状态(管理员设置)
export const updateUserStatusAPI = (status: string, user_id: string) =>
  request({
    url: `/api/user/admin/status`,
    method: 'PATCH',
    data: { status, user_id },
  });
// 更新用户角色(管理员设置)
export const updateUserRoleAPI = (role: string, user_id: string) =>
  request({
    url: `/api/user/admin/role`,
    method: 'PATCH',
    data: { role, user_id },
  });
// 团队审核通过创建一个团队
export const createTeamAPI = (team_application_id: string) =>
  request({
    url: `/api/team/create/${team_application_id}`,
    method: 'GET',
  });
// 获取全部的团队
export const getAllTeamsAPI = () =>
  request({
    url: `/api/team/admin/all`,
    method: 'GET',
  });
// 删除一个团队
export const deleteTeamAPI = (team_id: string) =>
  request({
    url: `/api/team/delete/${team_id}`,
    method: 'DELETE',
  });
// 获取系统日志
export const getLogsAPI = () =>
  request({
    url: `/api/logs/list`,
    method: 'GET',
  });
// 更新轮播图字段
export const updateSlideAPI = (slide_id: string, slide: any) => {
  const { title, description, url, ...other } = slide;
  return request({
    url: `/api/slide/update/${slide_id}`,
    method: 'Patch',
    data: { title, description, url },
  });
};
