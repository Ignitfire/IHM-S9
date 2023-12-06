<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import TheWelcome from '../components/TheWelcome.vue'
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/Post.vue';
import Garden from '@/components/Garden.vue';
import RoutingButton from '@/components/RoutingButton.vue';
import Thread from '@/components/Thread.vue';
</script>

<template>
  <main class="container">
    <!-- <TheWelcome /> -->
    <!-- <Post :timeLeft="86400" :droplets="10" :content="`I'm a post`" :creationDate="`2021-10-10`" :totalWatering="10"/> -->
    <!-- <TimeCounter :time="86400"/> -->
    <!-- <Garden :UserID="1"/> -->
    <div class="navbar">    
      <RoutingButton :path="'/'"/>
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
  width: 10%;
  height: 100%;
  /* Ajoutez vos styles de navbar ici */
}

.thread {
  width: 90%;
  height: 100%;
  /* Ajoutez vos styles de thread ici */
}
</style>