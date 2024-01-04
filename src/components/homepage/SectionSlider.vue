<template>
  <div>
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="false"
      :loop="true"
      :modules="modules"
      class="mySwiper py-2"
    >
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
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
import { EffectCoverflow, Pagination } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  name: "SectionSlider",
  setup() {
    return {
      modules: [EffectCoverflow, Pagination],
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;
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
  width: 450px;
  height: 250px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: contain;
}
</style>
