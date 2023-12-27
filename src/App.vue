<template>
  <HomeRoute />
</template>

<script>
import HomeRoute from "./view/HomeRoute.vue";
export default {
  name: "App",
  components: {
    HomeRoute,
  },
};
</script>

<style lang="scss" scoped>
@use "./assets/style/partials/variables" as *;
</style>
