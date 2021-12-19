import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import type { InterceptorHooks, RequestConfig } from './type'

const SHOW_LOADING = true

class Request {
  instance: AxiosInstance
  interceptorHooks?: InterceptorHooks
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptorHooks = config.interceptorHooks
    this.showLoading = config.showLoading ?? SHOW_LOADING

    // 用户传递进来的拦截器
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.reponseInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.reponseInterceptorCatch
    )

    // 所有axios实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局~请求成功拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (error) => {
        // console.log('全局~请求失败拦截器')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // console.log('全局~响应成功拦截器')
        this.loading?.close()
        return response.data
      },
      (error) => {
        // console.log('全局~响应失败拦截器')
        this.loading?.close()
        return error
      }
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 针对单个请求拦截器，将config传入拦截器执行拦截处理，返回的结果重写config实现拦截
      if (config.interceptorHooks?.requestInterceptor) {
        config = config.interceptorHooks.requestInterceptor(config)
      }
      // 针对单个请求设置loading，单个请求loading优先级高于单个实例loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 针对单个请求拦截器，将res传入拦截器执行拦截处理，返回的结果重写res实现拦截
          if (config.interceptorHooks?.responseInterceptor) {
            res = config.interceptorHooks.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          // 单个请求设置独立的showLoading后，需要恢复默认，不然影响下次请求loading状态
          this.showLoading = SHOW_LOADING
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
