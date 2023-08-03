import { MockMethod } from 'vite-plugin-mock';

const mock: Array<MockMethod> = [
  {
    url: '/api/test',
    method: 'get',
    response: () => ({
      code: 0,
      message: 'ok',
      'data|5': [
        {
          'id|+1': 0,
          username: '@cname',
          date: '@date(yyyy-MM-dd)',
          // description:'@paragraph',
          email: '@email()',
          'age|18-50': 18,
        },
      ],
    }),
  },
];
export default mock;
