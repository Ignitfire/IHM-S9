<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/allStores.js';
import { computed } from 'vue';

</script>

<template>


  <RouterView />
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
