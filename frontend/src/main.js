import VueResource from 'vue-resource'
import Vue from 'vue'
import App from './App'
import store from './store.js'

Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
