<script setup>
import { ref } from 'vue';

const props = defineProps({
  following: Array,
  togglePanel: Function,
});

const isPanelOpen = ref(false);
const isModalOpen = ref(false);
const selectedUser = ref(null);

const openPanel = () => {
  togglePanel();
};

const openModal = (userID) => {
  selectedUser.value = userID;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div>
    <div v-if="isPanelOpen" class="panel">
      <div v-for="userID in following" :key="userID">
        <button @click="openModal(userID)">
          {{ userID }}
        </button>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal">
      <button @click="closeModal">Fermer</button>
      <button>Autre action</button>
    </div>
  </div>
</template>

<style scoped>
/* Vos styles ici */
</style>
