<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/Post.vue';
import Garden from '@/components/Garden.vue';
import Thread from '@/components/Thread.vue';
import RoutingButton from '@/components/RoutingButton.vue';
</script>

<template>
  <main class="container">
    <div class="navbar">
      <div class="top">

      </div>
      <div class = "mediumButtons">
        <RoutingButton type="home" size="medium" path="/"/>
        <RoutingButton type="garden" size="medium" path="/thread/"/>
      </div>
      <RoutingButton type="thread" size="big" path="/thread/"/>
    </div>
    <Garden :UserID="1"/>
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
</style>