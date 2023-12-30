<template>
  <div class="bg-primary">
    <div class="container py-5">
      <div class="row">
        <div class="col-4">
          <ul class="m-0 p-0">
            <li
              v-for="(el, index) in champNames"
              :key="index"
              class="my-icon-cont"
            >
              <img
                :src="store.ChampionsUrls.champIcon + el.name + '.png'"
                alt=""
                :class="{ active: isActive }"
              />
            </li>
          </ul>
        </div>
        <div class="col-4">
          <p v-for="(el, index) in champNames" v-if="isActive" :key="index">
            {{ el.text }}
          </p>
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
      champNames: [
        {
          id: 1,
          name: "Aatrox",
          text: "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
        },
        {
          id: 2,
          name: "Ahri",
          text: "Innately connected to the magic of the spirit realm, Ahri is a fox-like vastaya who can manipulate her prey's emotions and consume their essence—receiving flashes of their memory and insight from each soul she consumes. Once a powerful yet wayward...",
        },
        {
          id: 3,
          name: "Akali",
          text: "Abandoning the Kinkou Order and her title of the Fist of Shadow, Akali now strikes alone, ready to be the deadly weapon her people need. Though she holds onto all she learned from her master Shen, she has pledged to defend Ionia from its enemies, one...",
        },
        {
          id: 4,
          name: "Alistar",
          text: "Always a mighty warrior with a fearsome reputation, Alistar seeks revenge for the death of his clan at the hands of the Noxian empire. Though he was enslaved and forced into the life of a gladiator, his unbreakable will was what kept him from truly...",
        },
        {
          id: 5,
          name: "Amumu",
          text: "Legend claims that Amumu is a lonely and melancholy soul from ancient Shurima, roaming the world in search of a friend. Doomed by an ancient curse to remain alone forever, his touch is death, his affection ruin. Those who claim to have seen him describe...",
        },
        {
          id: 6,
          name: "Anivia",
          text: "Anivia is a benevolent winged spirit who endures endless cycles of life, death, and rebirth to protect the Freljord. A demigod born of unforgiving ice and bitter winds, she wields those elemental powers to thwart any who dare disturb her homeland...",
        },
        {
          id: 7,
          name: "Annie",
          text: "Dangerous, yet disarmingly precocious, Annie is a child mage with immense pyromantic power. Even in the shadows of the mountains north of Noxus, she is a magical outlier. Her natural affinity for fire manifested early in life through unpredictable...",
        },
        {
          id: 8,
          name: "Ashe",
          text: "Iceborn warmother of the Avarosan tribe, Ashe commands the most populous horde in the north. Stoic, intelligent, and idealistic, yet uncomfortable with her role as leader, she taps into the ancestral magics of her lineage to wield a bow of True Ice...",
        },
        {
          id: 9,
          name: "AurelionSol",
          text: "Aurelion Sol once graced the vast emptiness of the cosmos with celestial wonders of his own devising. Now, he is forced to wield his awesome power at the behest of a space-faring empire that tricked him into servitude. Desiring a return to his...",
        },
        {
          id: 10,
          name: "Azir",
          text: "Azir was a mortal emperor of Shurima in a far distant age, a proud man who stood at the cusp of immortality. His hubris saw him betrayed and murdered at the moment of his greatest triumph, but now, millennia later, he has been reborn as an Ascended...",
        },
      ],
      selected: 1,
      isActive: false,
    };
  },
  methods: {
    getChamps() {
      axios.get(store.ChampionsUrls.allChamps).then((res) => {
        console.log(res.data.data);
        this.champs = res.data.data;
      });
    },
    isActive() {
      for (let i = 0; i < this.champNames.length; i++) {
        if (this.champNames[i].id === this.selected) {
          this.isActive = true;
        }
      }
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
  padding: 25px 0;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.active {
  border: 3px solid yellow;
}
</style>
