<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "thread"
  },
  size: {
    type: String,
    default: 'small'
  },
  action: {
    type: Function,
    default: () => {}
  }
})

let icon='';
let color='';

switch (props.type) {
  case 'sprinkle': {
    icon = '/icons/icon_sprinkle.png';
    color = 'blue';
    break;
  }
  case 'addUser': {
    icon = '/icons/icon_addUser.png';
    color = 'yellow';
    break;
  }
  // remove user?
}
</script>


<template>
  <div class="button">
  <router-link :to="props.path">
    <button :class="['button',color, props.size]">
      <img v-if="icon" :src="icon" class="button-icon" />
    </button>
  </router-link>
  </div>
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
}

.small{
  width: 2rem;
  height: 2rem;
}

.medium{
  width: 4rem;
  height: 4rem;
}

.big{
  width: 8rem;
  height: 8rem;
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
