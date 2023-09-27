interface MenuCreateDTO {
  roles: string[]; //角色内部名
  parent_id?: number;
  name: string;
  displayName: string;
  path: string;
  hidden: boolean;
  component: string;
  level?: number;
  nav?: boolean;
  redirect?: string;
  alias?: string[] | string;
  readonly: boolean;
  is_instance: boolean;
}
export { MenuCreateDTO };
