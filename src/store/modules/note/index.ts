import { defineStore } from 'pinia';
import {
  createNoteApi,
  deleteNoteApi,
  getNoteDetailApi,
  getNoteInfoApi,
  updateNoteDetailApi,
  updateNoteInfoApi
} from '~/src/service';
import { isNull } from '~/src/utils';
import { useRepoStore } from '../repo';
import { initNewRepo } from '../repo/helper';
import { emptyNoteInfo } from './helper';

interface NoteState {
  noteInfo: Note.NoteInfo[];
}

export const useNoteStore = defineStore('note-store', {
  state: (): NoteState => ({
    noteInfo: [emptyNoteInfo]
  }),
  getters: {},
  actions: {
    /* 对 state 操作
		state：保存到Info，缓存
		state：has，从Info中删除
		state：has，更新Info
		state：has，没有获取，保存到Info

		*/
    resetNoteStore() {
      this.$reset();
    },

    hasNoteInfoInState(noteId: string) {
      if (isNull(noteId)) return false;
      let index = 0;
      for (const note of this.noteInfo) {
        if (note.noteId === noteId) {
          return index;
        }
        index += 1;
      }
      return false;
    },

    addNoteInfoToState(noteInfo: Note.NoteInfo) {
      const noteId = noteInfo.noteId;
      if (this.hasNoteInfoInState(noteId)) return false;

      this.noteInfo.push(noteInfo);
      return true;
    },

    removeNoteInfoFromState(noteId: string) {
      const num = this.hasNoteInfoInState(noteId);
      if (num) {
        this.noteInfo.splice(num);
        return true;
      }
      return false;
    },

    updateNoteInfoInState(noteInfo: Note.NoteInfo) {
      const noteId: string = noteInfo.noteId;
      const num = this.hasNoteInfoInState(noteId);
      if (num) {
        this.noteInfo[num] = noteInfo;
        return true;
      }
      return false;
    },

    /* 业务逻辑整理
				笔记、速记
				增 —— 新建笔记、新建速记、保存笔记至自己知识库
				删 —— 删除笔记
				改 —— 更改标题、更改内容、更改分类、更改标签、分享笔记、取消分享、速记类型转换、归档笔记
				查 —— 获取笔记简介、获取笔记内容（并记录访问）

				笔记内容由单个组件单独存储

				待添加：
				1. 鉴权
				2. 记录活动记录

				*/

    async getNoteInfo(noteId: string) {
      // 检查状态
      const num = this.hasNoteInfoInState(noteId);
      if (num) {
        // 有，直接返回
        return this.noteInfo[num];
      }
      // 没有，请求后端返回并保存状态
      const { data } = await getNoteInfoApi(noteId);
      if (data) {
        this.addNoteInfoToState(data);
        return data;
      }
      return false;
    },

    async getNoteDetail(noteId: string) {
      const { data } = await getNoteDetailApi(noteId);
      if (data) {
        // 检查状态
        if (this.hasNoteInfoInState(noteId)) {
          // 有，更新状态
          this.updateNoteInfoInState(data.noteInfo);
        }
        // 没有，保存状态
        this.addNoteInfoToState(data.noteInfo);
        return data;
      }
      return false;
      // 返回详情
    },

    async createNewNote(note: Note.NoteDetail) {
      // 获取实例，提交后端
      const { data } = await createNoteApi(note);
      // 获取后端返回Id
      if (data) {
        const noteInfo = note.noteInfo;
        noteInfo.noteId = data;
        // 保存状态
        this.addNoteInfoToState(note.noteInfo);
        // 下一步操作
        return data;
      }
      return false;
    },

    async deleteNote(noteId: string) {
      // 鉴权
      // 提交后端
      const { data } = await deleteNoteApi(noteId);
      if (data) {
        // 检查状态，删除状态
        const num = this.hasNoteInfoInState(noteId);
        if (num) {
          return this.removeNoteInfoFromState(noteId);
        }
        return true;
      }
      return false;
    },

    async updateNoteInfo(noteInfo: Note.NoteInfo) {
      const noteId = noteInfo.noteId;
      const { data } = await updateNoteInfoApi(noteId, noteInfo);
      if (data) {
        // 更新状态
        if (this.updateNoteInfoInState(data)) {
          // 没有，保存状态
          this.addNoteInfoToState(data);
        }
        return data;
      }
      return false;
    },

    async updateNoteContent(note: Note.NoteDetail) {
      const noteId = note.noteInfo.noteId;
      const { data } = await updateNoteDetailApi(noteId, note);
      if (data) {
        if (!this.updateNoteInfoInState(data.noteInfo)) {
          this.addNoteInfoToState(data.noteInfo);
        }
        return data;
      }
      return false;
    },

    async saveNoteToOwnLib(noteId: string) {
      // 获取后端实例
      const note = await this.getNoteDetail(noteId);
      if (note) {
        // 更改create信息
        note.noteInfo.createInfo = initNewRepo().createInfo;
        // 提交后端
        const data = await this.createNewNote(note);
        if (data) {
          return data;
        }
      }
      return false;
    },

    async classifyNote(noteId: string, repoInfo: Repo.RepoInfo) {
      const noteInfo = await this.getNoteInfo(noteId);
      if (noteInfo) {
        noteInfo.noteRepo = repoInfo;
        if (await this.updateNoteInfo(noteInfo)) {
          const repoStore = useRepoStore();
          repoStore.moveNoteToRepo(
            { noteId, noteTitle: noteInfo.noteTitle },
            noteInfo.noteRepo.repoId,
            repoInfo.repoId
          );
        }
        return true;
      }
      return false;
    },

    async starNote(noteId: string) {
      const noteInfo = await this.getNoteInfo(noteId);
      if (noteInfo) {
        noteInfo.isStar = !noteInfo.isStar;
        if (await this.updateNoteInfo(noteInfo)) return true;
      }
      return false;
    },

    async shareNote(noteId: string) {
      const noteInfo = await this.getNoteInfo(noteId);
      if (noteInfo) {
        noteInfo.isShare = !noteInfo.isShare;
        if (await this.updateNoteInfo(noteInfo)) return true;
      }
      return false;
    },

    async archiveNote(noteId: string) {
      /* To-Do
			用户注册时默认创建未分类和已归档两个知识库用以保存笔记。
			*/
      const archiveRepo: Repo.RepoInfo = {
        repoId: '',
        isStar: false,
        repoNoteNum: 0,
        repoTitle: '已归档'
      };
      const noteInfo = await this.getNoteInfo(noteId);
      if (noteInfo) {
        noteInfo.isArchive = !noteInfo.isArchive;
        if (await this.classifyNote(noteInfo.noteId, archiveRepo)) return true;
      }
      return false;
    }
  }
});
