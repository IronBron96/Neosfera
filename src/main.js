import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "virtual:generated-pages";

const router = createRouter({
  history: createWebHistory(),
  routes: [...generatedRoutes, { path: "/:pathMatch(.*)*", redirect: "/" }],
});

createApp(App).use(router).mount("#app");
