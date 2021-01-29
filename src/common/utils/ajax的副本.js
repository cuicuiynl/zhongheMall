import axios from 'axios'
// import { Message } from 'element-ui';

axios.defaults.withCredentials = true
// 创建axios实例
var service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  // 每次请求携带cookie
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'token': '14a1347f412b319b0fef270489f'
  }
})
// 2.请求拦截器
// service.interceptors.request.use(config => {
// //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
//     config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
//     config.headers = {
//     'Content-Type':'application/x-www-form-urlencoded' //配置请求头
//     }
//     //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
//     const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
//     if(token){
//     config.params = {'token':token} //如果要求携带在参数中
//     config.headers.token= token; //如果要求携带在请求头中
//     }
// return config
// }, error => {
// Promise.reject(error)
// })
export default {
  service,
  // get请求
  get (url, data) {
    return service({
      url: url,
      method: 'get',
      data
    })
  },
  post (url, data) {
    return service({
      url: url,
      method: 'post',
      data
    })
  },
  download (url, param) {
    return new Promise((resolve, reject) => {
      axios.post(url, param, {
        'responseType': 'blob' // 设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
      }).then(function (response) {
        const blob = new Blob([response.data])
        const fileName = Math.floor(Math.random() * 1000000000) + '.xlsx'
        const linkNode = document.createElement('a')

        linkNode.download = fileName // a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none'
        linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
        document.body.appendChild(linkNode)
        linkNode.click() // 模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href) // 释放URL 对象
        document.body.removeChild(linkNode)
        resolve(response.data)
      }).catch(function (error) {
        console.log(error)
        resolve(error)
      })
    })
  }
}
