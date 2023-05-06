/** 知识库相关类型 */
declare namespace Repo {
  interface RepoDetail {
    repoId: string;
    repoTitle: string;

    repoNoteNum: number;
    visitNum: number;
    updateTime: number;

    isStar: boolean;
    starTime: number;

    isDel: boolean;
    delTime: number;

    createTime: number;
    userId: string;
    userName: string;

    noteList: {
      noteId: string;
      noteTitle: string;
      isStar: boolean;
      isShare: boolean;
      isArchive: boolean;
      createTime: number;
      updateTime: number;
    }[];
  }
  /** 普通（包括收藏）知识库 列表 */
  interface RepoList {
    repoId: string;
    repoTitle: string;
    repoNoteNum: number;
    isStar: boolean;
    createTime: number;
  }
  /** 收藏的知识库 列表 */
  interface StarRepoList {
    repoId: string;
    repoTitle: string;
    repoNoteNum: number;
    starTime: number;
  }
  /** 回收站知识库 列表 */
  interface DelRepoList {
    repoId: string;
    repoTitle: string;
    repoNoteNum: number;
    delTime: number;
  }
}

/** 标签相关类型 */
declare namespace Tag {
  interface TagDetail {
    tagId?: string;
    tagTitle: string;
    tagNoteNum: number;
    createTime: number;
    userId: string;
    userName: string;
  }
  interface TagList {
    tagId?: string;
    tagTitle: string;
    tagNoteNum: number;
    createTime: number;
  }
}
