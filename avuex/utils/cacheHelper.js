/**
 * @缓存类型
 */
export const CacheType = {
  localStorage: 0,
  sessionStorage: 1,
  cookies: 2
}

/**
 * @缓存辅助类
 */
export const cacheHelper = {

  // 设置缓存数据
  set(key, value, cacheType = CacheType.localStorage) {
    if (value) {
      value = JSON.stringify(value);
    }
    switch (cacheType) {
      case CacheType.localStorage:
        localStorage.setItem(key, value);
        break;
      case CacheType.sessionStorage:
        sessionStorage.setItem(key, value);
    }
  },

  // 获取缓存数据
  get(key, cacheType = CacheType.localStorage) {
    let value;
    switch (cacheType) {
      case CacheType.localStorage:
        value = localStorage.getItem(key);
        break;
      case CacheType.sessionStorage:
        value = sessionStorage.getItem(key);
    }
    if (value && value !== 'undefined' && value !== 'null') {
      return JSON.parse(value);
    }
    return null;
  },
  remove(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  // 是否有某项缓存
  hasCache(key, cacheType = CacheType.localStorage) {
    let value;
    switch (cacheType) {
      case CacheType.localStorage:
        value = localStorage.getItem(key);
        break;
      case CacheType.sessionStorage:
        value = sessionStorage.getItem(key);
    }
    if (value && value !== 'undefined' && value !== 'null') {
      return true;
    }
    return false;
  },

  // 获取localstorage的已使用容量
  getUsage() {
    if (!window.localStorage) {
      console.log('浏览器不支持localStorage');
    }
    let size = 0;
    for (const item in window.localStorage) {
      // eslint-disable-next-line no-prototype-builtins
      if (window.localStorage.hasOwnProperty(item)) {
        size += window.localStorage.getItem(item).length;
      }
    }
    console.log('当前localStorage已使用容量为' + (size / 1024).toFixed(2) + 'KB');
  },

  // 获取localstorage的最大容量
  getMaximun() {
    if (!window.localStorage) {
      console.warn('当前浏览器不支持localStorage!');
      return
    }
    let test = '0123456789';
    const add = function (num) {
      num += num;
      if (num.length === 10240) {
        test = num;
        return;
      }
      add(num);
    };
    add(test);
    let sum = test;
    const show = setInterval(function () {
      sum += test;
      try {
        window.localStorage.removeItem('test');
        window.localStorage.setItem('test', sum);
      } catch (e) {
        console.warn(sum.length / 1024 + 'KB超出最大限制');
        clearInterval(show);
      }
    }, 0.1);
  },

  // 刷新指定的缓存
  refresh(key, value, cacheType = CacheType.localStorage) {
    this.remove(key);
    this.set(key, value, cacheType);
  }
}
