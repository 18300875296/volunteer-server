import { Role } from './permission';

export interface Userinfo {
  user_id: ?string;
  avatar: string;
  nickname: string;
  role: Role;
  user_id: string;
  username: string;
}
