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
  },
  {
    path: '/np',
    name: 'newPath',
    component: () => import('../views/element/NewPath.vue')
  },
  {
    path: '/ss',
    name: 'searchStation',
    component: () => import('../views/element/SearchStation.vue')
  },
  {
    path: '/sp',
    name: 'searchPath',
    component: () => import('../views/element/SearchPath.vue')
  },
  {
    path: '/sr',
    name: 'searchRoute',
    component: () => import('../views/element/SearchRoute.vue')
  },
  {
    path: '/ds',
    name: 'deleteStation',
    component: () => import('../views/element/DeleteStation.vue')
  },
  {
    path: '/dp',
    name: 'deletePath',
    component: () => import('../views/element/DeletePath.vue')
  },
  {
    path: '/us',
    name: 'updateStation',
    component: () => import('../views/element/UpdateStation.vue')
  },
  {
    path: '/up',
    name: 'updatePath',
    component: () => import('../views/element/UpdatePath.vue')
  },
  {
    path: '/pt',
    name: 'showPath',
    component: () => import('../views/element/ShowPath.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
