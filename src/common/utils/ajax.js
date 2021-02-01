import axios from 'axios'
import { Message } from 'element-ui'
import MockConfig from '../../mock/index'
import rootVue from '@/main.js'
// import { path } from 'chromedriver'
// import { Message } from 'element-ui'
let protocol = window.location.protocol // 协议
let host = window.location.host // 主机
let reg = /^localhost+/
if (reg.test(host)) {
  // 若本地项目调试使用
  // axios.defaults.baseURL = 'http://175.24.11.167:8088'
} else {
  // 动态请求地址/协议/主机
  axios.defaults.baseURL = protocol + '//' + host + ':8082'
}
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://175.24.11.167:8088/'
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 发送请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('MockConfig', MockConfig)
    console.log('config.url', config.url)
    if (MockConfig[config.url]) {
      axios.defaults.baseURL = ''
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
      case 200:
        break
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
    console.log('error==拦截器', error)
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
    console.log('requestAPI-type', path, type)
    return axios.request({
      method: type,
      url: path,
      data,
      ...options
    })
  }
}
