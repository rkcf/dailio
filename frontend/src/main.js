import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store.js'

Vue.use(VeeValidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
