import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import type { HYRequestConfig } from "./type"

// 拦截器: 在每次网络请求的时候进行拦截, 拦截的时候在界面上显示蒙版Loading/token/修改配置

class HYRequest {
  instance: AxiosInstance
  // request实例 => axios的实例, 也就是一个request的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 可以对config进行修改
        // config.headers = {
        //   token: "xxx"
        // }
        // loading/token
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 可以添加多个拦截器,前面的不会被后面的覆盖
    // if (config.interceptors) { //类型缩小
    //   this.instance.interceptors.request.use(
    //     config.interceptors.requestSeccessFn,
    //     config.interceptors.requestFailureFn),
    //   this.instance.interceptors.response.use(
    //     config.interceptors.responseSeccessFn,
    //     config.interceptors.responseFailureFn)
    // }
    //通过可选链去取
    this.instance.interceptors.request.use(
      config.interceptors?.requestSeccessFn,
      config.interceptors?.requestFailureFn
    ),
      this.instance.interceptors.response.use(
        config.interceptors?.responseSeccessFn,
        config.interceptors?.responseFailureFn
      )
  }
  // 封装网络请求的方法
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理(自己手动处理,而不是axios处理)
    if (config.interceptors?.requestSeccessFn) {
      // 如果在这个里面有修改新的config,就重新拿到新的config
      // 要自己手动去调用
      config = config.interceptors.requestSeccessFn(config)
    }

    // 返回Promise
    // 这里不能知道什么时候网络请求得到数据, 可以创建一个promise实例, 来对数据的resolve和reject进行控制
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截处理
          if (config.interceptors?.responseSeccessFn) {
            res = config.interceptors.responseSeccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" })
  }
}

export default HYRequest
