

<script setup>
import { ref } from 'vue';
import ActionButton from '../nav/ActionButton.vue';
import RoutingButton from '../nav/RoutingButton.vue';


const props = defineProps({
  type: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: false
  },
  isLocalUser: {
    type: Boolean,
    required: false
  },
});

const authorized = ref({
  delete: props.type === 'garden' && props.isLocalUser,
  move: props.type === 'garden' && props.isLocalUser,
  goToGarden: props.type === 'thread'
});

const emit = defineEmits([
  'send', 
  'deletePost', 
  'move', 
  'sprinkle'
]);


const send = () => {
  emit('send');
};

const deletePost = () => {
  emit('deletePost');
};

const move = () => {
  emit('move');
};

const sprinkle = () => {
  emit('sprinkle');
};


</script>

<template>
  <div class="buttons-grid">
    <!-- haut gauche -->
    <div 
    class="grid-content"
    v-if="authorized.move" 
    >
      <ActionButton 
      @move="move" 
      :action="'move'"
    />
    </div>
    
    <!-- haut droite -->
    <div 
    class="grid-content"
    v-if="authorized.move"
    >
      <ActionButton 
      @sprinkle="sprinkle" 
      :action="'sprinkle'"
     />
    </div>

    <!-- haut centré -->
    <div 
    class="grid-content centered"
    v-if="!authorized.move"
    >
      <ActionButton 
      @sprinkle="sprinkle" 
      :action="'sprinkle'"
     />
    </div>
    <!-- bas gauche -->
    <div 
    class="grid-content"
    v-if="authorized.goToGarden"
    >
      <RoutingButton 
      :type="'garden'"
      :path="'/garden/' + userId"
    />
    </div>
    <div 
    class="grid-content"
    v-if="authorized.delete"
    >
      <ActionButton 
      @deletePost="deletePost" 
      :action="'deletePost'"
    />
    </div>

    <!-- bas droite -->
    <div 
    class="grid-content"
    v-if="authorized.delete || authorized.goToGarden"
    >
      <ActionButton 
      @send="send" 
      :action="'send'"
    />
    </div>

    <!-- bas centré -->
    <div 
    class="grid-content centered"
    v-if="!authorized.delete && !authorized.goToGarden"
    >
      <ActionButton 
      @send="send" 
      :action="'send'"
      />
    </div>
  </div>
</template>



<style scoped>

.buttons-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
  padding: 10%;
}

.grid-content{
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid-content > * {
  width: 100%;
  height: 100%;
}

.centered{
  grid-column: span 2;
  width: 100%;
}


</style>