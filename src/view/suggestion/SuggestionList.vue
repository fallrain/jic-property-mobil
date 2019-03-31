<template>
  <div>
    <div class="">
      <h-suggestion
        v-for="(item) in list"
        :key="item.id"
        :id="item.id"
        :titleVal="item.time"
        :question="item.question"
        :answer="item.answer"
        :delHandler="delSuggestion"
      ></h-suggestion>
      <h-loadmore
        ref="hloadmore"
        :show="pageCfg.loadingShow"
        :loadingType="pageCfg.loadingType"
        :data="pageCfg.page"
        :query="query"
      ></h-loadmore>
    </div>
  </div>
</template>

<script>
import HLoadmore from '../../components/common/HLoadmore';
import HSuggestion from '../../components/common/HSuggestion';

export default {
  name: 'SuggestionList',
  components: {
    HLoadmore,
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
      /* 查询我提交的建议 */
      const {code, value} = await this.axGet(
        'feedback/list',
        {
          uid: localStorage.getItem('uid'),
          ...this.pageCfg.page
        }
      );
      if (code === '200') {
        this.list = this.list.concat(value.list.map(function (v) {
          return {
            id: v.id,
            time: v.createdTime,
            question: v.question,
            answer: v.reply
          };
        }));
        this.$refs.hloadmore.queryBack({code, value}, this);
      }
    },
    delSuggestion (id) {
      /* 删除建议 */
      this.$vux.confirm.show({
        title: '系统通知',
        hideOnBlur: false,
        content: '确定要删除吗？',
        onConfirm: async () => {
          const {code} = await this.axGet(
            'feedback/delete',
            {
              id
            }
          );
          if (code === '200') {
            this.list.splice(this.list.findIndex(v => v.id === id), 1);
          }
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
