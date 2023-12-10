<script setup>
import { defineProps, defineEmits } from 'vue';
import { useUserStore } from '@/stores/users';
import RoutingButton from '@/components/nav/RoutingButton.vue';
import ActionButton from '@/components/nav/ActionButton.vue';
import PanelAndModals from '@/components/nav/PanelAndModals.vue';

const props = defineProps({
  User: {
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
          <img v-if="!isLocal || isGarden" class ="avatar" :src="User.AvatarPicture"/>
            <ActionButton type="settings" class="settings"/>
        </div>
        <div class="identity">
          <h1>{{props.User.UserPdeudo}}</h1>
          <h2>{{props.User.UserName}}</h2>
        </div>
          <WaterCounter v-if="isGarden" class="water" :droplets="456"/>
        <div class = "infos">
          <p>Compte crée le {{ User.CreationDate }}</p>
          <p>Arrosé {{ User.TotalWatering }} fois</p>
          <p>suivi par {{ User.TotalFollowers }} personnes</p>
          <p>{{ User.TotalFollowing }} personnes suivs</p>
          <p>a posté {{ User.TotalPosting }} fois</p>
        </div>
      <div class = "mediumButtons">
        <RoutingButton v-if="isGarden" class="medium-button" type="home" size="medium" path="/thread/"/>
        <RoutingButton v-if="!isGarden" class="medium-button" type="home" size="medium" path="/"/>
        <ActionButton class="medium-button" type="contacts" size="medium" action="togglePanel" @togglePanel="togglePanel"/>
      </div>

      <RoutingButton v-if="isGarden" class="big-button" type="thread" size="big" path="/thread/"/>
      <RoutingButton v-if="!isGarden" class="big-button" type="garden" size="big" path="/"/>
      </div>
</template>

<style scoped>

.navbar {
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  position: sticky;
  left:0;
  top:0;
  bottom:0;
  /* Ajoutez vos styles de navbar ici */
}
.highUI {
  width: 100%;
  height: 10%;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
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
}


.identity{
  padding-left: 15px;
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
.mediumButtons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 10vh;
}
.medium-button{
  width: 5vw;
  height: 5vw;
}

h1{
  font-size: 1.5rem;
}
h2{
  font-size: 1.2rem;
}
p{
  font-size: 0.9rem;
}
.big-button{
  position: absolute;
  bottom: 0;
  width: 10vw;
  height: 10vw;
}
</style>