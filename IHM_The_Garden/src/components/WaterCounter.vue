<script setup>
import { faTint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  droplets: {
    type: Number,
    required: true
  }
})
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
  gap: 0.5rem;
}
</style>
