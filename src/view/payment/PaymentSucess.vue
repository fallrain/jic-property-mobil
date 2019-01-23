<template>
  <div class="PaymentSucess">
    <div class="PaymentSucess-head">
      <p class="PaymentSucess-head-cnt">
        <i class="iconfont icon-zan"></i>
        <span>支付成功</span>
      </p>
    </div>
    <div class="PaymentSucess-items">
      <h-item
        v-for="(item,i) in paymentItemList"
        :key="i"
        :title="item.title"
        :val="item.val"
      >
        <template slot="val" v-if="item.vals">
          <p
            v-for="(valsItem,j) in item.vals"
            :key="j"
            class="val-item"
          >{{valsItem}}</p>
        </template>
      </h-item>
    </div>
    <div class="PaymentSucess-btn-par">
      <h-button
        width="263"
        height="39"
        cnt="返回"
        @click.native="closeWxWindow"
      ></h-button>
    </div>
  </div>
</template>
<script>
import {
  HButton,
  HItem
} from '@/components/common';
export default {
  components: {
    HButton,
    HItem
  },
  activated () {
    this.setInf();
  },
  data () {
    return {
      paymentItemList: [
        {
          title: '缴费项目',
          val: ''
        },
        {
          title: '缴费地址',
          vals: []
        },
        {
          title: '收款方',
          val: '鸿棕物业管理有限公司'
        },
        {
          title: '收款总额',
          val: ''
        }
      ]
    };
  },
  methods: {
    setInf () {
      let channelData = JSON.parse(sessionStorage.getItem('PaymentDetail.payData') || '{}');
      let addressTemp = [];
      addressTemp = channelData.checkedList.map(function (place) {
        return place.room;
      });
      this.paymentItemList[0].val = channelData.type === 'parking' ? '车位管理费' : '物业管理费';
      this.paymentItemList[1].vals = addressTemp;
      this.paymentItemList[3].val = channelData.totalMoney + ' 元';
    }
  }
};
</script>
<style>

</style>
