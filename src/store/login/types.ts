export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: any
}
export interface IuserMenus {
  children?: IuserMenus[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}
