<template>
  <div class="PaymentHome">
    <img
      class="header-bg-type01"
      src="@/assets/img/Bitmap@2x(1).png"
    >
    <div class="PaymentHome-main">
      <HPaper
        :headHandle="true"
        :headTransition="true"
      >
        <div class="PaymentHome-cnt">
          <img src="@/assets/img/Slice@2x.png">
          <p class="PaymentHome-cnt-prompt">{{payInf}}</p>
          <button
            type="button"
            class="Payment-button"
          >合并付款
          </button>
        </div>
      </HPaper>
    </div>
    <div class="PaymentHome-checklist Payment-checklist">
      <checklist
        required
        :options="checkList"
        v-model="checklist001"
        @on-change="change"
      ></checklist>
    </div>
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
      payInf: '有一笔待缴纳车位费',
      checkList: [
        {
          key: '1',
          value: '2018年10月10日-2018年11月10日 100元'
        },
        {
          key: '2',
          value: '2018年10月10日-2018年11月10日 100元'
        }
      ]
    };
  },
  created () {
  }
};
</script>

<style scoped>

</style>
