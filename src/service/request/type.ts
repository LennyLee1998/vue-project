import type { AxiosRequestConfig, AxiosResponse } from "axios"
// 针对AxiosRequestConfig配置进行扩展
export interface HYInterceptor<T = AxiosResponse> {
  // 拦截器里面的东西也应该有自己的类型
  requestSeccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig | any
  requestFailureFn?: (err: any) => any
  responseSeccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptor<T>
}
