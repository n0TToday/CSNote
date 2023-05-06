import { defineStore } from 'pinia';
import {
  getAllActiveApi,
  getAuthActiveApi,
  getInfoActiveApi,
  getNoteActiveApi,
  getRepoActiveApi,
  getWorkActiveApi
} from '~/src/service';
import { formatActive } from './helper';
interface ActiveState {
  allActiveList: Stats.Activity[];
  infoActive: Stats.InfoActive;
  workActiveList: Stats.Activity[];
  authActiveList: Stats.Activity[];
  repoActiveList: { repoId: string; activeList: Stats.Activity[] }[];
  noteActiveList: { noteId: string; activeList: Stats.Activity[] }[];
}
export const useActiveStore = defineStore('active-store', {
  state: (): ActiveState => ({
    infoActive: {
      noteNum: 0,
      tagNum: 0,
      repoNum: 0,
      activeNum: 0,
      useDay: 0,
      lastLoginIP: ''
    },
    allActiveList: [],
    workActiveList: [],
    authActiveList: [],
    repoActiveList: [],
    noteActiveList: []
  }),
  getters: {},
  actions: {
    initActiveState() {
      this.getInfoActiveList();
      this.getWorkActiveList();
      this.getAuthActiveList();
    },
    async getActiveList() {
      const { data } = await getAllActiveApi();
      if (data) this.allActiveList = data;
    },
    async getInfoActiveList() {
      const { data } = await getInfoActiveApi();
      if (data) this.infoActive = data;
    },
    async getWorkActiveList() {
      const { data } = await getWorkActiveApi();
      if (data) this.workActiveList = data;
    },
    async getAuthActiveList() {
      const { data } = await getAuthActiveApi();
      if (data) this.authActiveList = data;
    },

    async getRepoActiveList(repoId: string) {
      const { data } = await getRepoActiveApi(repoId);
      if (data) {
        this.repoActiveList.push({
          repoId,
          activeList: data
        });
      }
    },
    hasRepoActiveList(repoId: string) {
      if (repoId) {
        let index = 0;
        for (const repo of this.repoActiveList) {
          if (repo.repoId === repoId) {
            return index;
          }
          index += 1;
        }
      }
      return false;
    },

    async getNoteActiveList(noteId: string) {
      const { data } = await getNoteActiveApi(noteId);
      if (data) {
        this.noteActiveList.push({
          noteId,
          activeList: data
        });
      }
    },
    hasNoteActiveList(noteId: string) {
      if (noteId) {
        let index = 0;
        for (const note of this.noteActiveList) {
          if (note.noteId === noteId) {
            return index;
          }
          index += 1;
        }
      }
      return false;
    },

    formatActiveList(activeList: Stats.Activity[]) {
      const resList = [];
      for (const i of activeList) {
        resList.push(formatActive(i));
      }
      return resList;
    }
  }
});
