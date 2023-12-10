<script setup>
import { computed } from 'vue';

const props = defineProps({
  action: {
    type: String,
    required: true
  }
});




const buttonProps = computed(() => {
  let icon='';
  let color='';

  switch (props.action) {
  case 'settings': {
    icon = '/icons/icon_settings.svg';
    color = 'grey';
    break;
  }
  case 'send': {
    icon = '/icons/icon_send.svg';
    color = 'blue';
    break;
  }
  case 'contacts': {
    icon = '/icons/icon_openContacts.svg';
    color = 'yellow';
    break;
  }
  case 'sprinkle': {
    icon = '/icons/icon_sprinkle.svg';
    color = 'blue';
    break;
  }
  case 'addUser': {
    icon = '/icons/icon_addUser.svg';
    color = 'yellow';
    break;
  }
  case 'deletePost': {
    icon = '/icons/icon_deletePost.svg';
    color = 'red';
    break;
  }
  case 'move': {
    icon = '/icons/icon_movePost.svg';
    color = 'green';
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
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.green {
  background-color: #00FF00;
}

.yellow {
  background-color: #FFFF00;
}

img {
  max-width: 60%;
  max-height: 60%;
}
</style>
