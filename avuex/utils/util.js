import { validatenull } from './validate';
import trim from 'lodash/trim'

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

export function getFixed(val, len = 2) {
  return Number(val.toFixed(len));
}

/*
 *@Description: 变量类型判断
*/
export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**
 *判断是否为json对象
 */
export const isJson = str => {
  if (Array.isArray(str)) {
    if (str[0] instanceof Object) {
      return true;
    } else {
      return false;
    }
  } else if (str instanceof Object) {
    return true;
  }
  return false;
};

/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      delete data[i].$parent;
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      delete data.$parent;
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

/*
 *@Description: 数组排序
*/
export const sortArrys = (list, prop) => {
  list.sort(function(a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    }
    if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  });
  return list;
};

/**
 * 设置px
 */
export const setPx = (val, defval = '') => {
  if (validatenull(val)) val = defval;
  if (validatenull(val)) return '';
  val = val + '';
  if (val.indexOf('%') === -1) {
    val = val + 'px';
  }
  return val;
};

/**
 * 转换数据类型
 */
export const detailDic = (list, props = {}, type) => {
  if (!list) {
    return
  }
  const valueKey = props.value || 'value';
  const childrenKey = props.children || 'children';
  list.forEach(ele => {
    if (type === 'number') {
      ele[valueKey] = Number(ele[valueKey]);
    } else if (type === 'string') {
      ele[valueKey] = ele[valueKey] + '';
    }
    if (ele[childrenKey]) {
      detailDic(ele[childrenKey], props, type);
    }
  });
  return list;
};

/**
 * 根据字典的value显示label
 */
let result = '';
export const findByValue = (dic, value, props, first, isTree) => {
  props = props || {};
  const labelKey = props.label || 'label';
  const valueKey = props.value || 'value';
  const childrenKey = props.children || 'children';
  if (first) result = value;
  if (validatenull(dic)) return result;
  // 正常字典
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    for (let i = 0; i < dic.length; i++) {
      if (dic[i][valueKey] === value) {
        result = dic[i][labelKey];
        break;
      } else {
        findByValue(dic[i][childrenKey], value, props, false, isTree);
      }
    }
  } else if (value instanceof Array) {
    let index = 0;
    let count = 0;
    result = [];
    while (count < value.length) {
      index = findArray(dic, value[count], valueKey);
      if (index !== -1) result.push(dic[index][labelKey]);
      else result.push(value[count]);
      if (isTree) dic = dic[index][childrenKey];
      count++;
    }
    result = result.join(',').toString();
  }
  return result;
};

/*
 *@Description: 获取请求返回的实际数据
*/
export const getDeepData = (res) => {
  // return (Array.isArray(res) ? res : res.data) || [];
  return (Array.isArray(res) ? res : (res.records ? res.records : res.data)) || [];
};
export const getObjValue = (data, params = '', type) => {
  const list = params.split('.');
  let result = data;
  if (list[0] === '' && type !== 'object') {
    return getDeepData(data);
  } else if (list[0] !== '') {
    list.forEach(ele => {
      result = result[ele];
    });
  }
  return result;
};

/*
 *@Description: 剔除对象空值
*/
export const filterForm = (form) => {
  const obj = {};
  Object.keys(form).forEach(ele => {
    if (!validatenull(form[ele])) {
      obj[ele] = form[ele];
    }
  });
  return obj;
};

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value, valueKey) => {
  valueKey = valueKey || 'value';
  for (let i = 0; i < dic.length; i++) {
    if (dic[i][valueKey] === value) {
      return i;
    }
  }
  return -1;
};

/*
 *@Description: 密码格式
*/
export const getPasswordChar = (result = '', char) => {
  const len = result.toString().length;
  result = '';
  for (let i = 0; i < len; i++) {
    result = result + char;
  }
  return result;
};

/*
 *@Description: 检测真值 不为真 返回默认值
*/
export const vaildData = (val, dafult) => {
  // console.log('vaildData')
  if (typeof val === 'boolean') {
    return val;
  }
  return !validatenull(val) ? val : dafult;
};

/*
 *@Description: 数组对象去重
*/
export const removeRepeat = (arr) => {
  if (typeof arr[0] === 'object') {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = JSON.stringify(arr[i])
    }
    arr = [...new Set(arr)]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = JSON.parse(arr[i])
    }
  } else {
    arr = [...new Set(arr)]
  }
  return arr
}

/*
 *@Description: 复制文本到剪切板
*/
export const copyText = txt => {
  if (typeof txt !== 'string' || !txt.length) {
    return
  }
  let txtEl = document.createElement('input')
  txtEl.setAttribute('type', 'text')
  txtEl.setAttribute('value', txt)
  txtEl.style.position = 'fixed'
  txtEl.style.left = '-999999px'
  txtEl.style.top = '-9999px'
  document.body.appendChild(txtEl)
  txtEl.select()
  document.execCommand('copy')
  document.body.removeChild(txtEl)
  txtEl = null
}

/* 元素是否包含某个class */
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/* 添加class */
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* 移除class */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/**
 * 根据指定key列表排序（无排序key的元素位置不变）
 * @param {*} list 需要排序的列表
 * @param {*} key 排序的key
 */
export function arraySort(list = [], key = '') {
  // key为空 默认数组的格式为普通数组
  if (!key) {
    return [...list].sort((a, b) => a - b)
  }
  // 定义储藏排序字段过滤出来的数据
  const arrItem = []
  // 定义排序字段过滤后的旧数据
  const arrOld = []
  // 遍历列表的所有项
  list.forEach(item => {
    if (typeof item[key] === 'number') arrItem.push(item)
    else arrOld.push(item)
  })
  // 对过滤后数据列表排序后在进行插入
  arrItem.sort((a, b) => a[key] - b[key]).forEach(item => {
    arrOld.splice(item[key], 0, item)
  })
  // 返回排序后的数组
  return arrOld
}
