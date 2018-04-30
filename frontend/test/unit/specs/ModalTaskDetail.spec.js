import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import ModalTaskDetail from '@/components/ModalTaskDetail'
import ModalContainer from '@/components/ModalContainer'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate)

describe('ModalTaskDetail.vue', () => {
  let wrapper
  let actions
  let mutations
  let getters
  let state
  let store

  beforeEach(() => {
    actions = {
      changeTaskName: jest.fn(),
      deleteTask: jest.fn()
    }

    mutations = {
      closeModal: jest.fn()
    }

    getters = {
      getTaskById: (state) => (id) => {
        return {task_name: 'taskname', task_id: 1, completion_dates: 'date'}
      },
      getActiveTaskId: jest.fn()
    }

    store = new Vuex.Store({
      actions,
      mutations,
      getters,
      state
    })

    wrapper = mount(ModalTaskDetail, {
      localVue,
      store
    })
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
      it('should clear the newName', () => {
        wrapper.setData({newName: 'taskname'})
        wrapper.find('#close-modal').trigger('click')
        expect(wrapper.vm.newName).toBe('')
      })

      it('should call the closeModal mutation', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(mutations.closeModal).toHaveBeenCalled()
      })

      it('should reset the validator', async () => {
        wrapper.setData({newName: ''})
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.count()).toBe(1)
        wrapper.find('#close-modal').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.count()).toBe(0)
      })

      it('should set editTask to false', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(wrapper.vm.editTask).toBeFalsy()
      })

      it('should set confirmDelete to false', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(wrapper.vm.editTask).toBeFalsy()
      })
    })

    describe('showEdit', () => {
      it('should set editTask to true', () => {
        wrapper.find('#edit-btn[text=edit]').trigger('click')
        expect(wrapper.vm.editTask).toBeTruthy()
      })

      it('should show the edit-task div', () => {
        wrapper.find('#edit-btn[text=edit]').trigger('click')
        expect(wrapper.find('#edit-task').isVisible()).toBeTruthy()
      })

      it('should hide the task detail div', () => {
        wrapper.find('#edit-btn[text=edit]').trigger('click')
        expect(wrapper.find('#task-detail').isVisible()).toBeFalsy()
      })
    })

    describe('cancleEdit', () => {
      beforeEach(() => {
        wrapper.vm.editTask = true
      })

      it('should clear the newName', () => {
        wrapper.setData({newName: 'taskname'})
        wrapper.find('#edit-btn[text=cancel]').trigger('click')
        expect(wrapper.vm.newName).toBe('')
      })

      it('should set editTask to false', () => {
        wrapper.find('#edit-btn[text=cancel]').trigger('click')
        expect(wrapper.vm.editTask).toBeFalsy()
      })

      it('should hide the edit-task div', () => {
        wrapper.find('#edit-btn[text=cancel]').trigger('click')
        expect(wrapper.find('#edit-task').isVisible()).toBeFalsy()
      })

      it('should show the task detail div', () => {
        wrapper.find('#edit-btn[text=cancel]').trigger('click')
        expect(wrapper.find('#task-detail').isVisible()).toBeTruthy()
      })
    })

    describe('validateTaskName', () => {
      it('should throw error if newName is empty', async () => {
        let nameInput = wrapper.find('input[name=newName]')
        nameInput.element.newName = ''
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.has('newName')).toBeTruthy()
      })

      it('should throw error if newName is too long', async () => {
        let nameInput = wrapper.find('input[name=newName]')
        nameInput.element.newName = 'a'.repeat(51)
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.has('newName')).toBeTruthy()
      })

      it('should call store changeTaskName dispatch if newName is valid', async () => {
        wrapper.setData({newName: 'taskname'})
        wrapper.find('form').trigger('submit')
        await flushPromises()
        expect(wrapper.vm.errors.count()).toBe(0)
        expect(actions.changeTaskName).toHaveBeenCalled()
        expect(actions.changeTaskName.mock.calls[0][1]).toEqual(
          {id: 1, newName: 'taskname'}
        )
      })
    })

    describe('deleteTask', () => {
      beforeEach(() => {
        wrapper.setData({confirmDelete: true, editTask: true})
      })

      it('should call store closeModal mutation', () => {
        wrapper.find('#delete-btn').trigger('click')
        expect(mutations.closeModal).toHaveBeenCalled()
      })

      it('should call store deleteTask dispatch', () => {
        wrapper.find('#delete-btn').trigger('click')
        expect(actions.deleteTask).toHaveBeenCalled()
        expect(actions.deleteTask.mock.calls[0][1]).toEqual(1)
      })

      it('should set confirmDelete to false', () => {
        wrapper.find('#delete-btn').trigger('click')
        expect(wrapper.confirmDelete).toBeFalsy()
      })
    })
  })
})
