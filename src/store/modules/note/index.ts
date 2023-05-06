import { defineStore } from 'pinia';
import {
  createNoteApi,
  deleteNoteApi,
  getArchNoteListApi,
  getDelNoteListApi,
  getFastNoteListApi,
  getNoteApi,
  getShareNoteListApi,
  getStarNoteListApi,
  updateNoteApi
} from '~/src/service';
import { isNumber } from '~/src/utils';
import { useAppStore } from '../app';
import { initNewFastNote } from './helper';

interface NoteState {
  noteDetail: Note.NoteDetail[];
  currentNote?: Note.NoteDetail;
  fastNoteList: Note.FastNoteList[];
  delNoteList: Note.DelNoteList[];
  archNoteList: Note.ArchNoteList[];
  starNoteList: Note.StarNoteList[];
  shareNoteList: Note.ShareNoteList[];
}

/* 业务需要：
四个列表
一个详情列表
一个当前
*/

/* 业务操作：
1. 回收站笔记
	- API 更新笔记（后端修改del状态及时间）
	- 删除笔记详情
	- 刷新列表
2. 归档笔记
	- API 更新笔记（后端修改arch状态及时间）
	- 刷新笔记详情
	- 刷新列表
3. 收藏笔记
	- API 更新笔记（后端修改star状态及时间）
	- 刷新笔记详情
	- 刷新列表

4. 分享笔记
	- API 更新笔记（后端修改share状态及时间）
	- 刷新笔记详情
	- 刷新列表

5. 编辑笔记信息
	- 获取详情
	- 替换详情
	- API 更新笔记
	- 刷新笔记详情
	- 刷新列表

6. 编辑笔记内容

7. 查看笔记
	- 本地在线

8. 彻底删除笔记
	- API 删除笔记
	- 后端：将笔记所在知识库的笔记列表更新，更新标签数量
	- 刷新列表
	- 删除笔记详情

9. 初始化四个列表 */

export const useNoteStore = defineStore('note-store', {
  state: (): NoteState => ({
    noteDetail: [],
    currentNote: undefined,
    fastNoteList: [],
    delNoteList: [],
    archNoteList: [],
    starNoteList: [],
    shareNoteList: []
  }),
  getters: {},
  actions: {
    /* 创建速记 */
    async createNewFastNote(content: string) {
      // 生成速记
      const newNote = initNewFastNote(content);
      // 获取实例，提交后端
      const { data } = await createNoteApi(newNote);
      // 获取后端返回Id
      if (data) {
        // 保存状态
        this.initList();
        window.$message?.success('速记已保存~');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
        return true;
      }
      return false;
    },

    /* 创建笔记 */
    async createNewNote(newNote: Note.NoteDetail) {
      // 获取实例，提交后端
      const { data } = await createNoteApi(newNote);
      // 获取后端返回Id
      if (data) {
        // 保存状态
        this.refreshND(data);
        window.$message?.success('笔记创建成功');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
        this.initList();
      }
    },

    /* 修改笔记状态 */
    async changeNote(noteId: string, type: string) {
      const { data } = await updateNoteApi(noteId, type);
      if (data) {
        if (isNumber(this.hasND(noteId))) this.refreshND(noteId);
        this.initList();
        window.$message?.success('笔记修改成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
      }
    },

    /* 编辑笔记 */
    async editNote(noteId: string) {
      // 获取修改后内容
      const num = this.hasND(noteId);
      if (isNumber(num)) {
        const newNote = this.noteDetail[num];
        // API
        const { data } = await updateNoteApi(noteId, 'update', newNote);
        if (data) {
          this.refreshND(noteId);
          this.initList();
          window.$message?.success('笔记修改成功！');
          setTimeout(() => {
            useAppStore().reloadPage();
          }, 1000);
        }
      }
    },

    /* 收藏操作 */
    async starNote(noteId: string) {
      // 获取repo详情
      const note = await this.getND(noteId);
      if (note) {
        // 更新note
        await updateNoteApi(noteId, 'star', note);
        // 刷新三个list
        this.initList();
        // 刷新RD
        this.refreshND(noteId);
        window.$message?.success('操作成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
      }
    },

    // 回收操作
    async delNote(noteId: string) {
      // 获取repo详情
      const note = await this.getND(noteId);
      if (note) {
        // 更新note
        await updateNoteApi(noteId, 'del', note);
        // 刷新三个list
        this.initList();
        // 刷新RD
        this.refreshND(noteId);
        window.$message?.success('操作成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
      }
    },

    async archNote(noteId: string) {
      // 获取repo详情
      const note = await this.getND(noteId);
      if (note) {
        // 更新note
        await updateNoteApi(noteId, 'arch', note);
        // 刷新三个list
        this.initList();
        // 刷新RD
        this.refreshND(noteId);
        window.$message?.success('操作成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
      }
    },

    async shareNote(noteId: string) {
      // 获取repo详情
      const note = await this.getND(noteId);
      if (note) {
        // 更新note
        await updateNoteApi(noteId, 'share', note);
        // 刷新三个list
        this.initList();
        // 刷新RD
        this.refreshND(noteId);
        window.$message?.success('操作成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
      }
    },
    /** 彻底删除笔记详情 */
    async deleteNote(noteId: string) {
      const { data } = await deleteNoteApi(noteId);
      if (data) {
        this.initList();
        this.deleteND(noteId);
        window.$message?.success('删除成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 1000);
      }
    },

    // 获取笔记详情(先本地，再在线)
    async getND(noteId: string) {
      // 检查状态
      const num = this.hasND(noteId);
      if (isNumber(num)) {
        // 有，直接返回
        return this.noteDetail[num];
      }
      // 没有，请求后端返回并保存
      const { data } = await getNoteApi(noteId);
      if (data) {
        this.noteDetail.push(data);
        return data;
      }
      return false;
    },

    // 查找笔记存在
    hasND(noteId: string) {
      let index = 0;
      for (const note of this.noteDetail) {
        if (note.noteId === noteId) {
          return index;
        }
        index += 1;
      }
      return false;
    },

    // 刷新笔记详情（在线刷新）
    async refreshND(noteId: string) {
      const { data } = await getNoteApi(noteId);
      if (data) {
        // 找有没有
        const num = this.hasND(noteId);
        if (isNumber(num)) {
          // 有就刷新
          this.noteDetail[num] = data;
        }
        // 没有就添加
        this.noteDetail.push(data);
      }
    },

    // 删除笔记详情
    deleteND(noteId: string) {
      // 找有没有
      const num = this.hasND(noteId);
      if (isNumber(num)) {
        this.noteDetail.splice(num);
        return true;
      }
      return false;
    },

    // 初始化列表
    async initDelList() {
      const { data } = await getDelNoteListApi();
      if (data) {
        this.delNoteList = data;
        return true;
      }
      return false;
    },
    async initFastList() {
      const { data } = await getFastNoteListApi();
      if (data) {
        this.fastNoteList = data;
        return true;
      }
      return false;
    },
    async initStarList() {
      const { data } = await getStarNoteListApi();
      if (data) {
        this.starNoteList = data;
        return true;
      }
      return false;
    },
    async initArchList() {
      const { data } = await getArchNoteListApi();
      if (data) {
        this.archNoteList = data;
        return true;
      }
      return false;
    },
    async initShareList() {
      const { data } = await getShareNoteListApi();
      if (data) {
        this.shareNoteList = data;
        return true;
      }
      return false;
    },

    initList() {
      this.initFastList();
      this.initDelList();
      this.initStarList();
      this.initArchList();
      this.initShareList();
    }
  }
});
