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
            level: v.evaluateInfo && v.evaluateInfo.level ? v.evaluateInfo.level : undefined,
            images: v.images
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
      sessionStorage.setItem('EventDetail.detail', JSON.stringify(data));
      this.$router.push({
        name: 'EventDetail'
      });
    }
  }
};
</script>

<style scoped>

</style>
