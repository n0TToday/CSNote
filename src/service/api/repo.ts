import { mockRequest } from '../request';

export function getRepoInfoApi(repoId: string) {
  return mockRequest.get<Repo.RepoInfo>(`/note/repo/${repoId}`);
}

export function getRepoDetailApi(repoId: string) {
  return mockRequest.get<Repo.RepoDetail>(`/repo/${repoId}`);
}

export function getRepoListApi() {
  return mockRequest.get<Repo.RepoInfo[]>(`/repo/`);
}

export function createRepoApi(newRepo: Repo.RepoDetail) {
  return mockRequest.post<string>('/repo', newRepo);
}

export function deleteRepoApi(repoId: string) {
  return mockRequest.delete<boolean>(`/repo/${repoId}`, {});
}

export function updateRepoApi(repoId: string, modifyRepo: Repo.RepoDetail) {
  return mockRequest.put<Repo.RepoDetail>(`/repo/${repoId}`, modifyRepo);
}
