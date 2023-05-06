/** 笔记、速记相关类型 */
declare namespace Note {
  interface NoteDetail {
    noteId: string;
    noteTitle: string;
    noteType: string;
    visitNum: number;
    repoId: string;
    tagList: string[];
    updateTime: number;

    isShare: boolean;
    shareTime: number;

    isStar: boolean;
    starTime: number;

    isArchive: boolean;
    archTime: number;

    isDel: boolean;
    delTime: number;

    createTime: number;
    userId: string;
    userName: string;

    noteContent: any;
  }

  interface FastNoteList {
    noteId: string;
    noteContent: string;
    createTime: number;
  }
  interface DelNoteList {
    noteId: string;
    noteTitle: string;
    delTime: number;
  }
  interface StarNoteList {
    noteId: string;
    noteTitle: string;
    starTime: number;
  }
  interface ArchNoteList {
    noteId: string;
    noteTitle: string;
    archTime: number;
  }
  interface ShareNoteList {
    noteId: string;
    noteTitle: string;
    shareTime: number;
  }
}
