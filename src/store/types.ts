import type { ILoginState } from './login/types'
export interface IRootState {
  name: string
  age: string
}

interface IrootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IrootWithModule
