import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    modalModule: '',
    tasks: [],
    activeTaskId: '',
    authToken: ''
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
      Vue.http.get('/api/tasks/', {headers: {'Authorization': state.authToken}})
        .then((response) => {
          state.tasks = response.data
        })
    },
    setActiveTaskId (state, id) {
      // Set the active task id for use with modal modules
      state.activeTaskId = id
    },
    setAuthToken (state, token) {
      state.authToken = 'Token ' + token
      sessionStorage.setItem('token', token)
    }
  },
  actions: {
    addTask ({ commit, state }, taskname) {
      // Create a new task
      Vue.http.post('/api/tasks/', {task_name: taskname}, {headers: {'Authorization': state.authToken}})
        .then((response) => {
          commit('closeModal')
          commit('getTasks')
        })
    },
    deleteTask ({ commit, state }, id) {
      // Delete a task given its id
      var fullURL = '/api/tasks/' + id + '/'
      Vue.http.delete(fullURL, {headers: {'Authorization': state.authToken}})
        .then((response) => {
          commit('getTasks')
        })
    },
    changeTaskName ({ commit, state }, { id, newName }) {
      // Change a task name with a PATCH
      var fullURL = '/api/tasks/' + id + '/'
      var payload = '{ "task_name": "' + newName + '" }'
      Vue.http.patch(fullURL, payload, {headers: {'Authorization': state.authToken}})
        .then((response) => {
          commit('getTasks')
        })
    },
    toggleTaskCompletion ({ commit, getters, state }, id) {
      // Will send a PUT/DELETE to the /done/ endpoint to change task completion state
      var fullURL = '/api/tasks/' + id + '/done/'
      var taskCompletionState = getters.getTaskById(id).task_completed
      if (taskCompletionState) {
        Vue.http.delete(fullURL, {headers: {'Authorization': state.authToken}})
          .then((response) => {
            commit('getTasks')
          })
      } else {
        Vue.http.put(fullURL, {}, {headers: {'Authorization': state.authToken}})
          .then((response) => {
            commit('getTasks')
          })
      }
    },
    openModal ({ commit }, module) {
      // Open the modal with a specific modal module
      commit('setModalModule', module)
    },
    login ({ commit }, {username, password}) {
      Vue.http.post('/account/login/', {'username': username, 'password': password})
        .then((response) => {
          commit('setAuthToken', response.data.key)
        })
    }
  },
  getters: {
    getTaskById: (state) => (id) => {
      // Return a single task from the array by id
      return state.tasks.find(task => task.task_id === id)
    }
  }
})
