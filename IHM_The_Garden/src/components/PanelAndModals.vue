<template>
    <div>
      <div v-if="isPanelOpen" class="panel" ref="panelRef">
        <div v-for="userID in User.Following" :key="userID" class="user-button">
          <button @click="openModal(userID)">
            {{ userID }}
          </button>
          <div v-if="isModalOpen[userID]" class="modal" :ref="el => { if (el) modalRefs[userID] = el }">
            <RoutingButton type="thread" size="small" :path="'/thread/User' + userID" @click="closeModalAndPanel(userID)"/>
            <RoutingButton type="garden" size="small" :path="'/garden/User' + userID" @click="closeModalAndPanel(userID)"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import RoutingButton from '@/components/RoutingButton.vue';
  
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
          if (props.isModalOpen.value[userID] && !modal.contains(mouseup)) {
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
  
      return {
        modalRefs,
        panelRef,
        isModalOpen,
        openModal,
        closeModal,
        closeModalAndPanel
      };
    }
  };
  </script>

<style scoped>
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

.user-button {
  position: relative;
}
</style>
  