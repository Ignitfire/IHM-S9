<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import TheWelcome from '../components/TheWelcome.vue'
import WaterCounter from '@/components/WaterCounter.vue';
import Post from '@/components/Post.vue';
</script>

<template>
  <main>
    <TheWelcome />
    <Post :timeLeft="86400" :droplets="10" :content="`I'm a post`" :creationDate="`2021-10-10`" :totalWatering="10"/>
    <!-- <TimeCounter :time="86400"/> -->
  </main>
</template>
