<template>
  <div class="container py-5">
    <div class="profile d-flex">
      <div>
        <div class="profilepic">
          <img :src="profilePic" :alt="summonerName" class="w-100 h-100" />
        </div>
        <div class="rounded-pill bg-secondary text-white">
          {{ summonerLevel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../data/store";
export default {
  name: "ShowPlayer",
  data() {
    return {
      summonerName: this.$route.params.name,
      puuid: "",
      summonerId: "",
      profilePic: "",
      summonerLevel: 0,
    };
  },
  methods: {
    getSummoner() {
      const url = store.playersUrls.summonerData + this.summonerName;
      axios.get(url, { params: { api_key: store.apiKey } }).then((res) => {
        this.err = null;
        this.summonerName = res.data.name;
        this.puuid = res.data.puuid;
        this.summonerId = res.data.id;
        this.profilePic =
          store.playersUrls.profilePicUrl + res.data.profileIconId + ".png";
        this.summonerLevel = res.data.summonerLevel;
      });
    },
  },
  mounted() {
    this.getSummoner();
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .profilepic {
    border-radius: 50%;
    overflow: hidden;
    height: 150px;
    width: 150px;
  }
  .bg-secondary {
    position: relative;
    padding: 5px 20px;
    margin: -15px auto;
    width: min-content;
  }
}
</style>
