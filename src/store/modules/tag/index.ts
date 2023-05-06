import { defineStore } from 'pinia';
import { getTagListApi } from '~/src/service';
import { emptyTag } from './helper';

interface TagState {
  tagDetail: Tag.TagDetail[];
  tagList: Tag.TagList[];
}

export const useTagStore = defineStore('tag-store', {
  state: (): TagState => ({
    tagDetail: [emptyTag],
    tagList: []
  }),
  getters: {},
  actions: {
    resetTagStore() {
      this.$reset();
    },

    async getTagList() {
      const { data } = await getTagListApi();
      if (data) this.tagList = data;
    }

    // /** 向state中添加Tag */
    // addTagToState(tag: Tag.TagDetail) {
    //   const tagId: string = tag.tagId;
    //   if (this.hasTagInState(tagId)) return false;

    //   this.tagDetail.push(tag);
    //   return true;
    // },

    // /** 从state中删除Tag */
    // removeTagFromState(tagId: string) {
    //   const num = this.hasTagInState(tagId);
    //   if (num && isNumber(num)) {
    //     this.tagDetail.splice(num);
    //     return true;
    //   }
    //   return false;
    // },

    // /* 标签相关业务逻辑 */

    // /** 查找标签信息 */
    // async getTagDetail(tagId: string) {
    //   let tag: Tag.TagDetail = emptyTag;
    //   // 获取当前标签详情
    //   const num = this.hasTagInState(tagId);
    //   if (num && isNumber(num)) {
    //     tag = this.tagDetail[num];
    //   } else {
    //     const { data } = await getTagApi(tagId);
    //     if (data) tag = data;
    //   }
    //   return tag;
    // }
  }
});
