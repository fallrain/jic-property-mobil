<template>
  <div class="MyEventList">
    <h-event
      v-for="(item,i) in list"
      :key="i"
      :eId="item.eventCode"
      :processed="item.state"
      :question="item.question"
      :handlerInfo="item.handlerInfo"
      :level="item.level"
      :toScore="toScore"
    ></h-event>
  </div>
</template>

<script>
import HEvent from '../../components/common/HEvent';

export default {
  name: 'MyEventList',
  components: {HEvent},
  created () {
    this.query();
  },
  data () {
    return {
      list: [
        {
          eventCode: '2121323232',
          state: true,
          question: {
            reportTime: '20191-13 10:23:50',
            eventTypeName: '卫生环境',
            description: ' 楼下的垃圾桶已满了好几天没有处理过\n' +
              '了，夏天味道太大了。'
          },
          handlerInfo: {
            handler: '李伟',
            handlerTime: '2019-1-13 14:20:38',
            replay: '楼下的垃圾桶已满了好几天没有处理过楼下的垃圾桶已满了好几天没有处理过楼下的垃圾桶已满了好几天没有处理过楼下的垃圾桶已满了好几天没有处理过'
          },
          level: 3
        },
        {
          eventCode: '265656623232',
          state: false,
          question: {
            reportTime: '20191-13 10:23:50',
            eventTypeName: '卫生环境',
            description: ' 楼下的垃圾桶已满了好几天没有处理过\n' +
              '了，夏天味道太大了。'
          }
        }
      ]
    };
  },
  methods: {
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
            handlerInfo: v.handlerinfo
          };
        });
      }
    },
    toScore (eventCode, level) {
      /* 评分 */
      this.$router.push({
        name: 'Score',
        params: {
          eventCode,
          level
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
