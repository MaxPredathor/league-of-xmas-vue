import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Champions from "../views/Champions.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
