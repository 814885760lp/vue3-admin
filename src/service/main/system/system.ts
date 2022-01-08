import type { IDataType } from '@/service/types'
import axios from '@/service'

export function getPageListData(url: string, queryInfo: any) {
  return axios.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageList(url: string) {
  return axios.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return axios.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return axios.patch<IDataType>({
    url: url,
    data: editData
  })
}
