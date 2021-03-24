import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Avuex from '../avuex/index'
import '../avuex/css/index.css' // => 缺少一些方法  fetch  scss的变量宏等等
import '../avuex/styles/element-overwirtes.css' // => 缺少一些方法  fetch  scss的变量宏等等

Vue.use(ElementUI)
Vue.use(Avuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

import { cacheHelper } from '../avuex/utils/cacheHelper'
if (!cacheHelper.get('token')) {
  Avuex.login()
}
