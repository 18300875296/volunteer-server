import { Role } from 'src/logical/role/role.enum';

interface TokenPreload {
  user_id: string;
  username: string;
  iat: number;
  exp: number;
  role: null | Role;
}
export interface ResponseData<T> {
  data: T;
}
export interface RequestUser extends Request {
  user: TokenPreload;
}
export interface CustomParam {
  team_id?: string;
  team_member_application_id?: string;
  active_id?: string;
  team_application_id?: string;
}
export enum ActiveApplicationStatus {
  checked = '已审核',
  unchecked = '未审核',
  deleted = '已删除',
  reject = '已驳回',
}
export enum UserStatus {
  deleted = '已注销',
  abnormal = '异常',
  normal = '正常',
}
export enum TeamStatus {
  deleted = '已注销',
  abnormal = '异常',
  normal = '正常',
}

export interface UserInfo {
  username: string;
  hashpassword: string;
  salt: string;
  phone: string;
}
export interface Register {
  username: string;
  password: string;
  repassword: string;
  phone: string;
}
export interface Login {
  username: string;
  password: string;
}
export interface Article {
  title: string;
  content: string;
  state: string;
}
