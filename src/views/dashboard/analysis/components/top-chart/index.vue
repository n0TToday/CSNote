<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:4">
      <n-card :bordered="false" title="总览" class="rounded-16px shadow-sm">
        <div class="w-full h-360px py-12px">
          <n-row>
            <n-statistic duration="4000" label="使用平台">
              <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.useDay" />
              <template #suffix> 天 </template>
            </n-statistic>
          </n-row>
          <br />
          <n-row>
            <n-statistic duration="4000" label="知识库">
              <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.repoNum" />
              <template #suffix> 个 </template>
            </n-statistic>
            <n-statistic duration="4000" label="标签" class="m-l-10">
              <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.tagNum" />
              <template #suffix> 个 </template>
            </n-statistic>
          </n-row>
          <br />
          <n-statistic duration="4000" label="笔记">
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.noteNum" />
            <template #suffix> 篇 </template>
          </n-statistic>
          <br />
          <n-statistic duration="4000" label="总操作量">
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="infoActive.activeNum" />
            <template #suffix> 次 </template>
          </n-statistic>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:12">
      <n-card :bordered="false" title="知识库中笔记数量" class="rounded-16px shadow-sm">
        <div ref="lineRef" class="w-full h-360px"></div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:8">
      <n-card :bordered="false" title="标签数据一览" class="rounded-16px shadow-sm">
        <div ref="pieRef" class="w-full h-360px"></div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useActiveStore, useRepoStore, useTagStore } from '@/store';
import { type ECOption, useEcharts } from '@/composables';

defineOptions({ name: 'DashboardAnalysisTopCard' });

const repoStroe = useRepoStore();
repoStroe.initList();
const tagStore = useTagStore();
tagStore.getTagList();
const { infoActive } = useActiveStore();

const pieData = ref([
  {
    name: '',
    value: 0
  }
]);
function getPieData() {
  const list = [];
  if (tagStore.tagList) {
    for (const i of tagStore.tagList) {
      list.push({
        name: i.tagTitle,
        value: i.tagNoteNum
      });
    }
  }
  return list;
}
pieData.value = getPieData();

const lineOptions = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['笔记数量']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: repoStroe.repoList.map(a => a.repoTitle)
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      color: '#8e9dff',
      name: '笔记数量',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#8e9dff'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: repoStroe.repoList.map(a => a.repoNoteNum)
    }
  ]
}) as Ref<ECOption>;
const { domRef: lineRef } = useEcharts(lineOptions);

const pieOptions = ref<ECOption>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0
    }
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      color: [
        '#5da8ff',
        '#8e9dff',
        '#fedc69',
        '#26deca',
        '#5da8ff',
        '#8e9dff',
        '#fedc69',
        '#26deca',
        '#5da8ff',
        '#8e9dff',
        '#fedc69',
        '#26deca'
      ],
      name: '标签使用量',
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12'
        }
      },
      labelLine: {
        show: false
      },
      data: pieData
    }
  ]
}) as Ref<ECOption>;
const { domRef: pieRef } = useEcharts(pieOptions);
</script>

<style scoped></style>
