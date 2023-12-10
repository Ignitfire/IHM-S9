

<script setup>
import TinyPost from './post/TinyPost.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
    default: () => ({})
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


</script>

<template>
  <div class="thread-square">

    <TinyPost 
      v-bind="post"
      @post-hovered="postVisualizationToggle"
      @post-not-hovered="postVisualizationToggle"
      />
      <div class="post-info">
      <p v-if="!isMainThread">Envoyé le {{post.sentDate }} par {{ post.senderID }}</p>

      <PostHoverButtons 
        v-if="!isEmpty && hovered"
        :type="'garden'"
        :isLocalUser="isLocalUser"
        :userId="post.userID"
        @deletePost="deletePost"
        @move="movePost"
        @sprinkle="sprinklePost"
        @send="sendPost"
        />
      </div>
  </div>
</template>

<style scoped>

</style>