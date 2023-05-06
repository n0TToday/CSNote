export const noteModel: Note.NoteDetail[] = [
  {
    noteInfo: {
      noteId: 'note123',
      noteTitle: '这是一个笔记标题',
      noteType: 'note',
      noteRepo: 'repo123',
      isArchive: false,
      isStar: false,
      noteTag: [{ value: 'tag123', label: '这是一个标签' }],
      createInfo: {
        createTime: 1681542520654,
        createUser: {
          userId: '0',
          userName: 'Soybean',
          userRole: 'user'
        }
      },
      isShare: false,
      visitNum: 54
    },
    noteContent: {}
  }
];
