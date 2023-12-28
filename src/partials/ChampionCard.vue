<template>
  <div class="col-4" v-if="champ.tags.includes(activeTag) || activeTag == ''">
    <div class="card-div">
      <div>
        <img
          :src="store.ChampionsUrls.champImage + champ.id + '_' + skin + '.jpg'"
          :alt="champ.name"
        />
      </div>
      <h3>
        {{ champ.name }} - <em class="fw-regular">{{ champ.title }}</em>
      </h3>
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
      skin: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-div {
  position: relative;
  margin-bottom: 20px;
  div {
    overflow: hidden;

    img {
      width: 100%;
      transition: all 0.1s linear;
    }
  }
  h3 {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 15px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: #fff;
    margin: 0;
    width: 100%;
    font-size: 1.3em;
  }

  &:hover img {
    transform: scale(1.1);
    transition: all 0.3s linear;
  }
}
</style>
