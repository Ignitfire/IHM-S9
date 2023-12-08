<script setup>
import { onMounted, ref, watchEffect } from 'vue';
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
const isLeftSide = ref(null);

const postVisualizationToggle = (payload) => {
  if(visualizedPost.value === null){
    isLeftSide.value = payload.isLeftSide;
    visualizedPost.value = PostStore.getPostByID(payload.postID);
  }else{
    visualizedPost.value = null;
  }
};

const toggleSide = () => {
  isLeftSide.value = !isLeftSide.value;
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const tlRightLeft = gsap.timeline({
    scrollTrigger: {
      trigger: ".post-sent-container",
      start: "top 100%",
      end: "bottom 0%",
      scrub: true
    },
  });

  tlRightLeft.from(".post-sent-container", {
    x: "100%"
  })
    .to(".post-sent-container", {
      x: "40%",
      onComplete: toggleSide
    })
    .to(".post-sent-container", {
      x: "0%"
    });

  const tlLeftRight = gsap.timeline({
    scrollTrigger: {
      trigger: ".post-sent-container",
      start: "top 100%",
      end: "bottom 0%",
      scrub: true,
    },
  });

  tlLeftRight.to(".post-sent-container", {
    x: "40%",
    onComplete: toggleSide
  })
    .to(".post-sent-container", {
      x: "100%"
    });
    
});
</script>

<template>
  <div v-if="threadPosts" class="thread">
    <div id="visualization">
      <div 
      v-if="visualizedPost !== null && !isLeftSide"
      class="visualizationModal left-side"
    >
      <PostVisualization
        v-bind="visualizedPost"
      />
    </div>
    <div 
      v-if="visualizedPost !== null && isLeftSide"
      class="visualizationModal right-side"
    >
      <PostVisualization
        v-bind="visualizedPost"
      />
    </div>
    </div>
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

.visualizationModal {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-side{
  left: 0;
}

.right-side{
  right: 0;
}
</style>
