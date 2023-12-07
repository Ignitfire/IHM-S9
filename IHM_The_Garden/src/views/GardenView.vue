<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/Post.vue';
import Garden from '@/components/Garden.vue';
import Thread from '@/components/Thread.vue';
import RoutingButton from '@/components/RoutingButton.vue';
import { useUserStore } from '../stores/users';
import ActionButton from '@/components/ActionButton.vue';
import { ref, onMounted } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

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

const isModalOpen = ref(false);
const selectedUser = ref(null);

const openModal = (userID) => {
  selectedUser.value = userID;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null; // Réinitialisez l'utilisateur sélectionné lorsque la modale est fermée
};
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
        <div class="contactContainer">
          <div v-if="isPanelOpen" class="panel">
            <div v-for="userID in User.Following" :key="userID">
              <button @click="openModal(userID)">
                {{ userID }}
              </button>
              <div v-if="isModalOpen && selectedUser.value === userID" class="modal">
                <!-- La modale ne s'ouvre que si l'utilisateur sélectionné correspond à cet ID d'utilisateur -->
                <button @click="closeModal">Fermer</button>
                <button>Autre action</button>
              </div>
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
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.modal{
  position: relative;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.panel{
  position: absolute;
  top: 0;
  left: 15%;
  width: 10rem;
  height: 10rem;
  background-color: white;
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