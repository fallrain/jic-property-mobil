import Vue from 'vue';
import Router from 'vue-router';
import routerData from '@/router/routerData';

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.routerBase,
  routes: routerData.data
});
