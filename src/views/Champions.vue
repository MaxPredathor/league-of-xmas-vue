<template>
  <div>
    <h1>This is the Champions page</h1>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav justify-content-center">
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                @click="tag = ''"
              >
                All
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="tag = 'Assassin'">
                Assassins
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="tag = 'Fighter'">
                Fighters
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="tag = 'Mage'">Mages</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="tag = 'Marksman'">
                Marksmen
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="tag = 'Support'">
                Supports
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="tag = 'Tank'">Tanks</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="row">
      <ChampionsCard
        v-for="champ in champions"
        :key="champ.key"
        :champ="champ"
        :activeTag="tag"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../assets/data/store.js";
import ChampionsCard from "../partials/ChampionCard.vue";
export default {
  name: "Champions",
  components: {
    ChampionsCard,
  },
  data() {
    return {
      champions: [],
      tag: "",
      store,
      bgImg: "",
    };
  },
  methods: {
    getChamps() {
      const apiUrl = store.ChampionsUrls.allChamps;
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data.data);
          this.champs = response.data.data;
          this.champions = response.data.data;
          console.log(this.champions);
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
    this.getChamps();
  },
};
</script>

<style lang="scss" scoped></style>
