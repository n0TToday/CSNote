<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="24">
      <n-card title="项目主要技术栈" :bordered="false" size="small" class="shadow-sm rounded-8px">
        <n-grid :item-responsive="true" responsive="screen" cols="m:1 l:6" :x-gap="8" :y-gap="8">
          <n-grid-item v-for="item in technology" :key="item.id">
            <technology-card v-bind="item" />
          </n-grid-item>
        </n-grid>
      </n-card>
    </n-grid-item>

    <n-grid-item span="0:24 640:24 1024:10">
      <n-space :vertical="true" :size="16">
        <n-card title="最近动态" :bordered="false" size="medium" class="shadow-sm rounded-8px h-auto">
          <template #header-extra>
            <n-button class="text-primary" :bordered="false" :on-click="toStats">更多动态</n-button>
          </template>
          <n-list>
            <n-list-item v-for="item in activity" :key="item.id" class="justify-y-center">
              <n-ellipsis style="max-width: 26rem" class="text-16px">· {{ item.content }} </n-ellipsis>
              <n-text class="float-right text-14px text-#888">
                <n-time :time="item.time" :to="nowTime" type="relative"></n-time>
              </n-text>
            </n-list-item>
          </n-list>
        </n-card>
      </n-space>
    </n-grid-item>

    <n-grid-item span="0:24 640:24 1024:8">
      <n-space :vertical="true" :size="16">
        <n-card title="我的收藏" :bordered="false" size="medium" class="shadow-sm rounded-8px h-auto">
          <template #header-extra>
            <n-button class="text-primary" :bordered="false" :on-click="toStar">所有收藏</n-button>
          </template>
          <n-tabs type="line" size="small">
            <n-tab-pane name="知识库">
              <n-data-table
                :columns="colRepo"
                :data="starRepoList"
                :bordered="false"
                :render-cell="renderCell"
                :row-props="rowRepoProps"
                class="rounded-8px h-auto"
                row-class-name="rounded-8px"
              >
                <n-empty description="空空如也~"> </n-empty>
              </n-data-table>
            </n-tab-pane>
            <n-tab-pane name="笔记">
              <n-data-table
                :columns="colNote"
                :data="starNoteList"
                :bordered="false"
                :render-cell="renderCell"
                :row-props="rowNoteProps"
                class="rounded-8px h-auto"
                row-class-name="rounded-8px"
                striped
              >
                <n-empty description="还没收藏任何东西！"></n-empty>
              </n-data-table>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-space>
    </n-grid-item>

    <n-grid-item span="0:24 640:24 1024:6">
      <n-space :vertical="true" :size="12">
        <n-card title="快捷操作" :bordered="false" size="medium" class="h-auto shadow-sm rounded-8px">
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:2" :x-gap="24" :y-gap="12">
            <n-grid-item class="flex-col-center">
              <n-button
                :on-click="toCreateNote"
                :bordered="false"
                class="flex-col-center h-72px p-6px w-81px border-1px border-#efeff5 dark:border-#ffffff17 rounded-8px hover:shadow-sm"
              >
                <svg-icon icon="mdi:new-box" style="color: #e41" class="text-64px" />
              </n-button>
              <p class="pt-8px flex-col-center text-14px">创建笔记</p>
            </n-grid-item>
            <n-grid-item class="flex-col-center">
              <n-button
                :on-click="toStats"
                :bordered="false"
                class="flex-col-center h-72px p-6px w-81px border-1px border-#efeff5 dark:border-#ffffff17 rounded-8px hover:shadow-sm"
              >
                <svg-icon icon="mdi:google-analytics" style="color: #7238d1" class="text-64px" />
              </n-button>
              <p class="pt-8px flex-col-center text-14px">统计与分析</p>
            </n-grid-item>
            <n-grid-item class="flex-col-center">
              <n-button
                :on-click="toRepoList"
                :bordered="false"
                class="flex-col-center h-72px p-6px w-81px border-1px border-#efeff5 dark:border-#ffffff17 rounded-8px hover:shadow-sm"
              >
                <svg-icon icon="mdi:notebook-multiple" style="color: #f56c6c" class="text-52px" />
              </n-button>
              <p class="pt-8px flex-col-center text-14px">管理知识库</p>
            </n-grid-item>
            <n-grid-item class="flex-col-center">
              <n-button
                :on-click="toRubbish"
                :bordered="false"
                class="flex-col-center h-72px p-6px w-81px border-1px border-#efeff5 dark:border-#ffffff17 rounded-8px hover:shadow-sm"
              >
                <svg-icon icon="mdi:rubbish-bin-empty" style="color: #19a2f1" class="text-64px" />
              </n-button>
              <p class="pt-8px flex-col-center text-14px">回收站</p>
            </n-grid-item>
          </n-grid>
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
import { reject } from 'lodash';
import { useRouterPush } from '~/src/composables';
import { routeName } from '~/src/router';
import { useActiveStore, useAuthStore, useNoteStore, useRepoStore } from '~/src/store';
import { getNowTimeStamp, isNumber } from '~/src/utils';
import { TechnologyCard } from './components';

defineOptions({ name: 'DashboardWorkbenchMain' });

const { routerPush } = useRouterPush();
const { workActiveList } = useActiveStore();
const { getRepo, hasRepo, initStarRepoList, starRepoList } = useRepoStore();
const { getND, hasND, initList, starNoteList } = useNoteStore();
initStarRepoList();
initList();
interface Technology {
  id: number;
  name: string;
  description: string;
  site: string;
  icon: string;
  iconColor?: string;
}

const technology: Technology[] = [
  {
    id: 0,
    name: 'Vue',
    description: '一套用于构建用户界面的渐进式框架，不用多说。',
    site: 'https://v3.cn.vuejs.org/',
    icon: 'logos:vue'
  },
  {
    id: 1,
    name: 'TypeScript',
    description: 'JavaScript 的超集，提供了类型检查和预定义。',
    site: 'https://www.typescriptlang.org/',
    icon: 'logos:typescript-icon'
  },
  {
    id: 2,
    name: 'Vite',
    description: 'Vue 配套的前端开发与构建工具，热更新好用。',
    site: 'https://vitejs.cn/',
    icon: 'logos:vitejs'
  },
  {
    id: 3,
    name: 'NaiveUI',
    description: '一个 Vue 3 UI 组件库，前端页面用它做的。',
    site: 'https://www.naiveui.com/zh-CN/os-theme',
    icon: 'logos:naiveui'
  },
  {
    id: 4,
    name: 'UnoCSS',
    description: '实用优先的 CSS 框架，原子化，Very Good。',
    site: 'https://uno.antfu.me/?s=',
    icon: 'logos:unocss'
  },
  {
    id: 5,
    name: 'Pinia',
    description: '一个 Vue 状态管理框架，很不错很好用。',
    site: 'https://pinia.esm.dev/',
    icon: 'noto:pineapple'
  }
];

const nowTime = getNowTimeStamp();

const activity = formatActive(workActiveList);

function formatActive(activeList: Stats.Activity[]) {
  const res = [];
  const userName = useAuthStore().userInfo.userName;
  for (const item of activeList) {
    if (item.activeObjType === 'repo') {
      let a = '将';
      let c = '';
      if (item.activeType === 1) a = '新建了';
      else if (item.activeType === 3) c = ' 放入了回收站';
      else if (item.activeType === 7) c = ' 归档';
      else if (item.activeType === 2) a = '删除了';
      else if (item.activeType === 6) a = '收藏了';

      const abc = `@ ${userName} ${a}知识库 ${item.activeDetail.title} ${c}`;
      res.push({
        content: abc,
        id: item.activeId,
        time: item.activeTime
      });
    } else if (item.activeObjType === 'fast') {
      let a = '将';
      const c = '';
      if (item.activeType === 1) a = '新建了';
      else if (item.activeType === 2) a = '删除了';

      const abc = `@ ${userName} ${a}一个速记 ${c}`;
      res.push({
        content: abc,
        id: item.activeId,
        time: item.activeTime
      });
    } else if (item.activeObjType === 'note') {
      let a = '将';
      let c = '';
      if (item.activeType === 1) a = '新建了';
      else if (item.activeType === 3) c = ' 放入了回收站';
      else if (item.activeType === 7) c = ' 归档';
      else if (item.activeType === 2) a = '删除了';
      else if (item.activeType === 6) a = '收藏了';

      const abc = `@ ${userName} ${a}笔记 ${item.activeDetail} ${c}`;
      res.push({
        content: abc,
        id: item.activeId,
        time: item.activeTime
      });
    } else if (item.activeObjType === 'auth') {
      let a = '将';
      if (item.activeType === 1) a = '注册了';

      const abc = `@ ${userName} ${a}一个平台账户`;
      res.push({
        content: abc,
        id: item.activeId,
        time: item.activeTime
      });
    }
  }
  return res;
}

function toCreateNote() {
  routerPush({ name: routeName('note_create') });
}
function toRubbish() {
  routerPush({ name: routeName('rubbish') });
}
function toRepoList() {
  routerPush({ name: routeName('repo_list') });
}
function toStats() {
  routerPush({ name: routeName('dashboard_analysis') });
}
function toStar() {
  routerPush({ name: routeName('star') });
}

/* 收藏模块 */
const message = useMessage();

const colRepo = [
  {
    title: '名称',
    key: 'repoTitle'
  },
  {
    title: '收藏于',
    key: 'starTime',
    align: 'center'
  }
];

function rowRepoProps(row: Repo.StarRepoList) {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      toRepoDetail(row.repoId);
    }
  };
}

function toRepoDetail(repoId: string) {
  message.info('即将打开……');
  setTimeout(() => {
    routerPush({
      name: routeName('repo_detail'),
      query: { isEdit: 'false', repoId },
      hash: `#${repoId}`
    });
  }, 600);
}
const colNote = [
  {
    title: '名称',
    key: 'noteTitle'
  },
  {
    title: '收藏于',
    key: 'starTime',
    align: 'center'
  }
];

function rowNoteProps(row: Note.starNoteList) {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      toNoteDetail(row.noteId);
    }
  };
}

function toNoteDetail(noteId: string) {
  message.info('即将打开……');

  setTimeout(() => {
    getND(noteId)
      .then(res => {
        if (res) if (!res.isStar) reject(null);
        return hasND(noteId);
      })
      .then(num => {
        if (isNumber(num)) {
          routerPush({
            name: routeName('note_detail'),
            query: { isEdit: 'false', noteId },
            hash: `#${noteId}`
          });
        }
      });
  }, 600);
}
function renderCell(value: number) {
  if (value > 1000000) {
    const time = new Date(value).toLocaleDateString();
    return time;
  }
  return value;
}
</script>

<style scoped></style>
