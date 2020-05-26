// axios 拦截器
import Axios from 'axios'
import { Message } from 'element-ui'

// 创建一个axios实例对象
const instance = Axios.create({
  // baseURL: process.baseURL.NODE_ENV === 'production' ? '/' :
  baseURL: 'http://localhost:8888/api/private/v1'
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  res => {
    if (res.data.meta.status !== 200) {
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  },
  error => {
    Message.error('服务器错误，请稍后再试！')
    return Promise.reject(error)
  }
)
export default instance
