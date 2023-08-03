<template>
  <div class="select" :class="{ 'select-disabled': isDisable }">
    <cookie-input
      ref="input"
      :placeholder="props.placeholder"
      :border="false"
      :transparent="false"
      class="select_item-inp"
      :model-value="props.modelValue"
      @click="handleClick"
      @blur="isSelect = false"
    ></cookie-input>
    <div class="select_item-btn" @click="openSelect_time">
      <svg
        :class="{ 'select_item-btn-active': isSelect }"
        viewBox="0 0 1024 1024"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path
          d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z"
        ></path>
      </svg>
    </div>
    <div v-show="isSelect" class="list">
      <ul>
        <li
          v-for="item of timeList"
          :key="item.time"
          class="list_item"
          :class="{ 'list_item-active': item.active, 'list_item-disable': item.disabled }"
          @mousedown="handleMouseDown(item)"
        >
          {{ item.time }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, defineEmits, watch } from 'vue';
import CookieInput from '../cookie-input/CookieInput.vue';

interface Options {
  start: string;
  end: string;
  step: number;
}
interface TimeStatus {
  time: string;
  active: boolean;
  disabled: boolean;
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '选择时间框',
  },
  pickerOptions: {
    type: Object as () => Options,
    default: () => ({
      start: '',
      end: '',
      step: '',
    }),
  },
  minTime: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue']);
const isSelect = ref(false);
const isDisable = computed(() => props.disabled);
const timeList = ref<TimeStatus[]>([]);

// 生成时间列表
const generateTimeList = (startTime: string, endTime: string, step: number, minTime?: string): TimeStatus[] => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const min = new Date(`1970-01-01T${minTime}:00`);
  const timeList: TimeStatus[] = [];
  while (start <= end) {
    const timeString = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const item = { time: timeString, active: false, disabled: false };
    if (start <= min) {
      item.disabled = true;
    }
    timeList.push(item);
    start.setMinutes(start.getMinutes() + step);
  }
  return timeList;
};
const { start, end, step } = props.pickerOptions;

timeList.value = generateTimeList(start, end, +step);
// 监听第一个input框 当改变值就让第二个input框不能点击之前的时间
watch(
  () => props.modelValue,
  function () {
    if (props.modelValue) {
      timeList.value = generateTimeList(start, end, step, props.modelValue);
    }
  },
  { immediate: true },
);
watch(
  () => props.minTime,
  function () {
    if (props.minTime) {
      emits('update:modelValue', '');
      timeList.value = generateTimeList(start, end, step, props.minTime);
    }
  },
  { immediate: true },
);

const handleClick = () => {
  isSelect.value = !isSelect.value;
};
const openSelect_time = () => {
  handleClick();
};

const handleMouseDown = (item: TimeStatus): void => {
  emits('update:modelValue', item.time); // 更新input框
  item.active = true; // 更新样式
  handleClick();
};
</script>
<style scoped>
/**************************************************整个容器********************* */
.select {
  width: 100%;
  height: 100%;
  position: relative;
}
.select-disabled {
  pointer-events: none;
}

/**************************************************input框********************* */
.select_item-inp {
  height: 40px;
  max-width: 120px;
}
/**************************************************button********************* */
.select_item-btn {
  height: 16px;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  margin-right: 10px;
  top: 50%;
  cursor: pointer;
}
.select_item-btn:hover {
  color: rgb(0 122 255);
}
.select_item-btn-active {
  transform: rotate(180deg);
}

/**************************************************下拉展示列表样式********************* */
.list {
  overflow: auto;
  min-width: 190px;
  max-height: 165px;
  opacity: 1;
  z-index: 1000;
  margin-top: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 8px;
  border: none;
  box-shadow: var(--primary-shadow);
  background: var(--primary-background);
}
/**************************************************下拉展示列表item********************* */
.list_item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.list_item:hover {
  background-color: var(--grey-background);
}
.list_item-active {
  color: rgba(10, 132, 255, 1);
}
.list_item-disable {
  color: var(--disable-color);
  pointer-events: none;
}
</style>
