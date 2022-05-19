import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favourites.vue')
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: () => import(/* webpackChunkName: "about" */ '../views/Book.vue')
  },
  {
    path: '/books/:page?',
    name: 'BooksLibrary',
    component: () => import(/* webpackChunkName: "about" */ '../views/BooksLibrary.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
