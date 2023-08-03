import { MemberApplication, TeamApplication } from '@/assets/interface';
import request from '../utils/request';
// 获取热门团队
export const getHotTeamsAPI = (page = 1, pagesize = 4, keyword = 'read_count') =>
  request({
    url: '/api/team/hot',
    method: 'GET',
    params: { page, pagesize, keyword },
  });
// 获取当前管理员所管理的团队
export const createTeamAPI = (form: TeamApplication) =>
  request({
    url: '/api/team_application/create',
    method: 'POST',
    data: form,
  });
// 获取用户某一个团队的申请信息
export const getUserApplicationAPI = (team_application_id: string) =>
  request({
    url: `/api/team_application/private/${team_application_id}`,
    method: 'GET',
  });
// 更新用户某一个团队的申请
export const updateUserApplicationAPI = (team_application_id: string, team: TeamApplication) =>
  request({
    url: `/api/team_application/update/${team_application_id}`,
    method: 'PUT',
    data: team,
  });
// 获取所有的团队
export const getAllTeamsAPI = () =>
  request({
    url: `/api/team/all`,
    method: 'GET',
  });
// 判断用户是否加入
export const memberExistAPI = (team_id: string) =>
  request({
    url: `/api/team_member/${team_id}/is_exist`,
    method: 'GET',
  });
// 提交加入团队的申请
export const createMemberApplicationAPI = (team_id: string, form: MemberApplication) =>
  request({
    url: `/api/team_member_application/create/${team_id}`,
    method: 'POST',
    data: form,
  });
// 创建团队风采
export const createElegantAPI = (form: any) =>
  request({
    url: '/api/elegant/create',
    method: 'POST',
    data: form,
  });
