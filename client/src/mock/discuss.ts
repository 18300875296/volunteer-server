import { MockMethod } from 'vite-plugin-mock';

const mock: Array<MockMethod> = [
  {
    url: '/api/discuss/create',
    method: 'post',
    response: (req: any, res: any) => {
      const data = {
        id: '@guid(1,30)',
        title: '@ctitle(5,10)',
        content: '@cparagraph(2, 5)',
        coverImage: "@image('400x200','@color')",
        publishTime: '@now',
      };
      const ResData = {
        code: 200,
        message: 'success',
        data,
      };
      const rand = Math.random();
      if (rand < 0.2) {
        ResData.code = 500;
        ResData.message = '服务器错误';
      } else if (rand < 0.4) {
        ResData.code = 404;
        ResData.message = '接口不存在';
      }
      return ResData;
    },
  },
  {
    url: '/api/discuss/:id',
    method: 'get',

    response: (req: any, res: any) => {
      const t_id = req.url.split('/').pop();
      const data = {
        id: '@guid()',
        title: '@ctitle(5,10)',
        content: '@cparagraph(5)',
        coverImage: "@image('400x200','@color')",
        publishTime: '@now',
      };
      const ResData = {
        code: 200,
        message: 'success',
        data,
      };
      return ResData;
    },
  },
];
export default mock;
