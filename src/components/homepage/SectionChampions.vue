<template>
  <div class="bg-primary">
    <div class="container py-5">
      <div class="row">
        <div class="col-4">
          <ul class="m-0 p-0">
            <li class="my-icon-cont">
              <a href=""
                ><img
                  :src="store.ChampionsUrls.champIcon + 'Aatrox.png'"
                  :key="id"
                  alt=""
              /></a>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <p @click="getRandomChamps()">Ciao</p>
        </div>
        <div class="col-4">
          <img :src="store.ChampionsUrls.champIcon + 'Hwei.png'" alt="" />
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
      champRand: "",
      randNumb: [],
    };
  },
  methods: {
    // getImg() {
    //   axios.get(store.ChampionsUrls.champIcon + "Hwei.png").then((res) => {
    //     console.log(res.data);
    //     this.void = res.data;
    //   });
    // },
    getChamps() {
      axios.get(store.ChampionsUrls.allChamps).then((res) => {
        console.log(res.data.data);
        this.champs = res.data.data;
      });
    },
    getRandomChamps() {
      for (let i = 0; i < 10; i++) {
        const rand = Math.random() * 163;
        // console.log(Math.round(rand));
        if (!this.randNumb.includes(Math.round(rand))) {
          this.randNumb.push(Math.round(rand));
        }
      }
      console.log(this.randNumb);
    },
  },
  mounted() {
    this.getChamps();
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

.my-icon-cont {
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
</style>
