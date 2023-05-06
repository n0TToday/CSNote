import { getNowTimeStamp } from '~/src/utils';
import { useAuthStore } from '../auth';

export const emptyRepo: Repo.RepoDetail = {
  repoId: '',
  repoTitle: '',
  repoNoteNum: 0,
  visitNum: 0,
  updateTime: 0,
  isStar: false,
  starTime: 0,
  isDel: false,
  delTime: 0,
  createTime: 0,
  userId: '',
  userName: '',
  noteList: [
    {
      noteId: '',
      noteTitle: '',
      isStar: false,
      isArchive: false,
      isShare: false,
      createTime: 0,
      updateTime: 0
    }
  ]
};

export function initNewRepo(rt: string) {
  const newRepo = {
    repoTitle: rt
  };
  return newRepo;
}

export function getCreateInfo() {
  const createInfo = {
    createTime: getNowTimeStamp(),
    createUser: useAuthStore().userInfo
  };
  return createInfo;
}

export function isEmptyRepo(repo: Repo.RepoDetail) {
  if (repo === emptyRepo) {
    return true;
  }
  return false;
}

/** 检查repo中Note是否存在并返回位置 */
// export function hasNoteInRepo(repo: Repo.RepoDetail, value: string) {
//   if (isNull(value)) return false;
//   const noteList = repo.noteList;
//   let index = 0;
//   for (const i of noteList) {
//     if (i.value === value) {
//       return index;
//     }
//     index += 1;
//   }
//   return false;
// }
