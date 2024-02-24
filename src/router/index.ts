import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMath(.*)",
      component: () => import("@/views/not-found/not-found.vue")
    }
  ]
});

export default router;
