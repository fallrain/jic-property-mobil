export default {
  data: function () {
    return {
      pageCfg: {
        page: {
          pageSize: 2,
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
