/** 统计数据相关类型 */
declare namespace Stats {
  interface Activity {
    activeId: string;
    activeObjType: string;
    activeObjId: string;
    activeType: number;
    activeTime: number;
    activeUserId: string;
    activeDetail?: string;
  }

  interface InfoActive {
    noteNum: number;
    tagNum: number;
    repoNum: number;
    useDay: number;
    activeNum: number;
    lastLoginIP: string;
  }
}
