import axios from 'axios'
import { Loading, Message } from 'element-ui'
// 开始动画
let loading = null
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中',
    background: 'rgba(0,0,0,0.7)'
  })
}
// 结束加载动画
function endLoading () {
  loading.close()
}
// 请求过期时间
axios.defaults.timeout = 5000
// 请求拦截
axios.interceptors.request.use(config => {
  startLoading()
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {
  endLoading()
  return response
}, error => {
  endLoading()
  Message.error(error.response.data)
  return Promise.reject(error)
})

export default function ajax (url = '', params = {}, type = 'GET') {
  let promise
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      let paramsStr = ''
      // 拼接请求字符串
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&'
      })
      // 处理最后一个&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      // 完整路径
      url += '?' + paramsStr
      promise = axios.get(url)
    } else if (type === 'POST') {
      promise = axios.post(url, params)
    }
    // 返回请求数据
    promise.then(reqponse => {
      resolve(reqponse.data)
    }).catch(error => {
      reject(error)
      Message({
        message: '数据库连接失败',
        type: 'error'
      })
    })
  })
}
