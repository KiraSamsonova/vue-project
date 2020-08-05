import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import numbersFilter from '@/filters/numbers.filter'
Vue.prototype.$http = axios;
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token

}
Vue.config.productionTip = false

Vue.filter('numbers', numbersFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
