import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const perssions = store.state.login.permission

  const verifyPerssion = `system:${pageName}:${handleName}`

  return !!perssions.find((item: string) => item === verifyPerssion)
}
