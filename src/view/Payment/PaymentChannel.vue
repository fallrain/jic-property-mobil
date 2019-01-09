<template>
  <div>
    <div class="PaymentChannel-head">
      <label class="PaymentChannel-prompt">支付金额：</label>
      <p>
        <span class="PaymentChannel-money">{{form.totalMoney}}</span>
        <span class="PaymentChannel-moneyUnit">元</span>
      </p>
    </div>
    <div class="PaymentChannel-checklist">
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
        totalMoney: '3021.93'
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
