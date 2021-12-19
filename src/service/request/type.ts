import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface InterceptorHooks<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: T) => T
  reponseInterceptorCatch?: (error: any) => any
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks<T>
  showLoading?: boolean
}
