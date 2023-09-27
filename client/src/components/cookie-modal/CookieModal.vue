<script setup lang="ts">
const props = defineProps({
  showModal: Boolean,
});
</script>

<template>
  <Transition name="modal">
    <div v-if="props.showModal" class="modal_mask">
      <div class="modal_container">
        <div class="modal_header">
          <slot name="header">default header</slot>
        </div>
        <div class="modal_body">
          <slot name="body">default body</slot>
        </div>
        <div class="modal_footer">
          <slot name="footer"> default footer </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal_mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal_container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal_header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal_body {
  margin: 20px 0;
}
.modal_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
}
.modal_default_button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
