<template>
  <div class="external">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-2">
          <ul class="d-flex flex-column gap-2 m-0 p-0 w-25 align-items-center">
            <li
              v-for="(el, index) in randomChampsList"
              :key="index"
              class="my-icon-cont"
            >
              <img
                :src="store.ChampionsUrls.champIcon + el[0] + '.png'"
                alt=""
                :class="{ active: this.selected === index }"
                @click="setActive(index)"
              />
            </li>
          </ul>
        </div>
        <div class="col-5">
          <div
            class="bckdrop"
            v-for="(el, index) in randomChampsList"
            :key="index"
            v-show="this.selected === index"
          >
            <h3 class="text-center fw-bold fst-italic">
              {{ el[1].id }}
            </h3>
            <p class="m-auto w-75 text-center fs-5">
              {{ el[1].blurb }}
            </p>
          </div>
        </div>
        <div class="col-5">
          <Swiper
            @swiper="swiper"
            :effect="'cube'"
            :modules="modules"
            :cubeEffect="{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: false,
            }"
            :loop="true"
            :speed="1000"
          >
            <swiper-slide v-for="(el, index) in randomChampsList" :key="index">
              <img
                :src="store.ChampionsUrls.champImage + el[0] + '_0.jpg'"
                :alt="el[0]"
              />
            </swiper-slide>
          </Swiper>
          <!-- <button @click="swiper.slideNext()">go next</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../../data/store";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCube, Navigation, Autoplay } from "swiper/modules";
import { useSwiper } from "swiper/vue";
import "swiper/scss";
import "swiper/scss/effect-cube";
import "swiper/scss/pagination";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  name: "SectionChampions",
  setup() {
    const swiper = useSwiper();
    // const onSwiper = (swiper) => {
    //   console.log(swiper);
    // };
    // const onSlideChange = () => {
    //   console.log("slide change");
    // };
    return {
      modules: [EffectCube, Navigation, Autoplay],
      swiper,
      // onSwiper,
      // onSlideChange,
    };
  },
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
    setActive() {
      setInterval(() => {
        if (this.selected < this.randomChampsList.length - 1) {
          this.selected++;
        } else {
          this.selected = 0;
        }
        // console.log(this.selected);
      }, 4000);
    },
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
    this.setActive();
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;
.external {
  border-top: 3px solid goldenrod;
  border-bottom: 4px solid goldenrod;
}
.bckdrop {
  // background-color: rgba(0, 0, 0, 0.205);
  border-radius: 50px;
  box-shadow: 10px 10px goldenrod;
  padding: 70px 0;
}
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
.swiper {
  width: 300px;
  height: 300px;
  overflow: visible;
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 80%;
  }
}
.active {
  border: 3px solid goldenrod;
}
</style>
