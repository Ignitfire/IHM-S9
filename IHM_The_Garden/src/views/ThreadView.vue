<script setup>
import Thread from '@/components/Thread.vue';
import { useUserStore } from '../stores/allStores';
import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/nav/NavBar.vue';
import PanelAndModals from '@/components/nav/PanelAndModals.vue';

const route = useRoute();
const store = useUserStore();

const user = ref(null);
const isLocal = ref(null);


watchEffect(async () => {
  let targetUserID = route.params.userID;
  if (targetUserID) {
    user.value = store.getUserByName(targetUserID);
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
  <main v-if="user" class="main-container">
    <NavBar :user="user" :isLocal="isLocal" :isGarden="false" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel" @togglePanel="togglePanel"/>
    <PanelAndModals :user="user" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/>
    <Thread :userID="user.userID"/>
    <div class="modal-container" ref="modalContainerRef"></div>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  position: relative;
}
</style>