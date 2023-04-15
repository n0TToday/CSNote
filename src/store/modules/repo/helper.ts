import { getNowTimeStamp, isNull } from '~/src/utils';
import { useAuthStore } from '../auth';

export const emptyRepoInfo: Repo.RepoInfo = {
  repoId: '',
  repoNoteNum: 0,
  repoTitle: '',
  isStar: false
};
export const emptyRepo: Repo.RepoDetail = {
  repoInfo: emptyRepoInfo,
  createInfo: {
    createDate: 0,
    createUser: {
      userId: '',
      userName: '',
      userRole: 'user'
    }
  },
  noteList: [{ noteId: '', noteTitle: '' }]
};

export function initNewRepo() {
  const newRepo = emptyRepo;
  newRepo.createInfo.createDate = getNowTimeStamp();
  newRepo.createInfo.createUser = useAuthStore().userInfo;
  return newRepo;
}

export function isEmptyRepo(repo: Repo.RepoDetail) {
  if (repo === emptyRepo) {
    return true;
  }
  return false;
}

/** 检查repo中Note是否存在并返回位置 */
export function hasNoteInRepo(repo: Repo.RepoDetail, noteId: string) {
  if (isNull(noteId)) return false;
  const noteList = repo.noteList;
  let index = 0;
  for (const i of noteList) {
    if (i.noteId === noteId) {
      return index;
    }
    index += 1;
  }
  return false;
}
