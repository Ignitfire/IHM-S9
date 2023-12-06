<script setup>
import Post from './Post.vue';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="garden">
    <Post v-for="post in props.posts" :key="post.id" v-bind="post" />
  </div>
</template>

<style scoped>
.garden {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
}
</style>
