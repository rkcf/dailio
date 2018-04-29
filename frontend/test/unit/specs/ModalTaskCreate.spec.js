import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import ModalTaskCreate from '@/components/ModalTaskCreate'
import ModalContainer from '@/components/ModalContainer'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate)

describe('ModalTaskCreate.vue', () => {
  let wrapper
  let actions
  let mutations
  let store

  beforeEach(() => {
    actions = {
      addTask: jest.fn()
    }

    mutations = {
      closeModal: jest.fn()
    }

    store = new Vuex.Store({
      actions,
      mutations
    })

    wrapper = mount(ModalTaskCreate, { localVue, store })
  })

  describe('mounted', () => {
    it('should mount ModalContainer child', () => {
      expect(wrapper.contains(ModalContainer)).toBeTruthy()
    })

    it('should have no task name validation errors at mount', () => {
      expect(wrapper.vm.errors.count()).toBe(0)
    })
  })

  describe('methods', () => {
    describe('close', () => {
      it('should clear the taskName', () => {
        wrapper.setData({taskName: 'taskname'})
        wrapper.find('#close-modal').trigger('click')
        expect(wrapper.vm.taskName).toBe('')
      })

      it('should call the closeModal mutation', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(mutations.closeModal).toHaveBeenCalled()
      })

      it('should reset the validator', async () => {
        wrapper.setData({taskName: ''})
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.count()).toBe(1)
        wrapper.find('#close-modal').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.count()).toBe(0)
      })
    })

    describe('validateTaskName', () => {
      it('should throw error if taskName is empty', async () => {
        let userinput = wrapper.find('input[name=taskName]')
        userinput.element.taskName = ''
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.has('taskName')).toBeTruthy()
      })

      it('should throw error if taskName is too logn', async () => {
        let passinput = wrapper.find('input[name=taskName]')
        passinput.element.taskName = 'a'.repeat(51)
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.has('taskName')).toBeTruthy()
      })

      it('should call store addTask dispatch if arguments are valid', async () => {
        wrapper.setData({taskName: 'taskname'})
        wrapper.find('form').trigger('submit')
        await flushPromises()
        expect(wrapper.vm.errors.count()).toBe(0)
        expect(actions.addTask).toHaveBeenCalled()
        expect(actions.addTask.mock.calls[0][1]).toBe('taskname')
      })
    })
  })
})
