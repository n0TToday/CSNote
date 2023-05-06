<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:8">
      <n-space :vertical="true" :size="16">
        <n-card title="新建速记" class="h-40rem p-b-12 shadow-sm rounded-8px">
          <template #header-extra>
            <n-button ghost type="primary" :on-click="handleSaveNote">点我保存 ~</n-button>
          </template>
          <QuillEditor
            v-model:content="fastnote"
            :content-type="'html'"
            toolbar="minimal"
            placeholder="灵感、想法，统统可以~"
            class="shadow-sm rounded-b-8px"
          ></QuillEditor>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:16">
      <n-space :vertical="true" :size="16">
        <n-card title="我的速记" class="h-auto p-b-12 shadow-sm rounded-8px">
          <n-grid :item-responsive="true" responsive="screen" cols="l:3" :x-gap="12" :y-gap="12">
            <n-grid-item v-for="item in items" :key="item.noteId">
              <FastNoteListCard v-bind="item"></FastNoteListCard>
            </n-grid-item>
          </n-grid>
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useAppStore, useNoteStore, useRepoStore } from '~/src/store';
import { FastNoteListCard } from './components/';

const fastnote = ref('');
const noteStore = useNoteStore();
const repoStore = useRepoStore();
noteStore.initList();
repoStore.initList();
if (useAppStore().firstLoad) {
  useAppStore().firstLoad = false;
  useAppStore().reloadPage();
}
const items = ref(noteStore.fastNoteList);

function handleSaveNote() {
  noteStore.createNewFastNote(fastnote.value);
  fastnote.value = '';
}
</script>
