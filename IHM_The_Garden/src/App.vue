<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/users';

const store = useUserStore();
const localUser = store.getLocalUser();
console.log(localUser);
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
