import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/element/ElementView.vue')
  },
  {
    path: '/ns',
    name: 'newStation',
    component: () => import('../views/element/NewStation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
