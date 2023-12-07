<script setup>
import TimeCounter from './TimeCounter.vue';
import WaterCounter from './WaterCounter.vue';

const props= defineProps({
  droplets: {
    type: Number,
    required: true
  },
  timeLeft: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creationDate: {
    type: String,
    required: true
  },
  totalWatering: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="post">
    <div class="top">
      <TimeCounter :time="props.timeLeft" class="top-left"></TimeCounter>
      <WaterCounter :droplets="props.droplets" class="top-right"></WaterCounter>
    </div>
    <div class="middle">
      <p>{{props.content}}</p>
    </div>
    <div class="bottom">
      <p class="bottom-left">arrosé {{props.totalWatering}} fois</p>
      <p class="bottom-right">crée le {{props.creationDate}}</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  height: 20vh; /* Adjust as needed */
  width: 20vh; /* Adjust as needed */
}
.top-left, .top-right, .bottom-left, .bottom-right {
  position: absolute;
}
.top-left {
  top: 0;
  left: 0;
}
.top-right {
  top: 0;
  right: 0;
}
.bottom-left {
  font-size: 0.8rem;
  bottom: 0;
  left: 0;
}
.bottom-right {
  font-size: 0.8rem;
  bottom: 0;
  right: 0;
}
</style>
