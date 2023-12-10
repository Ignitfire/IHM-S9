<script setup>
import TimeCounter from './TimeCounter.vue';
import WaterCounter from '../WaterCounter.vue';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import {gsap} from 'gsap';
import { useUserStore } from '@/stores/allStores.js';

const props= defineProps({
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
  postID: {
    type: Number,
    required: true
  },
  locationWaterCount: {
    type: Number,
    required: true
  },
  gridAreaType: {
    type: String,
    required: true
  },
  userID: {
    type: Number,
    required: true
  }
});

const userPseudo = computed(() => {
  return useUserStore().getUserByID(props.userID).userPseudo;
});

const timeLeft = computed(() => {
  if (props.gridAreaType === 'dirt'){
    return props.locationWaterCount * 1000;
  } else if (props.gridAreaType === 'grass'){
    return props.locationWaterCount * 10000;
  } else if (props.gridAreaType === 'forest'){
    return props.locationWaterCount * 100000;
  } else {
    return 99999999; 
  }
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
          <TimeCounter :time="timeLeft" class="top-left"></TimeCounter>
          <p>{{ userPseudo }}</p>
          <WaterCounter :droplets="props.locationWaterCount" class="top-right"></WaterCounter>
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
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  background-color: whitesmoke;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 0.5rem 1rem;
  height: 50%;
  width: 90%;
  z-index: 2;
}
.top, .middle, .bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.bottom-left {
  font-size: 0.8rem;
}
.bottom-right {
  font-size: 0.8rem;
}
</style>