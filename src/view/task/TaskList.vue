<template>
  <div class="TaskList">
    <div class="TaskList-tab-par">
      <tab>
        <tab-item selected @on-item-click="changeTab(0)">未处理</tab-item>
        <tab-item @on-item-click="changeTab(1)">已处理</tab-item>
      </tab>
    </div>
    <div v-show="tabIndex===0">
      <ol class="TaskList-card-par">
        <h-event
          :isTask="true"
          v-for="(item,i) in unprocessedList"
          :key="i"
          :eId="item.eventCode"
          :processed="item.state"
          :question="item.question"
          :handlerInfo="item.handlerInfo"
          :level="item.level"
          @click.native="toDetail(item)"
        ></h-event>
      </ol>
      <h-loadmore
        ref="hloadmore"
        :show="pageCfg.loadingShow"
        :loadingType="pageCfg.loadingType"
        :data="pageCfg.page"
        :query="queryTask"
      ></h-loadmore>
    </div>
    <div v-show="tabIndex===1">
      <ol class="TaskList-card-par">
        <h-event
          :isTask="true"
          v-for="(item,i) in processedList"
          :key="i"
          :eId="item.eventCode"
          :processed="item.state"
          :question="item.question"
          :handlerInfo="item.handlerInfo"
          :level="item.level"
          @click.native="toDetail(item)"
        ></h-event>
      </ol>
      <h-loadmore
        ref="hloadmore2"
        :show="newsPageCfg.pageCfg.loadingShow"
        :loadingType="newsPageCfg.pageCfg.loadingType"
        :data="newsPageCfg.pageCfg.page"
        :query="queryTask"
      ></h-loadmore>
    </div>

  </div>
</template>
<script>
import {HButtonTab, HLoadmore} from '@/components/common';
import {Tab, TabItem} from 'vux';
import TaskCard from './TaskCard';
import HEvent from '../../components/common/HEvent';

export default {
  name: 'TaskList',
  components: {
    HEvent,
    HButtonTab,
    HLoadmore,
    TaskCard,
    Tab,
    TabItem
  },
  data () {
    return {
      newsPageCfg: {},
      tabIndex: 0,
      unprocessedList: [], // 未处理
      processedList: []// 已处理
    };
  },
  created () {
    // 动态资讯的分页参数
    this.newsPageCfg = {
      pageCfg: this.hUtil.shallowCopyObject(this.pageCfg)
    };
    this.queryTask();
  },
  methods: {
    changeTab (index) {
      this.tabIndex = index;
      this.queryTask('init');
    },
    queryTask (isInit) {
      const stateType = {
        0: '0',
        1: '1'
      };
      let pageObj;
      // 分页需要的分页对象的父对象
      let pageSelf;
      // 列表对象名
      let listName;
      let loadmoreName;
      if (this.tabIndex === 0) {
        pageObj = this.pageCfg.page;
        pageSelf = this;
        listName = 'unprocessedList';
        loadmoreName = 'hloadmore';
      } else {
        pageObj = this.newsPageCfg.pageCfg.page;
        pageSelf = this.newsPageCfg;
        listName = 'processedList';
        loadmoreName = 'hloadmore2';
      }
      // 切换tab时有数据不再查询
      if (isInit && this[listName].length) {
        return;
      }
      this.axGet(
        'event/listByHandlerGroup',
        {
          uid: localStorage.getItem('uid'),
          state: stateType[this.tabIndex],
          ...pageObj
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this[listName] = this[listName].concat(data.list.map(function (v) {
            return {
              eventCode: v.eventCode,
              state: !!v.state,
              question: {
                reporter: v.reporter,
                reportTime: v.reportTime,
                eventTypeName: v.eventTypeName,
                description: v.description
              },
              handlerInfo: v.handlerinfo,
              evaluateInfo: v.evaluateInfo,
              level: v.evaluateInfo.level * 1
            };
          }));
          this.$refs[loadmoreName].queryBack(r, pageSelf);
        }
      });
    },
    toDetail (data) {
      /* 跳转事件详情 */
      sessionStorage.setItem('TaskDetail.detail', JSON.stringify(data));
      this.$router.push({
        name: 'TaskDetail'
      });
    }
  }
};
</script>
<style>

</style>
