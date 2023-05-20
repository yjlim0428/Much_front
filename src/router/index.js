import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/view/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/LoginView.vue"),
    },
  ],
});

export default router;
