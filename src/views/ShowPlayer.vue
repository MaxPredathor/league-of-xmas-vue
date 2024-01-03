<template>
  <div class="wrapper w-100 py-5">
    <div class="container py-5">
      <div class="d-flex align-items-start">
        <div class="profile d-flex flex-column align-items-center">
          <div id="wings">
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
          <div id="name">
            <h1>{{ summonerName }}</h1>
          </div>
          <div id="rankedSolo"></div>
        </div>
        <div class="content w-100">
          <h1></h1>
          <div class="matches container">
            <div
              v-for="match in sorted(matches)"
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
                      alt="spell 1"
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
                      alt="spell 2"
                    />
                  </div>
                  <div class="w-50" v-if="gamemode(match.queueId) !== 'Arena'">
                    <img
                      class="w-100"
                      :src="store.runeImage2 + getRunesKey(match)"
                      alt="rune 1"
                    />
                  </div>
                  <div class="w-50" v-if="gamemode(match.queueId) !== 'Arena'">
                    <img
                      class="w-75 m-1 mt-2"
                      :src="store.runeImage2 + getSecondaryRuneStyle(match)"
                      alt="rune 2"
                    />
                  </div>
                </div>
              </div>
              <div class="col">
                <h4>
                  <span class="text-white"
                    >{{ you(match.participants).kills }} /
                  </span>

                  <span class="text-danger">{{
                    you(match.participants).deaths
                  }}</span>

                  <span class="text-white">
                    / {{ you(match.participants).assists }}
                  </span>
                </h4>
                <div>
                  <strong>{{
                    you(match.participants).challenges.kda.toFixed(2)
                  }}</strong>
                  KDA
                </div>
                <div v-if="you(match.participants).visionScore">
                  {{ you(match.participants).visionScore }} vision
                </div>
              </div>
              <div
                class="col d-flex flex-wrap flex-column items align-items-center p-0"
                style="height: 120px"
              >
                <div style="min-width: 60px" class="p-1 h-50" v-for="num in 6">
                  <img
                    v-if="you(match.participants)['item' + (num - 1)]"
                    class="h-100"
                    :src="
                      store.ItemsUrls.itemIcon +
                      you(match.participants)['item' + (num - 1)] +
                      '.png'
                    "
                    :alt="'item' + num"
                  />
                  <div v-else class="w-100 h-100 obj rounded-2"></div>
                </div>
                <div style="width: calc(100% / 3)" class="p-1 lume">
                  <img
                    class="w-100"
                    :src="
                      store.ItemsUrls.itemIcon +
                      you(match.participants).item6 +
                      '.png'
                    "
                    alt=""
                  />
                </div>
              </div>
              <div class="col d-flex justify-content-end align-items-end">
                <div
                  class="d-flex justify-content-center align-items-center obj p-2 rounded-2"
                >
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <div class="all-players">
                <div
                  :class="{
                    'bg-win': match.teams[0].win,
                    'bg-loss': !match.teams[0].win,
                  }"
                >
                  <div v-for="n in 5">
                    {{ match.participants[n - 1].summonerName }}
                  </div>
                </div>
                <div
                  :class="{
                    'bg-win': match.teams[1].win,
                    'bg-loss': !match.teams[1].win,
                  }"
                >
                  <div v-for="n in 5">
                    {{ match.participants[n - 1 + 5].summonerName }}
                  </div>
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
      return this.you(participants).win;
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
      } else {
        return "Unknown";
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
                if (this.runes[i].slots[j].runes[k].key == "LethalTempo") {
                  const key =
                    styleName +
                    "/" +
                    this.runes[i].slots[j].runes[k].key +
                    "/" +
                    this.runes[i].slots[j].runes[k].key +
                    "Temp" +
                    ".png";
                  return key.replaceAll(" ", "");
                } else {
                  const key =
                    styleName +
                    "/" +
                    this.runes[i].slots[j].runes[k].key +
                    "/" +
                    this.runes[i].slots[j].runes[k].key +
                    ".png";
                  return key.replaceAll(" ", "");
                }
              }
            }
          }
        }
      }
    },
    getSecondaryRuneStyle(match) {
      const style = this.you(match.participants).perks.styles[1].style;
      for (let i = 0; i < this.runes.length; i++) {
        if (this.runes[i].id == style) {
          if (this.runes[i].name == "Precision") {
            return "7201_Precision.png";
          } else if (this.runes[i].name == "Domination") {
            return "7200_Domination.png";
          } else if (this.runes[i].name == "Sorcery") {
            return "7202_Sorcery.png";
          } else if (this.runes[i].name == "Resolve") {
            return "7204_Resolve.png";
          } else if (this.runes[i].name == "Inspiration") {
            return "7203_Whimsy.png";
          }
        }
      }
    },
    sorted(element) {
      return element.sort(
        (a, b) => b.gameStartTimestamp - a.gameStartTimestamp
      );
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
        .obj {
          background-color: #2a73fa;
        }
      }
      .bg-loss {
        background-color: $color-game-loss;
        h4 {
          font-family: $font-LOL;
          font-weight: bold;
          color: #ff4e4c;
        }
        .obj {
          background-color: #ff4e4c;
        }
      }
      .champIcon {
        width: 120px;
        height: 120px;
      }
    }
  }

  .profile {
    position: relative;
    top: 200px;
    width: 200px;

    #name {
      margin-top: 100px;
      width: 100%;

      h1 {
        width: 100%;
        color: #fff;
        font-family: $font-LOL;
        font-size: 2em;
      }
    }
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
