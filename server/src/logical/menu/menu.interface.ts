// enum Role {
//   user,
//   team_admin,
//   admin,

import { Role } from '../role/role.enum';

// }
interface MetaOption {
  title: string;
  hidden: boolean;
  roles: null | Role[];
  menu: boolean;
}
export interface MenuItem {
  id: number;
  parent_id: number;
  level: number;
  name: string;
  path: string;
  children: MenuItem[] | [];
  meta: MetaOption;
  component: string;
  props?: boolean;
  redirect?: string;
}
