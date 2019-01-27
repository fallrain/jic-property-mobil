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
          <span class="title">{{ aTitle }}</span>
          <pre class="cnt" style="white-space: pre-wrap;"  v-html="aDescription" ></pre>
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
    <div v-if="showBtn" class="QuestionnaireDetail-btn-par">
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
      showBtn: false,
      aTitle: null,
      aDescription: null,
      questions: []
    };
  },
  activated () {
    this.reset();
    this.queryDetail();
  },
  methods: {
    reset () {
      this.questions = [];
      this.showBtn = false;
    },
    queryDetail () {
      /* 查询题目详情 */
      return this.axGet(
        'questionSurveyInfo/wxInfo',
        {
          j_sub_system: sessionStorage.getItem('simpleCode'),
          surveyCode: this.surveyCode,
          wxUid: localStorage.getItem('uid')
        }
      ).then(r => {
        if (r.code === '200' && r.value) {
          this.aTitle = r.value.title;
          this.aDescription = r.value.description;
          const questions = r.value.contentList;
          const questionsTemp = questions.map(function (item) {
            const obj = {
              title: item.title,
              type: {
                1: 'radio',
                2: 'checkbox',
                3: 'text'
              }[item.type],
              infoCode: item.infoCode
            };
            if (item.type === 1) {
              obj.value = null;
            } else if (item.type === 2) {
              obj.value = [];
            } else {
              obj.value = '';
            }
            if (item.type !== '3') {
              obj.data = item.content.split(',').map(function (label) {
                return {
                  label: label
                };
              });
            }
            return obj;
          });
          this.questions = questionsTemp;
          if (this.questions.length) {
            this.genVdt();
          }
          this.showBtn = true;
          // 如果存在答案
          if (r.value && r.value.answers && r.value.answers.length > 0) {
            this.showBtn = false;
            r.value.answers.forEach((answer, idx) => {
              let question = this.questions[idx];
              if (question.type === 'checkbox') {
                let ansArry = answer.split(',');
                let ansIndexs = [];
                question.data.forEach((row, rowIdx) => {
                  if (ansArry.includes(row.label)) {
                    ansIndexs.push(rowIdx);
                  }
                });
                question.value = ansIndexs;
              } else if (question.type === 'radio') {
                let answerIndex = question.data.findIndex(row => { return row.label === answer; });
                if (answerIndex !== -1) {
                  question.value = answerIndex;
                }
              } else {
                question.value = answer;
              }
            });
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
          const _this = this;
          this.$vux.toast.show({
            type: 'text',
            text: '提交成功',
            onHide () {
              _this.$router.push({
                name: 'QuestionnaireList'
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style>

</style>
