<script setup>
import TimeCounter from '@/components/post/TimeCounter.vue';
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/post/Post.vue';
import Garden from '@/components/Garden.vue';
import Thread from '@/components/Thread.vue';
import RoutingButton from '@/components/nav/RoutingButton.vue';
import { useUserStore } from '../stores/allStores';
import ActionButton from '@/components/nav/ActionButton.vue';
import { ref, onMounted, VueElement } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/nav/NavBar.vue';

const route = useRoute();
const store = useUserStore();

const user = ref(null);
const isLocal = ref(null);


watchEffect(async () => {
  let targetUserName = route.params.username;
  if (targetUserName) {
    user.value = store.getUserByName(targetUserName);
    isLocal.value = false;
  } else {
    user.value = store.getLocalUser();
    isLocal.value = true;
  }
});

const isPanelOpen = ref(false);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};
</script>

<template>
  <main v-if="user" class="container">
    <NavBar :user="user" :isLocal="isLocal" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/>
    <Thread :userID="user.userID"/>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  position: relative;
}
</style>