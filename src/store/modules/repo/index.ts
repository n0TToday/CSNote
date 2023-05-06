import { defineStore } from 'pinia';
import {
  createRepoApi,
  deleteRepoApi,
  getDelRepoListApi,
  getRepoApi,
  getRepoListApi,
  getStarRepoListApi,
  updateRepoApi
} from '~/src/service';
import { isNumber } from '~/src/utils';
import { useAppStore } from '../app';

interface RepoState {
  /** 知识库详情 */
  repoDetail: Repo.RepoDetail[];
  /** 当前知识库 */
  currentRepo?: Repo.RepoDetail;
  /** 普通（包括收藏）知识库 列表 */
  repoList: Repo.RepoList[];
  /** 收藏的知识库 列表 */
  starRepoList: Repo.StarRepoList[];
  /** 回收站知识库 列表 */
  delRepoList: Repo.DelRepoList[];
}

export const useRepoStore = defineStore('repo-store', {
  state: (): RepoState => ({
    // 是否需要currentRD这种？
    repoDetail: [],
    currentRepo: undefined,
    delRepoList: [],
    repoList: [],
    starRepoList: []
  }),
  getters: {},
  actions: {
    // 用户信息

    /* 业务逻辑（暴露方法） */

    /* 创建新知识库 */
    async createNewRepo(title: string) {
      const { data } = await createRepoApi({ repoTitle: title });
      if (data) {
        window.$message?.success('知识库创建成功~');
        await this.initList();
      }
    },

    /* 回收站移出移入 */
    async delRepo(repoId: string) {
      // 获取repo详情
      const repo = await this.findRepo(repoId);
      if (repo) {
        // 更新repo
        await updateRepoApi('del', repoId, repo);
        // 刷新三个list
        this.initList();
        // 刷新RD
        this.getRepo(repoId);
        window.$message?.success('操作成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 300);
      }
    },

    /* 收藏操作 */
    async starRepo(repoId: string) {
      // 获取repo详情
      const repo = await this.findRepo(repoId);
      if (repo) {
        // 更新repo
        await updateRepoApi('star', repoId, repo);
        // 刷新三个list
        this.initList();
        // 刷新RD
        this.getRepo(repoId);
        window.$message?.success('操作成功！');
        setTimeout(() => {
          useAppStore().reloadPage();
        }, 300);
      }
    },

    /* 编辑信息操作 */
    async changeRepo(repoId: string, repoInfo: Repo.RepoDetail) {
      // 更新repo
      await updateRepoApi('', repoId, repoInfo);
      // 刷新三个list
      this.initList();
      // 刷新RD
      this.getRepo(repoId);
    },

    /* 彻底删除Repo */
    async deleteRepo(repoId: string) {
      const repo = await this.findRepo(repoId);
      if (repo) {
        await deleteRepoApi(repoId);
        this.initList();
        this.removeRepo(repoId);
      }
    },

    /* 获取Repo详情（先本地，再在线） */
    async findRepo(repoId: string) {
      // 查找state
      const num = this.hasRepo(repoId);
      if (isNumber(num)) return this.repoDetail[num];
      // 在线查找
      const repo = await this.getRepo(repoId);
      if (repo) return repo;
      return false;
    },

    /* 刷新repo详情（直接在线） */
    async getRepo(repoId: string) {
      const { data } = await getRepoApi(repoId);
      if (data) {
        // 查找state
        const num = this.hasRepo(repoId);
        if (isNumber(num)) {
          this.repoDetail[num] = data;
          return data;
        }
        // 存入state
        this.repoDetail.push(data);
        return data;
      }
      return false;
    },

    /* 内部封装函数 */

    // 初始化、刷新列表
    async initList() {
      await this.initRepoList();
      await this.initDelRepoList();
      await this.initStarRepoList();
    },
    async initRepoList() {
      const { data } = await getRepoListApi();
      if (data) this.repoList = data;
    },
    async initStarRepoList() {
      const { data } = await getStarRepoListApi();
      if (data) this.starRepoList = data;
    },
    async initDelRepoList() {
      const { data } = await getDelRepoListApi();
      if (data) this.delRepoList = data;
    },

    // 重置store
    resetRepoStore() {
      this.$reset();
    },

    // 检查repo是否已存在并返回位置
    hasRepo(repoId: string) {
      let index = 0;
      for (const repo of this.repoDetail) {
        if (repo.repoId === repoId) {
          return index;
        }
        index += 1;
      }
      return false;
    },

    // 从state中删除repo
    removeRepo(repoId: string) {
      const num = this.hasRepo(repoId);
      if (num) {
        this.repoDetail.splice(num);
        return true;
      }
      return false;
    }
  }
});
