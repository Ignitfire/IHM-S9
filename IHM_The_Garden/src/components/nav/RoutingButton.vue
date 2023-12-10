<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "thread"
  },
  path: {
    type: String,
    default: '/'
  }
});

let icon='';
let color='';

switch (props.type) {
case 'garden': {
  icon = '/icons/icon_garden.png';
  color = 'green';
  break;
}
case 'thread': {
  icon = '/icons/icon_thread.png';
  color = 'green';
  break;
}
case 'home': {
  icon = '/icons/icon_home.png';
  color = 'yellow';
  break;
}
}
</script>


<template>
  <router-link :to="props.path">
    <button :class="['button',color]">
      <img v-if="icon" :src="icon" class="button-icon" />
    </button>
  </router-link>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.1rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 100%;
}

.green {
  background-color: #00FF00;
}

.yellow {
  background-color: #FFFF00;
}

img {
  width: 80%;
  height: 80%;
}
</style>
