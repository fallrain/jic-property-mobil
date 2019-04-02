<template>
  <div class="MyEventList">
    <h-event
      :is-task="true"
      v-for="(item,i) in list"
      :key="i"
      :eId="item.eventCode"
      :processed="item.state"
      :question="item.question"
      :handlerInfo="item.handlerInfo"
      :level="item.level"
      @click.native="toDetail(item)"
    ></h-event>
    <h-loadmore
      ref="hloadmore"
      :show="pageCfg.loadingShow"
      :loadingType="pageCfg.loadingType"
      :data="pageCfg.page"
      :query="queryTask"
    ></h-loadmore>
  </div>
</template>

<script>
import HEvent from '../../components/common/HEvent';
import HLoadmore from '../../components/common/HLoadmore';

export default {
  name: 'MyTaskList',
  components: {HLoadmore, HEvent},
  data () {
    return {
      list: []
    };
  },
  created () {
    this.queryTask();
  },
  methods: {
    queryTask () {
      this.axGet(
        'event/listByHandlerGroup',
        {
          uid: localStorage.getItem('uid'),
          state: 1,
          ...this.pageCfg.page
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this['list'] = this['list'].concat(data.list.map(function (v) {
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
              level: v.evaluateInfo.level * 1,
              images: v.images
            };
          }));
          this.$refs['hloadmore'].queryBack(r, this);
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

<style scoped>

</style>
