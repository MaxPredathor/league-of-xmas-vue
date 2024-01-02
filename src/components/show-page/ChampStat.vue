<template>
  <div id="background">
    <!-- <div data-moba-widget="lol-champion-build" data-moba-champion="varus"></div> -->
    <div class="container">
      <div
        data-moba-widget="lol-champion-build"
        :data-moba-champion="store.activeChamp"
      ></div>
    </div>
  </div>
</template>

<script>
import { store } from "../../data/store.js";
export default {
  name: "ChampStat",
  props: {
    obj: Object,
  },
  data() {
    return {
      store,
    };
  },
  mounted() {
    // Dynamically load external JavaScript file
    const externalScript = document.createElement("script");
    externalScript.src =
      "https://cdn.jsdelivr.net/gh/mobalyticshq/mobalytics-widgets/build/mobalytics-widgets.js";
    externalScript.async = true;

    externalScript.onload = () => {
      // External script has loaded, now you can initialize Mobalytics widget
      //   this.initializeMobalyticsWidget();
    };
    document.head.appendChild(externalScript);
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;
#background {
  background-color: $color-showpage;
  .container {
    padding: 50px;
  }
}
</style>
,
