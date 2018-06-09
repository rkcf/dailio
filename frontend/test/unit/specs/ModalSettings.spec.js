import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ModalSettings from '@/components/ModalSettings'
import ModalContainer from '@/components/ModalContainer'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ModalSettings.vue', () => {
  let wrapper
  let mutations
  let actions
  let store

  beforeEach(() => {
    mutations = {
      closeModal: jest.fn()
    }

    actions = {
      getAccountSettings: jest.fn(),
      toggleVacationState: jest.fn()
    }

    store = new Vuex.Store({
      mutations,
      actions
    })

    wrapper = mount(ModalSettings, { localVue, store })
  })

  describe('mounted', () => {
    it('should mount ModalContainer child', () => {
      expect(wrapper.contains(ModalContainer)).toBeTruthy()
    })

    it('should dispatch getAccountSettings', () => {
      expect(actions.getAccountSettings).toHaveBeenCalled()
    })
  })

  describe('computed', () => {
    describe('vacationSate', () => {
      it('should call toggleVacationState dispatch upon checkbock click', () => {
        wrapper.find('#vacationCheck').trigger('click')
        expect(actions.toggleVacationState).toHaveBeenCalled()
      })
    })
  })

  describe('methods', () => {
    describe('close', () => {
      it('should call the closeModal mutation', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(mutations.closeModal).toHaveBeenCalled()
      })
    })
  })
})
