import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ModalSettings from '@/components/ModalSettings'
import ModalContainer from '@/components/ModalContainer'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ModalSettings.vue', () => {
  let wrapper
  let mutations
  let store

  beforeEach(() => {
    mutations = {
      closeModal: jest.fn()
    }

    store = new Vuex.Store({
      mutations
    })

    wrapper = mount(ModalSettings, { localVue, store })
  })

  describe('mounted', () => {
    it('should mount ModalContainer child', () => {
      expect(wrapper.contains(ModalContainer)).toBeTruthy()
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
