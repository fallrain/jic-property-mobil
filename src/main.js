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

import {
  WechatPlugin,
  ConfirmPlugin
} from 'vux';
// 跳转回来的时候，重置uid等信息
if (util.getUrlVal('uid')) {
  util.setUserInfToStorage();
}
Vue.use(WechatPlugin);
Vue.use(ConfirmPlugin);

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
    // auth.check();
    await axGet(
      'communityInfo/wxGetAllInfoByWx',
      {
        requestNoToast: true,
        wxUid: localStorage.getItem('uid')
      }
    ).then(r => {
      const noAuthPages = [
        'MyCommunityList',
        'CommunityList',
        'BuildingList',
        'UnitList',
        'RoomList',
        'BindUserChoose',
        'BindUser',
        'PersonalInformation'
      ];
      if (r.code === '200') {
        const data = r.value;
        sessionStorage.setItem('ownerCode', data.ownerCode);
        sessionStorage.setItem('roomCode', data.roomCode);
        sessionStorage.setItem('simpleCode', data.simpleCode);
        sessionStorage.setItem('communityName', data.communityName);
        sessionStorage.setItem('address', data.communityName + data.buildingName + '号楼' + data.unitName + '单元' + data.roomName + '室');
      }
      const routeName = this.$router.history.current.name || this.$router.history.pending.name;
      if (!sessionStorage.getItem('simpleCode')) {
        if (!noAuthPages.includes(routeName)) {
          // 没有绑定小区直接到添加小区页面
          this.$router.replace({
            name: 'MyCommunityList'
          });
        }
      }
      router.beforeEach((to, from, next) => {
        if (!sessionStorage.getItem('simpleCode')) {
          if (!noAuthPages.includes(to.name)) {
            // 没有绑定小区直接到添加小区页面
            this.$router.replace({
              name: 'MyCommunityList'
            });
          }
        }
        next();
      });
      function f () {
        const us = [
          '/paymentDetail/parking',
          '/paymentDetail/property',
          '/informationWallList/all',
          '/noticeList',
          '/questionnaireList',
          '/contact',
          '/paymentHistoryList/property',
          '/MyCommunityDetail',
          '/personalInformation'
        ];
        const log = us.map(function (u) {
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + process.env.app_id;
          const params = new Map([
            ['redirect_uri', window.encodeURIComponent(process.env.back_auth_url)],
            ['response_type', 'code'],
            ['scope', 'snsapi_userinfo'],
            ['state', window.encodeURIComponent(process.env.front_base_url + window.decodeURIComponent(u))]
          ]);
          params.forEach((v, key) => {
            url += '&' + key + '=' + v;
          });
          url += '#wechat_redirect';
          return url;
        });
        console.log(log);
      }
      f();
    });
  },
  template: '<App/>'
});
