<script setup>
import { ref, watchEffect } from 'vue';
import { useThreadStore } from '../stores/threads'
import { usePostStore } from '../stores/posts'
import { useUserStore } from '../stores/users'
import Post from './Post.vue';

const props = defineProps({
  UserID: {
    type: Number,
    required: true
  }
})

const Threadstore = useThreadStore()
const PostStore = usePostStore()
const UserStore = useUserStore()

const threadPosts = ref(null);
const localUser = UserStore.getLocalUser();

watchEffect(() => {
  if (props.UserID!=localUser.UserID) {
    // Si SenderID est spécifié, threadPosts est égal aux posts présents dans threads
    const threads = Threadstore.getThread(localUser.UserID, props.UserID).sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
    threadPosts.value = threads.map(thread => PostStore.getPostByID(thread.postID));
  } else {
    // Si SenderID n'est pas spécifié, threadPosts est égal aux posts présents dans les utilisateurs correspondant aux ID de following
    const following = UserStore.getFollowingByID(props.UserID);
    const posts = [];
    for (const userID of following) {
      posts.push(...PostStore.getPostsByUser(userID));
    }
    // Trie les posts par date de création
    posts.sort((a, b) => new Date(b.CreationDate) - new Date(a.CreationDate));
    threadPosts.value = posts;
  }
});
</script>

<template>
  <div v-if="threadPosts" class="thread">
    <div v-for="post in threadPosts" :key="post.postID">
      <h2 v-bind="post">Crée par {{post.userID}} Envoyé par {{ props.UserID }}</h2>
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
