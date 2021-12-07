import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () =>
      import(/** webpackChunkName: 'login' */ '@/views/login/login.vue')
  },
  {
    name: 'main',
    path: '/main',
    component: () =>
      import(/** webpackChunkName: 'main' */ '@/views/main/main.vue')
  }
]

const route = createRouter({
  routes,
  history: createWebHashHistory()
})

export default route
