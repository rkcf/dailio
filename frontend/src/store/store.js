import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'
import accounts from './modules/accounts'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks, // state related to tasks
    accounts, // state related to user accounts
    modal // state related to modal popups
  }
})
