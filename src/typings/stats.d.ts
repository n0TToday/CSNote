/** 统计数据相关类型 */
declare namespace Stats {
  interface Activity {
    activeObjType: 'tag' | 'repo' | 'fast-note' | 'note';
    activeObjId: string;
    activeType: 'create' | 'modify' | 'delete' | 'visit' | 'share';
    activeTime: number;
    activeUserId: string;
    activeDetail?: JSON;
  }
}
