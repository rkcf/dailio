import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import CardContainer from '@/components/CardContainer'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('CardContainer.vue', () => {
  let wrapper
  let store
  let actions
  let getters

  beforeEach( () => {
    actions = {
      getTasks: jest.fn(),
      openModal: jest.fn()
    }

    getters = {
      setActiveTaskId: jest.fn(),
      getTasks: jest.fn()
    }

    store = new Vuex.Store({
      actions,
      getters
    })

    wrapper = shallow(CardContainer,
      { store,
        localVue
      })
  })

  describe('mounted', () => {
    it('should call store to get array of tasks', () => {
      expect(actions.getTasks).toHaveBeenCalled()
    })
  })

  describe('computed', () => {
    it('should call store get get task array', () => {
      expect(getters.getTasks).toHaveBeenCalled()
    })
  })

  describe('methods', () => {
    describe('openTaskCreate', () => {
      it('should call store openModal dispatch', () => {
        wrapper.find('#task-create-btn').trigger('click')
        expect(actions.openModal).toHaveBeenCalled()
      })
    })
  })
})

