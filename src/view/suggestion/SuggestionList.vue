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
      list: []
    };
  },
  created () {
    this.query();
  },
  activated () {

  },
  methods: {
    async query () {
      const {code, value} = await this.axGet(
        'feedback/list',
        {
          uid: localStorage.getItem('uid'),
          ...this.pageCfg.page
        }
      );
      if (code === '200') {
        this.list = value.list.map(function (v) {
          return {
            time: v.createdTime,
            question: v.question,
            answer: v.reply
          };
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
