<script setup>
import { useGardenStore, usePostStore, useUserStore } from '../stores/allStores.js';
import { ref, defineProps } from 'vue';
import PostVisualization from './post/PostVisualization.vue';
import GardenSquare from './GardenSquare.vue';


const props = defineProps({
  userID: {
    type: Number,
    required: true
  }
});
const postStore = usePostStore();

const visualizedPost = ref(null);
const isLeftSide = ref(null);

const postVisualizationToggle = (payload) => {
  if(visualizedPost.value === null){
    isLeftSide.value = payload.isLeftSide;
    const post = postStore.getPostByID(payload.postID);
    const { postID, totalWatering, creationDate, content } = post;
    visualizedPost.value = {
      postID,
      totalWatering,
      creationDate,
      content,
      gridAreaType: payload.gridAreaType,
      locationWaterCount: payload.locationWaterCount,
      userID: props.userID
    };
  }else{
    visualizedPost.value = null;
  }
};


const squares = ref([]);
const gardenGrid = useGardenStore().getGardenByUser(props.userID).grid;
let idx = 0;
for (let x = 0; x < 7; x++) {
  for (let y = 0; y < 4; y++) {
    const square = gardenGrid[x][y];
    const post = square.postID === null ? {}: postStore.getPostByID(square.postID);
    squares.value.push({
      idx: idx,
      location: {x, y},
      post: post,
      waterCount: square.waterCount
    });
    idx++;
  }
}

const isLocalUser = ref(false);
if(useUserStore().localUserID === props.userID){
  isLocalUser.value = true;
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
    <GardenSquare
      v-for="square in squares"
      :key="square.idx"
      :post="square.post"
      :location="square.location"
      :waterCount="square.waterCount"
      :isLocalUser="isLocalUser"
      :style="{ gridArea: `${square.location.y + 1} / ${square.location.x + 1}` }"
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
  width: 85%;
  max-width: 85%;
  height: 100vh;
  max-height: 100vh;
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
