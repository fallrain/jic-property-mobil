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
    ></h-event>
  </div>
</template>

<script>
import HEvent from '../../components/common/HEvent';

export default {
  name: 'MyEventList',
  components: {HEvent},
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
  }
};
</script>

<style scoped>

</style>
