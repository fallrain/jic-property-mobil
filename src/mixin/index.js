import router from '@/router';
import store from '@/store';

export default {
  async beforeRouteEnter (to, from, next) {
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
      if (role === 'owner' && !sessionStorage.getItem('ownerSimpleCode')) {
        if (!noAuthPages.includes(to.name)) {
          // 没有绑定小区直接到添加小区页面
          router.replace({
            name: 'Nobind'
          });
        }
      }
    }
    const role = to.meta.role;
    if (role) {
      store.commit('changeRole', to.meta.role);
      if (role === 'owner') {
        await store.dispatch('getWxInfo');
      } else {
        await store.dispatch('getPropertyInfo');
      }
    }

    check();
    next();
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
