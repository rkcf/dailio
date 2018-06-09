import { shallowMount, createLocalVue } from '@vue/test-utils'
import ModalContainer from '@/components/ModalContainer'

const localVue = createLocalVue()

describe('ModalContainer.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ModalContainer, { localVue })
  })

  describe('methods', () => {
    describe('closeModal', () => {
      it('should emit a close event on clicking close button', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(wrapper.emitted().close).toBeTruthy()
      })
      it('should emit a close event on clicking outside modal', () => {
        wrapper.find('#modal-container').trigger('click')
        expect(wrapper.emitted().close).toBeTruthy()
      })
    })
  })
})
