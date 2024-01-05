<template>
  <div class="wrapper w-100 py-5">
    <div
      class="alert alert-warning container fw-bold text-center"
      v-if="rank === 'error'"
    >
      We are sorry, this player has a rank but the service is down, so we can't
      show it to you.
    </div>
    <div class="container py-5">
      <div class="d-flex align-items-start">
        <div
          class="profile d-flex flex-column align-items-center"
          style="width: 15%"
        >
          <div id="wings">
            <div v-if="rank" class="rank">
              <img
                :src="'/images/Ranked Emblems Latest/Wings/' + rank + '.png'"
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
            <h1 class="text-break">{{ summonerName }}</h1>
          </div>
          <div id="ranked">
            <div class="d-flex flex-column" v-for="rank in profileRank">
              <div v-show="rank.queueType === 'RANKED_SOLO_5x5'" id="solo">
                <div class="category">
                  <h5>Ranked Solo</h5>
                </div>
                <div
                  class="rank-queue d-flex justify-content-center align-item-center"
                >
                  <div class="rank-img">
                    <img
                      class="w-75"
                      :src="
                        '/images/Ranked Emblems Latest/Rank=' +
                        rank.tier +
                        '.png'
                      "
                      :alt="rank.tier"
                    />
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
                      <span
                        :class="{
                          'text-success': rank.wins > rank.losses,
                          'text-danger': rank.wins < rank.losses,
                          'text-warning': rank.wins === rank.losses,
                        }"
                        >{{ getWinRates(rank.wins, rank.losses) }}</span
                      >
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
                    <img
                      class="w-75"
                      :src="
                        '/images/Ranked Emblems Latest/Rank=' +
                        rank.tier +
                        '.png'
                      "
                      :alt="rank.tier"
                    />
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
                      <span
                        :class="{
                          'text-success': rank.wins > rank.losses,
                          'text-danger': rank.wins < rank.losses,
                          'text-warning': rank.wins === rank.losses,
                        }"
                        >{{ getWinRates(rank.wins, rank.losses) }}</span
                      >
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
                <div
                  class="champ d-flex justify-content-center align-item-center"
                >
                  <div class="champ-img">
                    <img
                      class="w-50"
                      :src="
                        store.ChampionsUrls.champIcon +
                        getChampionNameByKey(
                          champMastery[item - 1].championId
                        ) +
                        '.png'
                      "
                      :alt="
                        getChampionNameByKey(champMastery[item - 1].championId)
                      "
                    />
                  </div>
                  <div class="champ-name">
                    <h5>
                      {{
                        getChampionNameByKey(champMastery[item - 1].championId)
                      }}
                    </h5>
                    <p>Points: {{ champMastery[item - 1].championPoints }}</p>
                  </div>
                  <div class="champ-mastery">
                    <p>
                      <img
                        class="w-50"
                        :src="
                          '/images/Mastery/Champion_Mastery_Level_' +
                          champMastery[item - 1].championLevel +
                          '_Flair.webp'
                        "
                        alt=""
                      />
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
        <div class="content" style="width: 85%">
          <h1></h1>
          <div class="matches">
            <div
              v-for="(match, index) in sorted(matches)"
              class="alert w-100 p-0 container border-0"
              :class="{
                'bg-win': win(match.participants),
                'bg-loss': !win(match.participants),
              }"
            >
              <div class="row w-100 p-3 m-0">
                <div class="col">
                  <h4 v-if="win(match.participants)">WIN</h4>
                  <h4 v-else>LOSS</h4>
                  <div>
                    <strong>Duration:</strong>
                    {{ Math.floor(match.gameDuration / 60) }} min.
                  </div>
                  <div>
                    <strong class="fs-4">{{ gamemode(match.queueId) }}</strong>
                  </div>
                </div>
                <div class="col d-flex">
                  <div class="champIcon">
                    <img
                      v-if="
                        you(match.participants).championName !== 'FiddleSticks'
                      "
                      class="w-100"
                      :src="
                        store.ChampionsUrls.champIcon +
                        you(match.participants).championName +
                        '.png'
                      "
                      :alt="you(match.participants).championName"
                    />
                    <img
                      v-else
                      class="w-100"
                      :src="
                        store.ChampionsUrls.champIcon +
                        capitalizeFirstLetter(
                          you(match.participants).championName
                        ) +
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
                          store.spells[you(match.participants).summoner1Id]
                            .key +
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
                          store.spells[you(match.participants).summoner2Id]
                            .key +
                          '.png'
                        "
                        alt="spell 2"
                      />
                    </div>
                    <div
                      class="w-50"
                      v-if="gamemode(match.queueId) !== 'Arena'"
                    >
                      <img
                        class="w-100"
                        :src="store.runeImage2 + getRunesKey(match, 'you')"
                        alt="rune 1"
                      />
                    </div>
                    <div
                      class="w-50"
                      v-if="gamemode(match.queueId) !== 'Arena'"
                    >
                      <img
                        class="w-75 m-1 mt-2"
                        :src="
                          store.runeImage2 + getSecondaryRuneStyle(match, 'you')
                        "
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
                  <div
                    style="min-width: 60px"
                    class="p-1 h-50"
                    v-for="num in 6"
                  >
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
                    @click="toggleShow(index)"
                    @click.once="
                      getOtherRanks(this.matches[index].participants)
                    "
                    class="d-flex justify-content-center align-items-center obj p-2 rounded-2 cursor-pointer"
                  >
                    <i class="fa-solid fa-chevron-down" ref="chevron"></i>
                  </div>
                </div>
              </div>
              <div class="all-players p-0 w-100" ref="players">
                <div
                  v-for="player in match.participants"
                  class="player p-1 w-100"
                  :class="{
                    'bg-loss-in': !player.win,
                    'bg-win-in': player.win,
                  }"
                >
                  <h3 class="win-lose dont-lol d-none px-2">
                    {{ player.win ? "Winner Team" : "Loser Team" }}
                  </h3>
                  <div
                    class="border rounded-3 p-2 container"
                    :class="{
                      'border-danger': !player.win,
                      'border-primary': player.win,
                    }"
                  >
                    <div class="d-flex custom-gap align-items-start">
                      <div class="specific-icon">
                        <img
                          v-if="player.championName !== 'FiddleSticks'"
                          :src="
                            store.ChampionsUrls.champIcon +
                            player.championName +
                            '.png'
                          "
                          :alt="player.championName"
                          class="h-100 w-100"
                        />
                        <img
                          v-else
                          :src="
                            store.ChampionsUrls.champIcon +
                            capitalizeFirstLetter(player.championName) +
                            '.png'
                          "
                          :alt="player.championName"
                          class=""
                          style="width: 78px; height: 78px"
                        />
                        <div class="level">{{ player.champLevel }}</div>
                      </div>
                      <div
                        class="specific-icon d-flex flex-wrap align-items-center flex-column g-0"
                        ì
                      >
                        <div class="w-50 h-50 p-1">
                          <img
                            v-if="store.spells[player.summoner1Id]"
                            class="w-100"
                            :src="
                              store.imageSpellUrl +
                              store.spells[player.summoner1Id].key +
                              '.png'
                            "
                            alt="spell 1"
                          />
                        </div>
                        <div class="w-50 h-50 p-1">
                          <img
                            v-if="store.spells[player.summoner2Id]"
                            class="w-100"
                            :src="
                              store.imageSpellUrl +
                              store.spells[player.summoner2Id].key +
                              '.png'
                            "
                            alt="spell 2"
                          />
                        </div>
                        <div
                          class="w-50 h-50"
                          v-if="gamemode(match.queueId) !== 'Arena'"
                        >
                          <img
                            class="w-100"
                            :src="
                              store.runeImage2 +
                              getRunesKey(match, player.summonerName)
                            "
                            alt="rune 1"
                          />
                        </div>
                        <div
                          class="w-50 h-50"
                          v-if="gamemode(match.queueId) !== 'Arena'"
                        >
                          <img
                            class="w-75 ms-1 mt-1"
                            :src="
                              store.runeImage2 +
                              getSecondaryRuneStyle(match, player.summonerName)
                            "
                            alt="rune 2"
                          />
                        </div>
                      </div>
                      <div class="pe-2 col-2">
                        <h5
                          class="text-white font-lol clickable"
                          @click="changePage(player.summonerName)"
                        >
                          {{ player.summonerName }}
                        </h5>
                        <span v-if="checkArrayWithName(player.summonerName)">
                          <img
                            class="w-25"
                            :src="
                              '/images/Ranked Emblems Latest/Rank=' +
                              getRankedIconByTier(
                                getRankWithName(player.summonerName)
                              )
                            "
                            alt=""
                          />
                          {{ getRankWithName(player.summonerName) }}</span
                        >
                        <span
                          v-else-if="!checkArrayWithName(player.summonerName)"
                        >
                          Unranked
                        </span>
                        <span v-else> {{ rankError }}</span>
                      </div>
                      <div class="px-2">
                        <h5 class="text-white font-lol m-0 text-center">KDA</h5>
                        <span class="d-block text-center fs-6 fw-light"
                          >{{ player.kills }} / {{ player.deaths }} /
                          {{ player.assists }}</span
                        >
                        <h6 class="text-center" v-if="player.challenges">
                          KDA: {{ player.challenges.kda.toFixed(2) }}
                        </h6>
                      </div>
                      <div>
                        <h5 class="text-white font-lol m-0 text-center">
                          Damage
                        </h5>
                        <span class="my-1 d-block text-center">{{
                          player.totalDamageDealtToChampions
                        }}</span>
                        <div class="totalbar w-100 mt-2 rounded-pill">
                          <div
                            class="bar h-100 rounded-pill"
                            :style="{ width: damage(player, match) }"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <h5 class="text-white font-lol">Gold</h5>
                        <span class="text-center d-block"
                          >{{ (player.goldEarned / 1000).toFixed(1) }}k</span
                        >
                      </div>
                      <div>
                        <h5 class="text-white font-lol">Minions</h5>
                        <span class="text-center d-block">{{
                          player.totalMinionsKilled
                        }}</span>
                      </div>
                      <div>
                        <h5 class="text-white font-lol">Vision</h5>
                        <span class="text-center d-block">{{
                          player.visionScore
                        }}</span>
                      </div>
                      <div
                        class="d-flex flex-wrap flex-column items align-items-center p-0 g-0"
                        style="height: 74px"
                      >
                        <div class="h-50 pt-1 me-1" v-for="num in 6">
                          <img
                            v-if="player['item' + (num - 1)]"
                            class="h-100"
                            :src="
                              store.ItemsUrls.itemIcon +
                              player['item' + (num - 1)] +
                              '.png'
                            "
                            :alt="'item' + num"
                          />
                          <div
                            v-else
                            class="h-100 obj rounded-2 pt-1 h-100"
                            style="
                              width: 33px !important;
                              height: 33px !important;
                            "
                          ></div>
                        </div>
                        <div style="width: 35px" class="p-1 lume">
                          <img
                            class="w-100"
                            :src="
                              store.ItemsUrls.itemIcon + player.item6 + '.png'
                            "
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
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
import router from "../router/router";
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
      allRanks: [],
      rankError: null,
    };
  },
  methods: {
    changePage(name) {
      router.push({
        path: "/players/" + name,
        params: {
          summonerName: name,
        },
      });
      setTimeout(() => {
        location.reload();
      }, 200);
    },
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
      });
    },
    getChampionNameByKey(key) {
      for (let i in this.championsArray) {
        if (parseInt(this.championsArray[i].key) === key) {
          return this.championsArray[i].id;
        }
      }
    },
    getChampMastery() {
      const url = store.playersUrls.championMastery + this.puuid;
      axios.get(url, { params: { api_key: store.apiKey } }).then((res) => {
        console.log(res.data);
        this.champMastery = res.data;
        this.masteryReady = true;
      });
    },
    getRank() {
      const rankUrl = store.playersUrls.summonerRank + this.summonerId;
      axios
        .get(rankUrl, { params: { api_key: store.apiKey } })
        .then((res) => {
          this.profileRank = res.data;
          console.log(this.profileRank);
          if (res.data.length > 0) {
            res.data.forEach((element) => {
              if (element.queueType == "RANKED_SOLO_5x5") {
                this.rank = this.capitalizeFirstLetter(element.tier);
              }
            });
          }
        })
        .catch((error) => {
          this.rank = "error";
        });
    },
    getRankedIconByTier(tier) {
      console.log(tier);
      if (tier.includes("I")) {
        return "IRON.png";
      } else if (tier.includes("B")) {
        return "BRONZE.png";
      } else if (tier.includes("S")) {
        return "SILVER.png";
      } else if (tier.includes("GM")) {
        return "GRANDMASTER.png";
      } else if (tier.includes("P")) {
        return "PLATINUM.png";
      } else if (tier.includes("E")) {
        return "EMERALD.png";
      } else if (tier.includes("D")) {
        return "DIAMOND.png";
      } else if (tier.includes("M")) {
        return "MASTER.png";
      } else if (tier.includes("G")) {
        return "GOLD.png";
      } else if (tier.includes("C")) {
        return "CHALLENGER.png";
      } else {
        return;
      }
      // switch (tier) {
      //   case tier.includes("I"):
      //     return "IRON.png";
      //   case tier.includes("B"):
      //     return "BRONZE.png";
      //   case tier.includes("S"):
      //     return "SILVER.png";
      //   case tier.includes("G"):
      //     return "GOLD.png";
      //   case tier.includes("P"):
      //     return "PLATINUM.png";
      //   case tier.includes("E"):
      //     return "EMERALD.png";
      //   case tier.includes("D"):
      //     return "DIAMOND.png";
      //   case tier.includes("M"):
      //     return "MASTER.png";
      //   case tier.includes("GM"):
      //     return "GRANDMASTER.png";
      //   case tier.includes("C"):
      //     return "CHALLENGER.png";
      //   default:
      //     return "Invalid rank entered.";
      // }
    },
    checkArrayWithName(player) {
      let targetObject = this.allRanks.find((obj) => obj.name == player);
      if (targetObject) {
        return true;
      } else {
        return false;
      }
    },
    getRankWithName(player) {
      let targetObject = this.allRanks.find((obj) => obj.name == player);
      return targetObject.rank;
    },
    getOtherRanks(players) {
      let summonerId;
      let rankNumber;
      players.forEach((player) => {
        const playerId =
          this.store.playersUrls.summonerData + player.summonerName;
        axios
          .get(playerId, {
            params: { api_key: store.apiKey },
          })
          .then((res) => {
            summonerId = res.data.id;
            const rankUrl = store.playersUrls.summonerRank + summonerId;
            axios
              .get(rankUrl, {
                params: { api_key: store.apiKey },
              })
              .then((response) => {
                response.data.forEach((element) => {
                  if (element.queueType.includes("RANKED_SOLO_5x5")) {
                    if (element.rank == "I") {
                      rankNumber = 1;
                    } else if (element.rank === "II") {
                      rankNumber = 2;
                    } else if (element.rank == "III") {
                      rankNumber = 3;
                    } else if (element.rank == "IV") {
                      rankNumber = 4;
                    } else {
                      rankNumber = "/";
                    }
                    let rank;
                    if (element.tier == "GRANDMASTER") {
                      rank = "GM";
                    } else {
                      rank = element.tier.slice(0, 1);
                    }
                    this.allRanks.push({
                      name: element.summonerName,
                      rank: rank + rankNumber,
                    });
                  } else {
                    // this.allRanks.push("-");
                    //element.tier.slice(0, 1) + rankNumber
                  }
                });
              })
              .catch((error) => {
                this.rankError = error;
              });
          });
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

    getRunesKey(match, who) {
      let style;
      let keyStone;
      if (who === "you") {
        style = this.you(match.participants).perks.styles[0].style;
        keyStone = this.you(match.participants).perks.styles[0].selections[0]
          .perk;
      } else {
        for (let i = 0; i < match.participants.length; i++) {
          if (match.participants[i].summonerName === who) {
            style = match.participants[i].perks.styles[0].style;
            keyStone = match.participants[i].perks.styles[0].selections[0].perk;
          }
        }
      }

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
                } else if (
                  this.runes[i].slots[j].runes[k].key == "Aftershock"
                ) {
                  const key =
                    styleName +
                    "/" +
                    "Veteran" +
                    this.runes[i].slots[j].runes[k].key +
                    "/" +
                    "Veteran" +
                    this.runes[i].slots[j].runes[k].key +
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
    getSecondaryRuneStyle(match, who) {
      let style;
      if (who === "you") {
        style = this.you(match.participants).perks.styles[1].style;
      } else {
        for (let i = 0; i < match.participants.length; i++) {
          if (match.participants[i].summonerName === who) {
            style = match.participants[i].perks.styles[1].style;
          }
        }
      }
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
      currentMenu.forEach((value) => {
        if (value !== currentMenu[index]) {
          value.classList.remove("opened");
        }
      });
      currentArrow.forEach((value) => {
        if (value !== currentArrow[index]) {
          value.classList.remove("rotated");
        }
      });
      currentMenu[index].classList.toggle("opened");
      currentArrow[index].classList.toggle("rotated");
    },
    damage(player, match) {
      let damage = 0;
      match.participants.forEach((value) => {
        if (value.totalDamageDealtToChampions > damage) {
          damage = value.totalDamageDealtToChampions;
        }
      });

      return (player.totalDamageDealtToChampions * 100) / damage + "%";
    },
  },
  mounted() {
    this.getSummoner();
    this.getRunes();
    this.getChampions();
    setTimeout(() => {
      this.getChampMastery();
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;

.wrapper {
  .clickable {
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.1);
      text-decoration: underline;
    }
  }
  .font-lol {
    font-family: $font-LOL;
  }

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

        .totalbar {
          background-color: #2a4796;
          height: 5px;

          .bar {
            background-color: #2a73fa;
          }
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

        .totalbar {
          background-color: #53263e;
          height: 5px;

          .bar {
            background-color: #ff4e4c;
          }
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

      h5 {
        font-size: 1.1em;
      }

      .custom-gap {
        gap: 17px;
      }

      &.opened {
        height: 1173px;
        margin-top: 15px;
      }

      .bg-win-in {
        background-color: $color-game-win;

        h4 {
          font-family: $font-LOL;
          font-weight: bold;
          color: #2a73fa;
        }

        .obj {
          background-color: #2a73fa;
        }

        .totalbar {
          background-color: #2a4796;
          height: 5px;

          .bar {
            background-color: #2a73fa;
          }
        }
      }

      .bg-loss-in {
        background-color: $color-game-loss;

        h4 {
          font-family: $font-LOL;
          font-weight: bold;
          color: #ff4e4c;
        }

        .obj {
          background-color: #ff4e4c;
        }

        .totalbar {
          background-color: #53263e;
          height: 5px;

          .bar {
            background-color: #ff4e4c;
          }
        }
      }

      .player {
        padding: 3px;

        &:nth-child(6) {
          margin-top: 10px;
        }

        &:first-child h3,
        &:nth-child(6) h3 {
          display: block !important;
          font-family: $font-LOL;
          padding: 10px 0;
        }
      }

      .specific-icon {
        position: relative;
        max-width: 78px;
        max-height: 78px;

        .level {
          position: absolute;
          bottom: -3px;
          left: -3px;
          background-color: $color-prussian-blue;
          width: 2em;
          height: 2em;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 0.7em;
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
