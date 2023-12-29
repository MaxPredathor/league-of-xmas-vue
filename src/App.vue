<template>
  <header>
    <HeaderComponent />
  </header>
  <div class="container">
    <router-view></router-view>
  </div>
  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import Home from "./views/Home.vue";
import Champion from "./views/Champions.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "App",
  components: {
    Home,
    Champion,
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss" scoped>
@use "./assets/style/partials/variables" as *;

header {
  background-color: $color-prussian-blue;
  color: $color-sky-blue;
}

footer {
  background-color: $color-prussian-blue;
  color: $color-sky-blue;
}
</style>
