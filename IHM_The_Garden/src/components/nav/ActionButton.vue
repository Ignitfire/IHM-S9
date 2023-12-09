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
    type: String,
    required: true
  }
});

const buttonProps = computed(() => {
  let icon='';
  let color='';

  switch (props.type) {
  case 'settings': {
    icon = '/icons/icon_settings.png';
    color = 'grey';
    break;
  }
  case 'send': {
    icon = '/icons/icon_send.png';
    color = 'blue';
    break;
  }
  case 'contacts': {
    icon = '/icons/icon_openContacts.png';
    color = 'yellow';
    break;
  }
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
  }
  return {icon, color};
});
</script>


<template>
    <div class="button">
    <button :class="['button',buttonProps.color, props.size]" @click="props.action"> 
      <img v-if="buttonProps.icon" :src="buttonProps.icon" class="button-icon" />
    </button>
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
