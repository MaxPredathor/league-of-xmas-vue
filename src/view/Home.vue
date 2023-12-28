<template>
  <header>
    <HeaderComponent />
  </header>
  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
export default {
  name: "HomeRoute",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;

header {
  background-color: $color-prussian-blue;
  color: $color-sky-blue;
}

footer {
  background-color: $color-prussian-blue;
  color: $color-sky-blue;
}
</style>
