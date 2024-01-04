<template>
  <swiper
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :loop="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide class="position-relative" v-for="item in imgs">
      <div v-if="item != 'video'">
        <img :src="imgUrl + item.img" />
        <div class="title-p text-center">
          <h1 class="display-4 px-1">{{ item.title }}</h1>
          <p class="fs-3">{{ item.description }}</p>
        </div>
      </div>
      <video autoplay loop v-else>
        <source
          type="video/webm"
          src="https://static.bigbrain.gg/assets/ugg/pages/desktop-app/ugg-app-landing.webm"
        />
      </video>
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
          img: "leagueofxmas.jpg",
        },
        {
          title: "Visit champions",
          description: "Check out all the champions",
          img: "allchamps.jpg",
        },
        {
          title: "See champions stats",
          description: "Visit to see all champions stats and more",
          img: "specificchamp.jpg",
        },
        "video",
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
}

.title-p {
  width: 500px;
  max-height: 250px;
  background-color: rgba(0, 0, 0, 0.288);
  bottom: 50%;
  left: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 50%);
  color: goldenrod;
  font-family: $font-LOL;
  backdrop-filter: blur(5px);
  border-radius: 25px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  font-style: italic;
  h1,
  p {
    width: 90%;
  }
  p {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    font-style: normal;
  }
}
</style>
