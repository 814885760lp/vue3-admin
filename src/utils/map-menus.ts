import type { RouteRecordRaw } from 'vue-router'
import type { IuserMenus } from '@/store/login/types'
import type { IBreadcrumb } from '@/base-ui/breadcrumb'

/**
 * 根据后端返回的菜单列表及用户角色，返回对应菜单路由列表
 * @param userMenus
 * @returns 路由
 */
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

/**
 *
 * @param userMenus 用户菜单
 * @param currentPath 当前路由url
 * @returns 面包屑列表
 */
export function pathMapToBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

/**
 *
 * @param userMenus 用户菜单
 * @param currentPath 当前路由url
 * @param breadcrumbs 面包屑
 * @returns 当前路由url去用户菜单中匹配到的菜单项
 */
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.path })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.path })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}
