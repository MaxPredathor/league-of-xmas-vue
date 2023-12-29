<template>
  <SectionJumbotron />
  <div>
    <h1>This is the Home page!</h1>

    <h2>This is the section where swiper will show champions</h2>
  </div>
</template>

<script>
import SectionJumbotron from "../components/homepage/SectionJumbotron.vue";
export default {
  name: "HomeRoute",
  components: { SectionJumbotron },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
</style>
