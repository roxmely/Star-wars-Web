import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Characters from "../views/Characters.vue";
import Pages from "../views/Pages.vue";
import Planets from "../views/Planets.vue";
import DetailPlanets from "../views/DetailPlanets.vue";
import Films from "../views/Films.vue";
import DetailFilms from "../views/DetailFilms.vue";
import Species from "../views/Species.vue";
import DetailSpecies from "../views/DetailSpecies.vue";
import Vehicles from "../views/Vehicles.vue";
import DetailVehicles from "../views/DetailVehicles.vue";
import Starships from "../views/Starships.vue";
import DetailStarships from "../views/DetailStarships.vue";
import Login from "../views/Login.vue";
import Chat from "../components/Chat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: "/pages/:pageNum",
    name: "Pages",
    props: true,
    component: Pages
  },
  {
    path: "/characters/:id",
    name: "Characters",
    props: true,
    component: Characters
  },
  {
    path: "/planets/page=:id",
    props: true,
    component: Planets
  },
  {
    path: "/detailPlanets/:id",
    name: "DetailPlanets",
    props: true,
    component: DetailPlanets
  },
  {
    path: "/films/page=:id",
    name: "Films",
    props: true,
    component: Films
  },
  {
    path: "/films/:id",
    name: "DetailFilms",
    props: true,
    component: DetailFilms
  },
  {
    path: "/species/page=:id",
    name: "Species",
    props: true,
    component: Species
  },
  {
    path: "/species/:id",
    name: "DetailSpecies",
    props: true,
    component: DetailSpecies
  },
  {
    path: "/vehicles/page=:id",
    name: "Vehicles",
    props: true,
    component: Vehicles
  },
  {
    path: "/detailVehicles/:id",
    name: "DetailVehicles",
    props: true,
    component: DetailVehicles
  },
  {
    path: "/starships/page=:id",
    name: "Starships",
    props: true,
    component: Starships
  },
  {
    path: "/DetailStarships/:id",
    name: "DetailStarships",
    props: true,
    component: DetailStarships
  }
];

const router = new VueRouter({
  routes
});

export default router;
