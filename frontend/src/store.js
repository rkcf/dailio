import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false
  },
  mutations: {
    closeModal (state) {
      state.showModal = false
    },
    openModal (state) {
      state.showModal = true
    }
  }
})
