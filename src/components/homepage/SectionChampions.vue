<template>
  <div class="bg-primary">
    <div class="container py-5">
      <div class="row">
        <div class="col-4">
          <ul class="m-0">
            <li>
              <a href="">1 element list</a>
            </li>
            <li>
              <a href="">2 element list</a>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <p class="m-0">Here will be wrote something</p>
        </div>
        <div class="col-4">
          <img src="/images/ranked-emblem/tier/bronze-plate.png" alt="" />
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
      test: [
        "bronze-plate.png",
        "diamond-plate.png",
        "gold-plate.png",
        "iron-plate.png",
        "platinum-plate.png",
      ],
    };
    methods: {
    }
  },
};
</script>

<style lang="scss" scoped></style>
