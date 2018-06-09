import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App'
import sessionStorage from 'jest-localstorage-mock'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App.vue', () => {
  let wrapper
  let store
  let actions
  let mutations
  let getters

  beforeEach(() => {
    actions = {
      openModal: jest.fn()
    }

    getters = {
      loggedIn: jest.fn(),
      showModal: jest.fn()
    }

    mutations = {
      setAuthToken: jest.fn()
    }

    store = new Vuex.Store({
      actions,
      mutations,
      getters
    })

    wrapper = shallowMount(App,
      { store,
        localVue
      })
  })

  describe('created', () => {
    it('should dispaly header title', () => {
      expect(wrapper.find('#title').isVisible()).toBeTruthy()
    })

// TODO test for token sessionStorage access
//    it('should set store authToken if one is found in sessionStorage', async () => {
//      sessionStorage.__STORE__ = {token: 'token'}
//      expect(mutations.setAuthToken).toHaveBeenCalled()
//    })

    it('should call store loggedIn getter', () => {
      expect(getters.loggedIn).toHaveBeenCalled()
    })

    it('should call store showModal getter', () => {
      expect(getters.showModal).toHaveBeenCalled()
    })
  })

  describe('methods', () => {
    describe('toggleMenu', () => {
      it('should show menu when the menu button is clicked', () => {
        wrapper.find('#menu-btn').trigger('click')
        expect(wrapper.vm.showMenu).toBeTruthy()
      })
      it('should hide menu when the menu button is clicked again', () => {
        wrapper.find('#menu-btn').trigger('click')
        wrapper.find('#menu-btn').trigger('click')
        expect(wrapper.vm.showMenu).toBeFalsy()
      })
    })
  })
})
