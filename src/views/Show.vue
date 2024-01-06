<template>
  <div class="god">
    <Overview :obj="champion" :champName="champId" />
    <ChampStat :obj="champion" :champName="champId" />
    <Skins :obj="champion" :champName="champId" />
    <VideoLol />
  </div>
</template>

<script>
import { store } from "../data/store";
import Overview from "../components/show-page/Overview.vue";
import ChampStat from "../components/show-page/ChampStat.vue";
import Skins from "../components/show-page/Skins.vue";
import VideoLol from "../components/show-page/VideoLol.vue";
import axios from "axios";
export default {
  name: "Show",
  data() {
    return {
      store,
      champion: [],
      champId: this.$route.params.id,
    };
  },
  components: {
    Overview,
    ChampStat,
    Skins,
    VideoLol,
  },
  methods: {
    getSpecificChamp() {
      const apiUrl = store.ChampionsUrls.specificChamp + this.champId + ".json";
      console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data.data);
          this.champion = response.data.data;
          console.log(this.champion);
          this.loaded = true;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
  },
  mounted() {
    this.getSpecificChamp();
    this.store.activeNav = 1;
  },
};
</script>

<style lang="scss" scoped>
.god {
  padding-top: 100px;
}
</style>
