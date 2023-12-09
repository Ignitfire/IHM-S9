<script setup>
import { onMounted, ref } from 'vue';
import Post from './post/Post.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
    default: null
  },
  location: {
    type: Object,
    required: true
  },
  waterCount: {
    type: Number,
    required: true
  },
  isLocalUser: {
    type: Boolean,
    required: true
  },
});

const isLeftSide = ref(true);
const gridAreaType = ref(null);

onMounted(() => {
  if (props.location.x < 3) {
    isLeftSide.value = true;
  } else {
    isLeftSide.value = false;
  }
  if(props.location.x === 0 || props.location.x === 6) {
    gridAreaType.value = 'dirt';
  } else if (props.location.x === 1 || props.location.x === 5) {
    gridAreaType.value = 'grass';
  } else if (props.location.x === 3 && (props.location.y === 1 || props.location.y === 2)) {
    gridAreaType.value = 'water';
  } else{
    gridAreaType.value = 'forest';
  }
});

const emit = defineEmits([
  'post-hovered', 
  'post-not-hovered', 
  'delete-post', 
  'move-post', 
  'abort-move-post', 
  'send-post', 
  'add-or-moveTo-post'
]);

const hovered = ref(false);

const postVisualizationToggle = () => {
  if (hovered.value){
    emit('post-not-hovered');
    hovered.value = false;
  }else{
    emit('post-hovered', { postID: props.post.postID, isLeftSide: isLeftSide.value });
    hovered.value = true;
  }
};

const quitHover = () => {
  if(props.post !== null){
    postVisualizationToggle();
  }else{
    hovered.value = false;
  }
};

const enterHover = () => {
  if(props.post === null){
    hovered.value = true;
  }
};

const deletePost = () => {
  emit('delete-post', { postID: props.post.postID });
};


const postIsMoving = ref(false);

const movePost = () => {
  if (postIsMoving.value){
    postIsMoving.value = false;
    emit('abort-move-post');
  } else{
    emit('move-post', { postID: props.post.postID });
  }
};

const sprinklePost = () => {
  emit('sprinkle-post', { postID: props.post.postID });
};

const sendPost = () => {
  emit('send-post', { postID: props.post.postID });
};

const addOrMoveToPost = () => {
  emit('add-or-moveTo-post', { postID: props.post?.postID });
};



</script>



<template>
    <div :class="['square', gridAreaType]">
      <div class="square-content"
        @mouseleave="quitHover"
        @mouseenter="enterHover"
      >
        <Post
        v-if="post !== null"
        v-bind="post"
        @post-hovered="postVisualizationToggle"
        />
        <PostHoverButtons 
        v-if="hovered"
        :isLocalUser="isLocalUser"
        @delete="deletePost"
        @move="movePost"
        @sprinkle="sprinklePost"
        @send="sendPost"
        />
        <HoverOnEmptySquare
        v-if="post === null && hovered"
        :waterCount="waterCount"
        :isLocalUser="isLocalUser"
        @add-or-moveTo="addOrMoveToPost"
        />
      </div>
    </div>
</template>



<style scoped>

.dirt{
  background-color: rgb(118, 99, 32);
}

.grass{
  background-color: rgb(141, 214, 115);
}

.forest{
  background-color: rgb(32, 118, 41);
}

.water{
  background-color: rgb(43, 94, 142);
}
</style>