<template>
  <QuillEditor :theme="theme" />
</template>

<script lang="ts" setup>
import { Delta, QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

defineOptions({ name: 'NoteEditer' });

const props = defineProps<{
  theme?: '' | 'snow' | 'bubble';
}>();
</script>
