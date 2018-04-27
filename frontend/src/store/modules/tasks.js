import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const state = {
  tasks: []
}

const mutations = {
  setTasks (state, tasks) {
    // Set the daily taskS
    state.tasks = tasks
  }
}

const actions = {
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
  }
}

const getters = {
  getTaskById: (state) => (id) => {
    // Return a single task from the array by id
    return state.tasks.find(task => task.task_id === id)
  },
  getAuthHeader: (state, rootState) => {
    return {'Authorization': 'Token ' + rootState.authToken}
  },
  getTasks: state => state.tasks
}

export default {
  state,
  mutations,
  actions,
  getters
}
