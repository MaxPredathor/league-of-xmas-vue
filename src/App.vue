<template>
  <header>
    <HeaderComponent />
  </header>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Champion from "./views/Champions.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
export default {
  name: "App",
  components: {
    Home,
    Champion,
    HeaderComponent,
  },
};
</script>

<style lang="scss" scoped>
@use "./assets/style/partials/variables" as *;

header {
  background-color: $color-prussian-blue;
  color: $color-sky-blue;
}
</style>

