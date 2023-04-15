/** 知识库相关类型 */
declare namespace Repo {
  interface RepoInfo {
    repoId: string;
    repoTitle: string;
    repoNoteNum: number;
    isStar: boolean;
  }

  interface RepoDetail {
    repoInfo: RepoInfo;
    repoDesc?: string;
    createInfo: {
      createTime: number;
      createUser: UserInfo;
    };
    visitNum: number;
    noteList: Note.NoteInfoThin[];
  }
}

/** 标签相关类型 */
declare namespace Tag {
  interface TagInfo {
    tagId: string;
    tagTitle: string;
  }

  interface TagDetail {
    tagInfo: TagInfo;
    tagNoteNum: number;
    noteList: Note.NoteInfoThin[];
    createInfo: {
      createTime: number;
      createUser: UserInfo;
    };
  }
}
