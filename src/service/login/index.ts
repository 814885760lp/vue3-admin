import type { IAccount, ILoginResult } from './types'
import type { IDataType } from '../types'
import request from '../index'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

// 登录获取token
export function accountLoginRequets(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 获取用户信息
export function requestUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 获取用户菜单
export function requestUserMenusByRoleId(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
