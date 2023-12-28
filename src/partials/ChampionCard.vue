<template>
  <div class="col-4" v-if="champ.tags.includes(activeTag) || activeTag == ''">
    <div class="card-div">
      <div>
        <img
          :src="store.ChampionsUrls.champImage + champ.id + '_0.jpg'"
          :alt="champ.name"
        />
      </div>
      <h3>{{ champ.name }}</h3>
    </div>
  </div>
</template>

<script>
import { store } from "../assets/data/store.js";
export default {
  name: "ChampionCard",
  props: {
    champ: Object,
    activeTag: String,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-div {
  div {
    overflow: hidden;

    img {
      width: 100%;
      transition: all 0.1s linear;
    }
  }

  &:hover img {
    transform: scale(1.1);
    transition: all 0.3s linear;
  }
}
</style>
