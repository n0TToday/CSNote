<template>
  <n-card class="m-r-3 shadow-md rounded-8px">
    <n-text class="m-3 text-8">我的知识库</n-text>
    <n-text class="m-3 text-4">共 {{ repoStore.repoList.length }} 个</n-text>
    <n-button type="primary" class="m-3 float-right" @click="createCardShow = true">建个新的 </n-button>
    <n-modal
      v-model:show="createCardShow"
      :mask-closable="false"
      preset="dialog"
      title="创建新知识库"
      positive-text="确认创建"
      negative-text="算了"
      :on-positive-click="createNewRepo"
    >
      <n-input v-model:value="newRepoTitle" placeholder="请输入知识库名称"></n-input>
    </n-modal>
    <!-- <n-button :loading="refreshLoadding" :on-click="getRepoInfo" class="m-3 float-right"> 刷新一下 </n-button> -->
  </n-card>
  <n-grid x-gap="12" :cols="4">
    <n-gi v-for="repo of repoStore.repoList" :key="repo.repoId">
      <repo-card v-bind="repo"></repo-card>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { useRepoStore } from '~/src/store/modules/repo';
import { RepoCard } from './components';

const repoStore = useRepoStore();
repoStore.initList();
const createCardShow = ref(false);
const newRepoTitle = ref('');

function createNewRepo() {
  repoStore.createNewRepo(newRepoTitle.value);
}
</script>
