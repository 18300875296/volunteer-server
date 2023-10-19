import request from '../utils/request';
import { Tag } from '@/types/tag';
import { GlobalResponse } from '@/types/request';

export const getTagsAPI = (): Promise<GlobalResponse<Tag[]>> =>
  request({
    url: '/api/tag',
    method: 'GET',
  });
