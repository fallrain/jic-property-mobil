<template>
  <div class="PaymentHome">
    <img
      class="header-bg-type01"
      src="@/assets/img/detail-top-bg@2x.png"
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
            @click="closeWxWindow"
          >返回
          </button>
        </div>
      </HPaper>
    </div>
    <div class="PaymentHome-btn-par">
      <h-button
        :width="263"
        :height="39"
        cnt="点我查看缴费历史记录"
      ></h-button>
    </div>
  </div>
</template>

<script>
import {
  HButton,
  HChecklist,
  HPaper
} from '@/components/common';

export default {
  components: {
    HButton,
    HChecklist,
    HPaper
  },
  data () {
    return {
      payInf: ''
    };
  },
  activated () {
    const type = this.hUtil.getUrlVal('type');
    if (type === 'parking') {
      this.payInf = '暂无待缴车位费账单';
    } else {
      this.payInf = '暂无待缴物业费账单';
    }
  },
  methods: {}
};
</script>

<style scoped>

</style>
