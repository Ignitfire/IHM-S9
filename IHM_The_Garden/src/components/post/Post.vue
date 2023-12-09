<script setup>
import TimeCounter from './TimeCounter.vue';
import WaterCounter from '../WaterCounter.vue';
import { onMounted, ref } from 'vue';




const props= defineProps({
  droplets: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postID: {
    type: Number,
    required: true
  },
});

const prologue = props.content.substring(0,40)+"...";

</script>

<template>
  <div 
  class="post-container"
  >
  <div 
  class="post" 
    @mouseenter="$emit('post-hovered', { postID: props.postID });"
    >
        <p class="text">{{prologue}}</p>
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
