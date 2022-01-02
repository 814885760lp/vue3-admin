import type { Module } from 'vuex'
import type { IRootState } from '../types'
import type { ILoginState, IuserMenus } from './types'
import type { IAccount } from '@/service/login/types'
import router from '@/router'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
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
    changeUserMenus(state, userMenus: IuserMenus[]) {
      state.userMenus = userMenus

      // 获取到用户菜单后动态注册路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
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

      // 4.跳转首页
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
