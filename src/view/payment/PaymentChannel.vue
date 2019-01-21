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

export default {
  components: {
    HButton,
    HChecklist
  },
  activated () {
    this.parseData();
  },
  data () {
    return {
      form: {
        communityName: sessionStorage.getItem('communityName'),
        company: '鸿宗物业',
        totalMoney: '',
        address: [
          '龙道葡萄泊园小区2号楼3单元202室',
          '龙道葡萄泊园小区2号楼3单元402室'
        ],
        paymentItems: [
          '2017物业费',
          '2018物业费'
        ]
      },
      type: '',
      checkList: [
        {
          key: '1',
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
      const chargeName = channelData.type === 'paring' ? '车位费' : '物业费';
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

      this.axPost(
        'property/wxpay/createOrder',
        {
          uid: localStorage.getItem('uid'),
          orderType: this.type,
          chargeCodes: this.chargeCodes
        },
        {
          j_sub_system: localStorage.getItem('uid')
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
