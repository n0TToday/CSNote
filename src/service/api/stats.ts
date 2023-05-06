import { request } from '../request';

export function getAllActiveApi() {
  return request.get<Stats.Activity[]>(`/stats/`);
}
export function getAuthActiveApi() {
  return request.get<Stats.Activity[]>(`/stats/auth`);
}
export function getRepoActiveApi(repoId: string) {
  return request.get<Stats.Activity[]>(`/stats/repo/${repoId}`);
}
export function getNoteActiveApi(noteId: string) {
  return request.get<Stats.Activity[]>(`/stats/note/${noteId}`);
}
export function getInfoActiveApi() {
  return request.get<Stats.InfoActive>(`/stats/info`);
}
export function getWorkActiveApi() {
  return request.get<Stats.Activity[]>(`/stats/work`);
}
