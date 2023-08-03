<template>
  <cookie-empty :visible="visible"></cookie-empty>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CookieEmpty from '../components/CookieEmpty/CookieEmpty.vue';

const visible = ref(true);
</script>
<style scoped></style>
