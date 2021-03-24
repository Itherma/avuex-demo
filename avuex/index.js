import components from './ele-ui';
import { validatenull, asyncValidator } from './utils/validate.js';
import { deepClone, vaildData, findArray, setPx, sortArrys, isJson, filterForm } from './utils/util';
import permission from './core/directive/permission';
import clickout from './core/directive/clickout';
import dialogdrag from './core/directive/dialogdrag';
// import _export from './plugin/export/';
import { watermark } from './plugin/canvas/';
import $Clipboard from './plugin/clipboard';
import $ImagePreview from './ele-ui/image-preview/index.js';
import './utils/es6.js';
import selectUrl from './utils/urls/index'

console.log(selectUrl);

const prototypes = {
  $Clipboard
};
const install = function (Vue, opts = {}) {
  // Vue.use(_export);
  // 初始化指令
  permission(Vue);
  clickout(Vue);
  dialogdrag(Vue);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key];
  });
  // 国际化
  // locale.use(opts.locale);
  // locale.i18n(opts.i18n);
  Vue.prototype.$ImagePreview = $ImagePreview(Vue);
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.isJson = isJson;
  Vue.prototype.setPx = setPx;
  Vue.prototype.vaildData = vaildData;
  Vue.prototype.sortArrys = sortArrys;
  Vue.prototype.findArray = findArray;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.watermark = watermark;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.filterForm = filterForm;
  Vue.prototype.$selectUrl = selectUrl.select

  Vue.prototype.$AVUE = {
    size: opts.size || 'small',
    menuType: opts.menuType || 'text',
    canvas: Object.assign(
      {
        text: 'avue.top',
        fontFamily: 'microsoft yahei',
        color: '#999',
        fontSize: 16,
        opacity: 100,
        bottom: 10,
        right: 10,
        ratio: 1
      }, opts.canvas),
    qiniu: Object.assign(
      {
        AK: '',
        SK: '',
        scope: '',
        url: '',
        deadline: 1
      }, (opts.qiniu || {})),
    ali: Object.assign(
      {
        region: '',
        endpoint: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: ''
      }, (opts.ali || {}))
  };
};

// 登录获取token
// eslint-disable-next-line no-unused-vars
import fetch, { RESPONSE_CODE, GATEWAY } from './utils/axios'
import { cacheHelper } from './utils/cacheHelper'
import md5 from 'js-md5'

async function login() {
  const params = { account: 'xjw', password: md5('Xj123456') }
  const { data, code, msg } = await fetch.post(`${GATEWAY.BAS}/login`, params)
  if (code === RESPONSE_CODE.SUCCESS) {
    cacheHelper.set('token', data.token)
  } else {
    alert(msg)
  }
}

export default {
  version: '2.0.6',
  // locale: locale.locale,
  install,
  login
}
