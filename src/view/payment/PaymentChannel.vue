<template>
  <div>
    <div class="PaymentChannel-head">
      <img src="@/assets/img/icon-property@2x.png">
      <p class="PaymentChannel-prompt">物业费</p>
    </div>
    <ol class="PaymentChannel-cnt">
      <li
        class="PaymentChannel-cnt-item"
      >
        <label class="name">应缴金额</label>
        <span class="money">{{form.totalMoney}}</span>
      </li>
      <li
        class="PaymentChannel-cnt-item"
      >
        <label class="name">缴费小区</label>
        <div class="PaymentChannel-cnt-item-right">
          <p
            class="val"
          >{{form.communityName}}</p>
        </div>
      </li>
      <li
        class="PaymentChannel-cnt-item"
      >
        <label class="name">缴费项</label>
        <div class="PaymentChannel-cnt-item-right">
          <p
            v-for="(item,i) in form.address"
            :key="i"
            class="val"
          >{{item}}</p>
        </div>
      </li>
      <li
        class="PaymentChannel-cnt-item"
      >
        <label class="name">收款单位</label>
        <span
          class="val"
        >{{form.company}}</span>
      </li>
    </ol>
    <div class="PaymentChannel-checklist">
      <p class="PaymentChannel-checklist-head">支付渠道</p>
      <h-checklist
        v-for="(item,i) in checkList"
        :key="i"
        :checkVal.sync="item.checked"
        :isSuccess="true"
        :isReverse="true"
      >
        <div class="PaymentChannel-checklist-cnt">
          <i class="iconfont icon-weixinzhifu"></i>
          <p>{{item.value}}</p>
        </div>
      </h-checklist>
    </div>
    <div class="PaymentChannel-btn-par">
      <h-button
        width="263"
        height="39"
        cnt="确认无误，立即支付"
        @click.native="tpPay"
      ></h-button>
    </div>
  </div>
</template>
<script>
import {
  HButton,
  HChecklist
} from '@/components/common';
import wxMix from '@/mixin/weixin';

export default {
  components: {
    HButton,
    HChecklist
  },
  mixins: [wxMix],
  activated () {
    this.getSdkCfg();
    this.parseData();
  },
  data () {
    return {
      form: {
        communityName: sessionStorage.getItem('communityName'),
        company: '鸿宗物业',
        totalMoney: '',
        address: [
        ],
        paymentItems: [
        ]
      },
      type: '',
      checkList: [
        {
          key: '1',
          checked: true,
          value: '微信支付'
        }
      ],
      chargeCodes: []
    };
  },
  methods: {
    parseData () {
      /* 解析数据 */
      let channelData = JSON.parse(sessionStorage.getItem('PaymentDetail.payData') || '{}');
      this.form.totalMoney = channelData.totalMoney;
      this.type = channelData.type;
      const chargeName = channelData.type === 'parking' ? '车位费' : '物业费';
      let addressTemp = [];
      let chargeCodesTemp = [];
      channelData.checkedList.forEach(function (place) {
        addressTemp = addressTemp.concat(place.yearAmount.map(function (batch) {
          return place.room + batch.value + chargeName;
        }));
        chargeCodesTemp = chargeCodesTemp.concat(place.yearAmount.map(function (batch) {
          return batch.chargeCode;
        }));
      });
      this.chargeCodes = chargeCodesTemp;
      this.form.address = addressTemp;
    },
    tpPay () {
      /* 调用支付 */
      if (this.checkList[0].checked) {
        this.axPost(
          'property/wxpay/createOrder',
          {
            uid: localStorage.getItem('uid'),
            orderType: this.type,
            chargeCodes: this.chargeCodes
          },
          {
            j_sub_system: sessionStorage.getItem('simpleCode')
          }
        ).then(r => {
          if (r.code === '200') {
            const data = r.value;
            this.$wechat.chooseWXPay({
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: res => {
                if (res.errMsg === 'chooseWXPay:ok') {
                  this.$router.replace({
                    name: 'PaymentSucess'
                  });
                } else {
                  this.$vux.toast.show({
                    type: 'text',
                    text: '支付失败'
                  });
                  this.cancelOrder(data.orderCode);
                }
              },
              cencel: res => { // 支付取消回调函数
                this.cancelOrder(data.orderCode);
              },
              fail: res => { // 支付失败回调函数
                this.$vux.toast.show({
                  type: 'text',
                  text: '支付失败'
                });
                this.cancelOrder(data.orderCode);
              }
            });
          }
        });
      } else {
        this.$vux.toast.show({
          type: 'text',
          text: '请选择支付渠道'
        });
      }
    },
    cancelOrder (orderCode) {
      this.axPost(
        'property/wxpay/cancelOrder',
        {
          uid: localStorage.getItem('uid'),
          orderCode: orderCode
        },
        {
          j_sub_system: sessionStorage.getItem('simpleCode')
        }
      ).then(r => {
        if (r.code === '200') {
        }
      });
    }
  }
};
</script>
<style>

</style>
