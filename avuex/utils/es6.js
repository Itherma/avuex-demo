// 没有includes就向Array添加 includes 方法
if (!Array.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.includes = function(searchElement, fromIndex) {
    if (this === null) {
      throw new TypeError('"this" is null or not defined');
    }
    const that = Object(this); const len = that.length >>> 0; const param = arguments; const index = fromIndex | 0;

    if (len === 0) { return false; }

    let startIndex = Math.max(index >= 0 ? index : len - Math.abs(index), 0);

    while (startIndex < len) {
      if (String(that[startIndex]) === String(param[0])) return true;
      startIndex++;
    }
    return false;
  };
}
