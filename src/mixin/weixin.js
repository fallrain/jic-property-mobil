export default {
  methods: {
    getSdkCfg () {
      return this.axPost(
        'wx/mp/jssdk/signature',
        null,
        {
          j_sub_system: sessionStorage.getItem('simpleCode'),
          url: location.href
        }
      ).then(r => {
        const cfg = {
          appId: r.appId, // 必填，公众号的唯一标识
          timestamp: r.timestamp, // 必填，生成签名的时间戳
          nonceStr: r.nonceStr, // 必填，生成签名的随机串
          signature: r.signature, // 必填，签名
          jsApiList: ['chooseWXPay']
        };
        this.$wechat.config(cfg);
        this.$wechat.ready(() => {
        });
      });
    }
  }
};
