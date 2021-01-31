// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import ajax from './common/utils/ajax'
import routes from './router'
import pageStore from './store'
import ElementUI from 'element-ui'
import 'element-ui//lib/theme-chalk/index.css'
import './styles/index.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

console.log('routes', routes)
const Router = new VueRouter({
  routes: routes
})
let store = new Vuex.Store(pageStore)
Vue.prototype.$ajax = ajax.requestAPI

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store,
  components: { App },
  template: '<App/>'
})
export default new Vue({
  el: '#app',
  router: Router,
  store,
  components: { App },
  template: '<App/>'
})
