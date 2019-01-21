// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import filtersMap from './filter';
import mixin from './mixin';
import ax, {axGet, axPost} from '@/lib/ajax';
import util from '@/lib/util/util';
import hValidate from '@/lib/hValidate/hValidate';
import auth from '@/lib/auth/auth';

import {
  WechatPlugin
} from 'vux';
Vue.use(WechatPlugin);

Vue.config.productionTip = false;
// 注册filter
Object.keys(filtersMap).forEach(filterName => {
  Vue.filter(filterName, filtersMap[filterName]);
});
// 全局混入
Vue.mixin(mixin);

Vue.prototype.ax = ax;
Vue.prototype.axGet = axGet;
Vue.prototype.axPost = axPost;
Vue.prototype.hUtil = util;
Vue.prototype.HValidate = hValidate;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  async created () {
    auth.check();
    await axGet(
      'communityInfo/wxGetAllInfoByWx',
      {
        wxUid: localStorage.getItem('uid')
      }
    ).then(r => {
      if (r.code === '200') {
        const data = r.value;
        sessionStorage.setItem('ownerCode', data.ownerCode);
        sessionStorage.setItem('roomCode', data.roomCode);
        sessionStorage.setItem('simpleCode', data.simpleCode);
        sessionStorage.setItem('communityName', data.communityName);
        sessionStorage.setItem('address', data.communityName + data.buildingName + '号楼' + data.unitName + '单元' + data.roomName + '室');
      }
    });
  },
  template: '<App/>'
});
