import Vue from 'vue'
import VueResource from 'vue-resource'
import orderBy from 'lodash.orderby'

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
  changeTaskName ({ dispatch, getters }, { id, taskName }) {
    // Change a task name with a PATCH
    var fullURL = '/api/tasks/' + id + '/'
    var payload = '{ "task_name": "' + taskName + '" }'
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
  updateTaskOrder ({ commit, getters }, newTasks) {
    // Send patches to change task order on backend
    return new Promise((resolve, reject) => {
      var oldTasks = getters.getTasks
      // Loop through tasks looking for changes
      for (var i = 0; i < newTasks.length; i++) {
        if (newTasks[i].task_id !== oldTasks[i].task_id) {
          // Send patch
          var fullURL = '/api/tasks/' + newTasks[i].task_id + '/'
          var payload = '{ "order": "' + i + '" }'
          Vue.http.patch(fullURL, payload, {headers: getters.getAuthHeader})
          newTasks[i].order = i
        }
      }
      // Return modified order task array so the state can be modified
      resolve(newTasks)
    })
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
  getTasks: (state) => {
    return orderBy(state.tasks, 'order')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
