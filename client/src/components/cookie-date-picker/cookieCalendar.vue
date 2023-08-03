<template>
  <div class="block-calendar-container">
    <div class="block-calendar-select">
      <button v-if="props.showLastYear" @click="handleLastYear">去年</button>
      <div v-if="props.showLastMonth" class="select_item-button" @click="handleLastMonth">
        <svg viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <span v-if="props.showYear">{{ year }}年</span>
      <span v-if="props.showMonth"> {{ month }}月</span>
      <button v-if="props.showNextYear" @click="handleNextYear">明年</button>
      <div v-if="props.showNextMonth" class="select_item-button" @click="handleNextMonth">
        <svg viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
    <div class="block-calendar-content">
      <template v-for="(item, index) of data" :key="index">
        <span
          class="item-span-day"
          :class="{
            'item-span-not': !item.curMonth,
            'item-span-today': item.today,
            'item-span-cur': item.curMonth,
            'item-span-active': item.active,
          }"
          @click="handleClick(item)"
          >{{ item.value }}</span
        >
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineEmits, defineProps } from 'vue';

const props = defineProps({
  showLastYear: {
    type: Boolean,
    default: true,
  },
  showLastMonth: {
    type: Boolean,
    default: true,
  },
  showYear: {
    type: Boolean,
    default: true,
  },
  showMonth: {
    type: Boolean,
    default: true,
  },
  showNextYear: {
    type: Boolean,
    default: true,
  },
  showNextMonth: {
    type: Boolean,
    default: true,
  },
});

const data = ref();
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const emits = defineEmits(['selectDate']);
const dateGroup = [] as string[];

const getCalendarData = (year: number, month: number) => {
  const date = new Date();
  const today = date.getDate(); // 今天
  const curMonth = date.getMonth() + 1;
  const curYear = date.getFullYear();
  const calendarData = [];
  const daysInMonth = new Date(year, month, 0).getDate(); // 当前月份的天数
  const firstDayInMonth = new Date(year, month - 1, 1).getDay(); // 获取当前月1号的星期数
  if (firstDayInMonth !== 0) {
    // 上个月
    const lastMonthDays = new Date(year, month - 1, 0).getDate(); // 上个月份的天数
    for (let i = lastMonthDays; i > lastMonthDays - firstDayInMonth + 1; i -= 1) {
      if (today === i && curMonth === month && curYear === year) {
        calendarData.unshift({ year, month: month - 1, value: i, curMonth: false, today: true, active: false });
      } else {
        calendarData.unshift({ year, month: month - 1, value: i, curMonth: false, today: false, active: false });
      }
    }
  }
  // 本月
  for (let i = 1; i <= daysInMonth; i += 1) {
    if (today === i && curMonth === month && curYear === year) {
      calendarData.push({ year, month, value: i, curMonth: true, today: true, active: false });
    } else {
      calendarData.push({ year, month, value: i, curMonth: true, today: false, active: false });
    }
  }
  const restDays = 42 - calendarData.length;
  if (restDays > 0) {
    for (let i = 1; i <= restDays; i += 1) {
      if (today === i && curMonth === month && curYear === year) {
        calendarData.push({ year, month: month + 1, value: i, curMonth: false, today: true, active: false });
      } else {
        calendarData.push({ year, month: month + 1, value: i, curMonth: false, today: false, active: false });
      }
    }
  }
  return { calendarData };
};

const handleLastYear = () => {
  const { calendarData } = getCalendarData(year.value - 1, month.value);
  data.value = calendarData;
  year.value -= 1;
};
const handleLastMonth = () => {
  const { calendarData } = getCalendarData(year.value, month.value - 1);
  data.value = calendarData;
  if (month.value === 1) {
    month.value = 12;
  } else {
    month.value -= 1;
  }
};
const handleNextYear = () => {
  const { calendarData } = getCalendarData(year.value + 1, month.value);
  data.value = calendarData;
  year.value += 1;
};

const handleNextMonth = () => {
  const { calendarData } = getCalendarData(year.value, month.value + 1);
  data.value = calendarData;
  if (month.value === 12) {
    month.value = 1;
  } else {
    month.value += 1;
  }
};

const handleClick = (item: any) => {
  const date = `${item.year}-${item.month}-${item.value}`;
  // item.active = true
  if (dateGroup.length === 2) {
    dateGroup.length = 0; // 清空之前的数据
  }
  dateGroup.push(date);
  if (dateGroup.length === 2) {
    emits('selectDate', dateGroup);
  }
};
onBeforeMount(() => {
  const { calendarData } = getCalendarData(year.value, month.value);
  data.value = calendarData;
});
</script>
<style scoped>
.block-calendar-container {
  max-height: 320px;
  max-width: 320px;
  opacity: 1;
  z-index: 1000;
  margin-top: 0.8em;
  padding: 1em;
  position: absolute;
  border-radius: 8px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.12) 0px 6px 16px;
  background: rgba(255, 255, 255, 1);
}

.item-span-day {
  cursor: pointer;
  line-height: 32px;
  width: 32px;
  text-align: center;
  vertical-align: middle;
  font-weight: 600;
  font-size: 12px;
}

.item-span-not {
  color: #3c3c434d;
}

.item-span-not:hover {
  color: rgb(38, 38, 38);
  background-color: #00000008;
  border-radius: 50%;
}

.item-span-today {
  color: #409eff;
  border-radius: 50%;
}

.item-span-active {
  background-color: #409eff;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}

.item-span-cur:hover {
  color: #409eff;
  border-radius: 50%;
  background-color: #00000008;
}

.block-calendar-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 40px;
  width: 100%;
}
.select_item-button {
  height: 16px;
  width: 16px;
}

.block-calendar-content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  /* grid-gap: 10px 10px; */
  grid-template-rows: repeat(6, minmax(0, 1fr));
}
</style>
