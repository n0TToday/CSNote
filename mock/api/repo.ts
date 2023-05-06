import type { MockMethod } from 'vite-plugin-mock';
import { repoModel } from '../model/repo';

const apis: MockMethod[] = [
  {
    url: '/mock/repo',
    method: 'get',
    response: (): Service.MockServiceResult => {
      const repoList = [];
      for (const i of repoModel)
        repoList.push({
          label: i.repoInfo.repoTitle,
          value: i.repoInfo.repoId
        });
      return {
        code: 200,
        message: 'ok',
        data: repoList
      };
    }
  },
  {
    url: '/mock/repo/info',
    method: 'get',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const { findId } = options.query;
      for (const i of repoModel) {
        if (i.repoInfo.repoId === findId) {
          return {
            code: 200,
            message: 'ok',
            data: i.repoInfo
          };
        }
      }
      return {
        code: 200,
        message: 'error',
        data: `不存在或权限不足${findId}`
      };
    }
  },
  {
    url: '/mock/repo/detail',
    method: 'get',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const { findId } = options.query;
      for (const i of repoModel) {
        if (i.repoInfo.repoId === findId) {
          return {
            code: 200,
            message: 'ok',
            data: i
          };
        }
      }
      return {
        code: 200,
        message: 'error',
        data: `不存在或权限不足${findId}`
      };
    }
  }
];

export default apis;
