import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import ModalLogin from '@/components/ModalLogin'
import ModalContainer from '@/components/ModalContainer'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate)

describe('ModalLogin.vue', () => {
  let wrapper
  let actions
  let mutations
  let store

  beforeEach(() => {
    actions = {
      login: jest.fn()
    }

    mutations = {
      closeModal: jest.fn()
    }

    store = new Vuex.Store({
      actions,
      mutations
    })

    wrapper = mount(ModalLogin, { localVue, store })
  })

  describe('mounted', () => {
    it('should mount ModalContainer child', () => {
      expect(wrapper.contains(ModalContainer)).toBeTruthy()
    })

    it('should have no login errors at mount', () => {
      expect(wrapper.vm.errors.count()).toBe(0)
    })
  })

  describe('methods', () => {
    describe('close', () => {
      it('should clear the username and pasword', () => {
        wrapper.setData({username: 'user', password: 'pass'})
        wrapper.find('#close-modal').trigger('click')
        expect(wrapper.vm.username).toBe('')
        expect(wrapper.vm.password).toBe('')
      })

      it('should call the closeModal mutation', () => {
        wrapper.find('#close-modal').trigger('click')
        expect(mutations.closeModal).toHaveBeenCalled()
      })

      it('should reset the validator', async () => {
        wrapper.setData({username: '', password: ''})
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.count()).toBe(2)
        wrapper.find('#close-modal').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.count()).toBe(0)
      })
    })

    describe('validateLogin', () => {
      it('should throw error if username is empty', async () => {
        let userinput = wrapper.find('input[name=username]')
        userinput.element.username = ''
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.has('username')).toBeTruthy()
      })

      it('should throw error if password is empty', async () => {
        let passinput = wrapper.find('input[name=password]')
        passinput.element.password = ''
        wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.errors.has('password')).toBeTruthy()
      })

      it('should call store login dispatch if arguments are valid', async () => {
        wrapper.setData({username: 'user', password: 'pass'})
        wrapper.find('form').trigger('submit')
        await flushPromises()
        expect(wrapper.vm.errors.count()).toBe(0)
        expect(actions.login).toHaveBeenCalled()
      })
    })
  })
})
