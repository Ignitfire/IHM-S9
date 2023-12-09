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
import PanelAndModals from '@/components/PanelAndModals.vue';

const route = useRoute();
const store = useUserStore();

const User = ref(null);
let targetUserName = ref(null);


watchEffect(async () => {
  targetUserName = route.params.userID;
  if (targetUserName) {
    User.value = store.getUserByID(targetUserName);
  } else {
    User.value = store.getLocalUser();
  }
});

const isPanelOpen = ref(false);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};
</script>

<template>
  <main v-if="User" class="container">
    <div class="navbar">
      <div class="top">
        <div class="highUI">
          <h1 v-if="!targetUserName" class="threadTitle">Fil Principal</h1>

          <img v-if="targetUserName" class ="avatar" :src="User.AvatarPicture"/>
          <ActionButton type="settings" class="settings" size="small"/>
        </div>
        <div class="identity">
          <h1>{{User.UserPdeudo}}</h1>
          <h2>{{User.UserName}}</h2>
        </div>
      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/thread/"/>
        <ActionButton type="contacts" size="medium" :action="togglePanel"/>
        <!-- <PanelAndModals :User="User" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/> -->
      </div>
      <RoutingButton type="garden" size="big" path="/"/>
    </div>
    <Thread :UserID="User.UserID"/>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  position: relative;
}

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


.mediumButtons{
  display: flex;
  flex-direction: row;
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

.threadTitle{
  position: absolute;
  top: 0.5rem;
  margin: 0;
  width: 5rem;
}

.settings{
  position: absolute;
  top: 0;
  left: 10vw;
  margin: 0.5rem;
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

.identity{
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
}

</style>