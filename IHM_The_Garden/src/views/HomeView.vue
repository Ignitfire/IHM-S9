<script setup>
import TimeCounter from '@/components/TimeCounter.vue';
import TheWelcome from '../components/TheWelcome.vue'
import WaterCounter from '@/components/WaterCounter.vue';
</script>

<template>
  <main>
    <TheWelcome />
    <TimeCounter :time="20000"/>
  </main>
</template>
