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
const Nobind = () => import(/* webpackChunkName: "Nobind" */ '@/view/nobind/Nobind');
const NobindOfProperty = () => import(/* webpackChunkName: "NobindOfProperty" */ '@/view/nobind/NobindOfProperty');
const SuggestionList = () => import(/* webpackChunkName: "SuggestionList" */ '@/view/suggestion/SuggestionList');
const SuggestionForm = () => import(/* webpackChunkName: "SuggestionForm" */ '@/view/suggestion/SuggestionForm');
const EventReport = () => import(/* webpackChunkName: "EventReport" */ '@/view/event/EventReport');
const Score = () => import(/* webpackChunkName: "Score" */ '@/view/event/Score');
const MyEventList = () => import(/* webpackChunkName: "MyEventList" */ '@/view/event/MyEventList');
const EventDetail = () => import(/* webpackChunkName: "EventDetail" */ '@/view/event/EventDetail');
const TaskList = () => import(/* webpackChunkName: "TaskList" */ '@/view/task/TaskList');
const TaskDetail = () => import(/* webpackChunkName: "TaskDetail" */ '@/view/task/TaskDetail');
const MyTaskList = () => import(/* webpackChunkName: "MyTaskList" */ '@/view/task/MyTaskList');

let data = [
  {
    path: '/paymentHome',
    name: 'PaymentHome',
    component: PaymentHome,
    meta: {
      title: '待缴费',
      role: 'owner'
    }
  },
  {
    path: '/paymentDetail/:type',
    name: 'PaymentDetail',
    component: PaymentDetail,
    props: true,
    meta: {
      title: '付费信息查看',
      role: 'owner'
    }
  },
  {
    path: '/paymentChannel',
    name: 'PaymentChannel',
    component: PaymentChannel,
    meta: {
      title: '支付渠道',
      role: 'owner'
    }
  },
  {
    path: '/paymentSucess',
    name: 'PaymentSucess',
    component: PaymentSucess,
    meta: {
      title: '支付成功',
      role: 'owner'
    }
  },
  {
    path: '/paymentHistoryList/:tabType',
    name: 'PaymentHistoryList',
    component: PaymentHistoryList,
    props: true,
    meta: {
      title: '缴费历史',
      role: 'owner'
    }
  },
  {
    path: '/informationWallList/:all',
    name: 'InformationWallList',
    component: InformationWallList,
    props: true,
    meta: {
      title: '信息上墙',
      role: 'owner'
    }
  },
  {
    path: '/informationWallForm',
    name: 'InformationWallForm',
    component: InformationWallForm,
    meta: {
      title: '发布信息',
      role: 'owner'
    }
  },
  {
    path: '/noticeList',
    name: 'NoticeList',
    component: NoticeList,
    meta: {
      title: '物业通知',
      role: 'owner'
    }
  },
  {
    path: '/noticeDetail/:articleCode',
    name: 'NoticeDetail',
    props: true,
    component: NoticeDetail,
    meta: {
      title: '物业通知详情',
      role: 'owner'
    }
  },
  {
    path: '/questionnaireList',
    name: 'QuestionnaireList',
    component: QuestionnaireList,
    meta: {
      title: '调查问卷列表',
      role: 'owner'
    }
  },
  {
    path: '/questionnaireDetail/:surveyCode',
    name: 'QuestionnaireDetail',
    props: true,
    component: QuestionnaireDetail,
    meta: {
      title: '问卷详情',
      role: 'owner'
    }
  },
  {
    path: '/personalInformation',
    name: 'PersonalInformation',
    component: PersonalInformation,
    meta: {
      title: '个人中心',
      role: 'owner'
    }
  },
  {
    path: '/familyMemberList',
    name: 'FamilyMemberList',
    component: FamilyMemberList,
    meta: {
      title: '成员列表',
      role: 'owner'
    }
  },
  {
    path: '/myCommunityList',
    name: 'MyCommunityList',
    component: MyCommunityList,
    meta: {
      title: '切换小区',
      role: 'owner'
    }
  },
  {
    path: '/myCommunityDetail',
    name: 'MyCommunityDetail',
    component: MyCommunityDetail,
    props: true,
    meta: {
      title: '我的小区',
      role: 'owner'
    }
  },
  {
    path: '/communityList',
    name: 'CommunityList',
    component: CommunityList,
    meta: {
      title: '小区选择',
      role: 'owner'
    }
  },
  {
    path: '/buildingList/:communityCode',
    name: 'BuildingList',
    component: BuildingList,
    props: true,
    meta: {
      title: '楼栋选择',
      role: 'owner'
    }
  },
  {
    path: '/unitList/:communityCode/:buildingCode',
    name: 'UnitList',
    props: true,
    component: UnitList,
    meta: {
      title: '单元选择',
      role: 'owner'
    }
  },
  {
    path: '/roomList/:communityCode/:unitCode',
    name: 'RoomList',
    props: true,
    component: RoomList,
    meta: {
      title: '房间选择',
      role: 'owner'
    }
  },
  {
    path: '/bindUserChoose/:communityCode/:roomCode',
    name: 'BindUserChoose',
    props: true,
    component: BindUserChoose,
    meta: {
      title: '绑定用户',
      role: 'owner'
    }
  },
  {
    path: '/bindUser/:communityCode/:roomCode/:master',
    name: 'BindUser',
    props: true,
    component: BindUser,
    meta: {
      title: '绑定用户',
      role: 'owner'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: '联系我们',
      role: 'owner'
    }
  },
  {
    path: '/nobind',
    name: 'Nobind',
    component: Nobind,
    meta: {
      title: '未绑定',
      role: 'owner'
    }
  },
  {
    path: '/nobindOfProperty',
    name: 'NobindOfProperty',
    component: NobindOfProperty,
    meta: {
      title: '未绑定',
      role: 'property'
    }
  },
  {
    path: '/suggestionList',
    name: 'SuggestionList',
    component: SuggestionList,
    meta: {
      title: '意见建议列表',
      role: 'owner'
    }
  },
  {
    path: '/suggestionForm',
    name: 'SuggestionForm',
    component: SuggestionForm,
    meta: {
      title: '意见建议',
      role: 'owner'
    }
  },
  {
    path: '/eventReport',
    name: 'EventReport',
    component: EventReport,
    meta: {
      title: '事件上报',
      role: 'owner'
    }
  },
  {
    path: '/score/:type',
    name: 'Score',
    component: Score,
    props: true,
    meta: {
      title: '我要评分',
      role: 'owner'
    }
  },
  {
    path: '/myEventList',
    name: 'MyEventList',
    component: MyEventList,
    meta: {
      title: '我的上报事件',
      role: 'owner'
    }
  },
  {
    path: '/eventDetail',
    name: 'EventDetail',
    component: EventDetail,
    meta: {
      title: '事件详情',
      role: 'owner'
    }
  },
  {
    path: '/taskList',
    name: 'TaskList',
    component: TaskList,
    // props: (route) => ({ tabIndexOfQuery: route.query.tabIndex ? route.query.tabIndex * 1 : 0 }),
    meta: {
      title: '我收到的任务',
      role: 'property'
    }
  },
  {
    path: '/taskDetail',
    name: 'TaskDetail',
    component: TaskDetail,
    meta: {
      title: '事件详情',
      role: 'property'
    }
  },
  {
    path: '/myTaskList',
    name: 'MyTaskList',
    component: MyTaskList,
    meta: {
      title: '我处理的任务',
      role: 'property'
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
