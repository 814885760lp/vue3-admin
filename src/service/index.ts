import Request from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'

const axios = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptorHooks: {
    requestInterceptor(config) {
      // console.log('实例~请求成功拦截器')
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(config) {
      // console.log('实例~请求错误拦截器')
      return config
    },
    responseInterceptor(config) {
      // console.log('实例~响应成功拦截器')
      return config
    },
    reponseInterceptorCatch(config) {
      // console.log('实例~响应错误拦截器')
      return config
    }
  }
})

export default axios
