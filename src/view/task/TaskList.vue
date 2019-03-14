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
          @click.native="toDetail('0')"
        ></h-event>
      </ol>
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
          @click.native="toDetail('1')"
        ></h-event>
      </ol>
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
      unprocessedList: [
        {
          eventCode: '2121323232',
          state: false,
          question: {
            reporter: '29号楼1单元302室 --李永',
            reportTime: '20191-13 10:23:50',
            eventTypeName: '卫生环境',
            description: ' 楼下的垃圾桶已满了好几天没有处理过' +
              '了，夏天味道太大了。'
          }
        }
      ], // 未处理
      processedList: [
        {
          eventCode: '2121323232',
          state: true,
          question: {
            reporter: '29号楼1单元302室 --李永',
            reportTime: '20191-13 10:23:50',
            eventTypeName: '卫生环境',
            description: ' 楼下的垃圾桶已满了好几天没有处理过' +
              '了，夏天味道太大了。'
          },
          handlerInfo: {
            handler: '李伟',
            handlerTime: '2019-1-13 14:20:38',
            replay: '楼下的垃圾桶已满了好几天没有处理过楼下的垃圾桶已满了好几天没有处理过楼下的垃圾桶已满了好几天没有处理过楼下的垃圾桶已满了好几天没有处理过'
          },
          level: 3
        }
      ]// 已处理
    };
  },
  created () {
    // 动态资讯的分页参数
    this.newsPageCfg = {
      pageCfg: this.hUtil.shallowCopyObject(this.pageCfg)
    };
    // this.queryArticle();
  },
  methods: {
    changeTab (index) {
      this.tabIndex = index;
      // this.queryArticle('init');
    },
    queryArticle (isInit) {
      const subType = {
        0: 'common',
        1: 'dynamic'
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
        listName = 'nousList';
        loadmoreName = 'hloadmore';
      } else {
        pageObj = this.newsPageCfg.pageCfg.page;
        pageSelf = this.newsPageCfg;
        listName = 'newsList';
        loadmoreName = 'hloadmore2';
      }
      // 切换tab时有数据不再查询
      if (isInit && this[listName].length) {
        return;
      }
      this.axGet(
        'article/list',
        {
          isPush: 2,
          subType: subType[this.tabIndex],
          articleType: 'info',
          ...pageObj
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this[listName] = this[listName].concat(data.list.map(function (v) {
            return {
              outerChain: v.outerChain,
              articleCode: v.articleCode,
              title: v.title,
              cnt: v.summary,
              url: v.url
              // imgSrc: v.messageImg && process.env.img_url + v.messageImg
            };
          }));
          this.$refs[loadmoreName].queryBack(r, pageSelf);
        }
      });
    },
    toDetail (isProcessed) {
      this.$router.push({
        name: 'TaskDetail',
        params: {
          isProcessed
        }
      });
    }
  }
};
</script>
<style>

</style>
