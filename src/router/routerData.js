'use strict';
import Nav from '@/view/Nav';

const PaymentHome = () => import(/* webpackChunkName: "PaymentHome" */ '@/view/payment/PaymentHome');
const PaymentDetail = () => import(/* webpackChunkName: "PaymentDetail" */ '@/view/payment/PaymentDetail');
const PaymentChannel = () => import(/* webpackChunkName: "PaymentChannel" */ '@/view/payment/PaymentChannel');
const PaymentSucess = () => import(/* webpackChunkName: "PaymentSucess" */ '@/view/payment/PaymentSucess');
const PaymentHistoryList = () => import(/* webpackChunkName: "PaymentHistoryList" */ '@/view/paymentHistory/PaymentHistoryList');
const InformationWallList = () => import(/* webpackChunkName: "InformationWallList" */ '@/view/informationWall/InformationWallList');
const InformationWallForm = () => import(/* webpackChunkName: "InformationWallForm" */ '@/view/informationWall/InformationWallForm');
const NoticeList = () => import(/* webpackChunkName: "Notice" */ '@/view/notice/NoticeList');
const NoticeDetail = () => import(/* webpackChunkName: "NoticeDetail" */ '@/view/notice/NoticeDetail');
const QuestionnaireList = () => import(/* webpackChunkName: "QuestionnaireList" */ '@/view/questionnaire/QuestionnaireList');
const QuestionnaireDetail = () => import(/* webpackChunkName: "QuestionnaireDetail" */ '@/view/questionnaire/QuestionnaireDetail');
const PersonalInformation = () => import(/* webpackChunkName: "PersonalInformation" */ '@/view/personalInf/PersonalInformation');
const FamilyMemberList = () => import(/* webpackChunkName: "FamilyMemberList" */ '@/view/personalInf/FamilyMemberList');
const MyCommunityList = () => import(/* webpackChunkName: "MyCommunityList" */ '@/view/myCommunity/MyCommunityList');
const MyCommunityDetail = () => import(/* webpackChunkName: "MyCommunityDetail" */ '@/view/myCommunity/MyCommunityDetail');
const CommunityList = () => import(/* webpackChunkName: "CommunityList" */ '@/view/myCommunity/CommunityList');
const BuildingList = () => import(/* webpackChunkName: "BuildingList" */ '@/view/myCommunity/BuildingList');
const UnitList = () => import(/* webpackChunkName: "UnitList" */ '@/view/myCommunity/UnitList');
const RoomList = () => import(/* webpackChunkName: "RoomList" */ '@/view/myCommunity/RoomList');
const BindUserChoose = () => import(/* webpackChunkName: "BindUserChoose" */ '@/view/myCommunity/BindUserChoose');
const BindUser = () => import(/* webpackChunkName: "BindUser" */ '@/view/myCommunity/BindUser');
const Contact = () => import(/* webpackChunkName: "Contact" */ '@/view/contact/Contact');

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
    path: '/informationWallList/:all',
    name: 'InformationWallList',
    component: InformationWallList,
    props: true,
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
    path: '/noticeDetail/:articleCode',
    name: 'NoticeDetail',
    props: true,
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
    path: '/questionnaireDetail/:surveyCode',
    name: 'QuestionnaireDetail',
    props: true,
    component: QuestionnaireDetail,
    meta: {
      title: '问卷详情'
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
      title: '切换小区'
    }
  },
  {
    path: '/myCommunityDetail/:communityCode',
    name: 'MyCommunityDetail',
    component: MyCommunityDetail,
    props: true,
    meta: {
      title: '我的小区'
    }
  },
  {
    path: '/communityList',
    name: 'CommunityList',
    component: CommunityList,
    meta: {
      title: '小区选择'
    }
  },
  {
    path: '/buildingList/:communityCode',
    name: 'BuildingList',
    component: BuildingList,
    props: true,
    meta: {
      title: '楼栋选择'
    }
  },
  {
    path: '/unitList/:communityCode/:buildingCode',
    name: 'UnitList',
    props: true,
    component: UnitList,
    meta: {
      title: '单元选择'
    }
  },
  {
    path: '/roomList/:communityCode/:unitCode',
    name: 'RoomList',
    props: true,
    component: RoomList,
    meta: {
      title: '房间选择'
    }
  },
  {
    path: '/bindUserChoose/:communityCode/:roomCode',
    name: 'BindUserChoose',
    props: true,
    component: BindUserChoose,
    meta: {
      title: '绑定用户'
    }
  },
  {
    path: '/bindUser/:communityCode/:roomCode/:master',
    name: 'BindUser',
    props: true,
    component: BindUser,
    meta: {
      title: '绑定用户'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: '联系我们'
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
