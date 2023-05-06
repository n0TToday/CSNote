<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:18">
      <n-card v-if="isEditRef" class="m-b-3 shadow-md rounded-8px">
        <n-text class="text-5">编辑笔记</n-text>

        <n-button type="primary" :on-click="handleEditNote" class="m-l-3 float-right">保存修改</n-button>
        <n-button type="info" ghost :on-click="reToDetail" class="m-l-3 float-right">返回详情</n-button>
      </n-card>
      <n-card v-else class="m-b-3 shadow-md rounded-8px">
        <n-text class="text-5">
          {{ noteDetail.noteTitle }}
          <n-button
            v-if="!noteDetail.isStar"
            :on-click="handleStarNote"
            type="primary"
            ghost
            size="small"
            class="m-l-3"
          >
            收藏
          </n-button>
          <n-button v-else :on-click="handleStarNote" type="primary" size="small" ghost class="m-l-3">
            取消收藏
          </n-button>
        </n-text>
        <span v-if="!noteDetail.isArchive" class="p-0 m-0">
          <n-button type="primary" class="m-l-3 float-right" :on-click="toEdit"> 编辑笔记 </n-button>
          <n-button :on-click="handleArchNote" type="warning" ghost class="m-l-3 float-right"> 归档 </n-button>
        </span>
        <span v-else class="p-0 m-0">
          <n-button type="warning" ghost :on-click="handleArchNote" class="m-l-3 float-right">取消归档</n-button>
        </span>
        <n-button type="error" :on-click="openDeleteNoteDialog" class="m-l-3 float-right">删除笔记</n-button>
        <n-modal
          v-model:show="deleteNoteDialog"
          :mask-closable="false"
          preset="dialog"
          title="警告"
          content="移入回收站还是彻底删除笔记？笔记彻底删除后将不可恢复！"
          positive-text="移入回收站"
          negative-text="粉碎"
          :on-positive-click="handleDelNote"
          :on-negative-click="handleDeleteNote"
        >
        </n-modal>
      </n-card>
      <n-card v-if="isEditRef" class="shadow-md rounded-8px">
        <n-form>
          <n-form-item label="标题">
            <n-input v-model:value="noteDetail.noteTitle" type="text" size="large" placeholder="请输入笔记标题" />
          </n-form-item>
          <n-form-item label="所属知识库">
            <n-select v-model:value="noteDetail.repoId" :options="repoList" />
          </n-form-item>
          <n-form-item label="标签">
            <n-dynamic-tags v-model:value="noteDetail.tagList" :max="5" />
          </n-form-item>
          <n-form-item>
            <n-card>
              <QuillEditor
                v-model:content="noteDetail.noteContent"
                content-type="html"
                :read-only="!isEditRef"
                toolbar="essential"
                :theme="isEditRef ? 'snow' : 'bubble'"
              />
            </n-card>
          </n-form-item>
        </n-form>
      </n-card>
      <n-card v-else class="shadow-md rounded-8px">
        <QuillEditor
          v-model:content="noteDetail.noteContent"
          content-type="html"
          :read-only="!isEditRef"
          toolbar="essential"
          :theme="isEditRef ? 'snow' : 'bubble'"
        />
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:6">
      <n-space :vertical="true" :size="16">
        <n-card title="近期活动" class="shadow-md rounded-8px h-40rem">
          <n-scrollbar class="h-34rem">
            <n-timeline>
              <n-timeline-item
                v-for="item of noteActiveList"
                :key="item.time"
                :type="item.color"
                :title="item.title"
                :content="item.content"
                :time="new Date(item.time).toLocaleString()"
              />
            </n-timeline>
          </n-scrollbar>
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useRepoStore } from '~/src/store/modules/repo';
import { useNoteStore } from '~/src/store/modules/note';
import { isNumber } from '~/src/utils';
import { useActiveStore, useTabStore } from '~/src/store';
import { useRouterPush } from '~/src/composables';
import { routeName } from '~/src/router';
const route = useRoute();
const repoStore = useRepoStore();
const noteStore = useNoteStore();
const tabStore = useTabStore();
const { routerPush } = useRouterPush();

const { isEdit } = route.query;
const { noteId } = route.query;
useRepoStore().initList();
const noteDetail = ref({});
const isEditRef = ref(false);
if (isEdit === 'false') {
  isEditRef.value = false;
} else {
  isEditRef.value = true;
}
noteStore
  .getND(noteId)
  .then(() => {
    return noteStore.hasND(noteId);
  })
  .then(num => {
    if (isNumber(num)) {
      noteDetail.value = noteStore.noteDetail[num];
      if (!isEditRef.value) {
        tabStore.setActiveTabTitle(`笔记 - ${noteDetail.value.noteTitle}`);
      } else if (isEditRef.value) {
        tabStore.setActiveTabTitle(`编辑笔记 - ${noteDetail.value.noteTitle}`);
      }
    }
  });

const deleteNoteDialog = ref(false);
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

const stats = useActiveStore();
const noteActiveList = ref([
  {
    time: 0,
    color: '',
    content: '',
    title: ''
  }
]);

stats
  .getNoteActiveList(noteId)
  .then(() => {
    return stats.hasNoteActiveList(noteId);
  })
  .then(num => {
    if (isNumber(num)) {
      noteActiveList.value = stats.formatActiveList(stats.noteActiveList[num].activeList);
    }
  });

function openDeleteNoteDialog() {
  deleteNoteDialog.value = true;
}
function handleDeleteNote() {
  if (noteDetail.value) {
    noteStore.deleteNote(noteDetail.value.noteId);
    useTabStore().removeTab(`/note/detail?isEdit=false&noteId=${noteDetail.value.noteId}#${noteDetail.value.noteId}`);
  }
}
function handleStarNote() {
  noteStore.starNote(noteDetail.value.noteId);
}
function handleDelNote() {
  noteStore.delNote(noteDetail.value.noteId);
  useTabStore().removeTab(`/note/detail?isEdit=false&noteId=${noteDetail.value.noteId}#${noteDetail.value.noteId}`);
}
function handleArchNote() {
  noteStore.archNote(noteDetail.value.noteId);
}
function handleEditNote() {
  noteStore.editNote(noteDetail.value.noteId);
  useTabStore().removeTab(`/note/detail?isEdit=false&noteId=${noteDetail.value.noteId}#${noteDetail.value.noteId}`);
  routerPush({
    name: routeName('note_detail'),
    query: { isEdit: 'false', noteId },
    hash: `#${noteId}`
  });
}
function reToDetail() {
  useTabStore().removeTab(`/note/detail?isEdit=true&noteId=${noteDetail.value.noteId}#${noteDetail.value.noteId}`);
  routerPush({
    name: routeName('note_detail'),
    query: { isEdit: 'false', noteId },
    hash: `#${noteId}`
  });
}
function toEdit() {
  useTabStore().removeTab(`/note/detail?isEdit=false&noteId=${noteDetail.value.noteId}#${noteDetail.value.noteId}`);
  routerPush({
    name: routeName('note_detail'),
    query: { isEdit: 'true', noteId },
    hash: `#${noteId}`
  });
}
</script>
<style scoped>
.ql-container {
  height: 400px;
}
</style>
