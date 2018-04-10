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
      // Close the modal by clearing the active modal module
      state.modalModule = ''
    },
    setModalModule (state, module) {
      // Set the active modal module
      state.modalModule = module
    },
    getTasks (state) {
      // Get a list of all tasks from the api
      Vue.http.get('/api/tasks/')
        .then((response) => {
          state.tasks = response.data
        })
    },
    setActiveTaskId (state, id) {
      // Set the active task id for use with modal modules
      state.activeTaskId = id
    }

  },
  actions: {
    addTask ({ commit }, taskname) {
      // Create a new task
      Vue.http.post('/api/tasks/', {task_name: taskname})
        .then((response) => {
          commit('closeModal')
          commit('getTasks')
        })
    },
    deleteTask ({ commit }, id) {
      // Delete a task given its id
      var fullURL = '/api/tasks/' + id + '/'
      Vue.http.delete(fullURL)
        .then((response) => {
          commit('getTasks')
        })
    },
    changeTaskName ({ commit }, { id, newName }) {
      // Change a task name with a PATCH
      var fullURL = '/api/tasks/' + id + '/'
      var payload = '{ "task_name": "' + newName + '" }'
      Vue.http.patch(fullURL, payload)
        .then((response) => {
          commit('getTasks')
        })
    },
    toggleTaskCompletion ({ commit, getters }, id) {
      var fullURL = '/api/tasks/' + id + '/'
      var newCompletionState = !getters.getTaskById(id).task_completed
      var payload = '{ "task_completed": "' + newCompletionState + '" }'
      Vue.http.patch(fullURL, payload)
        .then((response) => {
          commit('getTasks')
        })
    },
    openModal ({ commit }, module) {
      // Open the modal with a specific modal module
      commit('setModalModule', module)
    }
  },
  getters: {
    getTaskById: (state) => (id) => {
      // Return a single task from the array by id
      return state.tasks.find(task => task.task_id === id)
    }
  }
})
