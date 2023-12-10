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
      <div class="top">
        <div class="highUI">
          <h1 v-if="isLocal && !isGarden" class="threadTitle">Fil Principal</h1>

          <img v-if="!isLocal || isGarden" class ="avatar" :src="User.AvatarPicture"/>
          <ActionButton type="settings" class="settings" size="small"/>
        </div>
        <div class="identity">
          <h1>{{props.User.UserPdeudo}}</h1>
          <h2>{{props.User.UserName}}</h2>
        </div>
        <div v-if="isGarden" class="lowUI">
        <div class="water">
          <WaterCounter :droplets="456"/>
        </div>
        <div class = "infos">
          <p>Compte crée le {{ User.CreationDate }}</p>
          <p>Arrosé {{ User.TotalWatering }} fois</p>
          <p>suivi par {{ User.TotalFollowers }} personnes</p>
          <p>{{ User.TotalFollowing }} personnes suivs</p>
          <p>a posté {{ User.TotalPosting }} fois</p>
        </div>
        </div>
      </div>
      <div class = "mediumButtons">
        <RoutingButton v-if="isGarden" type="home" size="medium" path="/thread/"/>
        <RoutingButton v-if="!isGarden" type="home" size="medium" path="/"/>

        <ActionButton type="contacts" size="medium" action="togglePanel" @togglePanel="togglePanel"/>
      </div>
      <RoutingButton v-if="isGarden" type="thread" size="big" path="/thread/"/>
      <RoutingButton v-if="!isGarden" type="garden" size="big" path="/"/>
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
  position: sticky;
  left:0;
  top:0;
  bottom:0;
  /* Ajoutez vos styles de navbar ici */
}
.highUI {
  position: absolute;
  width: 15%;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
}

.avatar{
  width: 7rem;
  height: 7rem;
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
.mediumButtons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 5rem;
}
.infos{
  border-radius: 10px;
  background-color: lightgoldenrodyellow;
  padding-left: 0.5rem;
  margin: 1rem;
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
</style>