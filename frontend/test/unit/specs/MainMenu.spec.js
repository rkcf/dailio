import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import MainMenu from '@/components/MainMenu'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('MainMenu.vue', () => {
  let wrapper
  let store
  let actions

  beforeEach(() => {
    actions = {
      logout: jest.fn()
    }

    store = new Vuex.Store({ actions })

    wrapper = shallow(MainMenu,
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
  })
})
