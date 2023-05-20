import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/view/HomeView.vue"),
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/Login/LoginView.vue"),
      meta: {},
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/view/Login/SignupView.vue"),
      meta: {},
    },
    {
      path: "/:pathMatch(.*)*", // 모든 URL 접근을 캐치함
      component: () => import("@/view/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  const requiredAuth = to.matched.some((item) => item.meta.requiredAuth);
  // 로그인을 요구하는 페이지라면
  if (requiredAuth) {
    // 토큰이 없다면
    if (!localStorage.getItem("token")) {
      return { name: "login" };
    }
  }
  return true;
});

export default router;
