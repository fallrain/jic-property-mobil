<template>
  <div>
    <div class="">
      <h-suggestion
        v-for="(item,i) in list"
        :key="i"
        :titleVal="item.time"
        :question="item.question"
        :answer="item.answer"
      ></h-suggestion>
    </div>
  </div>
</template>

<script>
import HSuggestion from '../../components/common/HSuggestion';
export default {
  name: 'SuggestionList',
  components: {
    HSuggestion
  },
  data () {
    return {
      list: [
        {
          time: '2019-1-15 13:20:18',
          question: '希望物业能够加强安何方面的工作，最近经常看到不明人员随意进出小区，可能会带来很大的安全隐患。'
        },
        {
          time: '2019-1-15 13:20:18',
          question: '希望物业能够加强安何方面的工作，最近经常看到不明人员随意进出小区，可能会带来很大的安全隐患。',
          answer: '尊敬的住户您好,感谢您提出宝贵的意见,我们正落实并加强相关安全工作培训，增加人手，感谢您对我们工作的支持。'
        }
      ]
    };
  }
};
</script>

<style scoped>

</style>
