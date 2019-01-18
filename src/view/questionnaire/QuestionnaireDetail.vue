<template>
  <div class="QuestionnaireDetail">
    <img src="@/assets/img/detail-top-bg@2x.png" class="QuestionnaireDetail-top-bg">
    <div
      class="QuestionnaireDetail-paper"
    >
      <h-paper
        :headHandle="false"
        :headTransition="false"
      >
        <div class="QuestionnaireDetail-paper-cnt">
          <span class="title">物业工作满意度调查</span>
          <p class="cnt">您好，感谢您在百忙之中填写这份调查问卷，请根据您的实际情况如实填写，以便我们更好的提高服务.</p>
        </div>
      </h-paper>
    </div>
    <div class="QuestionnaireDetail-cnt">
      <ul>
        <li
          v-for="(item,i) in questions"
          :key="i"
          class="QuestionnaireDetail-question-item"
        >
          <p class="QuestionnaireDetail-question-item-title">
            <i class="iconfont icon-jiantou-copy-copy"></i>
            <span>{{i+1}}.{{item.title}}</span>
          </p>
          <h-radio
            v-if="item.type==='radio'"
            :data="item.data"
            v-model="item.value"
          ></h-radio>
          <h-checkbox
            v-else-if="item.type==='checkbox'"
            :data="item.data"
            v-model="item.value"
          ></h-checkbox>
          <h-textarea
            v-else-if="item.type==='text'"
            :conuntMaxNumber="false"
            placeHolder="请输入您的宝贵意见"
            :maxlength="500"
            :data="item.data"
            v-model="item.value"
          ></h-textarea>
        </li>
      </ul>
    </div>
    <div class="QuestionnaireDetail-btn-par">
      <button
        type="button"
        class="h-btn-primary"
        @click="submit"
      >提交
      </button>
    </div>
  </div>
</template>
<script>
import {
  HCheckbox,
  HPaper,
  HRadio,
  HTextarea
} from '@/components/common';

export default {
  components: {
    HCheckbox,
    HPaper,
    HRadio,
    HTextarea
  },
  props: ['surveyCode'],
  data () {
    return {
      questions: []
    };
  },
  activated () {
    this.queryDetail();
  },
  methods: {
    queryDetail () {
      /* 查询题目详情 */
      this.axGet(
        'questionSurveyInfo/wxInfo',
        {
          j_sub_system: 'a00003', // todo 应该从接口取
          surveyCode: this.surveyCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          Object.entries(data).map(v => {
            const questionsTemp = v[1].map(function (item) {
              const obj = {
                title: item.title,
                type: {
                  1: 'radio',
                  2: 'checkbox',
                  3: 'text'
                }[v[0]],
                infoCode: item.infoCode
              };
              if (v[0] === '1') {
                obj.value = null;
              } else if (v[0] === '2') {
                obj.value = [];
              } else {
                obj.value = '';
              }
              if (v[0] !== '3') {
                obj.data = item.content.split(',').map(function (label) {
                  return {
                    label: label
                  };
                });
              }
              return obj;
            });
            this.questions = this.questions.concat(questionsTemp);
          });
        }
      });
    },
    submit () {
      /* 提交题目 */
      const data = {
        wxUid: '123455', // todo 需要获取
        surveyCode: this.surveyCode,
        roomCode: '59513c8c33cc4085a99cbef192698bbe'// todo 默认roomcode,需要获取
      };
      data.list = this.questions.map(function (v) {
        const data = {
          infoCode: v.infoCode
        };
        if (v.type === 'radio') {
          data.answer = v.data[v.value].label;
        } else if (v.type === 'checkbox') {
          const labelAy = v.value.map(function (index) {
            return v.data[index].label;
          });
          data.answer = labelAy.join(',');
        } else {
          data.answer = v.value;
        }
        return data;
      });
      this.axPost(
        'questionSurveyAnswer/wxSubmitList',
        data,
        {
          j_sub_system: 'a00003'// todo 需要获取到默认小区code
        }
      ).then(r => {
        if (r.code === '200') {
          this.$router.push({
            name: 'QuestionnaireList'
          });
        }
      });
    }
  }
};
</script>
<style>

</style>
