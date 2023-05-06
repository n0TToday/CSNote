<template>
  <n-space :vertical="true" :size="16">
    <workbench-header />
    <workbench-main></workbench-main>
  </n-space>
</template>

<script lang="ts" setup>
import { useActiveStore, useAppStore, useNoteStore, useRepoStore, useTagStore } from '@/store';
import { WorkbenchHeader, WorkbenchMain } from './components';
const { initActiveState } = useActiveStore();
const repoStore = useRepoStore();
const noteStore = useNoteStore();
const tagStore = useTagStore();
noteStore.initList();
initActiveState();
tagStore.getTagList();
repoStore.initList().then(() => {
  if (useAppStore().firstLoad) {
    useAppStore().firstLoad = false;
    useAppStore().reloadPage();
  }
});
</script>

<style scoped></style>
