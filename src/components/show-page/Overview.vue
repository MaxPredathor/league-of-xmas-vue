<template>
  <div
    id="background"
    :style="{
      'background-image':
        'url(' + store.ChampionsUrls.champImage + champName + '_0.jpg' + ')',
    }"
  >
    <div class="blur">
      <div class="container" v-for="item in obj">
        <h1>{{ item.name.toUpperCase() }}</h1>
        <h4>{{ item.title }}</h4>
        <div class="img-cont">
          <img
            :src="store.ChampionsUrls.champImage + champName + '_0.jpg'"
            :alt="item.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../data/store.js";
export default {
  name: "Overview",
  data() {
    return {
      store,
      champ: store.activeChamp,
    };
  },
  props: {
    obj: Object,
    champName: String,
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

#background {
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  color: white;

  &:after {
    content: "";
    -webkit-box-shadow: inset 0 -28px 14.5px -0.5px $color-showpage;
    -moz-box-shadow: inset 0 -28px 14.5px -0.5px $color-showpage;
    box-shadow: inset 0 -28px 14.5px -0.5px $color-showpage;
    display: block;
    height: 96.7%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .blur {
    backdrop-filter: blur(6px);
    backdrop-filter: greyscale(70%);
    background-color: $color-showpage-opacity;
    padding: 40px 0 0 0;

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;

      h1 {
        font-size: 110px;
        position: absolute;
        top: 500px;
        font-family: $font-LOL;
        // margin: 20px 0;
        text-align: center;
        transform: skew(-15deg);
        font-weight: bolder;
      }

      h4 {
        font-family: $font-LOL;
        font-size: 24px;
        position: absolute;
        top: 500px;
        text-align: center;
      }

      .img-cont {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
