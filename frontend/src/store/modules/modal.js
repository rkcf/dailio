const state = {
  modalModule: '', // name of the active modal module
  activeTaskId: '' // id of task to use in detail view
}

const mutations = {
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
  }
}

const actions = {
  openModal ({ commit }, module) {
    // Open the modal with a specific modal module
    commit('setModalModule', module)
  }
}

const getters = {
  showModal: state => state.modalModule,
  getActiveTaskId: state => state.activeTaskId
}

export default {
  state,
  mutations,
  actions,
  getters
}
