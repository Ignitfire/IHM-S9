<script setup>
import TimeCounter from '@/components/post/TimeCounter.vue';
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/post/Post.vue';
import Garden from '@/components/Garden.vue';
import Thread from '@/components/Thread.vue';
import RoutingButton from '@/components/nav/RoutingButton.vue';
import { useUserStore } from '../stores/users';
import ActionButton from '@/components/nav/ActionButton.vue';
import { ref, onMounted, VueElement } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeUnmount } from 'vue';
import PanelAndModals from '@/components/nav/PanelAndModals.vue';
import NavBar from '@/components/nav/NavBar.vue';


const route = useRoute();
const store = useUserStore();

const User = ref(null);
const isLocal = ref(null);


watchEffect(async () => {
  const targetUserName = route.params.username;
  if (targetUserName) {
    User.value = store.getUserByName(targetUserName);
    isLocal.value = false;
  } else {
    User.value = store.getLocalUser();
    isLocal.value = true;
  }
});

const isPanelOpen = ref(false);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

</script>

<template>
  <main v-if="User" class="container">
    <NavBar :User="User" :isLocal="isLocal" :isGarden="true" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel" @togglePanel="togglePanel"/>
    <PanelAndModals :User="User" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/>
    <Garden :UserID="User.UserID"/>
    </main>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
}
</style>