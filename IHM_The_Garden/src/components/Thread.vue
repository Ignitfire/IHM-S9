<script setup>
import { onMounted, onUpdated, ref, watchEffect } from 'vue';
import { useThreadStore, usePostStore, useUserStore } from '../stores/allStores';
import PostVisualization from './post/PostVisualization.vue';
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreadSquare from './ThreadSquare.vue';

const props = defineProps({
  userID: {
    type: Number,
    required: true
  }
});

const threadstore = useThreadStore();
const postStore = usePostStore();
const userStore = useUserStore();

const threadPosts = ref(null);
const localUser = userStore.getLocalUser();
const isMainThread = ref(null);

watchEffect(() => {
  if(props.userID == localUser.userID){
    isMainThread.value = true;
  }
  else{
    isMainThread.value = false;
  }
  if (!isMainThread.value) {
    // Si UserID est spécifié, threadPosts est égal aux posts présents dans threads
    const threads = threadstore.getThread(localUser.userID, props.userID).sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
    threadPosts.value = threads.map(thread => {
      const post = postStore.getPostByID(thread.postID);
      post.sentDate = thread.sentDate; // Ajoutez la sentDate au post
      console.log("sentDate: ", post.sentDate);
      post.senderID = thread.senderID; // Ajoutez le SenderID au post 
      console.log("senderID: ", post.senderID);
      return post;
    });
  } else {
    // Si userID n'est pas spécifié, threadPosts est égal aux posts présents dans les utilisateurs correspondant aux ID de following
    const following = userStore.getFollowingByID(props.userID);
    const posts = [];
    for (const userID of following) {
      posts.push(...postStore.getPostsByUser(userID));
    }
    // Trie les posts par date de création
    posts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    threadPosts.value = posts;
  }
});

const visualizedPost = ref(null);

const postsIds = ref([]);

const postVisualizationToggle = (payload) => {
  if(visualizedPost.value === null){
    visualizedPost.value = postStore.getPostByID(payload.postID);
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
        x: (-parentWidth * 0.7)+post.offsetWidth/2,
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
  <div class="thread-container">
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
      <ThreadSquare
      :post="post"
      :isMainThread="isMainThread"
      @post-hovered="postVisualizationToggle"
      @post-not-hovered="postVisualizationToggle"
      />
    </div>
  </div>
  </div>
</template>

<style scoped>

.thread-container {
  width: 85vw;
}
.post-info{
  display: flex;
  flex-direction: column;
  justify-content: center ;
  align-items: center;
  gap: 0.5rem;
}

.thread {
  display: flex;
  flex-direction: column; 
  align-items: end;
  padding-right: 20%;
  gap: 1rem;
  width: 100%;
  min-height: 100vh;
  background-color:  lightcyan;
}

.post-sent-container{
  width: fit-content;
  display: flex;
  flex-direction: row;
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
