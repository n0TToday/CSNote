<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:24">
      <n-card title="回收站" class="shadow-sm rounded-8px"> </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:12">
      <n-card title="删除的知识库" class="h-40rem shadow-sm rounded-8px">
        <n-data-table
          :columns="colRepo"
          :data="delRepoList"
          :bordered="false"
          :render-cell="renderCell"
          class="h-33rem"
          row-class-name="rounded-8px"
          striped
        ></n-data-table>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:12">
      <n-card title="删除的笔记" class="h-40rem shadow-sm rounded-8px">
        <n-data-table
          :columns="colNote"
          :data="delNoteList"
          :bordered="false"
          :render-cell="renderCell"
          class="h-33rem"
          row-class-name="rounded-8px"
          striped
        ></n-data-table>
      </n-card>
    </n-grid-item>
    <n-modal
      v-model:show="deleteRepoDialog"
      :mask-closable="false"
      preset="dialog"
      title="确认粉碎"
      content="粉碎知识库后将不可恢复！"
      positive-text="确认粉碎"
      negative-text="算了"
      :on-positive-click="handleDeleteRepo"
    >
    </n-modal>
    <n-modal
      v-model:show="deleteNoteDialog"
      :mask-closable="false"
      preset="dialog"
      title="确认粉碎"
      content="笔记粉碎后将不可恢复！"
      positive-text="确认粉碎"
      negative-text="算了"
      :on-positive-click="handleDeleteNote"
    >
    </n-modal>
  </n-grid>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useNoteStore, useRepoStore } from '~/src/store';
const { deleteRepo, delRepo, initDelRepoList, delRepoList } = useRepoStore();
const { deleteNote, delNote, initList, delNoteList } = useNoteStore();
initDelRepoList();
initList();

const deleteRepoDialog = ref(false);
const waitDeleteRepo = ref('');

function openDeleteRepoDialog(row) {
  deleteRepoDialog.value = true;
  waitDeleteRepo.value = row.repoId;
}

function handleDeleteRepo() {
  if (waitDeleteRepo.value) {
    deleteRepo(waitDeleteRepo.value);
  }
}

const deleteNoteDialog = ref(false);
const waitDeleteNote = ref('');

function openDeleteNoteDialog(row) {
  deleteNoteDialog.value = true;
  waitDeleteNote.value = row.noteId;
}

function handleDeleteNote() {
  if (waitDeleteNote.value) {
    deleteNote(waitDeleteNote.value);
  }
}

const createRepoColumns = ({ unDelRepo }: { unDelRepo: (row: Repo.DelRepoList) => void }): DataTableColumns => {
  return [
    {
      title: '知识库名称',
      key: 'repoTitle',
      align: 'center'
    },
    {
      title: '笔记数量',
      key: 'repoNoteNum',
      align: 'center'
    },
    {
      title: '删除于',
      key: 'delTime',
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
              onClick: () => unDelRepo(row)
            },
            { default: () => '还原' }
          ),
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              strong: true,
              class: 'm-l-3',
              onClick: () => openDeleteRepoDialog(row.repoId)
            },
            { default: () => '粉碎' }
          )
        ];
      }
    }
  ];
};

const colRepo = createRepoColumns({
  unDelRepo(row) {
    delRepo(row.repoId);
  }
});

// function rowRepoProps(row: Repo.DelRepoList) {
//   return {
//     style: 'cursor: pointer;',
//     onClick: () => {
//       setTimeout(() => {
//         toRepoDetail(row.repoId);
//       }, 300);
//     }
//   };
// }

const createNoteColumns = ({ unDelNote }: { unDelNote: (row: Note.DelNoteList) => void }): DataTableColumns => {
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
              ghost: true,
              onClick: () => unDelNote(row)
            },
            { default: () => '还原' }
          ),
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              strong: true,
              ghost: true,
              class: 'm-l-3',
              onClick: () => openDeleteNoteDialog(row.noteId)
            },
            { default: () => '粉碎' }
          )
        ];
      }
    }
  ];
};
const colNote = createNoteColumns({
  unDelNote(row) {
    delNote(row.noteId);
  }
});

// function rowNoteProps(row: Note.starNoteList) {
//   return {
//     style: 'cursor: pointer;',
//     onClick: () => {
//       setTimeout(() => {
//         toNoteDetail(row.noteId);
//       }, 1200);
//     }
//   };
// }

function renderCell(value: number) {
  if (value > 1000000) {
    const time = new Date(value).toLocaleDateString();
    return time;
  }
  return value;
}
</script>
