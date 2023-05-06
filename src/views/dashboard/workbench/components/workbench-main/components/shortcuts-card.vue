<template>
  <div
    class="flex-col-center h-110px p-6px border-1px border-#efeff5 dark:border-#ffffff17 rounded-8px hover:shadow-sm cursor-pointer"
  >
    <svg-icon :icon="icon" :style="{ color: iconColor }" class="text-36px" />
    <p class="pt-8px text-16px">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DashboardWorkbenchMainShortcutsCard' });

interface Props {
  label: string;
  icon: string;
  iconColor: string;
}

defineProps<Props>();
</script>

<style scoped></style>
