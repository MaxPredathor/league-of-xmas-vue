<template>
  <div class="position-relative">
    <h1 class="fst-italic display-4 fw-bold position-absolute m-0">PARTNERS</h1>
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 10,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: false,
      }"
      :autoplay="{
        delay: 7000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :pagination="false"
      :loop="true"
      :modules="modules"
      class="mySwiper py-2"
    >
      <swiper-slide
        class="d-flex flex-column justify-content-center align-items-center"
        v-for="(partner, index) in partners"
        :key="index"
      >
        <div class="img-cont">
          <img :src="path + partner.img" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";

import "swiper/scss/effect-coverflow";
import "swiper/scss/pagination";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  name: "SectionSlider",
  setup() {
    return {
      modules: [EffectCoverflow, Pagination, Autoplay],
    };
  },
  data() {
    return {
      path: "/images/logos/",
      partners: [
        {
          name: "Google",
          img: "logo-google.png",
        },
        {
          name: "Adidas",
          img: "logo-adidas.png",
        },
        {
          name: "Fedex",
          img: "logo-fedex.png",
        },
        {
          name: "Samsung",
          img: "logo-samsung.png",
        },
        {
          name: "Spotify",
          img: "logo-spotify.png",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;
h1 {
  z-index: 998;
  right: 50%;
  top: -6%;
  transform: translate(50%, -50%);
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: goldenrod;
  color: white;
  text-shadow: black 8px 0 10px;
}
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}
.mySwiper {
  background-color: $color-header-footer;
  padding: 0;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 150px;
  .img-cont {
    width: 50%;
    height: 70%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

// .img-cont {
//   width: 50%;
//   img {
//     width: 100%;
//   }
// }
</style>
