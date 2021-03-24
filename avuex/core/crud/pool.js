import fetch from '../../utils/axios'
/*
 * 通用请求接口
 */
export default {
  reqList(url, params) {
    return fetch.get(`/${url}/page`, { params })
  },
  reqDel(url, params) {
    return fetch.post(`${url}`, params)
  },
  reqDetail(url, params) {
    return fetch.get(url, { params })
  },
  reqAdd(url, params) {
    return fetch.post(`/${url}`, params)
  },
  getColumnConf(url, params) {
    return fetch.get(`/${url}`, { params })
  },
  setColumnConf(url, params) {
    return fetch.post(`/${url}`, params)
  }
}
