import type { MockMethod } from 'vite-plugin-mock';
import { tagModel } from '../model/tag';

const apis: MockMethod[] = [
  {
    url: '/mock/tag',
    method: 'get',
    response: (): Service.MockServiceResult => {
      const tagList = [];
      for (const i of tagModel) tagList.push(i.tagInfo);
      return {
        code: 200,
        message: 'ok',
        data: tagList
      };
    }
  },
  {
    url: '/mock/tag',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const newTag = options.body;
      newTag.tagInfo.value = `tag${Math.floor(Math.random() * 1000 + 0)}`;
      tagModel.push(newTag);
      return {
        code: 200,
        message: 'ok',
        data: newTag.tagInfo.value
      };
    }
  }
];

export default apis;
