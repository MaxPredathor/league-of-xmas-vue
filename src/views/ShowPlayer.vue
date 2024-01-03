<template>
  <div class="wrapper w-100 py-5">
    <div class="container py-5">
      <div class="d-flex align-items-start">
        <div class="profile d-flex flex-column align-items-center">
          <div id="wings">
            <div v-if="rank" class="rank">
              <img :src="'/public/images/Ranked Emblems Latest/Wings/' + rank + '.png'
                " :alt="rank" />
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
          <div id="ranked">
            <div class="d-flex flex-column" v-for="rank in profileRank">
              <div v-show="rank.queueType === 'RANKED_SOLO_5x5'" id="solo">
                <div class="category">
                  <h5>Ranked Solo</h5>
                </div>
                <div class="rank-queue d-flex justify-content-center align-item-center">
                  <div class="rank-img">
                    <img class="w-75" :src="'/images/Ranked Emblems Latest/Rank=' +
                      rank.tier +
                      '.png'
                      " :alt="rank.tier" />
                  </div>
                  <div class="rank-name-lp">
                    <h5>{{ rank.tier }} {{ rank.rank }}</h5>
                    <p>{{ rank.leaguePoints }} lp</p>
                  </div>
                  <div class="wins-loss-wr">
                    <p>
                      {{ rank.wins }}<span class="text-success">W</span> /
                      {{ rank.losses }}<span class="text-danger">L</span>
                    </p>
                    <p>Win rate: <span :class="{
                      'text-success': rank.wins > rank.losses,
                      'text-danger': rank.wins < rank.losses,
                      'text-warning': rank.wins === rank.losses,
                    }">{{ getWinRates(rank.wins, rank.losses) }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div v-show="rank.queueType === 'RANKED_FLEX_SR'" id="flex">
                <div class="category">
                  <h5>Ranked Flex</h5>
                </div>
                <div class="rank-queue d-flex justify-content-center">
                  <div class="rank-img">
                    <img class="w-75" :src="'/images/Ranked Emblems Latest/Rank=' +
                      rank.tier +
                      '.png'
                      " :alt="rank.tier" />
                  </div>
                  <div class="rank-name-lp">
                    <h5>{{ rank.tier }} {{ rank.rank }}</h5>
                    <p>{{ rank.leaguePoints }} lp</p>
                  </div>
                  <div class="wins-loss-wr">
                    <p>
                      {{ rank.wins }}<span class="text-success">W</span> /
                      {{ rank.losses }}<span class="text-danger">L</span>
                    </p>
                    <p>
                      Win rate:
                      <span :class="{
                        'text-success': rank.wins > rank.losses,
                        'text-danger': rank.wins < rank.losses,
                        'text-warning': rank.wins === rank.losses,
                      }">{{ getWinRates(rank.wins, rank.losses) }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="champ-mastery" v-if="masteryReady">
            <div class="category">
              <h5>Champion Mastery</h5>
            </div>
            <div v-for="item in 5">
              <div>
                <div class="champ d-flex justify-content-center align-item-center">
                  <div class="champ-img">
                    <img class="w-50" :src="store.ChampionsUrls.champIcon +
                      getChampionNameByKey(champMastery[item - 1].championId) +
                      '.png'
                      " :alt="getChampionNameByKey(champMastery[item - 1].championId)" />
                  </div>
                  <div class="champ-name">
                    <h5>{{ getChampionNameByKey(champMastery[item - 1].championId) }}</h5>
                    <p>Points: {{ champMastery[item - 1].championPoints }}</p>
                  </div>
                  <div class="champ-mastery">
                    <p>
                      <img class="w-50"
                        :src="'/images/Mastery/Champion_Mastery_Level_' + champMastery[item - 1].championLevel + '_Flair.webp'"
                        alt="">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5" v-else>
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="content w-100">
          <h1></h1>
          <div class="matches container">
            <div v-for="(match, index) in sorted(matches)" class="alert row w-100" :class="{
              'bg-win': win(match.participants),
              'bg-loss': !win(match.participants),
            }">
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
                  <img class="w-100" :src="store.ChampionsUrls.champIcon +
                    you(match.participants).championName +
                    '.png'
                    " :alt="you(match.participants).championName" />
                </div>
                <div class="champIcon d-flex flex-wrap flex-column">
                  <div class="w-50 p-1">
                    <img class="w-100" :src="store.imageSpellUrl +
                      store.spells[you(match.participants).summoner1Id].key +
                      '.png'
                      " alt="spell 1" />
                  </div>
                  <div class="w-50 p-1">
                    <img class="w-100" :src="store.imageSpellUrl +
                      store.spells[you(match.participants).summoner2Id].key +
                      '.png'
                      " alt="spell 2" />
                  </div>
                  <div class="w-50" v-if="gamemode(match.queueId) !== 'Arena'">
                    <img class="w-100" :src="store.runeImage2 + getRunesKey(match)" alt="rune 1" />
                  </div>
                  <div class="w-50" v-if="gamemode(match.queueId) !== 'Arena'">
                    <img class="w-75 m-1 mt-2" :src="store.runeImage2 + getSecondaryRuneStyle(match)" alt="rune 2" />
                  </div>
                </div>
              </div>
              <div class="col">
                <h4>
                  <span class="text-white">{{ you(match.participants).kills }} /
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
              <div class="col d-flex flex-wrap flex-column items align-items-center p-0" style="height: 120px">
                <div style="min-width: 60px" class="p-1 h-50" v-for="num in 6">
                  <img v-if="you(match.participants)['item' + (num - 1)]" class="h-100" :src="store.ItemsUrls.itemIcon +
                    you(match.participants)['item' + (num - 1)] +
                    '.png'
                    " :alt="'item' + num" />
                  <div v-else class="w-100 h-100 obj rounded-2"></div>
                </div>
                <div style="width: calc(100% / 3)" class="p-1 lume">
                  <img class="w-100" :src="store.ItemsUrls.itemIcon +
                    you(match.participants).item6 +
                    '.png'
                    " alt="" />
                </div>
              </div>
              <div class="col d-flex justify-content-end align-items-end">
                <div @click="toggleShow(index)"
                  class="d-flex justify-content-center align-items-center obj p-2 rounded-2 cursor-pointer">
                  <i class="fa-solid fa-chevron-down" ref="chevron"></i>
                </div>
              </div>
              <div class="all-players" ref="players">
                <div v-for="player in match.participants" class="player p-1" :class="{
                  'bg-loss': !player.win,
                  'bg-win': player.win,
                }">
                  <h3 v-if="player.win" class="d-none winners text-primary">
                    Winner Team
                  </h3>
                  <h3 v-else class="d-none losers text-danger">Loser Team</h3>
                  <div class="border rounded-3 p-2" :class="{
                    'border-danger': !player.win,
                    'border-primary': player.win,
                  }">
                    {{ player.summonerName }}
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
      profileRank: [],
      show: false,
      champMastery: [],
      masteryReady: false,
      championsArray: [],
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
    getChampions() {
      const url = store.ChampionsUrls.allChamps;
      axios.get(url).then((res) => {
        this.championsArray = res.data.data;
        console.log(this.championsArray);
      })
    },
    getChampionNameByKey(key) {
      for (let i in this.championsArray) {
        if (parseInt(this.championsArray[i].key) === key) {
          return this.championsArray[i].id
        }
      }
    },
    getChampMastery() {
      const url = store.playersUrls.championMastery + this.puuid;
      axios.get(url, { params: { api_key: store.apiKey } }).then((res) => {
        console.log(res.data);
        this.champMastery = res.data;
        this.masteryReady = true
      });
    },
    getRank() {
      const rankUrl = store.playersUrls.summonerRank + this.summonerId;
      axios.get(rankUrl, { params: { api_key: store.apiKey } }).then((res) => {
        this.profileRank = res.data;
        console.log(this.profileRank);
        if (res.data.length > 0) {
          res.data.forEach((element) => {
            if (element.queueType == "RANKED_SOLO_5x5") {
              this.rank = this.capitalizeFirstLetter(element.tier);
            }
          });
        }
      });
    },
    // getRankImage(rank) {
    //   console.log(rank);
    //   return (
    //     "/images/Ranked Emblems Latest/Rank=" +
    //     this.capitalizeFirstLetter(rank) +
    //     ".png"
    //   );
    // },
    getWinRates(wins, losses) {
      return Math.round((wins / (wins + losses)) * 100) + "%";
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
    toggleShow(index) {
      const currentMenu = this.$refs.players;
      const currentArrow = this.$refs.chevron;
      currentMenu[index].classList.toggle("opened");
      currentArrow[index].classList.toggle("rotated");
    },
  },
  mounted() {
    this.getSummoner();
    this.getRunes();
    this.getChampions()
    setTimeout(() => {
      this.getChampMastery();
    }, 1500)
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;

.wrapper {
  .cursor-pointer {
    cursor: pointer;
  }

  background-color: $color-showpage;

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

    i {
      transition: all 0.5s ease;

      &.rotated {
        transform: rotate(180deg);
      }
    }

    .all-players {
      height: 0px;
      overflow: hidden;
      transition: all 0.7s ease;

      &.opened {
        height: 670px;
        margin-top: 15px;
      }

      .player {
        padding: 3px;

        &:nth-child(6) {
          margin-top: 20px;
        }

        &:first-child h3,
        &:nth-child(6) h3 {
          display: block !important;
          font-family: $font-LOL;
          padding: 10px 0;
        }
      }
    }
  }

  .profile {
    position: relative;
    top: 200px;
    width: 200px;

    #name {
      margin-top: 100px;
      width: 300px;

      h1 {
        text-align: center;
        width: 100%;
        color: #fff;
        font-family: $font-LOL;
        font-size: 3.5em;
      }
    }

    #champ-mastery {
      color: #767383;
      background-color: #31313c;
      border-radius: 0.5em;
      margin-bottom: 10px;
      width: 400px;

      .category {
        width: 100%;
        border-bottom: 1px solid $color-showpage;
        padding: 5px 20px;
      }

      .champ {

        .champ-img {
          width: 30%;
          padding: 5px 10px;
        }

        .champ-name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px 0;
          width: 40%;
          color: white;

          p {
            margin: 0;
            color: #767383;
          }

          h4 {
            margin: 0;
          }
        }

        .champ-mastery {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          padding: 5px 0;
          width: 30%;

          p {
            margin: 0;
          }
        }
      }
    }

    #ranked {
      width: 400px;
      color: #fff;

      #solo,
      #flex {
        color: #767383;
        background-color: #31313c;
        border-radius: 0.5em;
        margin-bottom: 10px;

        .rank-queue {
          .rank-img {
            width: 30%;
            padding: 5px 10px;
          }

          .rank-name-lp {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 5px 0;
            width: 40%;
            color: white;

            p {
              margin: 0;
            }

            h4 {
              margin: 0;
            }
          }

          .wins-loss-wr {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            padding: 5px 0;
            width: 30%;

            p {
              margin: 0;
            }
          }
        }
      }

      .category {
        width: 100%;
        border-bottom: 1px solid $color-showpage;
        padding: 5px 20px;
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

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid goldenrod;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: goldenrod transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

}
</style>
