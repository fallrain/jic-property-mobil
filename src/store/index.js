import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    aliveExclude: [
      'PaymentHistoryList',
      'PaymentDetail',
      'SuggestionForm'
    ]
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
    }
  }
});
