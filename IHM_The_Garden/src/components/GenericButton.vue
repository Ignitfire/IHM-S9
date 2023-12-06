<script setup>

const props = defineProps({
  iconName: String,
  buttonWidth: String,
  buttonHeight: String,
  buttonColor: String,
  buttonTitle: String,
});

</script>


<template>

<button :title="buttonTitle">
    <img :src="iconPath" alt="">
</button>

</template>


<style scoped>

</style>
