import axios from 'axios'
import { Message } from 'element-ui'
import MockConfig from '../../mock/index'
import rootVue from '@/main.js'
// import { path } from 'chromedriver'
// import { Message } from 'element-ui'

axios.defaults.withCredentials = true
axios.defaults.baseURL = ''
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 发送请求拦截器
axios.interceptors.request.use(
  config => {
    if (MockConfig[config.url]) {
      config.url = MockConfig[config.url]
      config.method = 'GET'
      return config
    }
    config.headers.SESSION = ''
    return config
  },
  error => {
    Message({
      showClose: true,
      message: '请求超时',
      type: 'warning'
    })
    return Promise.reject(error)
  }
)
// 数据返回拦截器
axios.interceptors.response.use(
  res => {
    switch (res.data.responseCode) {
      case '10005':
        Message({
          showClose: true,
          message: '您当前登陆超时或异常，请重新登陆'
        })
        rootVue.$store.commit('userInfo', { loginFlag: false })
        break
      default:
        Message({
          showClose: true,
          message: res.data.responseMessage
        })
    }
    // return Promise.resolve(res.data)
    if (res.data && res.data.responseCode) {
      if (res.data && !res.data.data) {
        res.data.data = ''
      }
      return res.data
    } else {
      return res
    }
  },
  error => {
    debugger
    Message({
      showClose: true,
      message: '请求超时',
      type: 'warning'
    })
    return Promise.reject(error)
  }
)

export default{
  requestAPI (path, data = {}, type = 'post', options = {}) {
    return axios.request({
      method: type,
      url: path,
      data,
      ...options
    })
  }
}
