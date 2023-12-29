<template>
  <div class="bg-primary">
    <div class="container py-5">
      <div class="row">
        <div class="col-4">
          <ul class="m-0 p-0">
            <li v-for="(el, key) in champs" :key="key" class="my-icon-cont">
              <a href="">
                {{ key }}
                <img
                  :src="store.ChampionsUrls.champIcon + el.id + '.png'"
                  alt=""
              /></a>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <p>Ciao</p>
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
      champsName: [],
      champRand: "",
      randNumb: [],
    };
  },
  methods: {
    getChamps() {
      axios.get(store.ChampionsUrls.allChamps).then((res) => {
        console.log(res.data.data);
        this.champs = res.data.data;
      });
    },
    getNames() {
      // this.champs.foreach((el) => {
      //   console.log(el);
      // });
      console.log(this.champs);
    },
    getRandomNumbs() {
      for (let i = 0; i < 10; i++) {
        const rand = Math.floor(Math.random() * this.champs.lenght - 1);
        console.log(rand);
        if (!this.randNumb.includes(Math.round(rand))) {
          this.randNumb.push(Math.round(rand));
        }
      }
      console.log(this.randNumb);
    },
  },
  mounted() {
    this.getChamps();
    this.getRandomNumbs();
    this.getNames();
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
