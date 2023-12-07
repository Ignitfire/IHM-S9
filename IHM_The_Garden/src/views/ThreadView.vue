<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/Post.vue';
import Garden from '@/components/Garden.vue';
import Thread from '@/components/Thread.vue';
import RoutingButton from '@/components/RoutingButton.vue';
import { useUserStore } from '../stores/users';
import ActionButton from '@/components/ActionButton.vue';
import { ref, onMounted, VueElement } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeUnmount } from 'vue';
import PanelAndModals from '@/components/PanelAndModals.vue';

const route = useRoute();
const store = useUserStore();

const User = ref(null);

watchEffect(async () => {
  const targetUserName = route.params.username;
  if (targetUserName) {
    User.value = store.getUserByName(targetUserName);
  } else {
    User.value = store.getLocalUser();
  }
});

const isPanelOpen = ref(false);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};
</script>

<template>
  <main v-if="User" class="container">
    <div class="navbar">
      <div class="top">

      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/thread/"/>
        <ActionButton type="contacts" size="medium" :action="togglePanel"/>
        <PanelAndModals :User="User" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/>
      </div>
      <RoutingButton type="garden" size="big" path="/"/>
    </div>
    <Thread :UserID="User.UserID"/>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.navbar {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  justify-content: center;
  /* Ajoutez vos styles de navbar ici */
}

.thread {
  width: 85%;
  height: 100%;
  /* Ajoutez vos styles de thread ici */
}

.button1{
  position: absolute;
  bottom: 0;
  margin: 1rem;
}

.mediumButtons{
  display: flex;
  flex-direction: line;
  justify-content: space-around;
  height: 5rem;
}

.top{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 90%;
}
</style>