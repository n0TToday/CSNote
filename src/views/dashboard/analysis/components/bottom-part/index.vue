<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:19">
      <n-card title="全部活动" :bordered="false" class="h-full rounded-16px shadow-sm">
        <n-scrollbar class="w-full">
          <n-timeline horizontal>
            <n-timeline-item
              v-for="item of activeList"
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
    <n-grid-item span="0:24 640:24 1024:5">
      <n-card title="账户信息" :bordered="false" class="h-full rounded-16px shadow-sm">
        <n-text>用户名：</n-text>
        <span class="float-right text-#8e9dff">
          {{ userInfo.userName }}
        </span>
        <br />
        <n-text>手机号：</n-text>
        <span class="float-right text-#26deca">
          {{ userInfo.userPhone }}
        </span>
        <br />
        <n-text>注册时间：</n-text>
        <n-text class="float-right text-#fcbc25">
          <n-time :time="userInfo.createTime" type="date" />
        </n-text>
        <br />
        <n-text>上次登录IP：</n-text>
        <n-text class="float-right text-#e41">
          {{ stats.infoActive.lastLoginIP }}
        </n-text>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useActiveStore, useAuthStore } from '~/src/store';

defineOptions({ name: 'DashboardAnalysisBottomPart' });
const { userInfo } = useAuthStore();
const stats = useActiveStore();
const activeList = ref([
  {
    time: 0,
    color: '',
    content: '',
    title: ''
  }
]);

stats.getActiveList().then(() => {
  activeList.value = stats.formatActiveList(stats.allActiveList);
});
</script>

<style scoped></style>
