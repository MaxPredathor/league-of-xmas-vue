import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Champions from "../views/Champions.vue";
import Show from "../views/Show.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/champions",
    name: "Champions",
    component: Champions,
  },
  {
    path: "/champions/:id",
    name: "Show",
    props: true,
    component: Show,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
