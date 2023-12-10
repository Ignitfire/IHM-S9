<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "thread"
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

const emit = defineEmits(['action']);

const buttonHandler = () => {
  emit(props.action);
};

</script>

<template>
    <button :class="['button',buttonProps.color]" @click="buttonHandler"> 
      <img v-if="buttonProps.icon" :src="buttonProps.icon" class="button-icon" />
    </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.1rem;
  padding: 0.25vw;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
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
