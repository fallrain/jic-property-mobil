import Vue from 'vue';
import Router from 'vue-router';
import routerData from '@/router/routerData';
import store from '@/store';
Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.routerBase,
  routes: routerData.data
});
router.beforeEach((to, from, next) => {
  if (to.name === 'SuggestionList' && from.name === 'SuggestionForm') {
    store.commit('addAliveExclude', 'SuggestionList');
  } else {
    store.commit('delAliveExclude', 'SuggestionList');
  }
  next();
});
export default router;
