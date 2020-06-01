import axios from 'axios'

//
const instance = axios.create({
  baseURL: 'https://m.maizuo.com', // 基本的url
  // timeout: 3000, // 延时3秒
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15587791402160368550306","bc":"310100"}'
  } // 请求头
})

// 针对于上线的 http://47.96.0.211:3000
const instance2 = axios.create({
  baseURL: '/info'
})

// 请求之前的拦截操作
instance2.interceptors.request.use(
  config => {
    // console.log('config', config)
    if (localStorage.getItem('token')) { // 假如token存在
      config.headers.token = localStorage.getItem('token')
    }
    return config
  }
)

// 响应之后的拦截操作
instance2.interceptors.response.use(
  res => {
    // console.log('res', res)
    if (res.data.err === 0) { // 说明后端给的数据没问题
      return res.data
    } else {
      return Promise.reject(res.data.msg)
    }
  })

export { instance, instance2 }
