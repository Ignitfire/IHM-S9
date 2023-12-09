<script setup>
import { usePostStore } from '../stores/posts';
import Post from './Post.vue';
import { computed, ref } from 'vue';
import PostVisualization from './PostVisualization.vue';


const props = defineProps({
  UserID: {
    type: Number,
    required: true
  }
});

const store = usePostStore();
const userPosts = computed(() => store.getPostsByUser(props.UserID));

const visualizedPost = ref(null);
const isLeftSide = ref(null);

const postVisualizationToggle = (payload) => {
  if(visualizedPost.value === null){
    isLeftSide.value = payload.isLeftSide;
    visualizedPost.value = store.getPostByID(payload.postID);
  }else{
    visualizedPost.value = null;
  }
};

const getPostForLocation(x, y){
  
}


</script>

<template>
  <div class="garden">
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
    <Post
      v-for="post in userPosts"
      :key="post.postID"
      v-bind="post"
      :style="{ gridArea: `${post.location.y + 1} / ${post.location.x + 1}` }"
      @post-hovered="postVisualizationToggle"
      @post-not-hovered="postVisualizationToggle"
    />
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
  position: relative;
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

.left-side{
  left: 15vw;
}

.right-side{
  right: 0;
}

</style>
