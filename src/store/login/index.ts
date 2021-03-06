import type { Module } from 'vuex'
import type { IRootState } from '../types'
import type { ILoginState, IuserMenus } from './types'
import type { IAccount } from '@/service/login/types'
import router from '@/router'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
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
      userMenus: [],
      permissions: []
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

      // 存储按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    // 登录操作
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.调用登录接口
      const {
        data: { id, token }
      } = await accountLoginRequets(payload)
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化的请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

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
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
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
