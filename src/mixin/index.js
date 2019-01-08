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
    }
  }
};
