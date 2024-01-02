import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Champions from "../views/Champions.vue";
import TrackPlayers from "../views/TrackPlayers.vue";
import ShowPlayer from "../views/ShowPlayer.vue";

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
    path: "/players",
    name: "Track Players",
    component: TrackPlayers,
  },
  {
    path: "/players/:name",
    name: "Show Player",
    component: ShowPlayer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
