import Vue from 'vue'
import Store from '../store/index.js';
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Test from '../views/Test.vue'
import Filters from '../views/filters.vue'
import Auth from '../views/auth.vue'
import NewPassword from '../views/newPassword.vue'
import ForgottenPassword from '../views/forgottenPassword.vue'
import EmailConfirmation from '../views/emailConfirmation.vue'
Vue.use(VueRouter)

const routes = [

  {
    path: '/test',
    name: 'Test',
    meta: { layout: 'empty', auth: 0 },
    component: () => import('../views/Test.vue')
  },
  {
    path: '/test2',
    name: 'Test2',
    meta: { layout: 'empty', auth: 0 },
    component: () => import('../views/Test2.vue')
  },
  {
    path: '/filters',
    name: 'filters',
    meta: { layout: 'empty', auth: 0 },
    component: () => import('../views/filters.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty', auth: -1 },
    component: () => import('../views/registration.vue')
  },
  {
    path: '/emailConfirmation/:confirmData',
    name: 'emailConfirmation',
    meta: { layout: 'empty', auth: 0 },
    component: () => import('../views/emailConfirmation.vue')
  },
  {
    path: '/newPassword/:passLink',
    name: 'newPassword',
    meta: { layout: 'empty', auth: -1 },
    component: () => import('../views/newPassword.vue')
  },
  {
    path: '/forgottenPassword',
    name: 'forgottenPassword',
    meta: { layout: 'empty', auth: -1 },
    component: () => import('../views/forgottenPassword.vue')
  },


  {
    path: '/login',
    name: 'auth',
    meta: { layout: 'empty', auth: -1 },
    component: () => import('../views/auth.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { layout: 'empty', auth: 1 },
    component: () => import('../views/dashboard.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { layout: 'main', auth: 0 },
    component: () => import('../views/home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isLoggedIn = Store.getters.isLoggedIn;

  let auth;
  to.matched.some(record => auth = record.meta.auth)

  if (auth == 1 && isLoggedIn === false) {
    next('/login')
  } else if (auth == -1 && isLoggedIn === true) {
    next('/home')
  } else {
    next()
  }



})

export default router
