import request from '../utils/request';
// 获取当前管理员所管理的团队
export const getTeamAllAPI = () =>
  request({
    url: '/api/team/my_teams',
    method: 'GET',
  });

// 获取团队的信息
export const getTeamInfoAPI = (team_id: string): Promise<any> =>
  request({
    url: `/api/team/${team_id}`,
    method: 'GET',
  });

// 获取团队的人员信息
export const getTeamMemberAllAPI = (team_id: string): Promise<any> =>
  request({
    url: `/api/team_member/${team_id}`,
    method: 'GET',
  });
// 获取团队成员申请表
export const getTeamMemberApplicationAllAPI = (team_id: string): Promise<any> =>
  request({
    url: `/api/team_member_application/${team_id}/application/all`,
    method: 'GET',
  });
export const createTeamMemberAPI = (team_member_application_id: string) =>
  request({
    url: `/api/team_member/create/${team_member_application_id}`,
    method: 'GET',
  });
export const getTeamActiveApplicationsAPI = (active_id: string) =>
  request({
    url: `/api/application/admin/${active_id}/all`,
    method: 'GET',
  });
export const getTeamActivesAPI = (team_id: string) =>
  request({
    url: `/api/active/${team_id}/all`,
    method: 'GET',
  });
export const updateApplicationsAPI = (application_id: string) =>
  request({
    url: `/api/application/update/${application_id}`,
    method: 'PATCH',
  });
