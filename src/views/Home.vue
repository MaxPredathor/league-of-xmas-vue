<template>
  <div>
    <h1>
      This is the Home page
    </h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;

header {
  background-color: $color-prussian-blue;
  color: $color-sky-blue;
}
</style>
