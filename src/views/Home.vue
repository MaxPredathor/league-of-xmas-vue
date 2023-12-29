<template>
  <div>
    <h1>This is the Home page!</h1>

    <h2>This is the section where swiper will show champions</h2>
    <SectionChampions />
  </div>
</template>

<script>
import SectionChampions from "../components/homepage/SectionChampions.vue";
export default {
  name: "HomeRoute",
  components: { SectionChampions },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
</style>
