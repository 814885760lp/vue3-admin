import type { RouteRecordRaw } from 'vue-router'
import type { IuserMenus } from '@/store/login/types'

export function mapMenusToRoutes(userMenus: IuserMenus[]): RouteRecordRaw[] {
  // 返回的用户权限路由
  const routes: RouteRecordRaw[] = []
  // 所有路由
  const allRoutes: RouteRecordRaw[] = []
  // 获取到所有路由
  const routeFiles = require.context('/src/router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // type是2的路由菜单才添加其url对应的路由，有子级的递归处理
  const _recurseGetRoute = (userMenus: IuserMenus[]) => {
    for (const menu of userMenus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children || [])
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
