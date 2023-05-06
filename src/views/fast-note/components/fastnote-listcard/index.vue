<template>
  <n-card :bordered="false" class="h-auto shadow-md rounded-8px border-#DDD border-1px">
    <QuillEditor
      :content="noteContent"
      content-type="html"
      :read-only="true"
      :enable="false"
      theme="bubble"
      class="p-0"
    ></QuillEditor>
    <hr />
    <template #footer>
      <n-time :time="createTime" :to="nowTime" class="text-#DDD" style="line-height: 20px" type="relative" />
      <n-button ghost type="primary" :bordered="false" class="h-21px m-l-1 float-right" @click="classDialog = true">
        整理
      </n-button>
      <n-button ghost type="warning" :bordered="false" class="h-21px m-l-1 float-right" @click="deleteDialog = true">
        删除
      </n-button>
    </template>
  </n-card>
  <n-modal
    v-model:show="deleteDialog"
    preset="dialog"
    title="删除确认"
    content="删除速记后将不可恢复！"
    positive-text="确认删除"
    negative-text="算了"
    :on-positive-click="deleteFastNote"
  >
  </n-modal>
  <n-modal
    v-model:show="classDialog"
    preset="dialog"
    title="整理速记"
    positive-text="确定"
    negative-text="算了"
    :on-positive-click="classFastNote"
  >
    <br />
    <n-text> 给笔记起个名称：</n-text>
    <n-input v-model:value="newNote.noteTitle" placeholder="给笔记起个名称"></n-input>
    <br />
    <br />
    <n-text> 整理至哪个知识库？： </n-text>
    <n-select v-model:value="newNote.repoId" :options="repoList" />
    <br />
    <n-text> 也可以添加标签哦： </n-text>
    <n-dynamic-tags v-model:value="newNote.tagList" :max="5" />
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { useNoteStore, useRepoStore } from '~/src/store';
import { getNowTimeStamp } from '~/src/utils';

defineOptions({ name: 'FastNoteListCard' });

interface Props {
  noteContent: string;
  noteId: string;
  createTime: number;
}

const nowTime = getNowTimeStamp();
const noteStore = useNoteStore();
const deleteDialog = ref(false);
const classDialog = ref(false);

const fastnote = defineProps<Props>();

const newNote = ref({
  noteId: '',
  noteTitle: '',
  noteType: 'note',
  updateTime: 0,
  isShare: false,
  shareTime: 0,
  isStar: false,
  starTime: 0,
  isArchive: false,
  archTime: 0,
  isDel: false,
  delTime: 0,
  repoId: '',
  visitNum: 0,
  tagList: [],
  createTime: 0,
  userId: '',
  userName: '',
  noteContent: fastnote.noteContent
});

const repoList = ref([]);
function formatRepoList() {
  for (const repo of useRepoStore().repoList) {
    const res = {
      value: repo.repoId,
      label: repo.repoTitle
    };
    repoList.value.push(res);
  }
}
formatRepoList();
function deleteFastNote() {
  noteStore.deleteNote(fastnote.noteId);
}
function classFastNote() {
  noteStore.createNewNote(newNote.value);
}
</script>
