import request from '../utils/request';
import { CustomResponse, LoginForm, RegisterForm, ResData } from '../assets/interface';

export const getMenuAPI = (): Promise<any> =>
  request({
    url: '/api/menu',
    method: 'GET',
  });

export const getRoleMenuAPI = (): Promise<any> =>
  request({
    url: '/api/menu/role',
    method: 'GET',
  });

export const sendCodeAPI = (email: string) =>
  request({
    method: 'POST',
    url: '/api/validate_email',
    data: { email },
  });

export const registerAPI = (form: RegisterForm): Promise<ResData> =>
  request({
    method: 'POST',
    url: '/api/user/register',
    data: form,
  });

export const loginAPI = (form: any) => {
  console.log(form);
  const { email, password } = form;
  return request({
    method: 'POST',
    url: '/api/auth/login',
    data: { username: email, password },
  });
};

export const userInfoAPI = (): Promise<ResData> => {
  return request({
    method: 'GET',
    url: 'api/auth/getUserinfo',
  });
};
export const getApplicationsAPI = (): Promise<CustomResponse> =>
  request({
    url: '/api/team_application/private/all',
    method: 'GET',
  });
export const getAllMemberApplicationsAPI = () =>
  request({
    url: '/api/team_member_application/user/all',
    method: 'GET',
  });
// 更新用户头像
export const updateUserAvatarAPI = (avatar: string) =>
  request({
    url: `/api/user/avatar`,
    method: 'PATCH',
    data: { avatar },
  });
// 更新用户昵称
export const updateUserNicknameAPI = (nickname: string) =>
  request({
    url: `/api/user/nickname`,
    method: 'PATCH',
    data: { nickname },
  });
