import { getNowTimeStamp, isNull } from '~/src/utils';
import { useAuthStore } from '../auth';

export const emptyTagInfo: Tag.TagInfo = {
  tagId: '',
  tagTitle: ''
};
export const emptyTag: Tag.TagDetail = {
  tagInfo: emptyTagInfo,
  tagNoteNum: 0,
  createInfo: {
    createTime: 0,
    createUser: {
      userId: '',
      userName: '',
      userRole: 'user'
    }
  },
  noteList: [{ noteId: '', noteTitle: '' }]
};
export function initNewTag() {
  const newTag = emptyTag;
  newTag.createInfo.createTime = getNowTimeStamp();
  newTag.createInfo.createUser = useAuthStore().userInfo;
  return newTag;
}

export function isEmptyTag(Tag: Tag.TagDetail) {
  if (Tag === emptyTag) {
    return true;
  }
  return false;
}

/** 检查Tag中Note是否存在并返回位置 */
export function hasNoteInTag(Tag: Tag.TagDetail, noteId: string) {
  if (isNull(noteId)) return false;
  const noteList = Tag.noteList;
  let index = 0;
  for (const i of noteList) {
    if (i.noteId === noteId) {
      return index;
    }
    index += 1;
  }
  return false;
}
