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
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import common from'./utils/common.js';
import VueAplayer from 'vue-aplayer';
import {hasPermissions} from "./utils/hasPermissions.js";
import {spmUrl} from "../config/index.js";
Vue.prototype.spmUrl = spmUrl;
Vue.prototype.hasPerm = hasPermissions;
Vue.prototype.$common = common;
//import VueAxios from 'vue-axios'
Vue.prototype.$Api = Api;
Vue.prototype.$axios = axios
//Vue.use( axios,layer)
Vue.prototype.$layer = layer(Vue);
//import  Layer  from '../layui-src/src/layui.js'
Vue.config.productionTip = false

import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)
Vue.use(VideoPlayer)
Vue.use(VueAplayer)
Vue.use(ElementUI, { locale })
Vue.use(Viewer, {
  defaultOptions: {
      zIndex: 9999
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#hompage',
  router,
  components: { Home },
  template: '<Home/>',
  store
 
})
