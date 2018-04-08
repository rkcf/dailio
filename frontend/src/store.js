import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    modalModule: '',
    tasks: [],
    activeTaskId: ''
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
    setActiveTaskId (state, id) {
      state.activeTaskId = id
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
    changeTaskName ({ commit }, { id, newName }) {
      var fullURL = '/api/tasks/' + id + '/'
      var payload = '{ "task_name": "' + newName + '" }'
      Vue.http.patch(fullURL, payload)
        .then((response) => {
          commit('getTasks')
        })
    },
    openModal ({ commit }, module) {
      commit('setModalModule', module)
    }
  },
  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find(task => task.task_id === id)
    }
  }
})
