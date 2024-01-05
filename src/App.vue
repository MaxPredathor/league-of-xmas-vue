<template>
  <header v-if="showHeader">
    <HeaderComponent />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer v-if="showFooter">
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
  data() {
    return {
      showFooter: true,
      showHeader: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "./assets/style/partials/variables" as *;

header {
  background-color: $color-header-footer;
  color: white;
  border-top: 1px solid goldenrod;
  border-bottom: 1px solid goldenrod;
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
}
main {
  padding-top: 100px;
}

footer {
  background-color: $color-header-footer;
  color: white;
}
</style>
