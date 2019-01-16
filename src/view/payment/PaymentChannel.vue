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
        <label class="name">缴费地址</label>
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
        <label class="name">缴费项</label>
        <div class="PaymentChannel-cnt-item-right">
          <p
            v-for="(item,i) in form.paymentItems"
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
  data () {
    return {
      form: {
        company: '大海物业',
        totalMoney: '3021.93',
        address: [
          '龙道葡萄泊园小区2号楼3单元202室',
          '龙道葡萄泊园小区2号楼3单元402室'
        ],
        paymentItems: [
          '2017物业费',
          '2018物业费'
        ]
      },
      checkList: [
        {
          key: '1',
          value: '微信支付'
        }
      ]
    };
  }
};
</script>
<style>

</style>
