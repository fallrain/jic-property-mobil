'use strict';
import Nav from '@/view/Nav';

const PaymentHome = () => import(/* webpackChunkName: "PaymentHome" */ '@/view/payment/PaymentHome');
const PaymentDetail = () => import(/* webpackChunkName: "PaymentDetail" */ '@/view/payment/PaymentDetail');
const PaymentChannel = () => import(/* webpackChunkName: "PaymentChannel" */ '@/view/payment/PaymentChannel');
const PaymentSucess = () => import(/* webpackChunkName: "PaymentSucess" */ '@/view/payment/PaymentSucess');
const PaymentHistoryList = () => import(/* webpackChunkName: "PaymentHistoryList" */ '@/view/paymentHistory/PaymentHistoryList');
const InformationWallList = () => import(/* webpackChunkName: "InformationWallList" */ '@/view/informationWall/InformationWallList');
const InformationWallForm = () => import(/* webpackChunkName: "InformationWallList" */ '@/view/informationWall/InformationWallForm');
const NoticeList = () => import(/* webpackChunkName: "Notice" */ '@/view/notice/NoticeList');
const NoticeDetail = () => import(/* webpackChunkName: "NoticeDetail" */ '@/view/notice/NoticeDetail');
const QuestionnaireList = () => import(/* webpackChunkName: "QuestionnaireList" */ '@/view/questionnaire/QuestionnaireList');
const PersonalInformation = () => import(/* webpackChunkName: "PersonalInformation" */ '@/view/personalInf/PersonalInformation');
const FamilyMemberList = () => import(/* webpackChunkName: "FamilyMemberList" */ '@/view/personalInf/FamilyMemberList');
const MyCommunityList = () => import(/* webpackChunkName: "MyCommunityList" */ '@/view/myCommunity/MyCommunityList');

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
  },
  {
    path: '/informationWallList',
    name: 'InformationWallList',
    component: InformationWallList,
    meta: {
      title: '信息上墙'
    }
  },
  {
    path: '/informationWallForm',
    name: 'InformationWallForm',
    component: InformationWallForm,
    meta: {
      title: '发布信息'
    }
  },
  {
    path: '/noticeList',
    name: 'NoticeList',
    component: NoticeList,
    meta: {
      title: '物业通知'
    }
  },
  {
    path: '/noticeDetail',
    name: 'NoticeDetail',
    component: NoticeDetail,
    meta: {
      title: '物业通知详情'
    }
  },
  {
    path: '/questionnaireList',
    name: 'QuestionnaireList',
    component: QuestionnaireList,
    meta: {
      title: '调查问卷列表'
    }
  },
  {
    path: '/personalInformation',
    name: 'PersonalInformation',
    component: PersonalInformation,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/familyMemberList',
    name: 'FamilyMemberList',
    component: FamilyMemberList,
    meta: {
      title: '成员列表'
    }
  },
  {
    path: '/myCommunityList',
    name: 'MyCommunityList',
    component: MyCommunityList,
    meta: {
      title: '我的小区'
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
