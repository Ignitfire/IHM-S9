<script setup>
import Garden from '@/components/Garden.vue';
import { useUserStore } from '../stores/allStores';
import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import PanelAndModals from '@/components/nav/PanelAndModals.vue';
import NavBar from '@/components/nav/NavBar.vue';


const route = useRoute();
const store = useUserStore();

const user = ref(null);
const isLocal = ref(null);


watchEffect(async () => {
  const targetUserName = route.params.username;
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
    <NavBar :user="user" :isLocal="isLocal" :isGarden="true" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel" @togglePanel="togglePanel"/>
    <PanelAndModals :user="user" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/>
    <Garden :userID="user.userID"/>
    <div class="modal-container" ref="modalContainerRef"></div>
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