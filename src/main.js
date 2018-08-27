// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import '@static/css/reset.css'
import '@static/css/default.css'
import $ from 'jquery'
import http from './assets/js/http.js'
import {operateDesc} from './assets/js/public.js'  //public 文件用户信息
import crumbs from '@/components/public/crumbs.vue'
import labels from '@/components/mobile/public/label.vue'


Vue.config.productionTip = false

Vue.use(less)
Vue.prototype.$ajax = http;

Vue.component('crumbs', crumbs);
Vue.component('labels', labels);


Vue.prototype.webUrl = 'http://192.168.0.18:8080';//网站地址
// Vue.prototype.webUrl = 'http://192.168.0.220:8070/admin/';//网站地址

// 操作说明
Vue.prototype.dataCollectionDesc = operateDesc.dataCollectionDesc;
Vue.prototype.appUserDesc = operateDesc.appUserDesc;
Vue.prototype.warningBaseDesc = operateDesc.warningBaseDesc;
Vue.prototype.defPwdDesc = operateDesc.defPwdDesc;
Vue.prototype.costPodDesc = operateDesc.costPodDesc;
Vue.prototype.costTradDesc = operateDesc.costTradDesc;
Vue.prototype.costThresholdDesc = operateDesc.costThresholdDesc;
Vue.prototype.importDesc = operateDesc.importDesc;
Vue.prototype.importIntDesc = operateDesc.importIntDesc;
Vue.prototype.setWarningDesc = operateDesc.setWarningDesc;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  watch: {
    '$route'(val) {
      this.getModel(val);
    }
  },
  methods: {
    getModel(val) {
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (val.path === '/' && !val.meta.device) {
          this.$router.push({name: 'm'});
        } else if (val.path.split('/')[1] !== 'm' && !val.meta.device) {
          this.$router.push({name: 'm' + val.name});
        }
      } else {
        if (val.meta.device) {
          this.$router.push({name: val.name.substr(1, val.name.length - 1)});
        }
      }
    }
  }
});
router.beforeEach((to, from, next) => {
  if (to.name === 'list' || to.name === 'detail')
    next(false);
  else
    next();
});
