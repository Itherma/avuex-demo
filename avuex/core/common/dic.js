import { validatenull } from '../../utils/validate';
import { getObjValue, detailDic } from '../../utils/util';
import fetch from '../../utils/axios'
/*
 *@Description: 加载级联数据
*/
export const loadCascaderDic = (columnOption, list) => {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const columnList = [];
    const result = [];
    const networkdic = {};
    columnOption.forEach(ele => {
      if (ele.parentProp) columnList.push(ele);
    });
    list.forEach((ele, index) => {
      columnList.forEach(column => {
        if (column.nameFromList) {
          result.push(
            new Promise(resolve => {
              if (validatenull(ele[column.parentProp])) {
                resolve({ prop: column.prop, data: [], index: index });
              } else {
                sendDic(Object.assign({
                  url: `${column.dicUrl.replace('{{key}}', ele[column.parentProp])}`
                }, {
                  resKey: (column.props || {}).res,
                  method: column.dicMethod,
                  query: column.dicQuery,
                  routeName: column.routeName
                })).then(res => {
                  resolve({ prop: column.prop, data: res, index: index });
                });
              }
            })
          );
        }
      });
    });
    Promise.all(result).then(data => {
      data.forEach(ele => {
        if (validatenull(networkdic[ele.index])) networkdic[ele.index] = {};
        networkdic[ele.index][ele.prop] = ele.data;
      });
      resolve(networkdic);
    });
  });
};

// 初始化字典
export const loadDic = option => {
  let locationdic = {}; // 本地字典
  let networkdic = {}; // 网络字典
  let ajaxdic = []; // 发送ajax的字典
  return new Promise((resolve, reject) => {
    // 本地字典赋值
    locationdic = option.dicData || {};

    const dictsConf = createdDic(option);
    locationdic = Object.assign(locationdic, dictsConf.locationdic);
    ajaxdic = dictsConf.ajaxdic;
    if (validatenull(locationdic) && validatenull(ajaxdic)) resolve({});
    // if (!window.axios && !validatenull(ajaxdic)) {
    //   resolve('有问题');
    // }
    handeDic(ajaxdic)
      .then((res) => {
        networkdic = res;
        resolve(Object.assign(locationdic, networkdic));
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 创建字典区分本地字典和网络字典
function createdDic(option) {
  const { url = '', column = [], props = {}} = option;
  const ajaxdic = [];
  const locationdic = {};
  column.forEach(ele => {
    const dicData = ele.dicData;
    const dicUrl = ele.dicUrl;
    const prop = ele.prop;
    if (ele.dicFlag === false || ele.remote) return;
    if (Array.isArray(dicData)) {
      locationdic[prop] = dicData;
    } else if (!validatenull(dicUrl)) {
      ajaxdic.push({
        url: dicUrl || url,
        name: dicData || prop,
        method: ele.dicMethod,
        props: ele.props,
        dataType: ele.dataType,
        resKey: (ele.props || {}).res || (props || {}).res,
        query: ele.dicQuery,
        routeName: ele.routeName
      });
    }
  });
  return {
    ajaxdic,
    locationdic
  };
}

// 循环处理字典
function handeDic(list) {
  const networkdic = {};
  const result = [];
  return new Promise(resolve => {
    list.forEach(ele => {
      result.push(
        new Promise(resolve => {
          sendDic(Object.assign(ele, { url: `${ele.url.replace('{{key}}', '')}` })).then(res => {
            res = detailDic(res, ele.props, ele.dataType);
            resolve(res);
          });
        })
      );
    });
    Promise.all(result).then(data => {
      list.forEach((ele, index) => {
        networkdic[ele.name] = data[index];
      });
      resolve(networkdic);
    });
  });
}

// ajax获取字典
export const sendDic = (params) => {
  console.log(params, 111);
  // eslint-disable-next-line no-unused-vars
  const { url, query, method, resKey, props, routeName } = params;
  console.log(params);
  return new Promise(resolve => {
    const callback = (res) => {
      const list = getObjValue(res.data, resKey);
      resolve(list);
    };
    if (method === 'post') {
      fetch.post(url, query, routeName).then(function (res) {
        callback(res);
      }).catch(() => [
        resolve([])
      ]);
    } else {
      // const params = getSringParams(url, query)
      fetch.get(url, { params: query }, routeName).then(function (res) {
        callback(res);
      }).catch(() => [
        resolve([])
      ]);
    }
  });
};
