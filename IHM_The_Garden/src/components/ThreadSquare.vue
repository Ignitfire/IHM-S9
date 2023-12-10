

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

const postVisualizationToggle = () => {
  hovered.value = !hovered.value;
  if (hovered.value) {
    emit('post-hovered', {
      postID: props.post.postID,
    });
  } else {
    emit('post-not-hovered');
  }
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
  @mouseleave="postVisualizationToggle"
  @mouseenter="postVisualizationToggle"
  >

    <TinyPost 
    v-if="!hovered"
      v-bind="post"
      />
      <div class="post-info">
      <p v-if="!isMainThread">Envoyé le {{post.sentDate }} par {{ post.senderID }}</p>
    </div>

      <PostHoverButtons
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
  min-width: 25vh;
  min-height: 25vh;
}
</style>