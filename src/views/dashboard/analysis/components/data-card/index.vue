<template>
  <n-grid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
    <!-- <n-grid-item v-for="item in cardData" :key="item.id">
      <gradient-bg class="h-100px" :start-color="item.colors[0]" :end-color="item.colors[1]">
        <h3 class="text-16px">{{ item.title }}</h3>
        <div class="flex justify-between pt-12px">
          <svg-icon :icon="item.icon" class="text-32px" />
          <count-to
            :prefix="item.unit"
            :start-value="1"
            :end-value="item.value"
            class="text-24px text-white dark:text-dark"
          />
        </div>
      </gradient-bg>
    </n-grid-item>
    <n-grid-item>
      <gradient-bg class="h-100px" start-color="#56cdf3" end-color="#719de3">
        <h3 class="text-16px">最常使用时段</h3>
        <div class="flex justify-between pt-12px">
          <svg-icon icon="mdi:clock-time-four-outline" class="text-32px" />
          <n-text class="text-24px text-white dark:text-dark">10:00 - 21:00</n-text>
        </div>
      </gradient-bg>
    </n-grid-item>
    <n-grid-item>
      <gradient-bg class="h-100px" start-color="#fcbc25" end-color="#f68057">
        <h3 class="text-16px">最近登录IP</h3>
        <div class="flex justify-between pt-12px">
          <svg-icon icon="mdi:earth" class="text-28px" />
          <n-ellipsis :line-clamp="1" class="text-20px text-white dark:text-dark">{{
            infoActive.lastLoginIP
          }}</n-ellipsis>
        </div>
      </gradient-bg>
    </n-grid-item> -->
  </n-grid>
</template>

<script setup lang="ts">
import { useActiveStore } from '~/src/store';
import { GradientBg } from './components';

defineOptions({ name: 'DashboardAnalysisDataCard' });

interface CardData {
  id: string;
  title: string;
  value: number;
  unit: string;
  colors: [string, string];
  icon: string;
}

const { infoActive } = useActiveStore();

const cardData: CardData[] = [
  {
    id: 'word',
    title: '总操作量',
    value: infoActive.activeNum,
    unit: '',
    colors: ['#865ec0', '#5144b4'],
    icon: 'lucide:whole-word'
  },
  {
    id: 'visit',
    title: '登录次数',
    value: 1226,
    unit: '',
    colors: ['#ec4786', '#b955a4'],
    icon: 'solar:login-3-line-duotone'
  }
];
</script>

<style scoped></style>
