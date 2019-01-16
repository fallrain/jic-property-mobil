<template>
  <div class="PaymentDetail">
    <div class="PaymentDetail-head">
      <img src="@/assets/img/icon-property@2x.png">
      <p>{{type}}</p>
    </div>
    <div class="PaymentDetail-address">
      <HPaper
        :headHandle="false"
        :headTransition="false"
      >
        <div class="PaymentDetail-cnt">
          <p class="title">{{communityName}}</p>
          <div class="PaymentDetail-checklist Payment-checklist">
            <h-checklist
              v-for="(item,i) in checkList"
              :key="i"
              :checkVal.sync="item.checked"
            >
              <div class="PaymentDetail-checklist-cnt">
                <p class="PaymentDetail-checklist-cnt-total">
                  <span class="name">{{item.room}}</span>
                  <span class="val">{{item.money}}元</span>
                </p>
                <ul class="PaymentDetail-checklist-cnt-item-par">
                  <li
                    class="PaymentDetail-checklist-cnt-item"
                    v-for="(year,i) in item.yearAmount"
                    :key="i"
                  >
                    <span>{{year.value}}</span><span>{{year.money}}</span>
                  </li>
                </ul>
              </div>
            </h-checklist>
          </div>
        </div>
      </HPaper>
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
  HChecklist,
  HPaper
} from '@/components/common';

export default {
  components: {
    HChecklist,
    HPaper
  },
  data () {
    return {
      type: '物业费',
      communityName: '龙道葡泊园小区',
      form: {
        totalMoney: '3021.93'
      },
      checkList: [
        {
          key: '1',
          checked: false,
          room: '2号楼三单元202室',
          money: '3021.93',
          yearAmount: [
            {
              value: '2019年物业费',
              money: '1568.00'
            },
            {
              value: '2018年物业费',
              money: '1568.00'
            }
          ]
        },
        {
          key: '2',
          checked: false,
          room: '2号楼三单元402室',
          money: '4021.93',
          yearAmount: [
            {
              value: '2019年物业费',
              money: '1568.00'
            },
            {
              value: '2018年物业费',
              money: '1568.00'
            }
          ]
        }
      ],
      checkedList: []
    };
  },
  methods: {
    checklistChange (v, l) {
    }
  }
};
</script>

<style scoped>

</style>
