import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailView from "@/views/DetailView.vue";
import LandingView from "@/views/LandingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
  path: '/',
  name: 'landing',
  component: LandingView,
},
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: DetailView,
    },
  ],
});

export default router;
