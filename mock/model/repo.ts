export const repoModel: Repo.RepoDetail[] = [
  {
    repoInfo: {
      repoId: '1',
      repoNoteNum: 3,
      repoTitle: '更改测试',
      isStar: false
    },
    createInfo: {
      createDate: 1681542520654,
      createUser: { userId: '0', userName: 'Soybean', userRole: 'admin' }
    },
    noteList: [{ noteId: '1', noteTitle: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitInfo: {
      visitNum: 5,
      visitDate: 1681542520654,
      visitUser: {
        userId: '0',
        userName: 'Soybean',
        userRole: 'admin'
      }
    }
  },
  {
    repoInfo: {
      repoId: '3',
      repoNoteNum: 7,
      repoTitle: 'TypeScript',
      isStar: true
    },
    createInfo: {
      createDate: 1681542520654,
      createUser: { userId: '0', userName: 'Soybean', userRole: 'admin' }
    },
    noteList: [{ noteId: '1', noteTitle: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitInfo: {
      visitNum: 5,
      visitDate: 1681542520654,
      visitUser: {
        userId: '0',
        userName: 'Soybean',
        userRole: 'admin'
      }
    }
  },
  {
    repoInfo: {
      repoId: '7',
      repoNoteNum: 1,
      repoTitle: 'C++',
      isStar: false
    },
    createInfo: {
      createDate: 1681542520654,
      createUser: { userId: '0', userName: 'Soybean', userRole: 'admin' }
    },
    noteList: [{ noteId: '1', noteTitle: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitInfo: {
      visitNum: 5,
      visitDate: 1681542520654,
      visitUser: {
        userId: '0',
        userName: 'Soybean',
        userRole: 'admin'
      }
    }
  },
  {
    repoInfo: {
      repoId: '2',
      repoNoteNum: 0,
      repoTitle: 'Java',
      isStar: false
    },
    createInfo: {
      createDate: 1681542520654,
      createUser: { userId: '0', userName: 'Soybean', userRole: 'admin' }
    },
    noteList: [{ noteId: '1', noteTitle: 'Go语言基础' }],
    repoDesc: '这是一个库',
    visitInfo: {
      visitNum: 5,
      visitDate: 1681542520654,
      visitUser: {
        userId: '0',
        userName: 'Soybean',
        userRole: 'admin'
      }
    }
  }
];

export const repoListModel: Repo.RepoInfo[] = [
  {
    repoId: '1',
    repoNoteNum: 3,
    repoTitle: '你好',
    isStar: false
  },
  {
    repoId: '3',
    repoNoteNum: 7,
    repoTitle: 'TypeScript',
    isStar: true
  },
  {
    repoId: '2',
    repoNoteNum: 0,
    repoTitle: 'Java',
    isStar: false
  },
  {
    repoId: '7',
    repoNoteNum: 1,
    repoTitle: 'C++',
    isStar: false
  }
];
