import axios from 'axios'
import { Message } from 'element-ui'
import { cacheHelper } from './cacheHelper'

// element =>  支持单例
class HttpRequest {
  constructor() {
    this.baseURL = 'http://test-jmsgw.jms.com';
    this.timeout = 5000;
    // loading 需要加
    this.queue = {}; // 专门用来维护请求队列的  {/:true}
    // 页面切换 我需要取消请求
  }

  setInterceptor(instance, url, routeName) {
    instance.interceptors.request.use((config) => {
      // 开启loading  自己找个地方显示
      if (Object.keys(this.queue).length === 0) { // a -> 显示loading  -》 马上关闭了  2-》  显示loading
        // 开loading
      }
      const token = cacheHelper.get('token');
      if (token) {
        // 每次请求都会携带一个 权限访问服务器
        config.headers.authToken = token;
      }
      if (routeName) {
        // 前端路由名称
        config.headers.routeName = routeName;
      }
      /*             // 可以记录请求的取消函数
                  let CancelToken = axios.CancelToken;
                  // xhr.abort() 终端请求方法
                  config.cancelToken = new CancelToken((c) => { // 存到vuex中 ， 页面切换的时候 组件销毁的是执行
                      // c就是当前取消请求的token
                      store.commit(Types.SET_TOKEN,c); // 同步将取消方法存入到vuex中
                  }); */
      this.queue[url] = true
      return config; // 只是扩展请求的配置
    })
    instance.interceptors.response.use((res) => {
      delete this.queue[url]; // 一旦响应了 就从队列删除
      if (Object.keys(this.queue).length === 0) {
        // close loading
      }
      if (res.data.code === 1) {
        return res.data; // 接口里面配合 可以switchCase 状态
      } else {
        return Promise.reject(res.data); // 失败抛出异常即可
      }
    }, (error) => {
      delete this.queue[url];
      if (Object.keys(this.queue).length === 0) {
        // close loading
      }
      // 判断请求异常信息中是否含有超时timeout字符串
      if (error.message.includes('timeout')) {
        Message.error('请求超时！')
        return Promise.reject(error)
      }
      if (error.response) {
        if (error.response.status === 401) {
          Message.error('页面长时间未操作，请重新登录系统')
        } else if (error.response.status === 403) {
          Message.warning('页面未配置，请联系管理员并提供操作页面')
        } else if (error.response.status === 405) {
          Message.error('您的账号已在别处登录')
        }
      }
      return Promise.reject(error);
    })
  }
  request(options, routeName) { // 通过request方法来进行请求操作
    // 每次请求可以创建一个新的实例， 如果业务不复杂你可以不创建实例  直接使用axios
    const instance = axios.create();
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
    this.setInterceptor(instance, config.url, routeName)
    return instance(config); // 产生的是一个 promise  axios()
  }
  get(url, data = {}, routeName) { // url, {}  axios.get('/xxx',{params:xxx})
    return this.request({
      url,
      method: 'get',
      ...data
    }, routeName)
  }
  post(url, data = {}, routeName) { // axios.post('/xxx',{data})
    return this.request({
      url,
      method: 'post',
      data
    }, routeName)
  }
}
// ab 用的是同一个实例
// a  axios 里面的请求有独立的拦截器
// b  axios 里面也有拦截器

export default new HttpRequest()

export const RESPONSE_CODE = {
  SUCCESS: 1, // 成功
  SUCCESS_COPY: 1, // 成功 临时使用
  EXPIRED: '000002' // token过期
}

// 接口网关标识
export const GATEWAY = {
  // 基础数据
  BAS: 'basicdata',
  // 智能设备
  SMA: 'smartdevice',
  // 客户平台
  CUS: 'customerplatform',
  // 操作平台
  OPE: 'operatingplatform',
  // 财务结算
  FIN: 'financialmanagement',
  // 运力平台
  TRA: 'transportation',
  // 网点经营
  NET: 'networkmanagement',
  // 综合业务
  INT: 'integratedservices',
  // 经营指标
  BUS: 'businessindicator',
  // 数据架舱
  DAT: 'datacabin',
  // 服务质量
  SER: 'servicequality',
  // 公告系统
  NOTICE: 'notice',
  // 社区管理
  COM: 'community',
  // 物料模块
  MAT: 'materialservice'
}
