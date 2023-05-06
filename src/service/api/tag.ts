import { request } from '../request';

export function getTagApi(tagId: string) {
  return request.get<Tag.TagDetail>(`/tag/${tagId}`);
}

export function getTagListApi() {
  return request.get<Tag.TagList[]>(`/tag/`);
}
