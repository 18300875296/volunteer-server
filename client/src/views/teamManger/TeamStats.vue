<template>
  <div class="systemControl">
    <header class="header">
      <h1 class="header_item-title">团队数据分析</h1>
    </header>
    <div class="stats">
      <cookie-card class="stats_item register" :show-footer="false">
        <template #title>
          <span>注册人数</span>
          <span @click="handleClickMoreData">更多</span>
          <span>昨日新增数量 10人</span>
        </template>
        <div ref="registerChartRef" class="register-chart"></div>
      </cookie-card>
      <cookie-card class="stats_item login">登录量</cookie-card>
      <cookie-card class="stats_item view">浏览量</cookie-card>
      <cookie-card class="stats_item visitor">访客量</cookie-card>
    </div>
    <section class="stats-detail">
      <cookie-card class="detail_item-content" :show-footer="false">
        <template #title>
          <span>注册人数</span>
        </template>
        <div ref="chartContainerRef" class="register-detail-chart"></div>
      </cookie-card>
      <cookie-card class="detail_item-content" :show-footer="false">
        <template #title>
          <span>注册人数</span>
        </template>
        <div ref="circleContainerRef" class="register-detail-chart"></div>
      </cookie-card>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import CookieCard from '../../components/cookie-card/CookieCard.vue';
// 注册量数据
const registerData = [
  { date: '2023-05-25', count: 2 },
  { date: '2023-05-26', count: 3 },
  { date: '2023-05-27', count: 7 },
  { date: '2023-05-28', count: 8 },
  { date: '2023-05-29', count: 2 },
  { date: '2023-05-30', count: 5 },
];
const registerChartRef = ref<HTMLElement>();
// 当前最近三天注册数据
const lastThreeDayData = registerData.slice(-3);
const dates = lastThreeDayData.map((item) => item.date);
const counts = lastThreeDayData.map((item) => item.count);
const registerChartOption = {
  grid: {
    left: '-10',
    right: '0',
    top: '10',
    bottom: '0',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    formatter(params) {
      const xAxisValue = params[0].name;
      const yAxisValue = params[0].value;
      return `日期：${xAxisValue}<br/>注册人数：${yAxisValue}人`;
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      name: '时间',
      data: dates,
      show: true,
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '注册人数',
      min: 0,
      max: 10,
      show: false,
    },
  ],
  series: [
    {
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3, // 调整线条的宽度
      },
      data: counts,
    },
  ],
};
const chartContainerRef = ref<HTMLElement>();
const dates2 = registerData.map((item) => item.date);
const counts2 = registerData.map((item) => item.count);
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    formatter(params) {
      const xAxisValue = params[0].name;
      const yAxisValue = params[0].value;
      return `日期：${xAxisValue}<br/>注册人数：${yAxisValue}人`;
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      name: '时间',
      data: dates2,
      show: true,
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '注册人数',
      min: 0,
      max: 10,
      show: true,
    },
  ],
  series: [
    {
      type: 'bar',
      smooth: true,
      lineStyle: {
        width: 3, // 调整线条的宽度
      },
      data: counts2,
    },
  ],
};
const option2 = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
const circleContainerRef = ref<HTMLElement>();
onMounted(() => {
  if (!registerChartRef.value) {
    return false;
  }
  const _chart = echarts.init(registerChartRef.value);
  _chart.setOption(registerChartOption);
  window.addEventListener('resize', () => {
    _chart.resize();
  });
  if (!chartContainerRef.value) {
    return false;
  }
  const registerChart = echarts.init(chartContainerRef.value);
  registerChart.setOption(option);
  if (circleContainerRef.value) {
    const registerCircle = echarts.init(circleContainerRef.value);
    registerCircle.setOption(option2);
  }
});
const handleClickMoreData = () => {};
</script>
<style scoped>
.systemControl {
  user-select: none;
  display: flex;
  flex-flow: column nowrap;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 15px 0px 8px; */
  padding-top: 8px;
  margin: 0 24px;
}
.teamInfo_item-title {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px, rgba(0, 0, 0, 0.1) 0px 1px 2px;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 24px auto;
  border-radius: 13px;
  padding: 16px 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  min-height: 400px;
}
.header_item-title {
  color: rgba(86, 74, 190, 1);
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 0;
  letter-spacing: 1.1px;
}
.header_item-title svg {
  margin-left: 4px;
  transform: translateY(2px);
  cursor: pointer;
}
.stats {
  display: flex;
  flex-flow: row nowrap;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 24px auto;
  border-radius: 13px;
  /* padding: 16px 24px; */
  /* min-height: 400px; */
}
.stats_item {
  flex: 1;
}
.stats_item:not(:last-child) {
  margin-right: 20px;
}
.stats_item:deep(.paragraph) {
  margin: 0;
  overflow: unset;
}
.register-chart {
  width: 100%;
  height: 120px; /* 设置容器高度 */
  margin: 12px auto 0; /* 水平居中显示 */
  display: flex;
  justify-content: center; /* 垂直居中显示 */
  align-items: center;
}
.stats-detail {
  display: flex;
  flex-flow: row nowrap;
  width: calc(100% - 48px);
  max-width: 1440px;
  margin: 0 auto 24px;
}
.detail_item-content {
  flex: 1;
}
.detail_item-content:first-child {
  margin-right: 24px;
}
.register-detail-chart {
  height: 300px;
  width: 500px;
}
</style>
