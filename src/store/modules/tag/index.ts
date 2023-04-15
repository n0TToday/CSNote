import { defineStore } from 'pinia';
import { createTagApi, deleteTagApi, getTagApi, getTagListApi, updateTagApi } from '~/src/service';
import { isNull } from '~/src/utils';
import { emptyTag, emptyTagInfo, hasNoteInTag, initNewTag, isEmptyTag } from './helper';

interface TagState {
  tagDetail: Tag.TagDetail[];
  tagList: Tag.TagInfo[];
}

export const useTagStore = defineStore('tag-store', {
  state: (): TagState => ({
    tagDetail: [emptyTag],
    tagList: [emptyTagInfo]
  }),
  getters: {},
  actions: {
    resetTagStore() {
      this.$reset();
    },

    /** 检查Tag是否已存在并返回位置 */
    hasTagInState(tagId: string) {
      if (isNull(tagId)) return false;
      let index = 0;
      for (const tag of this.tagDetail) {
        if (tag.tagInfo.tagId === tagId) {
          return index;
        }
        index += 1;
      }
      return false;
    },

    /** 向state中添加Tag */
    addTagToState(tag: Tag.TagDetail) {
      const tagId: string = tag.tagInfo.tagId;
      if (this.hasTagInState(tagId)) return false;

      this.tagDetail.push(tag);
      return true;
    },

    /** 从state中删除Tag */
    removeTagFromState(tagId: string) {
      const num = this.hasTagInState(tagId);
      if (num) {
        this.tagDetail.splice(num);
        return true;
      }
      return false;
    },

    /* 更新state中Tag元素 */
    updateTagInState(tag: Tag.TagDetail) {
      const tagId: string = tag.tagInfo.tagId;
      this.removeTagFromState(tagId);
      if (!this.addTagToState(tag)) return false;
      return true;
    },

    /* 标签相关业务逻辑 */

    /** 创建新标签 */
    async createNewTag(title: string) {
      // 初始化新标签 包含创建时间及用户信息
      const newTag = initNewTag();

      // 生成根据传入参数生成新标签实例
      newTag.tagInfo.tagTitle = title;

      // 调用创建函数
      const { data } = await createTagApi(newTag);

      // 返回结果TagId
      if (data) {
        newTag.tagInfo.tagId = data;
        // 更新标签列表
        await this.refreshTagList();
        // 更新state
        if (this.addTagToState(newTag)) {
          window.$notification?.success({
            title: '创建标签成功!',
            duration: 3000
          });
        }
      }
    },

    /** 查找标签信息 */
    async getTagDetail(tagId: string) {
      let tag: Tag.TagDetail = emptyTag;
      // 获取当前标签详情
      const num = this.hasTagInState(tagId);
      if (num) {
        tag = this.tagDetail[num];
      } else {
        const { data } = await getTagApi(tagId);
        if (data) tag = data;
      }
      return tag;
    },

    /** 修改标签信息 */
    async updateTag(tag: Tag.TagDetail) {
      const tagId = tag.tagInfo.tagId;

      const { data } = await updateTagApi(tagId, tag);
      if (data) {
        // 刷新库列表
        await this.refreshTagList;
        // 更新state
        if (this.updateTagInState(data)) {
          return true;
        }
      }
      return false;
    },

    /** 删库，跑路 */
    async deleteTag(tagId: string) {
      // 页面逻辑中应将该标签下所有笔记修改为默认标签
      // 调用删除函数
      return deleteTagApi(tagId);
    },

    /* 抽象出复用具体业务逻辑 */

    /** 刷新标签列表 */
    async refreshTagList() {
      // 重新请求后端数据库
      const { data } = await getTagListApi();
      if (data) {
        // 将state中的列表用返回的列表替换
        this.tagList = data;
      }
    },

    /** 向标签中添加笔记 */
    async addNoteToTag(notes: Note.NoteInfoThin[], tagId: string) {
      const tag = await this.getTagDetail(tagId);
      if (!isEmptyTag(tag)) {
        for (const i of notes) {
          // 修改标签中笔记列表
          tag.noteList.push(i);
          // 修改标签笔记数量
          tag.tagNoteNum += 1;
        }
      }
      // 提交更新
      return this.updateTag(tag);
    },

    /** 从标签中删除笔记 */
    async deleteNoteFromTag(notes: Note.NoteInfoThin[], tagId: string) {
      // 获取当前标签详情
      const tag = await this.getTagDetail(tagId);
      if (!isEmptyTag(tag)) {
        for (const i of notes) {
          const num = hasNoteInTag(tag, i.noteId);
          if (num) {
            // 修改标签中笔记列表
            tag.noteList.splice(num);
            // 修改标签笔记数量
            tag.tagNoteNum -= 1;
          }
        }
      }
      // 提交更新
      return this.updateTag(tag);
    }
  }
});
