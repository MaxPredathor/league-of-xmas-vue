<template>
  <div class="external">
    <div class="background">
      <svg class="shape-a" width="200" height="200">
        <circle cx="100" cy="100" r="100" />
      </svg>
      <svg class="shape-b" width="80" height="80">
        <circle cx="40" cy="40" r="40" />
      </svg>
      <svg class="shape-c" width="1000" height="1000">
        <circle cx="500" cy="500" r="500" />
      </svg>
      <svg class="shape-d" width="300" height="300">
        <circle cx="150" cy="150" r="150" />
      </svg>
    </div>
    <div class="container py-5">
      <div class="row align-items-center">
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
            <swiper-slide v-for="(el, index) in randomItemsList" :key="index">
              <img
                :src="store.ItemsUrls.itemIcon + el[0] + '.png'"
                :alt="el[0]"
              />
            </swiper-slide>
          </Swiper>
          <!-- <button @click="swiper.slideNext()">go next</button> -->
        </div>
        <div class="col-5">
          <div
            class="bckdrop"
            v-for="(el, index) in randomItemsList"
            :key="index"
            v-show="this.selected === index"
          >
            <h3 class="text-center fw-bold fst-italic">
              {{ el[1].name }}
            </h3>
            <p class="m-auto w-75 text-center fs-5">
              {{ el[1].plaintext }}
            </p>
          </div>
        </div>
        <div class="col-2">
          <ul class="d-flex flex-column gap-2 m-0 p-0 align-items-center">
            <li
              v-for="(el, index) in randomItemsList"
              :key="index"
              class="my-icon-cont align-self-end"
            >
              <img
                :src="store.ItemsUrls.itemIcon + el[0] + '.png'"
                alt=""
                :class="{ active: this.selected === index }"
                @click="setActive(index)"
              />
            </li>
          </ul>
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
      items: [],
      randomItemsList: [],
      selected: 0,
      isActive: false,
    };
  },
  methods: {
    setActive() {
      setInterval(() => {
        if (this.selected < this.randomItemsList.length - 1) {
          this.selected++;
        } else {
          this.selected = 0;
        }
        // console.log(this.selected);
      }, 4000);
    },
    // Api to get champs infos
    getItems() {
      axios.get(store.ItemsUrls.allItems).then((res) => {
        // console.log(res.data.data);
        this.items = Object.entries(res.data.data);
        // console.log(this.items);
        this.randomItems();
      });
    },
    randomItems() {
      while (this.randomItemsList.length < 10) {
        const randNumber = Math.floor(Math.random() * (this.items.length + 1));
        if (!this.randomItemsList.includes(this.items[randNumber])) {
          this.randomItemsList.push(this.items[randNumber]);
        }
      }
      // console.log(this.randomItemsList);
    },
  },
  mounted() {
    this.getItems();
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
  position: relative;
  background-color: white;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    svg {
      fill: rgba(0, 0, 0, 0.1);
      position: absolute;
    }
    .shape-a {
      bottom: -80px;
      left: 1750px;
    }
    .shape-b {
      top: 470px;
      right: 1285px;
    }
    .shape-c {
      top: -400px;
      right: 1200px;
    }
    .shape-d {
      top: -50px;
      right: 20%;
    }
  }
}
.bckdrop {
  width: 500px;
  height: 250px;
  border-radius: 50px;
  box-shadow: -10px -10px goldenrod;
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
  width: 200px;
  height: 200px;
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
