<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import RoutingButton from '@/components/nav/RoutingButton.vue';
import { useUserStore } from '@/stores/allStores';
  
export default {
  components: {
    RoutingButton
  },
  props: ['User', 'isPanelOpen', 'togglePanel'],
  setup(props) {
    const modalRefs = ref({});
    const panelRef = ref(null);
    const isModalOpen = ref({});
  
    const openModal = (userID) => {
      Object.keys(isModalOpen.value).forEach(id => {
        if (id !== userID) {
          isModalOpen.value[id] = false;
        }
      });
      isModalOpen.value[userID] = true;
    };
  
    const closeModal = (userID) => {
      isModalOpen.value[userID] = false;
    };
  
    const closeModalAndPanel = (userID) => {
      closeModal(userID);
      props.togglePanel();
    };
  
    let mousedown = null;
  
    const handleMousedown = (event) => {
      mousedown = event.target;
    };
  
    const handleMouseup = (event) => {
      let mouseup = event.target;
  
      Object.keys(modalRefs.value).forEach((userID) => {
        let modal = modalRefs.value[userID];
        if (isModalOpen.value[userID] && !modal.contains(mouseup)) {
          closeModal(userID);
        }
      });
  
      let isAnyModalOpen = Object.values(isModalOpen.value).some(open => open);
      if (!isAnyModalOpen && props.isPanelOpen.value && !panelRef.value.contains(mouseup)) {
        props.togglePanel();
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

    const userStore = useUserStore();

    const getUserById = (id) => {
      const user = userStore.getUserById(id); // Utilisez la fonction appropriée de votre userStore pour obtenir l'utilisateur par son ID
      return user ? user.name : 'Utilisateur non trouvé'; // Retourne le nom de l'utilisateur si trouvé, sinon retourne 'Utilisateur non trouvé'
    };
  
    return {
      modalRefs,
      panelRef,
      isModalOpen,
      openModal,
      closeModal,
      closeModalAndPanel,
      getUserById
    };
  }
};
</script>

<template>
    <div v-if="isPanelOpen" class="panel" ref="panelRef">
      <div v-for="userID in user.following" :key="userID" class="user">
        <button class="user-button" @click="openModal(userID)">
          User{{ userID }}
        </button>
        <div v-if="isModalOpen[userID]" class="modal" :ref="el => { if (el) modalRefs[userID] = el }">
          <RoutingButton class="modal-button" type="thread" :path="'/thread/User' + userID" @click="closeModalAndPanel(userID)"/>
          <RoutingButton class="modal-button" type="garden" :path="'/garden/User' + userID" @click="closeModalAndPanel(userID)"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  left: +27vw  ; /* Positionne la modale à 50px à droite du bouton */
  background-color:bisque;
  height: 10vh;
  width: 8vw;
  /* autres styles */
}
.panel{
  position: fixed;
  top: 0;
  left: 15vw;
  width: auto;
  max-height: 100vh;
  overflow-y: auto; 
  /* overflow-x: hidden; */
  background-color: white;
  opacity: 1;
  z-index: 2;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.user{
  position: relative;
  display: flex;
  flex-direction: row;
}

.user-button {
  position: relative;
  height: 10vh;
  width: 10vw;
}

.modal-button{
  width: 100%;
  margin:5%;
  height:80%;
}
</style>
  