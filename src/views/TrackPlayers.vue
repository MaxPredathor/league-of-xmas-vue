<template>
  <div class="m-0 position-relative vh-100 god">
    <div class="o-lay">
      <video autoplay loop>
        <source
          type="video/webm"
          src="https://static.bigbrain.gg/assets/ugg/pages/desktop-app/ugg-app-landing.webm"
        />
      </video>
    </div>
    <div class="container pt-tanto">
      <h1 class="text-center m-0 text-white pb-4">Search a summoner</h1>
      <h2 class="text-center m-0 text-white pb-4 fs-3">Select the region</h2>
      <select
        name="tag"
        id="tag"
        class="form-select m-auto mb-4"
        style="width: 8%"
      >
        <option value="euw1">EUW1</option>
        <option value="kr">KR</option>
        <option value="na1">NA1</option>
      </select>
      <div class="form-floating d-flex w-75 m-auto">
        <input
          v-model="search"
          type="text"
          class="form-control rounded-end-0"
          id="search"
          placeholder="Write the Summoner Name"
          @keyup.enter="searchSummoner()"
        />
        <button
          @click="searchSummoner()"
          class="btn btn-primary rounded-start-0 w-25 fs-4"
        >
          Search
        </button>
        <label for="floatingInput text-white">Write the Summoner Name</label>
      </div>
      <div class="alert alert-danger my-4" v-if="err">
        <h2 class="m-0 text-center">
          No players found with the name {{ summonerName }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../data/store";
import router from "../router/router";
export default {
  name: "TrackPlayers",
  data() {
    return {
      store,
      search: "",
      summonerName: "",
      puuid: "",
      summonerId: "",
      profilePic: "",
      summonerLevel: 0,
      err: null,
    };
  },
  methods: {
    searchSummoner() {
      if (this.search.trim().length > 0) {
        const url = store.playersUrls.summonerData + this.search;
        axios
          .get(url, { params: { api_key: store.apiKey } })
          .then((res) => {
            this.err = null;
            this.summonerName = res.data.name;

            router.push({
              path: "/players/" + this.summonerName,
              params: {
                summonerName: this.summonerName,
              },
            });
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.summonerName = this.search;
            this.err = error;
          });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/_variables.scss" as *;
.god {
  padding-top: 100px;
}
.form-floating {
  input {
    background-color: transparent;
    transition: all 0.2s linear;
    &::placeholder {
      color: white;
      transition: all 4s linear;
    }
    &:focus {
      background-color: #fff;
      &::placeholder {
        color: transparent;
      }
    }
  }
  label {
    color: white;
    background-color: transparent;
    transition: all 0.2s linear;
  }
}
.o-lay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  &::after {
    content: "";
    display: block;
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: -2;
  }
}
h1,
h2 {
  font-family: $font-LOL;
}

.pt-tanto {
  padding-top: 200px;
}
</style>
