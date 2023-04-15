import { getNowTimeStamp, isNull } from '~/src/utils';
import { useAuthStore } from '../auth';

const userStore = useAuthStore();

export const emptyNoteInfo: Note.NoteInfo = {
  noteId: '',
  noteTitle: '',
  noteType: 'note',
  noteRepo: undefined,
  isArchive: false,
  noteTag: [],
  createInfo: {
    createTime: 0,
    createUser: {
      userId: '',
      userName: '',
      userRole: 'user'
    }
  },
  isShare: false,
  visitNum: 0
};

export const emptyNote: Note.NoteDetail = {
  noteInfo: emptyNoteInfo,
  noteContent: ''
};

const emptyFastNote = emptyNote;
emptyFastNote.noteInfo.noteType = 'fast';

/* 笔记模块辅助业务逻辑 */

/* 初始化一个新笔记 */
export function initNewNote() {
  const newNote = emptyNote;
  newNote.noteInfo.createInfo.createTime = getNowTimeStamp();
  newNote.noteInfo.createInfo.createUser = userStore.userInfo;
  return newNote;
}

/* 初始化一个新速记 */
export function initNewFastNote() {
  const newFastNote = emptyFastNote;
  newFastNote.noteInfo.createInfo.createTime = getNowTimeStamp();
  newFastNote.noteInfo.createInfo.createUser = userStore.userInfo;
  return newFastNote;
}

export function isEmptyNote(note: Note.NoteDetail) {
  if (note === emptyNote) {
    return true;
  }
  return false;
}

export function isEmptyFastNote(note: Note.NoteDetail) {
  if (note === emptyFastNote) {
    return true;
  }
  return false;
}

/** 检查Note中Tag是否存在并返回位置 */
export function hasNoteInNote(noteInfo: Note.NoteInfo, tagId: string) {
  if (isNull(tagId)) return false;
  const tagList = noteInfo.noteTag;
  let index = 0;
  for (const i of tagList) {
    if (i.tagId === tagId) {
      return index;
    }
    index += 1;
  }
  return false;
}
