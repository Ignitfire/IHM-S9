<script setup>

import { useThreadStore } from '../stores/threads'
import { usePostStore } from '../stores/posts'
import Post from './Post.vue';
import { computed } from 'vue';


const props = defineProps({
  UserID: {
    type: Number,
    required: true
  },
  RecipientID: {
    type: Number,
    required: true
  }
})

const Threadstore = useThreadStore()
const PostStore = usePostStore()
const threads = computed(() => Threadstore.getThread(props.UserID, props.RecipientID).sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate)))
console.log(threads.value)
const threadPosts = computed(() => {
  const posts = []
  for (const thread of threads.value) {
    console.log(thread.postID)
    posts.push(PostStore.getPostByID(thread.postID))
  }
  return posts
})
</script>

<template>
  <div class="thread">
    <div v-for="post in threadPosts" :key="post.postID">
      <Post v-bind="post" />
      <p>Envoyé le {{ new Date(post.sentDate).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<style scoped>
.thread {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 80ex;
  margin: 0 auto;
  background-color:  lightcyan;
}
</style>
