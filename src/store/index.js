import Vuex from 'vuex';
import Vue from 'vue';
import {axGet} from '@/lib/ajax';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    aliveExclude: [
      'PaymentHistoryList',
      'PaymentDetail',
      'SuggestionForm',
      'EventReport',
      'Score',
      'EventDetail'
    ],
    addresses: {
      communityName: '',
      buildingName: '',
      unitName: '',
      roomName: '',
      ownerName: ''
    }
  },
  mutations: {
    toggleAliveExclude ({aliveExclude}, name) {
      const index = aliveExclude.indexOf(name);
      index === -1 ? aliveExclude.push(name) : aliveExclude.splice(index, 1);
    },
    delAliveExclude ({aliveExclude}, name) {
      const index = aliveExclude.indexOf(name);
      index !== -1 && aliveExclude.splice(index, 1);
    },
    addAliveExclude ({aliveExclude}, name) {
      const index = aliveExclude.indexOf(name);
      index === -1 && aliveExclude.push(name);
    },
    updateUserCommunity ({addresses}, {communityName, buildingName, unitName, roomName, ownerName}) {
      Object.assign(addresses, {communityName, buildingName, unitName, roomName, ownerName});
    }
  },
  actions: {
    getWxInfo ({commit}) {
      return axGet(
        'communityInfo/wxGetAllInfoByWx',
        {
          requestNoToast: true,
          wxUid: localStorage.getItem('uid')
        }
      ).then(({code, value: data}) => {
        if (code === '200') {
          sessionStorage.setItem('ownerCode', data.ownerCode);
          sessionStorage.setItem('roomCode', data.roomCode);
          sessionStorage.setItem('simpleCode', data.simpleCode);
          sessionStorage.setItem('communityName', data.communityName);
          sessionStorage.setItem('address', data.communityName + data.buildingName + data.unitName + data.roomName);
          commit('updateUserCommunity', data);
        }
      });
    }
  }
});
