<template>
  <swiper
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :loop="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide class="position-relative" v-for="item in imgs">
      <img :src="imgUrl + item.img" />
      <div class="position-absolute title-p text-center">
        <h1 class="display-4 px-1 m-0 w-75 m-auto">{{ item.title }}</h1>
        <p class="fs-3 m-0 w-50 m-auto">{{ item.description }}</p>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination],
    };
  },
  data() {
    return {
      imgUrl: "/images/JumboImages/",
      imgs: [
        {
          title: "Welcome to the League of Xmas!",
          description: "Enjoy your time visiting our website",
          img: "hwei-lol-splash-art-4k-wallpaper-uhdpaper.com-41@1@n.jpg",
        },
        {
          title: "Play with your friends",
          description: "Register to play and have fun with your friends",
          img: "lol-heartsteel-ksante-ezreal-yone-aphelios-sett-kayn-4k-wallpaper-uhdpaper.com-42@1@n.jpg",
        },
        {
          title: "Visit champions",
          description: "Visit to see all champions stats and more",
          img: "heartsteel-yone-prestige-edition-skin-lol-splash-art-2k-wallpaper-uhdpaper.com-664@1@m.jpg",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;
.swiper {
  width: 100%;
  height: 60vh;
}

// .swiper-slide {
//   display: flex;
//   justify-content: center;
//   align-items: start;
// }

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.title-p {
  max-width: 50%;
  max-height: 100%;
  background-color: rgba(0, 0, 0, 0.288);
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  color: goldenrod;
  font-family: $font-LOL;
  backdrop-filter: blur(5px);
  border-radius: 25px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  font-style: italic;
  p {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    font-style: normal;
  }
}
</style>
