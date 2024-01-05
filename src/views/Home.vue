<template>
  <SectionJumbotron />
  <SectionChampions />
  <SectionSlider />
  <SectionItems />
</template>

<script>
import SectionJumbotron from "../components/homepage/SectionJumbotron.vue";
import SectionChampions from "../components/homepage/SectionChampions.vue";
import SectionItems from "../components/homepage/SectionItems.vue";
import SectionSlider from "../components/homepage/SectionSlider.vue";
export default {
  name: "HomeRoute",
  components: {
    SectionJumbotron,
    SectionChampions,
    SectionItems,
    SectionSlider,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
</style>
