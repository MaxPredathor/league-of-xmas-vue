<template>
  <div class="container">
    <nav class="row justify-content-between align-items-center py-5">
      <!-- Start Logo section -->
      <div class="col-2 d-flex gap-2 align-items-center">
        <div class="position-relative logo-cont-first">
          <a href="#" class="position-absolute before">
            <img src="/images/logos/logo-riot-white.png" alt="logo" />
          </a>
          <a href="#" class="position-absolute after">
            <img src="/images/logos/logo-riot.png" alt="logo" />
          </a>
        </div>
      </div>
      <!-- End Logo section -->
      <!-- Start Navbar routes -->
      <div class="col-6 text-center">
        <ul class="d-flex align-items-center m-0 p-0">
          <li class="pe-2">
            <a href="#">
              <img src="/images/logos/logo-lol-2.png" alt="logo" />
            </a>
          </li>
          <li v-for="(el, id) in navItems" :key="id" class="mx-2 px-1">
            <router-link :to="el.route">{{ el.name }}</router-link>
          </li>
          <li v-for="(el, id) in navItemsSecond" :key="id" class="mx-2 px-1">
            <a :href="el.route" class="position-relative"
              >{{ el.name }}
              <i class="position-absolute fa-solid fa-turn-up"></i
            ></a>
          </li>
        </ul>
      </div>
      <!-- Start Navbar routes -->
      <!-- Start User/register section -->
      <div class="col-4 text-end">
        <span class="mx-1">Guest/User</span>
        <span class="mx-1">Register</span>
      </div>
      <!-- End User/register section -->
    </nav>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "HeaderComponent",
  data() {
    return {
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
          name: "Items",
          route: "/items",
        },
      ],
      navItemsSecond: [
        {
          navIdSec: 1,
          name: "E-Sport",
          route: "https://lolesports.com/en",
        },
        {
          navIdSec: 2,
          name: "Patches",
          route: "https://www.leagueoflegends.com/en-us/news/tags/patch-notes/",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/_variables.scss" as *;
.logo-cont-second {
  width: 50px;
  height: 40px;
  img {
    width: 100%;
  }
}
ul {
  li {
    font-size: 1.5rem;
    text-shadow: 1px 2px 1px $color-selective-yellow;
    font-weight: bold;
    font-style: italic;
    i {
      top: 5px;
      right: -15px;
      font-size: 0.5em;
    }
    img {
      width: 40px;
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
