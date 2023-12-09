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
  'post-hovered', 
]);

const enzoHandler = () => {
  console.log('señoritas');
};

const targetUserName = props.isLocal



</script>


<template>
  <div class="navbar">
      <div class="top">
        <div class="highUI">
          <h1 v-if="!targetUserName" class="threadTitle">Fil Principal</h1>

          <img v-if="targetUserName" class ="avatar" :src="User.AvatarPicture"/>
          <ActionButton type="settings" class="settings" size="small"/>
        </div>
        <div class="identity">
          <h1>{{props.User.UserPdeudo}}</h1>
          <h2>{{props.User.UserName}}</h2>
        </div>
      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/thread/"/>
        <ActionButton type="contacts" size="medium" action="enzo" @enzo="enzoHandler"/>
        <!-- <PanelAndModals :User="User" :isPanelOpen="isPanelOpen" :togglePanel="togglePanel"/> -->
      </div>
      <RoutingButton type="garden" size="big" path="/"/>
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
.avatar{
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
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
.mediumButtons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 5rem;
}

</style>