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
        :v-if="true"
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
      showBtn: false,
      questions: []
    };
  },
  activated () {
    this.reset();
    this.queryanswer();
  },
  methods: {
    reset () {
      this.questions = [];
      this.showBtn = false;
    },
    async queryanswer () {
      await this.queryDetail();
      this.axGet(
        'questionSurveyInfo/wxCheckSubmit',
        {
          surveyCode: this.surveyCode,
          wxUid: localStorage.getItem('uid'),
          j_sub_system: sessionStorage.getItem('simpleCode')
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          if (data) {
            this.showBtn = false;
            Object.entries(data).forEach(type => {
              type[1].forEach(v => {
                // 匹配到的索引
                const questionIndex = this.questions.findIndex(question => {
                  return question.infoCode === v.infoCode;
                });
                const curQuestion = this.questions[questionIndex];
                if (!curQuestion) {
                  console.log(this.questions);
                  console.log(questionIndex);
                }
                // 问题的答案，用索引来表示
                let value;
                if (type[0] === '1') {
                  // 汉字答案在汉字内容中的索引...
                  const valueIndex = v.content.split(',').findIndex(cnt => {
                    return cnt === v.answer;
                  });
                  valueIndex !== -1 && (value = valueIndex);
                } else if (type[0] === '2') {
                  value = v.answer.split(',').map(as => {
                    const valueIndex = v.content.split(',').findIndex(cnt => {
                      return as === cnt;
                    });
                    if (valueIndex !== -1) {
                      return valueIndex;
                    }
                  });
                  value = value.filter(function (v) {
                    return v !== null && v !== undefined;
                  });
                } else {
                  value = v.answer;
                }
                curQuestion.value = value;
              });
            });
          } else {
            this.showBtn = true;
          }
        }
      });
    },
    queryDetail () {
      /* 查询题目详情 */
      return this.axGet(
        'questionSurveyInfo/wxInfo',
        {
          j_sub_system: sessionStorage.getItem('simpleCode'),
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
          if (this.questions.length) {
            this.genVdt();
          }
        }
      });
    },
    genVdt () {
      this.vdt = new this.HValidate({
        _this: this,
        formData: this.questions,
        rules: {},
        messages: {}
      });
      this.questions.forEach((v, i) => {
        if (v.type === 'radio' || v.type === 'text') {
          this.vdt.option.rules[i] = {
            objRequired: 'value'
          };
          this.vdt.option.messages[i] = {
            objRequired: '第' + (i + 1) + '题不能为空'
          };
        } else if (v.type === 'checkbox') {
          this.vdt.option.rules[i] = {
            arrayRequired: 'value'
          };
          this.vdt.option.messages[i] = {
            arrayRequired: '第' + (i + 1) + '题不能为空'
          };
        }
      });
    },
    submit () {
      /* 提交题目 */
      if (!this.vdt.valid()) {
        return;
      }
      const data = {
        wxUid: localStorage.getItem('uid'),
        surveyCode: this.surveyCode,
        roomCode: sessionStorage.getItem('roomCode')
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
          j_sub_system: sessionStorage.getItem('simpleCode')
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
