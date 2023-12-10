<script setup>
import { defineProps, defineEmits } from 'vue';
import { useUserStore } from '@/stores/allStores';
import RoutingButton from '@/components/nav/RoutingButton.vue';
import ActionButton from '@/components/nav/ActionButton.vue';
import PanelAndModals from '@/components/nav/PanelAndModals.vue';
import WaterCounter from '@/components/WaterCounter.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  isLocal: {
    type: Boolean,
    required: true
  },
  isGarden: {
    type: Boolean,
    required: true
  },
  isPanelOpen: {
    type: Boolean,
    required: true
  },
  togglePanel: {
    type: Function,
    required: true
  }
});

const emit = defineEmits([
  'togglePanel', 
]);

const togglePanel = () => {
  emit('togglePanel');
};

</script>


<template>
  <div class="navbar">
        <div class="highUI">
          <h1 v-if="isLocal && !isGarden" class="threadTitle">Fil Principal</h1>
          <img v-if="!isLocal || isGarden" class ="avatar" :src="user.avatarPicture"/>
            <ActionButton class="settings" :action="'settings'"/>
        </div>
        <div class="identity">
          <h1>{{props.user.userPdeudo}}</h1>
          <h2>{{props.user.userName}}</h2>
        </div>
          <WaterCounter v-if="isGarden" class="water" :droplets="456"/>
        <div v-if="isGarden" class = "infos">
          <p>Compte crée le {{ user.creationDate }}</p>
          <p>Arrosé {{ user.totalWatering }} fois</p>
          <p>suivi par {{ user.totalFollowers }} personnes</p>
          <p>{{ user.totalFollowing }} personnes suivs</p>
          <p>a posté {{ user.totalPosting }} fois</p>
        </div>
        <div class="nav-buttons">
      <div class = "mediumButtons">
        <RoutingButton v-if="isGarden" class="medium-button" type="home" size="medium" path="/"/>
        <RoutingButton v-if="!isGarden" class="medium-button" type="home" size="medium" path="/thread/"/>
        <ActionButton class="medium-button" size="medium" :action="'contacts'" @contacts="togglePanel"/>
      </div>

      <RoutingButton v-if="isGarden" class="big-button" type="thread" size="big" path="/thread/"/>
      <RoutingButton v-if="!isGarden" class="big-button" type="garden" size="big" path="/"/>
      </div>
      </div>
</template>

<style scoped>

.navbar {
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  background-color: transparent;
  justify-content: space-between; /* Distribue uniformément l'espace entre les éléments */
  align-items: center; /* Centre les éléments horizontalement */
  position: sticky;
  left:0;
  top:0;
  bottom:0;
  padding: 2vh;
}


.highUI {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.avatar{
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
}

.settings{
  position: absolute;
  top: 0;
  left: 10vw;
  margin: 0.5rem;
  height: 5vh;
  width: 7vh;
}


.identity{
  padding-left: 15px;
  width: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
}
.threadTitle{
  position: absolute;
  top: 0.5rem;
  margin: 0;
  width: 5rem;
}
.top{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 90%;
}
.water{
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 2rem;
}
.infos{
  border-radius: 10px;
  background-color: lightgoldenrodyellow;
  padding-left: 0.5rem;
  margin: 1rem;
}

.nav-buttons{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30vh;
}
.mediumButtons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 6vh;
  width: 10vw;
  margin: 0.5vw 0;
}
.medium-button{
  width: 4vw;
  height: 4vw;
  margin: 0.5vw;
}

h1{
  font-size: 1.35rem;
}
h2{
  font-size: 1.08rem;
}
p{
  font-size: 0.81rem;
}
.big-button{
  width: 7vw;
  height: 7vw;
}
</style>