// src/router/index.ts
import {createRouter, createWebHistory} from 'vue-router'
import {restoreSession} from '../lib/auth'
import IndexView from '../pages/index.vue'
import LoginView from '../pages/login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/login', name: 'login', component: LoginView},
    {path: '/', name: 'home', component: IndexView},
  ],
})

// guardia globale
router.beforeEach(async (to, from, next) => {
  // lasciamo passare /login sempre
  if (to.name === 'login') return next()

  const ok = await restoreSession()
  if (!ok) {
    return next({name: 'login'})
  }

  return next()
})

export default router
