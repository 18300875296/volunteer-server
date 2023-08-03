<template>
  <li class="cookie-menu-item">
    <div class="sub-menu-title" :class="{ active: isActive }" @click="handleClick">
      <slot name="title"></slot>
    </div>
    <ul v-show="isShow" class="sub-menu-list">
      <div class="sub-item">
        <slot></slot>
      </div>
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

/** props*******start***************** */
const props = defineProps({
  route: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});
/** props*******end***************** */

/** data*******start***************** */
const isShow = ref(false);
/** data*******end***************** */

/** router*******start***************** */
const Route = useRoute();
// const Router = useRouter()
const isActive = computed(() => props.route === Route.path);
/** router*******end***************** */

/** handleClick*******start***************** */
const handleClick = () => {
  isShow.value = true;
};
/** handleClick*******start***************** */
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cookie-menu-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'PingFang SC';
  height: 24px;
  line-height: 24px;
  font-weight: 400;
  font-size: 16px;
  margin-left: 31.5px;
  color: rgba(52, 61, 73, 0.6);
  cursor: pointer;
  list-style: none;
  text-align: center;
  transition: color 0.3s;
}

.sub-menu-list {
  position: absolute;
  z-index: 999;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  top: 30px;
}

.sub-item {
  padding: 5px 12px;
}

.active {
}
</style>
