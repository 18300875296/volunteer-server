<template>
  <div class="block-time-container">
    <cookie-input
      :placeholder="props.startPlaceholder"
      :border="false"
      :transparent="false"
      @click="handleClick_select"
    ></cookie-input>
    <span>{{ props.rangeSeparator }}</span>
    <cookie-input
      :placeholder="props.endPlaceholder"
      :border="false"
      :transparent="false"
      @click="handleClick_select"
    ></cookie-input>
    <cookie-time v-show="isSelect"></cookie-time>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import CookieInput from '../cookie-input/CookieInput.vue';
import CookieTime from './CookieTime.vue';

const props = defineProps({
  modelValue: {
    type: [String],
    default: '',
  },
  rangeSeparator: {
    type: [String],
    default: '',
  },
  startPlaceholder: {
    type: [String],
    default: '',
  },
  endPlaceholder: {
    type: [String],
    default: '',
  },
});
const isSelect = ref(false);
const handleClick_select = () => {
  isSelect.value = !isSelect.value;
};
</script>
<style scoped>
.block-time-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: nowrap;
}
</style>
