<script setup>
import TimeCounter from './TimeCounter.vue';
import WaterCounter from './WaterCounter.vue';
import { onBeforeUnmount, onMounted } from 'vue';
import {gsap} from 'gsap';

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
  },
  location: {
    type: Object,
    required: false
  },
  postID: {
    type: Number,
    required: true
  },
});

onMounted(() => {
  gsap.from(".postVisualization", {duration: 0.5, opacity: 0});
});

onBeforeUnmount(() => {
  gsap.to(".postVisualization", {duration: 5, opacity: 0});
});
</script>

<template>
    <div class="postVisualization">
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
.postVisualization {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: lightgreen;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 1rem;
  height: 50%; /* Adjust as needed */
  width: 90%; /* Adjust as needed */
  z-index: 2;
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