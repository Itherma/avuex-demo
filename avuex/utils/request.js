/**
 * @desc http请求封装
 * @author xzd
 * @update --
 */
import axios from 'axios'
import Vue from 'vue'

const BASE_URL = 'https://uat-jmsgw.jtexpress.com.cn'
const TIMEOUT_TIMES = 15

const self = new Vue()
// 中断请求白名单
const notCancelUrls = [
  'servicequality/imMessage/getToken',
  '/message/messageInfo/page',
  '/message/messageInfo/remind',
  '/message/messageInfo/confirm',
  '/message/messageInfo/sendError',
  '/message/messageInfo/add'
]
// 主系统忽略接口过滤列表
// if (process.env.VUE_APP_SYS_NAME === 'gateway') {
//   notCancelUrls = [
//     ...notCancelUrls,
//     '/message/messageInfo/page',
//     '/message/messageInfo/remind',
//     '/message/messageInfo/confirm',
//     '/message/messageInfo/sendError',
//     '/message/messageInfo/add'
//   ]
// }

let isto = true
// 创建axios实例
const service = axios.create()
// 设置请求的基础路径
// service.defaults.baseURL = BASE_URL + GATEWAY
service.defaults.baseURL = BASE_URL
// 超时时间
service.defaults.timeout = TIMEOUT_TIMES
// 定义请求的中断请求函数
const CancelToken = axios.CancelToken
// request拦截器
service.interceptors.request.use(
  config => {
    // 获取当前路由名称
    // 处理i18n接口的网关标识问题
    if (config.url.includes('/i18n/')) {
      config.baseURL = config.baseURL.replace('/jmsweb', '')
    }
    // 获取vuex的token
    const token = localStorage.getItem('YL_TOKEN')
    let lang = localStorage.getItem('lang')
    if (lang === 'CN') {
      lang = 'zh_CN'
    } else if (lang === 'EN') {
      lang = 'en_US'
    }
    config.data = config.data || {}
    // console.error('测试截图 request.use 1', systemName, process.env.VUE_APP_SYS_NAME, config.url, store.state.base.httpInstanceList)
    // 设置取消请求的方法
    config.cancelToken = new CancelToken(c => {
      // console.error('测试截图 add cancel 2', systemName, process.env.VUE_APP_SYS_NAME, config.url, store.state.base.httpInstanceList)
      //  interceptors可能是其他系统的，这里先不排除
      // if (systemName === process.env.VUE_APP_SYS_NAME) {
      // }
    })
    // 请求方法为post
    if (config.method === 'post') {
      // 根据post参数自动添加公用参数countryId
      typeof config.data === 'object' ? (config.data.countryId = '1') : (config.data += '&countryId=1')
      if (typeof config.data === 'object') {
        if (config.data['newData']) {
          config.data['newData'].countryId = '1'
          config.data['oldData'].countryId = '1'
        }
      }
    }
    // 获取参数中的菜单迁移复制的code标识
    const { moduleCode = '' } = router.history.current.query
    let routeName = router.history.current.name
    // 设置请求头authToken
    config.headers.authToken = token
    config.headers.lang = lang
    // 设置请求头routeName
    // if (config.url.includes('operatingplatform/scanList/page')) {
    // 标识存在
    if (moduleCode) {
      // 根据code标识拼接路由（此字段用于接口权限鉴权，需要与菜单配置的路由字段匹配上）
      routeName = `${routeName}|${moduleCode}`
    }
    // 把路由名称返写到请求头
    config.headers.routeName = routeName
    // if (!routeName) {

    // }
    // 判断是否是检车token的接口
    if (config.url.includes('/checkToken')) config.headers.routeName = 'checkToken'
    // 判断是否是公告接口
    // if (config.url.includes('notice/web/mainPage')) config.headers.routeName = 'NoticeCard'
    // 判断是否是公告接口
    // if (config.url.includes('notice/web/getBannerList')) config.headers.routeName = 'NoticeCard'
    //  设置了缓存，如果请求参数没变又要实时返回，请在请求后面加时间戳
    config.headers['Cache-Control'] = 'max-age=2, must-revalidate'
    // console.log('router', config.url, router.history.current.name, config.headers.routeName)
    // console.log(router)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 客户平台的处理方法
export const THD = '桃花岛'
export const PDD_TO_THD = str => str.replace(/(拼多多|PDD|PDd|Pdd|pDD|pDd|Pdd|pdd)/g, THD)
// 判断对象类型
export const getObjectType = o => Object.prototype.toString.call(o).slice(8, -1)
// 转换对象里面的拼多多字符
const getStr = o => {
  // 对象类型位ArrayBuffer直接返回
  if (getObjectType(o) === 'ArrayBuffer') return o
  const str = JSON.stringify(o)
  return JSON.parse(PDD_TO_THD(str))
}

// 需要修改字段
const changName = ['materialName', 'largeMaterialName', 'smallMaterialName', 'name', 'cnName']
// 判断类型
function isObjArr(value) {
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return 'Array'
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    return 'Object'
  }
}
// 批量修改方法
function changNameFun(originalData, changeData, originalName = '拼多多', changeName = '桃花岛') {
  var reg = new RegExp(originalName, 'g')
  if (isObjArr(originalData.data) === 'Object' && originalData.data.hasOwnProperty('records') && isObjArr(originalData.data.records) === 'Array') {
    for (var key of changName) {
      originalData.data.records.map(item => {
        if (item[key] && item[key].indexOf(originalName) === 0) {
          item[key] = item[key].replace(reg, changeName)
        }
      })
    }
  }
  if (isObjArr(originalData.data) === 'Object' && !originalData.data.hasOwnProperty('records')) {
    for (var keys of changName) {
      if (originalData.data[keys] && originalData.data[keys].indexOf(originalName) === 0) {
        originalData.data[keys] = originalData.data[keys].replace(reg, changeName)
      }
    }
  }
}
// respone拦截器
service.interceptors.response.use(
  response => {
    var systemName = location.pathname.split('/')[2] || ''
    // 请求状态码为200
    const disposition = response.headers['content-disposition']
    if (response.status === 200) {
      if (disposition) response.data['content-disposition'] = disposition
      var res = response.data
      if (systemName === 'integratedServicesIndex') {
        changNameFun(res, changName)
      }
      if (systemName === 'customerPlatformIndex') {
        res = getStr(res)
      }
      return res
    }
  },
  error => {
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes('timeout')) {
      self.$message.error('请求超时！')
      return Promise.reject(error)
    }
    if (error.response) {
      if (error.response.status === 401 && isto) {
        // token过期
        isto = false
        store.dispatch('setLogout').then(() => {
          self.$message.error('页面长时间未操作，请重新登录系统')
          // window.history.pushState(null, null, '/login');  //  跳不了。。。
          setTimeout(() => {
            // 退出
            localStorage.removeItem('account')
            window.location.href = window.location.origin + '/login'
          }, 3000)
          // window.RXGW.subject.next({
          //   target: ['gateway'],
          //   type: 'router',
          //   data: { to: { name: 'login' }}
          // });
        })
      } else if (error.response.status === 403 && isto) {
        isto = false
        self.$message.warning('页面未配置，请联系管理员并提供操作页面')
      } else if (error.response.status === 405 && isto) {
        isto = false
        self.$message.error('您的账号已在别处登录')
        store.dispatch('setLogout').then(() => {
          setTimeout(() => {
            // 退出
            localStorage.removeItem('account')
            window.location.href = window.location.origin + '/login'
          }, 3000)
          // window.RXGW.subject.next({
          //   target: ['gateway'],
          //   type: 'router',
          //   data: { to: { name: 'login' }}
          // });
        })
      }
      setTimeout(() => (isto = true), 500)
    }
    // 避免项目中对返回数据结构报异常
    return Promise.reject(error)
  }
)

service.paramsGet = function(url, params) {
  return service({
    method: 'get',
    url,
    params
  })
}
window.JMS_HTTP = service
export default window.JMS_HTTP
