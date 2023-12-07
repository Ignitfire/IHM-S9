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
const modalClass = ref(null);

const postVisualizationToggle = (payload) => {
  console.log("handled");
  if(visualizedPost.value === null){
    modalClass.value = payload.isLeftSide ? 'left-side visualizationModal' : 'right-side visualizationModal';
    visualizedPost.value = store.getPostByID(payload.postID);
  }else{
    visualizedPost.value = null;
  }
};


</script>

<template>
  <div class="garden">
    <div 
    v-if="visualizedPost !== null"
    :class="modalClass.value"
    >
      <PostVisualization
    v-bind="visualizedPost"
    />
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
  position: absolute;
  top: 0;
  bottom: 0;
  width: 35%;
  height: 100%;
}

.left-side{
  left: 0;
}

.right-side{
  right: 0;
}

</style>
