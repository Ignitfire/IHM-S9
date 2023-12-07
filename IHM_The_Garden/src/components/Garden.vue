<script setup>
import { usePostStore } from '../stores/posts'
import Post from './Post.vue';
import { computed } from 'vue';


const props = defineProps({
  UserID: {
    type: Number,
    required: true
  }
})

const store = usePostStore()
const userPosts = computed(() => store.getPostsByUser(props.UserID))
</script>

<template>
  <div class="garden">
    <Post v-for="post in userPosts" :key="post.postID" v-bind="post" :style="{ gridArea: `${post.location.y + 1} / ${post.location.x + 1}` }" />
  </div>
</template>

<style scoped>
.garden {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 2rem;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  background-color: lightgreen;
}

</style>
