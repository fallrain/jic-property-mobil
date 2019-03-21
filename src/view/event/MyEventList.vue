<template>
  <div class="MyEventList">
    <h-event
      v-for="(item) in list"
      :key="item.eventCode"
      :eId="item.eventCode"
      :processed="item.state"
      :question="item.question"
      :handlerInfo="item.handlerInfo"
      :evaluateInfo="item.evaluateInfo"
      :level="item.level"
      :toScore="toScore"
      :delEvent="delEvent"
      :toDeatil="toDetail"
    ></h-event>
  </div>
</template>

<script>
import HEvent from '../../components/common/HEvent';

export default {
  name: 'MyEventList',
  components: {HEvent},
  provide () {
    return {
      updateLevelByEventCode (eventCode, level) {
        /* 更新单个事件的评分（星星） */
        this.list.find(v => v.eventCode === eventCode).level = level;
      }
    };
  },
  created () {
    this.updateLevelByEventCode();
    this.query();
  },
  activated () {
    this.updateLevelByEventCode();
  },
  data () {
    return {
      list: []
    };
  },
  methods: {
    updateLevelByEventCode () {
      /* 打分后重新进入此页面更新星星 */
      let levelDetail = sessionStorage.getItem('MyEventList.level');
      if (levelDetail) {
        levelDetail = JSON.parse(levelDetail);
        const event = this.list.find(v => v.eventCode === levelDetail.eventCode);
        event.level = levelDetail.level;
        event.evaluateInfo.evaluateContent = levelDetail.evaluateContent;
        sessionStorage.removeItem('MyEventList.level');
      }
    },
    async query () {
      /* 查询我上报的事件 */
      const {code, value} = await this.axGet(
        'event/listByUser',
        {
          uid: localStorage.getItem('uid')
        }
      );
      if (code === '200') {
        this.list = value.list.map(function (v) {
          return {
            eventCode: v.eventCode,
            state: !!v.state,
            question: {
              reportTime: v.reportTime,
              eventTypeName: v.eventTypeName,
              description: v.description
            },
            handlerInfo: v.handlerinfo,
            evaluateInfo: v.evaluateInfo,
            level: v.evaluateInfo && v.evaluateInfo.level ? v.evaluateInfo.level : undefined
          };
        });
      }
    },
    toScore (eventCode, level, evaluateContent) {
      /* 评分 */
      sessionStorage.setItem('Score.detail', JSON.stringify({
        eventCode,
        level,
        evaluateContent
      }));
      this.$router.push({
        name: 'Score'
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
    toDetail () {
      /* 跳转事件详情 */
      this.$router.push({
        name: 'EventDetail'
      });
    }
  }
};
</script>

<style scoped>

</style>
