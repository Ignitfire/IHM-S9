

<script setup>
import TinyPost from './post/TinyPost.vue';
import PostHoverButtons from './post/PostHoverButtons.vue';
import { ref } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  isMainThread: {
    type: Boolean,
    required: true
  }
});



const emit = defineEmits([
  'post-hovered', 
  'post-not-hovered', 
  'send-post', 
]);

const hovered = ref(false);

const toggleVisualization = () => {
  if (!hovered.value) {
    emit('post-hovered', {
      postID: props.post.postID,
    });
  } else {
    emit('post-not-hovered');
  }
  hovered.value = !hovered.value;
};

const sprinklePost = () => {
  console.log('sprinklePost');
};

const sendPost = () => {
  console.log('sendPost');
};

</script>

<template>
  <div class="thread-square"
  >
  <TinyPost 
  @mouseenter="toggleVisualization"
  v-if="!hovered"
  v-bind="post"
  />
  
  <div class="post-info">
    <p v-if="!isMainThread">Envoyé le {{post.sentDate }} par {{ post.senderID }}</p>
  </div>
  
  <PostHoverButtons
  @mouseleave="toggleVisualization"
      v-if="hovered"
      :type="'thread'"
      :userId="post.userID"
      @sprinkle="sprinklePost"
      @send="sendPost"
      />
  </div>
</template>

<style scoped>

.thread-square {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 25vh;
  min-height: 25vh;
}
</style>