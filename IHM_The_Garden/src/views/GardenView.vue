<script setup>
import Garden from '@/components/Garden.vue';
import { useUserStore } from '../stores/allStores';
import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';



const route = useRoute();
const store = useUserStore();

const user = ref(null);

watchEffect(async () => {
  const targetUserName = route.params.username;
  if (targetUserName) {
    user.value = store.getUserByName(targetUserName);
  } else {
    user.value = store.getLocalUser();
  }
});

const isPanelOpen = ref(false);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

</script>

<template>
  <main v-if="user" class="container">
    <div class="navbar">
      <div class="top">
        <div class="highUI">
          <img class ="avatar" :src="user.AvatarPicture"/>
          <ActionButton type="settings" size="small"/>
        </div>
        <div class="identity">
          <h1>{{user.userPdeudo}}</h1>
          <h2>{{user.userName}}</h2>
        </div>
        <div class="lowUI">
          <WaterCounter :droplets="456"/>
        </div>
        <div class = "infos">
          <p>Compte crée le {{ user.CreationDate }}</p>
          <p>Arrosé {{ user.TotalWatering }} fois</p>
          <p>suivi par {{ user.TotalFollowers }} personnes</p>
          <p>{{ user.TotalFollowing }} personnes suivs</p>
          <p>a posté {{ user.TotalPosting }} fois</p>
        </div>
      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/"/>
        <ActionButton type="contacts" size="medium" :action="togglePanel"/>
        <PanelAndModals :user="user" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/>
     </div>
      <RoutingButton type="thread" size="big" path="/thread/"/>
    </div>
    <Garden :userID="user.userID"/>
    </main>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
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
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
}

.lowUI{
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 2rem;
}

.highUI{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
}

.infos{
  border-radius: 10px;
  background-color: lightgoldenrodyellow;
  padding-left: 0.5rem;
  margin: 1rem;
}
</style>