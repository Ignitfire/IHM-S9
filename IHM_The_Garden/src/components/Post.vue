<script setup>
import { useRoute } from 'vue-router';
import TimeCounter from './TimeCounter.vue';
import WaterCounter from './WaterCounter.vue';
import { onMounted, ref } from 'vue';
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const route= useRoute();


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


const isLeftSide = ref(true);


const toggleSide = () => {
  isLeftSide.value = !isLeftSide.value;
};

onMounted(() => {
  if (window.location.href.includes('/thread')){
    gsap.registerPlugin(ScrollTrigger);
    isLeftSide.value = false;

    const tlRight = gsap.timeline({
      scrollTrigger: {
        trigger: '.post',
        start: 'top 100%',
        end: 'center 50%',
        scrub: true,
        onUpdate: ({ progress }) => {
          if (progress >= 0.6) {
            toggleSide();
          }
        },
      },
    });

    tlRight.from('.post', {
      x: '100%',
    });

    tlRight.to('.post', {
      x: '40%',
    });

    const tlLeft = gsap.timeline({
      scrollTrigger: {
        trigger: '.post',
        start: 'center 50%',
        end: 'bottom 0%',
        scrub: true,
        onUpdate: ({ progress }) => {
          if (progress >= 0.4) {
            toggleSide();
          }
        },
      },
    });

    tlLeft.to('.post', {
      x: '0%',
    });
  }else{
    if (props.location.x < 3) {
      isLeftSide.value = true;
    } else {
      isLeftSide.value = false;
    }
  }
});
</script>

<template>
  <div 
  class="post-container"
  >
  
  <div 
  class="post" 
  @mouseleave="$emit('post-not-hovered', { postID: props.postID, isLeftSide: isLeftSide })"
    @mouseenter="$emit('post-hovered', { postID: props.postID, isLeftSide: isLeftSide });"
    >
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
