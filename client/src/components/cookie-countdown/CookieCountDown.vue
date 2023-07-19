<template>
  <div class="time">
    <span>{{ durationFormatter.dd }}天</span>
    <span>{{ durationFormatter.hh }}时</span>
    <span>{{ durationFormatter.mm }}分</span>
    <span>{{ durationFormatter.ss }}秒</span>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, onBeforeMount } from 'vue';
import dayjs from 'dayjs';

interface Props {
  // label?: string;
  // // 字体颜色和背景颜色，接收十六进制字符串
  // textColor?: string;
  // backgroundColor?: string;
  // height?: string;
  // width?: string;
  // // 依次传递 label 时间 描述 的字体大小
  // fontSize?: string[];
  // mFontSize?: string[];
  // 结束时间，单位毫秒
  endTime?: number | Date | String;
}
const emit = defineEmits(['time-end']);
const props = defineProps({
  endTime: {
    type: [Number, Date, String],
  },
});
const timeLeft = ref(dayjs(props.endTime).diff(dayjs(Date.now()), 'seconds'));
const durationFormatter = computed(() => {
  const time = timeLeft.value;
  if (!time) return { ss: 0 };
  let t = time;
  const ss = t % 60;
  t = (t - ss) / 60;
  if (t < 1) return { ss };
  const mm = t % 60;
  t = (t - mm) / 60;
  if (t < 1) return { mm, ss };
  const hh = t % 24;
  t = (t - hh) / 24;
  if (t < 1) return { hh, mm, ss };
  const dd = t;
  return { dd, hh, mm, ss };
});
let timer: any = null;
const getTime = () => {
  // 避免重复执行 setTimeout
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    if (timeLeft.value >= 0) {
      --timeLeft.value;
      getTime(); // 递归调用
    } else {
      emit('time-end', props.endTime);
    }
  }, 1000);
};

onMounted(() => {
  getTime();
});
onBeforeMount(() => {
  clearTimeout(timer);
});
</script>
<style scoped>
.time {
  display: flex;
  flex-flow: row nowrap;
}
</style>
