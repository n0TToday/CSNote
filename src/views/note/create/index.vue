<template>
  <n-card class="m-b-3 shadow-md rounded-8px">
    <n-text class="text-5">新建笔记</n-text>
    <n-button type="primary" :on-click="create" class="float-right">确认创建</n-button>
  </n-card>
  <n-card class="shadow-md rounded-8px">
    <n-form :model="newNote" :rules="rules">
      <n-form-item label="标题" path="noteTitle">
        <n-input v-model:value="newNote.noteTitle" type="text" size="large" placeholder="请输入笔记标题" />
      </n-form-item>
      <n-form-item label="分类至" path="noteRepo">
        <n-select v-model:value="newNote.repoId" :options="repoList" placeholder="请选择分类" />
      </n-form-item>
      <n-form-item label="标签" path="noteTag">
        <n-dynamic-tags v-model:value="newNote.tagList" :max="5" />
      </n-form-item>
      <n-form-item label="正文" path="noteContent">
        <n-card>
          <QuillEditor
            v-model:content="newNote.noteContent"
            content-type="html"
            toolbar="essential"
            placeholder="请输入笔记正文"
          />
        </n-card>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useRepoStore } from '~/src/store/modules/repo';
import { useNoteStore } from '~/src/store/modules/note';

const { createNewNote } = useNoteStore();
const { repoList } = useRepoStore();

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
  noteContent: undefined
});
const rules = {
  noteTitle: {
    required: true,
    message: '请输入笔记标题',
    trigger: 'blur'
  },
  repoId: {
    required: false,
    message: '建议选择笔记分类',
    trigger: 'blur'
  },
  tagList: {
    required: false,
    message: '建议添加标签',
    trigger: 'blur'
  },
  noteContent: {
    required: true,
    message: '请输入笔记正文',
    trigger: 'blur'
  }
};

// 全部信息填写完毕，生成数据
function create() {
  createNewNote(newNote.value);
}
</script>

<style scoped>
.ql-container {
  height: 400px;
}
</style>
