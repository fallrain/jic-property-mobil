<template>
  <div>
    <ol class="QuestionnaireList">
      <li
        class="QuestionnaireList-item"
        v-for="(item,i) in questionnaireList"
        :key="i"
        @click="toDetail(item)"
      >
        <img
          class="QuestionnaireList-item-portrait"
          src="@/assets/img/Shape Copy 2@2x.png"
        >
        <p class="QuestionnaireList-item-cnt">{{item.cnt}}</p>
      </li>
    </ol>
    <h-loadmore
      ref="hloadmore"
      :show="pageCfg.loadingShow"
      :loadingType="pageCfg.loadingType"
      :data="pageCfg.page"
    ></h-loadmore>
  </div>
</template>
<script>
import {
  HLoadmore
} from '@/components/common';

export default {
  components: {
    HLoadmore
  },
  data () {
    return {
      questionnaireList: []
    };
  },
  created () {
    this.queryQuestionnaire();
  },
  methods: {
    queryQuestionnaire () {
      /* 查询调查问卷 */
      this.axGet(
        'questionSurvey/wxList',
        {
          j_sub_system: sessionStorage.getItem('simpleCode'),
          ...this.pageCfg.page
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.questionnaireList = this.questionnaireList.concat(data.list.map(function (v) {
            return {
              cnt: v.title,
              surveyCode: v.surveyCode
            };
          }));
          this.$refs.hloadmore.queryBack(r, this);
        }
      });
    },
    toDetail (item) {
      /* 去调查问卷详情 */
      this.$router.push({
        name: 'QuestionnaireDetail',
        params: {
          surveyCode: item.surveyCode
        }
      });
    }
  }
};
</script>
<style>

</style>
