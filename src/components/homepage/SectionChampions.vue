<template>
  <div class="bg-primary">
    <div class="container py-5">
      <div class="row">
        <div class="col-2">
          <ul class="d-flex flex-column gap-2 m-0 p-0 border w-25">
            <li
              v-for="(el, index) in randomChampsList"
              :key="index"
              class="my-icon-cont"
            >
              <img
                :src="store.ChampionsUrls.champIcon + el[0] + '.png'"
                alt=""
                :class="{ active: this.selected === index }"
                @click="this.selected = index"
              />
            </li>
          </ul>
        </div>
        <div class="col-5">
          <p
            v-show="this.selected === index"
            class="m-0"
            v-for="(el, index) in randomChampsList"
            :key="index"
          >
            {{ el[1].blurb }}
          </p>
        </div>
        <div class="col-5">
          <div class="profile-champ">
            <img
              v-for="(el, index) in randomChampsList"
              :key="index"
              v-show="this.selected === index"
              :src="store.ChampionsUrls.champImage + el[0] + '_0.jpg'"
              :alt="el.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../data/store";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
export default {
  name: "SectionChampions",
  data() {
    return {
      store,
      champs: [],
      randomChampsList: [],
      selected: 0,
      isActive: false,
    };
  },
  methods: {
    // Api to get champs infos
    getChamps() {
      axios.get(store.ChampionsUrls.allChamps).then((res) => {
        console.log(res.data.data);
        this.champs = Object.entries(res.data.data);
        this.randomChamps();
      });
    },
    randomChamps() {
      while (this.randomChampsList.length < 10) {
        const randNumber = Math.floor(Math.random() * (this.champs.length + 1));
        if (!this.randomChampsList.includes(this.champs[randNumber])) {
          this.randomChampsList.push(this.champs[randNumber]);
        }
      }
      console.log(this.randomChampsList);
    },
  },
  mounted() {
    this.getChamps();
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

.my-icon-cont {
  width: 40px;
  height: 40px;
  // padding: 25px 0;
  img {
    width: 100%;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
  }
}
.profile-champ {
  width: 350px;
  height: 300px;
  img {
    width: 100%;
  }
}
.active {
  border: 3px solid yellow;
}
</style>
