import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TableView from '../views/TableView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'table',
    component: TableView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
