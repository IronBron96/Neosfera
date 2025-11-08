// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { logout } from "../lib/auth";
import IndexView from "../pages/index.vue";
import LoginView from "../pages/login.vue";
import ChatView from "../pages/chat.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: LoginView },
    { path: "/", name: "home", component: IndexView },
    { path: "/chat", name: "chat", component: ChatView },
  ],
});

// guard globale
router.beforeEach((to, from, next) => {
  if (to.name === "login") return next();

  const token = localStorage.getItem("directus_token");
  const lastActive = Number(localStorage.getItem("last_active") || 0);
  const now = Date.now();
  const inactivityLimit = 5 * 24 * 60 * 60 * 1000; // 5 giorni in ms

  if (!token || now - lastActive > inactivityLimit) {
    logout();
    return next({ name: "login" });
  }

  // aggiorna il timestamp di ultima attività
  localStorage.setItem("last_active", now.toString());
  return next();
});

export default router;
