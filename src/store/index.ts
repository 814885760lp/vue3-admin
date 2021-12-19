import { createStore } from 'vuex'
import login from './login'
import type { IRootState } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: '18'
    }
  },
  mutations: {},
  actions: {},
  modules: { login }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
