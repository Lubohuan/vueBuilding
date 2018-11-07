// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './Home'
import { clearInterval } from 'timers';
import router from './router'
import layer from 'vue-layer'
import '../node_modules/layui-src/src/css/layui.css'
import '../node_modules/layui-src/src/layui.js'
import axios from 'axios'
import Api from './components/public/public.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import store from './store';
import './assets/all.scss';
//import VueAxios from 'vue-axios'
Vue.prototype.$Api = Api;
Vue.prototype.$axios = axios
//Vue.use( axios,layer)
Vue.prototype.$layer = layer(Vue);
//import  Layer  from '../layui-src/src/layui.js'
Vue.config.productionTip = false

import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)

Vue.use(ElementUI, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#hompage',
  router,
  components: { Home },
  template: '<Home/>',
  store
 
})
