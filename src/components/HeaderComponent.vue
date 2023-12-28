<template>
  <div class="container">
    <nav class="row justify-content-between align-items-center py-5">
      <!-- Start Logo section -->
      <div class="col-4 text-start">
        <a href="#">
          <img src="" alt="logo" />
        </a>
      </div>
      <!-- End Logo section -->
      <!-- Start Navbar routes -->
      <div class="col-4 text-center">
        <ul class="d-flex align-items-center m-0">
          <li v-for="(el, id) in  navItems " :key="id" class="mx-2 px-1">
            <router-link :to="el.route">{{ el.name }}</router-link>
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
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/_variables.scss" as *;

div {
  nav {
    ul {
      li {
        font-size: 1.5rem;
        text-shadow: 1px 2px 1px $color-selective-yellow;
        font-weight: bold;
        font-style: italic;
      }
    }
  }
}
</style>
