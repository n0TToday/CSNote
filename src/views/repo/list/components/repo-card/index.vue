<template>
  <n-card :title="repoTitle" class="m-r-3 m-y-3 shadow-md rounded-8px" :hoverable="true">
    <template #header-extra>
      <n-button :bordered="false" circle :on-click="star">
        <svg-icon v-if="!isStar" class="h-5 w-5" icon="mdi-star-outline" />
        <svg-icon v-if="isStar" class="h-5 w-5" style="color: #f4511e" icon="mdi-star" />
      </n-button>
    </template>
    <template #footer>
      <n-text class="text-4">库中有 </n-text>
      <n-text class="text-6">{{ repoNoteNum }} </n-text>
      <n-text class="text-4"> 篇笔记</n-text>
    </template>
    <template #action>
      <!-- <n-button type="default" class="float-left">编辑</n-button> -->
      <n-text style="line-height: 32px"> 建于 <n-time :time="createTime" :to="nowTime" type="relative" /> </n-text>
      <n-button type="primary" class="float-right" :on-click="toRepoDetail">进入 -></n-button>
    </template>
  </n-card>
</template>
<script setup lang="ts">
import { useRouterPush } from '~/src/composables';
import { routeName } from '~/src/router';
import { useRepoStore } from '~/src/store/modules/repo';
import { getNowTimeStamp, isNumber } from '~/src/utils';
const { routerPush } = useRouterPush();
const { starRepo } = useRepoStore();
defineOptions({ name: 'RepoListMainRepoCard' });
interface RepoInfo {
  repoId: string;
  repoTitle: string;
  repoNoteNum: number;
  isStar: boolean;
  createTime: number;
}
const repo = defineProps<RepoInfo>();
const nowTime = getNowTimeStamp();
// 收藏知识库
function star() {
  starRepo(repo.repoId);
}

function toRepoDetail() {
  routerPush({
    name: routeName('repo_detail'),
    query: { isEdit: 'false', repoId: repo.repoId },
    hash: `#${repo.repoId}`
  });
}
</script>

<style scoped></style>
