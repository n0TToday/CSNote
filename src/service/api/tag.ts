import { mockRequest } from '../request';

export function getTagApi(tagId: string) {
  return mockRequest.get<Tag.TagDetail>(`/Tag/${tagId}`);
}

export function getTagListApi() {
  return mockRequest.get<Tag.TagInfo[]>(`/Tag/`);
}

export function createTagApi(newTag: Tag.TagDetail) {
  return mockRequest.post<string>('/Tag', newTag);
}

export function deleteTagApi(tagId: string) {
  return mockRequest.delete<boolean>(`/Tag/${tagId}`, {});
}

export function updateTagApi(tagId: string, modifyTag: Tag.TagDetail) {
  return mockRequest.put<Tag.TagDetail>(`/Tag/${tagId}`, modifyTag);
}
