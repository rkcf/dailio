import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import TaskCard from '@/components/TaskCard'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('TaskCard.vue', () => {
  let wrapper
  let store
  let actions
  let mutations

  beforeEach( () => {
    actions = {
      toggleTaskCompletion: jest.fn(),
      openModal: jest.fn()
    }

    mutations = {
      setActiveTaskId: jest.fn()
    }

    store = new Vuex.Store({
      state: {
        tasks: [{
          task_name: 'test',
          task_id: 1,
          task_streak: 2
        }]
      },
      actions,
      mutations
    })

    wrapper = shallow(TaskCard,
      { propsData: {task: store.state.tasks[0]},
        store,
        localVue
      })
  })

  describe('#mounted', () => {
    it('should render task name', () => {
      const header = wrapper.find('.card-content h3')
      expect(header.text()).toBe('test')
    })
  })

  describe('methods', () => {
    describe('toggleTaskCompletion', () => {
      it('should call store toggleTaskCompletion dispatch', () => {
        wrapper.find('.complete-btn').trigger('click')
        expect(actions.toggleTaskCompletion).toHaveBeenCalled()
      })
    })

    describe('showTaskDetail', () => {
      it('should commit to the setActiveTaskId', () => {
        wrapper.find('.detail-btn').trigger('click')
        expect(mutations.setActiveTaskId).toHaveBeenCalled()
      })
      it('should call store openModal dispatch', () => {
        wrapper.find('.detail-btn').trigger('click')
        expect(actions.openModal).toHaveBeenCalled()
      })
    })
  })
})

