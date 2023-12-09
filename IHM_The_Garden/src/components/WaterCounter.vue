<script setup>
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
  droplets: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="waterCounter">
    {{ droplets }} <font-awesome-icon :icon="faTint" />
  </div>
</template>

<style scoped>
.waterCounter {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  gap: 0.5rem;
  height: 2rem;
  width: 6rem;
  border-radius: 10px;
}
</style>
