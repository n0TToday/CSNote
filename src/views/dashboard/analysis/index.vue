<template>
  <n-space :vertical="true" :size="16">
    <top-chart />
    <!-- <data-card /> -->
    <bottom-part />
  </n-space>
</template>

<script lang="ts" setup>
import { useActiveStore } from '~/src/store';
import { BottomPart, DataCard, TopChart } from './components';
const { initActiveState } = useActiveStore();
initActiveState();
</script>

<style scoped></style>
