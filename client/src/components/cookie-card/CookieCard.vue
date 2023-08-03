<template>
  <div class="card-wrapper">
    <div v-if="props.showHeader" class="card_item-title">
      <slot name="title"></slot>
    </div>
    <div v-if="props.showBody" class="card_item-body paragraph">
      <slot name="default"></slot>
    </div>
    <div v-if="props.showFooter" class="card_item-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true,
  },
  showBody: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});
</script>
<style scoped>
.card-wrapper {
  /* min-height: 100px; */
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
}

.card_item-title {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-height: 24px;
  position: relative;
}
.card_item-body {
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  min-height: 40px;
  color: rgba(38, 38, 38, 0.75);
}
.paragraph {
  margin: 16px 0px;
}
.card_item-footer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  padding: 3px 0px;
  min-height: 24px;
}
</style>
