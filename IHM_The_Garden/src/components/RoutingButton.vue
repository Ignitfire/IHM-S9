<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'grey'
    },
    size: {
      type: String,
      default: 'small'
    },
    shape: {
      type: String,
      default: 'square'
    },
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>


<template>
  <router-link :to="path">
    <button :class="['button', size, shape]" @click="handleClick">
      <img v-if="icon" :src="icon" class="button-icon" />
      <p></p>
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
}

.small.square{
  width: 2rem;
  height: 2rem;
}
</style>


