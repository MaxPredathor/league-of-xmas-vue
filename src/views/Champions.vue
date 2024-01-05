<template>
  <div class="container god" @click="search = false">
    <h3>CHOOSE YOUR</h3>
    <h1>CHAMPION</h1>
    <p>
      With more than 160 champions, you’ll find the perfect match for your
      playstyle. Master one, or master them all.
    </p>
    <div class="polygon">
      <nav class="navbar navbar-expand-lg py-3">
        <div></div>
        <div class="container-fluid">
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <div class="search position-relative" @click.stop="search = true">
              <h4 v-if="!search">
                <i class="fa-solid fa-magnifying-glass"></i> Search
              </h4>
              <input v-else type="text" v-model="searchValue" />
              <span id="close" v-if="search" @click.stop="search = false">
                <i class="fa-solid fa-xmark"></i>
              </span>
              <span
                id="clear"
                v-if="champsId !== ''"
                @click.stop="filterChamps(null, null, '')"
              >
                <i class="fa-solid fa-xmark"></i>
              </span>
              <div class="search-dropdown" :class="{ 'd-block': search }">
                <div
                  class="search-option"
                  v-for="champs in champions"
                  @click="filterChamps(null, null, champs.id)"
                  v-show="
                    champs.id
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) || searchValue === ''
                  "
                >
                  {{ champs.name }}
                </div>
              </div>
            </div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: tag === ' ' }"
                  @click="filterChamps('', null, null)"
                >
                  All
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  @click="filterChamps('Assassin', null, null)"
                  :class="{ active: tag === 'Assassin' }"
                >
                  Assassins
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  @click="filterChamps('Fighter', null, null)"
                  :class="{ active: tag === 'Fighter' }"
                >
                  Fighters
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  @click="filterChamps('Mage', null, null)"
                  :class="{ active: tag === 'Mage' }"
                >
                  Mages
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  @click="filterChamps('Marksman', null, null)"
                  :class="{ active: tag === 'Marksman' }"
                >
                  Marksmen
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  @click="filterChamps('Support', null, null)"
                  :class="{ active: tag === 'Support' }"
                >
                  Supports
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  @click="filterChamps('Tank', null, null)"
                  :class="{ active: tag === 'Tank' }"
                >
                  Tanks
                </button>
              </li>
            </ul>
            <div class="difficulty">
              <select
                @change="filterChamps(null, $event.target.value, null)"
                name="difficulty"
                id=""
              >
                <option value="/">All</option>
                <option value="3">Easy</option>
                <option value="7">Medium</option>
                <option value="10">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="row" :class="{ opacited: loading }">
      <ChampionsCard
        v-for="champ in champions"
        :key="champ.key"
        :champ="champ"
        :activeTag="tag"
        :champId="champsId"
        :filteredChamp="diff"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../data/store";
import ChampionsCard from "../components/partials/ChampionCard.vue";
export default {
  name: "Champions",
  components: {
    ChampionsCard,
  },
  data() {
    return {
      champions: [],
      tag: " ",
      store,
      bgImg: "",
      loading: false,
      diff: "/",
      search: false,
      searchValue: "",
      champsId: "",
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
    filterChamps(tag, select, id) {
      this.loading = true;
      setTimeout(() => {
        if (tag !== null && tag !== "") {
          this.tag = tag;
        } else if (tag === "") {
          this.tag = " ";
        }
        if (select) {
          this.diff = select;
        }
        if (id) {
          this.champsId = id;
          this.search = false;
        }
        if (id === "") {
          this.champsId = "";
        }
      }, 400);
      setTimeout(() => {
        this.loading = false;
      }, 700);
    },
  },
  mounted() {
    this.getChamps();
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/_variables.scss" as *;

.god {
  padding-top: 100px;
}
h1 {
  font-family: $font-LOL;
  font-size: 80px;
  transform: skew(-15deg);
  text-align: center;
  font-weight: bold;
  padding: 0;
  margin: 0;
  margin-bottom: 40px;
}
h3 {
  transform: skew(-15deg);
  font-size: 40px;
  font-family: $font-LOL;
  text-align: center;
  padding: 0;
  margin: 0;
  margin-top: 40px;
}
h4 {
  font-family: $font-spiegel;
}
p {
  font-family: $font-spiegel;
  text-align: center;
  font-size: 20px;
}
li {
  font-family: $font-spiegel;
}
.fa-magnifying-glass {
  color: goldenrod;
  font-size: 0.9em;
}
#close {
  position: absolute;
  top: 24%;
  right: 4%;
  font-size: 0.6em;
  background-color: rgb(162, 158, 145);
  border-radius: 50%;
  padding: 0 4.5px;
  overflow: hidden;
  cursor: pointer;
}
#clear {
  position: absolute;
  top: 20%;
  right: -30%;
  font-size: 0.6em;
  background-color: rgb(162, 158, 145);
  border-radius: 50%;
  padding: 0 4.5px;
  overflow: hidden;
  cursor: pointer;
}
.polygon {
  clip-path: polygon(2% 0, 100% 0, 100% 77%, 98% 100%, 0 100%, 0 23%);
  background-color: #c1c1c1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin-bottom: 20px;

  nav {
    font-size: 1.3em;
    width: 99.8%;
    height: 98%;
    background-color: white;
    clip-path: polygon(2% 0, 100% 0, 100% 77%, 98% 100%, 0 100%, 0 23%);

    button {
      &.active {
        font-weight: bold;

        &:after {
          transform: translateY(0px);
          opacity: 1;
        }
      }

      &:hover {
        &:after {
          transform: translateY(0px);
          opacity: 1;
        }
      }

      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 3px;
        background-color: $color-selective-yellow;
        transform: translateY(8px);
        opacity: 0;
        transition: all 0.3s linear;
      }
    }
  }
}

.row {
  transition: all 0.3s linear;

  &.opacited {
    opacity: 0;
  }
}

.search {
  position: relative;

  .search-dropdown {
    display: none;
    height: 200px;
    overflow-y: scroll;
    position: absolute;
    z-index: 100;
    background-color: white;
    width: 250px;
    font-family: $font-spiegel;
    font-size: 0.9em;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

    .search-option {
      z-index: 101;
      width: 100%;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
