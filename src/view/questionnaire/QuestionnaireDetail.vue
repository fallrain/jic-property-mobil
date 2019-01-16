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
      >提交</button>
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
  data () {
    return {
      questions: [
        {
          title: '您对物业收费价格是否满意？',
          type: 'radio',
          value: 0,
          data: [
            {
              label: '满意'
            },
            {
              label: '尚可'
            },
            {
              label: '不满意'
            }
          ]
        },
        {
          title: '您对物业收费价格是否满意？',
          type: 'checkbox',
          value: [],
          data: [
            {
              label: '满意'
            },
            {
              label: '我还想加钱'
            },
            {
              label: '建议建议'
            }
          ]
        },
        {
          title: '您对物业收费价格是否满意？',
          type: 'text',
          value: '',
          data: [
            {
              label: '满意'
            },
            {
              label: '我还想加钱'
            },
            {
              label: '建议建议'
            }
          ]
        }
      ]
    };
  }
};
</script>
<style>

</style>
