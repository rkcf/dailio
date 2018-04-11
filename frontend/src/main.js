import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store.js'
import Normalize from 'normalize.css'

Vue.use(VeeValidate)
Vue.use(Normalize)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
