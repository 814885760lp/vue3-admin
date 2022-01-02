import type { Store } from 'vuex'
import type { IRootState, IStoreType } from './types'
import { createStore, useStore as useVuexStore } from 'vuex'
import login from './login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: '18'
    }
  },
  mutations: {},
  actions: {},
  modules: { login, system }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
