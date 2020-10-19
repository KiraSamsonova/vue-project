import Vue from 'vue'
import Store from '../store/index.js';
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Test from '../views/Test.vue'
import NewProfile from '../views/newProfile.vue'
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
    meta: { layout: 'empty', auth: 0, roleNeeded: 0 },
    component: () => import('../views/Test.vue')
  },
  {
    path: '/test2',
    name: 'Test2',
    meta: { layout: 'empty', auth: 0, roleNeeded: 0 },
    component: () => import('../views/Test2.vue')
  },

  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'main', auth: -1, roleNeeded: 0 },
    component: () => import('../views/registration.vue')
  },
  {
    path: '/emailConfirmation',
    name: 'emailConfirmation',
    meta: { layout: 'main', auth: 0, roleNeeded: 0 },
    component: () => import('../views/emailConfirmation.vue')
  },
  {
    path: '/newPassword',
    name: 'newPassword',
    meta: { layout: 'main', auth: -1, roleNeeded: 0 },
    component: () => import('../views/newPassword.vue')
  },
  {
    path: '/forgottenPassword',
    name: 'forgottenPassword',
    meta: { layout: 'main', auth: -1, roleNeeded: 0 },
    component: () => import('../views/forgottenPassword.vue')
  },

  {
    path: '/login',
    name: 'auth',
    meta: { layout: 'main', auth: -1, roleNeeded: 0 },
    component: () => import('../views/auth.vue')
  },

  {
    path: '/settings',
    name: 'settings',
    meta: { layout: 'dashboard', auth: 1, roleNeeded: 0 },
    component: () => import('../views/settings.vue')

  },

  {
    path: '/newProfile',
    name: 'newProfile',
    meta: { layout: 'dashboard', auth: 1, roleNeeded: 'blogger' },
    component: () => import('../views/newProfile.vue')
  },

  {
    path: '/editProfile',
    name: 'editProfile',
    meta: { layout: 'dashboard', auth: 1, roleNeeded: 'blogger' },
    component: () => import('../views/editProfile.vue'),
  },

  {
    path: '/favourites',
    name: 'favourites',
    meta: { layout: 'dashboard', auth: 1, roleNeeded: 0 },
    component: () => import('../views/favBloggers.vue')

  },

  {
    path: '/profiles',
    name: 'profiles',
    meta: { layout: 'dashboard', auth: 0, roleNeeded: 'blogger' },
    component: () => import('../views/profiles.vue')
  },

  {
    path: '/home',
    name: 'home',
    meta: { layout: 'main', auth: 0, roleNeeded: 0 },
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

  let usersRole = Store.getters.getUser.role
  let roleNeeded;

  to.matched.some(record => roleNeeded = record.meta.roleNeeded)

  if (roleNeeded == 'blogger' && usersRole !== 'blogger') {
    next('/settings')
  // } else if (roleNeeded == -1 && usersRole === true) {
  //   next('/home')
  } else {
    next()
  }


})

export default router
