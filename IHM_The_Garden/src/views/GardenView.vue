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

const modalRefs = ref({});
const panelRef = ref(null);


const isModalOpen = ref({}); // Faites de isModalOpen un objet

const openModal = (userID) => {
  // Fermez toutes les autres modales
  Object.keys(isModalOpen.value).forEach(id => {
    if (id !== userID) {
      isModalOpen.value[id] = false;
    }
  });

  // Ouvrez la nouvelle modale
  isModalOpen.value[userID] = true;
};

const closeModal = (userID) => {
  isModalOpen.value[userID] = false;
};

const closeModalAndPanel = (userID) => {
  closeModal(userID);
  togglePanel();
};

let mousedown = null;

// Définir les fonctions de rappel
const handleMousedown = (event) => {
  mousedown = event.target;
};

const handleMouseup = (event) => {
  let mouseup = event.target;

  // Fermer la modale si le clic est en dehors
  Object.keys(modalRefs.value).forEach((userID) => {
    let modal = modalRefs.value[userID];
    if (isModalOpen.value[userID] && !modal.contains(mouseup)) {
      closeModal(userID);
    }
  });

  // Fermer le panneau si le clic est en dehors et aucune modale n'est ouverte
  let isAnyModalOpen = Object.values(isModalOpen.value).some(open => open);
  if (!isAnyModalOpen && isPanelOpen.value && !panelRef.value.contains(mouseup)) {
    togglePanel();
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleMousedown);
  document.addEventListener('mouseup', handleMouseup);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleMousedown);
  document.removeEventListener('mouseup', handleMouseup);
});


</script>

<template>
  <main v-if="User" class="container">
    <div class="navbar">
      <div class="top">
        <div class="highUI">
          <img class ="avatar" :src="User.AvatarPicture"/>
          <ActionButton type="settings" size="small"/>
        </div>
        <div class="identity">
          <h1>{{User.UserPdeudo}}</h1>
          <h2>{{User.UserName}}</h2>
        </div>
        <div class="lowUI">
          <WaterCounter :droplets="456"/>
        </div>
        <div class = "infos">
          <p>{{ User.CreationDate }}</p>
          <p>{{ User.TotalWatering }}</p>
          <p>{{ User.TotalFollowers }}</p>
          <p>{{ User.TotalFollowing }}</p>
          <p>{{ User.TotalPosting }}</p>
        </div>
      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/"/>
        <ActionButton type="contacts" size="medium" :action="togglePanel"/>
          <div v-if="isPanelOpen" class="panel" ref="panelRef">
            <div v-for="userID in User.Following" :key="userID" class="user-button">
              <button @click="openModal(userID)">
                {{ userID }}
              </button>
              <div v-if="isModalOpen[userID]" class="modal" :ref="el => { if (el) modalRefs[userID] = el }">                <!-- La modale ne s'ouvre que si l'utilisateur sélectionné correspond à cet ID d'utilisateur -->
                <RoutingButton type="thread" size="small" :path="'/thread/User' + userID" @click="closeModalAndPanel(userID)"/>
                <RoutingButton type="garden" size="small" :path="'/garden/User' + userID" @click="closeModalAndPanel(userID)"/>
              </div>
            </div>
        </div>

      </div>
      <RoutingButton type="thread" size="big" path="/thread/"/>
    </div>
    <Garden :UserID="User.UserID"/>  
    </main>
</template>

<style scoped>

.contactContainer{
  position: fixed;
  top:0;
  left: 15%;
  z-index: 1;
  opacity: 1;
  background-color: rosybrown;
  height: 100vh;
  width: 20rem;
}

.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.user-button {
  position: relative;
}

.modal {
  position: absolute;
  display: flex;
  flex-direction: row;
  top : -0.1rem;
  right: -50px; /* Positionne la modale à 50px à droite du bouton */
  background-color:bisque;
  /* autres styles */
}
.panel{
  position: absolute;
  top: 0;
  left: 15%;
  width: 10rem;
  height: 10rem;
  background-color: white;
  opacity: 1;
  z-index: 1;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.navbar {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  justify-content: center;

  /* Ajoutez vos styles de navbar ici */
}

.garden {
  width: 85%;
  height: 100%;
  /* Ajoutez vos styles de thread ici */
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

.avatar{
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.highUI{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
}
</style>