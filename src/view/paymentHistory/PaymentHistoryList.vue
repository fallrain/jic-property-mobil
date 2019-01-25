<template>
  <div class="PaymentHistoryList">
    <div class="PaymentHistoryList-tab">
      <tab
        :line-width="2"
        :custom-bar-width="(114*100)/375 + 'vw'"
      >
        <tab-item
          :selected="chargeType==='property'"
          @on-item-click="changeTab('property')"
        >物业费
        </tab-item>
        <tab-item
          :selected="chargeType==='parking'"
          @on-item-click="changeTab('parking')"
        >车位管理费
        </tab-item>
      </tab>
    </div>
    <div class="PaymentHistoryList-main" v-show="chargeType==='property'">
      <ol class="PaymentHistoryList-body">
        <li
          class="PaymentHistoryList-item"
          v-for="(item,i) in propertyList"
          :key="i"
        >
          <p class="PaymentHistoryList-item-money">{{item.amount | yuanToCent}}<span>元</span></p>
          <div class="PaymentHistoryList-item-common">
            <span class="PaymentHistoryList-item-common-name">支付项目：</span>
            <div class="PaymentHistoryList-item-common-right">
              <p
                class="PaymentHistoryList-item-common-val"
                v-for="(pjt,pjtI) in item.item"
                :key="pjtI"
              >{{pjt}}</p>
            </div>
          </div>
          <p class="PaymentHistoryList-item-common">
            <span class="PaymentHistoryList-item-common-name">缴费日期：</span>
            <span class="PaymentHistoryList-item-common-val">{{item.time}}</span>
          </p>
        </li>
      </ol>
      <h-loadmore
        ref="hloadmore2"
        :show="pageCfg2.loadingShow"
        :loadingType="pageCfg2.loadingType"
        :data="pageCfg2.page"
        :query="query"
      ></h-loadmore>
    </div>
    <div class="PaymentHistoryList-main" v-show="chargeType==='parking'">
      <ol class="PaymentHistoryList-body">
        <li
          class="PaymentHistoryList-item"
          v-for="(item,i) in parkingList"
          :key="i"
        >
          <p class="PaymentHistoryList-item-money">{{item.amount | yuanToCent}}<span>元</span></p>
          <div class="PaymentHistoryList-item-common">
            <span class="PaymentHistoryList-item-common-name">支付项目：</span>
            <div class="PaymentHistoryList-item-common-right">
              <p
                class="PaymentHistoryList-item-common-val"
                v-for="(pjt,pjtI) in item.item"
                :key="pjtI"
              >{{pjt}}</p>
            </div>
          </div>
          <p class="PaymentHistoryList-item-common">
            <span class="PaymentHistoryList-item-common-name">缴费日期：</span>
            <span class="PaymentHistoryList-item-common-val">{{item.time}}</span>
          </p>
        </li>
      </ol>
      <h-loadmore
        ref="hloadmore"
        :show="pageCfg.loadingShow"
        :loadingType="pageCfg.loadingType"
        :data="pageCfg.page"
        :query="query"
      ></h-loadmore>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem
} from 'vux';

import {
  HLoadmore
} from '@/components/common';

export default {
  name: 'PaymentHistoryList',
  components: {
    HLoadmore,
    Tab,
    TabItem
  },
  props: ['tabType'],
  data () {
    return {
      chargeType: this.tabType,
      pageCfg2: {},
      propertyList: [
        /* {
          amount: 1,
          item: ['2019年车位费'],
          time: '2017年5月7日'
        },
        {
          amount: 20,
          item: ['2019年车位费'],
          time: '2017年5月7日'
        },
        {
          amount: 1878,
          item: ['2019年车位费'],
          time: '2017年5月7日'
        } */
      ],
      parkingList: []
    };
  },
  created () {
    this.pageCfg2 = this.hUtil.shallowCopyObject(this.pageCfg);
    this.query();
  },
  computed: {
    chargeTypeName () {
      return this.chargeType === 'parking' ? '车位费' : '物业费';
    }
  },
  methods: {
    reset () {
      // 重置页码,页码可能已经缓存过
      // 现在废弃
      const pageStr = `{
        page: {
          pageSize: 2,
          pageNum: 1
        },
        loadingType: 1,
        loadingShow: false
      }`;
      this.pageCfg = JSON.parse(pageStr);
      this.pageCfg2 = JSON.parse(pageStr);
    },
    query (isInit) {
      let pageCfg;
      let payType;
      let listName;
      let thisObj;
      let loadmoreName;
      if (this.chargeType === 'parking') {
        pageCfg = this.pageCfg;
        payType = 'cost_parking_mrg';
        listName = 'parkingList';
        thisObj = this;
        loadmoreName = 'hloadmore';
      } else {
        pageCfg = this.pageCfg2;
        payType = 'cost_property';
        listName = 'propertyList';
        thisObj = {
          pageCfg
        };
        loadmoreName = 'hloadmore2';
      }
      if (isInit && this[listName].length) {
        return;
      }
      this.axGet(
        'property/wxpay/listSuccessOrder',
        {
          payType: payType,
          uid: localStorage.getItem('uid'),
          j_sub_system: sessionStorage.getItem('simpleCode'),
          ...pageCfg.page
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this[listName] = this[listName].concat(data.list.map(batch => {
            const returnObj = {
              amount: batch.amount,
              time: batch.payTime
            };
            if (this.chargeType === 'parking') {
              returnObj.item = batch.items.map(v => {
                return v.parkingName + ' ' + (v.monthStart + '').substr(0, 4) + '年' + this.chargeTypeName;
              });
            } else {
              returnObj.item = batch.items.map(v => {
                return v.buildingName + '号楼' + v.unitName + '单元' + v.roomName + '室' + ' ' + (v.monthStart + '').substr(0, 4) + '年' + this.chargeTypeName;
              });
            }

            return returnObj;
          }));
          this.$refs[loadmoreName].queryBack(r, thisObj);
        }
      });
    },
    changeTab (i) {
      this.chargeType = i;
      this.query(true);
    }
  }
};
</script>
<style>

</style>
