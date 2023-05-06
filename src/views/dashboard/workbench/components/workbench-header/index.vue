<template>
  <n-card :bordered="false" class="rounded-8px shadow-md">
    <div class="flex-y-center justify-between">
      <div class="flex-y-center">
        <icon-local-logo class="text-80px" />
        <!-- <svg-icon icon="ph:sun-horizon-bold" class="text-80px text-#e41"></svg-icon> -->
        <div class="pl-12px">
          <h3 class="text-18px font-semibold">{{ greeting }}</h3>
          <p class="leading-30px text-#999">
            <n-ellipsis :line-clamp="1">
              "{{ auth.yiYan.content }}" —— {{ auth.yiYan.author }}《{{ auth.yiYan.book }}》<i></i>
            </n-ellipsis>
          </p>
        </div>
      </div>
      <n-space :size="24" :wrap="false" class="float-right">
        <n-statistic duration="4000" label="使用平台" class="whitespace-nowrap">
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.useDay" />
          <template #suffix> 天 </template>
        </n-statistic>
        <n-statistic duration="4000" label="知识库" class="whitespace-nowrap">
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.repoNum" />
          <template #suffix> 个 </template>
        </n-statistic>
        <n-statistic duration="4000" label="笔记" class="whitespace-nowrap">
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.noteNum" />
          <template #suffix> 篇 </template>
        </n-statistic>
      </n-space>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { useActiveStore, useAuthStore } from '@/store';

defineOptions({ name: 'DashboardWorkbenchHeader' });

const auth = useAuthStore();
const { infoActive } = useActiveStore();

function greetUser(username: string) {
  const hour = new Date().getHours();
  let greeting = ``;
  if (hour >= 6 && hour < 12) {
    greeting = `早上好，${username}，今天又是充满活力的一天~`;
  } else if (hour >= 12 && hour < 18) {
    greeting = `${username}，送你一杯下午茶~`;
  } else if (hour >= 18 && hour < 24) {
    greeting = `晚上好，${username}，学习之余，不要忘了休息~`;
  } else {
    greeting = `${username}，凌晨了，熬夜伤身，要注意身体哦~`;
  }
  return greeting;
}

const greeting = greetUser(auth.userInfo.userName);
auth.getYiyan();
</script>

<style scoped></style>
