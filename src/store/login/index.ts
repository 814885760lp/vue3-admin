import type { IRootState } from '../types'
import type { ILoginState } from './types'
import type { IAccount } from '@/service/login/types'
import { Module } from 'vuex'
import localCache from '@/utils/cache'
import router from '@/router'

import {
  accountLoginRequets,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    // 登录操作
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.调用登录接口
      const {
        data: { id, token }
      } = await accountLoginRequets(payload)
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.调用用户信息接口
      const { data: userInfo } = await requestUserInfoById(id)
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const { data: userMenus } = await requestUserMenusByRoleId(
        userInfo.role.id
      )
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    // 页面刷新时回显数据到vuex
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
