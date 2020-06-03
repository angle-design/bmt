// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import axios from 'axios'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.config.productionTip = false
Vue.prototype.axios=axios;
import { Indicator } from 'mint-ui';
Vue.use(MintUI);
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg)
})
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

// import VueCropper from 'vue-cropper'
// Vue.use(VueCropper)
import common from '@/components/js/common.js'
Vue.prototype.common=common;

var qs = require('qs')
Vue.prototype.qs=qs;
// 请求拦截
axios.interceptors.request.use(
  config => {
    if (config.method == 'post'&& config.data.constructor !== FormData) {
      config.data = qs.stringify(config.data);
    }
    // 加载动画
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  render:(h)=>h(App)
})




Vue.directive('drop', {  
  inserted: function (el) {
    let userUA = navigator.userAgent;
    if (userUA.indexOf('iPhone') > -1){  
       el.onblur = function(){              
            setTimeout(function(){
              var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
              window.scrollTo(0, Math.max(scrollHeight - 1, 0)); 
            },100)  
            console.log(userUA)
        }
    }
  }
})
