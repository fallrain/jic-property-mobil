<template>
  <div class="PaymentDetail">
    <div class="PaymentDetail-head">
      <img src="@/assets/img/icon-property@2x.png">
      <p>{{typeName}}</p>
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
        class="PaymentDetail-footer-btn"
        @click="toPaymentChannel"
      >
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
import wxMix from '@/mixin/weixin';

export default {
  components: {
    HChecklist,
    HPaper
  },
  mixins: [wxMix],
  props: ['type'],
  data () {
    return {
      typeName: this.type === 'parking' ? '车位费' : '物业费',
      communityName: sessionStorage.getItem('communityName'),
      form: {
        totalMoney: 0
      },
      checkList: {},
      checkedList: []
    };
  },
  activated () {
    sessionStorage.removeItem('PaymentDetail.payData');
    this.getSdkCfg();
  },
  created () {
    this.query();
  },
  watch: {
    'checkList': {
      handler (checkList) {
        this.form.totalMoney = 0;
        for (let p in checkList) {
          const data = checkList[p];
          if (data.checked) {
            this.form.totalMoney += checkList[p].money;
          }
        }
      },
      deep: true
    }
  },
  methods: {
    toPaymentHome () {
      this.$router.replace({
        name: 'PaymentHome',
        query: {
          type: this.type
        }
      });
    },
    query () {
      let url;
      if (this.type === 'parking') {
        url = 'charge/parking/listByUser';
      } else {
        url = 'charge/property/listByUser';
      }

      this.axGet(
        url,
        {
          uid: localStorage.getItem('uid'),
          j_sub_system: sessionStorage.getItem('simpleCode')
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          if (!data || !data.length) {
            this.toPaymentHome();
          } else {
            const checkListTemp = {};
            data.forEach(v => {
              let key;
              if (this.type === 'parking') {
                key = v.parkingCode;
              } else {
                key = v.buildingName + v.unitName + v.roomName;
              }
              if (!checkListTemp[key]) {
                checkListTemp[key] = {
                  checked: false,
                  room: this.type === 'parking' ? v.parkingName : key,
                  money: 0,
                  yearAmount: []
                };
              }
              const room = checkListTemp[key];
              room.money += v.charge.replace('元', '') * 1;
              room.yearAmount.push({
                chargeCode: v.chargeCode,
                value: v.batchName + (this.type === 'parking' ? '车位费' : '物业费'),
                money: v.charge
              });
            });
            this.checkList = checkListTemp;
          }
        }
      });
    },
    checkClick () {
      /* 计算金额 */
      setTimeout(() => {
        this.form.totalMoney = 0;
        for (let p in this.checkList) {
          const data = this.checkList[p];
          if (data.checked) {
            this.form.totalMoney += this.checkList[p].money;
          }
        }
      });
    },
    toPaymentChannel () {
      /* 去支付渠道页面 */
      const checkedList = [];
      for (let p in this.checkList) {
        if (this.checkList[p].checked) {
          checkedList.push(this.checkList[p]);
        }
      }
      if (!checkedList.length) {
        this.$vux.toast.show({
          type: 'text',
          text: '请选择支付项'
        });
        return;
      }
      const data = {
        type: this.type,
        totalMoney: this.form.totalMoney,
        checkedList: checkedList
      };
      sessionStorage.setItem('PaymentDetail.payData', JSON.stringify(data));
      this.$router.push({
        name: 'PaymentChannel'
      });
    }
  }
};
</script>

<style scoped>

</style>
