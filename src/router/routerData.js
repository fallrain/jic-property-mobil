'use strict';
import Nav from '@/view/Nav';

const PaymentHome = () => import(/* webpackChunkName: "PaymentHome" */ '@/view/Payment/PaymentHome');
const PaymentDetail = () => import(/* webpackChunkName: "PaymentDetail" */ '@/view/Payment/PaymentDetail');
const PaymentChannel = () => import(/* webpackChunkName: "PaymentChannel" */ '@/view/Payment/PaymentChannel');
const PaymentSucess = () => import(/* webpackChunkName: "PaymentSucess" */ '@/view/Payment/PaymentSucess');
const PaymentHistoryList = () => import(/* webpackChunkName: "PaymentHistoryList" */ '@/view/PaymentHistory/PaymentHistoryList');

let data = [
  {
    path: '/paymentHome',
    name: 'PaymentHome',
    component: PaymentHome,
    meta: {
      title: '鸿棕物业服务'
    }
  },
  {
    path: '/paymentDetail',
    name: 'PaymentDetail',
    component: PaymentDetail,
    meta: {
      title: '付费信息查看'
    }
  },
  {
    path: '/paymentChannel',
    name: 'PaymentChannel',
    component: PaymentChannel,
    meta: {
      title: '支付渠道'
    }
  },
  {
    path: '/paymentSucess',
    name: 'PaymentSucess',
    component: PaymentSucess,
    meta: {
      title: '支付成功'
    }
  },
  {
    path: '/paymentHistoryList',
    name: 'PaymentHistoryList',
    component: PaymentHistoryList,
    meta: {
      title: '缴费历史'
    }
  }
];
if (process.env.NODE_ENV !== 'production') {
  data.unshift({
    path: '/',
    name: 'Nav',
    component: Nav,
    meta: {
      title: '导航'
    }
  });
}
export default {data};
