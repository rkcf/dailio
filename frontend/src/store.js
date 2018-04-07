import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    modalModule: '',
    tasks: [],
    activeTask: ''
  },
  mutations: {
    closeModal (state) {
      state.modalModule = ''
    },
    setModalModule (state, module) {
      state.modalModule = module
    },
    getTasks (state) {
      Vue.http.get('/api/tasks/')
        .then((response) => {
          state.tasks = response.data
        })
    },
    setActiveTask (state, task) {
      state.activeTask = task
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
    },
    getTask ({ commit }, id) {
      var fullURL = '/api/tasks/' + id + '/'
      Vue.http.get(fullURL)
        .then((response) => {
          commit('setActiveTask', response.data)
        })
    },
    openModal ({ commit }, module) {
      commit('setModalModule', module)
    }
  }
})
