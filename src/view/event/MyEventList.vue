<template>
  <div class="MyEventList">
    <h-event
      v-for="(item) in list"
      :data="item"
      :key="item.eventCode"
      :eId="item.eventCode"
      :processed="item.state"
      :question="item.question"
      :handlerInfo="item.handlerInfo"
      :evaluateInfo="item.evaluateInfo"
      :level="item.evaluateInfo.level"
      :toScore="toScore"
      :delEvent="delEvent"
      :toDetail="toDetail"
    ></h-event>
    <h-loadmore
      ref="hloadmore"
      :show="pageCfg.loadingShow"
      :loadingType="pageCfg.loadingType"
      :data="pageCfg.page"
      :query="query"
    ></h-loadmore>
  </div>
</template>

<script>
import HEvent from '../../components/common/HEvent';
import HLoadmore from '../../components/common/HLoadmore';

import {mapState, mapMutations} from 'vuex';

export default {
  name: 'MyEventList',
  components: {HLoadmore, HEvent},
  provide () {
    return {
      updateLevelByEventCode (eventCode, level) {
        /* 更新单个事件的评分（星星） */
        this.list.find(v => v.eventCode === eventCode).level = level;
      }
    };
  },
  created () {
    this.resetCurEventDetail();
    this.query();
  },
  activated () {
    this.updateLevelByEventCode();
    this.updateList();
  },
  data () {
    return {
      list: []
    };
  },
  computed: {
    ...mapState([
      'curEventDetail'
    ])
  },
  methods: {
    ...mapMutations([
      'updateCurEventDetail',
      'resetCurEventDetail'
    ]),
    updateLevelByEventCode () {
      /* 打分后重新进入此页面更新星星 */
      if (JSON.stringify(this.curEventDetail) !== '{}') {
        const event = this.list.find(v => v.eventCode === this.curEventDetail.eventCode);
        Object.assign(event, this.curEventDetail);
      }
    },
    updateList () {
      let deletedEventCode = sessionStorage.getItem('MyEventList.deletedEventCode');
      if (deletedEventCode) {
        this.list.splice(this.list.findIndex(v => v.eventCode === deletedEventCode), 1);
        sessionStorage.removeItem('MyEventList.deletedEventCode');
      }
    },
    async query () {
      /* 查询我上报的事件 */
      const {code, value} = await this.axGet(
        'event/listByUser',
        {
          uid: localStorage.getItem('uid'),
          ...this.pageCfg.page
        }
      );
      if (code === '200') {
        this.list = this.list.concat(value.list.map(function (v) {
          v.evaluateInfo && !v.evaluateInfo.level && (v.evaluateInfo.level = 0);
          return {
            eventCode: v.eventCode,
            state: !!v.state,
            question: {
              reporter: v.reportInfo.reportRoom + '-' + v.reportInfo.reportName,
              reportTime: v.reportTime,
              eventTypeName: v.eventTypeName,
              description: v.description
            },
            handlerInfo: v.handlerinfo,
            evaluateInfo: v.evaluateInfo,
            level: v.evaluateInfo && v.evaluateInfo.level ? v.evaluateInfo.level : undefined,
            images: v.images
          };
        }));
        this.$refs.hloadmore.queryBack({code, value}, this);
      }
    },
    toScore (data) {
      /* 评分 */
      this.updateCurEventDetail(data);
      this.$router.push({
        name: 'Score',
        params: {
          type: 'MyEventList'
        }
      });
    },
    delEvent (eventCode) {
      /* 删除事件 */
      this.$vux.confirm.show({
        title: '系统通知',
        hideOnBlur: false,
        content: '确定要删除吗？',
        onConfirm: () => {
          this.axGet(
            'event/delete',
            {
              eventCode
            }
          ).then(({code}) => {
            if (code === '200') {
              this.list.splice(this.list.findIndex(v => v.eventCode === eventCode), 1);
            }
          });
        }
      });
    },
    toDetail (data) {
      /* 跳转事件详情 */
      this.updateCurEventDetail(data);
      this.$router.push({
        name: 'EventDetail'
      });
    }
  }
};
</script>

<style scoped>

</style>
