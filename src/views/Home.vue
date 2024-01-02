<template>
  <SectionJumbotron />
  <div>
    <SectionChampions />
    <SectionItems />
  </div>
</template>

<script>
import SectionJumbotron from "../components/homepage/SectionJumbotron.vue";
import SectionChampions from "../components/homepage/SectionChampions.vue";
import SectionItems from "@/components/homepage/SectionItems.vue";
export default {
  name: "HomeRoute",
  components: {
    SectionJumbotron,
    SectionChampions,
    SectionItems
},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
</style>
