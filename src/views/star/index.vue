<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:12">
      <n-card title="收藏的知识库" size="large" class="h-40rem shadow-sm rounded-8px">
        <n-data-table
          :columns="colRepo"
          :data="starRepoList"
          :bordered="false"
          :render-cell="renderCell"
          class="h-33rem"
          row-class-name="rounded-8px"
          striped
        ></n-data-table>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:12">
      <n-card title="收藏的笔记" size="large" class="h-40rem shadow-sm rounded-8px">
        <n-data-table
          :columns="colNote"
          :data="starNoteList"
          :bordered="false"
          :render-cell="renderCell"
          class="h-33rem"
          row-class-name="rounded-8px"
          striped
        ></n-data-table>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { reject } from 'lodash';
import { useNoteStore, useRepoStore } from '~/src/store';
import { isNumber } from '~/src/utils';
import { useRouterPush } from '~/src/composables';
import { routeName } from '~/src/router';
const { routerPush } = useRouterPush();
const { starRepo, getRepo, hasRepo, initStarRepoList, starRepoList } = useRepoStore();
const { starNote, getND, hasND, initList, starNoteList } = useNoteStore();
initStarRepoList();
initList();

const message = useMessage();

const createRepoColumns = ({ unStarRepo }: { unStarRepo: (row: Repo.StarRepoList) => void }): DataTableColumns => {
  return [
    {
      title: '名称',
      key: 'repoTitle',
      align: 'center'
    },
    {
      title: '笔记数量',
      key: 'repoNoteNum',
      align: 'center'
    },
    {
      title: '收藏于',
      key: 'starTime',
      align: 'center'
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render(row) {
        return [
          h(
            NButton,
            {
              type: 'warning',
              size: 'small',
              strong: true,
              tertiary: true,
              onClick: () => unStarRepo(row)
            },
            { default: () => '取消收藏' }
          ),
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              strong: true,
              class: 'm-l-3',
              onClick: () => toRepoDetail(row)
            },
            { default: () => '打开' }
          )
        ];
      }
    }
  ];
};

const colRepo = createRepoColumns({
  unStarRepo(row) {
    starRepo(row.repoId);
  }
});

// function rowRepoProps(row: Repo.StarRepoList) {
//   return {
//     style: 'cursor: pointer;',
//     onClick: () => {
//       setTimeout(() => {
//         toRepoDetail(row.repoId);
//       }, 300);
//     }
//   };
// }

function toRepoDetail(row) {
  const repoId = row.repoId;
  message.info('即将打开……');

  setTimeout(() => {
    routerPush({
      name: routeName('repo_detail'),
      query: { isEdit: 'false', repoId },
      hash: `#${repoId}`
    });
  }, 600);
}

const createNoteColumns = ({ unStarNote }: { unStarNote: (row: Note.StarNoteList) => void }): DataTableColumns => {
  return [
    {
      title: '名称',
      key: 'noteTitle',
      align: 'center'
    },
    {
      title: '收藏于',
      key: 'starTime',
      align: 'center'
    },
    {
      title: '操作',
      key: 'actions',

      align: 'center',
      render(row) {
        return [
          h(
            NButton,
            {
              type: 'warning',
              size: 'small',
              strong: true,
              tertiary: true,
              onClick: () => unStarNote(row)
            },
            { default: () => '取消收藏' }
          ),
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              strong: true,
              class: 'm-l-3',
              onClick: () => toNoteDetail(row)
            },
            { default: () => '打开 ->' }
          )
        ];
      }
    }
  ];
};
const colNote = createNoteColumns({
  unStarNote(row) {
    starNote(row.noteId);
  }
});

function toNoteDetail(row) {
  const noteId = row.noteId;
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
            query: { isEdit: 'false', noteId: row.noteId },
            hash: `#${row.noteId}`
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
