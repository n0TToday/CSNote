<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:5">
      <n-card title="知识库详情" class="shadow-md rounded-8px">
        <template #header-extra>
          <n-button :bordered="false" circle>
            <svg-icon v-if="!repo.isStar" class="h-5 w-5" icon="mdi-star-outline" />
            <svg-icon v-if="repo.isStar" class="h-5 w-5" style="color: #f4511e" icon="mdi-star" />
          </n-button>
        </template>
        <n-row>
          <n-col :span="24">
            <n-statistic label="名称">
              <n-gradient-text type="primary" class="text-2xl">{{ repo.repoTitle }}</n-gradient-text>
            </n-statistic>
            <br />

            <n-statistic label="库内笔记数">
              <n-number-animation :from="0" :to="repo.repoNoteNum"></n-number-animation>
            </n-statistic>
            <br />

            <n-statistic label="所有者">
              <n-text>{{ repo.userName }}</n-text>
            </n-statistic>
            <br />

            <n-statistic label="创建日期"> <n-time :time="repo.createTime" type="date" /> </n-statistic>
          </n-col>
        </n-row>
        <template #action>
          <n-button type="info" :on-click="openDeleteRepoDialog" ghost>删除</n-button>
          <n-modal
            v-model:show="deleteRepoDialog"
            :mask-closable="false"
            preset="dialog"
            title="警告"
            content="移入回收站还是彻底删除笔记？知识库彻底删除后将不可恢复！"
            positive-text="移入回收站"
            negative-text="粉碎"
            :on-positive-click="handleDelRepo"
            :on-negative-click="handleDeleteRepo"
          >
          </n-modal>
        </template>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:14">
      <n-card title="笔记列表" class="shadow-md rounded-8px">
        <template #header-extra>
          <n-button :bordered="false" circle>
            <svg-icon v-if="!repo.isStar" style="color: #f4511e" class="h-5 w-5" icon="mdi-plus" />
          </n-button>
        </template>
        <n-data-table
          :columns="col"
          :data="repoList"
          :bordered="true"
          :row-props="toNoteDetail"
          class="h-33rem"
          row-class-name="rounded-8px"
          striped
        ></n-data-table>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:5">
      <n-card title="知识库近期活动" class="shadow-md rounded-8px h-40rem">
        <n-scrollbar class="h-34rem">
          <n-timeline>
            <n-timeline-item
              v-for="item of repoActiveList"
              :key="item.time"
              :type="item.color"
              :title="item.title"
              :content="item.content"
              :time="new Date(item.time).toLocaleString()"
            />
          </n-timeline>
        </n-scrollbar>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup lang="ts">
import { ref, h } from 'vue';
import { useRoute } from 'vue-router';
import { NTag, NTime, useMessage } from 'naive-ui';
import { useRepoStore } from '~/src/store/modules/repo';
import { getNowTimeStamp, isNumber } from '~/src/utils';
import { useRouterPush } from '~/src/composables';
import { routeName } from '~/src/router';
import { useActiveStore, useNoteStore, useTabStore } from '~/src/store';
const repoStore = useRepoStore();
const { routerPush } = useRouterPush();
const { repoDetail, getRepo, hasRepo } = useRepoStore();
const { getND, hasND } = useNoteStore();
const tabStore = useTabStore();

const nowTime = getNowTimeStamp();

const route = useRoute();
const repo = ref({
  repoId: '',
  repoTitle: '',
  repoNoteNum: 0,
  visitNum: 0,
  updateTime: 0,
  isStar: false,
  starTime: 0,
  isDel: false,
  delTime: 0,
  createTime: 0,
  userId: '',
  userName: '',
  noteList: [
    {
      noteId: '',
      noteTitle: '',
      isStar: false,
      isArchive: false,
      isShare: false,
      createTime: 0,
      updateTime: 0
    }
  ]
});
const repoList = ref([
  {
    noteId: '',
    noteTitle: '',
    isStar: false,
    isArchive: false,
    isShare: false,
    createTime: 0,
    updateTime: 0
  }
]);
const { repoId = '' } = route.query;

getRepo(repoId)
  .then(() => {
    return hasRepo(repoId);
  })
  .then(num => {
    if (isNumber(num)) {
      repo.value = repoDetail[num];
      repoList.value = repo.value.noteList;
      tabStore.setActiveTabTitle(`知识库 - ${repo.value.repoTitle}`);
    }
  });

const stats = useActiveStore();
const repoActiveList = ref([
  {
    time: 0,
    color: '',
    content: '',
    title: ''
  }
]);

stats
  .getRepoActiveList(repoId)
  .then(() => {
    return stats.hasRepoActiveList(repoId);
  })
  .then(num => {
    if (isNumber(num)) {
      repoActiveList.value = stats.formatActiveList(stats.repoActiveList[num].activeList);
    }
  });
const deleteRepoDialog = ref(false);
function openDeleteRepoDialog() {
  deleteRepoDialog.value = true;
}
function handleDeleteRepo() {
  if (repo.value) {
    repoStore.deleteRepo(repo.value.repoId);
    useTabStore().removeTab(`/repo/detail?isEdit=false&repoId=${repo.value.repoId}#${repo.value.repoId}`);
  }
}
function handleDelRepo() {
  repoStore.delRepo(repo.value.repoId);
  useTabStore().removeTab(`/repo/detail?isEdit=false&repoId=${repo.value.repoId}#${repo.value.repoId}`);
}
const col = [
  {
    title: '名称',
    align: 'center',
    key: 'noteTitle',
    render(row) {
      return row.noteTitle;
    }
  },
  {
    key: 'isArchive',
    title: '状态',
    align: 'center',
    render(row) {
      const res = [];
      if (row.isArchive) {
        res.push(h(NTag, { type: 'error', class: 'm-l-2' }, { default: () => '已归档' }));
        return res;
      }
      res.push(h(NTag, { type: 'success', class: 'm-l-2' }, { default: () => '正常' }));
      if (row.isShare) {
        res.push(h(NTag, { type: 'info', class: 'm-l-2' }, { default: () => '分享中' }));
      }
      if (row.isStar) {
        res.push(h(NTag, { type: 'warning', class: 'm-l-2' }, { default: () => '已收藏' }));
      }

      return res;
    }
  },
  {
    key: 'updateTime',
    title: '更新于',
    align: 'center',
    render(row) {
      if (row.updateTime) {
        return h(NTime, { to: nowTime, time: row.updateTime, type: 'relative' }, {});
      }
      return '未知';
    }
  },
  {
    key: 'createTime',
    title: '创建于',
    align: 'center',
    render(row) {
      if (row.createTime) {
        return h(NTime, { to: nowTime, time: row.createTime, type: 'relative' }, {});
      }
      return '未知';
    }
  }
];

function toNoteDetail(row) {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      routerPush({
        name: routeName('note_detail'),
        query: { isEdit: 'false', noteId: row.noteId },
        hash: `#${row.noteId}`
      });
    }
  };
}
</script>
