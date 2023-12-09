<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref, watchEffect } from 'vue';
import { useThreadStore } from '../stores/threads';
import { usePostStore } from '../stores/posts';
import { useUserStore } from '../stores/users';
import Post from './Post.vue';
import PostVisualization from './PostVisualization.vue';
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = defineProps({
  UserID: {
    type: Number,
    required: true
  }
});

const Threadstore = useThreadStore();
const PostStore = usePostStore();
const UserStore = useUserStore();

const threadPosts = ref(null);
const localUser = UserStore.getLocalUser();

watchEffect(() => {
  if (props.UserID!=localUser.UserID) {
    // Si UserID est spécifié, threadPosts est égal aux posts présents dans threads
    const threads = Threadstore.getThread(localUser.UserID, props.UserID).sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
    threadPosts.value = threads.map(thread => {
      const post = PostStore.getPostByID(thread.postID);
      post.sentDate = thread.sentDate; // Ajoutez la sentDate au post
      return post;
    });
  } else {
    // Si UserID n'est pas spécifié, threadPosts est égal aux posts présents dans les utilisateurs correspondant aux ID de following
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

const visualizedPost = ref(null);

const postsIds = ref([]);

const postVisualizationToggle = (payload) => {
  if(visualizedPost.value === null){
    visualizedPost.value = PostStore.getPostByID(payload.postID);
  }else{
    visualizedPost.value = null;
  }
};

const animationZigZag = () => {
  const thread = document.querySelector('.thread');

  const parentWidth = thread.offsetWidth;
  const posts = document.querySelectorAll(".post-sent-container");

  posts.forEach((post) =>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: post,
        start: "top 100%",
        end: "bottom 0%",
        scrub: true,
      },
    });
    
    tl
      .to(post, {
        x: -parentWidth * 0.8,
        ease: "none",
      })
      .to(post, {
        x: 0,
        ease: "none",
      });
  });
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  postsIds.value = threadPosts.value.map(post => post.postID);
  animationZigZag();
});

onUpdated(() => {
  const isDifferent = postsIds.value.some((id, index) => id !== threadPosts.value[index].postID);
  if(isDifferent){
    postsIds.value = threadPosts.value.map(post => post.postID);
    animationZigZag();
  }
});
</script>

<template>
  <div class="container">
    <div id="visualization">
    <div 
      v-if="visualizedPost !== null"
      class="visualizationModal right-side"
    >
      <PostVisualization
        v-bind="visualizedPost"
      />
    </div>
    </div>
  <div v-if="threadPosts" class="thread">
    <div class="post-sent-container" v-for="post in threadPosts" :key="post.postID">
      <h2>Crée par {{post.userID}} Envoyé par {{ props.UserID }}</h2>
      <Post 
      v-bind="post"
      @post-hovered="postVisualizationToggle"
      @post-not-hovered="postVisualizationToggle"
      />
      <p>Envoyé le {{post.sentDate }}</p>
    </div>
  </div>
  </div>
</template>

<style scoped>

.container {
  width: 85%;
}

.thread {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  background-color:  lightcyan;
}

.post-sent-container{
  width: fit-content;
}

.visualizationModal {
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-side{
  right: 0;
}
</style>
