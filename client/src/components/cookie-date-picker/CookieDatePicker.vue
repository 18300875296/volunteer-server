<template>
  <div class="date">
    <cookie-input
      :placeholder="props.startPlaceholder"
      :model-value="props.modelValue.split(',')[0]"
      :border="false"
      :transparent="false"
      class="date_item-inp"
      @click="handleClick"
    ></cookie-input>
    <span class="date_item-gap">{{ props.rangeSeparator }}</span>
    <cookie-input
      :placeholder="props.endPlaceholder"
      :model-value="props.modelValue.split(',')[1]"
      :border="false"
      :transparent="false"
      class="date_item-inp"
      @click="handleClick"
    ></cookie-input>
  </div>
  <cookie-calendar v-show="showCalendar" @selectDate="handleSelectDate"></cookie-calendar>
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import CookieInput from '../cookie-input/CookieInput.vue';
import CookieCalendar from './cookieCalendar.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  rangeSeparator: {
    type: [String, Number],
    default: '',
  },

  startPlaceholder: {
    type: [String, Number],
    default: '',
  },
  endPlaceholder: {
    type: [String, Number],
    default: '',
  },
});
const showCalendar = ref(false);
const emits = defineEmits(['update:modelValue']);

const handleClick = () => {
  showCalendar.value = !showCalendar.value;
};

const handleSelectDate = (dateGroup: string[]) => {
  emits('update:modelValue', dateGroup.join(','));
  showCalendar.value = false;
};
</script>
<style scoped>
.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: nowrap;
  gap: 5px;
}
.date_item-inp {
  height: 40px;
  line-height: 40px;
  max-width: 150px;
}
.date_item-gap {
  height: 2px;
  width: 15px;
  background-color: var(--disable-color);
}

/* .block-dates-container {
  grid-column-start: 2;
} */
</style>
