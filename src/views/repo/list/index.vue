<template>
  <n-button :on-click="repoStore.refreshRepoList">刷新知识库列表</n-button>
  <n-data-table :columns="columns" :data="repoStore.repoList" :bordered="false" />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useRepoStore } from '~/src/store/modules/repo';

const repoStore = useRepoStore();
repoStore.refreshRepoList();

const createColumns = ({ action }: { action: (row: Repo.RepoInfo) => void }): DataTableColumns<Repo.RepoInfo> => {
  return [
    {
      title: '库ID',
      key: 'repoId'
    },
    {
      title: '名称',
      key: 'repoTitle'
    },
    {
      title: '笔记数量',
      key: 'repoNoteNum'
    },
    {
      title: '行为',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => action(row)
          },
          { default: () => 'Play' }
        );
      }
    }
  ];
};

const message = useMessage();
const columns = createColumns({
  action(row: Repo.RepoInfo) {
    message.info(`Play ${row.repoTitle}`);
  }
});
</script>
