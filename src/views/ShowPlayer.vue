<template>
  <div class="wrapper w-100 py-5">
    <div class="container py-5">
      <div class="d-flex align-items-start">
        <div class="profile d-flex">
          <div>
            <div v-if="rank" class="rank">
              <img
                :src="
                  '/public/images/Ranked Emblems Latest/Wings/' + rank + '.png'
                "
                :alt="rank"
              />
            </div>
            <div class="profilepic">
              <img :src="profilePic" :alt="summonerName" class="w-100 h-100" />
            </div>
            <div v-if="rank" class="level rounded-pill">
              {{ summonerLevel }}
            </div>
            <div v-else class="level-not-ranked rounded-pill">
              {{ summonerLevel }}
            </div>
          </div>
        </div>
        <div class="content w-100">
          <h1>{{ summonerName }}</h1>
          <div class="matches container">
            <div
              v-for="match in matches"
              class="alert row w-100"
              :class="{
                'bg-win': win(match.participants),
                'bg-loss': !win(match.participants),
              }"
            >
              <div class="col">
                <h4 v-if="win(match.participants)">WIN</h4>
                <h4 v-else>LOSS</h4>
                <div>
                  <strong>Duration:</strong>
                  {{ Math.floor(match.gameDuration / 60) }} min.
                </div>
                <div>
                  <strong>{{ gamemode(match.queueId) }}</strong>
                </div>
              </div>
              <div class="col d-flex">
                <div class="champIcon">
                  <img
                    class="w-100"
                    :src="
                      store.ChampionsUrls.champIcon +
                      you(match.participants).championName +
                      '.png'
                    "
                    :alt="you(match.participants).championName"
                  />
                </div>
                <div class="champIcon d-flex flex-wrap flex-column">
                  <div class="w-50 p-1">
                    <img
                      class="w-100"
                      :src="
                        store.imageSpellUrl +
                        store.spells[you(match.participants).summoner1Id].key +
                        '.png'
                      "
                      alt=""
                    />
                  </div>
                  <div class="w-50 p-1">
                    <img
                      class="w-100"
                      :src="
                        store.imageSpellUrl +
                        store.spells[you(match.participants).summoner2Id].key +
                        '.png'
                      "
                      alt=""
                    />
                  </div>
                  <div class="w-50">
                    <img :src="store.runeImages + getRunesKey(match)" alt="" />
                  </div>
                  <div class="w-50"></div>
                </div>
              </div>
            </div>
          </div>
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
      rank: "",
      matchesIds: [],
      matches: [],
      store,
      runes: [],
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
        this.getRank();
        this.getLastMatches();
      });
    },
    getRank() {
      const rankUrl = store.playersUrls.summonerRank + this.summonerId;
      axios.get(rankUrl, { params: { api_key: store.apiKey } }).then((res) => {
        if (res.data.length > 0) {
          res.data.forEach((element) => {
            if (element.queueType == "RANKED_SOLO_5x5") {
              this.rank = this.capitalizeFirstLetter(element.tier);
            }
          });
        }
      });
    },
    getLastMatches() {
      const lastMatchesUrl =
        store.playersUrls.matchIdByPlayerPUUID + this.puuid + "/ids";
      const params = {
        api_key: store.apiKey,
        count: 10,
        start: 0,
      };
      axios
        .get(lastMatchesUrl, {
          params: params,
        })
        .then((res) => {
          this.matchesIds = res.data;

          this.matchesIds.forEach((value) => {
            const matchesUrl = store.playersUrls.GameDataByMatchId + value;
            axios
              .get(matchesUrl, { params: { api_key: store.apiKey } })
              .then((res) => {
                this.matches.push(res.data.info);
              });
          });
        });
    },

    win(participants) {
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].summonerName === this.summonerName) {
          return participants[i].win;
        }
      }
    },

    gamemode(id) {
      if (id === 400 || id === 490 || id === 430) {
        return "Normal";
      } else if (id === 420) {
        return "Ranked Solo";
      } else if (id === 440) {
        return "Ranked Flex";
      } else if (id === 450) {
        return "ARAM";
      } else if (id === 700 || id === 720) {
        return "Clash";
      } else if (id === 830 || id === 840 || id === 850) {
        return "Bot Game";
      } else if (id === 1700) {
        return "Arena";
      }
    },

    you(participants) {
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].summonerName === this.summonerName) {
          return participants[i];
        }
      }
    },

    spellKey(match) {
      const player = this.you(match.participants);
      return player.summoner1Id;
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    getRunes() {
      const url = store.runes;
      axios.get(url, { params: { api_key: store.apiKey } }).then((res) => {
        this.runes = res.data;
      });
    },

    getRunesKey(match) {
      const style = this.you(match.participants).perks.styles[0].style;
      const keyStone = this.you(match.participants).perks.styles[0]
        .selections[0].perk;
      for (let i = 0; i < this.runes.length; i++) {
        if (this.runes[i].id == style) {
          const styleName = this.runes[i].name;
          for (let j = 0; j < this.runes[i].slots.length; j++) {
            for (let k = 0; k < this.runes[i].slots[j].runes.length; k++) {
              if (this.runes[i].slots[j].runes[k].id == keyStone) {
                const key =
                  styleName +
                  "/" +
                  this.runes[i].slots[j].runes[k].name +
                  "_rune.png";
                return key.replaceAll(" ", "_");
              }
            }
          }
        }
      }
    },
  },
  mounted() {
    this.getSummoner();
    this.getRunes();
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
.wrapper {
  background-color: $color-prussian-blue;
  .content {
    padding-left: 180px;
    color: #fff;
    h1 {
      color: #fff;
      font-family: $font-LOL;
      font-size: 3.5em;
    }
    .matches {
      .bg-win {
        background-color: $color-game-win;
        h4 {
          font-family: $font-LOL;
          font-weight: bold;
          color: #2a73fa;
        }
      }
      .bg-loss {
        background-color: $color-game-loss;
        h4 {
          font-family: $font-LOL;
          font-weight: bold;
          color: #ff4e4c;
        }
      }
      .champIcon {
        width: 120px;
        height: 120px;
      }
    }
  }

  .profile {
    div {
      position: relative;

      .profilepic {
        border-radius: 50%;
        overflow: hidden;
        height: 150px;
        width: 150px;
      }
      .level {
        position: absolute;
        bottom: 7px;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
        padding: 1px 12px;
        margin: -15px auto;
        width: min-content;
        font-weight: bold;
        background-color: $color-prussian-blue;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.4em;
        font-family: $font-LOL;
      }
      .level-not-ranked {
        position: absolute;
        bottom: -20pxpx;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 20px;
        margin: -15px auto;
        width: min-content;
        font-weight: bold;
        background-color: $color-blue-green;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.4em;
        font-family: $font-LOL;
      }

      .rank {
        width: 400px;
        position: absolute;
        top: -240px;
        left: -125px;
        z-index: 1;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
