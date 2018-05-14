import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const state = {
  authToken: '',
  loginError: '', // error messages associated with login error
  loggedIn: false
}

const mutations = {
  setAuthToken (state, token) {
    // Set the auth token in the vuex state and browser session storage
    state.authToken = token
    sessionStorage.setItem('token', token)
    state.loggedIn = true
  },
  setLoginError (state, error) {
    // Sets the message for login fails
    state.loginError = error
  },
  logout (state) {
    state.loggedIn = false
    sessionStorage.removeItem('token')
  },
  login (state) {
    state.loggedIn = true
  }
}

const actions = {
  login ({ commit }, {username, password}) {
    // Login user over API, returns auth token
    Vue.http.post('/account/login/', {'username': username, 'password': password})
      .then((response) => {
        commit('setAuthToken', response.data.key) // set authToken and loggedIn
        commit('setLoginError', '') // clear out login error
      }, response => {
        commit('setLoginError', response.data.non_field_errors[0])
      })
  },
  logout ({ commit, getters }) {
    // Logout user over API
    Vue.http.post('/account/logout/', {}, {headers: getters.getAuthHeader})
      .then((response) => {
        commit('setAuthToken', '')
        commit('logout')
      }, response => {
        // error callback
        if (response.status === 401) {
          alert('Authorization Error\nLogging out...')
          commit('logout')
        }
      })
  }
}

const getters = {
  authToken: state => state.authToken,
  loggedIn: state => state.loggedIn,
  loginError: state => state.loginError
}

export default {
  state,
  mutations,
  actions,
  getters
}
