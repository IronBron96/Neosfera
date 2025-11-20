// main.js
import './style.css'
import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import {updateLastActive} from './lib/auth' // importa questa funzione

const routes = [
  ...generatedRoutes.map(route => {
    if (route.path === '/login') {
      route.meta = {layout: 'none'}
    }
    return route
  }),
  {path: '/:pathMatch(.*)*', redirect: '/'},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const INACTIVITY_MAX = 60 * 60 * 1000 // 60 minuti

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('directus_token')
  const lastActive = localStorage.getItem('last_active')
  const now = Date.now()

  if (token && lastActive && now - Number(lastActive) > INACTIVITY_MAX) {
    // sessione vecchia → considera l’utente come sloggato
    localStorage.removeItem('directus_token')
  }

  if (!token && to.path !== '/login') {
    return next('/login')
  }

  if (token && to.path === '/login') {
    return next('/')
  }

  if (token) {
    updateLastActive()
  }

  return next()
})

createApp(App).use(router).mount('#app')
