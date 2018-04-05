import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    showModal: false,
    tasks: []
  },
  mutations: {
    closeModal (state) {
      state.showModal = false
    },
    openModal (state) {
      state.showModal = true
    },
    getTasks (state) {
      Vue.http.get('/api/tasks/')
        .then((response) => {
          state.tasks = response.data
        })
    }
  },
  actions: {
    addTask ({ commit }, taskname) {
      Vue.http.post('/api/tasks/', {task_name: taskname})
        .then((response) => {
          commit('closeModal')
          commit('getTasks')
        })
    },
    deleteTask ({ commit }, id) {
      var fullURL = '/api/tasks/' + id + '/'
      Vue.http.delete(fullURL)
        .then((response) => {
          commit('getTasks')
        })
    }
  }
})
