import request from '../utils/request';
import { GlobalResponse } from '../types/request';
import { RouteItem, MenuItem } from '../types/menu';

export const getMenusAPI = (): Promise<GlobalResponse<MenuItem[]>> =>
  request({
    url: '/api/menu',
    method: 'GET',
  });
export const getRoutesAPI = (): Promise<GlobalResponse<RouteItem[]>> =>
  request({
    url: '/api/route',
    method: 'GET',
  });
export const getRoleMenuAPI = (): Promise<GlobalResponse<RouteItem[]>> =>
  request({
    url: '/api/menu/role',
    method: 'GET',
  });
