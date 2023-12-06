<script setup>
import { computed } from 'vue';

const props=defineProps({
  time: {
    type: Number,
    required: true
  }
})

const days = computed(() => Math.floor(props.time / 86400))
const hours = computed(() => Math.floor((props.time % 86400) / 3600))
const minutes = computed(() => Math.floor((props.time % 3600) / 60))
</script>


<template>
  <div class="timeCounter">
    <div class="counters">
      <span class="green">{{ days }}</span>
      <span class="green">{{ hours }}</span>
      <span class="green">{{ minutes }}</span>
    </div>
    <div class = "indicators"> J H M </div>  
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

</style>
