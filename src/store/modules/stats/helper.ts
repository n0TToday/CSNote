const type = [
  '未知操作',
  '创建了',
  '彻底删除了',
  '向回收站放入了',
  '更新了',
  '分类了',
  '收藏了',
  '归档了',
  '分享',
  '查看了',
  '登录了',
  '添加了一篇笔记，向',
  '移除了一篇笔记，从'
];
const colorType = [
  '',
  'success',
  'error',
  'warning',
  'info',
  'info',
  'primary',
  'warning',
  'success',
  '',
  'success',
  'info',
  'warning'
];
const titleType = [
  '未知',
  '创建',
  '彻底删除',
  '删除',
  '修改',
  '整理',
  '收藏',
  '归档',
  '分享',
  '查看',
  '登录',
  '添加',
  '移除'
];

export function formatActive(active: Stats.Activity) {
  const typeNum = active.activeType;
  let content = '';
  if (active.activeObjType === 'auth') {
    content = `${type[typeNum]}账户 [${active.activeDetail}]`;
  } else if (active.activeObjType === 'note') {
    content = `${type[typeNum]}笔记 [${active.activeDetail}]`;
  } else if (active.activeObjType === 'fast') {
    content = `${type[typeNum]}速记 [${active.activeDetail}]`;
  } else if (active.activeObjType === 'repo') {
    content = `${type[typeNum]}知识库 [${active.activeDetail}]`;
  } else if (active.activeObjType === 'tag') {
    content = `${type[typeNum]}标签 [${active.activeDetail}]`;
  }
  return {
    time: active.activeTime,
    color: colorType[typeNum],
    title: titleType[typeNum],
    content
  };
}

// const type = [
//   function zero() {
//     return null;
//   },
//   function create(active: Stats.Activity, objType: string) {
//     let res = '';
//     if (objType === 'auth') {
//       res = `创建了平台账户！`;
//     } else if (objType === 'note') {
//       res = `笔记 [${active.activeDetail}]被创建了~`;
//     } else if (objType === 'repo') {
//       res = `知识库 [${active.activeDetail}]被创建了~`;
//     } else if (objType === 'tag') {
//       res = `标签 [${active.activeDetail}]被创建了~`;
//     }
//     return res;
//   },
//   function deleteObj(active: Stats.Activity, objType: string) {
//     let res = '';
//     if (objType === 'auth') {
//       res = `@${active.activeDetail} 注销了平台账户！`;
//     } else if (objType === 'note') {
//       res = `删除笔记 [${active.activeDetail}]`;
//     } else if (objType === 'repo') {
//       res = `删除知识库 [${active.activeDetail}]`;
//     } else if (objType === 'tag') {
//       res = `删除了一个标签 [${active.activeDetail}]`;
//     }
//     return res;
//   },
//   function del(active: Stats.Activity, objType: string) {
//     let res = '';
//     if (objType === 'note') {
//       res = `笔记 [${active.activeDetail}]移入回收站`;
//     } else if (objType === 'repo') {
//       res = `知识库 [${active.activeDetail}]移入回收站`;
//     } else if (objType === 'tag') {
//       res = `标签 [${active.activeDetail}]移入回收站`;
//     }
//     return res;
//   },
//   function update(active: Stats.Activity, objType: string) {},
//   function classNote(active: Stats.Activity, objType: string) {},
//   function star(active: Stats.Activity, objType: string) {},
//   function arch(active: Stats.Activity, objType: string) {},
//   function share(active: Stats.Activity, objType: string) {},
//   function visit(active: Stats.Activity, objType: string) {},
//   function login(active: Stats.Activity, objType: string) {},
//   function add(active: Stats.Activity, objType: string) {},
//   function remove(active: Stats.Activity, objType: string) {}
// ];
