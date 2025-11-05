import './style.css'
import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

const routes = [
  ...generatedRoutes.map(route => {
    if (route.path === '/login' || route.path === '/chat') {
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

// 👇 QUI la guardia
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('directus_token')

  // se non ho token e NON sto andando a /login → mandami a /login
  if (!token && to.path !== '/login') {
    return next('/login')
  }

  // se ho token e provo ad andare a /login → mandami alla home
  if (token && to.path === '/login') {
    return next('/')
  }

  return next()
})

createApp(App).use(router).mount('#app')
