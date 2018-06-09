import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainMenu from '@/components/MainMenu'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('MainMenu.vue', () => {
  let wrapper
  let store
  let actions

  beforeEach(() => {
    actions = {
      logout: jest.fn(),
      openModal: jest.fn()
    }

    store = new Vuex.Store({ actions })

    wrapper = shallowMount(MainMenu,
      { store,
        localVue
      })
  })

  describe('methods', () => {
    describe('logout', () => {
      it('should call store logout dispatch', () => {
        wrapper.find('#logout-btn').trigger('click')
        expect(actions.logout).toHaveBeenCalled()
      })

      it('should emit closeMenu', () => {
        wrapper.find('#logout-btn').trigger('click')
        expect(wrapper.emitted().closeMenu).toBeTruthy()
      })
    })

    describe('openSettings', () => {
      it('should emit closeMenu', () => {
        wrapper.find('#settings-btn').trigger('click')
        expect(wrapper.emitted().closeMenu).toBeTruthy()
      })

      it('should call store openModal action', () => {
        wrapper.find('#settings-btn').trigger('click')
        expect(actions.openModal).toHaveBeenCalled()
        expect(actions.openModal.mock.calls[0][1]).toEqual('settings')
      })
    })
  })
})
