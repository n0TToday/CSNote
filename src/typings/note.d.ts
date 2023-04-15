/** 笔记、速记相关类型 */
declare namespace Note {
  /** 笔记简略信息 */
  interface NoteInfo {
    noteId: string;
    noteTitle: string;
    /** 区分速记和笔记类型 */
    noteType: 'note' | 'fast';
    noteRepo?: Repo.RepoInfo;
    isShare: boolean;
    isStar: boolean;
    isArchive: boolean;
    visitNum: number;
    noteTag: Tag.TagInfo[];
    createInfo: {
      createTime: number;
      createUser: UserInfo;
    };
  }

  /** 笔记具体内容 */
  interface NoteDetail {
    noteInfo: NoteInfo;
    noteContent: any;
  }

  interface NoteInfoThin {
    noteId: string;
    noteTitle: string;
  }
}
