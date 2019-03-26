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
    ></h-event>
  </div>
</template>

<script>
import HEvent from '../../components/common/HEvent';

export default {
  name: 'MyTaskList',
  components: {HEvent},
  data () {
    return {
      list: []
    };
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
                reporter: v.reporter,
                reportTime: v.reportTime,
                eventTypeName: v.eventTypeName,
                description: v.description
              },
              handlerInfo: v.handlerinfo,
              level: v.evaluateInfo.level * 1
            };
          }));
          this.$refs['loadmore'].queryBack(r, this);
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
