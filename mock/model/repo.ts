export const repoModel: Repo.RepoDetail[] = [
  {
    repoInfo: {
      repoId: 'repo123',
      repoNoteNum: 1,
      repoTitle: 'Go语言知识库',
      isStar: false
    },
    createInfo: {
      createTime: 1681542520654,
      createUser: { userId: '0', userName: '刘晓炜', userRole: 'user' }
    },
    noteList: [{ value: 'note123', label: '这是一个笔记标题' }],
    repoDesc: '这是一个库',
    visitNum: 123
  },
  {
    repoInfo: {
      repoId: '3',
      repoNoteNum: 7,
      repoTitle: 'TypeScript',
      isStar: true
    },
    createInfo: {
      createTime: 1681542520654,
      createUser: { userId: '0', userName: '刘晓炜', userRole: 'admin' }
    },
    noteList: [{ value: '1', label: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitNum: 11
  },
  {
    repoInfo: {
      repoId: '7',
      repoNoteNum: 1,
      repoTitle: 'C++',
      isStar: false
    },
    createInfo: {
      createTime: 1681542520654,
      createUser: { userId: '0', userName: '刘晓炜', userRole: 'admin' }
    },
    noteList: [{ value: '1', label: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitNum: 1
  },
  {
    repoInfo: {
      repoId: '2',
      repoNoteNum: 0,
      repoTitle: 'Java',
      isStar: false
    },
    createInfo: {
      createTime: 1681542520654,
      createUser: { userId: '0', userName: '刘晓炜', userRole: 'admin' }
    },
    noteList: [{ value: '1', label: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitNum: 1
  }
];
