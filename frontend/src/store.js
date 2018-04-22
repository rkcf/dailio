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
    authToken: '',
    loginError: ''
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
    setActiveTaskId (state, id) {
      // Set the active task id for use with modal modules
      state.activeTaskId = id
    },
    setAuthToken (state, token) {
      // Set the auth token in the vuex state and browser session storage
      state.authToken = token
      sessionStorage.setItem('token', token)
    },
    setTasks (state, tasks) {
      // Set the daily taskS
      state.tasks = tasks
    },
    setLoginError (state, error) {
      // Sets the message for login fails
      state.loginError = error
    }
  },
  actions: {
    getTasks ({ commit, getters }) {
      // Get a list of all tasks from the api
      Vue.http.get('/api/tasks/', {headers: getters.getAuthHeader})
        .then((response) => {
          commit('setTasks', response.data)
        })
    },
    addTask ({ commit, dispatch, getters }, taskname) {
      // Create a new task
      Vue.http.post('/api/tasks/', {task_name: taskname}, {headers: getters.getAuthHeader})
        .then((response) => {
          commit('closeModal')
          dispatch('getTasks')
        })
    },
    deleteTask ({ dispatch, getters }, id) {
      // Delete a task given its id
      var fullURL = '/api/tasks/' + id + '/'
      Vue.http.delete(fullURL, {headers: getters.getAuthHeader})
        .then((response) => {
          dispatch('getTasks')
        })
    },
    changeTaskName ({ dispatch, getters }, { id, newName }) {
      // Change a task name with a PATCH
      var fullURL = '/api/tasks/' + id + '/'
      var payload = '{ "task_name": "' + newName + '" }'
      Vue.http.patch(fullURL, payload, {headers: getters.getAuthHeader})
        .then((response) => {
          dispatch('getTasks')
        })
    },
    toggleTaskCompletion ({ dispatch, getters }, id) {
      // Will send a PUT/DELETE to the /done/ endpoint to change task completion state
      var fullURL = '/api/tasks/' + id + '/done/'
      var taskCompletionState = getters.getTaskById(id).task_completed
      if (taskCompletionState) {
        Vue.http.delete(fullURL, {headers: getters.getAuthHeader})
          .then((response) => {
            dispatch('getTasks')
          })
      } else {
        Vue.http.put(fullURL, {}, {headers: getters.getAuthHeader})
          .then((response) => {
            dispatch('getTasks')
          })
      }
    },
    openModal ({ commit }, module) {
      // Open the modal with a specific modal module
      commit('setModalModule', module)
    },
    login ({ commit }, {username, password}) {
      // Login user over API, returns auth token
      Vue.http.post('/account/login/', {'username': username, 'password': password})
        .then((response) => {
          commit('setAuthToken', response.data.key)
          commit('setLoginError', '')
        }, response => {
          commit('setLoginError', response.data.non_field_errors[0])
        })
    },
    logout ({ commit, getters }) {
      // Logout user over API
      Vue.http.post('/account/logout/', {}, {headers: getters.getAuthHeader})
        .then((response) => {
          commit('setAuthToken', '')
        })
    }
  },
  getters: {
    getTaskById: (state) => (id) => {
      // Return a single task from the array by id
      return state.tasks.find(task => task.task_id === id)
    },
    getAuthHeader: (state) => {
      return {'Authorization': 'Token ' + state.authToken}
    }
  }
})
