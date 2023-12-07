<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/Post.vue';
import Garden from '@/components/Garden.vue';
import RoutingButton from '@/components/RoutingButton.vue';
import Thread from '@/components/Thread.vue';
</script>

<template>
  <main class="container">
    <div class="navbar">
      <div class="top">

      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/thread/"/>
      </div>
      <RoutingButton type="garden" size="big" path="/"/>
    </div>
    <Thread :UserID="1" :RecipientID="2"/>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.navbar {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  justify-content: center;
  /* Ajoutez vos styles de navbar ici */
}

.thread {
  width: 85%;
  height: 100%;
  /* Ajoutez vos styles de thread ici */
}

.button1{
  position: absolute;
  bottom: 0;
  margin: 1rem;
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
</style>