export const emptyNote: Note.NoteDetail = {
  noteId: '',
  noteTitle: '',
  noteType: 'note',
  updateTime: 0,
  isShare: false,
  shareTime: 0,
  isStar: false,
  starTime: 0,
  isArchive: false,
  archTime: 0,
  isDel: false,
  delTime: 0,
  repoId: '',
  visitNum: 0,
  tagList: [],
  createTime: 0,
  userId: '',
  userName: '',
  noteContent: undefined
};

const emptyFastNote = emptyNote;
emptyFastNote.noteType = 'fast';

/* 笔记模块辅助业务逻辑 */

/* 初始化一个新笔记 */
export function initNewNote() {
  const newNote = emptyNote;
  return newNote;
}

/* 初始化一个新速记 */
export function initNewFastNote(cont: string) {
  const newFastNote = emptyFastNote;
  newFastNote.noteType = 'fast';
  newFastNote.noteContent = cont;
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
// export function hasNoteInNote(noteInfo: Note.NoteInfo, tagId: string) {
//   if (isNull(tagId)) return false;
//   const tagList = noteTag;
//   let index = 0;
//   for (const i of tagList) {
//     if (i.tagId === tagId) {
//       return index;
//     }
//     index += 1;
//   }
//   return false;
// }
