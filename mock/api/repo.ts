import type { MockMethod } from 'vite-plugin-mock';
import { repoListModel } from '../model/repo';

const apis: MockMethod[] = [
  {
    url: '/mock/repo',
    method: 'get',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      return {
        code: 200,
        message: 'ok',
        data: repoListModel
      };
    }
  }
];

export default apis;
