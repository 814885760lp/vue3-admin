import type { ILoginState } from './login/types'
export interface IRootState {
  name: string
  age: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

interface IrootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IrootWithModule
