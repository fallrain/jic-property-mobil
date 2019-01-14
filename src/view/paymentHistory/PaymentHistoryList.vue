<template>
  <div class="PaymentHistoryList">
    <div class="PaymentHistoryList-tab">
      <tab
        :line-width="2"
        :custom-bar-width="(114*100)/375 + 'vw'"
      >
        <tab-item selected>物业费</tab-item>
        <tab-item>车位管理费</tab-item>
      </tab>
    </div>
    <div class="PaymentHistoryList-main">
      <!--<div class="PaymentHistoryList-query">
        <div class="PaymentHistoryList-query-item">
          <i class="iconfont icon-rili"></i>
          <span>查询时间</span>
          <i class="iconfont icon-jiantou9"></i>
        </div>
      </div>-->
      <ol class="PaymentHistoryList-body">
        <li
          class="PaymentHistoryList-item"
          v-for="(item,i) in paymentList"
          :key="i"
        >
          <p class="PaymentHistoryList-item-money">{{item.amount}}<span>元</span></p>
          <p class="PaymentHistoryList-item-common">
            <span class="PaymentHistoryList-item-common-name">支付项目：</span>
            <span class="PaymentHistoryList-item-common-name">{{item.item}}</span>
          </p>
          <p class="PaymentHistoryList-item-common">
            <span class="PaymentHistoryList-item-common-name">缴费日期：</span>
            <span class="PaymentHistoryList-item-common-name">{{item.time}}</span>
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem
} from 'vux';

export default {
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      paymentList: [
        {
          amount: 100,
          item: '2019年车位费',
          time: '2017年5月7日'
        },
        {
          amount: 200.13,
          item: '2019年车位费',
          time: '2017年5月7日'
        },
        {
          amount: 878.09,
          item: '2019年车位费',
          time: '2017年5月7日'
        }
      ]
    };
  }
};
</script>
<style>

</style>
