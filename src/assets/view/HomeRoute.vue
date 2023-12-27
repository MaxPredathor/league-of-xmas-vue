<template>
  <header>
    <HeaderComponent />
  </header>
</template>

<script>
import HeaderComponent from "../../partials/HeaderComponent.vue";
export default {
  name: "HomeRoute",
  components: {
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
