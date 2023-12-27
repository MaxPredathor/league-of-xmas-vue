<template>
  <Home />
</template>

<script>
import Home from "./view/Home.vue";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style lang="scss" scoped>
@use "./assets/style/partials/variables" as *;
</style>
