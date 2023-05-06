import { request } from '../request';

export function getDelRepoListApi() {
  return request.get<Repo.DelRepoList[]>(`/repo?type=del`);
}

export function getStarRepoListApi() {
  return request.get<Repo.StarRepoList[]>(`/repo?type=star`);
}

export function getRepoListApi() {
  return request.get<Repo.RepoList[]>(`/repo`);
}

export function getRepoApi(repoId: string) {
  return request.get<Repo.RepoDetail>(`/repo/${repoId}`);
}

export function createRepoApi(newRepo: object) {
  return request.post<string>('/repo', newRepo);
}

export function updateRepoApi(type: string, repoId: string, modifyRepo?: Repo.RepoDetail) {
  return request.put<Repo.RepoDetail>(`/repo/${repoId}?type=${type}`, modifyRepo);
}

export function deleteRepoApi(repoId: string) {
  return request.delete<boolean>(`/repo/${repoId}`, {});
}
