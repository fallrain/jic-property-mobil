<template>
  <div>
    <div class="PaymentDetail-head">
      <img src="@/assets/img/icon-property@2x.png">
      <p>{{type}}</p>
    </div>
    <div class="PaymentDetail-address">
      <HPaper
        :headHandle="false"
        :headTransition="true"
      >
        <div class="PaymentDetail-cnt">
          <label class="name">缴费地址</label>
          <p class="val">{{address}}</p>
        </div>
      </HPaper>
    </div>
    <div class="PaymentDetail-checklist Payment-checklist">
      <checklist
        required
        :options="checkList"
        v-model="checkedList"
        @on-change="checklistChange"
      ></checklist>
    </div>
    <footer class="PaymentDetail-footer">
      <div class="PaymentDetail-footer-total">
        <span class="PaymentDetail-footer-total-word">共计</span>
        <span class="PaymentDetail-footer-total-money">{{form.totalMoney}}</span>
        <span class="PaymentDetail-footer-total-word">元</span>
      </div>
      <button
        type="button"
        class="PaymentDetail-footer-btn">
        去支付
      </button>
    </footer>
  </div>
</template>

<script>
import {
  Checklist
} from 'vux';
import {
  HPaper
} from '@/components/common';
export default {
  components: {
    Checklist,
    HPaper
  },
  data () {
    return {
      type: '物业费',
      address: '龙道葡泊园小区 2号楼 3单元 202室',
      form: {
        totalMoney: '3021.93'
      },
      checkList: [
        {
          key: '1',
          value: '2019年物业费'
        },
        {
          key: '2',
          value: '2018年物业费'
        }
      ],
      checkedList: [

      ]
    };
  },
  methods: {
    checklistChange () {

    }
  }
};
</script>

<style scoped>

</style>
