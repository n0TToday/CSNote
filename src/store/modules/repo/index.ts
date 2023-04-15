import { defineStore } from 'pinia';
import { createRepoApi, deleteRepoApi, getRepoDetailApi, getRepoListApi, updateRepoApi } from '~/src/service';
import { isNull } from '~/src/utils';
import { emptyRepo, emptyRepoInfo, hasNoteInRepo, initNewRepo } from './helper';

interface RepoState {
  /** 使用到的知识库信息状态，在state中按需使用 */
  repoDetail: Repo.RepoDetail[];
  /** 用户名下所有知识库，由后端返回 */
  repoList: Repo.RepoInfo[];
}

export const useRepoStore = defineStore('repo-store', {
  state: (): RepoState => ({
    repoDetail: [emptyRepo],
    repoList: [emptyRepoInfo]
  }),
  getters: {},
  actions: {
    /* store本身相关业务逻辑 */

    /** 重置store */
    resetRepoStore() {
      this.$reset();
    },

    /** 检查repo是否已存在并返回位置 */
    hasRepoInState(repoId: string) {
      if (isNull(repoId)) return false;
      let index = 0;
      for (const repo of this.repoDetail) {
        if (repo.repoInfo.repoId === repoId) {
          return index;
        }
        index += 1;
      }
      return false;
    },

    /** 向state中添加repo */
    addRepoToState(repo: Repo.RepoDetail) {
      const repoId: string = repo.repoInfo.repoId;
      if (isNull(repoId)) return false;
      if (this.hasRepoInState(repoId)) return false;

      this.repoDetail.push(repo);
      return true;
    },

    /** 从state中删除repo */
    removeRepoFromState(repoId: string) {
      const num = this.hasRepoInState(repoId);
      if (num) {
        this.repoDetail.splice(num);
        return true;
      }
      return false;
    },

    /* 更新state中repo元素 */
    updateRepoInState(repo: Repo.RepoDetail) {
      const repoId: string = repo.repoInfo.repoId;
      this.removeRepoFromState(repoId);
      if (!this.addRepoToState(repo)) return false;
      return true;
    },

    /* 知识库相关业务逻辑 */

    /** 创建新知识库 */
    async createNewRepo(title: string, desc?: string) {
      // 初始化新知识库 包含创建时间及用户信息
      const newRepo = initNewRepo();

      // 生成根据传入参数生成新知识库实例
      newRepo.repoInfo.repoTitle = title;
      if (desc) newRepo.repoDesc = desc;

      // 调用创建函数
      const { data } = await createRepoApi(newRepo);

      // 返回结果repoId
      if (data) {
        newRepo.repoInfo.repoId = data;
        // 更新知识库列表
        await this.refreshRepoList();
        // 更新state
        if (this.addRepoToState(newRepo)) {
          window.$notification?.success({
            title: '创建知识库成功!',
            content: `添加你的第一个笔记吧!`,
            duration: 3000
          });
        }
        // To-Do
        // 询问是否进入新建的知识库
      }
    },

    /** 查找知识库信息 */
    async getRepoDetail(repoId: string) {
      // 获取当前知识库详情
      const num = this.hasRepoInState(repoId);
      if (num) {
        return this.repoDetail[num];
      }
      const { data } = await getRepoDetailApi(repoId);
      if (data) return data;

      return false;
    },

    /** 修改知识库信息 */
    async updateRepo(repo: Repo.RepoDetail) {
      const repoId = repo.repoInfo.repoId;
      const { data } = await updateRepoApi(repoId, repo);
      if (data) {
        // 刷新库列表
        await this.refreshRepoList;
        // 更新state
        if (this.updateRepoInState(data)) {
          return true;
        }
      }
      return false;
    },

    /** 删库，跑路 */
    async deleteRepo(repoId: string) {
      // 页面逻辑中应将该知识库下所有笔记修改为默认知识库
      // 调用删除函数
      return deleteRepoApi(repoId);
    },

    /* 抽象出复用具体业务逻辑 */

    /** 刷新知识库列表 */
    async refreshRepoList() {
      // 重新请求后端数据库
      const { data } = await getRepoListApi();
      if (data) {
        // 将state中的列表用返回的列表替换
        this.repoList = data;
      }
    },

    /** 向库中添加笔记 */
    async addNoteToRepo(note: Note.NoteInfoThin, repoId: string) {
      const repo = await this.getRepoDetail(repoId);
      if (repo) {
        // 修改知识库中笔记列表
        repo.noteList.push(note);
        // 修改知识库笔记数量
        repo.repoInfo.repoNoteNum += 1;
        // 提交更新
        return this.updateRepo(repo);
      }
      return false;
    },

    /** 从库中删除笔记 */
    async deleteNoteFromRepo(note: Note.NoteInfoThin, repoId: string) {
      // 获取当前知识库详情
      const repo = await this.getRepoDetail(repoId);
      if (repo) {
        const num = hasNoteInRepo(repo, note.noteId);
        if (num) {
          // 修改知识库中笔记列表
          repo.noteList.splice(num);
          // 修改知识库笔记数量
          repo.repoInfo.repoNoteNum -= 1;
        }
        // 提交更新
        return this.updateRepo(repo);
      }
      return false;
    },

    /** 从旧库中笔记到新库 */
    async moveNoteToRepo(note: Note.NoteInfoThin, oldRepoId: string, newRepoId: string) {
      // 添加进新知识库
      if (await this.addNoteToRepo(note, newRepoId))
        // 从旧知识库中删除并更新
        return this.deleteNoteFromRepo(note, oldRepoId);
      return false;
    }
  }
});
