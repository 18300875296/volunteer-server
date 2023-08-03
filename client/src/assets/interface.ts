import { AxiosRequestConfig } from 'axios';

export interface MenuItem {
  name: string;
  url: string;
  children?: MenuItem[];
}
export interface RegisterForm {
  email: string;
  code: string;
  pass: string;
}
export interface LoginForm {
  email: string;
  pass: string;
}

export interface CustomResponse {
  status: number;
  code: number;
  message: string;
  data: any;
}
export interface UserInfo {
  user_id: string;
  username: string;
  status: string;
  create_at: string;
  avatar: string;
  nickname: string;
  role: string;
  real_name: string;
  email: string;
}
export interface Posts {
  title: string;
  content: string;
  author: string;
  tags: string[];
  coverImage: string;
  publishTime: string;
  state: string;
}

export interface Article {
  article_id?: string;
  title: string;
  content?: string;
  likeCount?: number;
  readCount?: number;
  summary?: string;
  images: string[];
  tags: string[];
  create_at?: Date;
  update_at?: Date;
}

export interface user {
  avatar: string;

  nickname: string;

  user_id: number;

  username: string;
}
/* active */

export interface Active {
  active_name: string;
  active_type: string;
  service_type: string;
  active_cycle?: string;
  active_start_at?: string;
  active_end_at?: string;
  work_start_at: string;
  work_end_at: string;
  register_time?: string;
  register_start_at?: string;
  register_end_at?: string;
  province: string;
  city: string;
  county: string;
  peoples: number;
  ability: string;
  responsibility: string;
  // team: string;
  welfare: string;
  exceptionInfo: string;
  application_count?: number;
  status?: string;
}
export interface ActiveInfo extends Active {
  active_start_at: string;
  active_end_at: string;
  register_start_at: string;
  register_end_at: string;
  application_count: number;
  collect_by_current_user: boolean;
  register_by_current_user: boolean;
}

export interface ActiveApplication {
  name: string;
  sex: string;
  birthday: string;
  passport: string;
  phone: string;
  record: string;
  university: string;
  profess: string;
  work: string;
  project: string;
  serve_duration: number;
  languages: string;
  skills: string;
  hobbies: string;
}

export interface Team {
  team_id: string;
  name: string;
  manager_name: string;
  manager_passport: string;
  manager_phone: number;
  manager_email: string;
  address: string;
  description: string;
  create_at: string;
  logo: string;
  peoples: number;
  read_count: number;
}
export interface Member {
  team_member_id: string;
  name: string;
  age: number;
  sex: string;
  serve_duration: number;
  phone: number;
  create_at: Date;
}
export interface MemberApplication {
  team_member_application_id?: string;
  name: string;
  status?: string;
  email: string;
  phone: number;
  passport: string;
  age: number;
  sex: string;
  create_at?: string;
  description: string;
}
export interface TeamApplicationInfo {
  logo: string;
  name: string;
  manager_name: string;
  manager_phone: string;
  manager_email: string;
  manager_passport: string;
  address: string;
  description: string;
  username?: string;
  create_at?: string;
  status?: string;
  team_application_id?: string;
}
export interface SlideData {
  slide_id: string;
  title: string;
  url: string;
  description: string;
  create_at?: string;
  place: string;
  link: string;
}
