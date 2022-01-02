import type { IDataType } from '@/service/types'
import axios from '@/service'

export function getPageListData(url: string, queryInfo: any) {
  return axios.post<IDataType>({
    url,
    data: queryInfo
  })
}
