<script setup>
import TimeCounter from './TimeCounter.vue';
import WaterCounter from './WaterCounter.vue';
import { onMounted, ref } from 'vue';




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

onMounted(() => {
  if (!window.location.href.includes('/thread')){
    if (props.location.x < 3) {
      isLeftSide.value = true;
    } else {
      isLeftSide.value = false;
    }
  }else{
    isLeftSide.value = false;
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

        <p class="text">{{props.content}}</p>


    </div>
  </div>
</template>

<style scoped>
.text{
  text-align: center;
}
.post {
  background-color: white;
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
