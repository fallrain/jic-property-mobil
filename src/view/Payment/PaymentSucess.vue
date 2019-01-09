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
      ></h-item>
    </div>
    <div class="PaymentSucess-btn-par">
      <h-button
        width="263"
        height="39"
        cnt="返回"
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
  data () {
    return {
      paymentItemList: [
        {
          title: '缴费项目',
          val: '物业管理费'
        },
        {
          title: '缴费地址',
          val: '龙道葡泊园小区 2号楼 3单元 202室'
        },
        {
          title: '收款方',
          val: '鸿棕物业管理有限公司'
        },
        {
          title: '收款总额',
          val: '3021.93 元'
        }
      ]
    };
  }
};
</script>
<style>

</style>
