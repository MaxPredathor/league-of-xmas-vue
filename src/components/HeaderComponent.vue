<template>
  <div class="container-fluid px-5">
    <nav class="row w-100 justify-content-between align-items-center py-3">
      <!-- Start Logo section -->

      <div class="col-3 d-flex gap-2 align-items-center">
        <div class="position-relative logo-cont-first">
          <router-link :to="{ name: 'Home' }" @click="store.activeNav = 0">
            <a href="#" class="position-absolute before">
              <img src="/images/logos/logo-riot-white.png" alt="logo" />
            </a>
            <a href="#" class="position-absolute after">
              <img src="/images/logos/logo-riot.png" alt="logo" />
            </a>
          </router-link>
        </div>
      </div>
      <!-- End Logo section -->
      <!-- Start Navbar routes -->
      <div class="col-6 text-center">
        <ul class="d-flex align-items-center m-0 p-0">
          <div class="pe-4">
            <img
              v-for="(el, index) in champsPng"
              v-show="this.selected === index"
              :key="index"
              :src="el.img"
              :alt="el.name"
            />
          </div>
          <li
            v-for="(el, index) in navItems"
            :key="index"
            class="px-3 mx-1"
            :class="{ active: store.activeNav === index }"
            @click="store.activeNav = index"
          >
            <router-link :to="el.route">{{ el.name }}</router-link>
          </li>
          <li
            v-for="(el, index) in navItemsSecond"
            :key="index"
            class="px-3 mx-1"
          >
            <a :href="el.route" :target="el.target" class="position-relative"
              >{{ el.name }}
              <i class="position-absolute fa-solid fa-turn-up"></i
            ></a>
          </li>
        </ul>
      </div>
      <!-- Start Navbar routes -->
      <!-- Start User/register section -->
      <div class="col-3 d-flex align-items-center justify-content-evenly">
        <div class="gap-2 user">
          <div class="user-cont" @click="pushIfLogged()">
            <i
              v-if="this.store.activeUser === ''"
              :class="this.userUnlogged.fa"
            ></i>
            <img
              v-else
              :src="this.baseImgUrl + store.activeImgId + '.png'"
              alt="Image User"
            />
          </div>
          <span class="name-user">{{ store.activeUser }}</span>
        </div>
        <span
          @click="login()"
          v-if="this.store.activeUser === ''"
          class="register-btn"
          >Login</span
        >
        <span @click="logout()" v-else class="register-btn">Logout</span>
      </div>
      <!-- End User/register section -->
    </nav>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../data/store.js";
import router from "../router/router";
import axios from "axios";
export default {
  name: "HeaderComponent",
  data() {
    return {
      store,
      // Elements in navbar
      navItems: [
        {
          navId: 1,
          name: "Home",
          route: "/",
        },
        {
          navId: 2,
          name: "Champions",
          route: "/champions",
        },
        {
          navId: 3,
          name: "Track Players",
          route: "/players",
        },
      ],
      navItemsSecond: [
        {
          navIdSec: 1,
          name: "E-Sport",
          route: "https://lolesports.com/en",
          target: "_blank",
        },
        {
          navIdSec: 2,
          name: "Patches",
          route: "https://www.leagueoflegends.com/en-us/news/tags/patch-notes/",
          target: "_blank",
        },
      ],
      userUnlogged: {
        name: "Unlogged",
        fa: "fa-solid fa-user-secret",
      },
      champsPng: [
        {
          idImg: 1,
          name: "Zed",
          img: "/images/champs/zed.png",
        },
        {
          idImg: 2,
          name: "Ashe",
          img: "/images/champs/ashe.png",
        },
        {
          idImg: 3,
          name: "Yasuo",
          img: "/images/champs/yasuo.png",
        },
      ],
      baseImgUrl: store.playersUrls.profilePicUrl,
      selected: 0,
    };
  },
  methods: {
    pushIfLogged() {
      if (this.store.activeUser !== "") {
        store.searchedRegion = store.activeServer;
        router.push({ path: "/players/" + store.activeUser });
      }
    },
    login() {
      router.push({ path: "/login" });
    },
    logout() {
      store.activeUser = "";
      setTimeout(() => {
        location.reload();
      }, 200);
    },
    getApiUserImg() {
      axios
        .get(store.playersUrls.summonerData + store.activeUser, {
          params: {
            api_key: store.apiKey,
          },
        })
        .then((res) => {
          console.log(res.data);
          store.activeImgId = res.data.profileIconId;
          // console.log(store.activeImgId);
        });
    },
    setActive() {
      setInterval(() => {
        if (this.selected < this.champsPng.length - 1) {
          this.selected++;
        } else {
          this.selected = 0;
        }
      }, 4000);
    },
  },
  mounted() {
    this.setActive();
    this.getApiUserImg();
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/_variables.scss" as *;
nav {
  font-family: $font-LOL;
}
.logo-cont-second {
  width: 50px;
  height: 40px;
  img {
    width: 100%;
  }
}
.register-btn {
  border-right: 3px solid transparent;
  border-bottom: 3px solid goldenrod;
  border-left: 3px solid goldenrod;
  border-top: 3px solid transparent;
  padding: 1px 10px;
  transition: 0.4s all ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
.user {
  display: flex;
  align-items: center;
  transition: 0.4s all ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
.user-cont {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  border: 3px solid goldenrod;
  overflow: hidden;
  transition: all 0.7s ease;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  img {
    width: 100%;
  }
  i {
    color: black;
    font-size: 50px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
  }
}
.active {
  border-bottom: 3px solid goldenrod;
}
ul {
  div {
    img {
      width: 50px;
      height: 50px;
    }
  }
  li {
    font-size: 1.5rem;
    text-shadow: 1px 2px 1px goldenrod;
    font-weight: bold;
    font-style: italic;
    padding-bottom: 10px;
    &:hover {
      border-bottom: 3px solid goldenrod;
      cursor: pointer;
    }
    i {
      top: 5px;
      right: -15px;
      font-size: 0.5em;
    }
    .void {
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      &:hover {
        background-color: rgba(128, 128, 128, 0.13);
        border-radius: 25px;
      }
    }
  }
}
.logo-cont-first {
  width: 150px;
  height: 40px;
  &:hover {
    .before {
      opacity: 0;
    }
    .after {
      opacity: 1;
    }
  }
  .before {
    transition: 0.8s all ease;
    opacity: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .after {
    transition: 0.8s all ease;
    opacity: 0;
  }
  img {
    width: 100%;
  }
}
</style>
