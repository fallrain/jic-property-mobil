import {axGet} from '@/lib/ajax';
import router from '@/router';
export default {
  beforeRouteEnter (to, from, next) {
    function check () {
      const noAuthPages = [
        'MyCommunityList',
        'CommunityList',
        'BuildingList',
        'UnitList',
        'RoomList',
        'BindUserChoose',
        'BindUser',
        'Nobind',
        'PersonalInformation'
      ];
      if (!sessionStorage.getItem('simpleCode')) {
        if (!noAuthPages.includes(to.name)) {
          // 没有绑定小区直接到添加小区页面
          router.replace({
            name: 'Nobind'
          });
        }
      }
    }
    axGet(
      'communityInfo/wxGetAllInfoByWx',
      {
        requestNoToast: true,
        wxUid: localStorage.getItem('uid')
      }
    ).then(r => {
      if (r.code === '200') {
        const data = r.value;
        sessionStorage.setItem('ownerCode', data.ownerCode);
        sessionStorage.setItem('roomCode', data.roomCode);
        sessionStorage.setItem('simpleCode', data.simpleCode);
        sessionStorage.setItem('communityName', data.communityName);
        sessionStorage.setItem('address', data.communityName + data.buildingName + data.unitName + data.roomName);
      }
      check();
      next();
    });
  },
  data: function () {
    return {
      pageCfg: {
        page: {
          pageSize: 20,
          pageNum: 1
        },
        loadingType: 1,
        loadingShow: false
      }
    };
  },
  methods: {
    closeWxWindow () {
      this.$wechat.closeWindow();
    },
    getRoomDetail () {
      const communityName = sessionStorage.getItem('CommunityList.communityName');
      const buildingName = sessionStorage.getItem('BuildingList.buildingName');
      const unitName = sessionStorage.getItem('UnitList.unitName');
      const roomName = sessionStorage.getItem('RoomList.roomName');
      if (communityName) {
        this.name = communityName;
      }
      if (buildingName) {
        this.name += '-' + buildingName;
      }
      if (unitName) {
        this.name += '-' + unitName;
      }
      if (roomName) {
        this.name += '-' + roomName;
      }
    }
  }
};
